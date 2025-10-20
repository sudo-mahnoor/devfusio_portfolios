/* ===== Theme (matte / light ink) ===== */
(function(){
  const root=document.documentElement, btn=document.getElementById('themeToggle');
  function set(t){ t==='dark'?root.classList.add('dark'):root.classList.remove('dark'); localStorage.setItem('theme',t); }
  set(localStorage.getItem('theme') || 'dark');
  btn.addEventListener('click',()=> set(root.classList.contains('dark')?'light':'dark'));
})();

/* ===== Mobile menu ===== */
(function(){
  const btn=document.getElementById('menuToggle'), nav=document.querySelector('.nav');
  btn?.addEventListener('click',()=> nav.style.display = (nav.style.display==='flex'?'':'flex'));
})();

/* ===== Canvas background: subtle particle grid ===== */
(function(){
  const c=document.getElementById('bg'), ctx=c.getContext('2d');
  let w,h,dpr=Math.max(1,window.devicePixelRatio||1); const nodes=[], MAX=80;
  function size(){ w=c.clientWidth=innerWidth; h=c.clientHeight=innerHeight; c.width=w*dpr; c.height=h*dpr; ctx.setTransform(dpr,0,0,dpr,0,0); }
  addEventListener('resize', size); size();
  const r=(a,b)=>Math.random()*(b-a)+a;
  for(let i=0;i<MAX;i++) nodes.push({x:r(0,w), y:r(0,h), vx:r(-.25,.25), vy:r(-.25,.25)});
  function step(){
    ctx.clearRect(0,0,w,h);
    const cs=getComputedStyle(document.documentElement), cyan=cs.getPropertyValue('--cyan'), vio=cs.getPropertyValue('--vio');
    for(let i=0;i<nodes.length;i++){
      const a=nodes[i]; a.x+=a.vx; a.y+=a.vy; if(a.x<0||a.x>w) a.vx*=-1; if(a.y<0||a.y>h) a.vy*=-1;
      for(let j=i+1;j<nodes.length;j++){
        const b=nodes[j], dx=a.x-b.x, dy=a.y-b.y, d=Math.hypot(dx,dy);
        if(d<130){ ctx.globalAlpha=1-(d/130); ctx.strokeStyle=i%2?cyan:vio; ctx.lineWidth=.8; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke(); }
      }
      ctx.globalAlpha=.9; ctx.fillStyle=i%2?cyan:vio; ctx.beginPath(); ctx.arc(a.x,a.y,1.6,0,Math.PI*2); ctx.fill();
    }
    requestAnimationFrame(step);
  }
  step();
})();

/* ===== Custom cursor follower ===== */
(function(){
  const dot=document.getElementById('cursor'); let x=innerWidth/2,y=innerHeight/2, tx=x,ty=y;
  addEventListener('mousemove',e=>{ tx=e.clientX; ty=e.clientY; });
  function loop(){ x+= (tx-x)*0.18; y+= (ty-y)*0.18; dot.style.transform=`translate(${x-8}px, ${y-8}px)`; requestAnimationFrame(loop); }
  loop();
})();

/* ===== GSAP Reveals ===== */
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray('.card, .work-card, .kpi, .hero-media, .hero-text').forEach(el=>{
  gsap.from(el,{opacity:0, y:18, duration:.7, ease:'power2.out', scrollTrigger:{trigger:el, start:'top 85%'}});
});

/* ===== Splide slider ===== */
new Splide('#workSplide',{type:'loop', perPage:3, gap:'16px', autoplay:true, interval:3600, breakpoints:{1100:{perPage:2},720:{perPage:1}}}).mount();

/* ===== KPI counters ===== */
(function(){
  const nums=document.querySelectorAll('.kpi .num');
  const io=new IntersectionObserver(es=>{
    es.forEach(e=>{
      if(e.isIntersecting){
        const el=e.target, target=+el.dataset.target; let n=0; const step=Math.max(1,Math.ceil(target/60));
        const t=setInterval(()=>{ n+=step; if(n>=target){n=target; clearInterval(t);} el.textContent=n; },20);
        io.unobserve(el);
      }
    });
  },{threshold:.6});
  nums.forEach(n=>io.observe(n));
})();

/* ===== 3D Tilt on cards & hero image ===== */
(function(){
  const els=document.querySelectorAll('.tilt');
  function tilt(e){
    const b=this.getBoundingClientRect(), cx=b.left+b.width/2, cy=b.top+b.height/2;
    const dx=(e.clientX-cx)/b.width, dy=(e.clientY-cy)/b.height;
    this.style.transform=`rotateX(${(-dy*6)}deg) rotateY(${dx*8}deg) translateZ(0)`;
  }
  function reset(){ this.style.transform='perspective(1000px)'; }
  els.forEach(el=>{
    el.style.transition='transform .15s ease';
    el.addEventListener('mousemove',tilt); el.addEventListener('mouseleave',reset);
  });
})();

/* ===== Magnetic buttons ===== */
(function(){
  const mags=document.querySelectorAll('.magnet');
  mags.forEach(btn=>{
    btn.addEventListener('mousemove',e=>{
      const r=btn.getBoundingClientRect(), x=e.clientX-r.left, y=e.clientY-r.top;
      btn.style.transform=`translate(${(x-r.width/2)*0.06}px, ${(y-r.height/2)*0.06}px)`;
    });
    btn.addEventListener('mouseleave',()=> btn.style.transform='translate(0,0)');
  });
})();

/* ===== Contact mailto demo ===== */
(function(){
  const f=document.getElementById('contactForm'), a=document.getElementById('formAlert');
  if(!f) return;
  f.addEventListener('submit',e=>{
    e.preventDefault();
    const name=document.getElementById('name').value.trim();
    const email=document.getElementById('email').value.trim();
    const msg=document.getElementById('msg').value.trim();
    const subject=encodeURIComponent(`[Portfolio] Inquiry from ${name}`);
    const body=encodeURIComponent(`${msg}\n\nReply to: ${email}`);
    window.location.href=`mailto:noumanimran309@gmail.com?subject=${subject}&body=${body}`;
    a.classList.remove('hidden');
  });
})();

/* ===== AI Dock (tabs) ===== */
(function(){
  const tabs=document.querySelectorAll('.ai-tab'),
        panels={qa:document.getElementById('ai-qa'), design:document.getElementById('ai-design')};
  tabs.forEach(t=>{
    t.addEventListener('click',()=>{
      tabs.forEach(x=>x.classList.remove('active')); t.classList.add('active');
      Object.values(panels).forEach(p=>p.classList.remove('open'));
      panels[t.dataset.tab].classList.add('open');
    });
  });
})();

/* ===== AI: About-Me Q&A ===== */
(function(){
  const kb=[
    {k:['who','name'], a:'I’m Nouman Imran, Graphic Designer focused on branding, digital and print.'},
    {k:['contact','phone','email','location'], a:'Phone: +92 334 0401123 · Email: noumanimran309@gmail.com · Model Town, Lahore.'},
    {k:['software','tools','adobe','premiere','after'], a:'Photoshop, Illustrator, Premiere, After Effects.'},
    {k:['skills','core'], a:'Branding · Digital Media · Print · Communication · Interpersonal · Leadership · Fast Learner · Problem Solving.'},
    {k:['education','numl','degree'], a:'Bachelors in Computer Science, NUML University (2023–present).'},
    {k:['experience','hex','kluster','rezam','brandedoc','deslence'], a:'Hex Business (2023–present), Kluster Creatives (2024–Jan 2025), Rezam Healthcare & Management (ongoing), Deslence / BrandeDoc (project work).'},
    {k:['behance','portfolio'], a:'Behance: behance.net/noumanimran1'}
  ];
  const form=document.getElementById('qaForm'), input=document.getElementById('qaInput'), body=document.getElementById('qaBody');
  function say(t,c='bot'){ const b=document.createElement('div'); b.className=`bubble ${c}`; b.textContent=t; body.appendChild(b); body.scrollTop=body.scrollHeight; }
  function find(q){ q=q.toLowerCase(); for(const i of kb){ if(i.k.some(k=>q.includes(k))) return i.a; } return 'Ask about skills, tools, experience, education, or contact details.'; }
  form.addEventListener('submit',e=>{ e.preventDefault(); const q=input.value.trim(); if(!q) return; say(q,'me'); say(find(q)); input.value=''; });
})();

/* ===== AI: Design Helper (palette + tagline) ===== */
(function(){
  const form=document.getElementById('designForm'), input=document.getElementById('designInput'), body=document.getElementById('designBody');
  const hash=s=>{let h=0; for(let i=0;i<s.length;i++) h=(h<<5)-h+s.charCodeAt(i)|0; return Math.abs(h);};
  const HSL=(h,s,l)=>`hsl(${h}, ${s}%, ${l}%)`;
  function palette(theme){ const b=hash(theme)%360; return [HSL(b,72,56), HSL((b+32)%360,70,50), HSL((b+196)%360,62,54), HSL((b+320)%360,68,42), HSL((b+120)%360,18,94)]; }
  function tagline(theme){ const v=['Shape','Craft','Build','Design','Spark','Elevate'], n=['identity','stories','impact','clarity','presence','memory']; const H=hash(theme); return `${v[H%v.length]} ${theme} ${n[(H>>2)%n.length]}`; }
  function out(theme){
    const wrap=document.createElement('div'); wrap.className='bubble bot';
    const row=document.createElement('div'); row.style.display='flex'; row.style.gap='8px'; row.style.marginBottom='8px';
    const cols=palette(theme); cols.forEach(c=>{ const sw=document.createElement('div'); sw.style.width='28px'; sw.style.height='20px'; sw.style.borderRadius='6px'; sw.style.border='1px solid rgba(255,255,255,.2)'; sw.style.background=c; row.appendChild(sw); });
    const pre=document.createElement('pre'); pre.textContent=`Palette: ${cols.join('  ')}\nTagline: ${tagline(theme)}`; pre.style.margin=0; pre.style.whiteSpace='pre-wrap';
    wrap.appendChild(row); wrap.appendChild(pre); return wrap;
  }
  const me=t=>{const b=document.createElement('div'); b.className='bubble me'; b.textContent=t; body.appendChild(b); body.scrollTop=body.scrollHeight;};
  const bot=el=>{body.appendChild(el); body.scrollTop=body.scrollHeight;};
  form.addEventListener('submit',e=>{ e.preventDefault(); const q=input.value.trim(); if(!q) return; me(q); bot(out(q)); input.value=''; });
})();

/* Year */
document.getElementById('year').textContent=new Date().getFullYear();
