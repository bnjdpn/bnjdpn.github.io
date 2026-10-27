// Product facts remain in content/product-sites/GrooveLog.mjs; this file supplies
// the editorial reading order and localized landing copy. No fixed Pro prices.
import product from '../../../content/product-sites/GrooveLog.mjs';
const editorial = {
 en: {
  h1: ['3 pull-ups.', 'One tap.'], intro: 'Your next easy set, ready when you are. GrooveLog spaces your Grease the Groove practice through the day and logs each set in one tap.',
  journal: 'Set done. Keep it in your journal.', journalIntro: 'Save the suggested set or log what you actually did. Your practice stays yours, right down to the last rep.',
  next: 'An easy set now. The next one later.', nextBody: 'Choose the spacing for your reminders and widget. Take a lighter day when you need one, then pick up your practice tomorrow.',
  cycle: 'Look a few weeks ahead.', cycleIntro: 'Try an objective with an active movement. Preview the practice, lighter and retest weeks before starting your next cycle.',
  cycleCap: 'Prepare your next cycle from your own reference.', journalCap: 'Keep the set. Adjust it if you need to.',
  privacy: 'Your journal stays on your device. You choose where to save your local backup.',
  offerNote: 'Pro is available monthly, yearly or as a lifetime purchase. Check your store for the price and any eligible trial. Subscriptions renew automatically and can be managed in your store settings.',
  close: 'Make room for your next small set.', nav: ['Practice','Cycles','Pro'], others: 'Other apps',
 },
 fr: {
  h1: ['3 tractions.', 'Un toucher.'], intro: 'Votre prochaine série facile, au bon moment. GrooveLog espace votre pratique de Grease the Groove dans la journée et note chaque série d’un toucher.',
  journal: 'La série est faite. Gardez-la.', journalIntro: 'Enregistrez la série proposée ou notez ce que vous avez vraiment fait. Votre pratique reste la vôtre, à la répétition près.',
  next: 'Une petite série. Puis votre journée.', nextBody: 'Choisissez l’espacement de vos rappels et du widget. Adoptez une journée plus légère quand vous en avez besoin, puis reprenez votre pratique le lendemain.',
  cycle: 'Prenez quelques semaines d’avance.', cycleIntro: 'Essayez un objectif sur un mouvement actif. Voyez les semaines de pratique, d’allègement et de retest avant de démarrer votre prochain cycle.',
  cycleCap: 'Préparez votre prochain cycle à partir de votre référence.', journalCap: 'Gardez la série. Ajustez-la si besoin.',
  privacy: 'Votre journal reste sur votre appareil. Vous choisissez où enregistrer votre sauvegarde locale.',
  offerNote: 'Pro existe au mois, à l’année ou à vie. Le prix et l’éventuelle période d’essai sont indiqués dans votre store. Les abonnements se renouvellent automatiquement et se gèrent dans les réglages du store.',
  close: 'Une place pour votre prochaine petite série.', nav: ['Pratique','Cycles','Pro'], others: 'Autres apps',
 },
 de: {
  h1: ['3 Klimmzüge.', 'Ein Tippen.'], intro: 'Dein nächster leichter Satz, wenn es passt. GrooveLog verteilt deine Grease-the-Groove-Praxis über den Tag und speichert jeden Satz mit einem Tippen.',
  journal: 'Satz geschafft. Im Protokoll behalten.', journalIntro: 'Speichere den vorgeschlagenen Satz oder trage ein, was du tatsächlich gemacht hast. Deine Praxis bleibt deine, bis zur letzten Wiederholung.',
  next: 'Ein leichter Satz. Dann dein Alltag.', nextBody: 'Wähle den Abstand für Erinnerungen und Widget. Plane einen leichteren Tag ein, wenn du ihn brauchst, und setze deine Praxis morgen fort.',
  cycle: 'Die nächsten Wochen im Blick.', cycleIntro: 'Probiere ein Ziel für eine aktive Übung aus. Sieh dir die Übungs-, Entlastungs- und Retestwochen an, bevor du deinen nächsten Zyklus startest.',
  cycleCap: 'Bereite den nächsten Zyklus mit deinem Referenzwert vor.', journalCap: 'Behalte den Satz. Passe ihn bei Bedarf an.',
  privacy: 'Dein Protokoll bleibt auf deinem Gerät. Du entscheidest, wo du deine lokale Sicherung speicherst.',
  offerNote: 'Pro gibt es monatlich, jährlich oder als einmaligen Kauf. Preis und mögliche Testphase findest du in deinem Store. Abos verlängern sich automatisch und lassen sich in den Store-Einstellungen verwalten.',
  close: 'Platz für deinen nächsten kleinen Satz.', nav: ['Praxis','Zyklen','Pro'], others: 'Weitere Apps',
 },
 es: {
  h1: ['3 dominadas.', 'Un toque.'], intro: 'Tu próxima serie fácil, cuando te venga bien. GrooveLog reparte tu práctica de Grease the Groove durante el día y guarda cada serie con un toque.',
  journal: 'Serie hecha. Guárdala en tu diario.', journalIntro: 'Guarda la serie propuesta o anota lo que has hecho de verdad. Tu práctica sigue siendo tuya, hasta la última repetición.',
  next: 'Una serie fácil. Después, tu día.', nextBody: 'Elige el intervalo para los avisos y el widget. Haz un día más suave cuando lo necesites y retoma tu práctica al día siguiente.',
  cycle: 'Mira unas semanas más allá.', cycleIntro: 'Prueba un objetivo con un movimiento activo. Consulta las semanas de práctica, descarga y reevaluación antes de comenzar el siguiente ciclo.',
  cycleCap: 'Prepara tu próximo ciclo a partir de tu referencia.', journalCap: 'Guarda la serie. Ajústala cuando lo necesites.',
  privacy: 'Tu diario se queda en tu dispositivo. Tú eliges dónde guardar la copia local.',
  offerNote: 'Pro está disponible por mes, por año o de por vida. Consulta el precio y la posible prueba en tu tienda. Las suscripciones se renuevan automáticamente y se gestionan en los ajustes de la tienda.',
  close: 'Un hueco para tu próxima serie fácil.', nav: ['Práctica','Ciclos','Pro'], others: 'Otras apps',
 },
};
export default Object.fromEntries(Object.entries(editorial).map(([key,t]) => [key,{...product.locales[key],...t}]));
