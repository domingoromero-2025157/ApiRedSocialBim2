import { IncomingMessage, ServerResponse } from 'node:http';
import { usuarioRouter } from './usuarioRouter.js';

export async function router(req: IncomingMessage, res: ServerResponse): Promise<void> {
  // Manejo de cabeceras CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Intenta resolver las rutas registradas
  const fueAtendido = await usuarioRouter(req, res);

  // Si ninguna ruta coincidió, devuelve 404
  if (!fueAtendido) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Ruta no encontrada' }));
  }
}