// Animated AI-network background
const canvas = document.getElementById('ai-bg');
const ctx = canvas.getContext('2d');
let W, H, nodes=[];

function resize(){
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function initNodes(){
  const count = Math.min(120, Math.floor(W*H/15000));
  nodes = [...Array(count)].map(()=>({
    x: Math.random()*W,
    y: Math.random()*H,
    vx:(Math.random()-0.5)*0.6,
    vy:(Math.random()-0.5)*0.6
  }));
}
initNodes();

function step(){
  ctx.clearRect(0,0,W,H);
  // particles
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  nodes.forEach(n=>{
    n.x+=n.vx; n.y+=n.vy;
    if(n.x<0||n.x>W) n.vx*=-1;
    if(n.y<0||n.y>H) n.vy*=-1;
    ctx.beginPath();
    ctx.arc(n.x,n.y,1.2,0,Math.PI*2);
    ctx.fill();
  });
  // connections
  for(let i=0;i<nodes.length;i++){
    for(let j=i+1;j<nodes.length;j++){
      const a=nodes[i], b=nodes[j];
      const dx=a.x-b.x, dy=a.y-b.y;
      const d=Math.hypot(dx,dy);
      if(d<120){
        const alpha = 1 - d/120;
        const grad = ctx.createLinearGradient(a.x,a.y,b.x,b.y);
        grad.addColorStop(0,'rgba(255,79,216,'+alpha*0.35+')');
        grad.addColorStop(1,'rgba(107,231,255,'+alpha*0.35+')');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(a.x,a.y);
        ctx.lineTo(b.x,b.y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(step);
}
requestAnimationFrame(step);

// KPI counter
document.querySelectorAll('[data-count]').forEach(el=>{
  const target = parseInt(el.dataset.count,10);
  let n=0; const inc = Math.max(1, Math.floor(target/120));
  const t = setInterval(()=>{
    n += inc;
    if(n>=target){ n=target; clearInterval(t); }
    el.textContent = n.toLocaleString();
  }, 15);
});

// AI pitch widget
const widget = document.getElementById('ai-widget');
const toggle = document.getElementById('ai-toggle');
const closeBtn = document.getElementById('ai-close');
toggle.addEventListener('click', ()=> widget.style.display = widget.style.display==='none'?'block':'none');
closeBtn.addEventListener('click', ()=> widget.style.display='none');

const form = document.getElementById('ai-form');
const input = document.getElementById('ai-input');
const stream = document.getElementById('ai-stream');

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const text = input.value.trim();
  if(!text) return;
  addBubble(text, 'me');
  input.value='';
  simulateAI(text);
});
function addBubble(text, who='ai'){
  const div=document.createElement('div');
  div.className='bubble '+who;
  div.textContent = text;
  stream.appendChild(div);
  stream.scrollTop = stream.scrollHeight;
}
function simulateAI(prompt){
  const msg = "Pitch crafted: Hi! I'm Sidrah from Aetos Technologies. We help automate operations with Odoo ERP, including Sage integration, auto-invoicing and SMS/payment gateways. Based on your "+prompt+" we can deliver a tailored demo this week. Shall we book a 20-minute call?";
  let i=0; const div=document.createElement('div');
  div.className='bubble ai'; div.textContent='';
  stream.appendChild(div);
  const t = setInterval(()=>{
    div.textContent += msg[i++];
    if(i>=msg.length) clearInterval(t);
    stream.scrollTop = stream.scrollHeight;
  }, 12);
}
