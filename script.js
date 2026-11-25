var cats=[
{k:"diecast",n:"Die-cast Racing Cars",e:"🏎️",d:"Detailed metal models"},
{k:"miniature",n:"Miniature F1 Collections",e:"🚗",d:"Pocket-size collections"},
{k:"rc",n:"Remote-Controlled Racing Cars",e:"🎮",d:"Fast RC racers"},
{k:"tracks",n:"Racing Track & Playsets",e:"🏁",d:"Loops, jumps, and pit lanes"},
{k:"blocks",n:"Building Block Racing Sets",e:"🧱",d:"Build your own race team"},
{k:"helmets",n:"Racing Helmets & Accessories",e:"⛑️",d:"Replicas and gear"},
{k:"figures",n:"Driver Figures & Collectibles",e:"🧑‍🔧",d:"Drivers and pit crew"},
{k:"collectibles",n:"Premium Display Models",e:"🏆",d:"Show-piece collectibles"}];
var products=[
{id:1,img:"images/product-1.jpg",name:"Apex GP 1:43 Die-Cast",price:650,cat:"diecast",color:"#e10600",desc:"Metal body with rolling rubber tires.",more:"Scale 1:43. Opening engine cover and display base included.",tag:"Best seller"},
{id:2,img:"images/product-2.jpg",name:"Silver Arrow 1:24 Die-Cast",price:1450,cat:"diecast",color:"#c0c3cc",desc:"Large detailed model with steering wheels.",more:"Scale 1:24. Chrome-style finish and decal sheet."},
{id:3,img:"images/product-3.jpg",name:"Grid Legends 6-Car Pack",price:1890,cat:"miniature",color:"#1c6dd0",desc:"Six mini cars in team liveries.",more:"Six 1:64 cars, each in a different livery, in a collector box."},
{id:4,img:"images/product-4.jpg",name:"Pit Lane Mini Set",price:980,cat:"miniature",color:"#ffb400",desc:"Four pocket racers and a mini pit board.",more:"Four 1:64 cars with a mini pit board accessory."},
{id:5,img:"images/product-5.jpg",name:"Turbo RC Racer 2.4GHz",price:2890,cat:"rc",color:"#e10600",desc:"Fast RC car with a rechargeable battery.",more:"2.4GHz remote, USB charging, ages 8+. Runs about 20 minutes per charge.",tag:"New"},
{id:6,img:"images/product-6.jpg",name:"Drift Pro RC Car",price:3490,cat:"rc",color:"#222228",desc:"Drift tires and LED headlights.",more:"Drift tires, LED lights, and a 2-speed mode. Ages 10+."},
{id:7,img:"images/product-7.jpg",name:"Speedway Block Set (520 pcs)",price:2290,cat:"blocks",desc:"Build your own racing car and pit wall.",more:"520 compatible bricks, 2 buildable cars, and a build guide."},
{id:8,img:"images/product-8.jpg",name:"Brick Garage Playset",price:1590,cat:"blocks",desc:"Buildable garage with a mini car.",more:"340 bricks. Garage doors open and close. Ages 7+."},
{id:9,img:"images/product-9.jpg",name:"Circuit Master Track Set",price:2190,cat:"tracks",desc:"Flexible race track with a launcher.",more:"6 meters of track, a battery launcher, and 2 cars.",tag:"Popular"},
{id:10,img:"images/product-10.jpg",name:"Loop Rush Playset",price:1790,cat:"tracks",desc:"Double loop with a finish gate.",more:"Double loop, finish gate, and 1 car. Fits standard 1:64 cars."},
{id:11,img:"images/product-11.jpg",name:"Champion Driver Figure",price:450,cat:"figures",desc:"Posable driver figure with a trophy.",more:"10 cm figure with a removable helmet and trophy."},
{id:12,img:"images/product-12.jpg",name:"Pit Crew Figure Pack",price:590,cat:"figures",desc:"Three crew figures with tools.",more:"Three 8 cm figures with a tire, a jack, and a pit board."},
{id:13,img:"images/product-13.jpg",name:"Mini Helmet Replica: Red",price:790,cat:"helmets",color:"#e10600",desc:"1:2 scale helmet with a display stand.",more:"1:2 scale, glossy finish, and a clear visor. Display stand included."},
{id:14,img:"images/product-14.jpg",name:"Mini Helmet Replica: Midnight",price:790,cat:"helmets",color:"#2b2f77",desc:"Matte black and blue racing design.",more:"1:2 scale, matte finish, and a tinted visor."},
{id:15,img:"images/product-15.jpg",name:"Trophy Display Model 1:18",price:3990,cat:"collectibles",color:"#ffb400",desc:"Gold-finish car on a podium base.",more:"Numbered collector piece with an acrylic cover.",tag:"Limited"},
{id:16,img:"images/product-16.jpg",name:"Podium Display Case Set",price:2490,cat:"collectibles",color:"#c0c3cc",desc:"Showcase case with three podium steps.",more:"Acrylic case that fits six 1:43 cars. Wall-mountable."}];
var cart=[],cat="all",query="",sortBy="d";
var pages=["home","shop","categories","game","author","cart"];
var $=function(id){return document.getElementById(id)};
var money=function(n){return "₱"+n.toFixed(2)};
var byId=function(id){return products.find(function(p){return p.id===id})};
var catOf=function(k){return cats.find(function(c){return c.k===k})};

function carSvg(c){return '<svg viewBox="0 0 120 48" aria-hidden="true"><rect x="3" y="8" width="16" height="4" fill="'+c+'"/><rect x="6" y="10" width="4" height="18" fill="#222"/><path d="M10 28L38 22L56 14L74 16L96 26L112 28V33H10Z" fill="'+c+'"/><path d="M56 14L74 16L70 22H52Z" fill="#111" opacity=".55"/><circle cx="62" cy="13" r="5" fill="#111"/><rect x="100" y="34" width="18" height="3" fill="#333"/><circle cx="26" cy="34" r="9" fill="#111"/><circle cx="26" cy="34" r="4" fill="#8a8c96"/><circle cx="92" cy="35" r="8" fill="#111"/><circle cx="92" cy="35" r="3.5" fill="#8a8c96"/></svg>'}
function helmetSvg(c){return '<svg viewBox="0 0 60 60" aria-hidden="true"><path d="M8 40A22 22 0 0 1 52 34V46H8Z" fill="'+c+'"/><path d="M28 24H54V35H26Z" fill="#111"/><rect x="6" y="46" width="48" height="6" rx="3" fill="#333"/></svg>'}
function art(p){
  var fb=p.cat==="helmets"?helmetSvg(p.color||"#E10600"):carSvg(p.color||"#E10600");
  return fb+'<img class="photo" src="'+p.img+'" alt="'+p.name+'" loading="lazy" onerror="this.remove()">';
}
function card(p,label){
  var t=label||p.tag;
  return '<article class="card"><div class="tile">'+(t?'<span class="tag">'+t+'</span>':'')+art(p)+'</div><div class="info"><span class="cn">'+catOf(p.cat).n+'</span><h3>'+p.name+'</h3><p class="d">'+p.desc+'</p><span class="price">'+money(p.price)+'</span><div class="row"><button class="btn ghost sm" data-info="'+p.id+'">Details</button><button class="btn sm" data-add="'+p.id+'">Add</button></div></div></article>';
}
function catCard(c){
  var n=products.filter(function(p){return p.cat===c.k}).length;
  return '<button class="cat" data-go="'+c.k+'"><div class="e">'+c.e+'</div><h3>'+c.n+'</h3><small>'+c.d+' · '+n+' items</small></button>';
}
function showShop(){
  var list=products.filter(function(p){return (cat==="all"||p.cat===cat)&&(p.name+" "+p.desc).toLowerCase().indexOf(query)!==-1});
  if(sortBy==="l")list.sort(function(a,b){return a.price-b.price});
  if(sortBy==="h")list.sort(function(a,b){return b.price-a.price});
  if(sortBy==="a")list.sort(function(a,b){return a.name.localeCompare(b.name)});
  $("grid").innerHTML=list.map(function(p){return card(p)}).join("")||'<p class="none">No toys found. Try another search.</p>';
  $("count-note").textContent="Showing "+list.length+" of "+products.length+" products";
  document.querySelectorAll("#filters .filter").forEach(function(b){b.classList.toggle("active",b.getAttribute("data-cat")===cat)});
}
function showCart(){
  var total=0,count=0;
  $("items").innerHTML=cart.map(function(it){
    var p=byId(it.id);total+=p.price*it.qty;count+=it.qty;
    return '<li><b>'+p.name+'</b><span>'+money(p.price*it.qty)+'</span><div class="ctrl"><button data-act="minus" data-id="'+p.id+'" aria-label="Decrease">−</button><span>'+it.qty+'</span><button data-act="plus" data-id="'+p.id+'" aria-label="Increase">+</button><button class="rm" data-act="rm" data-id="'+p.id+'">Remove</button></div></li>'}).join("");
  $("count").textContent=count;
  $("total").textContent=money(total);
  $("empty").style.display=cart.length?"none":"block";
  $("checkout-form").hidden=!cart.length;
  $("k-empty").hidden=cart.length>0;
  try{localStorage.setItem("pp-cart",JSON.stringify(cart))}catch(e){}
}
var tt;
function toast(t){var el=$("toast");el.textContent=t;el.classList.add("show");clearTimeout(tt);tt=setTimeout(function(){el.classList.remove("show")},1400)}
function add(id){var it=cart.find(function(i){return i.id===id});if(it)it.qty++;else cart.push({id:id,qty:1});$("done").textContent=""}
function goShop(k){cat=k;showShop();location.hash="shop"}

document.addEventListener("click",function(e){
  var t=e.target,a=t.getAttribute("data-add"),inf=t.getAttribute("data-info"),g=t.closest("[data-go]"),act=t.getAttribute("data-act"),c=t.getAttribute("data-cat");
  if(a){add(Number(a));showCart();toast("Added to cart ✔");if($("dlg").open)$("dlg").close()}
  if(inf){var p=byId(Number(inf));
    $("dlg-body").innerHTML='<div class="tile">'+art(p)+'</div><span class="cn" style="color:var(--muted);font-weight:700;text-transform:uppercase;font-size:.8rem">'+catOf(p.cat).n+'</span><h2 style="font-size:1.8rem">'+p.name+'</h2><p>'+p.desc+'</p><p style="color:var(--muted)">'+p.more+'</p><p class="price">'+money(p.price)+'</p><div class="row"><button class="btn ghost" data-close="1">Close</button><button class="btn" data-add="'+p.id+'">Add to cart</button></div>';
    $("dlg").showModal()}
  if(t.getAttribute("data-close")||t===$("dlg"))$("dlg").close();
  if(g)goShop(g.getAttribute("data-go"));
  if(c!==null&&t.classList.contains("filter")){cat=c;showShop()}
  if(act){var id=Number(t.getAttribute("data-id")),it=cart.find(function(i){return i.id===id});
    if(act==="plus")it.qty++;if(act==="minus")it.qty--;
    if(act==="rm"||it.qty<=0)cart=cart.filter(function(i){return i.id!==id});showCart()}
});
$("search").addEventListener("input",function(e){query=e.target.value.trim().toLowerCase();showShop()});
$("sort").addEventListener("change",function(e){sortBy=e.target.value;showShop()});
$("clear").addEventListener("click",function(){cart=[];showCart()});
$("menu-btn").addEventListener("click",function(){$("nav").classList.toggle("open")});

$("checkout-form").addEventListener("submit",function(e){
  e.preventDefault();
  var n=$("k-name").value.trim(),ad=$("k-addr").value.trim(),st=$("k-status");
  if(!n||!ad){st.textContent="Please enter your name and delivery address.";return}
  st.textContent="";
  var total=0;cart.forEach(function(i){total+=byId(i.id).price*i.qty});
  cart=[];showCart();e.target.reset();
  $("done").textContent="🏁 Order JG-"+Math.floor(1000+Math.random()*9000)+" confirmed! Thanks, "+n+". Your "+money(total)+" order is on its way (demo checkout).";
});

/* Racing game */
var G={state:"idle",n:0,need:28,t0:0,timer:null};
var best=null;try{best=parseFloat(localStorage.getItem("pp-best"))||null}catch(e){}
function showBest(){$("best").textContent=best?best.toFixed(2)+" s":"–"}
function setCar(){var p=G.n/G.need;$("racer").style.left="calc((100% - 84px) * "+p+")";$("prog").style.width=(p*100)+"%";$("pct").textContent=Math.round(p*100)+"%"}
function tick(){$("time").textContent=((performance.now()-G.t0)/1000).toFixed(2)+" s"}
function startRace(){
  if(G.state==="count"||G.state==="race")return;
  G.n=0;setCar();$("time").textContent="0.00 s";$("result").textContent="";
  $("go").disabled=true;$("start").disabled=true;G.state="count";
  var n=3;$("countdown").textContent=n;
  var iv=setInterval(function(){
    n--;
    if(n>0){$("countdown").textContent=n}
    else if(n===0){$("countdown").textContent="GO!";G.state="race";G.t0=performance.now();$("go").disabled=false;$("go").focus();G.timer=setInterval(tick,50)}
    else{clearInterval(iv);$("countdown").textContent=""}
  },800);
}
function finish(){
  clearInterval(G.timer);G.state="done";
  var t=(performance.now()-G.t0)/1000;
  $("time").textContent=t.toFixed(2)+" s";
  $("go").disabled=true;$("start").disabled=false;$("start").textContent="Race again";
  var rec=!best||t<best;
  if(rec){best=t;try{localStorage.setItem("pp-best",t)}catch(e){}}
  showBest();
  $("result").textContent="🏆 You win! Final time: "+t.toFixed(2)+" s"+(rec?" · New best lap!":"");
}
$("go").addEventListener("click",function(){if(G.state!=="race")return;G.n++;setCar();if(G.n>=G.need)finish()});
$("start").addEventListener("click",startRace);

/* Router, theme, cursor */
function route(){
  var h=location.hash.slice(1);if(pages.indexOf(h)<0)h="home";
  pages.forEach(function(p){$("page-"+p).hidden=(p!==h)});
  document.querySelectorAll("nav a").forEach(function(a){a.classList.toggle("active",a.getAttribute("data-page")===h)});
  $("nav").classList.remove("open");window.scrollTo(0,0);
}
window.addEventListener("hashchange",route);
function setTheme(m){document.documentElement.setAttribute("data-theme",m);$("theme").textContent=m==="dark"?"☀️":"🌙";$("theme").setAttribute("aria-label",m==="dark"?"Switch to light mode":"Switch to dark mode");try{localStorage.setItem("pp-theme",m)}catch(e){}}
$("theme").addEventListener("click",function(){setTheme(document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark")});

if(window.matchMedia("(hover:hover) and (pointer:fine)").matches&&!window.matchMedia("(prefers-reduced-motion:reduce)").matches){
  document.body.classList.add("has-cursor");
  var ring=document.createElement("div");ring.className="cur ring";document.body.appendChild(ring);
  var trail=[],mx=-100,my=-100;
  for(var i=0;i<6;i++){var d=document.createElement("div"),s=10-i*1.4;d.className="cur tr";d.style.cssText="width:"+s+"px;height:"+s+"px;margin:-"+s/2+"px 0 0 -"+s/2+"px;opacity:"+(0.65-i*0.1);document.body.appendChild(d);trail.push({el:d,x:-100,y:-100})}
  document.addEventListener("mousemove",function(e){mx=e.clientX;my=e.clientY});
  document.addEventListener("mouseover",function(e){ring.classList.toggle("hot",!!e.target.closest("a,button,.card,.cat,select,input,textarea"))});
  (function loop(){
    ring.style.transform="translate3d("+mx+"px,"+my+"px,0)";
    var px=mx,py=my;
    trail.forEach(function(t){t.x+=(px-t.x)*0.35;t.y+=(py-t.y)*0.35;t.el.style.transform="translate3d("+t.x+"px,"+t.y+"px,0)";px=t.x;py=t.y});
    requestAnimationFrame(loop);
  })();
}

/* Start */
var th=null;try{th=localStorage.getItem("pp-theme");
  cart=JSON.parse(localStorage.getItem("pp-cart")||"[]").filter(function(i){return byId(i.id)&&i.qty>0})}catch(e){}
setTheme(th||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"));
$("filters").innerHTML='<button class="filter active" data-cat="all">All</button>'+cats.map(function(c){return '<button class="filter" data-cat="'+c.k+'">'+c.n+'</button>'}).join("");
$("home-cats").innerHTML=cats.map(catCard).join("");
$("cat-list").innerHTML=cats.map(catCard).join("");
$("featured").innerHTML=[1,5,9,15].map(function(id,i){return card(byId(id),"P"+(i+1))}).join("");
$("racer").innerHTML=carSvg("#E10600");
$("herofall").innerHTML=carSvg("#E10600");
$("minicar").innerHTML=carSvg("#E10600");
$("year").textContent=new Date().getFullYear();
showShop();showCart();showBest();setCar();route();
