import {nextDiscovery, STORAGE_KEY} from './discovery.mjs';
const dataNode = document.querySelector('#discovery-data');
const hero = document.querySelector('.experience');
if (dataNode && hero) startExperience(JSON.parse(dataNode.textContent));

function startExperience(apps) {
  const $ = selector => document.querySelector(selector);
  const stage = $('.experience-stage');
  const canvas = $('.flow-field');
  const ctx = canvas.getContext('2d', {alpha:true});
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const compact = window.matchMedia('(max-width: 999px), (max-height: 719px)');
  const nextButton = $('#next-discovery');
  const motionButton = $('#motion-toggle');
  const palettes = {training:['#b8f3d6','#91d4f8','#e4de9c'],everyday:['#ead4ae','#d3c0fa','#addbc6'],family:['#bbc9f2','#d7dfb0','#edc6bc'],play:['#b1ecce','#acd4f7','#d5c4f2']};
  let saved;
  try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch { /* Storage is optional. */ }
  let state = saved, mode = 0, seed = .5, color = '#b8f3d6', paused = reduced.matches;
  let frame = 0, lastFrame = 0, elapsed = 0, heroVisible = true, width = 1, height = 1;
  let stageTop = 0, heroHeight = 1, viewportHeight = innerHeight, documentHeight = 1;
  let scrollFrame = 0, progress = 0, mouseX = 0, mouseY = 0;
  let scenes = [];
  const random = () => { const value = new Uint32Array(1); crypto.getRandomValues(value); return value[0] / 4294967296; };

  async function choose(announce = false) {
    const selected = nextDiscovery(apps.map(app => app.id), state, random);
    if (!selected) return;
    const app = apps.find(app => app.id === selected.id);
    nextButton.disabled = true;
    // Keep the complete current presentation if a new image cannot be loaded.
    const image = new Image();
    image.src = app.image.src;
    try { await image.decode(); } catch { nextButton.disabled = false; return; }
    state = selected.state; mode = selected.mode; seed = selected.seed / 1000000;
    color = palettes[app.category][mode];
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* In-memory rotation still works. */ }
    document.documentElement.style.setProperty('--accent', color);
    hero.dataset.featured = app.id;
    hero.dataset.composition = mode === 1 ? 'reverse' : 'forward';
    hero.dataset.field = ['orbit','wave','fold'][mode];
    hero.dataset.landscape = String(app.image.width > app.image.height);
    hero.dataset.watch = String(app.id === 'PasDuJour');
    $('#discovery-name').textContent = app.name;
    $('#discovery-number').textContent = app.number;
    $('#discovery-headline').textContent = app.headline;
    $('#discovery-platform').textContent = app.platform;
    $('#discovery-icon').src = app.icon;
    $('#discovery-link').href = app.url;
    $('#discovery-image-link').href = app.url;
    $('#discovery-image-link').setAttribute('aria-label', `${$('#discovery-link').textContent.replace('↗','').trim()} ${app.name}`);
    const visibleImage = $('#discovery-image');
    visibleImage.width = app.image.width; visibleImage.height = app.image.height;
    visibleImage.src = app.image.src; visibleImage.alt = app.name;
    if (announce) $('#discovery-announcement').textContent = `${app.name}. ${app.headline}`;
    nextButton.disabled = false;
    measure(); draw(); schedule();
  }
  nextButton.hidden = false;
  nextButton.addEventListener('click', () => choose(true));

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

    if (paused && heroVisible) draw();
  }
  function schedule() { if (!frame && !paused && !document.hidden && heroVisible && ctx) frame = requestAnimationFrame(tick); }
  function tick(time) {
    frame = 0;
    if (paused || document.hidden || !heroVisible) { lastFrame = 0; return; }
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
    const time = elapsed + seed*6, turn = seed*.5 + progress*.5;
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
    document.body.classList.toggle('motion-enabled', !paused);
    document.body.classList.toggle('motion-paused', paused);
    motionButton.setAttribute('aria-pressed', String(paused));
    motionButton.setAttribute('aria-label', paused ? motionButton.dataset.resume : motionButton.dataset.pause);
    motionButton.firstElementChild.textContent = paused ? '▷' : 'Ⅱ';
    if (frame) cancelAnimationFrame(frame);
    frame = 0; lastFrame = 0;
    measure(); draw(); schedule();
  }
  motionButton.hidden = false;
  motionButton.addEventListener('click', () => setPaused(!paused));
  reduced.addEventListener('change', () => setPaused(reduced.matches));
  compact.addEventListener('change', measure);
  window.addEventListener('scroll', () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll); }, {passive:true});
  window.addEventListener('resize', measure, {passive:true});
  document.fonts.ready.then(measure);
  stage.addEventListener('pointermove', event => {
    if (paused || event.pointerType !== 'mouse') return;
    const rect = stage.getBoundingClientRect();
    mouseX = (event.clientX-rect.left)/width-.5; mouseY = (event.clientY-rect.top)/height-.5;
    hero.style.setProperty('--pointer-x', mouseX.toFixed(3)); hero.style.setProperty('--pointer-y', mouseY.toFixed(3));
  }, {passive:true});
  new ResizeObserver(measure).observe(stage);
  new IntersectionObserver(entries => { heroVisible = entries[0].isIntersecting; if (!heroVisible && frame) { cancelAnimationFrame(frame); frame=0;lastFrame=0; } else schedule(); }).observe(stage);
  document.addEventListener('visibilitychange', () => { if (document.hidden && frame) { cancelAnimationFrame(frame); frame=0;lastFrame=0; } else schedule(); });
  window.addEventListener('pageshow', event => { if (event.persisted) { try { state = JSON.parse(localStorage.getItem(STORAGE_KEY)) || state; } catch {} choose(); } });
  setPaused(paused);
  choose();
}
