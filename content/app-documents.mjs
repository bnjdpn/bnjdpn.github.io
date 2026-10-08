// Store submission documents stay separate from the catalogue of available apps.
export const appDocuments = [{
  name: 'Petits Besoins',
  path: 'petits-besoins',
  package: 'com.bnjdpn.petitsbesoins',
  policyDate: '2026-10-08',
  en: {
    footerLine: 'Android app in preparation.',
    status: 'Petits Besoins is an Android app in preparation. It is not yet published on Google Play.',
    contact: 'For a question about the app or your data, use Contact to open your mail app. Benjamin Dupin receives only what you choose to send. This website does not send the message. Please avoid sending personal information about your child.',
    contactFallback: 'Enable JavaScript to use the Contact button. It opens your mail app.',
    dateLabel: 'Policy date',
    support: {
      description: 'Help with Petits Besoins for Android, reminders, the PDF kit and data stored on your device.',
      sections: [
        {heading: 'How do I set reminders?', paragraphs: ['Open Reminders, enable them and choose the interval and daily time window. On Android 13 or later, allow notifications when prompted. You can snooze a notification for 15 minutes. Android may delay reminders to save battery.']},
        {heading: 'What does the PDF kit contain?', paragraphs: ['The kit contains the care instructions you enter and blank weekly and tracking sheets. It does not export your recorded history. The preview is free. PDF export is the planned paid option, but Google Play purchases are not available in the current version. A debug build can simulate the purchase.', 'The app creates the PDF on your device and opens the Android share chooser. You choose the receiving app. The kit hides the child\'s name by default. Check the preview before sharing.']},
        {heading: 'Can I restore a Google Play purchase?', paragraphs: ['The current version has no Google Play purchase or restore function. The simulated debug purchase stays on that installation. It is not a Google Play purchase.']},
        {heading: 'How do I change the language?', paragraphs: ['The app follows your device language. Choose French or English in Android\'s language settings. There is no language selector inside the app.']},
        {heading: 'Where are my data and how do I delete them?', paragraphs: ['Profiles and entries stay on your device. The app has no account or online sync and excludes its data from Android backup and device transfer.', 'You can delete individual entries from the history. To remove all app data, clear its storage in Android settings or uninstall it. Copies you shared through another app remain there until you delete them.']},
      ],
    },
    privacy: {
      description: 'Privacy policy for Petits Besoins for Android, local storage, reminders, sharing and deletion.',
      sections: [
        {heading: 'Who this policy covers', paragraphs: ['Benjamin Dupin publishes Petits Besoins for Android, identified by com.bnjdpn.petitsbesoins. This policy describes the current version in preparation.']},
        {heading: 'Children\'s data and local storage', paragraphs: ['Petits Besoins is a notebook for parents and caregivers to record a child\'s potty use and diaper changes. An adult enters the child\'s name, entries, dates, times, home or care setting and optional notes. The kit can also contain care instructions.', 'The app stores profiles and entries in a Room database on your device. It stores preferences, reminders and kit drafts locally with Android DataStore. Benjamin Dupin does not receive these data.']},
        {heading: 'Network access and collection', paragraphs: ['The current app does not access the network. It requests no Internet permission and includes no networking library. It has no analytics, crash reporting, ads or user account. It does not send the notebook to a server.']},
        {heading: 'Local reminders', paragraphs: ['Android schedules reminders on your device and displays local notifications. The app requests notification permission on Android 13 or later. Permission to receive the device startup event lets it reschedule reminders after a restart. These functions do not send your entries anywhere.']},
        {heading: 'PDFs and sharing', paragraphs: ['PDF export is the planned paid kit option. It is currently accessible through a simulated purchase in debug builds, without a real payment. The app generates the PDF on your device in its temporary storage. It contains your kit instructions and blank sheets, not your recorded history. The child\'s name is hidden by default, and you can choose to include it.', 'The app opens the Android share chooser only when you request an export. You choose the receiving app. You can also choose to share a daily text summary. The receiving app then handles that copy under its own privacy policy. Benjamin Dupin does not receive it through Petits Besoins.']},
        {heading: 'Purchases', paragraphs: ['Google Play Billing and purchase restoration are not implemented in the current version. The debug purchase changes a local setting and processes no payment. Petits Besoins collects no card data.', 'Google Play Billing is the intended payment service for the paid export. Google would process that payment. This policy will be reviewed when billing is implemented.']},
        {heading: 'Android backup', paragraphs: ['The app disables Android backup with allowBackup set to false. Its backup rules exclude app data from cloud backup and device transfer, including the database and local preferences. It has no backup or sync service of its own. Do not rely on Android backup to recover the notebook after uninstalling the app or changing devices.']},
        {heading: 'Retention and deletion', paragraphs: ['The app keeps your entries on the device until you delete them or remove the app data. You can delete individual entries from the history. Clear the app\'s storage in Android settings or uninstall the app to remove all its local data.', 'Removing app data does not remove PDFs or text you shared elsewhere. Delete those copies in the receiving app or storage location.']},
      ],
    },
  },
  fr: {
    footerLine: 'App Android en préparation.',
    status: 'Petits Besoins est une app Android en préparation. Elle n\'est pas encore publiée sur Google Play.',
    contact: 'Pour une question sur l\'app ou vos données, utilisez Contact pour ouvrir votre application mail. Benjamin Dupin reçoit seulement ce que vous choisissez d\'envoyer. Ce site n\'envoie pas le message. Évitez d\'envoyer des informations personnelles sur votre enfant.',
    contactFallback: 'Activez JavaScript pour utiliser le bouton Contact. Il ouvre votre application mail.',
    dateLabel: 'Date de la politique',
    support: {
      description: 'Aide pour Petits Besoins sur Android, les rappels, le kit PDF et les données sur votre appareil.',
      sections: [
        {heading: 'Comment régler les rappels\u00a0?', paragraphs: ['Ouvrez Rappels, activez-les et choisissez l\'intervalle et les horaires de la journée. Sur Android 13 ou plus récent, autorisez les notifications lorsque l\'app vous le demande. Vous pouvez reporter une notification de 15 minutes. Android peut retarder les rappels pour économiser la batterie.']},
        {heading: 'Que contient le kit PDF\u00a0?', paragraphs: ['Le kit contient les consignes que vous saisissez et des feuilles vierges de semaine et de suivi. Il n\'exporte pas votre historique. L\'aperçu est gratuit. L\'export PDF est l\'option payante prévue, mais l\'achat sur Google Play n\'est pas disponible dans la version actuelle. Une version de debug peut simuler l\'achat.', 'L\'app crée le PDF sur votre appareil et ouvre le menu de partage Android. Vous choisissez l\'application destinataire. Le kit masque le nom de l\'enfant par défaut. Vérifiez l\'aperçu avant de partager.']},
        {heading: 'Puis-je restaurer un achat Google Play\u00a0?', paragraphs: ['La version actuelle ne permet ni l\'achat sur Google Play ni sa restauration. L\'achat simulé en debug reste sur cette installation. Ce n\'est pas un achat Google Play.']},
        {heading: 'Comment changer la langue\u00a0?', paragraphs: ['L\'app suit la langue de votre appareil. Choisissez le français ou l\'anglais dans les réglages de langue d\'Android. L\'app n\'a pas de sélecteur de langue interne.']},
        {heading: 'Où sont mes données et comment les supprimer\u00a0?', paragraphs: ['Les profils et les entrées restent sur votre appareil. L\'app n\'a ni compte ni synchronisation en ligne et exclut ses données des sauvegardes Android et du transfert entre appareils.', 'Vous pouvez supprimer une entrée dans l\'historique. Pour effacer toutes les données de l\'app, effacez son stockage dans les réglages Android ou désinstallez-la. Les copies partagées avec une autre application y restent tant que vous ne les supprimez pas.']},
      ],
    },
    privacy: {
      description: 'Politique de confidentialité de Petits Besoins sur Android, stockage local, rappels, partage et suppression.',
      sections: [
        {heading: 'Champ de cette politique', paragraphs: ['Benjamin Dupin édite Petits Besoins pour Android, identifiée par com.bnjdpn.petitsbesoins. Cette politique décrit la version actuelle en préparation.']},
        {heading: 'Données de l\'enfant et stockage local', paragraphs: ['Petits Besoins est un carnet destiné aux parents et aux personnes qui s\'occupent de l\'enfant pour noter les passages au pot et les changes. Un adulte saisit le nom de l\'enfant, les entrées, les dates, les heures, le lieu à la maison ou en garde et les notes facultatives. Le kit peut aussi contenir des consignes de garde.', 'L\'app conserve les profils et les entrées dans une base Room sur votre appareil. Elle conserve les préférences, les rappels et les brouillons du kit sur l\'appareil avec Android DataStore. Benjamin Dupin ne reçoit pas ces données.']},
        {heading: 'Accès réseau et collecte', paragraphs: ['L\'app actuelle n\'accède pas au réseau. Elle ne demande pas la permission Internet et ne contient aucune bibliothèque réseau. Elle n\'a ni mesure d\'audience, ni rapport de plantage, ni publicité, ni compte utilisateur. Elle n\'envoie pas le carnet à un serveur.']},
        {heading: 'Rappels locaux', paragraphs: ['Android programme les rappels sur votre appareil et affiche des notifications locales. L\'app demande l\'autorisation de notification sur Android 13 ou plus récent. La permission de recevoir le démarrage de l\'appareil lui permet de reprogrammer les rappels après un redémarrage. Ces fonctions ne transmettent pas vos entrées.']},
        {heading: 'PDF et partage', paragraphs: ['L\'export PDF est l\'option payante prévue pour le kit. Il est actuellement accessible par un achat simulé dans les versions de debug, sans paiement réel. L\'app génère le PDF sur votre appareil dans son stockage temporaire. Il contient vos consignes du kit et des feuilles vierges, sans votre historique. Le nom de l\'enfant est masqué par défaut, et vous pouvez choisir de l\'inclure.', 'L\'app ouvre le menu de partage Android lorsque vous demandez un export. Vous choisissez l\'application destinataire. Vous pouvez aussi choisir de partager une synthèse texte du jour. L\'application destinataire traite ensuite cette copie selon sa propre politique de confidentialité. Benjamin Dupin ne la reçoit pas par Petits Besoins.']},
        {heading: 'Achats', paragraphs: ['Google Play Billing et la restauration d\'achat ne sont pas implémentés dans la version actuelle. L\'achat de debug modifie un réglage local et ne réalise aucun paiement. Petits Besoins ne collecte aucune donnée de carte bancaire.', 'Google Play Billing est le service de paiement prévu pour l\'export payant. Google traiterait ce paiement. Cette politique sera revue lors de l\'intégration des achats.']},
        {heading: 'Sauvegardes Android', paragraphs: ['L\'app désactive les sauvegardes Android avec allowBackup à false. Ses règles excluent les données de l\'app des sauvegardes cloud et du transfert entre appareils, y compris la base de données et les préférences locales. Elle n\'a pas de service de sauvegarde ou de synchronisation propre. Ne comptez pas sur une sauvegarde Android pour récupérer le carnet après une désinstallation ou un changement d\'appareil.']},
        {heading: 'Conservation et suppression', paragraphs: ['L\'app garde vos entrées sur l\'appareil jusqu\'à leur suppression ou à l\'effacement des données de l\'app. Vous pouvez supprimer une entrée dans l\'historique. Effacez le stockage de l\'app dans les réglages Android ou désinstallez-la pour supprimer toutes ses données locales.', 'L\'effacement des données de l\'app ne supprime pas les PDF ou les textes partagés ailleurs. Supprimez ces copies dans l\'application destinataire ou leur emplacement de stockage.']},
      ],
    },
  },
}];
