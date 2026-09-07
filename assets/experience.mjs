const version = new URL(import.meta.url).search;
const [{nextDiscovery, STORAGE_KEY}, {installSwipeGesture}] = await Promise.all([
  import('./discovery.mjs'+version),
  import('./swipe-gesture.mjs'+version),
]);
const dataNode = document.querySelector('#discovery-data');
const hero = document.querySelector('.experience');
if (dataNode && hero) startExperience(JSON.parse(dataNode.textContent));

function startExperience(apps) {
  const $ = selector => document.querySelector(selector);
  const words = JSON.parse($('#explorer-copy').textContent);
  const stage = $('.experience-stage'), canvas = $('.flow-field');
  const ctx = canvas.getContext('2d', {alpha:true});
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const compact = window.matchMedia('(max-width: 999px), (max-height: 719px)');
  const nextButton = $('#next-discovery'), keepButton = $('#keep-discovery'), undoButton = $('#undo-discovery');
  const motionButton = $('#motion-toggle'), card = $('#swipe-card'), surface = $('#swipe-surface');
  const dialog = $('#selection-dialog'), byId = new Map(apps.map(app => [app.id,app]));
  const ids = apps.map(app => app.id), selectionKey = 'bd-app-selection-v1';
  const palettes = {training:['#b8f3d6','#91d4f8','#e4de9c'],everyday:['#ead4ae','#d3c0fa','#addbc6'],family:['#bbc9f2','#d7dfb0','#edc6bc'],play:['#b1ecce','#acd4f7','#d5c4f2']};
  let saved, storedSelection, storageAvailable = true;
  try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch { /* A damaged rotation must not affect saved apps. */ }
  try { storedSelection = JSON.parse(localStorage.getItem(selectionKey)); }
  catch { storageAvailable = false; }
  const validSelection = value => new Set(Array.isArray(value) ? value.filter(id => byId.has(id)) : []);
  let selectedIds = validSelection(storedSelection);
  let state = saved, mode = 0, seed = .5, color = '#b8f3d6', paused = reduced.matches;
  let frame = 0, lastFrame = 0, elapsed = 0, heroVisible = true, width = 1, height = 1;
  let stageTop = 0, heroHeight = 1, viewportHeight = innerHeight, documentHeight = 1;
  let scrollFrame = 0, progress = 0, mouseX = 0, mouseY = 0, scenes = [];
  let current = {app:apps[0],mode:0,seed:500000,state:saved}, pending = null, busy = true;
  const history = [];
  const random = () => { const value = new Uint32Array(1); crypto.getRandomValues(value); return value[0] / 4294967296; };
  const canSwipe = () => !busy && !dialog.open;
  const gesture = installSwipeGesture({surface,card,onSwipe:advance,canSwipe,isMotionReduced:() => paused});

  function persistDiscovery() { try { localStorage.setItem(STORAGE_KEY,JSON.stringify(state)); } catch { /* Optional local rotation. */ } }
  function persistSelection() {
    try { localStorage.setItem(selectionKey,JSON.stringify([...selectedIds])); storageAvailable = true; }
    catch { storageAvailable = false; }
  }
  function setBusy(value) {
    busy = value;
    card.setAttribute('aria-busy',String(value));
    nextButton.disabled = value; keepButton.disabled = value; undoButton.disabled = value || !history.length;
    for (const button of document.querySelectorAll('[data-save-app],[data-remove-saved]')) button.disabled = value;
    surface.classList.toggle('is-switching',value && Boolean(current));
  }
  function candidateFromState() {
    const selected = nextDiscovery(ids,state,random);
    return selected ? {...selected,app:byId.get(selected.id)} : null;
  }
  function ready(candidate) {
    if (!candidate) return Promise.resolve(false);
    if (!candidate.ready) {
      const image = new Image(); image.src = candidate.app.image.src;
      candidate.ready = image.decode().then(() => true,() => { candidate.ready = null; return false; });
    }
    return candidate.ready;
  }
  function reserveNext() {
    pending = candidateFromState();
    if (!pending) return;
    $('#deck-next-name').textContent = pending.app.name;
    $('#deck-after-name').textContent = byId.get(pending.state.bag[0])?.name || pending.app.name;
    void ready(pending);
  }
  function showImageFailure() {
    $('#discovery-announcement').textContent = words.failure;
    $('.swipe-hint').textContent = words.failure;
    $('.swipe-hint').classList.add('has-error');
  }
  function render(candidate) {
    current = candidate; state = candidate.state; mode = candidate.mode; seed = candidate.seed / 1000000;
    const app = candidate.app;
    $('.swipe-hint').textContent = words.swipeHint;
    $('.swipe-hint').classList.remove('has-error');
    color = palettes[app.category][mode];
    document.documentElement.style.setProperty('--accent',color);
    hero.dataset.featured = app.id;
    hero.dataset.composition = mode === 1 ? 'reverse' : 'forward';
    hero.dataset.field = ['orbit','wave','fold'][mode];
    hero.dataset.landscape = String(app.image.width > app.image.height);
    hero.dataset.watch = String(app.id === 'PasDuJour');
    $('#discovery-name').textContent = app.name;
    $('#discovery-number').textContent = app.number;
    $('#discovery-category').textContent = app.categoryLabel;
    $('#discovery-headline').textContent = app.headline;
    $('#discovery-platform').textContent = app.platform;
    $('#discovery-icon').src = app.icon;
    $('#discovery-link').href = app.url;
    $('#discovery-link').setAttribute('aria-label',`${words.visit} · ${app.name}`);
    const image = $('#discovery-image');
    image.width = app.image.width; image.height = app.image.height;
    image.src = app.image.src; image.alt = app.name;
    const [x,y,w,h] = app.image.frame || [0,0,1,1];
    const values = {'--screen-ratio':app.image.width*w/(app.image.height*h),'--screen-width':`${100/w}%`,'--screen-left':`${-100*x/w}%`,'--screen-top':`${-100*y/h}%`,'--catalog-offset':app.image.catalogOffset || 0};
    for (const node of [card,image.parentElement]) for (const [name,value] of Object.entries(values)) node.style.setProperty(name,value);
    syncSelection(); measure(); draw(); schedule();
  }
  async function advance(direction) {
    if (!canSwipe() || !pending || (direction !== -1 && direction !== 1)) return;
    const target = pending, previous = current;
    setBusy(true);
    if (!await ready(target)) {
      await gesture.reset(); setBusy(false); showImageFailure(); return;
    }
    await gesture.playExit(direction);
    const addedId = direction === 1 && !selectedIds.has(previous.app.id) ? previous.app.id : null;
    history.push({previous,target,addedId,direction});
    if (history.length > 32) history.shift();
    if (addedId) { selectedIds.add(addedId); persistSelection(); }
    render(target); persistDiscovery(); reserveNext();
    $('#discovery-announcement').textContent = `${direction === 1 ? previous.app.name+' '+words.kept+' ' : ''}${words.passed} ${target.app.name}. ${target.app.headline}`;
    await gesture.playEnter(); setBusy(false);
  }
  async function undo() {
    if (!canSwipe() || !history.length) return;
    const entry = history.at(-1); setBusy(true);
    if (!await ready(entry.previous)) { await gesture.reset(); setBusy(false); showImageFailure(); return; }
    await gesture.playExit(-entry.direction);
    history.pop();
    if (entry.addedId) { selectedIds.delete(entry.addedId); persistSelection(); }
    render(entry.previous); persistDiscovery(); pending = entry.target;
    $('#deck-next-name').textContent = pending.app.name;
    $('#deck-after-name').textContent = byId.get(pending.state.bag[0])?.name || pending.app.name;
    $('#discovery-announcement').textContent = `${words.undone} ${entry.previous.app.name}.`;
    await gesture.playEnter(); setBusy(false);
  }
  async function firstDiscovery() {
    if (busy && card.dataset.ready === 'true') return;
    setBusy(true);
    const target = candidateFromState();
    if (target && await ready(target)) {
      history.length = 0; render(target); persistDiscovery(); reserveNext(); await gesture.playEnter();
    } else {
      pending = target; showImageFailure();
    }
    card.dataset.ready = 'true'; setBusy(false);
  }
  function closeGlyph() { return $('#close-selection svg').cloneNode(true); }
  function renderSelection() {
    const focused = document.activeElement;
    const focusedId = focused?.dataset?.removeSaved || focused?.dataset?.openSaved;
    const focusAttribute = focused?.dataset?.openSaved ? 'data-open-saved' : 'data-remove-saved';
    const list = $('#selection-list'); list.replaceChildren();
    for (const id of selectedIds) {
      const app = byId.get(id), row = document.createElement('li'); row.className = 'selection-item';
      const image = document.createElement('img'); image.src = app.icon; image.alt = ''; image.width = 45; image.height = 45;
      const text = document.createElement('div'), title = document.createElement('h3'), description = document.createElement('p'), link = document.createElement('a');
      title.textContent = app.name; description.textContent = app.headline;
      link.href = app.url; link.dataset.openSaved = id; link.textContent = words.visit+' ↗'; link.setAttribute('aria-label',words.visit+' · '+app.name);
      text.append(title,description,link);
      const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'selection-remove'; remove.dataset.removeSaved = id;
      remove.disabled = busy;
      remove.setAttribute('aria-label',words.remove+' · '+app.name); remove.append(closeGlyph());
      row.append(image,text,remove); list.append(row);
    }
    $('#selection-empty').hidden = selectedIds.size > 0;
    $('#selection-storage-note').textContent = storageAvailable ? words.selectionDevice : words.selectionSession;
    if (dialog.open && focusedId) ([...list.querySelectorAll(`[${focusAttribute}]`)].find(node => node.getAttribute(focusAttribute) === focusedId && !node.disabled) || $('#close-selection')).focus({preventScroll:true});
  }
  function syncSelection() {
    for (const node of document.querySelectorAll('[data-selection-count]')) {
      const changed = node.textContent !== String(selectedIds.size); node.textContent = selectedIds.size;
      if (changed && !paused) node.animate([{transform:'scale(1)'},{transform:'scale(1.2)'},{transform:'scale(1)'}],{duration:300,easing:'ease-out'});
    }
    for (const button of document.querySelectorAll('[data-selection-open]')) {
      button.classList.toggle('has-selection',selectedIds.size > 0);
      button.setAttribute('aria-label',`${words.selection}, ${selectedIds.size} ${selectedIds.size === 1 ? words.selectionCount : words.selectionCountPlural}`);
    }
    for (const button of document.querySelectorAll('[data-save-app]')) {
      const selected = selectedIds.has(button.dataset.saveApp);
      button.setAttribute('aria-pressed',String(selected));
      button.setAttribute('aria-label',`${selected ? words.remove : words.save} · ${byId.get(button.dataset.saveApp).name}`);
    }
    $('#card-saved').hidden = !selectedIds.has(current.app.id);
    keepButton.setAttribute('aria-label',words.save+' · '+current.app.name);
    renderSelection();
  }
  function toggleSaved(id,removeOnly = false) {
    if (!byId.has(id) || busy) return;
    if (removeOnly || selectedIds.has(id)) selectedIds.delete(id); else selectedIds.add(id);
    history.length = 0; undoButton.disabled = true;
    persistSelection(); syncSelection();
  }
  nextButton.addEventListener('click',() => advance(-1));
  keepButton.addEventListener('click',() => advance(1));
  undoButton.addEventListener('click',undo);
  card.addEventListener('keydown',event => {
    if (event.target !== card || event.altKey || event.metaKey || event.ctrlKey || event.shiftKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); void advance(event.key === 'ArrowRight' ? 1 : -1); }
  });
  for (const button of document.querySelectorAll('[data-selection-open]')) button.addEventListener('click',() => {
    renderSelection(); dialog.showModal(); document.body.classList.add('selection-open');
    if (frame) cancelAnimationFrame(frame); frame = 0; lastFrame = 0;
  });
  $('#close-selection').addEventListener('click',() => dialog.close());
  dialog.addEventListener('close',() => { document.body.classList.remove('selection-open'); schedule(); });
  dialog.addEventListener('click',event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  document.addEventListener('click',event => {
    const remove = event.target.closest('[data-remove-saved]'), save = event.target.closest('[data-save-app]');
    if (remove) toggleSaved(remove.dataset.removeSaved,true); else if (save) toggleSaved(save.dataset.saveApp);
  });
  window.addEventListener('storage',event => {
    if (event.key !== selectionKey && event.key !== null) return;
    try { selectedIds = validSelection(JSON.parse(event.newValue)); } catch { selectedIds = new Set(); }
    history.length = 0; undoButton.disabled = true; syncSelection();
  });
  for (const node of document.querySelectorAll('[data-selection-open],[data-save-app],.deck-interaction,#swipe-keyboard-hint')) node.hidden = false;
  card.tabIndex = 0; card.setAttribute('aria-describedby','swipe-keyboard-hint discovery-headline');
  syncSelection();

  function measure() {
    const rect = stage.getBoundingClientRect();
    width = Math.round(rect.width); height = Math.round(rect.height);
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    stageTop = hero.getBoundingClientRect().top + scrollY;
    heroHeight = hero.offsetHeight; viewportHeight = innerHeight;
    documentHeight = Math.max(1, document.documentElement.scrollHeight - viewportHeight);
    scenes = [...document.querySelectorAll('[data-scene]')].map(node => ({node, top:node.offsetTop + node.offsetParent.getBoundingClientRect().top + scrollY, height:node.offsetHeight}));
    updateScroll();
  }
  function updateScroll() {
    scrollFrame = 0;
    const y = scrollY;
    progress = Math.max(0, Math.min(1, (y - stageTop) / Math.max(1, heroHeight - viewportHeight)));
    hero.style.setProperty('--hero-progress', paused || compact.matches ? 0 : progress.toFixed(4));
    $('.reading-progress').style.transform = `scaleX(${Math.min(1,y / documentHeight)})`;
    for (const scene of scenes) {
      const p = Math.max(0,Math.min(1,(y + viewportHeight*.35 - scene.top) / scene.height));
      scene.node.style.setProperty('--scene-progress', paused ? 0 : p.toFixed(4));
    }

    if (paused && heroVisible && !dialog.open) draw();
  }
  function schedule() { if (!frame && !paused && !document.hidden && heroVisible && !dialog.open && ctx) frame = requestAnimationFrame(tick); }
  function tick(time) {
    frame = 0;
    if (paused || document.hidden || !heroVisible || dialog.open) { lastFrame = 0; return; }
    if (time - lastFrame >= 32) {
      elapsed += lastFrame ? Math.min(time-lastFrame,80)*.00013 : 0;
      lastFrame = time; draw();
    }
    schedule();
  }
  function draw() {
    if (!ctx) return;
    ctx.clearRect(0,0,width,height);
    // Three families of continuous parametric lines, projected into a shallow 3D field.
    // Limited to 32 lines × 128 points on phones, 46 × 160 on desktop, at 30 fps.
    const phone = width < 761, lines = phone ? 32 : 46, points = phone ? 128 : 160;
    const radius = Math.min(width*.36, height*.54);
    const cx = width * (phone ? .53 : mode === 1 ? .68 : .66), cy = height * (phone ? .42 : .49);
    const time = elapsed + seed*6, turn = seed*.5 + (paused ? 0 : progress*.5);
    ctx.lineWidth = phone ? .65 : .75;
    for (let line=0; line<lines; line++) {
      const v = line/(lines-1), band = (v-.5)*1.3;
      const brightness = .1 + .34*Math.pow(Math.sin(v*Math.PI),2);
      ctx.strokeStyle = color; ctx.globalAlpha = brightness;
      ctx.beginPath();
      for (let point=0; point<=points; point++) {
        const t = point/points*Math.PI*2;
        let x,y,z;
        if (mode===0) {
          const r = 1 + band*.45 + .12*Math.sin(t*3 + time);
          x = Math.cos(t)*r; y = Math.sin(t)*r*.72;
          z = Math.sin(t*2 + band*2 + time*.6)*.46;
        } else if (mode===1) {
          x = (t/Math.PI-1)*1.55;
          y = Math.sin(t*1.2 + time*.5 + band*.7)*.52 + band*.65;
          z = Math.cos(t*1.7 + band*2 + time*.3)*.6;
        } else {
          const r = 1 + .3*Math.cos(t*3+time*.4) + band*.4;
          x = Math.cos(t)*r; y = Math.sin(t)*r*.66;
          z = Math.sin(t*3+band*2+time*.4)*.7;
        }
        const rx = x*Math.cos(turn)-y*Math.sin(turn);
        const ry = x*Math.sin(turn)+y*Math.cos(turn);
        const perspective = 2.8/(2.8+z);
        const px = cx + (rx*radius + mouseX*9)*perspective;
        const py = cy + (ry*radius + z*radius*.26 + mouseY*6)*perspective;
        if (!point) ctx.moveTo(px,py); else ctx.lineTo(px,py);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }
  function setPaused(value) {
    paused = value;
    document.body.classList.toggle('motion-enabled',!paused);
    document.body.classList.toggle('motion-paused',paused);
    motionButton.setAttribute('aria-pressed',String(paused));
    motionButton.setAttribute('aria-label',paused ? words.resume : words.pause);
    motionButton.firstElementChild.textContent = paused ? '▷' : 'Ⅱ';
    if (frame) cancelAnimationFrame(frame);
    frame = 0; lastFrame = 0;
    measure(); draw(); schedule();
  }
  motionButton.hidden = false;
  motionButton.addEventListener('click',() => setPaused(!paused));
  reduced.addEventListener('change',() => setPaused(reduced.matches));
  compact.addEventListener('change',measure);
  window.addEventListener('scroll',() => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll); },{passive:true});
  window.addEventListener('resize',measure,{passive:true});
  document.fonts.ready.then(measure);
  stage.addEventListener('pointermove',event => {
    if (paused || event.pointerType !== 'mouse') return;
    const rect = stage.getBoundingClientRect();
    mouseX = (event.clientX-rect.left)/width-.5; mouseY = (event.clientY-rect.top)/height-.5;
  },{passive:true});
  const resize = new ResizeObserver(measure); resize.observe(stage); resize.observe($('#product-index'));
  new IntersectionObserver(entries => {
    heroVisible = entries[0].isIntersecting;
    if (!heroVisible && frame) { cancelAnimationFrame(frame); frame=0; lastFrame=0; } else schedule();
  }).observe(stage);
  const reveal = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.target.classList.contains('app-marquee')) entry.target.classList.toggle('in-view',entry.isIntersecting);
      else if (entry.isIntersecting) { entry.target.classList.add('is-visible'); reveal.unobserve(entry.target); }
    }
  },{rootMargin:'0px 0px -30px 0px',threshold:.01});
  for (const node of document.querySelectorAll('[data-reveal],.app-marquee')) reveal.observe(node);
  document.addEventListener('visibilitychange',() => {
    if (document.hidden && frame) { cancelAnimationFrame(frame); frame=0; lastFrame=0; } else schedule();
  });
  window.addEventListener('pageshow',event => {
    if (!event.persisted) return;
    try { state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || state; } catch { /* Keep the current rotation. */ }
    try { selectedIds = validSelection(JSON.parse(localStorage.getItem(selectionKey))); } catch { /* Keep the current selection. */ }
    void firstDiscovery();
  });
  setPaused(paused);
  void firstDiscovery();
}
