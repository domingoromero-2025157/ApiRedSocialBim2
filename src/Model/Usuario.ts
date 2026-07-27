export interface usuario {
  id_usuario?: number;
  email: string;
  password?: string;
  biografia?: string;
  ciudad?: string;
  foto_perfil?: string;
  fecha_registro?: Date | string;
}