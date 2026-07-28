import { IncomingMessage, ServerResponse } from 'node:http';
import { 
  obtenerEventos, 
  obtenerEventoPorId, 
  crearEvento, 
  actualizarEvento, 
  eliminarEvento 
} from '../controller/evento.js';

export async function eventoRouter(req: IncomingMessage, res: ServerResponse): Promise<boolean> {
  const { url, method } = req;
  if (!url) return false;

  if (url === '/api/eventos' && method === 'GET') {
    await obtenerEventos(req, res);
    return true;
  }

  if (url === '/api/eventos' && method === 'POST') {
    await crearEvento(req, res);
    return true;
  }

  const matchId = url.match(/^\/api\/eventos\/(\d+)$/);
  if (matchId) {
    const id = parseInt(matchId[1], 10);
    if (method === 'GET') { await obtenerEventoPorId(id, req, res); return true; }
    if (method === 'PUT') { await actualizarEvento(id, req, res); return true; }
    if (method === 'DELETE') { await eliminarEvento(id, req, res); return true; }
  }

  return false;
}