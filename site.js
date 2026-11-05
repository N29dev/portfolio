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

  /* Fast, keyboard-accessible site directory. It contains only real destinations. */
  function setupCommandPalette() {
    const dialog=$('#command-menu');
    const input=$('#command-search');
    const container=$('#command-results');
    if(!dialog||!input||!container||typeof dialog.showModal!=='function')return;
    const commands=[
      {title:'Home',desc:'Back to the top',href:'#top',icon:'⌂',keywords:'n29 home'},
      {title:'Projects',desc:'Selected tools and builds',href:'#work',icon:'◈',keywords:'work portfolio'},
      {title:'Achievements',desc:'Olympiad medals, ICPC results and milestones',href:'/achievements/',icon:'🏅',keywords:'hall of fame awards national olympiad icpc scoreboard medals achievements'},
      {title:'About',desc:'Get to know N29',href:'#about',icon:'✳',keywords:'nurlybek who developer'},
      {title:'Contact',desc:'Find me online',href:'#contact',icon:'✉',keywords:'social message'},
      {title:'8v8 server finder',desc:'Find BL:R 8v8 matches',href:'https://blr.n29.kz/servers/?mode=8v8',icon:'⚽',keywords:'roblox public servers lobby glutony'},
      {title:'Pro servers',desc:'Browse competitive lobbies',href:'https://blr.n29.kz/servers/?mode=pro',icon:'🏆',keywords:'roblox game server finder'},
      {title:'Community customs',desc:'Join player-hosted matches',href:'https://blr.n29.kz/servers/customs/',icon:'🤝',keywords:'private server match roblox'},
      {title:'Glutony Discord app',desc:'Add the app through Discord',href:'https://discord.com/oauth2/authorize?client_id=1563907646757666926&integration_type=1&scope=applications.commands',icon:'✦',keywords:'bot commands install invite'},
      {title:'Creator Studio',desc:'Clip, compress, patch and inspect videos',href:'https://blr.n29.kz/#tools',icon:'🎬',keywords:'mp4 tiktok ffmpeg video'},
      {title:'GitHub',desc:'Source code and public repositories',href:'https://github.com/N29dev',icon:'⌘',keywords:'developer code'},
      {title:'Codeforces',desc:'Competitive programming profile',href:'https://codeforces.com/profile/N29',icon:'∑',keywords:'algorithms competitive programming'},
      {title:'TikTok',desc:'@0nlyhunger',href:'https://www.tiktok.com/@0nlyhunger',icon:'▶',keywords:'videos edits short'},
      {title:'Discord profile',desc:'Find N29 on Discord',href:'https://discord.com/users/1479778096834941099',icon:'☏',keywords:'social chat'},
      {title:'Roblox profile',desc:'OnlyHunger',href:'https://www.roblox.com/users/2440032582/profile',icon:'◇',keywords:'games blr'}
    ];
    let matches=[];
    let selected=0;
    let opener=null;
    const create=(tag,cls,content)=>{
      const el=document.createElement(tag);
      if(cls)el.className=cls;
      if(content!==undefined)el.textContent=content;
      return el;
    };
    function syncSelected(){
      const rows=container.querySelectorAll('.command-row');
      rows.forEach((el,i)=>{el.dataset.selected=String(i===selected);});
      rows[selected]?.scrollIntoView({block:'nearest'});
    }
    function render(){
      const term=input.value.trim().toLocaleLowerCase();
      matches=commands.filter(c=>!term||(c.title+' '+c.desc+' '+c.keywords).toLocaleLowerCase().includes(term));
      selected=0;
      container.replaceChildren();
      if(!matches.length){container.append(create('div','command-no-results','No destinations found. Try “server”, “bot”, or “TikTok”.'));return;}
      const fragment=document.createDocumentFragment();
      matches.forEach((c,i)=>{
        const link=create('a','command-row');
        link.href=c.href;
        link.dataset.selected=String(i===selected);
        if(c.href.startsWith('https://')){link.target='_blank';link.rel='noopener noreferrer';}
        link.append(create('span','command-row-icon',c.icon));
        const content=create('span','command-row-text');
        content.append(create('strong','',c.title),create('small','',c.desc));
        link.append(content,create('span','command-row-arrow','↗'));
        link.addEventListener('pointerenter',()=>{selected=i;syncSelected();});
        link.addEventListener('click',()=>dialog.close());
        fragment.append(link);
      });
      container.append(fragment);
    }
    function open(){
      if(dialog.open)return;
      opener=document.activeElement;
      input.value='';
      render();
      dialog.showModal();
      input.focus();
    }
    const close=()=>{if(dialog.open)dialog.close();};
    $$('[data-command-open]').forEach(button=>button.addEventListener('click',open));
    $$('[data-command-close]').forEach(button=>button.addEventListener('click',close));
    input.addEventListener('input',render);
    input.addEventListener('keydown',event=>{
      if((event.key==='ArrowDown'||event.key==='ArrowUp')&&matches.length){
        event.preventDefault();
        selected=(selected+(event.key==='ArrowDown'?1:-1)+matches.length)%matches.length;
        syncSelected();
      }else if(event.key==='Enter'&&matches[selected]){
        event.preventDefault();
        const target=container.querySelectorAll('.command-row')[selected];
        target?.click();
      }
    });
    dialog.addEventListener('click',event=>{if(event.target===dialog)close();});
    dialog.addEventListener('close',()=>{if(opener&&opener.isConnected)opener.focus();});
    document.addEventListener('keydown',event=>{
      if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){
        event.preventDefault();
        dialog.open?close():open();
      }
    });
    const isMac=/(Mac|iPhone|iPad)/i.test(navigator.platform||'');
    $$('.command-trigger kbd,.footer-search kbd').forEach(kbd=>kbd.textContent=isMac?'⌘ K':'Ctrl K');
  }
  setupCommandPalette();

  function setupPortraitViewer(){
    const dialog=$('#portrait-lightbox');
    const opener=$('[data-portrait-open]');
    const close=$('[data-portrait-close]');
    if(!dialog||!opener||!close||typeof dialog.showModal!=='function')return;
    opener.addEventListener('click',()=>dialog.showModal());
    close.addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
    dialog.addEventListener('close',()=>opener.focus());
  }
  setupPortraitViewer();

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
