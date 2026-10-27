// NeatShift page copy, version 2.7.0 as submitted to the App Store
// (2.6.3 on sale on 2026-10-26; 2.7.0 in review).
// Sources: fastlane/metadata description.txt and release_notes.txt (2.7.0),
// App Store listing read 2026-10-26, the three store screenshots.
// In-App Purchases read 2026-10-26: US Pro Monthly $2.99, Yearly $12.99;
// FR 2,99 € / 14,99 €. Requires iOS 17. iPhone and iPad.
// On Google Play too: NeatShift 0.1.6 (7) on the production track, read 2026-10-27.
// Play listing (fr/en) read 2026-10-27: Android 8 or later, data stored on the device,
// no household sync between devices; Pro on Android = report by room and PDF export,
// monthly and yearly plans with a trial on the yearly plan when eligible.
export default {
  appStoreId: "6759961773",
  lastModified: "2026-10-27",
  playUrl: "https://play.google.com/store/apps/details?id=com.bnjdpn.neatshift",
  operatingSystem: "iOS 17.0 or later, iPadOS 17.0 or later, Android 8.0 or later",
  applicationCategory: "LifestyleApplication",
  currency: { "en-US": "USD", "fr-FR": "EUR" },
  heroShot: 0,
  sections: [
    { type: "cards", key: "planning", id: "features", anchors: "features", anchorIds: ["example"], shots: [1, 2] },
    { type: "offer", key: "offer", id: "free-and-pro" },
  ],
  locales: {
    en: {
      title: "NeatShift: cleaning schedule for the whole household",
      description: "Plan household chores around everyone's available time: rooms, recurring chores, planning by availability and a report per person, on iPhone, iPad and Android.",
      hero: {
        eyebrow: "Cleaning schedule for iPhone, iPad and Android",
        h1: "A shared cleaning schedule that fits everyone's time",
        intro: "Create your rooms, choose recurring chores and assign them to the people you live with. NeatShift uses estimated durations and each person's availability to plan the work.",
        note: "Free on the App Store and Google Play, with optional Pro. Requires iOS 17 or Android 8.",
      },
      alts: [
        "NeatShift task list: overdue chores and today's chores, each with its room, date and person.",
        "NeatShift calendar on September 30: today's load of 35 out of 90 minutes and the chores due that day.",
        "The Kitchen room in NeatShift: today's and upcoming chores with their duration, person and frequency.",
      ],
      sections: {
        planning: {
          nav: "Planning",
          kicker: "Planning",
          title: "See what is due and who does it",
          items: [
            ["Late, today and coming up", "See overdue chores, today's tasks and upcoming due dates, as a list or in a calendar."],
            ["Rooms and recurring chores", "Create your rooms, pick recurring chores and set how often each one comes back."],
            ["Shared by availability", "Assign chores to household members. Estimated durations and each person's availability help you plan the work."],
            ["An optional daily limit", "Set how much time the household can spend each day. Work that doesn't fit moves to the next day with room, respecting each person's availability and vacations. The limit is off by default."],
            ["Household sharing", "On iPhone and iPad, invite the people you live with. Sharing gives access to the members you invite. On Android, the household stays on one device."],
          ],
          captions: ["Calendar", "Rooms"],
        },
        offer: {
          nav: "Free & Pro",
          kicker: "Free & Pro",
          title: "What Pro adds",
          intro: "Planning and the report per person are free, and so is household sharing on iPhone and iPad.",
          plans: [
            {
              title: "Free",
              items: ["Rooms, recurring chores and planning", "Household sharing on iPhone and iPad", "The report per person"],
            },
            {
              title: "NeatShift Pro",
              items: [
                "The report by room, with completed chores",
                "A weekly check-in on Sunday, on iPhone and iPad",
                "A four-week overload forecast, on iPhone and iPad",
                "Report export as a PDF, or as an image on iPhone and iPad",
              ],
            },
          ],
          notes: ["On the US App Store, Pro costs $2.99 a month or $12.99 a year. In other countries and on Google Play, the app shows the price and the subscription terms before you buy. On Google Play, the yearly plan includes a trial when you are eligible.", "Subscriptions renew automatically. On iPhone and iPad, you manage them in your Apple Account settings. On Android, you manage or cancel them in Google Play."],
          privacy: "No mandatory account, ads, analytics or tracking. Data stays on your device. On iPhone and iPad, it can sync to your private iCloud storage.",
          privacyLink: "Privacy policy",
          cta: "See NeatShift on the App Store",
        },
      },
      relatedTitle: "More apps by the same developer",
      supportTitle: "Questions or a bug to report?",
      supportIntro: "Write to Benjamin Dupin, who develops NeatShift. For a bug, add your app version and your iOS or Android version.",
      footer: "Made by Benjamin Dupin.",
    },
    fr: {
      title: "NeatShift : planning ménage pour tout le foyer",
      description: "Organisez le ménage selon les disponibilités de chacun : pièces, tâches récurrentes, planning selon les disponibilités et bilan par personne, sur iPhone, iPad et Android.",
      hero: {
        eyebrow: "Planning ménage pour iPhone, iPad et Android",
        h1: "Un planning ménage partagé, adapté au temps de chacun",
        intro: "Créez vos pièces, choisissez des tâches récurrentes et répartissez-les entre les membres du foyer. NeatShift prépare le planning à partir des durées estimées et des disponibilités de chacun.",
        note: "Gratuit sur l'App Store et Google Play, avec Pro en option. Nécessite iOS 17 ou Android 8.",
      },
      alts: [
        "Liste des tâches dans NeatShift : tâches en retard et tâches du jour, avec leur pièce, leur date et la personne.",
        "Calendrier de NeatShift au 30 septembre : charge du jour de 35 minutes sur 90 et tâches prévues ce jour-là.",
        "La pièce Cuisine dans NeatShift : tâches du jour et à venir, avec leur durée, la personne et la fréquence.",
      ],
      sections: {
        planning: {
          nav: "Planning",
          kicker: "Planning",
          title: "Ce qui est à faire, et qui le fait",
          items: [
            ["En retard, aujourd'hui, à venir", "Retrouvez les tâches en retard, celles du jour et les prochaines échéances, en liste ou dans un calendrier."],
            ["Pièces et tâches récurrentes", "Créez vos pièces, choisissez des tâches récurrentes et réglez leur fréquence."],
            ["Réparti selon les disponibilités", "Attribuez les tâches aux membres du foyer. Les durées estimées et les disponibilités de chacun aident à préparer le planning."],
            ["Un temps par jour, si vous voulez", "Fixez le temps que le foyer peut consacrer au ménage chaque jour. Les tâches en trop passent au premier jour suivant qui a de la place, selon les disponibilités et les vacances. Ce réglage est désactivé par défaut."],
            ["Partage du foyer", "Sur iPhone et iPad, invitez les personnes avec qui vous vivez. Le partage donne accès aux membres que vous invitez. Sur Android, le foyer reste sur un seul appareil."],
          ],
          captions: ["Calendrier", "Pièces"],
        },
        offer: {
          nav: "Gratuit et Pro",
          kicker: "Gratuit et Pro",
          title: "Ce que Pro ajoute",
          intro: "Le planning et le bilan par personne sont gratuits, comme le partage du foyer sur iPhone et iPad.",
          plans: [
            {
              title: "Gratuit",
              items: ["Pièces, tâches récurrentes et planning", "Partage du foyer sur iPhone et iPad", "Le bilan par personne"],
            },
            {
              title: "NeatShift Pro",
              items: [
                "Le bilan par pièce, avec les tâches validées",
                "Un point hebdomadaire le dimanche, sur iPhone et iPad",
                "Une prévision de surcharge sur quatre semaines, sur iPhone et iPad",
                "L'export du bilan en PDF, ou en image sur iPhone et iPad",
              ],
            },
          ],
          notes: ["Sur l'App Store français, Pro coûte 2,99 € par mois ou 14,99 € par an. Dans les autres pays et sur Google Play, l'app affiche le prix et les conditions de l'abonnement avant l'achat. Sur Google Play, la formule annuelle inclut un essai selon votre éligibilité.", "Les abonnements se renouvellent automatiquement. Sur iPhone et iPad, vous les gérez dans les réglages de votre compte Apple. Sur Android, vous les gérez ou les résiliez dans Google Play."],
          privacy: "Pas de compte obligatoire, de publicité, d'analytics ni de tracking. Les données restent sur votre appareil. Sur iPhone et iPad, elles peuvent être synchronisées dans votre iCloud privé.",
          privacyLink: "Politique de confidentialité",
          cta: "Voir NeatShift sur l'App Store",
        },
      },
      relatedTitle: "Les autres apps du même développeur",
      supportTitle: "Une question ou un bug à signaler ?",
      supportIntro: "Écrivez à Benjamin Dupin, qui développe NeatShift. Pour un bug, indiquez la version de l'app et celle d'iOS ou d'Android.",
      footer: "Créé par Benjamin Dupin.",
    },
  },
};
