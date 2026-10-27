// Petites Gouttes page copy, version 1.7.0 on sale on the App Store.
// Sources: App Store description and release notes read 2026-10-26, the three
// store screenshots. Google Play listing com.bnjdpn.petitesgouttes answers 200.
// In-App Purchase read 2026-10-26: Daycare Pack $5.99 (US), £5.99 (UK),
// Pack Crèche 6,99 € (FR), one-time. Requires iOS 17.
export default {
  appStoreId: "6760202126",
  lastModified: "2026-10-26",
  playUrl: "https://play.google.com/store/apps/details?id=com.bnjdpn.petitesgouttes",
  operatingSystem: "iOS 17.0 or later, Android",
  applicationCategory: "LifestyleApplication",
  currency: { "en-US": "USD", "en-GB": "GBP", "fr-FR": "EUR" },
  guides: { "en-US": "printing-labels/", "en-GB": "en-GB/printing-labels/", "fr-FR": "fr-FR/imprimer-etiquettes/" },
  carry: [
    "assets/print-guide\\.css",
    "(?:en-GB/)?printing-labels/index\\.html",
    "fr-FR/imprimer-etiquettes/index\\.html",
  ],
  heroShot: 0,
  sections: [
    { type: "cards", key: "stock", id: "features", anchors: "features", shots: [1, 2] },
    { type: "cards", key: "daycare", id: "daycare" },
    { type: "offer", key: "offer", id: "free-and-pro" },
  ],
  locales: {
    en: {
      title: "Petites Gouttes: breast milk stash tracker",
      description: "Track frozen breast milk bags, amounts and use-by times, and see which bag to use next. Free on iPhone and Android, with a one-time Daycare Pack.",
      hero: {
        eyebrow: "Breast milk inventory for iPhone and Android",
        h1: "Track your breast milk stash and know which bag to use next",
        intro: "Log each bag with its amount, pumping date and use-by time. Petites Gouttes follows it in the freezer, the fridge or at room temperature, and suggests the next bag from the dates you recorded.",
        note: "Free, with a one-time Daycare Pack. Requires iOS 17 on iPhone.",
        guide: "Prepare and label milk bags",
      },
      alts: [
        "Petites Gouttes dashboard: 109.57 fl oz in 22 bags, the bag to use next and 15 days of supply.",
        "Adding a bag in Petites Gouttes: volume, pumping date, storage location and best-before date.",
        "The freezer list in Petites Gouttes, with each bag's volume, pumping date and best-before date.",
      ],
      sections: {
        stock: {
          nav: "Stock",
          kicker: "Free stock tracking",
          title: "Your stock, bag by bag",
          items: [
            ["The next bag to use", "The app suggests a bag from the use-by times you recorded. You choose the bag and how much you used, even a partial amount."],
            ["Freezer, fridge or room temperature", "Follow each bag where it is, including while it thaws, with a local alert before the use-by time set in your settings."],
            ["Totals and days of supply", "Unlimited bags, the total volume and an estimate of how many days your stock lasts."],
            ["History and statistics", "Sort, filter and look back at what you used. Enter amounts in mL or US fluid ounces."],
            ["Backup", "Save and restore a JSON backup to move your data yourself."],
          ],
          captions: ["New bag", "Freezer"],
        },
        daycare: {
          kicker: "Daycare",
          title: "Prepare bags for daycare or a childminder",
          items: [
            ["Plan the care days", "Choose the care dates, the handover time and the bags to send. The preview is free."],
            ["Reserve without losing count", "With the Daycare Pack, reserved bags stay in your stock until they are used. When bags come back, record what was used or returned, without counting milk twice."],
            ["Labels and handover sheet", "Export the weekly plan, the labels and a handover sheet. Your first three individual labels are free to export."],
          ],
        },
        offer: {
          nav: "Free & Daycare Pack",
          kicker: "Free & Daycare Pack",
          title: "What the Daycare Pack adds",
          intro: "Stock tracking is free, with no limit on bags. The Daycare Pack is a one-time purchase, with no subscription.",
          plans: [
            {
              title: "Free",
              items: [
                "Unlimited bags, totals and days of supply",
                "Sorting, filters, history and statistics",
                "Thaw tracking and a local alert before the use-by time",
                "JSON backup and restore",
                "A preview of the daycare documents, and your first three labels",
              ],
            },
            {
              title: "Daycare Pack",
              items: [
                "Export of the weekly plan, labels and handover sheet",
                "Individual PNG labels, A4 and US Letter label sheets and PDF documents",
                "Named storage locations, each with its own threshold",
                "Daily stock reminders",
                "CSV and PDF reports",
              ],
            },
          ],
          notes: [
            "On the US App Store, the Daycare Pack costs $5.99, paid once. In other countries and on Google Play, the app shows the price before you buy.",
            "Apple Family Sharing lets your family share the purchase. It does not sync the stock between devices.",
            "Petites Gouttes is a home inventory. It gives no medical advice or storage recommendation: you choose the durations your family follows.",
          ],
          privacy: "No account, ads or cloud sync. Your data stays on your device until you export or share it.",
          privacyLink: "Privacy policy",
          cta: "See Petites Gouttes on the App Store",
        },
      },
      relatedTitle: "More apps for young families",
      supportTitle: "Questions or a bug to report?",
      supportIntro: "Write to Benjamin Dupin, who develops Petites Gouttes. For a bug, add your app version and your phone system version.",
      footer: "Made by Benjamin Dupin.",
      formNote: "This form is protected against spam by Cloudflare Turnstile, which checks technical browser signals, including your IP address. Cloudflare forwards your message to the publisher.",
    },
    "en-GB": {
      description: "Track frozen breast milk bags, amounts and use-by times, and see which bag to use next. Free on iPhone and Android, with a one-off Daycare Pack.",
      sections: {
        offer: {
          notes: [
            "On the UK App Store, the Daycare Pack costs £5.99, paid once. In other countries and on Google Play, the app shows the price before you buy.",
            "Apple Family Sharing lets your family share the purchase. It does not sync the stock between devices.",
            "Petites Gouttes is a home inventory. It gives no medical advice or storage recommendation: you choose the durations your family follows.",
          ],
        },
      },
    },
    fr: {
      title: "Petites Gouttes : stock de lait maternel",
      description: "Suivez vos sachets de lait maternel congelé, les volumes et les échéances, et voyez quel sachet utiliser ensuite. Gratuit sur iPhone et Android, avec un Pack Crèche en achat unique.",
      hero: {
        eyebrow: "Stock de lait maternel sur iPhone et Android",
        h1: "Gérez votre stock de lait maternel et sachez quel sachet utiliser",
        intro: "Enregistrez chaque sachet avec son volume, sa date de tirage et son échéance. Petites Gouttes le suit au congélateur, au frigo ou à température ambiante, et propose le prochain sachet selon les dates enregistrées.",
        note: "Gratuit, avec un Pack Crèche en achat unique. Nécessite iOS 17 sur iPhone.",
        guide: "Préparer et étiqueter les sachets",
      },
      alts: [
        "Tableau de bord de Petites Gouttes : 109,57 fl oz en 22 sachets, le sachet à utiliser ensuite et 15 jours de réserve.",
        "Ajout d'un sachet dans Petites Gouttes : volume, date de tirage, emplacement et date limite.",
        "La liste du congélateur dans Petites Gouttes, avec le volume, la date de tirage et la date limite de chaque sachet.",
      ],
      sections: {
        stock: {
          nav: "Stock",
          kicker: "Le stock reste gratuit",
          title: "Votre stock, sachet par sachet",
          items: [
            ["Le prochain sachet", "L'app propose un sachet selon les échéances enregistrées. Vous choisissez le sachet et le volume utilisé, même pour une utilisation partielle."],
            ["Congélateur, frigo ou température ambiante", "Suivez chaque sachet là où il est, y compris pendant la décongélation, avec une alerte locale avant l'échéance définie dans vos réglages."],
            ["Totaux et jours de réserve", "Un nombre de sachets illimité, le volume total et une estimation des jours de réserve."],
            ["Historique et statistiques", "Triez, filtrez et retrouvez ce que vous avez utilisé. Saisie en mL ou en onces liquides américaines."],
            ["Sauvegarde", "Sauvegardez et restaurez vos données en JSON pour les transférer vous-même."],
          ],
          captions: ["Nouveau sachet", "Congélateur"],
        },
        daycare: {
          kicker: "Garde",
          title: "Préparez les sachets pour la crèche ou l'assistante maternelle",
          items: [
            ["Les jours de garde", "Choisissez les jours de garde, l'heure de remise et les sachets à confier, pour la crèche, la MAM ou l'assistante maternelle. L'aperçu est gratuit."],
            ["Réserver sans fausser le stock", "Avec le Pack Crèche, les sachets réservés restent dans le stock jusqu'à leur utilisation. Au retour, notez ce qui a été utilisé ou rendu, sans compter deux fois le lait."],
            ["Étiquettes et fiche de transmission", "Exportez le plan de la semaine, les étiquettes et la fiche de transmission. Les trois premières étiquettes individuelles sont gratuites."],
          ],
        },
        offer: {
          nav: "Gratuit et Pack Crèche",
          kicker: "Gratuit et Pack Crèche",
          title: "Ce que le Pack Crèche ajoute",
          intro: "Le suivi du stock est gratuit, sans limite de sachets. Le Pack Crèche est un achat unique, sans abonnement.",
          plans: [
            {
              title: "Gratuit",
              items: [
                "Sachets illimités, totaux et jours de réserve",
                "Tri, filtres, historique et statistiques",
                "Suivi de la décongélation et alerte locale avant l'échéance",
                "Sauvegarde et restauration JSON",
                "L'aperçu des documents de garde et vos trois premières étiquettes",
              ],
            },
            {
              title: "Pack Crèche",
              items: [
                "Export du plan de la semaine, des étiquettes et de la fiche de transmission",
                "Étiquettes individuelles en PNG, planches A4 et US Letter et documents PDF",
                "Emplacements nommés, chacun avec son seuil",
                "Rappels de stock quotidiens",
                "Rapports CSV et PDF",
              ],
            },
          ],
          notes: [
            "Sur l'App Store français, le Pack Crèche coûte 6,99 €, en une seule fois. Dans les autres pays et sur Google Play, l'app affiche le prix avant l'achat.",
            "Le Partage familial Apple permet de partager l'achat avec votre famille. Il ne synchronise pas le stock entre appareils.",
            "Petites Gouttes est un inventaire domestique. Il ne donne ni conseil médical ni recommandation de conservation : vous choisissez les durées suivies par votre famille.",
          ],
          privacy: "Sans compte, sans publicité et sans synchronisation cloud. Vos données restent sur votre appareil jusqu'à ce que vous les exportiez ou les partagiez.",
          privacyLink: "Politique de confidentialité",
          cta: "Voir Petites Gouttes sur l'App Store",
        },
      },
      relatedTitle: "D'autres apps pour les jeunes parents",
      supportTitle: "Une question ou un bug à signaler ?",
      supportIntro: "Écrivez à Benjamin Dupin, qui développe Petites Gouttes. Pour un bug, indiquez la version de l'app et celle du système de votre téléphone.",
      footer: "Créé par Benjamin Dupin.",
      formNote: "Ce formulaire est protégé contre le spam par Cloudflare Turnstile, qui vérifie des signaux techniques du navigateur, dont votre adresse IP. Cloudflare transmet votre message à l'éditeur.",
    },
  },
};
