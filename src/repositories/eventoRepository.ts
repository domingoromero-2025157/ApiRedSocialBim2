import { connection } from '../config/conexion.js';
import { Evento } from '../Model/Evento.js';

export class EventoRepository {
  async obtenerTodos(): Promise<Evento[]> {
    const [rows]: any = await connection.query('CALL sp_leer_eventos()');
    return rows[0];
  }

  async buscarPorId(id: number): Promise<Evento | null> {
    const [rows]: any = await connection.query('CALL sp_buscar_evento(?)', [id]);
    const resultados = rows[0];
    return resultados.length > 0 ? resultados[0] : null;
  }

  async crear(evento: Evento): Promise<void> {
    const { nombre, descripcion, fecha, ubicacion, id_banda } = evento;
    await connection.query('CALL sp_crear_evento(?, ?, ?, ?, ?)', [
      nombre,
      descripcion,
      fecha,
      ubicacion,
      id_banda,
    ]);
  }

  async actualizar(id: number, evento: Evento): Promise<void> {
    const { nombre, descripcion, fecha, ubicacion, id_banda } = evento;
    await connection.query('CALL sp_actualizar_evento(?, ?, ?, ?, ?, ?)', [
      id,
      nombre,
      descripcion,
      fecha,
      ubicacion,
      id_banda,
    ]);
  }

  async eliminar(id: number): Promise<void> {
    await connection.query('CALL sp_eliminar_evento(?)', [id]);
  }
}