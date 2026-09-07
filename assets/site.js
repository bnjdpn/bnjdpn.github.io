// Complete content is available before JavaScript. No storage or network writes.
const rows=[...document.querySelectorAll('.product-row')];
const filters=[...document.querySelectorAll('[data-filter]')];
const search=document.querySelector('#app-search');
const count=document.querySelector('#result-count');
let category='all';
const normalize=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function update(){
 const terms=normalize(search.value).trim().split(/\s+/).filter(Boolean);
 let visible=0;
 for(const row of rows){const matches=(category==='all'||row.dataset.category===category)&&terms.every(term=>normalize(row.dataset.search).includes(term));row.hidden=!matches;if(matches)visible++;}
 for(const button of filters)button.setAttribute('aria-pressed',String(button.dataset.filter===category));
 count.textContent=`${visible} ${visible===1?count.dataset.singular:count.dataset.label}`;
 document.querySelector('#no-results').hidden=visible>0;
}
if(search){
 for(const button of filters)button.addEventListener('click',()=>{category=button.dataset.filter;update();});
 search.addEventListener('input',update);
 document.querySelector('#clear-filters').addEventListener('click',()=>{category='all';search.value='';update();search.focus({preventScroll:true});});
 for(const link of document.querySelectorAll('[data-category-link]'))link.addEventListener('click',()=>{category=link.dataset.categoryLink;search.value='';update();});
 document.querySelector('.catalog-tools').hidden=false;
 document.querySelector('.catalog-summary').hidden=false;
 update();
}
const support=document.querySelector('#support-app');
if(support){
 const link=document.querySelector('#support-go');
 const syncSupport=()=>{if(support.value){link.href=support.value;link.hidden=false;}else{link.removeAttribute('href');link.hidden=true;}};
 support.addEventListener('change',syncSupport);
 document.querySelector('.support-picker').hidden=false;
 document.querySelector('.support-directory').hidden=true;
 syncSupport();
}
// Reconcile form values when browsers restore a page from their back/forward cache.
window.addEventListener('pageshow',()=>{if(search)update();if(support)support.dispatchEvent(new Event('change'));});
