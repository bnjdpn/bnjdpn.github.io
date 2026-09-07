#!/usr/bin/env node
// Optional real-browser regression checks. No browser dependency reaches visitors.
// PLAYWRIGHT_MODULE=/path/to/playwright PLAYWRIGHT_CHANNEL=chrome node scripts/check-swipe-browser.mjs
import {createRequire} from 'node:module';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import assert from 'node:assert/strict';
const {chromium} = createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.PORTFOLIO_QA_URL || 'http://127.0.0.1:51237';
const out = resolve(process.env.PORTFOLIO_QA_OUT || 'output/playwright/swipe');
const media = JSON.parse(readFileSync(new URL('../content/preview-media.json',import.meta.url)));
const ids = Object.keys(media);
const selectionKey = 'bd-app-selection-v1', rotationKey = 'bd-app-discovery-v1';
const browser = await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHANNEL ? {channel:process.env.PLAYWRIGHT_CHANNEL} : {})});
mkdirSync(out,{recursive:true});
const results = [], errors = [];
async function context(options = {},initial = {}) {
  const ctx = await browser.newContext({viewport:{width:1440,height:1000},...options});
  await ctx.route('**/*',route => ['GET','HEAD'].includes(route.request().method()) ? route.continue() : route.fulfill({status:503,body:'Browser QA blocks writes'}));
  await ctx.addInitScript(({ids,selectionKey,rotationKey,initial}) => {
    if (!sessionStorage.getItem('swipe-qa-seeded')) {
      localStorage.setItem(rotationKey,initial.corrupt ? '{broken' : JSON.stringify({bag:ids,mode:0}));
      localStorage.setItem(selectionKey,JSON.stringify(initial.saved || []));
      sessionStorage.setItem('swipe-qa-seeded','true');
    }
    if (initial.blockStorage) {
      Storage.prototype.getItem = Storage.prototype.setItem = () => { throw new DOMException('QA unavailable','SecurityError'); };
    }
  },{ids,selectionKey,rotationKey,initial});
  const page = await ctx.newPage();
  page.on('pageerror',error => errors.push(error.message));
  return {ctx,page};
}
const idle = page => page.waitForFunction(() => document.querySelector('#swipe-card')?.dataset.ready === 'true' && document.querySelector('#swipe-card').getAttribute('aria-busy') === 'false');
const settled = page => page.waitForFunction(() => document.getAnimations().filter(a => a.effect?.getTiming().iterations !== Infinity).every(a => a.playState === 'finished'));
const current = page => page.locator('.experience').getAttribute('data-featured');
const saved = page => page.evaluate(key => JSON.parse(localStorage.getItem(key) || '[]'),selectionKey);
async function visit(page,path = '/fr/') { await page.goto(base+path,{waitUntil:'networkidle'}); await idle(page); }
async function action(page,selector) { await page.locator(selector).click(); await idle(page); }
async function drag(page,dx,dy = 5) {
  const rect = await page.locator('.card-media').boundingBox();
  const x = rect.x+rect.width/2, y = rect.y+rect.height/2;
  await page.mouse.move(x,y); await page.mouse.down();
  await page.mouse.move(x+dx,y+dy,{steps:15}); await page.mouse.up();
  await idle(page);
  await page.waitForFunction(() => Math.abs(parseFloat(document.querySelector('#swipe-card').style.getPropertyValue('--drag-x'))) < .01);
  if (Math.abs(dx)<28) await page.waitForTimeout(400); // Let the cancelled drag's finite spring settle.
}
async function run(name,fn) { await fn(); results.push(name); console.log('✓ '+name); }
try {
  await run('Mouse gestures, undo, buttons, scoped keyboard and selection persistence',async () => {
    const {ctx,page} = await context(); await visit(page); await settled(page);
    assert.equal(await current(page),ids[0]);
    await drag(page,18); assert.equal(await current(page),ids[0]);
    await drag(page,-180); assert.equal(await current(page),ids[1]); assert.deepEqual(await saved(page),[]);
    await action(page,'#undo-discovery'); assert.equal(await current(page),ids[0]);
    await drag(page,180); assert.equal(await current(page),ids[1]); assert.deepEqual(await saved(page),[ids[0]]);
    await action(page,'#undo-discovery'); assert.equal(await current(page),ids[0]); assert.deepEqual(await saved(page),[]);
    await action(page,'#keep-discovery'); await action(page,'#next-discovery');
    assert.equal(await current(page),ids[2]); assert.deepEqual(await saved(page),[ids[0]]);
    await page.locator('#swipe-card').focus(); await page.keyboard.press('ArrowRight'); await idle(page);
    assert.equal(await current(page),ids[3]); assert.deepEqual(await saved(page),[ids[0],ids[2]]);
    await action(page,'#undo-discovery'); assert.equal(await current(page),ids[2]); assert.deepEqual(await saved(page),[ids[0]]);
    await page.locator('[data-selection-open]').focus(); await page.keyboard.press('ArrowLeft'); assert.equal(await current(page),ids[2]);
    await page.locator('[data-selection-open]').click(); await settled(page);
    assert.equal(await page.locator('.selection-item').count(),1);
    // A native modal may let Tab reach browser chrome (activeElement is body), but never a background control.
    for (let i=0;i<7;i++) { await page.keyboard.press('Tab'); assert.equal(await page.evaluate(() => document.activeElement === document.body || document.querySelector('dialog').contains(document.activeElement)),true); }
    await page.locator('[data-open-saved]').focus();
    await page.evaluate(({selectionKey,ids}) => window.dispatchEvent(new StorageEvent('storage',{key:selectionKey,newValue:JSON.stringify([ids[0],ids[4]])})),{selectionKey,ids});
    assert.equal(await page.evaluate(() => document.activeElement.dataset.openSaved),ids[0]);
    await page.screenshot({path:out+'/selection-desktop.png'});
    await page.evaluate(() => window.dispatchEvent(new StorageEvent('storage',{key:null,newValue:null})));
    assert.equal(await page.locator('.selection-item').count(),0);
    await page.keyboard.press('Escape'); assert.equal(await page.evaluate(() => document.activeElement.hasAttribute('data-selection-open')),true);
    await page.reload({waitUntil:'networkidle'}); await idle(page); assert.notEqual(await current(page),ids[2]); assert.deepEqual(await saved(page),[ids[0]]);
    await visit(page,'/'); assert.equal(await page.locator('[data-selection-count]').first().textContent(),'1');
    await page.locator('[data-selection-open]').click(); await page.locator('[data-remove-saved]').click();
    assert.equal(await page.locator('.selection-item').count(),0); assert.equal(await page.evaluate(() => document.activeElement.id),'close-selection');
    await page.keyboard.press('Escape');
    await page.locator('#app-search').fill('LoadSense'); assert.equal(await page.locator('.product-row:visible').count(),1);
    const before = await current(page); await page.keyboard.press('ArrowLeft'); assert.equal(await current(page),before);
    await page.locator(`[data-save-app="${ids[0]}"]`).click(); assert.deepEqual(await saved(page),[ids[0]]);
    await page.locator('#clear-filters').click(); assert.equal(await page.locator('.product-row:visible').count(),17);
    // A real link click navigates; a drag must never activate that link.
    await page.evaluate(() => scrollTo(0,0));
    const target = await page.locator('#discovery-link').getAttribute('href');
    await ctx.route(target,route => route.fulfill({status:200,contentType:'text/html',body:'<!doctype html><title>Site link QA</title><p>Site link destination reached.</p>'}));
    await page.locator('#discovery-link').click(); await page.waitForURL(target);
    await ctx.close();
  });
  await run('Corrupt rotation preserves saved apps; blocked storage keeps a session selection',async () => {
    let {ctx,page} = await context({reducedMotion:'reduce'},{corrupt:true,saved:[ids[5]]});
    await visit(page); assert.equal(await page.locator('[data-selection-count]').first().textContent(),'1');
    const featured = await current(page); await action(page,'#keep-discovery');
    assert.deepEqual(new Set(await saved(page)),new Set([ids[5],featured])); await ctx.close();
    ({ctx,page} = await context({reducedMotion:'reduce'},{blockStorage:true}));
    await visit(page); await action(page,'#keep-discovery'); await page.locator('[data-selection-open]').click();
    assert.equal(await page.locator('.selection-item').count(),1);
    assert.match(await page.locator('#selection-storage-note').textContent(),/cette visite/); await ctx.close();
  });
  await run('Failed next image leaves the current app and selection intact; retry recovers',async () => {
    const {ctx,page} = await context({reducedMotion:'reduce'},{saved:[ids[5]]});
    const failedPath = media[ids[1]].fr.src;
    await ctx.route('**'+failedPath,route => route.abort('failed'));
    await visit(page); await action(page,'#keep-discovery');
    assert.equal(await current(page),ids[0]); assert.deepEqual(await saved(page),[ids[5]]);
    assert.match(await page.locator('#discovery-announcement').textContent(),/réessayer/);
    assert.match(await page.locator('.swipe-hint').textContent(),/réessayer/);
    assert.equal(await page.locator('#undo-discovery').isDisabled(),true);
    await ctx.unroute('**'+failedPath); await action(page,'#keep-discovery');
    assert.equal(await current(page),ids[1]); assert.deepEqual(await saved(page),[ids[5],ids[0]]); await ctx.close();
  });
  await run('Native touch swipe keeps an app; vertical touch scroll does not change it',async () => {
    const {ctx,page} = await context({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
    await visit(page); await settled(page); const session = await ctx.newCDPSession(page);
    const rect = await page.locator('.card-media').boundingBox();
    const x=rect.x+rect.width*.36,y=rect.y+rect.height*.5;
    const touch = async (type,x,y) => session.send('Input.dispatchTouchEvent',{type,touchPoints:type==='touchEnd'?[]:[{x,y,radiusX:6,radiusY:6,force:1,id:1}]});
    await touch('touchStart',x,y);
    for(let i=1;i<=12;i++) await touch('touchMove',x+i*12,y+i*.3);
    await page.screenshot({path:out+'/touch-drag.png'}); await touch('touchEnd'); await idle(page);
    assert.equal(await current(page),ids[1]); assert.deepEqual(await saved(page),[ids[0]]);
    await page.screenshot({path:out+'/touch-mobile.png'});
    await touch('touchStart',x,y);
    for(let i=1;i<=12;i++) await touch('touchMove',x+i*.4,y-i*15);
    await touch('touchEnd'); await page.waitForFunction(() => scrollY>50);
    assert.equal(await current(page),ids[1]);
    await ctx.close();
  });
  await run('17 apps × 2 languages × 3 widths: rotation, media coverage and layout',async () => {
    let samples = 0;
    for(const path of ['/fr/','/']) for(const width of [320,768,1440]) {
      const {ctx,page} = await context({viewport:{width,height:width===320?740:1000},reducedMotion:'reduce'}); await visit(page,path);
      const seen = [];
      for(let i=0;i<17;i++) {
        const id = await current(page); seen.push(id);
        const layout = await page.evaluate(() => {
          const card=document.querySelector('#swipe-card'),media=document.querySelector('.card-media'),screen=media.querySelector('.screen-viewport'),image=screen.querySelector('img');
          const m=media.getBoundingClientRect(),s=screen.getBoundingClientRect();
          return {overflow:document.documentElement.scrollWidth>innerWidth+1,cardOverflow:card.scrollWidth>card.clientWidth+1,coverage:s.bottom>=m.bottom-3,watch:document.querySelector('.experience').dataset.watch==='true',natural:image.naturalWidth,copyDisplay:getComputedStyle(document.querySelector('.swipe-card .discovery-copy')).display};
        });
        assert.equal(layout.overflow,false,`${path} ${width} ${id}: page overflow`);
        assert.equal(layout.cardOverflow,false,`${path} ${width} ${id}: card overflow`);
        assert.equal(layout.coverage||layout.watch,true,`${path} ${width} ${id}: empty media bottom`);
        assert.ok(layout.natural>0); samples++;
        if (['LoadSense','Echappee','FastZen','petites-dents','PasDuJour'].includes(id)) await page.locator('.deck-column').screenshot({path:`${out}/card-${path==='/fr/'?'fr':'en'}-${width}-${id}.png`});
        if(i<16) await action(page,'#next-discovery');
      }
      assert.equal(new Set(seen).size,17); await ctx.close();
    }
    assert.equal(samples,102);
  });
  await run('Reduced motion, pause, no-JavaScript fallback',async () => {
    let {ctx,page} = await context(); await visit(page); await settled(page);
    await page.emulateMedia({reducedMotion:'reduce'}); await page.waitForFunction(() => document.body.classList.contains('motion-paused'));
    assert.equal(await page.locator('.experience-stage').evaluate(node => getComputedStyle(node).position),'relative');
    await action(page,'#next-discovery');
    await page.emulateMedia({reducedMotion:'no-preference'}); await page.waitForFunction(() => document.body.classList.contains('motion-enabled'));
    await page.locator('#motion-toggle').click(); await page.waitForFunction(() => document.body.classList.contains('motion-paused')); await ctx.close();
    ctx=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}}); page=await ctx.newPage();
    await page.goto(base+'/fr/',{waitUntil:'networkidle'});
    assert.equal(await page.locator('.product-row').count(),17); assert.equal(await page.locator('#discovery-link').isVisible(),true);
    assert.equal(await page.locator('#keep-discovery').isVisible(),false); assert.equal(await page.locator('[data-selection-open]').isVisible(),false);
    await page.screenshot({path:out+'/no-javascript.png'}); await ctx.close();
  });
  assert.deepEqual(errors,[]);
} finally {
  writeFileSync(out+'/swipe-browser-report.json',JSON.stringify({base,executedAt:new Date().toISOString(),passed:results,errors},null,2)+'\n');
  await browser.close();
}
