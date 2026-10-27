// Strings that only this page needs. Everything else comes from
// content/product-sites/petites-gouttes.mjs, already checked against the store listing.
// Numbers, dates and UI words match the App Store screenshots of version 1.8.0
// (en-US in fl oz, en-GB and fr-FR in mL). Pin positions are percentages of the screenshot.
const en = {
  h1: '22 bags in the freezer. Petites Gouttes tells you which one to take out.',
  chapters: {
    pump: {
      tag: 'At the pump',
      title: 'Log the bag as soon as you pump.',
      body: ['The volume, with left and right added up if you like, the pumping date and time, where the bag goes and the use-by date you chose.', 'Petites Gouttes sets no storage durations: you enter the ones your family follows.'],
      pins: ['Left and right: the app adds them up', 'Pumping date and time', 'Freezer, fridge or room temperature', 'The use-by date you choose'],
      alt: 'New bag screen in Petites Gouttes: volume with a left and right option, pumping date, storage space set to Freezer, and the use-by date.',
    },
    freezer: {
      tag: 'In the freezer',
      title: 'Every bag, where it is.',
      body: ['Follow each bag in the freezer, the fridge or at room temperature, including while it thaws.', 'Move a bag between fridge and freezer, split it into portions that keep its dates, or reserve it for a milk bank donation.'],
      pins: ['Where the bag is', 'The use-by date you recorded', 'Split into portions', 'Reserve for donation', 'Take out to thaw'],
      alt: 'Stock screen in Petites Gouttes: bags of 5.07 and 4.06 fl oz in the freezer, with their pumping date, best-before date and actions.',
    },
    feed: {
      tag: 'At feeding time',
      title: 'The next bag, from your own dates.',
      body: ['The app suggests a bag from the use-by dates you recorded. You choose the bag and how much you used, even a partial amount.', 'The total volume and the days of supply also show on a Home Screen and Lock Screen widget.'],
      pins: ['A local alert before the use-by date', 'Total volume and number of bags', 'The bag to use next', 'Days of supply, from your settings'],
      alt: 'Petites Gouttes dashboard: one bag expires soon, 109.57 fl oz in 22 bags, the bag to use next and 15 days of supply.',
    },
    care: {
      tag: 'For daycare',
      weekAlt: 'Prepare the week in Petites Gouttes: daycare dates with Tuesday selected, handover time 08:00, A4 or US Letter paper.',
      labelsAlt: 'Container labels preview in Petites Gouttes: a sheet of labels with the child’s name, pumping date and volume.',
    },
  },
  outro: 'Stock tracking is free, with no limit on bags.',
  otherApps: 'Other apps by Benjamin Dupin',
};

const gb = {
  ...en,
  h1: '22 bags in the freezer. Petites Gouttes tells you which one to take out.',
  chapters: {
    ...en.chapters,
    freezer: { ...en.chapters.freezer, alt: 'Stock screen in Petites Gouttes: bags of 150 and 120 mL in the freezer, with their pumping date, best-before date and actions.' },
    feed: { ...en.chapters.feed, alt: 'Petites Gouttes dashboard: one bag expires soon, 3,240 mL in 22 bags, the bag to use next and 15 days of supply.' },
    care: { ...en.chapters.care, weekAlt: 'Prepare the week in Petites Gouttes: daycare dates with Tuesday selected, handover time 08:00, A4 or US Letter paper.' },
  },
};

const fr = {
  h1: '22 sachets au congélateur. Petites Gouttes vous dit lequel sortir.',
  chapters: {
    pump: {
      tag: 'Au tire-lait',
      title: 'Notez le sachet dès le tirage.',
      body: ['Le volume, gauche et droite additionnés si vous le souhaitez, la date et l’heure de tirage, l’espace où il part et l’échéance que vous avez choisie.', 'Petites Gouttes ne fixe aucune durée de conservation : vous saisissez celles que suit votre famille.'],
      pins: ['Gauche et droite : l’app fait le total', 'Date et heure de tirage', 'Congélateur, frigo ou température ambiante', 'L’échéance que vous choisissez'],
      alt: 'Écran Nouveau sachet de Petites Gouttes : volume avec l’option gauche et droite, date de tirage, espace Congélateur et date d’expiration.',
    },
    freezer: {
      tag: 'Au congélateur',
      title: 'Chaque sachet, là où il est.',
      body: ['Suivez chaque sachet au congélateur, au frigo ou à température ambiante, y compris pendant la décongélation.', 'Déplacez un sachet du frigo au congélateur ou l’inverse, fractionnez-le en portions qui gardent ses dates, ou réservez-le pour un don au lactarium.'],
      pins: ['L’espace du sachet', 'L’échéance enregistrée', 'Fractionner en portions', 'Réserver pour un don', 'Sortir pour décongeler'],
      alt: 'Écran Stock de Petites Gouttes : sachets de 150 et 120 mL au congélateur, avec leur date de tirage, leur DLC et les actions possibles.',
    },
    feed: {
      tag: 'Au moment du biberon',
      title: 'Le prochain sachet, d’après vos dates.',
      body: ['L’app propose un sachet selon les échéances enregistrées. Vous choisissez le sachet et le volume utilisé, même pour une utilisation partielle.', 'Le volume total et les jours de réserve s’affichent aussi dans un widget, sur l’écran d’accueil et l’écran verrouillé.'],
      pins: ['Une alerte locale avant l’échéance', 'Le volume total et le nombre de sachets', 'Le prochain sachet à utiliser', 'Les jours de réserve, selon vos réglages'],
      alt: 'Tableau de bord de Petites Gouttes : un sachet expire bientôt, 3 240 mL en 22 sachets, le prochain sachet à utiliser et 15 jours d’autonomie.',
    },
    care: {
      tag: 'Pour la crèche',
      weekAlt: 'Préparer la semaine dans Petites Gouttes : jours de garde avec mardi sélectionné, heure de remise 08:00, papier A4 ou US Letter.',
      labelsAlt: 'Aperçu des étiquettes de contenant dans Petites Gouttes : une planche d’étiquettes avec le prénom de l’enfant, la date de tirage et le volume.',
    },
  },
  outro: 'Le stock est gratuit, sans limite de sachets.',
  otherApps: 'Les autres apps de Benjamin Dupin',
};

export default { en, gb, fr };
