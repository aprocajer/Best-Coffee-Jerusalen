/* Idiomas ES / EN / CS. Frases en data/i18n.json (clave = texto en español). Lo no traducido queda en español. */
(()=>{
const L=["es","en","cs"],q=new URLSearchParams(location.search).get("lang");let g="";try{g=localStorage.getItem("lang")||""}catch{}
let lang=L.includes(q)?q:(g||(navigator.language||"es").slice(0,2));if(!L.includes(lang))lang="es";
let D;const orig=new WeakMap(),titulo=document.title.replace(/ \| APROCAJER$/,"");
function aplicar(){
 if(!D)return;document.documentElement.lang=lang;
 const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
 while(n=w.nextNode()){
  if(!orig.has(n))orig.set(n,n.nodeValue);
  const o=orig.get(n),t=D[o.trim().replace(/\s+/g," ")];
  n.nodeValue=(lang!=="es"&&t&&t[lang])?o.match(/^\s*/)[0]+t[lang]+o.match(/\s*$/)[0]:o;
 }
 const t=D[titulo];document.title=((lang!=="es"&&t&&t[lang])?t[lang]:titulo)+" | APROCAJER";
 document.querySelectorAll(".idioma .cod").forEach(e=>e.textContent=lang.toUpperCase());document.querySelectorAll(".idioma [data-l]").forEach(b=>b.setAttribute("aria-current",b.dataset.l===lang));
}
document.addEventListener("contenido",aplicar);
document.querySelectorAll(".idioma [data-l]").forEach(b=>b.addEventListener("click",()=>{lang=b.dataset.l;try{localStorage.setItem("lang",lang)}catch{}aplicar()}));
fetch("data/i18n.json").then(r=>r.json()).then(d=>{D=d;aplicar()}).catch(()=>{});
})();
