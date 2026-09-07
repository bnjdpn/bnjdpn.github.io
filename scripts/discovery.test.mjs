import test from 'node:test';
import assert from 'node:assert/strict';
import {nextDiscovery} from '../assets/discovery.mjs';
const ids = Array.from({length:17},(_,i)=>`app-${i}`);
function seeded(seed) {return () => {seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};}
test('every app appears once per cycle and adjacent visits never repeat the app or field',()=>{
 for(let seed=1;seed<=100;seed++) {
  const random=seeded(seed);let state,previous,previousMode;
  for(let cycle=0;cycle<8;cycle++) {
   const seen=new Set();
   for(let n=0;n<ids.length;n++) {
    const result=nextDiscovery(ids,state,random);
    assert.notEqual(result.id,previous);assert.notEqual(result.mode,previousMode);
    assert.ok(!seen.has(result.id));seen.add(result.id);
    state=JSON.parse(JSON.stringify(result.state));previous=result.id;previousMode=result.mode;
   }
   assert.equal(seen.size,17);
  }
 }
});
test('malformed or retired saved entries cannot create an unknown featured app',()=>{
 for(const saved of [null,'broken',1,[],{last:'retired',bag:['retired',null,'app-3','app-3']},{last:ids[0],bag:[ids[0]],mode:999}]) {
  const result=nextDiscovery(ids,saved,()=>.5);
  assert.ok(ids.includes(result.id));assert.ok(result.state.bag.every(id=>ids.includes(id)));
  assert.equal(new Set(result.state.bag).size,result.state.bag.length);
 }
});
test('empty and single-product catalogues are safe',()=>{
 assert.equal(nextDiscovery([],null),null);
 assert.equal(nextDiscovery(['one'],{last:'one',bag:[]}).id,'one');
});
