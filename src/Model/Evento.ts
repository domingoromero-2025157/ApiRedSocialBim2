export interface Evento {
  id_evento?: number;
  nombre: string;
  descripcion?: string;
  fecha?: Date | string;
  ubicacion?: string;
  id_banda?: number;
}