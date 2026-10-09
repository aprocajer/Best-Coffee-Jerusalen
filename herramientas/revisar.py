"""Revisa pendientes y enlaces rotos, y genera sitemap.xml y robots.txt. Uso: python3 herramientas/revisar.py"""
import re, os
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
pags = sorted(f for f in os.listdir(".") if f.endswith(".html"))
marcas = ["[completar]", "Pendiente", "TU_ID", "[ ]", "[Foto"]
prob = 0
for f in pags:
    t = open(f, encoding="utf-8").read()
    for m in marcas:
        n = t.count(m)
        if n: print(f"{f}: {n} x '{m}'"); prob += n
    for u in re.findall(r'(?:href|src)="([^"#?]+)"', t):
        if not u.startswith(("http", "mailto:", "tel:")) and not os.path.exists(u):
            print(f"{f}: enlace roto -> {u}"); prob += 1
D = "https://aprocajer.com/"
open("sitemap.xml", "w").write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "".join(f"<url><loc>{D}{'' if f=='index.html' else f}</loc></url>\n" for f in pags) + "</urlset>\n")
open("robots.txt", "w").write(f"User-agent: *\nAllow: /\nSitemap: {D}sitemap.xml\n")
print(f"\n{len(pags)} páginas. Pendientes/problemas: {prob}. sitemap.xml y robots.txt actualizados.")
