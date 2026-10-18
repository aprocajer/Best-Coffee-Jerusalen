fetch("data/cafes.json").then(r=>r.json()).then(C=>{
const box=document.getElementById("fichas"),dlg=document.getElementById("muestra"),f=document.getElementById("f-muestra"),es=document.getElementById("estado");
const el=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e};
C.forEach(c=>{const a=el("article","ficha");a.dataset.max=c.sca_max;a.dataset.org=c.org;
a.append(el("span","etiqueta",c.etiqueta),el("p","sca",c.sca+" SCA"),el("h2",null,c.variedad),(c.lema?el("p","lema",c.lema):""));
const dl=el("dl");c.datos.forEach(([k,v])=>dl.append(el("dt",null,k),el("dd",null,v)));
a.append(dl,el("p",null,c.descripcion),el("h3",null,"Notas de cata"));
const u=el("ul","notas");c.notas.forEach(n=>u.append(el("li",null,n)));a.append(u);
const ce=el("p","certs");c.certs.forEach(x=>ce.append(el("span",null,x)));a.append(ce);
const b=el("button","btn","Solicitar muestras");b.type="button";
b.onclick=()=>{f.cafe.value=c.variedad;document.getElementById("cafe-sel").textContent=c.variedad;es.textContent="";dlg.showModal()};
a.append(b);box.append(a)});
document.querySelectorAll(".filtros button").forEach(b=>b.onclick=()=>{
document.querySelectorAll(".filtros button").forEach(x=>x.setAttribute("aria-pressed",x===b));
box.querySelectorAll(".ficha").forEach(a=>{const k=b.dataset.f;a.hidden=(k==="sca"&&+a.dataset.max<88)||(k==="org"&&a.dataset.org!=="true")})});
f.addEventListener("submit",async e=>{e.preventDefault();let ok=false;
try{ok=(await fetch(f.action,{method:"POST",body:new FormData(f),headers:{Accept:"application/json"}})).ok}catch{}
es.textContent=ok?"Gracias por su interés. Nos pondremos en contacto con usted.":"No se pudo enviar. Escriba a gerencia@aprocajer.com.";
if(ok)f.reset();document.dispatchEvent(new Event("contenido"))});
document.getElementById("cerrar").onclick=()=>dlg.close();
document.dispatchEvent(new Event("contenido"));
}).catch(()=>{document.getElementById("fichas").textContent="En local, abra el sitio con: python3 herramientas/servidor.py"});
