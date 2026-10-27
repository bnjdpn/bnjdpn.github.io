// Product facts remain in content/product-sites/PRVault.mjs. Only the
// product-specific opening and positive privacy phrasing are authored here.
import product from '../../../content/product-sites/PRVault.mjs';
const openings = {
 en: ['The weight to beat. For every rep count.', 'Back Squat', 'Measured 1RM', 'Your records stay on your device. On iPhone, you can enable private iCloud sync.', 'Pro is available monthly, annually, or as a lifetime purchase. Eligible customers get a 7-day trial with the annual plan. See your local price in the app before paying.'],
 fr: ['Le poids à battre. À chaque nombre de reps.', 'Back Squat', '1RM mesuré', 'Vos records restent sur votre appareil. Sur iPhone, vous pouvez activer la synchronisation iCloud privée.', 'Pro est disponible au mois, à l’année ou en achat unique à vie. L’offre annuelle propose 7 jours d’essai aux personnes éligibles. Consultez le prix de votre pays dans l’app avant de payer.'],
 de: ['Dein Bestgewicht. Für jede Wiederholungszahl.', 'Back Squat', 'Gemessenes 1RM', 'Deine Rekorde bleiben auf deinem Gerät. Auf dem iPhone kannst du private iCloud-Synchronisierung aktivieren.'],
 es: ['El peso a superar. Para cada número de reps.', 'Back Squat', '1RM medido', 'Tus marcas se guardan en tu dispositivo. En iPhone puedes activar la sincronización privada con iCloud.'],
 it: ['Il peso da battere. Per ogni numero di rep.', 'Back Squat', '1RM misurato', 'I tuoi record restano sul dispositivo. Su iPhone puoi attivare la sincronizzazione privata con iCloud.'],
 ja: ['レップ数ごとの最高重量を、次の目標に。', 'Back Squat', '実測1RM', '記録はデバイスに保存。iPhoneではiCloudのプライベート同期も利用できます。'],
 pt: ['O peso a superar. Para cada número de reps.', 'Back Squat', '1RM medido', 'Seus recordes ficam no seu aparelho. No iPhone, você pode ativar a sincronização privada com o iCloud.'],
};
export default Object.fromEntries(Object.entries(openings).map(([key, o]) => {
 const t = product.locales[key];
 return [key, {...t, h1:o[0], exercise:o[1], measured:o[2], privacy:o[3], priceNote:o[4] || t.sections.offer.notes[0]}];
}));
