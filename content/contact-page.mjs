import catalog from './catalog.json' with { type: 'json' };
import { appDocuments } from './app-documents.mjs';

// Apps whose own privacy text describes the form in detail (see petites-contact.mjs).
export const contactApps = {'petits-pots': 'Petits Pots', 'petits-besoins': 'Petits Besoins'};
// Every app the form accepts, keyed like the bnjdpn-contact-email Worker.
export const formApps = Object.fromEntries([...catalog, ...appDocuments]
  .map(app => [app.path.toLowerCase(), app.name])
  .sort(([, a], [, b]) => a.localeCompare(b, 'fr')));
export const contactCopy = {
  en: {
    title: 'Contact {app}', genericTitle: 'Contact', pageTitle: 'Contact Benjamin Dupin', intro: 'A question, a purchase issue or an idea? Write to the app’s support team.',
    app: 'App', choose: 'Choose an app', email: 'Your email', category: 'Subject', message: 'Your message', send: 'Send message',
    categories: [['other', 'A question'], ['bug', 'Something is not working'], ['purchase', 'Purchase or restoration'], ['suggestion', 'An idea']],
    privacy: 'Your email, message and the app/system versions shown in Technical details, the approximate country and the referring site are sent to support through Cloudflare. Please do not include personal information about a child.',
    versions: 'Technical details included', appVersion: 'App version', osVersion: 'System version', unavailable: 'Not provided',
    nojs: 'Enable JavaScript to use the protected form.',
    policy: 'Privacy policy', security: 'Spam protection is loading…',
    messages: {ready: 'Ready to send.', verify: 'Complete the spam protection before sending.', unavailable: 'Spam protection is unavailable. Reload the page.', sending: 'Sending…', success: 'Message sent. Support will reply to your email.', error: 'The message could not be confirmed as sent. Your text is kept. Please try again.', invalid: 'Choose the app your message is about.'}
  },
  fr: {
    title: 'Contacter {app}', genericTitle: 'Contact', pageTitle: 'Contacter Benjamin Dupin', intro: 'Une question, un problème d’achat ou une idée ? Écrivez à l’assistance de l’app.',
    app: 'App', choose: 'Choisissez une app', email: 'Votre e-mail', category: 'Sujet', message: 'Votre message', send: 'Envoyer le message',
    categories: [['other', 'Une question'], ['bug', 'Un problème dans l’app'], ['purchase', 'Achat ou restauration'], ['suggestion', 'Une idée']],
    privacy: 'Votre e-mail, votre message et les versions de l’app et du système affichées dans les détails techniques, le pays approximatif et le site d’origine sont transmis à l’assistance via Cloudflare. N’incluez pas d’informations personnelles sur un enfant.',
    versions: 'Détails techniques transmis', appVersion: 'Version de l’app', osVersion: 'Version du système', unavailable: 'Non renseignée',
    nojs: 'Activez JavaScript pour utiliser le formulaire protégé.',
    policy: 'Confidentialité', security: 'Chargement de la protection antispam…',
    messages: {ready: 'Prêt à envoyer.', verify: 'Terminez la vérification antispam avant l’envoi.', unavailable: 'La protection antispam est indisponible. Rechargez la page.', sending: 'Envoi en cours…', success: 'Message envoyé. L’assistance vous répondra par e-mail.', error: 'L’envoi du message n’a pas pu être confirmé. Votre texte est conservé. Réessayez.', invalid: 'Choisissez l’app concernée.'}
  }
};

export function contactBody(lang, esc) {
  const t = contactCopy[lang];
  return `<main id="main" tabindex="-1"><article class="plain contact-page"><h1 id="contact-title" data-template="${esc(t.title)}" data-generic="${esc(t.genericTitle)}">${t.genericTitle}</h1><p>${t.intro}</p>
<form id="support-form" action="/api/contact" method="post" data-messages="${esc(JSON.stringify(t.messages))}" data-apps="${esc(JSON.stringify(formApps))}">
<label for="app">${t.app}</label><select id="app" name="app" required><option value="">${t.choose}</option>${Object.entries(formApps).map(([value,label])=>`<option value="${value}">${esc(label)}</option>`).join('')}</select>
<label for="email">${t.email}</label><input id="email" name="email" type="email" autocomplete="email" maxlength="254" required>
<label for="category">${t.category}</label><select id="category" name="category">${t.categories.map(([value,label])=>`<option value="${value}">${label}</option>`).join('')}</select>
<label for="message">${t.message}</label><textarea id="message" name="message" rows="7" minlength="2" maxlength="5000" required></textarea>
<div class="contact-trap" aria-hidden="true"><label for="website">Website</label><input id="website" name="_gotcha" tabindex="-1" autocomplete="off"></div>
<details><summary>${t.versions}</summary><dl><dt>${t.appVersion}</dt><dd id="app-version-label">${t.unavailable}</dd><dt>${t.osVersion}</dt><dd id="os-version-label">${t.unavailable}</dd></dl></details>
<input type="hidden" name="app_version"><input type="hidden" name="os_version">
<p class="contact-privacy">${t.privacy} <a id="contact-privacy" href="${lang==='fr'?'/fr/':'/'}#products" hidden>${t.policy}</a> <a href="https://www.cloudflare.com/turnstile-privacy-policy/">Cloudflare Turnstile</a></p>
<div id="spam-protection"></div><p id="form-status" role="status" aria-live="polite">${t.security}</p>
<button id="send-message" class="store-button" type="submit" disabled>${t.send}</button>
</form><noscript><p>${t.nojs}</p></noscript></article></main>`;
}
