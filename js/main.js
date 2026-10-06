
(function(){
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
var RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
/* theme */
var root=document.documentElement;

$('#th').onclick=function(){var d=root.getAttribute('data-theme')||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');d=d==='dark'?'light':'dark';root.setAttribute('data-theme',d);setTimeout(getCol,0);try{localStorage.setItem('th',d)}catch(e){}};
/* progress */
var bar=$('#bar');
function prog(){var h=document.documentElement.scrollHeight-innerHeight;bar.style.transform='scaleX('+(h>0?scrollY/h:0)+')'}
/* detection overlay */
var det=$('#det'),lab=$('b',det),cur=null,locked=null;
function place(el){if(!el)return;var r=el.getBoundingClientRect(),p=6;det.style.top=(r.top-p)+'px';det.style.left=(r.left-p)+'px';det.style.width=(r.width+p*2)+'px';det.style.height=(r.height+p*2)+'px'}
function show(el){cur=el;lab.textContent=el.getAttribute('data-det');place(el);det.style.opacity=1}
function hide(){cur=null;det.style.opacity=0}
document.addEventListener('mouseover',function(e){var el=e.target.closest&&e.target.closest('[data-det]');if(el)show(el)});
document.addEventListener('mouseout',function(e){var el=e.target.closest&&e.target.closest('[data-det]');if(el&&!el.contains(e.relatedTarget)){hide();if(locked&&$('#hero').getBoundingClientRect().bottom>200)show(locked)}});
var tk=0;addEventListener('scroll',function(){if(tk)return;tk=requestAnimationFrame(function(){tk=0;prog();if(cur){if($('#hero').getBoundingClientRect().bottom<120&&cur===locked)hide();else place(cur)}})},{passive:true});
addEventListener('resize',function(){if(cur)place(cur)});
var nm=$('#nm');setTimeout(function(){locked=nm;if(!cur)show(nm)},RM?0:650);
/* counters */
function count(el){var n=+el.dataset.n,d=+el.dataset.d||0,p=el.dataset.p||'';if(RM){el.textContent=p+n.toFixed(d)+(n>=39?'':'');return}var s=performance.now();(function f(now){var k=Math.min((now-s)/1400,1),e=1-Math.pow(1-k,3);el.textContent=p+(n*e).toFixed(d);if(k<1)requestAnimationFrame(f)})(s)}
$$('h2,.sub').forEach(function(e){e.classList.add('rv')});
$$('.sk,.stack,.two').forEach(function(g){[].forEach.call(g.children,function(c,i){c.style.transitionDelay=i*60+'ms'})});
var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.15});
$$('.rv,#tl').forEach(function(e){io.observe(e)});
var io2=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){count(x.target);io2.unobserve(x.target)}})},{threshold:.6});
$$('[data-n]').forEach(function(e){io2.observe(e)});
/* tilt on hover */
if(!RM)$$('.tilt').forEach(function(m){m.addEventListener('pointermove',function(e){var r=m.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;m.style.transform='perspective(900px) rotateY('+x*7+'deg) rotateX('+-y*7+'deg) scale(1.015)'});m.addEventListener('pointerleave',function(){m.style.transform=''})});
/* hero canvas: neural mesh */
var cv=$('#cv'),cx=cv.getContext('2d'),P=[],W,H,mx=-999,my=-999,on=true,col='56,189,248';
function getCol(){col=getComputedStyle(root).getPropertyValue('--pc').trim()||col}
function size(){getCol();var r=cv.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);W=r.width;H=r.height;cv.width=W*d;cv.height=H*d;cx.setTransform(d,0,0,d,0,0);var n=Math.min(60,Math.floor(W*H/15000));P=[];for(var i=0;i<n;i++)P.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35})}
function tick(){if(!on){requestAnimationFrame(tick);return}
cx.clearRect(0,0,W,H);
for(var i=0;i<P.length;i++){var a=P[i];a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>W)a.vx*=-1;if(a.y<0||a.y>H)a.vy*=-1;
var dx=a.x-mx,dy=a.y-my,dm=dx*dx+dy*dy;if(dm<14000){a.x+=dx*.012;a.y+=dy*.012}
cx.fillStyle='rgba('+col+',.7)';cx.beginPath();cx.arc(a.x,a.y,1.8,0,7);cx.fill();
for(var j=i+1;j<P.length;j++){var b=P[j],ex=a.x-b.x,ey=a.y-b.y,dd=ex*ex+ey*ey;if(dd<15000){cx.strokeStyle='rgba('+col+','+(.28*(1-dd/15000))+')';cx.beginPath();cx.moveTo(a.x,a.y);cx.lineTo(b.x,b.y);cx.stroke()}}}
if(!RM)requestAnimationFrame(tick)}
size();addEventListener('resize',size);
$('#hero').addEventListener('pointermove',function(e){var r=cv.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top});
new IntersectionObserver(function(e){on=e[0].isIntersecting}).observe($('#hero'));
RM?(tick(),cx.clearRect(0,0,0,0)):tick();
/* contact: composes an email, no server needed */
$('#cf').onsubmit=function(e){e.preventDefault();var s=encodeURIComponent('Portfolio message from '+$('#cn').value),b=encodeURIComponent($('#cm').value+'\n\n— '+$('#cn').value+' ('+$('#ce').value+')');location.href='mailto:ajay.kodurupaka110125@gmail.com?subject='+s+'&body='+b};
/* marquee */
var T=['Java','Python','SQL','C','Data Structures','DBMS','OOP','OpenCV','YOLO','Flask','Streamlit','Git'];
$('#mt').innerHTML=T.concat(T).map(function(t){return'<span>'+t+'</span>'}).join('');
var pi=$('.pt img');
if(matchMedia('(pointer:fine)').matches&&!RM)$('#hero').addEventListener('pointermove',function(e){pi.style.transform='translate('+((e.clientX/innerWidth-.5)*-12)+'px,'+((e.clientY/innerHeight-.5)*-12)+'px)'});
/* active nav link */
var ls=$$('nav a.l'),so=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting)ls.forEach(function(a){a.classList.toggle('act',a.getAttribute('href')==='#'+x.target.id)})})},{rootMargin:'-45% 0px -50% 0px'});
$$('section[id]').forEach(function(e){so.observe(e)});
prog();
})();
