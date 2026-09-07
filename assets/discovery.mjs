// Only catalogue IDs and visual choices are kept locally. No timestamps or visitor IDs.
export const STORAGE_KEY = 'bd-app-discovery-v1';
export function nextDiscovery(ids, saved, random = Math.random) {
  const unique = [...new Set(ids)].filter(id => typeof id === 'string');
  if (!unique.length) return null;
  const state = saved && typeof saved === 'object' ? saved : {};
  const last = unique.includes(state.last) ? state.last : null;
  let bag = Array.isArray(state.bag) ? [...new Set(state.bag)].filter(id => unique.includes(id) && id !== last) : [];
  const pick = length => Math.min(length - 1, Math.max(0, Math.floor((Number(random()) || 0) * length)));
  if (!bag.length) {
    bag = [...unique];
    for (let i = bag.length - 1; i > 0; i--) { const j = pick(i + 1); [bag[i], bag[j]] = [bag[j], bag[i]]; }
    if (bag[0] === last && bag.length > 1) [bag[0], bag[1]] = [bag[1], bag[0]];
  }
  const id = bag.shift();
  const previousMode = Number.isInteger(state.mode) && state.mode >= 0 && state.mode < 3 ? state.mode : -1;
  const mode = previousMode < 0 ? pick(3) : (previousMode + 1 + pick(2)) % 3;
  return {id, state:{last:id, bag, mode}, mode, seed:pick(1000000)};
}
