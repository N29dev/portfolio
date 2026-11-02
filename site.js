/* N29 — optional enhancements. Core links work without JavaScript. */
(() => {
  'use strict';
  const $=selector=>document.querySelector(selector);
  const $$=selector=>Array.from(document.querySelectorAll(selector));

  const year=$('#year');
  if(year) year.textContent=String(new Date().getFullYear());



  const progress=$('#progress');
  let ticking=false;
  function updateProgress(){
    ticking=false;
    if(!progress)return;
    const root=document.documentElement;
    const max=root.scrollHeight-root.clientHeight;
    progress.style.width=(max>0?Math.max(0,Math.min(100,100*root.scrollTop/max)):0)+'%';
  }
  window.addEventListener('scroll',()=>{
    if(ticking)return;
    ticking=true;
    requestAnimationFrame(updateProgress);
  },{passive:true});
  window.addEventListener('resize',updateProgress,{passive:true});
  updateProgress();

  if('IntersectionObserver' in window){
    const navLinks=$$('.nav-links a');
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        navLinks.forEach(link=>{
          if(link.getAttribute('href')==='#'+entry.target.id)link.setAttribute('aria-current','location');
          else link.removeAttribute('aria-current');
        });
      });
    },{rootMargin:'-30% 0px -58% 0px'});
    ['work','about','contact'].forEach(id=>{
      const section=document.getElementById(id);
      if(section)observer.observe(section);
    });
  }
})();
