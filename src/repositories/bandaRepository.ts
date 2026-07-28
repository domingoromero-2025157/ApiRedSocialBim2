import { connection } from '../config/conexion.js';
import { Banda } from '../Model/Banda.js';

export class BandaRepository {
  async obtenerTodas(): Promise<Banda[]> {
    const [rows]: any = await connection.query('call sp_leer_bandas()');
    return rows[0];
  }

  async buscarPorId(id: number): Promise<Banda | null> {
    const [rows]: any = await connection.query('call sp_buscar_banda(?)', [id]);
    const resultados = rows[0];
    return resultados.length > 0 ? resultados[0] : null;
  }

  async crear(banda: Banda): Promise<void> {
    const { nombre, nombre_namaio, descripcion, fecha_creacion } = banda;
    await connection.query('call sp_crear_banda(?, ?, ?, ?)', [
      nombre,
      nombre_namaio,
      descripcion,
      fecha_creacion,
    ]);
  }

  async actualizar(id: number, banda: Banda): Promise<void> {
    const { nombre, nombre_namaio, descripcion, fecha_creacion } = banda;
    await connection.query('call sp_actualizar_banda(?, ?, ?, ?, ?)', [
      id,
      nombre,
      nombre_namaio,
      descripcion,
      fecha_creacion,
    ]);
  }

  async eliminar(id: number): Promise<void> {
    await connection.query('call sp_eliminar_banda(?)', [id]);
  }
}