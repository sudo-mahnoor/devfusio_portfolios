/* script.js
   - Subtle network-line particle background (no heavy visuals)
   - AOS + GSAP scroll in
   - Minimal Swiper usage removed (not required here)
   - Collapsed AI assistant demo (manual open)
   - Contact form demo handler
*/

document.addEventListener('DOMContentLoaded', () => {
  // fill year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------
     Canvas network lines (subtle)
     - lightweight; performance conscious
     --------------------------- */
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const nodes = [];
  const NODE_COUNT = Math.max(6, Math.floor((width * height) / 200000));

  function rand(min, max) { return Math.random() * (max - min) + min; }

  class Node {
    constructor() {
      this.x = rand(0, width);
      this.y = rand(0, height);
      this.vx = rand(-0.15, 0.15);
      this.vy = rand(-0.12, 0.12);
      this.r = rand(1.5, 3.5);
    }
    move() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }
    draw() {
      ctx.beginPath();
      ctx.fillStyle = 'rgba(11,26,43,0.06)';
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initNodes() {
    nodes.length = 0;
    for (let i = 0; i < NODE_COUNT; i++) nodes.push(new Node());
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initNodes();
  }
  window.addEventListener('resize', resize);
  initNodes();

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // draw nodes
    nodes.forEach(n => {
      n.move();
      n.draw();
    });

    // draw lines between close nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(11,26,43,${(0.12 * (1 - dist / 140)).toFixed(3)})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }
  animate();

  /* ---------------------------
     AOS and GSAP scroll-in
     --------------------------- */
  if (window.AOS) AOS.init({ duration: 700, once: true, easing: 'ease-out' });
  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.hero-left h1', { y: 12, opacity: 0, duration: 0.9, ease: 'power3.out' });
    gsap.from('.summary', { y: 10, opacity: 0, duration: 0.9, delay: 0.12 });

    gsap.utils.toArray('.card, .project, .exp').forEach((el, i) => {
      gsap.from(el, {
        y: 20, opacity: 0, duration: 0.75, delay: i * 0.05,
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
      });
    });
  }

  /* ---------------------------
     AI widget (collapsed by default)
     --------------------------- */
  const aiToggle = document.getElementById('ai-toggle');
  const aiPanel = document.getElementById('ai-panel');
  const aiClose = document.getElementById('ai-close');
  const aiSend = document.getElementById('ai-send');
  const aiClear = document.getElementById('ai-clear');
  const aiPrompt = document.getElementById('ai-prompt');
  const aiResponse = document.getElementById('ai-response');

  function openAI() {
    if (!aiPanel) return;
    aiPanel.style.display = 'block';
    aiPanel.setAttribute('aria-hidden', 'false');
  }
  function closeAI() {
    if (!aiPanel) return;
    aiPanel.style.display = 'none';
    aiPanel.setAttribute('aria-hidden', 'true');
  }

  aiToggle && aiToggle.addEventListener('click', openAI);
  aiClose && aiClose.addEventListener('click', closeAI);

  aiSend && aiSend.addEventListener('click', () => {
    const q = aiPrompt.value.trim();
    if (!q) { aiResponse.textContent = 'Please type a question (demo).'; return; }
    // demo canned response strictly informative and based on resume
    if (/summary|summar/i.test(q)) {
      aiResponse.innerHTML = '<strong>Summary:</strong> Senior Network Engineer (8+ yrs) — Cisco FTD/FMC, WLC 9800 HA, FortiGate SD-WAN, multi-site L2/L3 design, AWS Associate.';
    } else {
      aiResponse.textContent = 'Demo: to enable full AI responses, connect this widget to a secure server-side AI endpoint.';
    }
  });

  aiClear && aiClear.addEventListener('click', () => {
    if (aiPrompt) aiPrompt.value = '';
    if (aiResponse) aiResponse.textContent = '';
  });

  /* ---------------------------
     Contact form (demo)
     --------------------------- */
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (status) status.textContent = 'Sending...';
      setTimeout(() => {
        if (status) status.textContent = 'Message sent (demo). Replace with your form endpoint.';
        form.reset();
      }, 900);
    });
  }

});
