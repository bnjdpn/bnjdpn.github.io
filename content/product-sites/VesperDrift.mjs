// Vesper Drift page copy, version 2.0.0 on sale on the App Store.
// Sources: fastlane/metadata description, promotional text and 2.0.0 release
// notes (identical to the listing read 2026-10-26), the four store screenshots
// (native 1.4.1 captures of screens kept in 2.0.0).
// In-App Purchases read 2026-10-26: US Vesper Contracts Archive $3.99,
// Aegis Ship Pack $3.99, Vesper Mastery $3.99; FR 3,99 € / 3,99 € / 4,99 €.
// Requires iOS 17. iPhone and iPad. Not on Google Play.
const formNote = {
  en: "This form is protected against spam by Cloudflare Turnstile, which checks technical browser signals, including your IP address. Cloudflare forwards your message to petites@bnjdpn.com. An automated assistant (AI) used by the publisher sorts messages and prepares or sends replies; the publisher remains responsible for this processing.",
  fr: "Ce formulaire est protégé contre le spam par Cloudflare Turnstile, qui vérifie des signaux techniques du navigateur, dont votre adresse IP. Cloudflare transmet votre message à petites@bnjdpn.com. Un assistant automatisé (IA) utilisé par l'éditeur trie les messages et prépare ou envoie les réponses ; l'éditeur reste responsable de ce traitement.",
};

export default {
  appStoreId: "6791882792",
  lastModified: "2026-10-26",
  operatingSystem: "iOS 17.0 or later, iPadOS 17.0 or later",
  applicationCategory: "GameApplication",
  currency: { "en-US": "USD", "fr-FR": "EUR" },
  guides: { "en-US": "how-to-play/", "fr-FR": "comment-jouer/" },
  heroShot: 0,
  sections: [
    { type: "list", key: "campaign", id: "features", anchors: "features", shots: [1, 3] },
    { type: "cards", key: "modes", id: "modes" },
    { type: "offer", key: "offer", id: "free-and-purchases" },
  ],
  locales: {
    en: {
      title: "Vesper Drift: one-thumb space shooter, playable offline",
      description: "A one-thumb space shooter for iPhone and iPad: an 18-mission campaign, three bosses and four ships to earn. Free to play offline, optional purchases.",
      hero: {
        eyebrow: "Space shooter for iPhone and iPad",
        h1: "A one-thumb space shooter with an 18-mission campaign",
        intro: "Your ship fires on its own. You steer with one thumb, dodge enemy formations and pick weapon upgrades mid-flight to win back the orbital gardens.",
        note: "Free on the App Store, with optional purchases. Requires iOS 17.",
        guide: "How to play",
      },
      alts: [
        "Vesper Drift in flight: the ship, enemy shots, the score and the Nova meter.",
        "Nova triggered in Vesper Drift: a burst around the ship and an empty meter.",
        "Vesper Mastery in Vesper Drift: the one-time purchase and restore screen.",
        "End of a run in Vesper Drift: score, grazes, Flux and result sharing.",
      ],
      sections: {
        campaign: {
          nav: "Campaign",
          kicker: "Campaign",
          title: "18 missions, three bosses, four ships",
          items: [
            ["Three sectors", "18 PvE missions across three sectors, with three bosses. Objectives switch between survival, interception and combat."],
            ["Four ships to earn", "Every ship is earned by playing: focused and piercing fire, wide volleys or converging cannons. A starting module gives faster fire, stronger armor or easier pickups."],
            ["Upgrades that stay", "Spend the Alloy you earn on permanent ship upgrades, choose weapon upgrades during a flight and go back for three stars."],
            ["Retry as often as you like", "No energy meter and no entry fee."],
          ],
          captions: ["Nova", "Run results"],
        },
        modes: {
          nav: "Modes",
          kicker: "Other modes",
          title: "Contracts, Arcade and Daily Drift",
          items: [
            ["Weekly contracts", "One free contract each week, on a 12-week rotation. The archive holds 36 combinations of missions and rules: fire density, speed, durability and more."],
            ["Arcade and Daily Drift", "The original Arcade, Daily Drift and Expeditions are still here. Ranked Arcade keeps its own rules, so campaign upgrades and purchases never change its scores."],
            ["Offline play", "Missions and local progress work without a connection. Progress is saved on this device. Purchases and online Game Center features need a connection."],
          ],
        },
        offer: {
          nav: "Purchases",
          kicker: "Free & purchases",
          title: "Free to play, with three optional purchases",
          intro: "The whole campaign and all four ships can be played and earned without paying.",
          plans: [
            { title: "Free", items: ["The 18-mission campaign", "Four ships earned in play", "One contract a week", "Arcade, Daily Drift and Expeditions"] },
            { title: "Aegis Ship Pack", price: "One-time purchase", items: ["Aegis right away, at level 3", "Twin converging cannon, reinforced hull, self-repair", "Also unlocked for free after mission 12"] },
            { title: "Vesper Contracts Archive", price: "One-time purchase", items: ["All 36 contracts, permanently", "No advantage in ranked Arcade"] },
            { title: "Vesper Mastery", price: "One-time purchase", items: ["Its existing Arcade features", "Earlier purchases are kept"] },
          ],
          notes: [
            "On the US App Store, each of the three purchases costs $3.99. In other countries, the App Store shows your local price before you buy.",
            "Restoring purchases brings back what you bought, not a deleted local save.",
          ],
          privacy: "No account and no cloud sync: your progress stays on this device.",
          privacyLink: "Privacy policy",
          cta: "See Vesper Drift on the App Store",
        },
      },
      relatedTitle: "More apps by the same developer",
      supportTitle: "Questions or a bug to report?",
      supportIntro: "Write to Benjamin Dupin, who develops Vesper Drift. For a bug, add your device, the game version and the mission you were playing.",
      footer: "Made by Benjamin Dupin.",
      formNote: formNote.en,
    },
    fr: {
      title: "Vesper Drift : shoot'em up spatial à un pouce, hors ligne",
      description: "Un shoot'em up spatial à un pouce pour iPhone et iPad : campagne de 18 missions, trois boss et quatre vaisseaux à gagner. Gratuit, achats facultatifs.",
      hero: {
        eyebrow: "Shoot'em up spatial pour iPhone et iPad",
        h1: "Un shoot'em up spatial à un pouce, avec une campagne de 18 missions",
        intro: "Votre vaisseau tire tout seul. Vous le pilotez d'un pouce, esquivez les formations ennemies et choisissez vos armes en vol pour reconquérir les jardins orbitaux.",
        note: "Gratuit sur l'App Store, avec des achats facultatifs. Nécessite iOS 17.",
        guide: "Comment jouer",
      },
      alts: [
        "Vesper Drift en vol : le vaisseau, les tirs ennemis, le score et la jauge Nova.",
        "Nova déclenchée dans Vesper Drift : une onde autour du vaisseau et la jauge vidée.",
        "Maîtrise Vesper dans Vesper Drift : l'écran d'achat unique et de restauration.",
        "Fin de partie dans Vesper Drift : score, frôlements, Flux et partage du résultat.",
      ],
      sections: {
        campaign: {
          nav: "Campagne",
          kicker: "Campagne",
          title: "18 missions, trois boss, quatre vaisseaux",
          items: [
            ["Trois secteurs", "18 missions PvE dans trois secteurs, avec trois boss. Survie, interception et élimination : les objectifs changent d'une mission à l'autre."],
            ["Quatre vaisseaux à gagner", "Chaque vaisseau se gagne en jouant : tir concentré, perforant, en éventail ou convergent. Un module de départ fait tirer plus vite, renforce la coque ou facilite le ramassage."],
            ["Des améliorations durables", "Dépensez l'alliage gagné pour améliorer vos vaisseaux, choisissez vos armes en vol et revenez chercher les trois étoiles."],
            ["Autant d'essais que vous voulez", "Pas de jauge d'énergie ni de frais d'entrée."],
          ],
          captions: ["Nova", "Résultat"],
        },
        modes: {
          nav: "Modes",
          kicker: "Autres modes",
          title: "Contrats, Arcade et Dérive du Jour",
          items: [
            ["Contrats de la semaine", "Un contrat gratuit chaque semaine, sur une rotation de douze semaines. L'archive compte 36 combinaisons de missions et de règles : densité des tirs, vitesse, résistance et d'autres variantes."],
            ["Arcade et Dérive du Jour", "L'Arcade d'origine, la Dérive du Jour et les Expéditions sont toujours là. L'Arcade classée garde ses propres règles : les améliorations de campagne et les achats ne changent jamais ses scores."],
            ["Hors ligne", "Les missions et la progression fonctionnent sans connexion. La progression est enregistrée sur cet appareil. Les achats et les fonctions Game Center en ligne demandent une connexion."],
          ],
        },
        offer: {
          nav: "Achats",
          kicker: "Gratuit et achats",
          title: "Gratuit, avec trois achats facultatifs",
          intro: "Toute la campagne et les quatre vaisseaux se jouent et se gagnent sans payer.",
          plans: [
            { title: "Gratuit", items: ["La campagne de 18 missions", "Quatre vaisseaux à gagner en jouant", "Un contrat par semaine", "Arcade, Dérive du Jour et Expéditions"] },
            { title: "Pack Aegis", price: "Achat unique", items: ["Aegis tout de suite, au niveau 3", "Double canon convergent, coque renforcée, réparation automatique", "Débloqué aussi gratuitement après la mission 12"] },
            { title: "Archive des Contrats Vesper", price: "Achat unique", items: ["Les 36 contrats, pour toujours", "Aucun avantage en Arcade classée"] },
            { title: "Maîtrise Vesper", price: "Achat unique", items: ["Ses fonctions Arcade existantes", "Les achats antérieurs sont conservés"] },
          ],
          notes: [
            "Sur l'App Store français, le Pack Aegis et l'Archive des Contrats coûtent 3,99 € chacun, Maîtrise Vesper 4,99 €. Dans les autres pays, l'App Store affiche le prix local avant l'achat.",
            "Restaurer les achats rétablit ce que vous avez acheté, pas une sauvegarde locale supprimée.",
          ],
          privacy: "Pas de compte ni de synchronisation cloud : votre progression reste sur cet appareil.",
          privacyLink: "Politique de confidentialité",
          cta: "Voir Vesper Drift sur l'App Store",
        },
      },
      relatedTitle: "Les autres apps du même développeur",
      supportTitle: "Une question ou un bug à signaler ?",
      supportIntro: "Écrivez à Benjamin Dupin, qui développe Vesper Drift. Pour un bug, indiquez votre appareil, la version du jeu et la mission en cours.",
      footer: "Créé par Benjamin Dupin.",
      formNote: formNote.fr,
    },
  },
};
