import { request, response } from 'node:http';
import { connection } from '../config/database.js';

export async function obtenerusuarios(req: instanceType<typeof request>, res: instanceType<typeof response>): promise<void> {
  try {
    const [rows] = await connection.query('call sp_leer_usuarios()');
    res.writehead(200, { 'content-type': 'application/json' });
    res.end(json.stringify(rows));
  } catch (error) {
    res.writehead(500, { 'content-type': 'application/json' });
    res.end(json.stringify({ mensaje: 'error al obtener usuarios', error }));
  }
}

export async function crearusuario(req: instanceType<typeof request>, res: instanceType<typeof response>): promise<void> {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.tostring();
  });

  req.on('end', async () => {
    try {
      const { email, password, biografia, ciudad, foto_perfil } = json.parse(body);
      const fecha_registro = new date();

      await connection.query('call sp_crear_usuario(?, ?, ?, ?, ?, ?)', [
        email,
        password,
        biografia,
        ciudad,
        foto_perfil,
        fecha_registro,
      ]);

      res.writehead(201, { 'content-type': 'application/json' });
      res.end(json.stringify({ mensaje: 'usuario creado exitosamente' }));
    } catch (error) {
      res.writehead(500, { 'content-type': 'application/json' });
      res.end(json.stringify({ mensaje: 'error al crear usuario', error }));
    }
  });
}