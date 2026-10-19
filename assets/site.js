(function () {
  var form = document.querySelector('[data-contact-form]');
  if (!form) return;

  var locale = form.getAttribute('data-locale') === 'fr' ? 'fr' : 'en';
  var messages = locale === 'fr'
    ? { sent: 'Votre message a été envoyé.', invalid: 'Le formulaire n’a pas pu être envoyé. Vérifiez les champs puis réessayez.', setup: 'Le formulaire de contact est temporairement indisponible.' }
    : { sent: 'Your message was sent.', invalid: 'The form could not be sent. Check the fields and try again.', setup: 'The contact form is temporarily unavailable.' };
  var status = form.querySelector('[data-form-status]');
  var submit = form.querySelector('[data-submit]');
  var params = new URLSearchParams(window.location.search);
  var app = params.get('app');
  var select = form.elements.app;

  if (app && Array.prototype.some.call(select.options, function (option) { return option.value === app; })) {
    select.value = app;
  }

  if (params.get('sent') === '1') show(messages.sent);
  if (params.get('error') === '1') show(messages.invalid);

  function show(message) {
    status.textContent = message;
    status.hidden = false;
  }

  function setup(sitekey) {
    var target = form.querySelector('[data-turnstile]');
    if (!window.turnstile || !target) {
      show(messages.setup);
      return;
    }
    window.turnstile.render(target, {
      sitekey: sitekey,
      action: 'contact',
      callback: function () { submit.disabled = false; },
      'expired-callback': function () { submit.disabled = true; },
      'error-callback': function () { submit.disabled = true; show(messages.setup); }
    });
  }

  fetch('/api/contact/config', { headers: { Accept: 'application/json' } })
    .then(function (response) {
      if (!response.ok) throw new Error('Contact config unavailable');
      return response.json();
    })
    .then(function (config) {
      if (!config.sitekey) throw new Error('Turnstile is not configured');
      window.onContactTurnstileReady = function () { setup(config.sitekey); };
      var script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onContactTurnstileReady&render=explicit';
      script.async = true;
      script.defer = true;
      script.onerror = function () { show(messages.setup); };
      document.head.appendChild(script);
    })
    .catch(function () { show(messages.setup); });
}());
