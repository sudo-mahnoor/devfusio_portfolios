/* THEME TOGGLE */
(function(){
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');

  function setTheme(theme){
    if(theme === 'light'){
      root.classList.add('light');
      icon.classList.remove('bi-moon-stars'); icon.classList.add('bi-brightness-high');
    }else{
      root.classList.remove('light');
      icon.classList.remove('bi-brightness-high'); icon.classList.add('bi-moon-stars');
    }
    localStorage.setItem('theme', theme);
  }

  const saved = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  setTheme(saved);
  btn.addEventListener('click', ()=> setTheme(root.classList.contains('light') ? 'dark' : 'light'));
})();

/* SMOOTH SCROLL */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href').slice(1), el = document.getElementById(id);
    if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
  });
});

/* SWIPER SETUP */
const expSwiper = new Swiper('.exp-swiper',{
  slidesPerView:1, spaceBetween:16, loop:true,
  pagination:{el:'.exp-swiper .swiper-pagination', clickable:true},
  navigation:{nextEl:'.exp-swiper .swiper-button-next', prevEl:'.exp-swiper .swiper-button-prev'},
  breakpoints:{768:{slidesPerView:2},1200:{slidesPerView:3}}
});
const casesSwiper = new Swiper('.cases-swiper',{
  slidesPerView:1.05, spaceBetween:16, centeredSlides:true,
  pagination:{el:'.cases-swiper .swiper-pagination', clickable:true},
  breakpoints:{768:{slidesPerView:2},1200:{slidesPerView:3}}
});
const testiSwiper = new Swiper('.testi-swiper',{
  slidesPerView:1, loop:true, autoplay:{delay:4500},
  pagination:{el:'.testi-swiper .swiper-pagination', clickable:true}
});

/* CONTACT FORM (mailto demo) */
(function(){
  const form = document.getElementById('contactForm');
  const alertEl = document.getElementById('formAlert');
  const emailTo = 'rehanmuhammad3094@gmail.com';
  if(!form) return;
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const topic = document.getElementById('topic').value;
    const msg = document.getElementById('msg').value.trim();
    const subject = encodeURIComponent(`[Portfolio] ${topic} — ${name}`);
    const body = encodeURIComponent(`Hi Rehan,%0D%0A%0D%0A${msg}%0D%0A%0D%0AReply to: ${email}`);
    window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
    alertEl.classList.remove('d-none');
  });
})();

/* YEAR */
document.getElementById('year').textContent = new Date().getFullYear();

/* PARTICLE NETWORK BACKGROUND */
(function(){
  const canvas = document.getElementById('particleCanvas'); const ctx = canvas.getContext('2d');
  let dpr = Math.max(1, window.devicePixelRatio || 1), width, height;
  const nodes = []; const MAX = 90;
  function resize(){
    width = canvas.clientWidth; height = canvas.clientHeight;
    canvas.width = width * dpr; canvas.height = height * dpr;
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  window.addEventListener('resize', resize); resize();
  function r(min,max){ return Math.random()*(max-min)+min; }
  for(let i=0;i<MAX;i++){ nodes.push({x:r(0,width), y:r(0,height), vx:r(-0.4,0.4), vy:r(-0.4,0.4)}); }
  function step(){
    ctx.clearRect(0,0,width,height);
    const style = getComputedStyle(document.documentElement);
    const linkColor = style.getPropertyValue('--accent'); const dot = style.getPropertyValue('--primary');
    for(let i=0;i<nodes.length;i++){
      const a = nodes[i]; a.x+=a.vx; a.y+=a.vy;
      if(a.x<0||a.x>width) a.vx*=-1; if(a.y<0||a.y>height) a.vy*=-1;
      for(let j=i+1;j<nodes.length;j++){
        const b = nodes[j], dx=a.x-b.x, dy=a.y-b.y, dist=Math.hypot(dx,dy);
        if(dist<140){
          ctx.globalAlpha = 1-(dist/140); ctx.strokeStyle = linkColor; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
        }
      }
      ctx.globalAlpha = .9; ctx.fillStyle = dot; ctx.beginPath(); ctx.arc(a.x,a.y,2.2,0,Math.PI*2); ctx.fill();
    }
    requestAnimationFrame(step);
  }
  step();
})();

/* PARALLAX FLOATERS */
(function(){
  const els = document.querySelectorAll('.parallax');
  window.addEventListener('mousemove', (e)=>{
    const {innerWidth:w, innerHeight:h} = window;
    const x = (e.clientX - w/2)/w, y = (e.clientY - h/2)/h;
    els.forEach((el,i)=>{
      const m = (i+1)*8; el.style.transform = `translate(${x*m}px, ${y*m}px)`;
    });
  });
})();

/* KPI COUNTERS */
(function(){
  const nums = document.querySelectorAll('.kpi .num');
  const io = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const el = entry.target; const target = +el.dataset.target; let n=0;
        const step = Math.ceil(target/60);
        const t = setInterval(()=>{ n+=step; if(n>=target){n=target; clearInterval(t);} el.textContent = n; }, 24);
        io.unobserve(el);
      }
    });
  }, {threshold:.5});
  nums.forEach(n=>io.observe(n));
})();

/* INTERSECTION REVEAL */
(function(){
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      if(en.isIntersecting){ en.target.classList.add('show'); io.unobserve(en.target); }
    });
  }, {threshold:.2});
  els.forEach(el=>io.observe(el));
})();

/* AI ASSISTANT (local knowledge, no network) */
(function(){
  const fab = document.getElementById('aiFab'), panel = document.getElementById('aiPanel');
  const closeBtn = document.getElementById('aiClose'), form = document.getElementById('aiForm');
  const input = document.getElementById('aiInput'), body = document.getElementById('aiBody');

  const kb = [
    {k:['name','who'], a:'I’m Rehan Muhammad, Email Marketing Professional with a strong focus on Business Development.'},
    {k:['experience','axiom','world'], a:'Business Development Executive at Axiom World (Mar 2024–Apr 2025) — staff augmentation outreach, lead gen, and client relationships.'},
    {k:['amazon','bamboo','crm'], a:'Amazon Bamboo (May–Oct 2024): automated follow-ups in Service Auto Pilot, improved data accuracy & engagement.'},
    {k:['mavericks','staff','augmentation'], a:'Mavericks United (Mar 2023–Feb 2024): email campaigns for staff augmentation, coordination between clients and developers.'},
    {k:['skills','stack','tools'], a:'Tools: MailerLite, Instantly, SalesHandy, Apollo.io, LinkedIn Sales Navigator, Hunter, GetProspect, ContactOut, Uplead, Lusha, Odoo, Zoho, Outlook, Google Workspace; plus Python, Octoparse, Data Miner.'},
    {k:['education','degree','gpa'], a:'BS Computer Science — Superior University, Lahore. GPA 2.78.'},
    {k:['certificate','certifications','semrush','google','coursera','e-rozgar'], a:'Certs: Semrush SEO (Oct 2024, 473169), Google Digital Garage (BUA P23 8XU), E-Rozgar E-Commerce (Jan 2023, 2275992), Coursera Programming for Everybody (Dec 2023, M5ENEAPRHDUY).'},
    {k:['contact','email','phone','location'], a:'Email: rehanmuhammad3094@gmail.com — Phone: +92 302 0148663 — Location: Lahore, Pakistan.'},
    {k:['project','rays','finder','chrome','maps'], a:'Project: Rays Finder — Chrome extension scraping Google Maps for lead data (Mar–Nov 2021).'}
  ];

  function reply(text, cls='ai-bot'){
    const d = document.createElement('div'); d.className = 'ai-msg '+cls; d.textContent = text; body.appendChild(d);
    body.scrollTop = body.scrollHeight;
  }

  function findAnswer(q){
    const s = q.toLowerCase();
    for(const item of kb){
      if(item.k.some(k=>s.includes(k))) return item.a;
    }
    return "Here’s what I can help with: ask about experience, tools/stack, certificates, education, projects, or contact.";
  }

  fab.addEventListener('click', ()=> panel.classList.toggle('open'));
  closeBtn.addEventListener('click', ()=> panel.classList.remove('open'));
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const q = input.value.trim(); if(!q) return;
    reply(q,'ai-user'); reply(findAnswer(q));
    input.value = '';
  });
})();
