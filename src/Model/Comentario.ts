export interface Comentario {
  id_comentario?: number;
  id_usuario: number;
  id_publicacion: number;
  fecha?: Date | string;
  contenido: string;
}