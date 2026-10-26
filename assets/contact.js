(function () {
  'use strict';
  const form = document.getElementById('support-form');
  if (!form) return;
  const status = document.getElementById('form-status');
  const button = document.getElementById('send-message');
  const copy = JSON.parse(form.dataset.messages);
  const query = new URLSearchParams(window.location.search);
  const apps = JSON.parse(form.dataset.apps);
  const appField = form.elements.namedItem('app');
  const requested = query.get('app');
  if (requested && Object.hasOwn(apps, requested)) appField.value = requested;
  const validApp = () => Object.hasOwn(apps, appField.value);
  const field = name => form.elements.namedItem(name);
  const oneLine = value => (value || '').replace(/[\u0000-\u001f\u007f]+/g, ' ').trim().slice(0, 64);
  const category = query.get('category');
  if (['other', 'bug', 'purchase', 'suggestion'].includes(category)) field('category').value = category;
  for (const [name, label] of [['app_version', 'app-version-label'], ['os_version', 'os-version-label']]) {
    const value = oneLine(query.get(name));
    field(name).value = value;
    if (value) document.getElementById(label).textContent = value;
  }
  // Preserve only the supported context when changing language, never email/message.
  document.querySelectorAll('.languages a').forEach(link => {
    const url = new URL(link.href);
    if (validApp()) url.searchParams.set('app', appField.value);
    for (const name of ['category', 'app_version', 'os_version']) {
      const value = field(name).value;
      if (value) url.searchParams.set(name, value);
    }
    link.href = url.href;
  });
  let token = '', widget, busy = false, settledStatus = null;
  const setStatus = key => { status.textContent = copy[key]; };
  const verificationLost = key => {
    token = ''; button.disabled = true;
    if (!busy && settledStatus !== 'success') status.textContent = (settledStatus === 'error' ? copy.error + ' ' : '') + copy[key];
  };
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (busy) return;
    if (!validApp()) { setStatus('invalid'); appField.focus(); return; }
    if (!form.reportValidity()) return;
    if (!token) { setStatus('verify'); return; }
    const data = new FormData(form);
    data.set('cf-turnstile-response', token);
    busy = true; settledStatus = null; button.disabled = true; setStatus('sending');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(form.action, {method: 'POST', body: data, headers: {Accept: 'application/json'}, credentials: 'omit', signal: controller.signal});
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error('unconfirmed');
      field('message').value = '';
      setStatus('success');
      settledStatus = 'success';
    } catch (_) {
      setStatus('error');
      settledStatus = 'error';
    } finally {
      clearTimeout(timeout);
      token = ''; // Tokens are single-use, including failed or ambiguous attempts.
      try { if (widget !== undefined) window.turnstile.reset(widget); } catch (_) { token = ''; }
      busy = false;
      button.disabled = !token;
    }
  });
  const title = document.getElementById('contact-title');
  const privacy = document.getElementById('contact-privacy');
  const showApp = () => {
    title.textContent = validApp() ? title.dataset.template.replace('{app}', apps[appField.value]) : title.dataset.generic;
    document.title = title.textContent + '. Benjamin Dupin';
    privacy.hidden = !validApp();
    if (validApp()) privacy.href = (document.documentElement.lang === 'fr' ? '/fr' : '') + '/apps/' + appField.value + '/privacy/';
  };
  appField.addEventListener('change', showApp);
  showApp();
  let sitekey;
  window.supportTurnstileReady = function () {
    if (!sitekey) { verificationLost('unavailable'); return; }
    clearTimeout(loadTimeout);
    widget = window.turnstile.render('#spam-protection', {
      sitekey, action: 'contact', language: document.documentElement.lang, size: 'flexible',
      callback: value => { token = value; button.disabled = busy; if (!busy && !settledStatus) setStatus('ready'); },
      'expired-callback': () => verificationLost('verify'),
      'error-callback': () => verificationLost('unavailable'),
      'timeout-callback': () => verificationLost('verify')
    });
  };
  const loadTimeout = setTimeout(() => verificationLost('unavailable'), 15000);
  fetch('/api/contact/config', {headers: {Accept: 'application/json'}, credentials: 'omit'})
    .then(response => { if (!response.ok) throw new Error('configuration'); return response.json(); })
    .then(config => {
      if (typeof config.sitekey !== 'string' || !config.sitekey) throw new Error('configuration');
      sitekey = config.sitekey;
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=supportTurnstileReady&render=explicit';
      script.async = true;
      script.onerror = () => { clearTimeout(loadTimeout); verificationLost('unavailable'); };
      document.head.appendChild(script);
    }).catch(() => { clearTimeout(loadTimeout); verificationLost('unavailable'); });
}());
