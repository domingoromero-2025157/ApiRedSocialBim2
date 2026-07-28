import { IncomingMessage, ServerResponse } from 'node:http';
import { 
  obtenerGeneros, 
  obtenerGeneroPorId, 
  crearGenero, 
  actualizarGenero, 
  eliminarGenero 
} from '../controller/generoMusical.js';

export async function generoMusicalRouter(req: IncomingMessage, res: ServerResponse): Promise<boolean> {
  const { url, method } = req;
  if (!url) return false;

  if (url === '/api/generos' && method === 'GET') {
    await obtenerGeneros(req, res);
    return true;
  }

  if (url === '/api/generos' && method === 'POST') {
    await crearGenero(req, res);
    return true;
  }

  const matchId = url.match(/^\/api\/generos\/(\d+)$/);
  if (matchId) {
    const id = parseInt(matchId[1], 10);
    if (method === 'GET') { await obtenerGeneroPorId(id, req, res); return true; }
    if (method === 'PUT') { await actualizarGenero(id, req, res); return true; }
    if (method === 'DELETE') { await eliminarGenero(id, req, res); return true; }
  }

  return false;
}