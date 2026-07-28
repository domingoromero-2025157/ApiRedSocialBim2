import { IncomingMessage, ServerResponse } from 'node:http';
import { GeneroMusicalRepository } from '../repositories/generoMusicalRepository.js';
import { parseJsonBody } from '../utils/bodyParser.js';

const generoRepo = new GeneroMusicalRepository();

export async function obtenerGeneros(req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const generos = await generoRepo.obtenerTodos();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(generos));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Error al obtener géneros musicales', error }));
  }
}

export async function obtenerGeneroPorId(id: number, req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const genero = await generoRepo.buscarPorId(id);
    if (!genero) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ mensaje: 'Género musical no encontrado' }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(genero));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Error al buscar género musical', error }));
  }
}

export async function crearGenero(req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const body = await parseJsonBody<any>(req);
    await generoRepo.crear(body);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Género musical creado exitosamente' }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Error al crear género musical', error }));
  }
}

export async function actualizarGenero(id: number, req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const body = await parseJsonBody<any>(req);
    await generoRepo.actualizar(id, body);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Género musical actualizado exitosamente' }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Error al actualizar género musical', error }));
  }
}

export async function eliminarGenero(id: number, req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    await generoRepo.eliminar(id);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Género musical eliminado exitosamente' }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Error al eliminar género musical', error }));
  }
}