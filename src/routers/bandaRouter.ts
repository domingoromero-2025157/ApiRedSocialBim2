import { IncomingMessage, ServerResponse } from 'node:http';
import { 
  obtenerBandas, 
  obtenerBandaPorId, 
  crearBanda, 
  actualizarBanda, 
  eliminarBanda 
} from '../controller/banda.js';

export async function bandaRouter(req: IncomingMessage, res: ServerResponse): Promise<boolean> {
  const { url, method } = req;
  if (!url) return false;

  if (url === '/api/bandas' && method === 'GET') {
    await obtenerBandas(req, res);
    return true;
  }

  if (url === '/api/bandas' && method === 'POST') {
    await crearBanda(req, res);
    return true;
  }

  const matchId = url.match(/^\/api\/bandas\/(\d+)$/);
  if (matchId) {
    const id = parseInt(matchId[1], 10);
    if (method === 'GET') { await obtenerBandaPorId(id, req, res); return true; }
    if (method === 'PUT') { await actualizarBanda(id, req, res); return true; }
    if (method === 'DELETE') { await eliminarBanda(id, req, res); return true; }
  }

  return false;
}