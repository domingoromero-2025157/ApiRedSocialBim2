import { IncomingMessage, ServerResponse } from 'node:http';
import { InstrumentoRepository } from '../repositories/instrumentoRepository.js';
import { parseJsonBody } from '../utils/bodyParser.js';

const instrumentoRepo = new InstrumentoRepository();

export async function obtenerInstrumentos(req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const instrumentos = await instrumentoRepo.obtenerTodos();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(instrumentos));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Error al obtener instrumentos', error }));
  }
}

export async function obtenerInstrumentoPorId(id: number, req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const instrumento = await instrumentoRepo.buscarPorId(id);
    if (!instrumento) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ mensaje: 'Instrumento no encontrado' }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(instrumento));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Error al buscar instrumento', error }));
  }
}

export async function crearInstrumento(req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const body = await parseJsonBody<any>(req);
    await instrumentoRepo.crear(body);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Instrumento creado exitosamente' }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Error al crear instrumento', error }));
  }
}

export async function actualizarInstrumento(id: number, req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const body = await parseJsonBody<any>(req);
    await instrumentoRepo.actualizar(id, body);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Instrumento actualizado exitosamente' }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Error al actualizar instrumento', error }));
  }
}

export async function eliminarInstrumento(id: number, req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    await instrumentoRepo.eliminar(id);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Instrumento eliminado exitosamente' }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Error al eliminar instrumento', error }));
  }
}