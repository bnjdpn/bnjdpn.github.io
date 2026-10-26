// Petites Nuits page copy, version 1.2.5 on sale on the App Store.
// Sources: App Store description and release notes read 2026-10-26, the three
// store screenshots (en-GB shows the 24-hour diary instead of the trends chart).
// Google Play listing com.bnjdpn.petitesnuits answers 200.
// In-App Purchase read 2026-10-26: Sleep Diary PDF $3.99 (US), £3.99 (UK),
// Carnet de sommeil PDF 4,99 € (FR), one-time. Requires iOS 17.
export default {
  appStoreId: "6764533941",
  lastModified: "2026-10-26",
  playUrl: "https://play.google.com/store/apps/details?id=com.bnjdpn.petitesnuits",
  operatingSystem: "iOS 17.0 or later, Android",
  applicationCategory: "LifestyleApplication",
  currency: { "en-US": "USD", "en-GB": "GBP", "fr-FR": "EUR" },
  heroShot: 0,
  sections: [
    { type: "cards", key: "log", id: "features", anchors: "features", shots: [1, 2] },
    { type: "cards", key: "pdf", id: "pdf-diary" },
    { type: "offer", key: "offer", id: "free-and-diary" },
  ],
  locales: {
    en: {
      title: "Petites Nuits: baby sleep log for nights and naps",
      description: "Log your baby's nights, naps and wakeups, read noon-to-noon totals and preview the full PDF diary for free. A one-time purchase unlocks sharing and printing.",
      hero: {
        eyebrow: "Baby sleep diary for iPhone and Android",
        h1: "A baby sleep log for nights, naps and wakeups",
        intro: "Choose night or nap, start the timer or enter the times, then note wakeups, feeds, mood on waking and what you saw. The diary groups every entry from noon to noon.",
        note: "Free, with a one-time Sleep Diary PDF purchase. Requires iOS 17 on iPhone.",
        play: "Get it on Google Play",
      },
      alts: [
        "New sleep entry in Petites Nuits: night or nap, quick sleep log button, bedtime, wake time and mood on waking.",
        "A night in progress in Petites Nuits, started at 10:00 PM, with the Baby wakes up button.",
        "Trends in Petites Nuits: sleep duration and wakeups over the last 14 nights.",
      ],
      sections: {
        log: {
          nav: "Sleep log",
          kicker: "Logging is free",
          title: "Nights and naps, as you saw them",
          items: [
            ["Night or nap", "Enter the dates and times, or start, pause and resume the free timer. The session stays open after you close the app."],
            ["Wakeups and notes", "Note each wakeup and how long it lasted, feeds, mood on waking and your observations."],
            ["A noon-to-noon day", "Totals exclude wakeups, show the part recorded as naps and never count overlapping periods twice. Durations follow elapsed time, clock changes included."],
            ["Calendar, grid and statistics", "Open every entry of a day from the calendar. The sleep grid shows nights and naps together, and night statistics stay separate."],
            ["Widget", "On the Home Screen or Lock Screen: sleep time excluding pauses, number of wakeups and whether a night is in progress. The widget is free."],
          ],
          captions: ["Sleep in progress", "Trends"],
        },
        pdf: {
          kicker: "PDF diary",
          title: "An A4 diary to keep or share",
          items: [
            ["What it contains", "A noon-to-noon grid with naps marked, a descriptive summary, the recorded periods and dated notes."],
            ["7, 14 or 28 days", "Made on your iPhone, offline, with a comparison to the previous period of the same length."],
            ["Free preview", "Preview every page and every period for free. Sharing, printing and saving the PDF need the one-time purchase."],
          ],
        },
        offer: {
          nav: "Free & PDF diary",
          kicker: "Free & PDF diary",
          title: "What the Sleep Diary PDF purchase adds",
          intro: "Logging and reading the diary are free. Sleep Diary PDF is a one-time purchase, with no subscription.",
          plans: [
            {
              title: "Free",
              items: [
                "Logging nights and naps, and the sleep timer",
                "Calendar, sleep grid, history and statistics",
                "The Home Screen and Lock Screen widget",
                "The full PDF preview, every page and period",
              ],
            },
            {
              title: "Sleep Diary PDF",
              items: [
                "Share, print and save the PDF",
                "One purchase, no subscription",
                "Restore from the purchase screen or from Support",
              ],
            },
          ],
          notes: [
            "On the US App Store, Sleep Diary PDF costs $3.99, paid once. In other countries and on Google Play, the store shows the price before you buy.",
            "Access you already had is kept.",
            "Petites Nuits describes what you record. It does not predict the next nap, offer a sleep-training program, make a diagnosis or give medical advice.",
          ],
          privacy: "No account, ads or data collection. The diary stays on your iPhone.",
          privacyLink: "Privacy policy",
          cta: "See Petites Nuits on the App Store",
        },
      },
      relatedTitle: "More apps for young families",
      supportTitle: "Questions or a bug to report?",
      supportIntro: "Write to Benjamin Dupin, who develops Petites Nuits. For a bug, add your app version and your phone system version.",
      footer: "Made by Benjamin Dupin.",
      formNote: "This form is protected against spam by Cloudflare Turnstile, which checks technical browser signals, including your IP address. Cloudflare forwards your message to the publisher.",
    },
    "en-GB": {
      description: "Log your baby's nights, naps and wakeups, read noon-to-noon totals and preview the full PDF diary for free. A one-off purchase unlocks sharing and printing.",
      hero: {
        note: "Free, with a one-off Sleep Diary PDF purchase. Requires iOS 17 on iPhone.",
      },
      alts: [
        "New sleep entry in Petites Nuits: night or nap, quick sleep log button, bedtime, wake time and mood on waking.",
        "A night in progress in Petites Nuits, started at 22:00, with the Baby wakes up button.",
        "The 24-hour diary in Petites Nuits: naps and nights listed by day, with totals excluding wakeups.",
      ],
      sections: {
        log: { captions: ["Sleep in progress", "24-hour diary"] },
        offer: {
          notes: [
            "On the UK App Store, Sleep Diary PDF costs £3.99, paid once. In other countries and on Google Play, the store shows the price before you buy.",
            "Access you already had is kept.",
            "Petites Nuits describes what you record. It does not predict the next nap, offer a sleep-training programme, make a diagnosis or give medical advice.",
          ],
        },
      },
    },
    fr: {
      title: "Petites Nuits : journal du sommeil de bébé",
      description: "Notez les nuits, les siestes et les réveils de bébé, lisez les totaux de midi à midi et prévisualisez le carnet PDF gratuitement. Un achat unique débloque le partage.",
      hero: {
        eyebrow: "Carnet de sommeil de bébé sur iPhone et Android",
        h1: "Notez les nuits, les siestes et les réveils de votre bébé",
        intro: "Choisissez nuit ou sieste, lancez le minuteur ou saisissez les heures, puis notez les réveils, les tétées ou biberons, le ressenti au réveil et vos observations. Le carnet regroupe les entrées de midi à midi.",
        note: "Gratuit, avec le Carnet de sommeil PDF en achat unique. Nécessite iOS 17 sur iPhone.",
        play: "Disponible sur Google Play",
      },
      alts: [
        "Nouveau sommeil dans Petites Nuits : nuit ou sieste, saisie rapide, coucher, réveil et humeur au réveil.",
        "Une nuit en cours dans Petites Nuits, commencée à 22:00, avec le bouton Bébé se réveille.",
        "Évolution dans Petites Nuits : durée de sommeil et réveils sur les 14 dernières nuits.",
      ],
      sections: {
        log: {
          nav: "Sommeil",
          kicker: "La saisie est gratuite",
          title: "Les nuits et les siestes, comme vous les avez vues",
          items: [
            ["Nuit ou sieste", "Saisissez les dates et les heures, ou lancez, mettez en pause et reprenez le minuteur gratuit. La session reste disponible après la fermeture de l'app."],
            ["Réveils et notes", "Notez chaque réveil et sa durée, les tétées ou biberons, le ressenti au réveil et vos observations."],
            ["Une journée de midi à midi", "Les totaux excluent les réveils, montrent la part des siestes et ne comptent jamais deux fois les plages qui se chevauchent. Les durées suivent le temps réellement écoulé, changements d'heure compris."],
            ["Calendrier, grille et statistiques", "Le calendrier ouvre toutes les entrées d'un jour. La grille réunit nuits et siestes, et les statistiques nocturnes restent séparées."],
            ["Widget", "Sur l'écran d'accueil ou l'écran verrouillé : durée de sommeil hors pauses, nombre de réveils et nuit en cours. Le widget est gratuit."],
          ],
          captions: ["Sommeil en cours", "Évolution"],
        },
        pdf: {
          kicker: "Carnet PDF",
          title: "Un carnet A4 à conserver ou à partager",
          items: [
            ["Ce qu'il contient", "Une grille de midi à midi avec les siestes repérées, une synthèse descriptive, le détail des plages enregistrées et les notes datées."],
            ["7, 14 ou 28 jours", "Généré sur l'iPhone, hors ligne, avec une comparaison à la période précédente de même durée."],
            ["Aperçu gratuit", "Prévisualisez chaque page et chaque période gratuitement. Partager, imprimer et enregistrer le PDF demandent l'achat unique."],
          ],
        },
        offer: {
          nav: "Gratuit et carnet PDF",
          kicker: "Gratuit et carnet PDF",
          title: "Ce que le Carnet de sommeil PDF ajoute",
          intro: "La saisie et la lecture du carnet sont gratuites. Le Carnet de sommeil PDF est un achat unique, sans abonnement.",
          plans: [
            {
              title: "Gratuit",
              items: [
                "Saisie des nuits et des siestes, et minuteur",
                "Calendrier, grille de sommeil, historique et statistiques",
                "Le widget de l'écran d'accueil et de l'écran verrouillé",
                "L'aperçu complet du PDF, toutes pages et périodes comprises",
              ],
            },
            {
              title: "Carnet de sommeil PDF",
              items: [
                "Partager, imprimer et enregistrer le PDF",
                "Un seul achat, sans abonnement",
                "Restaurer depuis l'écran d'achat ou depuis Support",
              ],
            },
          ],
          notes: [
            "Sur l'App Store français, le Carnet de sommeil PDF coûte 4,99 €, en une seule fois. Dans les autres pays et sur Google Play, la boutique affiche le prix avant l'achat.",
            "Les droits déjà acquis sont conservés.",
            "Petites Nuits décrit vos observations. Elle ne prédit pas les prochaines siestes, ne propose pas de programme d'entraînement au sommeil et ne donne ni diagnostic ni conseil médical.",
          ],
          privacy: "Sans compte, publicité ni collecte de données : le carnet reste sur votre iPhone.",
          privacyLink: "Politique de confidentialité",
          cta: "Voir Petites Nuits sur l'App Store",
        },
      },
      relatedTitle: "D'autres apps pour les jeunes parents",
      supportTitle: "Une question ou un bug à signaler ?",
      supportIntro: "Écrivez à Benjamin Dupin, qui développe Petites Nuits. Pour un bug, indiquez la version de l'app et celle du système de votre téléphone.",
      footer: "Créé par Benjamin Dupin.",
      formNote: "Ce formulaire est protégé contre le spam par Cloudflare Turnstile, qui vérifie des signaux techniques du navigateur, dont votre adresse IP. Cloudflare transmet votre message à l'éditeur.",
    },
  },
};
