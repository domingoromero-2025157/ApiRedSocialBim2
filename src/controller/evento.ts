import { IncomingMessage, ServerResponse } from 'node:http';
import { EventoRepository } from '../repositories/eventoRepository.js';
import { parseJsonBody } from '../utils/bodyParser.js';

const eventoRepo = new EventoRepository();

export async function obtenerEventos(req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const eventos = await eventoRepo.obtenerTodos();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(eventos));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Error al obtener eventos', error }));
  }
}

export async function obtenerEventoPorId(id: number, req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const evento = await eventoRepo.buscarPorId(id);
    if (!evento) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ mensaje: 'Evento no encontrado' }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(evento));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Error al buscar evento', error }));
  }
}

export async function crearEvento(req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const body = await parseJsonBody<any>(req);
    await eventoRepo.crear(body);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Evento creado exitosamente' }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Error al crear el evento', error }));
  }
}

export async function actualizarEvento(id: number, req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const body = await parseJsonBody<any>(req);
    await eventoRepo.actualizar(id, body);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Evento actualizado exitosamente' }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Error al actualizar el evento', error }));
  }
}

export async function eliminarEvento(id: number, req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    await eventoRepo.eliminar(id);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Evento eliminado exitosamente' }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Error al eliminar el evento', error }));
  }
}