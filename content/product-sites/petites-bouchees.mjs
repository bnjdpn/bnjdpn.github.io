// Petites Bouchées page copy, version 1.1.11 on sale on the App Store.
// Sources: App Store description and release notes read 2026-10-26, the three
// store screenshots. Google Play listing com.bnjdpn.petitesbouchees answers 200.
// In-App Purchase read 2026-10-26: Baby's Records $5.99 (US), £5.99 (UK),
// Le Dossier de Bébé 6,99 € (FR), one-time. Requires iOS 17.
// The repository already prepares a next version (German, Italian, Brazilian
// Portuguese); this copy names no interface language so it stays true for both.
export default {
  appStoreId: "6760203890",
  lastModified: "2026-10-26",
  playUrl: "https://play.google.com/store/apps/details?id=com.bnjdpn.petitesbouchees",
  operatingSystem: "iOS 17.0 or later, Android",
  applicationCategory: "LifestyleApplication",
  currency: { "en-US": "USD", "en-GB": "GBP", "fr-FR": "EUR" },
  guides: { "en-US": "share-food-journal/", "en-GB": "share-food-journal/", "fr-FR": "fr-FR/partager-journal-aliments/" },
  heroShot: 0,
  sections: [
    { type: "cards", key: "journal", id: "features", anchors: "features", shots: [1, 2] },
    { type: "cards", key: "records", id: "records" },
    { type: "offer", key: "offer", id: "free-and-records" },
  ],
  locales: {
    en: {
      title: "Petites Bouchées: baby food and weaning journal",
      description: "Log your baby's first foods, repeat servings, reactions and 12 major allergens in a free journal. Export the PDFs with a one-time Baby's Records purchase.",
      hero: {
        eyebrow: "Weaning journal for iPhone and Android",
        h1: "A baby food journal for first tastes, reactions and allergens",
        intro: "Search 197 foods or add your own, then log what your baby tried: the date, a purée, a piece or a baby-led meal, your notes and any reaction you saw. A meal can hold several foods with one date and one note.",
        note: "Free journal, with a one-time Baby's Records purchase. Requires iOS 17 on iPhone.",
        play: "Get it on Google Play",
        guide: "Share the journal with family",
      },
      alts: [
        "The Foods screen in Petites Bouchées: filters by category and age, and carrot, apple and banana marked as tried.",
        "The Petites Bouchées journal: carrot, apple and banana listed by date with a short note.",
        "A first taste of carrot in Petites Bouchées: date, reaction, allergy flags and a preparation note.",
      ],
      sections: {
        journal: {
          nav: "Journal",
          kicker: "The journal is free",
          title: "What your baby tried, and when",
          items: [
            ["197 foods, or your own", "Browse by category and by age, filter what is tried or not, and add the foods that are missing."],
            ["First taste and repeats", "Save the first taste with its date, then each repeat on its own date. You can pick a past date and correct the date of a repeat."],
            ["Reactions and notes", "Mark a taste as liked, neutral or disliked, flag a digestive issue or a possible allergic reaction, and note how you prepared it."],
            ["Progress and allergens", "See progress by category and the 12 major allergens you recorded. These screens show what you entered. They do not say whether a food is safe for your child."],
            ["Family transfer by file", "Export the journal to a file and import it on another device. There is no account and no server: the journal stays on your devices."],
          ],
          captions: ["Journal", "A first taste"],
        },
        records: {
          kicker: "Family tab",
          title: "Three PDFs built from your journal",
          items: [
            ["Caregiver handover", "Choose the foods, dates, observations and family instructions to include. The whole handover is free to view, and the first name is hidden by default."],
            ["Feeding record", "A record to bring to your pediatrician. The first page is free to preview."],
            ["Book of firsts", "A keepsake of your baby's firsts. The first page is free to preview."],
          ],
        },
        offer: {
          nav: "Free & Baby's Records",
          kicker: "Free & Baby's Records",
          title: "What Baby's Records adds",
          intro: "The journal stays free, with no account or subscription. Baby's Records is a one-time purchase.",
          plans: [
            {
              title: "Free",
              items: [
                "The full journal and the 197-food catalog",
                "Your own foods",
                "Progress by category and the 12 major allergens",
                "Family transfer by file",
                "The whole caregiver handover on screen, and the first page of the other two PDFs",
              ],
            },
            {
              title: "Baby's Records",
              items: [
                "Export and sharing of the three PDFs: caregiver handover, feeding record and book of firsts",
                "One purchase, no subscription",
                "Shared with your family through Apple Family Sharing",
              ],
            },
          ],
          notes: [
            "On the US App Store, Baby's Records costs $5.99, paid once. In other countries and on Google Play, the store shows the price before you buy.",
            "Access you already had is kept.",
            "Petites Bouchées is a journal you fill in. It gives no feeding advice or medical diagnosis and does not replace a healthcare professional.",
          ],
          privacy: "No account and no server. Your journal is stored on your device until you export or share it.",
          privacyLink: "Privacy policy",
          cta: "See Petites Bouchées on the App Store",
        },
      },
      relatedTitle: "More apps for young families",
      supportTitle: "Questions or a bug to report?",
      supportIntro: "Write to Benjamin Dupin, who develops Petites Bouchées. For a bug, add your app version and your phone system version.",
      footer: "Made by Benjamin Dupin.",
      formNote: "This form is protected against spam by Cloudflare Turnstile, which checks technical browser signals, including your IP address. Cloudflare forwards your message to the publisher.",
    },
    "en-GB": {
      description: "Log your baby's first foods, repeat servings, reactions and 12 major allergens in a free journal. Export the PDFs with a one-off Baby's Records purchase.",
      sections: {
        offer: {
          notes: [
            "On the UK App Store, Baby's Records costs £5.99, paid once. In other countries and on Google Play, the store shows the price before you buy.",
            "Access you already had is kept.",
            "Petites Bouchées is a journal you fill in. It gives no feeding advice or medical diagnosis and does not replace a healthcare professional.",
          ],
        },
      },
    },
    fr: {
      title: "Petites Bouchées : journal de diversification",
      description: "Notez les premiers aliments de bébé, les reprises, les réactions et 12 allergènes majeurs dans un journal gratuit. Exportez les PDF avec Le Dossier de Bébé, en achat unique.",
      hero: {
        eyebrow: "Journal de diversification sur iPhone et Android",
        h1: "Un journal de diversification pour les premiers goûts et les réactions",
        intro: "Cherchez parmi 197 aliments ou ajoutez les vôtres, puis notez ce que bébé a goûté : la date, une purée, un morceau ou un repas en DME, vos notes et les réactions observées. Un repas peut réunir plusieurs aliments avec une date et une note communes.",
        note: "Journal gratuit, avec Le Dossier de Bébé en achat unique. Nécessite iOS 17 sur iPhone.",
        play: "Disponible sur Google Play",
        guide: "Partager le journal en famille",
      },
      alts: [
        "L'écran Aliments de Petites Bouchées : filtres par catégorie et par âge, carotte, pomme et banane déjà goûtées.",
        "Le journal de Petites Bouchées : carotte, pomme et banane classées par date avec une courte note.",
        "Première dégustation de carotte dans Petites Bouchées : date, réaction, signalements et note de préparation.",
      ],
      sections: {
        journal: {
          nav: "Journal",
          kicker: "Le journal reste gratuit",
          title: "Ce que bébé a goûté, et quand",
          items: [
            ["197 aliments, ou les vôtres", "Parcourez par catégorie et par âge, filtrez ce qui est goûté ou non, et ajoutez les aliments qui manquent."],
            ["Première fois et reprises", "Enregistrez la première dégustation avec sa date, puis chaque reprise à sa date. Vous pouvez choisir une date passée et corriger la date d'une reprise."],
            ["Réactions et notes", "Indiquez si bébé a aimé, est resté neutre ou n'a pas aimé, signalez un problème digestif ou une réaction allergique possible, et notez la préparation."],
            ["Progression et allergènes", "Voyez la progression par catégorie et les 12 allergènes majeurs que vous avez notés. Ces écrans décrivent vos observations. Ils n'indiquent pas si un aliment est sûr pour votre enfant."],
            ["Transfert familial par fichier", "Exportez le journal dans un fichier et importez-le sur un autre appareil. Pas de compte, pas de serveur : le journal reste sur vos appareils."],
          ],
          captions: ["Journal", "Une première dégustation"],
        },
        records: {
          kicker: "Onglet Famille",
          title: "Trois PDF tirés de votre journal",
          items: [
            ["Fiche de garde", "Choisissez les aliments, les dates, les observations et les consignes familiales à inclure. La fiche se consulte gratuitement en entier, et le prénom est masqué par défaut."],
            ["Suivi alimentaire", "Un document destiné à la pédiatre. La première page est consultable gratuitement."],
            ["Carnet des premières fois", "Un souvenir des premières fois de bébé. La première page est consultable gratuitement."],
          ],
        },
        offer: {
          nav: "Gratuit et Dossier de Bébé",
          kicker: "Gratuit et Dossier de Bébé",
          title: "Ce que Le Dossier de Bébé ajoute",
          intro: "Le journal reste gratuit, sans compte ni abonnement. Le Dossier de Bébé est un achat unique.",
          plans: [
            {
              title: "Gratuit",
              items: [
                "Le journal complet et le catalogue de 197 aliments",
                "Vos propres aliments",
                "La progression par catégorie et les 12 allergènes majeurs",
                "Le transfert familial par fichier",
                "La fiche de garde complète à l'écran, et la première page des deux autres PDF",
              ],
            },
            {
              title: "Le Dossier de Bébé",
              items: [
                "Export et partage des trois PDF : fiche de garde, suivi alimentaire et carnet des premières fois",
                "Un seul achat, sans abonnement",
                "Partagé avec votre famille via le Partage familial Apple",
              ],
            },
          ],
          notes: [
            "Sur l'App Store français, Le Dossier de Bébé coûte 6,99 €, en une seule fois. Dans les autres pays et sur Google Play, la boutique affiche le prix avant l'achat.",
            "Les droits déjà acquis sont conservés.",
            "Petites Bouchées est un journal rempli par le parent, sans conseil alimentaire, avis ni diagnostic médical. Elle ne remplace pas un professionnel de santé.",
          ],
          privacy: "Pas de compte, pas de serveur. Le journal est conservé sur votre appareil jusqu'à ce que vous l'exportiez ou le partagiez.",
          privacyLink: "Politique de confidentialité",
          cta: "Voir Petites Bouchées sur l'App Store",
        },
      },
      relatedTitle: "D'autres apps pour les jeunes parents",
      supportTitle: "Une question ou un bug à signaler ?",
      supportIntro: "Écrivez à Benjamin Dupin, qui développe Petites Bouchées. Pour un bug, indiquez la version de l'app et celle du système de votre téléphone.",
      footer: "Créé par Benjamin Dupin.",
      formNote: "Ce formulaire est protégé contre le spam par Cloudflare Turnstile, qui vérifie des signaux techniques du navigateur, dont votre adresse IP. Cloudflare transmet votre message à l'éditeur.",
    },
  },
};
