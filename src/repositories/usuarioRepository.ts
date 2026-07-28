import { connection } from '../config/conexion.js';
import { usuario } from '../Model/Usuario.js';

export class UsuarioRepository {
  async obtenerTodos(): Promise<usuario[]> {
    const [rows]: any = await connection.query('CALL sp_leer_usuarios()');
    return rows[0];
  }

  async buscarPorId(id: number): Promise<usuario | null> {
    const [rows]: any = await connection.query('CALL sp_buscar_usuario(?)', [id]);
    const resultados = rows[0];
    return resultados.length > 0 ? resultados[0] : null;
  }

  async crear(usuario: usuario): Promise<void> {
    const { email, password, biografia, ciudad, foto_perfil } = usuario;
    const fecha_registro = new Date();
    await connection.query('CALL sp_crear_usuario(?, ?, ?, ?, ?, ?)', [
      email,
      password,
      biografia,
      ciudad,
      foto_perfil,
      fecha_registro,
    ]);
  }

  async actualizar(id: number, usuario: usuario): Promise<void> {
    const { email, password, biografia, ciudad, foto_perfil } = usuario;
    await connection.query('CALL sp_actualizar_usuario(?, ?, ?, ?, ?, ?)', [
      id,
      email,
      password,
      biografia,
      ciudad,
      foto_perfil,
    ]);
  }

  async eliminar(id: number): Promise<void> {
    await connection.query('CALL sp_eliminar_usuario(?)', [id]);
  }
}