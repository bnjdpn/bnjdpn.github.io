#!/usr/bin/env node
/** Real-browser checks for the bilingual portfolio.
 * PLAYWRIGHT_MODULE may point to an existing Playwright installation.
 * node scripts/check-redesign-browser.mjs --base http://127.0.0.1:4173
 * Screenshots and a machine-readable report are written outside the public site.
 */
import {createRequire} from 'node:module';
import {readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {resolve, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {productCopy} from '../content/copy.mjs';

const args = process.argv.slice(2);
const arg = (key, fallback) => args.includes(key) ? args[args.indexOf(key) + 1] : fallback;
if (args.includes('--help')) {
  console.log('Usage: node scripts/check-redesign-browser.mjs [--base http://127.0.0.1:4173] [--out output/playwright/redesign]');
  process.exit(0);
}
const require = createRequire(import.meta.url);
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = fileURLToPath(new URL('../', import.meta.url));
const apps = JSON.parse(readFileSync(join(root, 'content/catalog.json'), 'utf8'));
const ids = apps.map(app => app.path).sort();
const categories = ['all', 'training', 'everyday', 'family', 'play'];
const expectedCategory = category => apps.filter(app => category === 'all' || productCopy[app.path].category === category).map(app => app.path).sort();
const expectedSupport = lang => apps.map(app => ({name:app.name, url:`${lang === 'fr' ? '/fr' : ''}/apps/${app.path.toLowerCase()}/support/`}));
const base = arg('--base', 'http://127.0.0.1:4173').replace(/\/$/, '');
const out = resolve(arg('--out', join(root, 'output/playwright/redesign')));
const viewports = [{width:1440, height:1000}, {width:768, height:1024}, {width:390, height:844}, {width:320, height:800}];
mkdirSync(out, {recursive:true});

const browser = await chromium.launch({headless:true, ...(process.env.PLAYWRIGHT_CHANNEL ? {channel:process.env.PLAYWRIGHT_CHANNEL} : {})});
const report = {base, executedAt:new Date().toISOString(), viewports, textScale:'200% computed root font size; this is text resizing, not browser page zoom.', interceptedWrites:0, results:[]};
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const check = (result, label, passed, observed) => {
  result.checks.push({label, passed, ...(observed === undefined ? {} : {observed})});
  if (!passed) result.issues.push(label);
};

async function newContext(javaScriptEnabled = true) {
  const context = await browser.newContext({viewport:viewports[0], reducedMotion:'reduce', javaScriptEnabled});
  await context.route('**/*', async route => {
    const request = route.request();
    if (!['GET', 'HEAD'].includes(request.method())) {
      report.interceptedWrites++;
      return route.fulfill({status:503, contentType:'application/json', body:'{"error":"Browser QA does not send messages"}'});
    }
    // Absolute first-party assets should use the candidate being checked.
    const url = new URL(request.url());
    if ((url.origin === 'https://bnjdpn.github.io' || url.origin === 'https://bnjdpn.com') && new URL(base).origin !== url.origin) {
      const response = await context.request.get(base + url.pathname + url.search);
      return route.fulfill({response});
    }
    return route.continue();
  });
  return context;
}

async function loadImages(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    const visible = [...document.images].filter(image => {
      const preview = image.closest('.preview');
      return !(preview && getComputedStyle(preview).display === 'none');
    });
    for (const image of visible) image.loading = 'eager';
    const step = Math.max(window.innerHeight, 700);
    for (let y = 0; y <= document.documentElement.scrollHeight; y += step) window.scrollTo(0, y);
    window.scrollTo(0, 0);
    await Promise.all(visible.map(image => image.decode().catch(() => {})));
  });
}

async function visibleIds(page) {
  return page.locator('.product-row').evaluateAll(rows => rows.filter(row => !row.hidden && getComputedStyle(row).display !== 'none' && getComputedStyle(row).visibility !== 'hidden' && row.getBoundingClientRect().height > 0).map(row => row.dataset.app).sort());
}

async function inspectLayout(page, result, label, fileName) {
  const observed = await page.evaluate(() => ({
    viewport:innerWidth,
    documentWidth:document.documentElement.scrollWidth,
    overflow:document.documentElement.scrollWidth > innerWidth + 1,
    overflowingElements:[...document.querySelectorAll('main *, header *, footer *')].filter(element => {
      const rect = element.getBoundingClientRect();
      return rect.width && (rect.right > innerWidth + 1 || rect.left < -1) && getComputedStyle(element).position !== 'fixed';
    }).slice(0, 12).map(element => ({tag:element.tagName, class:element.className, text:element.textContent.trim().slice(0, 60)})),
    brokenImages:[...document.images].filter(image => {
      const preview = image.closest('.preview');
      if (preview && getComputedStyle(preview).display === 'none') return false;
      return !image.complete || image.naturalWidth === 0;
    }).map(image => image.getAttribute('src')),
    clippedHeadings:[...document.querySelectorAll('h1, h2, h3')].flatMap(heading => {
      let left = 0, right = innerWidth;
      for (let parent = heading.parentElement; parent; parent = parent.parentElement) {
        if (['hidden', 'clip'].includes(getComputedStyle(parent).overflowX)) {
          const rect = parent.getBoundingClientRect();
          left = Math.max(left, rect.left); right = Math.min(right, rect.right);
        }
      }
      const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
      const clipped = []; let node;
      while ((node = walker.nextNode())) {
        if (!node.textContent.trim()) continue;
        const range = document.createRange(); range.selectNodeContents(node);
        if ([...range.getClientRects()].some(rect => rect.width > 0 && (rect.left < left - 1 || rect.right > right + 1))) clipped.push(node.textContent.trim());
      }
      return clipped.length ? [{tag:heading.tagName, text:clipped.join(' '), allowedLeft:left, allowedRight:right}] : [];
    }),
  }));
  check(result, `${label}: no horizontal overflow`, !observed.overflow, observed);
  check(result, `${label}: all images loaded`, observed.brokenImages.length === 0, observed.brokenImages);
  check(result, `${label}: headings are not clipped`, observed.clippedHeadings.length === 0, observed.clippedHeadings);
  await page.screenshot({path:join(out, fileName), fullPage:true});
  result.screenshots.push(fileName);
}

async function assertState(page, result, label, expected, category, query) {
  const visible = await visibleIds(page);
  check(result, `${label}: matching products`, same(visible, [...expected].sort()), visible);
  const state = await page.evaluate(() => ({
    selected:[...document.querySelectorAll('[data-filter][aria-pressed="true"]')].map(button => button.dataset.filter),
    invalidPressed:[...document.querySelectorAll('[data-filter]')].filter(button => !['true', 'false'].includes(button.getAttribute('aria-pressed'))).length,
    query:document.querySelector('#app-search').value,
    count:document.querySelector('#result-count').textContent.trim(),
    live:document.querySelector('#result-count').getAttribute('aria-live'),
    emptyVisible:!document.querySelector('#no-results').hidden && getComputedStyle(document.querySelector('#no-results')).display !== 'none',
  }));
  check(result, `${label}: selected category`, same(state.selected, [category]) && state.invalidPressed === 0, state.selected);
  check(result, `${label}: search preserved`, state.query === query, state.query);
  check(result, `${label}: result count`, new RegExp(`^${expected.length}\\b`).test(state.count), state.count);
  check(result, `${label}: live result announcement`, ['polite', 'assertive'].includes(state.live), state.live);
  check(result, `${label}: empty state`, state.emptyVisible === (expected.length === 0), state.emptyVisible);
}

async function catalogueShape(page, result, label) {
  const visible = await visibleIds(page);
  check(result, `${label}: every app stays listed`, same(visible, ids), visible);
  const links = await page.locator('.row-link').evaluateAll(rows => rows.map(row => row.getAttribute('href')));
  check(result, `${label}: each name opens its page`, links.length === ids.length && links.every(href => href && href.includes('/apps/')), links);
  const stage = await page.evaluate(() => {
    const hover = matchMedia('(hover: hover) and (pointer: fine)').matches && innerWidth >= 1000;
    const previews = [...document.querySelectorAll('.preview')];
    const shown = previews.filter(preview => getComputedStyle(preview).display !== 'none');
    const fixed = shown.filter(preview => getComputedStyle(preview).position === 'fixed');
    const inFlow = previews.filter(preview => getComputedStyle(preview).position !== 'fixed' && getComputedStyle(preview).display !== 'none' && preview.getBoundingClientRect().height > 40);
    return {hover, shown: shown.length, fixed: fixed.length, inFlow: inFlow.length, total: previews.length};
  });
  if (stage.hover) check(result, `${label}: one capture stays beside the names`, stage.shown === 1 && stage.fixed === 1, stage);
  else check(result, `${label}: each capture sits with its name`, stage.inFlow === stage.total, stage);
}

async function contactLink(page, result) {
  const button = page.locator('[data-contact]').first();
  const before = await page.content();
  const local = ['c', 'o', 'n', 't', 'a', 'c', 't'].join('');
  const domain = ['bnj', 'dpn', '.', 'c', 'o', 'm'].join('');
  const secret = local + String.fromCharCode(64) + domain;
  check(result, 'Contact address is absent before the click', !before.includes(secret) && !before.includes('mailto:'));
  check(result, 'Contact button is visible', await button.isVisible() && (await button.textContent())?.trim() === 'Contact');
  const captured = await page.evaluate(() => {
    let href = '';
    const original = HTMLAnchorElement.prototype.click;
    HTMLAnchorElement.prototype.click = function () { href = this.href; };
    document.querySelector('[data-contact]').click();
    HTMLAnchorElement.prototype.click = original;
    return {href, left: document.body.innerHTML.includes('mailto:')};
  });
  check(result, 'Contact click assembles a mail link', captured.href === `mailto:${secret}` && captured.left === false, captured.href);
}

try {
  for (const lang of ['en', 'fr']) {
    const context = await newContext();
    const page = await context.newPage();
    const result = {language:lang, javaScript:true, path:lang === 'en' ? '/' : '/fr/', checks:[], issues:[], console:[], screenshots:[]};
    report.results.push(result);
    page.on('pageerror', error => result.console.push(error.message));
    page.on('console', message => {if (message.type() === 'error') result.console.push(message.text());});
    try {
      const response = await page.goto(base + result.path, {waitUntil:'networkidle'});
      check(result, 'Page responds successfully', !!response?.ok(), response?.status());
      await loadImages(page);
      check(result, 'Correct document language', await page.locator('html').getAttribute('lang') === lang);
      check(result, 'Catalogue contains every expected product exactly once', same(await page.locator('.product-row').evaluateAll(rows => rows.map(row => row.dataset.app).sort()), ids));
      check(result, 'Support anchor exists', await page.locator('#contact').count() === 1 && await page.locator('a[href$="#contact"]').count() > 0);
      await page.keyboard.press('Tab');
      const firstStop = await page.evaluate(() => ({href:document.activeElement?.getAttribute('href'), text:document.activeElement?.textContent.trim(), rect:document.activeElement?.getBoundingClientRect().toJSON()}));
      check(result, 'First Tab reveals the skip link', firstStop.href === '#main' && firstStop.rect.width > 0 && firstStop.rect.height > 0 && firstStop.rect.top >= 0 && firstStop.rect.bottom <= viewports[0].height, firstStop);
      await page.keyboard.press('Enter');
      check(result, 'Skip link targets the main content', await page.locator('#main').count() === 1 && new URL(page.url()).hash === '#main');
      await catalogueShape(page, result, 'Initial catalogue');
      await contactLink(page, result);
      for (const viewport of viewports) {
        await page.setViewportSize(viewport);
        await page.evaluate(() => {document.documentElement.style.fontSize = ''; window.scrollTo(0, 0);});
        await loadImages(page);
        await inspectLayout(page, result, `${viewport.width}px`, `${lang}-${viewport.width}.png`);
        await catalogueShape(page, result, `${viewport.width}px catalogue`);
        await page.evaluate(() => {document.documentElement.style.fontSize = `${parseFloat(getComputedStyle(document.documentElement).fontSize) * 2}px`; window.scrollTo(0, 0);});
        await inspectLayout(page, result, `${viewport.width}px at 200% text`, `${lang}-${viewport.width}-text-200.png`);
        await catalogueShape(page, result, `${viewport.width}px at 200% text`);
      }
    } catch (error) {
      result.issues.push(error.stack || error.message);
    } finally {
      result.console = [...new Set(result.console)];
      check(result, 'No browser console errors', result.console.length === 0, result.console);
      await context.close();
    }
  }

  for (const lang of ['en', 'fr']) {
    const context = await newContext(false);
    const page = await context.newPage();
    const result = {language:lang, javaScript:false, path:lang === 'en' ? '/' : '/fr/', checks:[], issues:[], console:[], screenshots:[]};
    report.results.push(result);
    try {
      const response = await page.goto(base + result.path, {waitUntil:'networkidle'});
      check(result, 'No-JavaScript page responds successfully', !!response?.ok(), response?.status());
      await loadImages(page);
      for (const viewport of [viewports[0], viewports[3]]) {
        await page.setViewportSize(viewport);
        check(result, `No JavaScript at ${viewport.width}px: all products visible`, same(await visibleIds(page), ids));
        await inspectLayout(page, result, `No JavaScript at ${viewport.width}px`, `${lang}-${viewport.width}-no-js.png`);
      }
      const accessibleProductLinks = await page.locator('.product-row').evaluateAll(rows => rows.every(row => [...row.querySelectorAll('a[href]')].some(link => link.getBoundingClientRect().width > 0)));
      check(result, 'No JavaScript: each product has a visible link', accessibleProductLinks);
      const directory = page.locator('.support-directory');
      check(result, 'No JavaScript: support directory is available', await directory.isVisible() && await page.locator('.support-picker').isHidden());
      await directory.locator('summary').click();
      const supportLinks = await directory.locator('a').evaluateAll(links => links.map(link => ({name:link.textContent.trim(), url:link.getAttribute('href')})));
      check(result, 'No JavaScript: support links match all localized product destinations', same(supportLinks, expectedSupport(lang)), supportLinks);
      check(result, 'No JavaScript: expanded support links are visible', await directory.locator('a').evaluateAll(links => links.every(link => link.getBoundingClientRect().width > 0 && link.getBoundingClientRect().height > 0)));
    } catch (error) {
      result.issues.push(error.stack || error.message);
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
  report.failures = report.results.filter(result => result.issues.length).map(({language, javaScript, issues}) => ({language, javaScript, issues}));
  report.passed = report.failures.length === 0 && report.interceptedWrites === 0;
  writeFileSync(join(out, 'browser-report.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({passed:report.passed, report:join(out, 'browser-report.json'), scenarios:report.results.length, checks:report.results.reduce((sum, result) => sum + result.checks.length, 0), interceptedWrites:report.interceptedWrites, failures:report.failures}, null, 2));
  if (!report.passed) process.exitCode = 1;
}
