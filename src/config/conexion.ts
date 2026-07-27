import mysql from 'mysql2/promise';

export const connection = mysql.createPool({
  host: process.env.db_host ?? 'localhost',
  user: process.env.db_user ?? 'root',
  password: process.env.db_password ?? '',
  database: process.env.db_name ?? 'red_social_musica_inc5m',
  port: Number(process.env.db_port ?? 3306),
  waitforconnections: true,
  connectionlimit: 10,
});

export async function verificarconexion(): Promise<void> {
  const conexion = await connection.getconnection();
  try {
    await conexion.ping();
    console.log('conexión a la base de datos establecida correctamente.');
  } finally {
    conexion.release();
  }
}