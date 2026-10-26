// Pas du Jour page copy, version 1.3.0 on sale on the App Store.
// Sources: fastlane/metadata description, promotional text and 1.3.0 release
// notes (identical to the listing read 2026-10-26), the four watch screenshots.
// In-App Purchase read 2026-10-26: Pas du Jour Pro $3.99 (US), 4,99 € (FR),
// one-time. Watch app requires watchOS 26 (project.yml). Not on Google Play.
import { FORM_NOTE as formNote } from './form-note.mjs';

export default {
  appStoreId: "6795232703",
  lastModified: "2026-10-26",
  operatingSystem: "watchOS 26.0 or later",
  applicationCategory: "HealthApplication",
  currency: { "en-US": "USD", "fr-FR": "EUR" },
  heroShot: 0,
  sections: [
    { type: "list", key: "free", id: "features", anchors: "features", shots: [1, 2] },
    { type: "list", key: "install", id: "installer-complication-pas", shots: [3] },
    { type: "offer", key: "offer", id: "free-and-pro" },
  ],
  locales: {
    en: {
      title: "Pas du Jour: step count complication for Apple Watch",
      description: "Show today's steps on your Apple Watch face. Six free complication styles, a seven-day history and a setup guide. Optional one-time Pro editor.",
      hero: {
        eyebrow: "Step complication for Apple Watch",
        h1: "Your step count, right on your Apple Watch face",
        intro: "Pick a style, add it to a compatible watch face and today's steps sit next to the time. The app on your watch keeps the last seven days and their average.",
        note: "Free on the App Store, with an optional one-time Pro purchase. Requires watchOS 26.",
      },
      alts: [
        "Pas du Jour on Apple Watch: 6,432 steps today, the goal switch and a 10,000-step goal.",
        "The last seven days in Pas du Jour: a bar chart with an average of 6,676 steps.",
        "Complication styles in Pas du Jour: steps today with an icon, and the number only.",
        "The setup guide on the watch: open your watch face to add Pas du Jour.",
      ],
      sections: {
        free: {
          nav: "Features",
          kicker: "Free",
          title: "What you get without paying",
          items: [
            ["Six complication styles", "Choose how your steps look. The shapes on offer, circular, corner, inline or rectangular, depend on the watch face."],
            ["A daily goal", "Set a goal and follow your percentage, which keeps counting past 100%."],
            ["The last seven days", "A chart of the past week with the daily average, your best reading and the number of days you reached your goal."],
            ["A guide on the watch", "The app shows you how to add the complication to your watch face."],
          ],
          captions: ["Last 7 days", "Styles"],
          note: "Pas du Jour is not a medical device and gives no diagnosis or medical advice.",
        },
        install: {
          nav: "Setup",
          kicker: "Setup",
          title: "Add the step complication to your watch face",
          items: [
            ["1. Edit the face", "Show the watch face, then touch and hold it."],
            ["2. Open complications", "Tap Edit, then swipe to Complications."],
            ["3. Choose Pas du Jour", "Tap a compatible slot, find Pas du Jour with the Digital Crown and pick a style."],
            ["4. Save", "Press the Digital Crown to save, then tap the face to use it."],
          ],
          captions: ["Guide"],
          note: "You add the complication in the watchOS face editor. How often the count refreshes depends on watchOS and on access to Health.",
        },
        offer: {
          nav: "Free & Pro",
          kicker: "Free & Pro",
          title: "What Pro adds",
          intro: "The six styles, the goal and the history are free. Pro is for people who want to design their own complication.",
          plans: [
            { title: "Free", items: ["Six complication styles", "Daily goal", "Seven-day history and average", "Setup guide"] },
            { title: "Pas du Jour Pro", price: "One-time purchase", items: ["The style editor", "Custom profiles, created and edited on your watch"] },
          ],
          notes: [
            "On the US App Store, Pas du Jour Pro costs $3.99, paid once. In other countries, the App Store shows the price before you buy.",
            "If you used Pas du Jour before version 1.1.0, you keep the access you already had.",
          ],
          privacy: "Steps are read locally from Health, with your permission. No account, ads, analytics or server.",
          privacyLink: "Privacy policy",
          cta: "See Pas du Jour on the App Store",
        },
      },
      relatedTitle: "More Apple Watch apps by the same developer",
      supportTitle: "Questions or a bug to report?",
      supportIntro: "Write to Benjamin Dupin, who develops Pas du Jour. For a bug, add your app and watchOS versions.",
      footer: "Made by Benjamin Dupin.",
      formNote: formNote.en,
    },
    fr: {
      title: "Pas du Jour : complication podomètre pour Apple Watch",
      description: "Affichez vos pas du jour sur le cadran de l'Apple Watch. Six styles gratuits, l'historique sur sept jours et un guide. Éditeur Pro en achat unique.",
      hero: {
        eyebrow: "Complication de pas pour Apple Watch",
        h1: "Vos pas du jour, directement sur le cadran de votre Apple Watch",
        intro: "Choisissez un style, ajoutez-le à un cadran compatible et vos pas s'affichent à côté de l'heure. Sur la montre, l'app garde les sept derniers jours et leur moyenne.",
        note: "Gratuit sur l'App Store, avec Pro en achat unique facultatif. Nécessite watchOS 26.",
      },
      alts: [
        "Pas du Jour sur Apple Watch : 6 432 pas aujourd'hui, l'interrupteur de l'objectif et un objectif de 10 000 pas.",
        "Les sept derniers jours dans Pas du Jour : un graphique en barres, avec une moyenne de 6 676 pas.",
        "Styles de complication dans Pas du Jour : les pas du jour avec une icône, et le nombre seul.",
        "Le guide sur la montre : ouvrir le cadran pour y ajouter Pas du Jour.",
      ],
      sections: {
        free: {
          nav: "Fonctions",
          kicker: "Gratuit",
          title: "Ce qui est inclus sans payer",
          items: [
            ["Six styles de complication", "Choisissez l'allure de vos pas. Les formes proposées, circulaire, coin, en ligne ou rectangulaire, dépendent du cadran."],
            ["Un objectif quotidien", "Fixez un objectif et suivez votre pourcentage, qui continue au-delà de 100 %."],
            ["Les sept derniers jours", "Un graphique de la semaine écoulée avec la moyenne, votre meilleure mesure et le nombre de jours où l'objectif a été atteint."],
            ["Un guide sur la montre", "L'app vous montre comment ajouter la complication à votre cadran."],
          ],
          captions: ["7 derniers jours", "Styles"],
          note: "Pas du Jour n'est pas un dispositif médical et ne fournit ni diagnostic ni conseil médical.",
        },
        install: {
          nav: "Installation",
          kicker: "Installation",
          title: "Ajouter la complication de pas à votre cadran",
          items: [
            ["1. Modifier le cadran", "Affichez le cadran, puis maintenez le doigt dessus."],
            ["2. Ouvrir les complications", "Touchez Modifier, puis balayez jusqu'à Complications."],
            ["3. Choisir Pas du Jour", "Touchez un emplacement compatible, trouvez Pas du Jour avec la Digital Crown et choisissez un style."],
            ["4. Enregistrer", "Appuyez sur la Digital Crown pour enregistrer, puis touchez le cadran pour l'utiliser."],
          ],
          captions: ["Guide"],
          note: "La complication s'ajoute dans l'éditeur de cadrans de watchOS. La fréquence d'actualisation dépend de watchOS et de l'accès à Santé.",
        },
        offer: {
          nav: "Gratuit et Pro",
          kicker: "Gratuit et Pro",
          title: "Ce que Pro ajoute",
          intro: "Les six styles, l'objectif et l'historique sont gratuits. Pro sert à créer votre propre complication.",
          plans: [
            { title: "Gratuit", items: ["Six styles de complication", "Objectif quotidien", "Historique et moyenne sur sept jours", "Guide d'installation"] },
            { title: "Pas du Jour Pro", price: "Achat unique", items: ["L'éditeur de styles", "Des profils personnalisés, créés et modifiés sur la montre"] },
          ],
          notes: [
            "Sur l'App Store français, Pas du Jour Pro coûte 4,99 €, en un seul paiement. Dans les autres pays, l'App Store affiche le prix avant l'achat.",
            "Si vous utilisiez Pas du Jour avant la version 1.1.0, vous gardez les accès que vous aviez.",
          ],
          privacy: "Les pas sont lus localement depuis Santé, avec votre autorisation. Pas de compte, de publicité, d'analyse d'audience ni de serveur.",
          privacyLink: "Politique de confidentialité",
          cta: "Voir Pas du Jour sur l'App Store",
        },
      },
      relatedTitle: "Les autres apps Apple Watch du même développeur",
      supportTitle: "Une question ou un bug à signaler ?",
      supportIntro: "Écrivez à Benjamin Dupin, qui développe Pas du Jour. Pour un bug, indiquez la version de l'app et celle de watchOS.",
      footer: "Créé par Benjamin Dupin.",
      formNote: formNote.fr,
    },
  },
};
