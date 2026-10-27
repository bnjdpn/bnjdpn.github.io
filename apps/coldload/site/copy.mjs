// Existing, verified product copy remains the source for all 21 storefronts.
import app from '../../../content/product-sites/ColdLoad.mjs';
import { copyFor } from '../../../scripts/product-site/render-home.mjs';
export { app };
export function copy(code) {
  const t = structuredClone(copyFor(app, code));
  if (code.startsWith('fr')) t.hero.h1 = 'Les disques par côté. Avec votre stock.';
  if (code.startsWith('en')) t.hero.h1 = 'The plates per side. From your own stock.';
  // Amounts are left to each store at purchase time; no frozen storefront price.
  t.sections.offer.notes = [];
  return t;
}
