import { connection } from '../config/database.js';
import { GeneroMusical } from '../models/GeneroMusical.js';

export class GeneroMusicalRepository {
  async obtenerTodos(): Promise<GeneroMusical[]> {
    const [rows]: any = await connection.query('call sp_leer_generosmusicales()');
    return rows[0];
  }

  async buscarPorId(id: number): Promise<GeneroMusical | null> {
    const [rows]: any = await connection.query('call sp_buscar_generomusical(?)', [id]);
    const resultados = rows[0];
    return resultados.length > 0 ? resultados[0] : null;
  }

  async crear(genero: GeneroMusical): Promise<void> {
    await connection.query('call sp_crear_generomusical(?)', [genero.nombre]);
  }

  async actualizar(id: number, genero: GeneroMusical): Promise<void> {
    await connection.query('call sp_actualizar_generomusical(?, ?)', [id, genero.nombre]);
  }

  async eliminar(id: number): Promise<void> {
    await connection.query('call sp_eliminar_generomusical(?)', [id]);
  }
}