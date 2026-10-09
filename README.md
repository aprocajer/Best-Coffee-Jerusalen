# APROCAJER - sitio web
Sitio estático (HTML, CSS, JS) listo para Cloudflare Pages.

- Probar en local: `python3 herramientas/servidor.py`
- Revisar pendientes y generar sitemap: `python3 herramientas/revisar.py`
- Convertir fotos: ponga originales en `img/originales` y ejecute `node herramientas/optimizar.js`
- Lotes de trazabilidad: edite `data/lotes.json`. Enlace para QR: `https://aprocajer.com/calidad-sostenibilidad.html?lote=APRO-0001`
- Publicar: suba la carpeta completa a Cloudflare Pages. No toque los registros DNS del correo.
