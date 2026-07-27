import { IncomingMessage, ServerResponse } from 'node:http';
import { connection } from '../config/conexion.js';

export async function obtenerusuarios(req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const [rows] = await connection.query('CALL sp_leer_usuarios()');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(rows));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ mensaje: 'Error al obtener usuarios', error }));
  }
}

export async function crearusuario(req: IncomingMessage, res: ServerResponse): Promise<void> {
  let body = '';
  
  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      const { email, password, biografia, ciudad, foto_perfil } = JSON.parse(body);
      const fecha_registro = new Date();

      await connection.query('CALL sp_crear_usuario(?, ?, ?, ?, ?, ?)', [
        email,
        password,
        biografia,
        ciudad,
        foto_perfil,
        fecha_registro,
      ]);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ mensaje: 'Usuario creado exitosamente' }));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ mensaje: 'Error al crear usuario', error }));
    }
  });
}