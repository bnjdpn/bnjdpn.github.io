// Petites Dents page copy, version 2.1.4 on sale on the App Store
// (US and UK store name: Baby Teeth: First Tooth).
// Sources: App Store description and release notes read 2026-10-26, the three
// store screenshots. Google Play listing com.bnjdpn.petitesdents answers 200.
// In-App Purchase read 2026-10-26: Keepsake Page & Photos $4.99 (US), £4.99 (UK),
// Carnet Souvenirs 5,99 € (FR), one-time. Requires iOS 17.
export default {
  appStoreId: "6792521948",
  lastModified: "2026-10-26",
  playUrl: "https://play.google.com/store/apps/details?id=com.bnjdpn.petitesdents",
  operatingSystem: "iOS 17.0 or later, Android",
  applicationCategory: "LifestyleApplication",
  currency: { "en-US": "USD", "en-GB": "GBP", "fr-FR": "EUR" },
  heroShot: 0,
  sections: [
    { type: "cards", key: "teeth", id: "features", anchors: "features", shots: [1, 2] },
    { type: "cards", key: "documents", id: "documents" },
    { type: "offer", key: "offer", id: "free-and-keepsake" },
  ],
  locales: {
    en: {
      title: "Baby Teeth: teething chart and first tooth log",
      description: "Record when each baby tooth started teething and came through, with your child's exact age that day. Free, with a one-time keepsake purchase for photos and the PDF.",
      hero: {
        eyebrow: "Petites Dents, a baby teeth tracker for iPhone and Android",
        h1: "A baby teeth chart with the date and age of every tooth",
        intro: "Tap a tooth to record when teething began, when it came through and anything you noticed. Add the birth date and the app shows your child's exact age that day. One profile per child, no account, and it works offline.",
        note: "Free, with a one-time Keepsake Page & Photos purchase. Requires iOS 17 on iPhone.",
      },
      alts: [
        "The baby teeth chart in Petites Dents: upper and lower arches, with 2 of 20 teeth erupted and 1 fallen out.",
        "Tooth history in Petites Dents: each event with its date, the child's age that day and a note.",
        "Preview of the illustrated PDF keepsake in Petites Dents, with baby and permanent teeth, before sharing.",
      ],
      sections: {
        teeth: {
          nav: "Teeth",
          kicker: "Tracking is free",
          title: "Every tooth, with its date",
          items: [
            ["20 baby teeth, in order", "Upper and lower arches in anatomical order. Each tooth is not started, teething or erupted."],
            ["Baby or permanent teeth", "Switch to permanent teeth to follow the replacement teeth and the four first permanent molars. Second permanent molars and wisdom teeth are not tracked."],
            ["Age to the day", "With the birth date, each eruption shows your child's exact age, in the editor and in the history."],
            ["One profile per child", "Create a profile for each child, twins included, and switch in one tap. Dates, notes, history and PDFs stay separate."],
            ["A photo on a tooth", "Add a photo to a tooth and see it in the history. The first photo of each child is free."],
          ],
          captions: ["History", "Keepsake preview"],
        },
        documents: {
          kicker: "Documents",
          title: "A record for the dentist, a keepsake for the family",
          items: [
            ["Dental record PDF", "A free PDF with the full chart, birth date, eruption ages, dates and notes, to show your pediatrician or dentist. It never contains a photo."],
            ["A card for one tooth", "Pick a tooth event and choose whether to show the name, date and photo. The name starts hidden. The image is made on your device, and the card is free."],
            ["Illustrated keepsake PDF", "A4 or US Letter, with up to eight photos you choose. Preview every page for free. Sharing the PDF needs the keepsake purchase."],
          ],
        },
        offer: {
          nav: "Free & keepsake",
          kicker: "Free & keepsake",
          title: "What the keepsake purchase adds",
          intro: "Tracking is free, with no account and no time limit. Keepsake Page & Photos is a one-time purchase, with no subscription.",
          plans: [
            {
              title: "Free",
              items: [
                "The 20 baby teeth and the permanent teeth",
                "Teething and eruption dates, exact age, notes and history",
                "As many child profiles as you need",
                "The dental record PDF and cards for single teeth",
                "The first photo of each child, and a preview of the keepsake PDF",
              ],
            },
            {
              title: "Keepsake Page & Photos",
              items: [
                "As many photos per tooth as you like",
                "Sharing the illustrated keepsake PDF",
                "Shared with your family through Apple Family Sharing",
              ],
            },
          ],
          notes: [
            "On the US App Store, Keepsake Page & Photos costs $4.99, paid once. In other countries and on Google Play, the store shows the price before you buy.",
            "Nothing that used to be free moved behind the purchase. If you logged teeth in the app before the keepsake existed, it is already yours.",
            "Petites Dents is a personal log, not a medical device or a diagnostic tool. If you are worried about a child's health, see a qualified healthcare professional.",
          ],
          privacy: "No account, app server, ads, analytics or tracking. The dental record stays on your device. Buying or restoring the keepsake needs an App Store connection.",
          privacyLink: "Privacy policy",
          cta: "See Petites Dents on the App Store",
        },
      },
      relatedTitle: "More apps for young families",
      supportTitle: "Questions or a bug to report?",
      supportIntro: "Write to Benjamin Dupin, who develops Petites Dents. For a bug, add your app version and your phone system version.",
      footer: "Made by Benjamin Dupin.",
      formNote: "This form is protected against spam by Cloudflare Turnstile, which checks technical browser signals, including your IP address. Cloudflare forwards your message to the publisher.",
    },
    "en-GB": {
      title: "Baby Teeth: milk teeth chart and first tooth log",
      description: "Record when each milk tooth started teething and came through, with your child's exact age that day. Free, with a one-off keepsake purchase for photos and the PDF.",
      hero: {
        eyebrow: "Petites Dents, a milk teeth tracker for iPhone and Android",
        h1: "A milk teeth chart with the date and age of every tooth",
        note: "Free, with a one-off Keepsake Page & Photos purchase. Requires iOS 17 on iPhone.",
      },
      sections: {
        offer: {
          notes: [
            "On the UK App Store, Keepsake Page & Photos costs £4.99, paid once. In other countries and on Google Play, the store shows the price before you buy.",
            "Nothing that used to be free moved behind the purchase. If you logged teeth in the app before the keepsake existed, it is already yours.",
            "Petites Dents is a personal log, not a medical device or a diagnostic tool. If you are worried about a child's health, see a qualified healthcare professional.",
          ],
        },
      },
    },
    fr: {
      title: "Petites Dents : suivi des dents de lait de bébé",
      description: "Notez quand chaque dent de lait a commencé à pousser et quand elle a percé, avec l'âge exact de votre enfant. Gratuit, avec un Carnet Souvenirs en achat unique.",
      hero: {
        eyebrow: "Suivi des dents de lait sur iPhone et Android",
        h1: "Notez chaque dent de lait, avec la date et l'âge de votre enfant",
        intro: "Touchez une dent pour noter le début de la poussée, la date de percée et vos observations. Avec la date de naissance, l'app affiche l'âge exact de votre enfant ce jour-là. Un profil par enfant, sans compte, même hors ligne.",
        note: "Gratuit, avec le Carnet Souvenirs en achat unique. Nécessite iOS 17 sur iPhone.",
      },
      alts: [
        "Le schéma des dents de lait dans Petites Dents : arcades du haut et du bas, 2 dents sorties sur 20 et 1 tombée.",
        "L'historique des dents dans Petites Dents : chaque événement avec sa date, l'âge de l'enfant ce jour-là et une note.",
        "Aperçu du carnet PDF illustré de Petites Dents, avec dents de lait et dents définitives, avant le partage.",
      ],
      sections: {
        teeth: {
          nav: "Dents",
          kicker: "Le suivi est gratuit",
          title: "Chaque dent, avec sa date",
          items: [
            ["Les 20 dents de lait, dans l'ordre", "Arcades du haut et du bas dans l'ordre anatomique. Chaque dent a un état : pas commencée, en poussée ou percée."],
            ["Dents de lait ou définitives", "Passez aux dents définitives pour suivre les dents de remplacement et les quatre premières molaires définitives. Les deuxièmes molaires définitives et les dents de sagesse ne sont pas suivies."],
            ["L'âge au jour près", "Avec la date de naissance, chaque percée affiche l'âge exact de votre enfant, dans l'éditeur et dans l'historique."],
            ["Un profil par enfant", "Créez un profil pour chaque enfant, jumeaux compris, et changez-en d'un geste. Dates, notes, historique et PDF restent séparés."],
            ["Une photo par dent", "Ajoutez une photo à une dent et retrouvez-la dans l'historique. La première photo de chaque enfant est gratuite."],
          ],
          captions: ["Historique", "Aperçu du carnet"],
        },
        documents: {
          kicker: "Documents",
          title: "Une fiche pour le dentiste, un carnet pour la famille",
          items: [
            ["Fiche dentaire PDF", "Un PDF gratuit avec le schéma complet, la date de naissance, les âges à la percée, les dates et les notes, à montrer au pédiatre ou au dentiste. Il ne contient jamais de photo."],
            ["Une carte pour une dent", "Choisissez un événement et décidez d'afficher ou non le prénom, la date et la photo. Le prénom est masqué au départ. L'image est créée sur l'appareil, et la carte est gratuite."],
            ["Carnet PDF illustré", "A4 ou US Letter, avec jusqu'à huit photos que vous choisissez. Prévisualisez chaque page gratuitement. Le partage du PDF nécessite le Carnet Souvenirs."],
          ],
        },
        offer: {
          nav: "Gratuit et Carnet Souvenirs",
          kicker: "Gratuit et Carnet Souvenirs",
          title: "Ce que le Carnet Souvenirs ajoute",
          intro: "Le suivi est gratuit, sans compte ni limite de temps. Le Carnet Souvenirs est un achat unique, sans abonnement.",
          plans: [
            {
              title: "Gratuit",
              items: [
                "Les 20 dents de lait et les dents définitives",
                "Dates de poussée et de percée, âge exact, notes et historique",
                "Autant de profils enfants que nécessaire",
                "La fiche dentaire PDF et les cartes d'une dent",
                "La première photo de chaque enfant, et l'aperçu du carnet PDF",
              ],
            },
            {
              title: "Carnet Souvenirs",
              items: [
                "Autant de photos par dent que vous voulez",
                "Le partage du carnet PDF illustré",
                "Partagé avec votre famille via le Partage familial Apple",
              ],
            },
          ],
          notes: [
            "Sur l'App Store français, le Carnet Souvenirs coûte 5,99 €, en une seule fois. Dans les autres pays et sur Google Play, la boutique affiche le prix avant l'achat.",
            "Rien de ce qui était gratuit n'est passé derrière ce paiement. Si vous notiez déjà les dents de votre enfant dans l'app avant l'arrivée du carnet, il vous est acquis.",
            "Petites Dents est un carnet personnel, pas un dispositif médical ni un outil de diagnostic. En cas d'inquiétude sur la santé d'un enfant, contactez un professionnel de santé qualifié.",
          ],
          privacy: "Aucun compte, serveur applicatif, publicité, outil d'analyse ou suivi. Le carnet dentaire reste sur votre appareil. Une connexion à l'App Store est nécessaire pour acheter ou restaurer le Carnet Souvenirs.",
          privacyLink: "Politique de confidentialité",
          cta: "Voir Petites Dents sur l'App Store",
        },
      },
      relatedTitle: "D'autres apps pour les jeunes parents",
      supportTitle: "Une question ou un bug à signaler ?",
      supportIntro: "Écrivez à Benjamin Dupin, qui développe Petites Dents. Pour un bug, indiquez la version de l'app et celle du système de votre téléphone.",
      footer: "Créé par Benjamin Dupin.",
      formNote: "Ce formulaire est protégé contre le spam par Cloudflare Turnstile, qui vérifie des signaux techniques du navigateur, dont votre adresse IP. Cloudflare transmet votre message à l'éditeur.",
    },
  },
};
