/* N29 Achievements — static cards stay readable even without JavaScript. */
(()=>{'use strict';
const cards=[...document.querySelectorAll('[data-achievement]')];
const groups=[...document.querySelectorAll('[data-year-group]')];
const buttons=[...document.querySelectorAll('[data-category-filter]')];
const year=document.getElementById('a-year-select');
const count=document.getElementById('a-count');
const empty=document.getElementById('a-empty');
let category='all';
function apply(){
 const yr=year.value;let shown=0;
 cards.forEach(card=>{
  const visible=(category==='all'||category===card.dataset.category)&&(yr==='all'||yr===card.dataset.year);
  card.hidden=!visible;if(visible)shown++;
 });
 groups.forEach(group=>group.hidden=![...group.querySelectorAll('[data-achievement]')].some(card=>!card.hidden));
 buttons.forEach(button=>{const active=button.dataset.categoryFilter===category;button.setAttribute('aria-pressed',String(active));});
 count.textContent=shown+' milestone'+(shown===1?'':'s');empty.hidden=shown!==0;
}
buttons.forEach(button=>button.addEventListener('click',()=>{category=button.dataset.categoryFilter;apply()}));
year.addEventListener('change',apply);
document.getElementById('a-reset').addEventListener('click',()=>{category='all';year.value='all';apply()});
const el=document.getElementById('year');if(el)el.textContent=String(new Date().getFullYear());
apply();
})();
