import test from 'node:test';
import assert from 'node:assert/strict';
import {decideSwipe, installSwipeGesture} from '../assets/swipe-gesture.mjs';

test('short movements never make a choice, including a very fast tap', () => {
  for (const dx of [-20, -4, 0, 4, 20]) assert.equal(decideSwipe({dx, velocityX: Math.sign(dx) * 4, width: 400}), 0);
});
test('intentional distance selects left or right, in proportion to card width', () => {
  assert.equal(decideSwipe({dx: -100, dy: 20, width: 400}), -1);
  assert.equal(decideSwipe({dx: 100, dy: -20, width: 400}), 1);
  assert.equal(decideSwipe({dx: 80, width: 300}), 1);
  assert.equal(decideSwipe({dx: 80, width: 600}), 0);
});
test('vertical and ambiguous diagonal motion cannot select an app', () => {
  for (const [dx, dy] of [[80, 180], [-160, 190], [100, 100]]) {
    assert.equal(decideSwipe({dx, dy, velocityX: Math.sign(dx) * 2, width: 320}), 0);
  }
});
test('a fling needs both recent speed and meaningful travel in the same direction', () => {
  assert.equal(decideSwipe({dx: 40, velocityX: .8, width: 400}), 1);
  assert.equal(decideSwipe({dx: -40, velocityX: -.8, width: 400}), -1);
  assert.equal(decideSwipe({dx: 40, velocityX: .2, width: 400}), 0);
  assert.equal(decideSwipe({dx: 40, velocityX: -.8, width: 400}), 0);
});
test('invalid geometry is inert', () => {
  assert.equal(decideSwipe({dx: NaN}), 0);
  assert.equal(decideSwipe({dx: 100, width: 0}), 0);
  assert.equal(decideSwipe({dx: 100, velocityX: Infinity}), 0);
});

class Target {
  listeners = new Map();
  addEventListener(type, callback) {
    if (!this.listeners.has(type)) this.listeners.set(type, new Set());
    this.listeners.get(type).add(callback);
  }
  removeEventListener(type, callback) { this.listeners.get(type)?.delete(callback); }
  emit(type, event = {}) {
    event = {target: this, cancelable: true, defaultPrevented: false, stopped: false,
      preventDefault() { this.defaultPrevented = true; },
      stopImmediatePropagation() { this.stopped = true; }, ...event};
    for (const callback of [...(this.listeners.get(type) || [])]) {
      callback(event);
      if (event.stopped) break;
    }
    return event;
  }
  listenerCount() { return [...this.listeners.values()].reduce((count, set) => count + set.size, 0); }
}
class Style {
  values = new Map();
  setProperty(name, value, priority = '') { this.values.set(name, [String(value), priority]); }
  getPropertyValue(name) { return this.values.get(name)?.[0] || ''; }
  getPropertyPriority(name) { return this.values.get(name)?.[1] || ''; }
  removeProperty(name) { this.values.delete(name); }
}
function harness({reduced = true, onSwipe = () => {}, allowed = true, initialStyle = {}} = {}) {
  const doc = new Target(), view = new Target(), surface = new Target(), card = new Target();
  let time = 0, serial = 0;
  const frames = new Map(), captures = new Set();
  Object.assign(view, {innerWidth: 1200, performance: {now: () => time},
    requestAnimationFrame(callback) { const id = ++serial; frames.set(id, callback); return id; },
    cancelAnimationFrame(id) { frames.delete(id); }});
  Object.assign(doc, {defaultView: view, hidden: false});
  Object.assign(surface, {ownerDocument: doc,
    setPointerCapture(id) { captures.add(id); }, hasPointerCapture(id) { return captures.has(id); },
    releasePointerCapture(id) { captures.delete(id); surface.emit('lostpointercapture', {pointerId: id}); }});
  Object.assign(card, {style: new Style(), offsetWidth: 400, getBoundingClientRect: () => ({width: 400})});
  for (const [name, [value, priority]] of Object.entries(initialStyle)) card.style.setProperty(name, value, priority);
  const state = {reduced, allowed};
  const control = installSwipeGesture({surface, card, onSwipe, canSwipe: () => state.allowed, isMotionReduced: () => state.reduced});
  function pointer(type, x, y = 0, options = {}) {
    const event = {pointerId: 1, pointerType: 'mouse', isPrimary: true, button: 0,
      buttons: type === 'pointerup' ? 0 : 1, clientX: x, clientY: y, timeStamp: time, target: card, ...options};
    if (type === 'pointerdown') { doc.emit(type, event); return surface.emit(type, event); }
    return doc.emit(type, event);
  }
  return {doc, view, surface, card, state, control, captures, frames, pointer,
    value: name => parseFloat(card.style.getPropertyValue(name)),
    advance(ms) { time += ms; const pending = [...frames.values()]; frames.clear(); for (const callback of pending) callback(time); },
    click: options => surface.emit('click', {detail: 1, ...options})};
}
const flush = async () => { for (let i = 0; i < 6; i++) await Promise.resolve(); };

test('a tap keeps its click and does not capture the pointer', () => {
  let calls = 0;
  const h = harness({onSwipe: () => calls++});
  h.pointer('pointerdown', 0); h.pointer('pointermove', 5); h.pointer('pointerup', 5);
  assert.equal(calls, 0); assert.equal(h.captures.size, 0); assert.equal(h.click().defaultPrevented, false);
  h.control.destroy();
});
test('links, buttons, inputs and secondary mouse buttons stay interactive', () => {
  let calls = 0;
  const h = harness({onSwipe: () => calls++});
  for (const tag of ['a', 'button', 'input']) {
    const target = {closest: selector => selector.split(',').includes(tag) ? target : null};
    h.pointer('pointerdown', 0, 0, {target}); h.pointer('pointermove', 180); h.pointer('pointerup', 180);
    assert.equal(h.click().defaultPrevented, false);
  }
  h.pointer('pointerdown', 0, 0, {button: 2, buttons: 2}); h.pointer('pointermove', 180); h.pointer('pointerup', 180);
  assert.equal(calls, 0); assert.equal(h.value('--drag-x'), 0);
  h.control.destroy();
});
test('vertical scrolling stays uncaptured and unprevented, even if the pointer turns later', () => {
  let calls = 0;
  const h = harness({onSwipe: () => calls++});
  h.pointer('pointerdown', 0, 0, {pointerType: 'touch'});
  const move = h.pointer('pointermove', 4, 35, {pointerType: 'touch'});
  h.pointer('pointermove', 200, 40, {pointerType: 'touch'}); h.pointer('pointerup', 200, 40, {pointerType: 'touch'});
  assert.equal(move.defaultPrevented, false); assert.equal(h.captures.size, 0);
  assert.equal(calls, 0); assert.equal(h.click().defaultPrevented, false);
  h.control.destroy();
});
test('implicit touch capture can transfer from a child to the swipe surface', () => {
  const calls = [];
  const h = harness({onSwipe: direction => calls.push(direction)});
  h.pointer('pointerdown', 0, 0, {pointerType:'touch'});
  h.pointer('pointermove', 12, 0, {pointerType:'touch'});
  h.surface.emit('lostpointercapture', {target:h.card,pointerId:1});
  h.pointer('pointermove', 150, 0, {pointerType:'touch'});
  h.pointer('pointerup', 150, 0, {pointerType:'touch'});
  assert.deepEqual(calls,[1]);
  h.control.destroy();
});
test('a pen can swipe, but its barrel button cannot start or continue a swipe', () => {
  for (const phase of ['normal', 'down', 'move']) {
    let calls = 0;
    const h = harness({onSwipe: () => calls++});
    h.pointer('pointerdown', 0, 0, {pointerType: 'pen', button: phase === 'down' ? 2 : 0, buttons: phase === 'down' ? 2 : 1});
    h.pointer('pointermove', 35, 0, {pointerType: 'pen'});
    h.pointer('pointermove', 150, 0, {pointerType: 'pen', buttons: phase === 'move' ? 3 : 1});
    h.pointer('pointerup', 150, 0, {pointerType: 'pen'});
    assert.equal(calls, phase === 'normal' ? 1 : 0);
    h.control.destroy();
  }
});
test('a committed swipe hands its released pose to the pipeline exactly once', async () => {
  let finish, calls = 0, released;
  const h = harness({onSwipe: direction => {
    calls++; released = [direction, h.value('--drag-x'), h.value('--drag-right')];
    return new Promise(resolve => { finish = resolve; });
  }});
  h.pointer('pointerdown', 0); h.advance(180);
  assert.equal(h.pointer('pointermove', 120, 12).defaultPrevented, true);
  assert.equal(h.captures.size, 1);
  h.pointer('pointerup', 130, 12);
  assert.deepEqual(released, [1, 130, 1]); assert.equal(h.captures.size, 0);
  h.surface.emit('lostpointercapture', {pointerId: 1});
  h.pointer('pointerdown', 0); h.pointer('pointermove', -180); h.pointer('pointerup', -180);
  assert.equal(calls, 1);
  finish(); await flush(); h.control.destroy();
});
test('an insufficient horizontal drag resets and suppresses only its compatibility click', () => {
  const h = harness();
  h.pointer('pointerdown', 0); h.advance(200); h.pointer('pointermove', 22); h.advance(200); h.pointer('pointerup', 22);
  assert.equal(h.value('--drag-x'), 0);
  assert.equal(h.click({detail: 0}).defaultPrevented, false);
  assert.equal(h.click().defaultPrevented, true);
  assert.equal(h.click().defaultPrevented, false);
  h.control.destroy();
});
test('a fresh press is not blocked by the previous drag click guard', () => {
  const h = harness();
  h.pointer('pointerdown', 0); h.pointer('pointermove', 22); h.pointer('pointerup', 22);
  h.pointer('pointerdown', 0); h.pointer('pointerup', 0);
  assert.equal(h.click().defaultPrevented, false);
  h.control.destroy();
});
test('recent fling velocity commits, but a pause before release discards old velocity', () => {
  for (const pause of [0, 200]) {
    const calls = [];
    const h = harness({onSwipe: direction => calls.push(direction)});
    h.pointer('pointerdown', 0); h.advance(35); h.pointer('pointermove', -42); h.advance(pause + 5); h.pointer('pointerup', -44);
    assert.deepEqual(calls, pause ? [] : [-1]);
    h.control.destroy();
  }
});
test('a second touch anywhere in the document cancels the drag and preserves the pinch', () => {
  let calls = 0;
  const h = harness({onSwipe: () => calls++});
  h.pointer('pointerdown', 0, 0, {pointerType: 'touch'}); h.pointer('pointermove', 90, 0, {pointerType: 'touch'});
  const second = h.doc.emit('pointerdown', {pointerId: 2, pointerType: 'touch', isPrimary: false, button: 0});
  assert.equal(second.defaultPrevented, false); assert.equal(h.value('--drag-x'), 0); assert.equal(h.captures.size, 0);
  h.pointer('pointerup', 150, 0, {pointerType: 'touch'});
  h.pointer('pointerdown', 0, 0, {pointerId: 3, pointerType: 'touch'});
  h.pointer('pointermove', 150, 0, {pointerId: 3, pointerType: 'touch'});
  h.pointer('pointerup', 150, 0, {pointerId: 3, pointerType: 'touch'});
  assert.equal(calls, 0);
  h.doc.emit('pointerup', {pointerId: 2});
  h.pointer('pointerdown', 0, 0, {pointerType: 'touch'}); h.pointer('pointermove', 150, 0, {pointerType: 'touch'}); h.pointer('pointerup', 150, 0, {pointerType: 'touch'});
  assert.equal(calls, 1);
  h.control.destroy();
});
test('pointercancel, lost capture and window blur return to rest without choosing', () => {
  for (const cancel of ['pointercancel', 'lostpointercapture', 'blur']) {
    let calls = 0;
    const h = harness({onSwipe: () => calls++});
    h.pointer('pointerdown', 0); h.pointer('pointermove', 120);
    (cancel === 'blur' ? h.view : cancel === 'lostpointercapture' ? h.surface : h.doc).emit(cancel, {pointerId: 1});
    h.pointer('pointerup', 150);
    assert.equal(calls, 0); assert.equal(h.value('--drag-x'), 0); assert.equal(h.captures.size, 0);
    h.control.destroy();
  }
});
test('canSwipe blocks new gestures and cancels a gesture if availability changes', () => {
  let calls = 0;
  const h = harness({allowed: false, onSwipe: () => calls++});
  h.pointer('pointerdown', 0); h.pointer('pointermove', 150); h.pointer('pointerup', 150);
  h.state.allowed = true; h.pointer('pointerdown', 0); h.pointer('pointermove', 40);
  h.state.allowed = false; h.pointer('pointermove', 150); h.pointer('pointerup', 150);
  assert.equal(calls, 0); assert.equal(h.value('--drag-x'), 0);
  h.control.destroy();
});
test('exit and entry settle with no animation frame left behind', async () => {
  const h = harness({reduced: false});
  const exit = h.control.playExit(-1); h.advance(300); await exit;
  assert.ok(h.value('--drag-x') < -h.view.innerWidth); assert.equal(h.value('opacity'), 0);
  const enter = h.control.playEnter(); h.advance(450); await enter;
  assert.equal(h.value('--drag-x'), 0); assert.equal(h.value('--drag-y'), 0); assert.equal(h.value('--drag-left'), 0);
  assert.equal(h.card.style.getPropertyValue('opacity'), ''); assert.equal(h.frames.size, 0);
  h.control.destroy();
});
test('reset interrupts an animation, and both promises still settle', async () => {
  const h = harness({reduced: false});
  const exit = h.control.playExit(1); h.advance(80);
  assert.ok(h.value('--drag-x') > 0);
  const reset = h.control.reset(); await exit;
  h.advance(400); await reset;
  assert.equal(h.value('--drag-x'), 0); assert.equal(h.frames.size, 0);
  h.control.destroy();
});
test('reduced motion and backgrounding finish without waiting for another frame', async () => {
  const h = harness();
  await h.control.playExit(1); assert.equal(h.value('--drag-x'), 0); assert.equal(h.frames.size, 0);
  await h.control.playEnter(); assert.equal(h.value('--drag-y'), 0);
  h.state.reduced = false;
  const exit = h.control.playExit(1);
  h.doc.hidden = true; h.doc.emit('visibilitychange'); await exit;
  await h.control.playEnter(); assert.equal(h.frames.size, 0); assert.equal(h.value('--drag-x'), 0);
  h.control.destroy();
});
test('pipeline rejection restores the card and allows a later gesture', async () => {
  let calls = 0;
  const h = harness({onSwipe: async () => { calls++; throw new Error('Content unavailable'); }});
  for (let attempt = 0; attempt < 2; attempt++) {
    h.pointer('pointerdown', 0); h.pointer('pointermove', 150); h.pointer('pointerup', 150); await flush();
    assert.equal(h.value('--drag-x'), 0);
  }
  assert.equal(calls, 2); h.control.destroy();
});
test('destroy settles pending work, removes listeners and is safe to repeat', async () => {
  const h = harness({reduced: false});
  const exit = h.control.playExit(1); h.control.destroy(); await exit;
  h.control.destroy(); await h.control.playEnter(); await h.control.reset();
  assert.equal(h.frames.size, 0);
  assert.equal(h.surface.listenerCount() + h.doc.listenerCount() + h.view.listenerCount(), 0);
  assert.equal(h.card.style.getPropertyValue('--drag-x'), '');
  assert.equal(h.card.style.getPropertyValue('opacity'), '');
});
test('temporary opacity and drag styles restore without changing unrelated styling', async () => {
  const h = harness({initialStyle: {'--drag-x': ['7px', ''], opacity: ['.72', 'important'], '--accent': ['#abc', '']}});
  await h.control.playExit(1); assert.equal(h.value('opacity'), 0);
  await h.control.playEnter();
  assert.equal(h.card.style.getPropertyValue('opacity'), '.72');
  assert.equal(h.card.style.getPropertyPriority('opacity'), 'important');
  h.card.style.setProperty('--accent', '#def');
  h.control.destroy();
  assert.equal(h.card.style.getPropertyValue('--drag-x'), '7px');
  assert.equal(h.card.style.getPropertyValue('--accent'), '#def');
});
test('enabling reduced motion settles an animation on its next frame', async () => {
  const h = harness({reduced: false});
  const exit = h.control.playExit(1); h.advance(40);
  h.state.reduced = true; h.advance(16); await exit;
  assert.equal(h.value('opacity'), 0); assert.equal(h.frames.size, 0);
  await h.control.playEnter(); assert.equal(h.value('--drag-x'), 0);
  h.control.destroy();
});
