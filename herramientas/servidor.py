"""Servidor local sin dependencias. Uso: python3 herramientas/servidor.py [puerto]"""
import http.server, socketserver, webbrowser, os, sys
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
P = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store"); super().end_headers()
socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("127.0.0.1", P), H) as s:
    url = f"http://127.0.0.1:{P}"
    print(f"Sitio en {url}  (Ctrl+C para salir)"); webbrowser.open(url); s.serve_forever()
