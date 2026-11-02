/* Scroll storytelling: active chapters, honest progress, subtle parallax.
   It never modifies navigation targets or data. */
(() => {
  'use strict';
  const chapterIds=['top','launchpad','work','about','contact'];
  const sections=chapterIds.map(id=>document.getElementById(id)).filter(Boolean);
  const links=new Map([...document.querySelectorAll('[data-story-target]')].map(el=>[el.dataset.storyTarget,el]));
  const rail=document.querySelector('.story-rail');
  if(!sections.length||!rail)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const art=document.querySelector('.art-note');
  const root=document.documentElement;
  let raf=0;
  let lastChapter='';
  function update(){
    raf=0;
    const doc=root;
    const max=Math.max(1,doc.scrollHeight-innerHeight);
    const scroll=Math.max(0,doc.scrollTop||window.scrollY||0);
    const progress=Math.min(100,Math.max(0,scroll/max*100));
    rail.style.setProperty('--chapter-progress',progress.toFixed(2)+'%');
    const marker=Math.min(innerHeight*.4,280);
    let active=sections[0].id;
    for(const section of sections) {
      if(section.getBoundingClientRect().top<=marker)active=section.id;
    }
    if(lastChapter!==active) {
      lastChapter=active;
      for(const section of sections) {
        const isCurrent=section.id===active;
        section.dataset.storyActive=String(isCurrent);
        const link=links.get(section.id);
        if(!link)continue;
        if(isCurrent)link.setAttribute('aria-current','location');
        else link.removeAttribute('aria-current');
      }
    }
    if(!reduced) {
      // Bounded to small pixels to avoid disorienting motion.
      if(art && scroll < innerHeight*1.6)art.style.setProperty('--art-scroll-offset',Math.min(14,scroll*.028).toFixed(1)+'px');
      document.querySelector('.background-grid')?.style.setProperty('--background-scroll-offset',Math.min(35,scroll*.035).toFixed(1)+'px');
    }
  }
  function request(){if(!raf)raf=requestAnimationFrame(update);}
  window.addEventListener('scroll',request,{passive:true});
  window.addEventListener('resize',request,{passive:true});
  if('IntersectionObserver' in window && !reduced) {
    const observer=new IntersectionObserver(entries=>{
      for(const entry of entries)if(entry.isIntersecting) {
        entry.target.dataset.storySeen='true';
        observer.unobserve(entry.target);
      }
    },{threshold:.12,rootMargin:'0px 0px -6% 0px'});
    for(const section of sections)observer.observe(section);
  }else {
    for(const section of sections)section.dataset.storySeen='true';
  }
  update();
})();