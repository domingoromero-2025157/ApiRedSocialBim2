import mysql from 'mysql2/promise';

export const connection = mysql.createPool({
  host: 'localhost',
  user: 'root', // Cambia por tu usuario de MySQL si es diferente
  password: 'da19070809Ale159753', // Cambia por tu contraseña de MySQL
  database: 'red_social_musica_in5cm', // Pon aquí el nombre exacto de tu BD
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function verificarConexion(): Promise<void> {
  try {
    const conn = await connection.getConnection();
    console.log('Conexión a MySQL establecida correctamente.');
    conn.release();
  } catch (error) {
    console.error('Error al conectar con la base de datos MySQL:', error);
    process.exit(1);
  }
}