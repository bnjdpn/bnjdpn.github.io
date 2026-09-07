const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const distanceThreshold = width => clamp(width * .24, 64, 160);
const REST = {x: 0, y: 0, rotation: 0, left: 0, right: 0, opacity: 1};
const PROPERTIES = ['--drag-x', '--drag-y', '--drag-rotation', '--drag-left', '--drag-right', 'opacity'];
const INTERACTIVE = 'a,button,input,textarea,select,option,label,summary,[contenteditable]:not([contenteditable="false"]),[role="button"],[role="link"],[role="slider"],[role="textbox"],audio[controls],video[controls],[data-no-swipe]';

/** Distances are CSS pixels; velocityX is the recent horizontal velocity in px/ms. */
export function decideSwipe({dx = 0, dy = 0, velocityX = 0, width = 320} = {}) {
  if (![dx, dy, velocityX, width].every(Number.isFinite) || width <= 0) return 0;
  const distance = Math.abs(dx);
  if (distance < 10 || distance < Math.abs(dy) * 1.25) return 0;
  const farEnough = distance >= distanceThreshold(width);
  const intentionalFling = distance >= clamp(width * .08, 28, 48)
    && Math.abs(velocityX) >= .65 && Math.sign(velocityX) === Math.sign(dx);
  return farEnough || intentionalFling ? Math.sign(dx) : 0;
}

/**
 * Owns the drag variables and temporary inline opacity, never the application state.
 * The surface must use touch-action: pan-y pinch-zoom. Its card's transform must use
 * --drag-x, --drag-y and --drag-rotation, without a CSS transition on those updates.
 * onSwipe owns the async exit/content/enter pipeline; its rejection returns to rest.
 * All animation promises settle when interrupted or destroyed. reset() also returns
 * a promise. destroy() restores the inline styles present at installation.
 */
export function installSwipeGesture({surface, card, onSwipe, canSwipe = () => true, isMotionReduced = () => false}) {
  if (!surface?.addEventListener || !card?.style || typeof onSwipe !== 'function') {
    throw new TypeError('A swipe surface, card and onSwipe callback are required.');
  }
  const doc = surface.ownerDocument;
  const view = doc?.defaultView;
  if (!doc?.addEventListener || !view?.requestAnimationFrame) {
    throw new TypeError('The swipe surface must belong to a browser document.');
  }
  const now = () => view.performance.now();
  const original = new Map(PROPERTIES.map(name => [name, [card.style.getPropertyValue(name), card.style.getPropertyPriority(name)]]));
  const contacts = new Set();
  const listeners = [];
  let active = null, animation = null, destroyed = false, pipelineBusy = false;
  let multipleContacts = false, clickGuard = null, lastDirection = 0;
  let pose = {...REST};

  function listen(target, type, handler, options) {
    target.addEventListener(type, handler, options);
    listeners.push(() => target.removeEventListener(type, handler, options));
  }
  function restore(name) {
    const [value, priority] = original.get(name);
    if (value) card.style.setProperty(name, value, priority);
    else card.style.removeProperty(name);
  }
  function render(next) {
    pose = {...next};
    card.style.setProperty('--drag-x', `${pose.x.toFixed(3)}px`);
    card.style.setProperty('--drag-y', `${pose.y.toFixed(3)}px`);
    card.style.setProperty('--drag-rotation', `${pose.rotation.toFixed(3)}deg`);
    card.style.setProperty('--drag-left', clamp(pose.left, 0, 1).toFixed(3));
    card.style.setProperty('--drag-right', clamp(pose.right, 0, 1).toFixed(3));
    card.style.setProperty('opacity', String(clamp(pose.opacity, 0, 1)));
  }
  const quiet = () => doc.hidden || isMotionReduced();
  const widthOfCard = () => Math.max(1, card.offsetWidth || card.getBoundingClientRect().width || 320);
  const spring = t => 1 - Math.exp(-8 * t) * (Math.cos(11 * t) + 8 / 11 * Math.sin(11 * t));

  function stopAnimation() {
    if (!animation) return;
    const previous = animation;
    animation = null;
    view.cancelAnimationFrame(previous.frame);
    previous.resolve();
  }
  function animateTo(target, duration, easing, onFinish = () => {}) {
    stopAnimation();
    if (destroyed) return Promise.resolve();
    if (quiet() || !duration) {
      render(target);
      onFinish();
      return Promise.resolve();
    }
    const from = {...pose}, start = now();
    return new Promise(resolve => {
      const current = {frame: 0, resolve, finish};
      animation = current;
      function finish() {
        if (animation !== current) return;
        view.cancelAnimationFrame(current.frame);
        animation = null;
        render(target);
        onFinish();
        resolve();
      }
      function tick(time) {
        if (animation !== current) return;
        const progress = clamp((time - start) / duration, 0, 1);
        if (progress === 1 || quiet()) return finish();
        const amount = easing(progress);
        render(Object.fromEntries(Object.keys(REST).map(key => [key, from[key] + (target[key] - from[key]) * amount])));
        current.frame = view.requestAnimationFrame(tick);
      }
      current.frame = view.requestAnimationFrame(tick);
    });
  }
  function detachPointer() {
    const previous = active;
    active = null;
    if (previous) {
      try {
        if (surface.hasPointerCapture(previous.id)) surface.releasePointerCapture(previous.id);
      } catch { /* The browser may already have cancelled the pointer. */ }
    }
    return previous;
  }
  function guardClick() { clickGuard = {until: now() + 500}; }
  function reset() {
    const previous = detachPointer();
    if (previous?.axis === 'horizontal') guardClick();
    return animateTo({...REST}, 360, spring, () => restore('opacity'));
  }
  function cancelGesture() {
    if (!active) return;
    if (active.axis === 'horizontal') void reset();
    else detachPointer();
  }
  function playExit(direction) {
    if (direction !== -1 && direction !== 1) return Promise.reject(new TypeError('Swipe direction must be -1 or 1.'));
    const previous = detachPointer();
    if (previous?.axis === 'horizontal') guardClick();
    lastDirection = direction;
    const width = widthOfCard();
    const distance = Math.max((view.innerWidth || width * 2) + width, Math.abs(pose.x) + width);
    const target = quiet() ? {...pose, opacity: 0} : {
      x: direction * distance, y: pose.y + Math.min(width * .18, 80), rotation: direction * 18,
      left: direction < 0 ? 1 : 0, right: direction > 0 ? 1 : 0, opacity: 0,
    };
    return animateTo(target, 260, t => t * (.35 + .65 * t));
  }
  function playEnter() {
    const previous = detachPointer();
    if (previous?.axis === 'horizontal') guardClick();
    stopAnimation();
    if (destroyed) return Promise.resolve();
    if (!quiet()) render({...REST, x: lastDirection * -12, y: 18, rotation: lastDirection * -.8, opacity: 0});
    return animateTo({...REST}, 400, spring, () => restore('opacity'));
  }
  function interactive(event) {
    for (const node of event.composedPath?.() || []) {
      if (node?.matches?.(INTERACTIVE)) return true;
      if (node === surface) break;
    }
    return Boolean(event.target?.closest?.(INTERACTIVE));
  }
  function sample(gesture, event) {
    const lastTime = gesture.samples.at(-1)?.time ?? 0;
    const time = Number.isFinite(event.timeStamp) ? Math.max(lastTime, event.timeStamp) : now();
    gesture.samples.push({x: event.clientX, time});
    while (gesture.samples.length > 1 && time - gesture.samples[0].time > 100) gesture.samples.shift();
  }
  function velocity(gesture) {
    const first = gesture.samples[0], last = gesture.samples.at(-1);
    return last.time > first.time ? (last.x - first.x) / (last.time - first.time) : 0;
  }
  function drag(gesture, event) {
    const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y;
    const threshold = distanceThreshold(gesture.width);
    render({x: dx, y: clamp(dy * .18, -70, 70), rotation: clamp(dx / gesture.width * 12, -16, 16),
      left: clamp(-dx / threshold, 0, 1), right: clamp(dx / threshold, 0, 1), opacity: 1});
  }
  function trackContact(event) {
    if (!active && event.isPrimary !== false && event.button === 0) clickGuard = null;
    if (event.pointerType !== 'touch' && event.pointerType !== 'pen') return;
    contacts.add(event.pointerId);
    if (contacts.size > 1 || (active && active.id !== event.pointerId)) {
      multipleContacts = true;
      cancelGesture();
    }
  }
  function endContact(event) {
    contacts.delete(event.pointerId);
    if (!contacts.size) multipleContacts = false;
  }
  function pointerDown(event) {
    if (destroyed || active || animation || pipelineBusy || multipleContacts || !canSwipe()) return;
    if (event.button !== 0 || event.buttons > 1 || event.isPrimary === false || interactive(event)) return;
    active = {id: event.pointerId, type: event.pointerType, x: event.clientX, y: event.clientY,
      width: widthOfCard(), axis: 'pending', samples: []};
    sample(active, event);
  }
  function pointerMove(event) {
    if (!active || event.pointerId !== active.id) return;
    if (!canSwipe() || (active.type !== 'touch' && event.buttons !== 1)) return cancelGesture();
    sample(active, event);
    const dx = Math.abs(event.clientX - active.x), dy = Math.abs(event.clientY - active.y);
    if (active.axis === 'pending') {
      // Leave vertical scrolling to the browser, before requesting pointer capture.
      if (dy >= 10 && dy > dx) return detachPointer();
      if (dx < 10 || dx < dy * 1.25) return;
      active.axis = 'horizontal';
      try { surface.setPointerCapture(active.id); } catch { /* Document listeners also follow the pointer outside the surface. */ }
    }
    if (event.cancelable) event.preventDefault();
    drag(active, event);
  }
  function pointerUp(event) {
    if (active?.id === event.pointerId) {
      const gesture = active;
      if (gesture.axis !== 'horizontal' || !canSwipe()) cancelGesture();
      else {
        sample(gesture, event);
        drag(gesture, event);
        const direction = decideSwipe({dx: event.clientX - gesture.x, dy: event.clientY - gesture.y,
          velocityX: velocity(gesture), width: gesture.width});
        detachPointer();
        guardClick();
        if (!direction) void reset();
        else {
          pipelineBusy = true;
          // Call before any reset: the exit animation starts at the released pose.
          let result;
          try { result = onSwipe(direction); }
          catch (error) { result = Promise.reject(error); }
          Promise.resolve(result).catch(() => reset()).finally(() => { pipelineBusy = false; });
        }
      }
    }
    endContact(event);
  }
  function pointerCancel(event) {
    if (event.pointerId === active?.id) cancelGesture();
    endContact(event);
  }
  function suppressClick(event) {
    if (!clickGuard || event.detail === 0 || now() > clickGuard.until) return;
    clickGuard = null;
    event.preventDefault();
    event.stopImmediatePropagation();
  }
  function destroy() {
    if (destroyed) return;
    destroyed = true;
    detachPointer();
    stopAnimation();
    contacts.clear();
    clickGuard = null;
    for (const remove of listeners) remove();
    for (const name of PROPERTIES) restore(name);
  }

  render({...REST});
  restore('opacity');
  listen(doc, 'pointerdown', trackContact, {capture: true, passive: true});
  listen(surface, 'pointerdown', pointerDown, {passive: true});
  listen(doc, 'pointermove', pointerMove, {capture: true, passive: false});
  listen(doc, 'pointerup', pointerUp, {capture: true, passive: true});
  listen(doc, 'pointercancel', pointerCancel, {capture: true, passive: true});
  // Touch starts with implicit capture on a child. Its bubbled loss is expected
  // when horizontal intent transfers capture to the surface.
  listen(surface, 'lostpointercapture', event => { if (event.target === surface && event.pointerId === active?.id) cancelGesture(); });
  listen(surface, 'click', suppressClick, {capture: true});
  listen(surface, 'dragstart', event => { if (active && !interactive(event)) event.preventDefault(); });
  listen(view, 'blur', () => { cancelGesture(); contacts.clear(); multipleContacts = false; });
  listen(doc, 'visibilitychange', () => { if (doc.hidden) { cancelGesture(); animation?.finish(); } });
  return {playExit, playEnter, reset, destroy};
}
