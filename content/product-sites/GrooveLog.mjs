// GrooveLog page copy, version 3.3.0 on sale on the App Store.
// Sources: fastlane/metadata description and 3.3.0 release notes per locale
// (identical to the listings read 2026-10-26), the three store screenshots.
// In-App Purchases read 2026-10-26: US Pro Monthly $2.99, Yearly $12.99,
// Lifetime $29.99; FR/DE/ES 2,99 € / 14,99 € / 34,99 €. Requires iOS 17.
// iPhone and iPad. On Google Play too (Android 8 or later). Guide pages are carried unchanged.
import { FORM_NOTE as formNote } from './form-note.mjs';

export default {
  appStoreId: "6760195408",
  lastModified: "2026-10-26",
  playUrl: "https://play.google.com/store/apps/details?id=com.bnjdpn.groovelog",
  operatingSystem: "iOS 17.0 or later, iPadOS 17.0 or later, Android 8.0 or later",
  applicationCategory: "HealthApplication",
  currency: { "de-DE": "EUR", "en-US": "USD", "es-ES": "EUR", "fr-FR": "EUR" },
  guides: {
    "en-US": "grease-the-groove-journal/",
    "fr-FR": "fr-FR/grease-the-groove-journal/",
    "de-DE": "de-DE/grease-the-groove-journal/",
    "es-ES": "es-ES/grease-the-groove-journal/",
  },
  carry: ["(?:(?:de-DE|es-ES|fr-FR)/)?grease-the-groove-journal/index\\.html", "assets/guide\\.css"],
  heroShot: 0,
  sections: [
    { type: "list", key: "practice", id: "features", anchors: "features", shots: [1, 2] },
    { type: "cards", key: "cycle", id: "cycle" },
    { type: "offer", key: "offer", id: "free-and-pro" },
  ],
  locales: {
    en: {
      title: "GrooveLog: Grease the Groove pull-up coach",
      description: "Plan small pull-up, push-up and hold sets through the day with Grease the Groove. Log each set in one tap, with reminders and a private journal.",
      hero: {
        eyebrow: "Grease the Groove for iPhone, iPad and Android",
        h1: "A Grease the Groove coach for pull-ups and small daily sets",
        intro: "GrooveLog suggests your next easy set, records it in one tap and spaces reminders through the day. Skip a day and nothing piles up for tomorrow.",
        note: "Free on the App Store and Google Play, with optional Pro. Requires iOS 17 or Android 8.",
        guide: "Read the Grease the Groove journal guide",
      },
      alts: [
        "GrooveLog today: a suggested set of 3 pull-ups and a button to save it.",
        "GrooveLog after a set: 3 pull-ups recorded and the next easy set suggested around 3:45 PM.",
        "Next cycle preview in GrooveLog: four weeks of steady practice, consolidation, deload and retest from a measured reference of 6.",
      ],
      sections: {
        practice: {
          nav: "Features",
          kicker: "Daily practice",
          title: "Log what you actually do, one set at a time",
          items: [
            ["One tap per set", "Save the suggested movement and amount, or enter a different set. You can correct the amount, time, extra load or effort, or undo an entry."],
            ["Pull-ups and more", "Plan reps or holds for pull-ups, push-ups, dips, squats, planks, L-sits, dead hangs and your own movements."],
            ["Cycles of 3 to 6 weeks", "Targets use 40–60% of your rep or hold reference. Start from a measured result, a cautious estimate or an easier variation."],
            ["Lighter days, no catch-up", "A light day can drop below three sets. Stop a movement for today and tomorrow's plan stays the same. For pain or discomfort, pause it and leave a note."],
            ["Reminders and widget", "Local reminders and the widget follow the spacing you choose. A button in Settings sends a test notification without touching your reminders."],
          ],
          captions: ["Set recorded", "Cycle preview"],
        },
        cycle: {
          nav: "Cycles",
          kicker: "Cycles",
          title: "See the next cycle before you start it",
          items: [
            ["A free preview", "Pick an active movement and try a named objective. You see its reference, measured or estimated, and the practice, lighter and retest weeks. Nothing is saved and no reminder starts."],
            ["Pause, then resume", "Update the reference of a paused movement and resume its cycle with your journal intact."],
            ["Your own backup", "Export a local JSON backup and restore it into an unused library."],
          ],
        },
        offer: {
          nav: "Free & Pro",
          kicker: "Free & Pro",
          title: "What Pro adds",
          intro: "Logging, history, reminders and the objective preview are free, with up to three active cycles.",
          plans: [
            { title: "Free", items: ["Logging and corrections", "History and local backup", "Reminders, rest timer and widget", "Objective preview", "Up to three active cycles"] },
            { title: "GrooveLog Pro", items: ["Named objectives followed across cycles", "Objective phases", "Cycles with extra load", "Progress estimates after two comparable cycles"] },
          ],
          notes: [
            "On the US App Store, Pro costs $2.99 a month, $12.99 a year or $29.99 once for lifetime access. The annual plan may include a seven-day trial for eligible accounts, as shown in the app. In other countries and on Google Play, the app shows the price before you buy.",
            "Subscriptions renew automatically. You manage them in iOS Settings on iPhone or in Google Play on Android. If you used GrooveLog on iPhone before version 3.0, you keep your Pro access on that device.",
          ],
          privacy: "No account, ads, analytics or automatic cloud sync. Your journal stays on your device.",
          privacyLink: "Privacy policy",
          cta: "See GrooveLog on the App Store",
        },
      },
      relatedTitle: "More training apps by the same developer",
      supportTitle: "Questions or a bug to report?",
      supportIntro: "Write to Benjamin Dupin, who develops GrooveLog. For a bug, add your app version and your iOS or Android version.",
      footer: "Made by Benjamin Dupin.",
      formNote: formNote.en,
    },
    fr: {
      title: "GrooveLog : coach tractions en Grease the Groove",
      description: "Planifiez de petites séries de tractions, pompes et gainage au fil de la journée. Notez chaque série d'un toucher, avec rappels et journal privé.",
      hero: {
        eyebrow: "Grease the Groove sur iPhone, iPad et Android",
        h1: "Un coach Grease the Groove pour les tractions et les petites séries du quotidien",
        intro: "GrooveLog propose votre prochaine série facile, l'enregistre d'un toucher et espace les rappels dans la journée. Un jour sauté ne s'ajoute pas au lendemain.",
        note: "Gratuit sur l'App Store et Google Play, avec Pro en option. Nécessite iOS 17 ou Android 8.",
        guide: "Lire le guide du journal Grease the Groove",
      },
      alts: [
        "GrooveLog aujourd'hui : une série de 3 tractions proposée et le bouton pour l'enregistrer.",
        "GrooveLog après une série : 3 tractions notées et la prochaine série facile proposée vers 15 h 45.",
        "Aperçu du prochain cycle dans GrooveLog : quatre semaines de pratique, consolidation, allègement et retest, à partir d'une référence mesurée de 6.",
      ],
      sections: {
        practice: {
          nav: "Fonctions",
          kicker: "Au quotidien",
          title: "Notez ce que vous faites vraiment, série par série",
          items: [
            ["Un toucher par série", "Enregistrez le mouvement et la quantité proposés, ou saisissez une autre série. Vous pouvez corriger la quantité, l'heure, la charge additionnelle ou le ressenti, ou annuler une entrée."],
            ["Tractions et autres mouvements", "Préparez des répétitions ou des tenues : tractions, pompes, dips, squats, gainage, L-sits, suspensions et vos propres mouvements."],
            ["Cycles de 3 à 6 semaines", "Les repères se situent entre 40 et 60 % de votre référence en répétitions ou en durée. Partez d'une mesure, d'une estimation prudente ou d'une variante plus accessible."],
            ["Jours légers, sans rattrapage", "Un jour léger peut proposer moins de trois séries. Arrêtez un mouvement pour aujourd'hui : le programme de demain ne change pas. En cas de douleur ou d'inconfort, mettez-le en pause et laissez une note."],
            ["Rappels et widget", "Les rappels locaux et le widget suivent l'espacement choisi. Un bouton dans Réglages envoie une notification d'essai sans modifier vos rappels."],
          ],
          captions: ["Série notée", "Aperçu du cycle"],
        },
        cycle: {
          nav: "Cycles",
          kicker: "Cycles",
          title: "Voir le prochain cycle avant de le lancer",
          items: [
            ["Un aperçu gratuit", "Choisissez un mouvement actif et essayez un objectif. Vous voyez sa référence, mesurée ou estimée, et les semaines de pratique, d'allègement et de retest. Rien n'est enregistré et aucun rappel ne démarre."],
            ["Pause, puis reprise", "Modifiez la référence d'un mouvement en pause et reprenez son cycle sans effacer le journal."],
            ["Votre sauvegarde", "Exportez une sauvegarde JSON locale et restaurez-la dans une bibliothèque inutilisée."],
          ],
        },
        offer: {
          nav: "Gratuit et Pro",
          kicker: "Gratuit et Pro",
          title: "Ce que Pro ajoute",
          intro: "Le journal, l'historique, les rappels et l'aperçu d'objectif sont gratuits, avec jusqu'à trois cycles actifs.",
          plans: [
            { title: "Gratuit", items: ["Journal et corrections", "Historique et sauvegarde locale", "Rappels, repos et widget", "Aperçu d'objectif", "Jusqu'à trois cycles actifs"] },
            { title: "GrooveLog Pro", items: ["Objectifs nommés suivis d'un cycle à l'autre", "Phases d'objectif", "Cycles avec charge additionnelle", "Estimations de progrès après deux cycles comparables"] },
          ],
          notes: [
            "Sur l'App Store français, Pro coûte 2,99 € par mois, 14,99 € par an ou 34,99 € en une fois pour un accès à vie. L'offre annuelle peut inclure sept jours d'essai pour les comptes éligibles, comme indiqué dans l'app. Dans les autres pays et sur Google Play, l'app affiche le prix avant l'achat.",
            "Les abonnements se renouvellent automatiquement. Ils se gèrent dans les réglages d'iOS sur iPhone ou dans Google Play sur Android. Si vous utilisiez GrooveLog sur iPhone avant la version 3.0, vous gardez votre accès Pro sur cet appareil.",
          ],
          privacy: "Pas de compte, de publicité, de statistiques d'usage ni de synchronisation automatique. Votre journal reste sur votre appareil.",
          privacyLink: "Politique de confidentialité",
          cta: "Voir GrooveLog sur l'App Store",
        },
      },
      relatedTitle: "Les autres apps d'entraînement du même développeur",
      supportTitle: "Une question ou un bug à signaler ?",
      supportIntro: "Écrivez à Benjamin Dupin, qui développe GrooveLog. Pour un bug, indiquez la version de l'app et celle d'iOS ou d'Android.",
      footer: "Créé par Benjamin Dupin.",
      formNote: formNote.fr,
    },
    de: {
      title: "GrooveLog: Klimmzug-Coach für Grease the Groove",
      description: "Plane kleine Sätze Klimmzüge, Liegestütze und Halteübungen über den Tag. Jeder Satz mit einem Tippen, mit Erinnerungen und privatem Protokoll.",
      hero: {
        eyebrow: "Grease the Groove für iPhone, iPad und Android",
        h1: "Ein Grease-the-Groove-Coach für Klimmzüge und kleine Sätze im Alltag",
        intro: "GrooveLog schlägt deinen nächsten leichten Satz vor, speichert ihn mit einem Tippen und verteilt Erinnerungen über den Tag. Ein ausgelassener Tag wird nicht auf morgen draufgepackt.",
        note: "Kostenlos im App Store und bei Google Play, mit optionalem Pro. Erfordert iOS 17 oder Android 8.",
        guide: "Zum Leitfaden für das Grease-the-Groove-Protokoll",
      },
      alts: [
        "GrooveLog heute: ein vorgeschlagener Satz mit 3 Klimmzügen und die Taste zum Speichern.",
        "GrooveLog nach einem Satz: 3 Klimmzüge eingetragen, der nächste leichte Satz gegen 15:45 Uhr vorgeschlagen.",
        "Vorschau auf den nächsten Zyklus in GrooveLog: vier Wochen Übung, Festigung, Entlastung und Retest ab einer gemessenen Referenz von 6.",
      ],
      sections: {
        practice: {
          nav: "Funktionen",
          kicker: "Im Alltag",
          title: "Halte fest, was du wirklich trainierst, Satz für Satz",
          items: [
            ["Ein Tippen pro Satz", "Speichere die vorgeschlagene Übung und Menge oder trage einen anderen Satz ein. Menge, Uhrzeit, Zusatzgewicht und Belastungsgefühl lassen sich korrigieren, Einträge rückgängig machen."],
            ["Klimmzüge und mehr", "Plane Wiederholungen oder Haltezeiten für Klimmzüge, Liegestütze, Dips, Kniebeugen, Planks, L-Sits, Hängen und eigene Übungen."],
            ["Zyklen von 3 bis 6 Wochen", "Die Orientierungswerte liegen bei 40–60 % deiner Wiederholungs- oder Haltereferenz. Starte mit einem Messwert, einer vorsichtigen Schätzung oder einer leichteren Variante."],
            ["Leichte Tage ohne Nachholen", "An leichten Tagen können es weniger als drei Sätze sein. Stoppe eine Übung für heute, der Plan für morgen bleibt gleich. Bei Schmerzen oder Unbehagen pausierst du sie und hinterlässt eine Notiz."],
            ["Erinnerungen und Widget", "Lokale Erinnerungen und das Widget folgen deinem gewählten Abstand. Über eine Taste in den Einstellungen testest du eine Benachrichtigung, ohne deine Erinnerungen zu ändern."],
          ],
          captions: ["Satz eingetragen", "Zyklusvorschau"],
        },
        cycle: {
          nav: "Zyklen",
          kicker: "Zyklen",
          title: "Den nächsten Zyklus sehen, bevor du ihn startest",
          items: [
            ["Kostenlose Vorschau", "Wähle eine aktive Übung und probiere ein Ziel aus. Du siehst die gemessene oder geschätzte Referenz und die Wochen für Übung, Entlastung und Retest. Es wird nichts gespeichert und keine Erinnerung gestartet."],
            ["Pausieren und fortsetzen", "Aktualisiere die Referenz einer pausierten Übung und setze ihren Zyklus fort, ohne das Protokoll zu löschen."],
            ["Eigene Sicherung", "Exportiere eine lokale JSON-Sicherung und stelle sie in einer ungenutzten Bibliothek wieder her."],
          ],
        },
        offer: {
          nav: "Kostenlos & Pro",
          kicker: "Kostenlos & Pro",
          title: "Was Pro ergänzt",
          intro: "Protokoll, Verlauf, Erinnerungen und Zielvorschau sind kostenlos, mit bis zu drei aktiven Zyklen.",
          plans: [
            { title: "Kostenlos", items: ["Protokoll und Korrekturen", "Verlauf und lokale Sicherung", "Erinnerungen, Pausentimer und Widget", "Zielvorschau", "Bis zu drei aktive Zyklen"] },
            { title: "GrooveLog Pro", items: ["Benannte Ziele über mehrere Zyklen", "Zielphasen", "Zyklen mit Zusatzgewicht", "Fortschrittsschätzungen nach zwei vergleichbaren Zyklen"] },
          ],
          notes: [
            "Im deutschen App Store kostet Pro 2,99 € im Monat, 14,99 € im Jahr oder einmalig 34,99 € für dauerhaften Zugang. Das Jahresangebot kann für berechtigte Konten sieben Probetage enthalten, wie in der App angezeigt. In anderen Ländern und bei Google Play zeigt die App den Preis vor dem Kauf an.",
            "Abos verlängern sich automatisch. Du verwaltest sie auf dem iPhone in den iOS-Einstellungen und unter Android in Google Play. Wer GrooveLog vor Version 3.0 auf dem iPhone genutzt hat, behält seinen Pro-Zugang auf diesem Gerät.",
          ],
          privacy: "Kein Konto, keine Werbung, keine Analysen und keine automatische Cloud-Synchronisierung. Dein Protokoll bleibt auf deinem Gerät.",
          privacyLink: "Datenschutzerklärung",
          cta: "GrooveLog im App Store ansehen",
        },
      },
      relatedTitle: "Weitere Trainings-Apps vom selben Entwickler",
      supportTitle: "Eine Frage oder ein Fehler?",
      supportIntro: "Schreib an Benjamin Dupin, der GrooveLog entwickelt. Bei einem Fehler gib bitte die App- und iOS- oder Android-Version an.",
      footer: "Entwickelt von Benjamin Dupin.",
      formNote: formNote.de,
    },
    es: {
      title: "GrooveLog: coach de dominadas con Grease the Groove",
      description: "Planifica pequeñas series de dominadas, flexiones y planchas a lo largo del día. Anota cada serie con un toque, con avisos y un registro privado.",
      hero: {
        eyebrow: "Grease the Groove para iPhone, iPad y Android",
        h1: "Un coach de Grease the Groove para dominadas y pequeñas series diarias",
        intro: "GrooveLog te propone la siguiente serie fácil, la guarda con un toque y reparte los avisos durante el día. Si te saltas un día, no se acumula para mañana.",
        note: "Gratis en la App Store y Google Play, con Pro opcional. Requiere iOS 17 o Android 8.",
        guide: "Leer la guía del diario Grease the Groove",
      },
      alts: [
        "GrooveLog hoy: una serie sugerida de 3 dominadas y el botón para guardarla.",
        "GrooveLog tras una serie: 3 dominadas anotadas y la siguiente serie fácil sugerida hacia las 15:45.",
        "Vista previa del próximo ciclo en GrooveLog: cuatro semanas de práctica, consolidación, descarga y reevaluación a partir de una referencia medida de 6.",
      ],
      sections: {
        practice: {
          nav: "Funciones",
          kicker: "Día a día",
          title: "Anota lo que haces de verdad, serie a serie",
          items: [
            ["Un toque por serie", "Guarda el movimiento y la cantidad sugeridos o anota otra serie. Puedes corregir la cantidad, la hora, la carga adicional o el esfuerzo, o deshacer una entrada."],
            ["Dominadas y mucho más", "Prepara repeticiones o tiempos para dominadas, flexiones, fondos, sentadillas, planchas, L-sits, suspensiones y tus propios movimientos."],
            ["Ciclos de 3 a 6 semanas", "Las referencias van del 40 al 60 % de tu máximo de repeticiones o duración. Empieza con una medida, una estimación prudente o una variante más accesible."],
            ["Días suaves, sin recuperar", "Un día suave puede tener menos de tres series. Detén un movimiento por hoy y el plan de mañana no cambia. Si hay dolor o molestia, ponlo en pausa y deja una nota."],
            ["Avisos y widget", "Los avisos locales y el widget respetan el intervalo que elijas. Un botón en Ajustes envía una notificación de prueba sin cambiar tus avisos."],
          ],
          captions: ["Serie anotada", "Vista previa del ciclo"],
        },
        cycle: {
          nav: "Ciclos",
          kicker: "Ciclos",
          title: "Mira el próximo ciclo antes de empezarlo",
          items: [
            ["Una vista previa gratis", "Elige un movimiento activo y prueba un objetivo. Verás su referencia, medida o estimada, y las semanas de práctica, descarga y reevaluación. No se guarda nada ni se activa ningún aviso."],
            ["Pausar y retomar", "Actualiza la referencia de un movimiento en pausa y retoma su ciclo sin borrar el registro."],
            ["Tu copia de seguridad", "Exporta una copia JSON local y restáurala en una biblioteca sin uso."],
          ],
        },
        offer: {
          nav: "Gratis y Pro",
          kicker: "Gratis y Pro",
          title: "Lo que añade Pro",
          intro: "El registro, el historial, los avisos y la vista previa del objetivo son gratis, con hasta tres ciclos activos.",
          plans: [
            { title: "Gratis", items: ["Registro y correcciones", "Historial y copia local", "Avisos, descanso y widget", "Vista previa del objetivo", "Hasta tres ciclos activos"] },
            { title: "GrooveLog Pro", items: ["Objetivos con nombre a lo largo de varios ciclos", "Fases de objetivo", "Ciclos con carga adicional", "Estimaciones de progreso tras dos ciclos comparables"] },
          ],
          notes: [
            "En la App Store de España, Pro cuesta 2,99 € al mes, 14,99 € al año o 34,99 € en un solo pago para siempre. La oferta anual puede incluir siete días de prueba para cuentas elegibles, según lo que muestre la app. En otros países y en Google Play, la app muestra el precio antes de comprar.",
            "Las suscripciones se renuevan automáticamente. Se gestionan en los ajustes de iOS en iPhone o en Google Play en Android. Si usabas GrooveLog en iPhone antes de la versión 3.0, conservas tu acceso Pro en ese dispositivo.",
          ],
          privacy: "Sin cuenta, anuncios, estadísticas de uso ni sincronización automática en la nube. Tu registro se queda en tu dispositivo.",
          privacyLink: "Política de privacidad",
          cta: "Ver GrooveLog en la App Store",
        },
      },
      relatedTitle: "Más apps de entrenamiento del mismo desarrollador",
      supportTitle: "¿Tienes una pregunta o has encontrado un error?",
      supportIntro: "Escribe a Benjamin Dupin, que desarrolla GrooveLog. Si es un error, indica la versión de la app y de iOS o Android.",
      footer: "Creado por Benjamin Dupin.",
      formNote: formNote.es,
    },
  },
};
