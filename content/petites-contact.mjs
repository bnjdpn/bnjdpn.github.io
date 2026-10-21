// Contact disclosures apply only to the four Petites with a product-site form.
export const petitesFormApps = new Set(['petites-gouttes', 'petites-bouchees', 'petites-dents', 'petites-nuits']);
export const petitesFormPrivacy = {
  fr: `Le formulaire est protégé contre le spam par Cloudflare Turnstile, qui analyse des signaux techniques du navigateur (dont l'adresse IP) pour distinguer une personne d'un robot. Turnstile n'est chargé que sur la page de l'app qui contient le formulaire de contact, pas sur ces pages. Le message est ensuite transmis par Cloudflare (Workers et Email Routing) à la boîte d'assistance du développeur, petites@bnjdpn.com. Les messages reçus sont lus et traités par un assistant automatisé (IA) utilisé par l'éditeur pour les trier et préparer ou envoyer les réponses ; l'éditeur reste responsable de ce traitement.`,
  en: `The form is protected against spam by Cloudflare Turnstile, which analyzes technical browser signals (including the IP address) to distinguish a person from a bot. Turnstile is loaded only on the app page that contains the contact form, not on these pages. The message is then forwarded by Cloudflare (Workers and Email Routing) to the developer's support inbox, petites@bnjdpn.com. Messages received are read and handled by an automated assistant (AI) used by the publisher to sort them and prepare or send replies; the publisher remains responsible for this processing.`
};
export const petitesMailApps = new Set(['petits-pots', 'petits-besoins']);
export const petitesMailPrivacy = {
  fr: `Les messages envoyés à petites@bnjdpn.com sont lus et traités par un assistant automatisé (IA) utilisé par l'éditeur pour les trier et préparer ou envoyer les réponses ; l'éditeur reste responsable de ce traitement.`,
  en: `Messages sent to petites@bnjdpn.com are read and handled by an automated assistant (AI) used by the publisher to sort them and prepare or send replies; the publisher remains responsible for this processing.`
};
