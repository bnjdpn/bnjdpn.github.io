// Filters are optional. The full catalogue is in the HTML before this script runs.
const rows=[...document.querySelectorAll('.product-row')];
const filters=[...document.querySelectorAll('[data-filter]')];
const search=document.querySelector('#app-search');
const count=document.querySelector('#result-count');
const tools=document.querySelector('.catalog-tools');
const summary=document.querySelector('.catalog-summary');
let category='all';
const normalize=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function update(){
 const terms=normalize(search.value).trim().split(/\s+/).filter(Boolean);
 let visible=0;
 for(const row of rows){
  const matches=(category==='all'||row.dataset.category===category)&&terms.every(term=>normalize(row.dataset.search||'').includes(term));
  row.hidden=!matches;
  if(matches)visible++;
 }
 for(const button of filters)button.setAttribute('aria-pressed',String(button.dataset.filter===category));
 count.textContent=`${visible} ${visible===1?count.dataset.singular:count.dataset.label}`;
 document.querySelector('#no-results').hidden=visible>0;
}
if(search&&tools&&summary&&count){
 for(const button of filters)button.addEventListener('click',()=>{category=button.dataset.filter;update();});
 search.addEventListener('input',update);
 document.querySelector('#clear-filters').addEventListener('click',()=>{category='all';search.value='';update();search.focus({preventScroll:true});});
 for(const link of document.querySelectorAll('[data-category-link]'))link.addEventListener('click',()=>{category=link.dataset.categoryLink;search.value='';update();});
 tools.hidden=false;
 summary.hidden=false;
 update();
}
window.addEventListener('pageshow',()=>{if(search&&tools)update();});
