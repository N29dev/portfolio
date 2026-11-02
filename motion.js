/* Decorative movement only; never block navigation or content. */
(() => {
  'use strict';
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce)return;
  const root=document.documentElement;
  const revealTargets=[
    ...document.querySelectorAll('.launchpad-heading,.launchpad-link,.section-header,.project,.work-note,.about-heading,.about-content,.approach,.contact-card')
  ];
  if('IntersectionObserver' in window) {
    // Only prepare offscreen items: no flash of invisible initial content.
    const offscreen=revealTargets.filter(el=>el.getBoundingClientRect().top>window.innerHeight-55);
    offscreen.forEach((el,i)=>{
      el.classList.add('n29-reveal');
      if(el.classList.contains('launchpad-link')||el.classList.contains('project')) {
        el.dataset.revealIndex=String(i%4);
      }
    });
    root.classList.add('n29-motion');
    const io=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(!entry.isIntersecting)return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    },{rootMargin:'0px 0px -45px 0px',threshold:.05});
    offscreen.forEach(el=>io.observe(el));
  }
  // Hover spotlight: only pointer devices, update inline vars at most once/frame.
  if(!window.matchMedia('(hover: hover) and (pointer: fine)').matches)return;
  const targets=document.querySelectorAll('.project,.launchpad-link');
  targets.forEach(el=>{
    let frame=0,x=0,y=0;
    el.addEventListener('pointermove',event=>{
      const r=el.getBoundingClientRect();
      x=Math.max(0,Math.min(r.width,event.clientX-r.left));
      y=Math.max(0,Math.min(r.height,event.clientY-r.top));
      if(frame)return;
      frame=requestAnimationFrame(()=>{
        el.style.setProperty('--glow-x',x+'px');
        el.style.setProperty('--glow-y',y+'px');
        frame=0;
      });
    },{passive:true});
  });
})();