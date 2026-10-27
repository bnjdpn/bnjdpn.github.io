(function () {
  'use strict';
  var body = document.body;
  var tasks = document.querySelector('.tasks');
  var startBtn = document.querySelector('.start');
  var menu = document.getElementById('start-menu');
  var lang = document.documentElement.lang;
  var flow = window.matchMedia('(max-width: 999px), (max-height: 639px)');
  // Below 1000px wide: folders open as windows, About starts as a taskbar balloon.
  var phone = window.matchMedia('(max-width: 999px)');
  // Tablets in portrait: windows leave the icon column visible and usable.
  var roomy = window.matchMedia('(min-width: 701px) and (max-width: 999px) and (min-height: 640px)');
  var baseTitle = document.title;
  var z = 20, cascade = 0, contactLoaded = !!document.querySelector('script[src*="contact.js"]');
  var openers = new Map();

  function win(id) { var w = id && document.getElementById(id); return w && (w.classList.contains('win') || w.classList.contains('group')) ? w : null; }
  function isFolder(w) { return w.classList.contains('group'); }
  function openWins() { return Array.prototype.slice.call(document.querySelectorAll('.win.is-open, .group.is-open')); }
  function heading(w) { return w.querySelector('.win-body h1, .win-body h2, .group-label'); }
  function iconFor(id) {
    var all = document.querySelectorAll('.icon[data-open="' + id + '"]');
    for (var i = 0; i < all.length; i++) if (all[i].offsetParent) return all[i];
    return all[0] || null;
  }
  var about = document.getElementById('about');
  function counts(w) { return w !== about || w.classList.contains('is-max'); }

  function front(w) {
    document.querySelectorAll('.win.is-front, .group.is-front').forEach(function (x) { x.classList.remove('is-front'); });
    w.classList.add('is-front');
    w.style.zIndex = ++z;
    syncTasks();
  }

  var root = document.documentElement, desk = document.querySelector('.desktop');
  function scale() { return parseFloat(root.style.getPropertyValue('--z')) || 1; }
  window.addEventListener('resize', function () {
    var w = Math.min(1290, (innerHeight - 70) * 1.39, innerWidth - 48);
    root.style.setProperty('--z', Math.max(0.7, Math.min(1.12, w / 1153)).toFixed(3));
  });

  function place(w) {
    if (flow.matches || w.dataset.placed || !w.classList.contains('win-app')) return;
    var sw = desk.clientWidth, sh = desk.clientHeight;
    var left = Math.min(400 + 28 * cascade, sw - w.offsetWidth - 14);
    var top = Math.min(22 + 26 * cascade, Math.max(14, sh - w.offsetHeight - 14));
    cascade = (cascade + 1) % 6;
    w.style.left = Math.max(14, left) + 'px';
    w.style.top = top + 'px';
    w.dataset.placed = '1';
  }

  function task(w) {
    var b = tasks.querySelector('[data-task="' + w.id + '"]');
    if (b) return b;
    b = document.createElement('button');
    b.type = 'button';
    b.className = 'task';
    b.dataset.task = w.id;
    var img = w.querySelector('.win-bar img');
    if (img) { var i = document.createElement('img'); i.src = img.src; i.width = 16; i.height = 16; i.alt = ''; b.appendChild(i); }
    var s = document.createElement('span');
    s.textContent = w.querySelector('.win-title').textContent;
    b.appendChild(s);
    b.setAttribute('aria-label', s.textContent);
    tasks.appendChild(b);
    return b;
  }

  function syncTasks() {
    tasks.querySelectorAll('.task').forEach(function (b) {
      var w = win(b.dataset.task);
      b.setAttribute('aria-pressed', String(!!w && w.classList.contains('is-open') && w.classList.contains('is-front')));
    });
    document.querySelectorAll('.icon.is-active').forEach(function (i) { i.classList.remove('is-active'); });
    openWins().forEach(function (w) { var i = iconFor(w.id); if (i) i.classList.add('is-active'); });
    var shown = openWins().filter(counts);
    var full = flow.matches && shown.length > 0;
    body.classList.toggle('win-full', full);
    var icons = document.querySelector('.icons');
    var pd = document.querySelector('.phone-desk');
    if (phone.matches) {
      // Only the front window takes keyboard and screen reader focus.
      var topW = shown.sort(function (a, b) { return (+b.style.zIndex || 0) - (+a.style.zIndex || 0); })[0];
      if (icons) icons.inert = false;
      document.querySelectorAll('.desktop .win, .desktop .group').forEach(function (w) { w.inert = !!topW && w !== topW && !topW.contains(w) && !w.contains(topW); });
      if (pd) pd.inert = full && !roomy.matches;
    } else {
      document.querySelectorAll('.desktop .win, .desktop .group').forEach(function (w) { w.inert = false; });
      if (icons) icons.inert = full;
    }
  }

  function setHash(id) {
    var url = location.pathname + location.search + (id ? '#' + id : '');
    if (location.href.slice(location.origin.length) !== url) history.replaceState(null, '', url);
  }

  function open(id, opener) {
    var w = win(id);
    if (!w || (isFolder(w) && !phone.matches)) return false;
    closeMenu(false);
    if (id === 'contact' && !contactLoaded) {
      contactLoaded = true;
      var s = document.createElement('script');
      s.src = body.dataset.contactScript;
      s.defer = true;
      document.head.appendChild(s);
    }
    w.classList.add('is-open');
    if (w === about && phone.matches) w.classList.add('is-max');
    if (opener) openers.set(id, opener);
    place(w);
    front(w);
    if (w !== about) task(w);
    syncTasks();
    if (w !== about) setHash(id);
    var h = heading(w);
    if (h) { h.tabIndex = -1; h.focus({ preventScroll: !flow.matches }); }
    return true;
  }

  function restoreFocus(id) {
    var o = openers.get(id) || iconFor(id);
    if (o && o.isConnected && !o.closest('[hidden]')) o.focus(); else document.getElementById('main').focus();
  }

  function close(w) {
    w.classList.remove('is-open', 'is-front');
    if (w === about && phone.matches) w.classList.add('is-dismissed');
    if (w === about) w.classList.remove('is-max');
    var b = tasks.querySelector('[data-task="' + w.id + '"]');
    if (b) b.remove();
    if (location.hash === '#' + w.id) setHash('');
    if (w.id === 'contact') document.title = baseTitle;
    var rest = openWins();
    if (rest.length) front(rest.sort(function (a, b) { return (+b.style.zIndex || 0) - (+a.style.zIndex || 0); })[0]);
    syncTasks();
    restoreFocus(w.id);
  }

  function minimize(w) {
    w.classList.remove('is-open', 'is-front', 'is-max');
    if (location.hash === '#' + w.id) setHash('');
    syncTasks();
    var b = tasks.querySelector('[data-task="' + w.id + '"]');
    if (b) b.focus();
  }

  function closeMenu(focusStart) {
    if (!menu || menu.hidden) return;
    menu.hidden = true;
    startBtn.setAttribute('aria-expanded', 'false');
    menu.querySelectorAll('.sm-cat > button').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    if (focusStart) startBtn.focus();
  }

  function toggleMenu() {
    if (!menu.hidden) { closeMenu(true); return; }
    menu.hidden = false;
    startBtn.setAttribute('aria-expanded', 'true');
    var first = menu.querySelector('.sm-row');
    if (first) first.focus();
  }

  var contactPage = body.dataset.page === 'contact';

  document.addEventListener('click', function (e) {
    var t = e.target.closest('a, button');
    if (menu && !menu.hidden && !e.target.closest('#start-menu, .start')) closeMenu(false);
    if (!t) return;
    if (t === startBtn) { toggleMenu(); return; }
    if (t.matches('.sm-cat > button')) {
      var on = t.getAttribute('aria-expanded') !== 'true';
      menu.querySelectorAll('.sm-cat > button').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
      t.setAttribute('aria-expanded', String(on));
      if (on) { var f = t.nextElementSibling.querySelector('a'); if (f && !matchMedia('(hover: hover)').matches) f.focus(); }
      return;
    }
    if (t.dataset.task) {
      var tw = win(t.dataset.task);
      if (tw.classList.contains('is-open') && tw.classList.contains('is-front')) minimize(tw); else open(tw.id, t);
      return;
    }
    if (t.dataset.close && t.dataset.close === 'about' && phone.matches && !about.classList.contains('is-max')) { e.preventDefault(); close(about); return; }
    if (t.dataset.close && !(contactPage && t.dataset.close === 'contact')) { e.preventDefault(); close(win(t.dataset.close)); return; }
    if (t.dataset.min) { e.preventDefault(); minimize(win(t.dataset.min)); return; }
    if (t.dataset.open && win(t.dataset.open)) { e.preventDefault(); open(t.dataset.open, t.closest('#start-menu') ? startBtn : t); }
  });

  document.addEventListener('pointerdown', function (e) {
    var w = e.target.closest('.win');
    if (w && w.classList.contains('is-open') && !w.classList.contains('is-front')) front(w);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (menu && !menu.hidden) { closeMenu(true); return; }
    var top = openWins().filter(function (w) { return w.classList.contains('is-front') && counts(w); })[0];
    if (top && !(contactPage && top.id === 'contact')) close(top);
  });

  // Drag a window by its title bar on the desktop layout.
  document.addEventListener('pointerdown', function (e) {
    var bar = e.target.closest('.win-bar');
    if (!bar || flow.matches || e.button !== 0 || e.target.closest('.win-btn')) return;
    var w = bar.parentElement;
    if (!w.classList.contains('is-open')) return;
    var sx = e.clientX, sy = e.clientY, ox = w.offsetLeft, oy = w.offsetTop, k = scale();
    var maxX = desk.clientWidth - 80, maxY = desk.clientHeight - 30;
    w.style.right = 'auto';
    w.style.left = ox + 'px';
    function move(ev) {
      w.style.left = Math.max(-w.offsetWidth + 120, Math.min(maxX, ox + (ev.clientX - sx) / k)) + 'px';
      w.style.top = Math.max(0, Math.min(maxY, oy + (ev.clientY - sy) / k)) + 'px';
    }
    function up() { document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up); }
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
    w.dataset.placed = '1';
  });

  var clock = document.querySelector('.clock');
  function tick() {
    var d = new Date();
    clock.textContent = d.toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit' });
    clock.dateTime = d.toTimeString().slice(0, 5);
  }
  if (clock) { tick(); setInterval(tick, 20000); }

  flow.addEventListener('change', syncTasks);
  roomy.addEventListener('change', syncTasks);
  function syncAbout() {
    if (!about) return;
    if (phone.matches) { if (!about.classList.contains('is-max')) about.classList.remove('is-open'); }
    else { about.classList.remove('is-max', 'is-dismissed'); about.classList.add('is-open'); }
  }
  phone.addEventListener('change', function () {
    syncAbout();
    if (!phone.matches) document.querySelectorAll('.group.is-open').forEach(function (g) { g.classList.remove('is-open', 'is-front'); var b = tasks.querySelector('[data-task="' + g.id + '"]'); if (b) b.remove(); });
    syncTasks();
  });
  window.addEventListener('hashchange', function () { var id = location.hash.slice(1); if (win(id) && !win(id).classList.contains('is-open')) open(id); });
  if (about) about.classList.add('is-front');
  syncAbout();
  var start = location.hash.slice(1);
  if (win(start) && start !== 'about') open(start);
  else if (contactPage) { var c = win('contact'); front(c); }
})();
