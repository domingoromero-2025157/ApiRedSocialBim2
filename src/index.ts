import { server } from './api/server.js';
import { verificarConexion } from './config/conexion.js';

const PORT = Number(process.env.PORT ?? 3000);

async function bootstrap() {
  try {
    await verificarConexion();
    server.listen(PORT, () => {
      console.log(`Servidor escuchando correctamente en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
}

bootstrap();