// Convierte fotos a WebP (requiere cwebp). Uso: node herramientas/optimizar.js [origen] [destino] [ancho]
const { execFileSync } = require("child_process"), fs = require("fs"), path = require("path");
const [, , src = "img/originales", dst = "img/cafes", w = "1600"] = process.argv;
fs.mkdirSync(dst, { recursive: true });
for (const f of fs.readdirSync(src)) {
  if (!/\.(jpe?g|png)$/i.test(f)) continue;
  const n = path.parse(f).name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-");
  try { execFileSync("cwebp", ["-q", "80", "-resize", w, "0", path.join(src, f), "-o", path.join(dst, n + ".webp")], { stdio: "ignore" }); console.log("OK    ", f, "->", n + ".webp"); }
  catch { console.log("FALLÓ ", f, "(¿está instalado cwebp?)"); }
}
