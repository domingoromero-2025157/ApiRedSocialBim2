export interface Suscripcion {
  id_suscripcion?: number;
  tipo_suscripcion?: string;
  fecha_inicio?: Date | string;
  fecha_fin?: Date | string;
  estado?: boolean;
  id_usuario?: number;
}