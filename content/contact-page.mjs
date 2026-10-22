export const contactCopy = {
  en: {
    title: 'Contact Petits Pots', intro: 'A question, a purchase issue or an idea? Write to the app’s support team.',
    email: 'Your email', category: 'Subject', message: 'Your message', send: 'Send message',
    categories: [['other', 'A question'], ['bug', 'Something is not working'], ['purchase', 'Purchase or restoration'], ['suggestion', 'An idea']],
    privacy: 'Your email, message and the app/system versions shown in Technical details, the approximate country and the referring site are sent to support through Cloudflare. Grok Bot helps process requests; Benjamin Dupin remains responsible. Please do not include personal information about a child.',
    versions: 'Technical details included', appVersion: 'App version', osVersion: 'System version', unavailable: 'Not provided',
    fallback: 'You can also email', nojs: 'Enable JavaScript to use the protected form, or send an email.',
    policy: 'Privacy policy', security: 'Spam protection is loading…',
    messages: {ready: 'Ready to send.', verify: 'Complete the spam protection before sending.', unavailable: 'Spam protection is unavailable. Reload the page or use the email link below.', sending: 'Sending…', success: 'Message sent. Support will reply to your email.', error: 'The message could not be confirmed as sent. Your text is kept. Please try again or use the email link below.', invalid: 'This form supports Petits Pots. Please use the email link for another app.'}
  },
  fr: {
    title: 'Contacter Petits Pots', intro: 'Une question, un problème d’achat ou une idée ? Écrivez à l’assistance de l’app.',
    email: 'Votre e-mail', category: 'Sujet', message: 'Votre message', send: 'Envoyer le message',
    categories: [['other', 'Une question'], ['bug', 'Un problème dans l’app'], ['purchase', 'Achat ou restauration'], ['suggestion', 'Une idée']],
    privacy: 'Votre e-mail, votre message et les versions de l’app et du système affichées dans les détails techniques, le pays approximatif et le site d’origine sont transmis à l’assistance via Cloudflare. Grok Bot aide à traiter les demandes ; Benjamin Dupin reste responsable. N’incluez pas d’informations personnelles sur un enfant.',
    versions: 'Détails techniques transmis', appVersion: 'Version de l’app', osVersion: 'Version du système', unavailable: 'Non renseignée',
    fallback: 'Vous pouvez aussi écrire à', nojs: 'Activez JavaScript pour utiliser le formulaire protégé, ou envoyez un e-mail.',
    policy: 'Confidentialité', security: 'Chargement de la protection antispam…',
    messages: {ready: 'Prêt à envoyer.', verify: 'Terminez la vérification antispam avant l’envoi.', unavailable: 'La protection antispam est indisponible. Rechargez la page ou utilisez le lien e-mail ci-dessous.', sending: 'Envoi en cours…', success: 'Message envoyé. L’assistance vous répondra par e-mail.', error: 'L’envoi du message n’a pas pu être confirmé. Votre texte est conservé. Réessayez ou utilisez le lien e-mail ci-dessous.', invalid: 'Ce formulaire concerne Petits Pots. Pour une autre app, utilisez le lien e-mail.'}
  }
};

export function contactBody(lang, esc) {
  const t = contactCopy[lang];
  return `<main id="main" tabindex="-1"><article class="plain contact-page"><h1>${t.title}</h1><p>${t.intro}</p>
<form id="support-form" action="https://petites-forms.bnjdpn.com/contact" method="post" data-messages="${esc(JSON.stringify(t.messages))}">
<input type="hidden" name="app" value="petits-pots">
<label for="email">${t.email}</label><input id="email" name="email" type="email" autocomplete="email" maxlength="254" required>
<label for="category">${t.category}</label><select id="category" name="category">${t.categories.map(([value,label])=>`<option value="${value}">${label}</option>`).join('')}</select>
<label for="message">${t.message}</label><textarea id="message" name="message" rows="7" minlength="2" maxlength="5000" required></textarea>
<div class="contact-trap" aria-hidden="true"><label for="website">Website</label><input id="website" name="_gotcha" tabindex="-1" autocomplete="off"></div>
<details><summary>${t.versions}</summary><dl><dt>${t.appVersion}</dt><dd id="app-version-label">${t.unavailable}</dd><dt>${t.osVersion}</dt><dd id="os-version-label">${t.unavailable}</dd></dl></details>
<input type="hidden" name="app_version"><input type="hidden" name="os_version">
<p class="contact-privacy">${t.privacy} <a href="${lang==='fr'?'/fr':''}/apps/petits-pots/privacy/">${t.policy}</a> · <a href="https://www.cloudflare.com/turnstile-privacy-policy/">Cloudflare Turnstile</a></p>
<div id="spam-protection"></div><p id="form-status" role="status" aria-live="polite">${t.security}</p>
<button id="send-message" class="store-button" type="submit" disabled>${t.send}</button>
</form><noscript><p>${t.nojs}</p></noscript><p>${t.fallback} <a href="mailto:petites@bnjdpn.com">petites@bnjdpn.com</a>.</p></article></main>`;
}
