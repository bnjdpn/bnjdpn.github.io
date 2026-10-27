// Official Google Play badges, one per language, served once from the portfolio
// root (/assets/badges/google-play/). Files are Google's badges with the transparent
// margin trimmed, so they line up with the App Store badge (48px high on the pages).
// The alt text repeats the words printed on each badge.
export const PLAY_DEVELOPER_URL = 'https://play.google.com/store/apps/developer?id=Benjamin+Dupin';

const BADGES = {
  en: ['en', 'Get it on Google Play'],
  fr: ['fr', 'Disponible sur Google Play'],
  de: ['de', 'Jetzt bei Google Play'],
  es: ['es', 'Disponible en Google Play'],
  'es-MX': ['es-419', 'Descargar en Google Play'],
  it: ['it', 'Disponibile su Google Play'],
  ja: ['ja', 'Google Play で手に入れよう'],
  ko: ['ko', 'Google Play에서 다운로드'],
  nl: ['nl', 'Ontdek het op Google Play'],
  pl: ['pl', 'Pobierz z Google Play'],
  pt: ['pt-br', 'Disponível no Google Play'],
  ru: ['ru', 'Скачать из Google Play'],
  sv: ['sv', 'Ladda ned på Google Play'],
  tr: ['tr', 'Google Play’den indirin'],
  uk: ['ua', 'Завантажити з Google Play'],
  'zh-Hans': ['zh-cn', '去 Google Play 商店下载'],
  'zh-Hant': ['zh-tw', '立即從 Google Play 下載'],
};

export function googlePlayBadge(locale) {
  const [file, alt] = BADGES[locale] ?? BADGES[locale.split('-')[0]] ?? BADGES.en;
  return { src: `/assets/badges/google-play/${file}.webp`, alt, width: 162, height: 48 };
}
