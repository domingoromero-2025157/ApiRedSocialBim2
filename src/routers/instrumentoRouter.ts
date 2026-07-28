import { IncomingMessage, ServerResponse } from 'node:http';
import { 
  obtenerInstrumentos, 
  obtenerInstrumentoPorId, 
  crearInstrumento, 
  actualizarInstrumento, 
  eliminarInstrumento 
} from '../controller/instrumento.js';

export async function instrumentoRouter(req: IncomingMessage, res: ServerResponse): Promise<boolean> {
  const { url, method } = req;
  if (!url) return false;

  if (url === '/api/instrumentos' && method === 'GET') {
    await obtenerInstrumentos(req, res);
    return true;
  }

  if (url === '/api/instrumentos' && method === 'POST') {
    await crearInstrumento(req, res);
    return true;
  }

  const matchId = url.match(/^\/api\/instrumentos\/(\d+)$/);
  if (matchId) {
    const id = parseInt(matchId[1], 10);
    if (method === 'GET') { await obtenerInstrumentoPorId(id, req, res); return true; }
    if (method === 'PUT') { await actualizarInstrumento(id, req, res); return true; }
    if (method === 'DELETE') { await eliminarInstrumento(id, req, res); return true; }
  }

  return false;
}