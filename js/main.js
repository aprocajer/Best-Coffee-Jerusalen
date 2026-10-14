const PAGINAS=[["index.html","Inicio"],["sobre-nosotros.html","Sobre nosotros"],["nuestros-cafes.html","Nuestros cafés"],["calidad-sostenibilidad.html","Calidad y sostenibilidad"],["servicios.html","Servicios"],["comercializacion.html","Comercialización"]];
const actual=location.pathname.split("/").pop()||"index.html";
const li=PAGINAS.map(([u,t])=>`<li><a href="${u}"${u===actual?' aria-current="page"':''}>${t}</a></li>`).join("");
document.getElementById("cabecera").innerHTML=`<div class="wrap bar"><a class="marca" href="index.html" aria-label="APROCAJER, inicio"><img class="logo-full" src="img/logo/logo-header.webp" alt="" width="93" height="84"><span class="marca-mov"><img src="img/logo/icono.webp" alt="" width="47" height="36">APROCAJER</span></a><button id="menu" aria-expanded="false" aria-controls="nav">Menú</button><nav id="nav"><ul>${li}<li><a class="btn" href="contacto.html">Solicita muestras</a></li></ul></nav></div>`;
const b=document.getElementById("menu"),n=document.getElementById("nav");
b.addEventListener("click",()=>{const o=n.classList.toggle("abierto");b.setAttribute("aria-expanded",o)});
/* Contadores animados */
document.querySelectorAll("[data-n]").forEach(e=>{const m=+e.dataset.n,s=e.dataset.suf||"";new IntersectionObserver((x,o)=>{if(!x[0].isIntersecting)return;o.disconnect();const t0=performance.now();(function f(t){const k=Math.min((t-t0)/1200,1);e.textContent=Math.round(m*k)+s;if(k<1)requestAnimationFrame(f)})(t0)}).observe(e)});
/* Aparición suave de secciones */
const io=new IntersectionObserver(a=>a.forEach(x=>{if(x.isIntersecting){x.target.classList.add("ver");io.unobserve(x.target)}}),{threshold:.08});
document.querySelectorAll("section").forEach(s=>{s.classList.add("rev");io.observe(s)});
/* Buscador de trazabilidad (data/lotes.json). También acepta ?lote=APRO-0001 para códigos QR */
const fb=document.getElementById("buscar");
if(fb){const R=document.getElementById("resultado");
fetch("data/lotes.json").then(r=>r.json()).then(L=>{
const add=(k,v)=>{const dt=document.createElement("dt"),dd=document.createElement("dd");dt.textContent=k;dd.textContent=v;R.append(dt,dd)};
const mostrar=c=>{c=c.trim().toUpperCase();R.replaceChildren();const l=L.find(x=>x.codigo===c);
if(!l){add("Resultado","No encontramos ese código. Revise e intente de nuevo.");return}
[["Lote",l.codigo],["Productor",l.productor],["Municipio",l.municipio],["Variedad",l.variedad],["Altitud",l.altitud],["Proceso",l.proceso],["Cosecha",l.cosecha],["Puntaje de taza",l.taza]].forEach(([k,v])=>add(k,v))};
fb.addEventListener("submit",e=>{e.preventDefault();mostrar(document.getElementById("codigo").value)});
const q=new URLSearchParams(location.search).get("lote");if(q){document.getElementById("codigo").value=q;mostrar(q)}
}).catch(()=>{R.textContent="No se pudieron cargar los datos. En local, abra el sitio con: python3 herramientas/servidor.py"})}

/* Encabezado compacto al bajar */
const hd=document.getElementById("cabecera");const sc=()=>hd.classList.toggle("compacto",scrollY>40);addEventListener("scroll",sc,{passive:true});sc();
