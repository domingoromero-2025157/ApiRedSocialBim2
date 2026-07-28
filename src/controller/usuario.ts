import { IncomingMessage, ServerResponse } from 'node:http';
import { UsuarioRepository } from '../repositories/usuarioRepository.js';
import { parseJsonBody } from '../utils/bodyParser.js';

const usuarioRepo = new UsuarioRepository();

export async function obtenerUsuarios(req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const usuarios = await usuarioRepo.obtenerTodos();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(usuarios));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Error al obtener usuarios', error }));
  }
}

export async function obtenerUsuarioPorId(id: number, req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const usuario = await usuarioRepo.buscarPorId(id);
    if (!usuario) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ mensaje: 'Usuario no encontrado' }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(usuario));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Error al buscar usuario', error }));
  }
}

export async function crearUsuario(req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const body = await parseJsonBody<any>(req);
    await usuarioRepo.crear(body);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Usuario creado exitosamente' }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Error al crear usuario', error }));
  }
}

export async function actualizarUsuario(id: number, req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const body = await parseJsonBody<any>(req);
    await usuarioRepo.actualizar(id, body);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Usuario actualizado exitosamente' }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Error al actualizar usuario', error }));
  }
}

export async function eliminarUsuario(id: number, req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    await usuarioRepo.eliminar(id);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Usuario eliminado exitosamente' }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Error al eliminar usuario', error }));
  }
}