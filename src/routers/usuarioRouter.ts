import { IncomingMessage, ServerResponse } from 'node:http';
import { 
  obtenerUsuarios, 
  obtenerUsuarioPorId, 
  crearUsuario, 
  actualizarUsuario, 
  eliminarUsuario 
} from '../controller/usuario.js';

export async function usuarioRouter(req: IncomingMessage, res: ServerResponse): Promise<boolean> {
  const { url, method } = req;
  if (!url) return false;

  // GET /api/usuarios
  if (url === '/api/usuarios' && method === 'GET') {
    await obtenerUsuarios(req, res);
    return true;
  }

  // POST /api/usuarios
  if (url === '/api/usuarios' && method === 'POST') {
    await crearUsuario(req, res);
    return true;
  }

  // Rutas dinámicas con ID: /api/usuarios/1
  const matchId = url.match(/^\/api\/usuarios\/(\d+)$/);
  if (matchId) {
    const id = parseInt(matchId[1], 10);

    if (method === 'GET') {
      await obtenerUsuarioPorId(id, req, res);
      return true;
    }

    if (method === 'PUT') {
      await actualizarUsuario(id, req, res);
      return true;
    }

    if (method === 'DELETE') {
      await eliminarUsuario(id, req, res);
      return true;
    }
  }

  return false;
}