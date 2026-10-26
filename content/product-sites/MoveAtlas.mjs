// MoveAtlas page copy, version 1.5.0 on sale on the App Store.
// Sources: fastlane/metadata description and 1.5.0 release notes per locale
// (identical to the listings read 2026-10-26), the four store screenshots
// (English captures for the in-session shot on de-DE and es-ES).
// In-App Purchase read 2026-10-26: MoveAtlas Pro · My Notebook, one-time,
// US $5.99, FR/DE/ES 6,99 €. Requires iOS 17. iPhone and iPad.
// Not on Google Play (com.bnjdpn.moveatlas answers 404). The extra locale
// stubs (noindex, canonical to the home page) and android/privacy are carried.
import { FORM_NOTE as formNote } from './form-note.mjs';

export default {
  appStoreId: "6786200811",
  lastModified: "2026-10-26",
  operatingSystem: "iOS 17.0 or later, iPadOS 17.0 or later",
  applicationCategory: "HealthApplication",
  currency: { "de-DE": "EUR", "en-US": "USD", "es-ES": "EUR", "fr-FR": "EUR" },
  carry: [
    "(?:ar-SA|es-MX|hi|id|it|ja|ko|nl-NL|pl|pt-BR|ru|sv|tr|uk|zh-Hans|zh-Hant)/index\\.html",
    "android/privacy\\.html",
  ],
  heroShot: 0,
  sections: [
    { type: "list", key: "atlas", id: "features", anchors: "features", shots: [1, 2] },
    { type: "list", key: "gym", id: "machine-settings", shots: [3] },
    { type: "cards", key: "workouts", id: "workouts" },
    { type: "offer", key: "offer", id: "free-and-pro" },
  ],
  locales: {
    en: {
      title: "MoveAtlas: offline gym exercise library and notebook",
      description: "Browse 1,324 gym exercises offline and save your machine settings for each gym. Free search, workouts and gym profiles on iPhone and iPad.",
      hero: {
        eyebrow: "Exercise library for iPhone and iPad",
        h1: "An offline library of 1,324 gym exercises, with your machine settings",
        intro: "Search an exercise in English, French, German or Spanish, filter by muscle and equipment, and keep the settings of each machine at the gyms where you train.",
        note: "Free on the App Store, with an optional one-time purchase. Requires iOS 17.",
      },
      alts: [
        "A saved workout at Studio Atlas in MoveAtlas: six movements, with the machine settings saved for that gym.",
        "Searching for donkey calf raise in MoveAtlas: four exercises, available offline.",
        "MoveAtlas results for incline bench in the Chest area: barbell, cable, dumbbell and Smith machine variations.",
        "Barbell bench press on iPad in MoveAtlas: numbered steps, primary and secondary muscles.",
      ],
      sections: {
        atlas: {
          nav: "Features",
          kicker: "Atlas",
          title: "Find the right exercise, even offline",
          items: [
            ["Search in four languages", "Search names in English, French, German or Spanish. Common aliases such as pushups or bench press work too."],
            ["Filter by what your gym has", "Filter by body area, muscle and equipment. Your active gym limits the results to its equipment."],
            ["Written instructions", "Each exercise page has reference cards and written steps. For 40 movements, French and German instructions were checked step by step against the English source, and they also have Spanish. When a translation is missing, the page says it is showing the English text."],
            ["Favorites", "Mark the exercises you use often and find them again in the atlas."],
          ],
          captions: ["Search", "Chest exercises"],
        },
        gym: {
          nav: "Machine settings",
          kicker: "Notebook",
          title: "Your machine settings, gym by gym",
          items: [
            ["Machine cards", "For a machine, save its settings, a note and an optional photo in the gym where it stands. My gym brings these cards together."],
            ["Notes for other movements", "For a movement without a machine, keep a personal note."],
            ["At the gym", "From a saved workout, At the gym shows your settings and photos for the active gym. Edit an entry and return to the same place in the workout."],
            ["Export and restore", "Export notebook entries and photos to a file you choose, then restore them from Files."],
          ],
          captions: ["Exercise page on iPad"],
        },
        workouts: {
          nav: "Workouts",
          kicker: "Workouts",
          title: "Workouts built from your equipment",
          items: [
            ["Generate a workout", "The generator uses the equipment and body areas you select and tells you when a selection is incomplete. Workouts are saved on your device."],
            ["Swap a movement", "Review the alternatives suggested for your gym, replace a movement and undo the change if needed. Check that an alternative suits you before using it."],
          ],
        },
        offer: {
          nav: "Free & Pro",
          kicker: "Free & Pro",
          title: "What the notebook purchase adds",
          intro: "The atlas, search, favorites, workout generator, saved workouts and gym profiles are free.",
          plans: [
            { title: "Free", items: ["The 1,324-exercise atlas and search", "Favorites", "Workout generator and saved workouts", "Gym profiles", "A notebook of 5 items"] },
            { title: "MoveAtlas Pro · My Notebook", price: "One-time purchase", items: ["No limit on notes, personal exercises, machine cards and cycles"] },
          ],
          notes: [
            "On the US App Store, MoveAtlas Pro · My Notebook costs $5.99, paid once, with no subscription. In other countries, the app shows the price before you buy.",
            "Eligible users from before version 1.1.0 keep 25 items. Existing entries stay readable and editable.",
          ],
          privacy: "No account, ads or usage tracking. Notes and personal photos stay on this device.",
          privacyLink: "Privacy policy",
          cta: "See MoveAtlas on the App Store",
        },
      },
      relatedTitle: "More training apps by the same developer",
      supportTitle: "Questions or a bug to report?",
      supportIntro: "Write to Benjamin Dupin, who develops MoveAtlas. For a bug, add your app and iOS versions.",
      footer: "Made by Benjamin Dupin.",
      formNote: formNote.en,
    },
    fr: {
      title: "MoveAtlas : exercices de musculation hors ligne et carnet",
      description: "Consultez 1 324 exercices de musculation hors ligne et gardez les réglages de vos machines pour chaque salle. Recherche et séances gratuites.",
      hero: {
        eyebrow: "Atlas d'exercices pour iPhone et iPad",
        h1: "1 324 exercices de musculation hors ligne, avec les réglages de vos machines",
        intro: "Cherchez un exercice en français, anglais, allemand ou espagnol, filtrez par muscle et par matériel, et gardez les réglages de chaque machine dans les salles où vous vous entraînez.",
        note: "Gratuit sur l'App Store, avec un achat unique facultatif. Nécessite iOS 17.",
      },
      alts: [
        "Une séance enregistrée au Studio Atlas dans MoveAtlas : six mouvements, avec les réglages de machine enregistrés pour cette salle.",
        "Recherche d'un exercice dans MoveAtlas : résultats disponibles hors ligne.",
        "Résultats de MoveAtlas pour un développé incliné dans la zone Pectoraux : variantes à la barre, à la poulie, aux haltères et à la Smith machine.",
        "Le développé couché à la barre sur iPad dans MoveAtlas : étapes numérotées, muscles principaux et secondaires.",
      ],
      sections: {
        atlas: {
          nav: "Fonctions",
          kicker: "Atlas",
          title: "Trouver le bon exercice, même hors ligne",
          items: [
            ["Recherche en quatre langues", "Cherchez un nom en français, anglais, allemand ou espagnol. Les alias courants, comme pompes, pushups ou développé couché, fonctionnent aussi."],
            ["Filtrer selon votre salle", "Filtrez par zone du corps, muscle et matériel. La salle active limite les résultats à son équipement."],
            ["Des consignes écrites", "Chaque fiche présente des repères et des étapes écrites. Pour 40 mouvements, les consignes françaises et allemandes ont été vérifiées étape par étape avec la source anglaise, et elles existent aussi en espagnol. Quand une traduction manque, la fiche indique qu'elle affiche le texte anglais."],
            ["Favoris", "Marquez les exercices que vous utilisez souvent et retrouvez-les dans l'atlas."],
          ],
          captions: ["Recherche", "Exercices pectoraux"],
        },
        gym: {
          nav: "Réglages machines",
          kicker: "Carnet",
          title: "Les réglages de vos machines, salle par salle",
          items: [
            ["Fiches machines", "Pour une machine, enregistrez ses réglages, une note et une photo facultative dans la salle où elle se trouve. Ma salle réunit ces fiches."],
            ["Notes pour les autres mouvements", "Pour un mouvement sans machine, gardez une note personnelle."],
            ["En salle", "Depuis une séance enregistrée, En salle affiche vos réglages et photos pour la salle active. Modifiez une fiche puis reprenez la séance au même endroit."],
            ["Export et restauration", "Exportez les éléments et photos du carnet dans un fichier de votre choix, puis restaurez-les depuis Fichiers."],
          ],
          captions: ["Fiche exercice sur iPad"],
        },
        workouts: {
          nav: "Séances",
          kicker: "Séances",
          title: "Des séances construites avec votre matériel",
          items: [
            ["Générer une séance", "Le générateur tient compte du matériel et des zones du corps choisis, et signale une sélection incomplète. Les séances sont enregistrées sur l'appareil."],
            ["Remplacer un mouvement", "Examinez les alternatives proposées pour votre salle, remplacez un mouvement et annulez si besoin. Vérifiez qu'une alternative vous convient avant de l'utiliser."],
          ],
        },
        offer: {
          nav: "Gratuit et Pro",
          kicker: "Gratuit et Pro",
          title: "Ce que l'achat du carnet ajoute",
          intro: "L'atlas, la recherche, les favoris, le générateur, les séances enregistrées et les profils de salle sont gratuits.",
          plans: [
            { title: "Gratuit", items: ["L'atlas de 1 324 exercices et la recherche", "Favoris", "Générateur et séances enregistrées", "Profils de salle", "Un carnet de 5 éléments"] },
            { title: "MoveAtlas Pro · Mon carnet", price: "Achat unique", items: ["Plus de limite pour les notes, exercices personnels, fiches machines et cycles"] },
          ],
          notes: [
            "Sur l'App Store français, MoveAtlas Pro · Mon carnet coûte 6,99 €, en un seul paiement, sans abonnement. Dans les autres pays, l'app affiche le prix avant l'achat.",
            "Les utilisateurs éligibles d'avant la version 1.1.0 conservent 25 éléments. Les éléments existants restent lisibles et modifiables.",
          ],
          privacy: "Pas de compte, de publicité ni de suivi d'utilisation. Vos notes et photos personnelles restent sur cet appareil.",
          privacyLink: "Politique de confidentialité",
          cta: "Voir MoveAtlas sur l'App Store",
        },
      },
      relatedTitle: "Les autres apps d'entraînement du même développeur",
      supportTitle: "Une question ou un bug à signaler ?",
      supportIntro: "Écrivez à Benjamin Dupin, qui développe MoveAtlas. Pour un bug, indiquez la version de l'app et celle d'iOS.",
      footer: "Créé par Benjamin Dupin.",
      formNote: formNote.fr,
    },
    de: {
      title: "MoveAtlas: Übungen fürs Krafttraining, offline",
      description: "1.324 Übungen fürs Studio offline nachschlagen und Geräteeinstellungen für jedes Studio speichern. Suche, Trainingspläne und Studios kostenlos.",
      hero: {
        eyebrow: "Übungsatlas für iPhone und iPad",
        h1: "1.324 Übungen fürs Krafttraining offline, mit deinen Geräteeinstellungen",
        intro: "Suche Übungen auf Deutsch, Englisch, Französisch oder Spanisch, filtere nach Muskel und Gerät und merke dir die Einstellungen jedes Geräts in den Studios, in denen du trainierst.",
        note: "Kostenlos im App Store, mit einem optionalen Einmalkauf. Erfordert iOS 17.",
      },
      alts: [
        "Ein gespeicherter Trainingsplan im Studio Atlas in MoveAtlas (englische Oberfläche): sechs Übungen mit den gespeicherten Geräteeinstellungen.",
        "Übungssuche in MoveAtlas: Ergebnisse auch offline verfügbar.",
        "MoveAtlas-Ergebnisse für Schrägbankdrücken im Bereich Brust: Varianten mit Langhantel, Kabelzug, Kurzhanteln und Multipresse.",
        "Bankdrücken mit der Langhantel auf dem iPad in MoveAtlas: nummerierte Schritte, Haupt- und Hilfsmuskeln.",
      ],
      sections: {
        atlas: {
          nav: "Funktionen",
          kicker: "Atlas",
          title: "Die richtige Übung finden, auch offline",
          items: [
            ["Suche in vier Sprachen", "Suche Übungsnamen auf Deutsch, Englisch, Französisch oder Spanisch, auch mit gängigen Begriffen wie Liegestütz, pushups oder Bankdrücken."],
            ["Filtern nach deinem Studio", "Filtere nach Körperbereich, Muskel und Geräten. Dein aktives Studio begrenzt die Ergebnisse auf seine Ausstattung."],
            ["Textanleitungen", "Jede Übungsseite hat Referenzkarten und schriftliche Schritte. Für 40 Übungen wurden die deutschen und französischen Anleitungen mit dem englischen Original abgeglichen; diese Übungen gibt es auch auf Spanisch. Fehlt eine Übersetzung, weist die Seite auf den englischen Text hin."],
            ["Favoriten", "Markiere häufig genutzte Übungen und finde sie im Atlas wieder."],
          ],
          captions: ["Suche", "Brustübungen"],
        },
        gym: {
          nav: "Geräteeinstellungen",
          kicker: "Notizbuch",
          title: "Deine Geräteeinstellungen, Studio für Studio",
          items: [
            ["Gerätekarten", "Speichere für ein Gerät seine Einstellungen, eine Notiz und optional ein Foto im passenden Studio. Mein Studio bündelt diese Karten."],
            ["Notizen zu anderen Übungen", "Für Übungen ohne Gerät hältst du eine persönliche Notiz fest."],
            ["Im Studio", "Aus einem gespeicherten Plan zeigt dir „Im Studio“ deine Einstellungen und Fotos für das aktive Studio. Bearbeite einen Eintrag und mach an derselben Stelle im Plan weiter."],
            ["Export und Wiederherstellung", "Exportiere Notizbucheinträge und Fotos in eine Datei deiner Wahl und stelle sie über Dateien wieder her."],
          ],
          captions: ["Übungsseite auf dem iPad"],
        },
        workouts: {
          nav: "Trainingspläne",
          kicker: "Trainingspläne",
          title: "Trainingspläne aus deiner Ausstattung",
          items: [
            ["Plan erstellen", "Der Generator berücksichtigt die gewählten Geräte und Körperbereiche und sagt dir, wenn eine Auswahl unvollständig ist. Pläne werden auf deinem Gerät gespeichert."],
            ["Übung austauschen", "Prüfe die Alternativen für dein Studio, ersetze eine Übung und mach den Austausch bei Bedarf rückgängig. Ob eine Alternative zu dir passt, entscheidest du selbst."],
          ],
        },
        offer: {
          nav: "Kostenlos & Pro",
          kicker: "Kostenlos & Pro",
          title: "Was der Notizbuch-Kauf ergänzt",
          intro: "Atlas, Suche, Favoriten, Generator, gespeicherte Pläne und Studioprofile sind kostenlos.",
          plans: [
            { title: "Kostenlos", items: ["Atlas mit 1.324 Übungen und Suche", "Favoriten", "Generator und gespeicherte Pläne", "Studioprofile", "Ein Notizbuch mit 5 Einträgen"] },
            { title: "MoveAtlas Pro · Notizbuch", price: "Einmalkauf", items: ["Kein Limit für Notizen, eigene Übungen, Gerätekarten und Zyklen"] },
          ],
          notes: [
            "Im deutschen App Store kostet MoveAtlas Pro · Notizbuch einmalig 6,99 €, ohne Abo. In anderen Ländern zeigt die App den Preis vor dem Kauf an.",
            "Berechtigte Nutzer aus der Zeit vor Version 1.1.0 behalten 25 Einträge. Bestehende Einträge bleiben lesbar und bearbeitbar.",
          ],
          privacy: "Kein Konto, keine Werbung, keine Nutzungsanalyse. Notizen und eigene Fotos bleiben auf diesem Gerät.",
          privacyLink: "Datenschutzerklärung",
          cta: "MoveAtlas im App Store ansehen",
        },
      },
      relatedTitle: "Weitere Trainings-Apps vom selben Entwickler",
      supportTitle: "Eine Frage oder ein Fehler?",
      supportIntro: "Schreib an Benjamin Dupin, der MoveAtlas entwickelt. Bei einem Fehler gib bitte die App- und iOS-Version an.",
      footer: "Entwickelt von Benjamin Dupin.",
      formNote: formNote.de,
    },
    es: {
      title: "MoveAtlas: ejercicios de gimnasio sin conexión",
      description: "Consulta 1.324 ejercicios de gimnasio sin conexión y guarda los ajustes de tus máquinas en cada gimnasio. Búsqueda y sesiones gratis.",
      hero: {
        eyebrow: "Atlas de ejercicios para iPhone y iPad",
        h1: "1.324 ejercicios de gimnasio sin conexión, con los ajustes de tus máquinas",
        intro: "Busca un ejercicio en español, inglés, francés o alemán, filtra por músculo y equipo, y guarda los ajustes de cada máquina en los gimnasios donde entrenas.",
        note: "Gratis en la App Store, con una compra única opcional. Requiere iOS 17.",
      },
      alts: [
        "Una sesión guardada en Studio Atlas en MoveAtlas (interfaz en inglés): seis movimientos con los ajustes de máquina guardados para ese gimnasio.",
        "Búsqueda de un ejercicio en MoveAtlas: resultados disponibles sin conexión.",
        "Resultados de MoveAtlas para press inclinado en la zona Pecho: variantes con barra, polea, mancuernas y máquina Smith.",
        "Press de banca con barra en iPad en MoveAtlas: pasos numerados, músculos principales y secundarios.",
      ],
      sections: {
        atlas: {
          nav: "Funciones",
          kicker: "Atlas",
          title: "Encuentra el ejercicio correcto, también sin conexión",
          items: [
            ["Búsqueda en cuatro idiomas", "Busca nombres en español, inglés, francés o alemán, con sinónimos habituales como flexiones, lagartijas o pushups."],
            ["Filtra según tu gimnasio", "Filtra por zona corporal, músculo y equipo. Tu gimnasio activo limita los resultados a su material."],
            ["Instrucciones escritas", "Cada ejercicio tiene fichas de referencia y pasos escritos. En 40 movimientos, las instrucciones francesas y alemanas se cotejaron paso a paso con el original inglés, y también están en español. Si falta una traducción, la página avisa de que muestra el texto en inglés."],
            ["Favoritos", "Marca los ejercicios que usas a menudo y encuéntralos en el atlas."],
          ],
          captions: ["Búsqueda", "Ejercicios de pecho"],
        },
        gym: {
          nav: "Ajustes de máquinas",
          kicker: "Cuaderno",
          title: "Los ajustes de tus máquinas, gimnasio por gimnasio",
          items: [
            ["Fichas de máquinas", "Para una máquina, guarda sus ajustes, una nota y una foto opcional en el gimnasio donde está. Mi gimnasio reúne estas fichas."],
            ["Notas para otros movimientos", "Para un movimiento sin máquina, guarda una nota personal."],
            ["En el gimnasio", "Desde una sesión guardada, En el gimnasio muestra tus ajustes y fotos del gimnasio activo. Edita una ficha y vuelve al mismo punto de la sesión."],
            ["Exportar y restaurar", "Exporta las entradas y fotos del cuaderno a un archivo que elijas y restáuralas desde Archivos."],
          ],
          captions: ["Ficha de ejercicio en iPad"],
        },
        workouts: {
          nav: "Sesiones",
          kicker: "Sesiones",
          title: "Sesiones creadas con tu equipo",
          items: [
            ["Genera una sesión", "El generador tiene en cuenta el equipo y las zonas corporales que eliges y te avisa si la selección está incompleta. Las sesiones se guardan en tu dispositivo."],
            ["Cambia un movimiento", "Revisa las alternativas para tu gimnasio, sustituye un movimiento y deshaz el cambio si hace falta. Comprueba que la alternativa te conviene antes de usarla."],
          ],
        },
        offer: {
          nav: "Gratis y Pro",
          kicker: "Gratis y Pro",
          title: "Lo que añade la compra del cuaderno",
          intro: "El atlas, la búsqueda, los favoritos, el generador, las sesiones guardadas y los perfiles de gimnasio son gratis.",
          plans: [
            { title: "Gratis", items: ["El atlas de 1.324 ejercicios y la búsqueda", "Favoritos", "Generador y sesiones guardadas", "Perfiles de gimnasio", "Un cuaderno de 5 elementos"] },
            { title: "MoveAtlas Pro · Mi cuaderno", price: "Compra única", items: ["Sin límite de notas, ejercicios propios, fichas de máquinas y ciclos"] },
          ],
          notes: [
            "En la App Store de España, MoveAtlas Pro · Mi cuaderno cuesta 6,99 € en un solo pago, sin suscripción. En otros países, la app muestra el precio antes de comprar.",
            "Los usuarios elegibles anteriores a la versión 1.1.0 conservan 25 elementos. Los elementos existentes se pueden seguir leyendo y editando.",
          ],
          privacy: "Sin cuenta, anuncios ni análisis de uso. Tus notas y fotos personales se quedan en este dispositivo.",
          privacyLink: "Política de privacidad",
          cta: "Ver MoveAtlas en la App Store",
        },
      },
      relatedTitle: "Más apps de entrenamiento del mismo desarrollador",
      supportTitle: "¿Tienes una pregunta o has encontrado un error?",
      supportIntro: "Escribe a Benjamin Dupin, que desarrolla MoveAtlas. Si es un error, indica la versión de la app y de iOS.",
      footer: "Creado por Benjamin Dupin.",
      formNote: formNote.es,
    },
  },
};
