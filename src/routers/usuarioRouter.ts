import { IncomingMessage, ServerResponse } from 'node:http';
import { obtenerusuarios, crearusuario } from '../controllers/usuario.js';

export async function usuarioRouter(req: IncomingMessage, res: ServerResponse): Promise<boolean> {
  const { url, method } = req;

  if (url === '/api/usuarios' && method === 'GET') {
    await obtenerusuarios(req, res);
    return true;
  }

  if (url === '/api/usuarios' && method === 'POST') {
    await crearusuario(req, res);
    return true;
  }

  return false;
}