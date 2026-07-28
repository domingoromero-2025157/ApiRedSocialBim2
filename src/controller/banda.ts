import { IncomingMessage, ServerResponse } from 'node:http';
import { BandaRepository } from '../repositories/bandaRepository.js';
import { parseJsonBody } from '../utils/bodyParser.js';

const bandaRepo = new BandaRepository();

export async function obtenerBandas(req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const bandas = await bandaRepo.obtenerTodas();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(bandas));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Error al obtener bandas', error }));
  }
}

export async function obtenerBandaPorId(id: number, req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const banda = await bandaRepo.buscarPorId(id);
    if (!banda) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ mensaje: 'Banda no encontrada' }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(banda));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Error al buscar banda', error }));
  }
}

export async function crearBanda(req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const body = await parseJsonBody<any>(req);
    await bandaRepo.crear(body);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Banda creada exitosamente' }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Error al crear la banda', error }));
  }
}

export async function actualizarBanda(id: number, req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const body = await parseJsonBody<any>(req);
    await bandaRepo.actualizar(id, body);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Banda actualizada exitosamente' }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Error al actualizar la banda', error }));
  }
}

export async function eliminarBanda(id: number, req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    await bandaRepo.eliminar(id);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Banda eliminada exitosamente' }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Error al eliminar la banda', error }));
  }
}