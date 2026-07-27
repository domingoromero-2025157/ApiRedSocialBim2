import { connection } from '../config/database.js';
import { Usuario } from '../models/Usuario.js';

export class UsuarioRepository {
  async obtenerTodos(): Promise<Usuario[]> {
    const [rows]: any = await connection.query('call sp_leer_usuarios()');
    return rows[0];
  }

  async buscarPorId(id: number): Promise<Usuario | null> {
    const [rows]: any = await connection.query('call sp_buscar_usuario(?)', [id]);
    const resultados = rows[0];
    return resultados.length > 0 ? resultados[0] : null;
  }

  async crear(usuario: Usuario): Promise<void> {
    const { email, password, biografia, ciudad, foto_perfil, fecha_registro } = usuario;
    await connection.query('call sp_crear_usuario(?, ?, ?, ?, ?, ?)', [
      email,
      password,
      biografia,
      ciudad,
      foto_perfil,
      fecha_registro ?? new Date(),
    ]);
  }

  async actualizar(id: number, usuario: Usuario): Promise<void> {
    const { email, password, biografia, ciudad, foto_perfil } = usuario;
    await connection.query('call sp_actualizar_usuario(?, ?, ?, ?, ?, ?)', [
      id,
      email,
      password,
      biografia,
      ciudad,
      foto_perfil,
    ]);
  }

  async eliminar(id: number): Promise<void> {
    await connection.query('call sp_eliminar_usuario(?)', [id]);
  }
}