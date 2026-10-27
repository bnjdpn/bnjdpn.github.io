// Keep the existing support submit handler; load the same-origin API's public widget configuration.
(function () {
  'use strict';
  var started = false;
  var form = document.querySelector('.support-form');
  if (!form) return;
  function load() {
    if (started) return;
    started = true;
    function failed() { form.querySelector('.form-status').textContent = form.dataset.error; }
    fetch('/api/contact/config', { headers: { Accept: 'application/json' }, credentials: 'omit' })
      .then(function (response) { if (!response.ok) throw new Error('configuration'); return response.json(); })
      .then(function (config) {
        if (typeof config.sitekey !== 'string' || !config.sitekey) throw new Error('configuration');
        form.querySelector('.cf-turnstile').dataset.sitekey = config.sitekey;
        var script = document.createElement('script');
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
        script.async = true;
        script.onerror = failed;
        document.head.appendChild(script);
      }).catch(failed);
  }
  form.addEventListener('focusin', load);
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      if (entries.some(function (entry) { return entry.isIntersecting; })) { observer.disconnect(); load(); }
    }, { rootMargin: '200px' });
    observer.observe(form);
  } else { load(); }
}());
