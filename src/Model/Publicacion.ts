export interface Publicacion {
  id_publicacion?: number;
  id_usuario: number;
  fecha_publicacion?: Date | string;
  contenido: string;
}