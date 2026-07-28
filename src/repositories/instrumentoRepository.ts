import { connection } from '../config/conexion.js';
import { Instrumento } from '../Model/Instrumento.js';

export class InstrumentoRepository {
  async obtenerTodos(): Promise<Instrumento[]> {
    const [rows]: any = await connection.query('call sp_leer_instrumentos()');
    return rows[0];
  }

  async buscarPorId(id: number): Promise<Instrumento | null> {
    const [rows]: any = await connection.query('call sp_buscar_instrumento(?)', [id]);
    const resultados = rows[0];
    return resultados.length > 0 ? resultados[0] : null;
  }

  async crear(instrumento: Instrumento): Promise<void> {
    await connection.query('call sp_crear_instrumento(?)', [instrumento.nombre]);
  }

  async actualizar(id: number, instrumento: Instrumento): Promise<void> {
    await connection.query('call sp_actualizar_instrumento(?, ?)', [id, instrumento.nombre]);
  }

  async eliminar(id: number): Promise<void> {
    await connection.query('call sp_eliminar_instrumento(?)', [id]);
  }
}