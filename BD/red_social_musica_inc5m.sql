drop database if exists red_social_musica_in5cm;
create database red_social_musica_in5cm;
use red_social_musica_in5cm;

-- ========================================================
-- 1. creación de tablas
-- ========================================================

create table usuario (
    id_usuario int auto_increment primary key,
    email varchar(255) not null,
    password varchar(255) not null,
    biografia text,
    ciudad varchar(100),
    foto_perfil varchar(255),
    fecha_registro datetime
);

create table instrumento (
    id_instrumento int auto_increment primary key,
    nombre varchar(100) not null
);

create table generomusical (
    id_genero int auto_increment primary key,
    nombre varchar(100) not null
);

create table banda (
    id_banda int auto_increment primary key,
    nombre varchar(100) not null,
    nombre_namaio varchar(100),
    descripcion text,
    fecha_creacion date
);

create table suscripcion (
    id_suscripcion int auto_increment primary key,
    tipo_suscripcion varchar(50),
    fecha_inicio date,
    fecha_fin date,
    estado boolean,
    id_usuario int,
    foreign key (id_usuario) references usuario(id_usuario) on delete cascade
);

create table publicacion (
    id_publicacion int auto_increment primary key,
    id_usuario int not null,
    fecha_publicacion datetime,
    contenido text,
    foreign key (id_usuario) references usuario(id_usuario) on delete cascade
);

create table evento (
    id_evento int auto_increment primary key,
    nombre varchar(100) not null,
    descripcion text,
    fecha datetime,
    ubicacion varchar(255),
    id_banda int,
    foreign key (id_banda) references banda(id_banda) on delete set null
);

create table usuarioinstrumento (
    id_usuario int,
    id_instrumento int,
    primary key (id_usuario, id_instrumento),
    foreign key (id_usuario) references usuario(id_usuario) on delete cascade,
    foreign key (id_instrumento) references instrumento(id_instrumento) on delete cascade
);

create table usuariogenero (
    id_usuario int,
    id_genero int,
    primary key (id_usuario, id_genero),
    foreign key (id_usuario) references usuario(id_usuario) on delete cascade,
    foreign key (id_genero) references generomusical(id_genero) on delete cascade
);

create table comentario (
    id_comentario int auto_increment primary key,
    id_usuario int not null,
    id_publicacion int not null,
    fecha datetime,
    contenido text,
    foreign key (id_usuario) references usuario(id_usuario) on delete cascade,
    foreign key (id_publicacion) references publicacion(id_publicacion) on delete cascade
);

create table reaccion (
    id_reaccion int auto_increment primary key,
    tipo varchar(50),
    id_usuario int not null,
    id_publicacion int not null,
    foreign key (id_usuario) references usuario(id_usuario) on delete cascade,
    foreign key (id_publicacion) references publicacion(id_publicacion) on delete cascade
);

create table seguidor (
    id_usuario_seguidor int,
    id_usuario_seguido int,
    primary key (id_usuario_seguidor, id_usuario_seguido),
    foreign key (id_usuario_seguidor) references usuario(id_usuario) on delete cascade,
    foreign key (id_usuario_seguido) references usuario(id_usuario) on delete cascade
);

create table notificacionevento (
    id_notificacion int auto_increment primary key,
    mensaje text,
    fecha datetime,
    id_usuario int not null,
    id_evento int not null,
    foreign key (id_usuario) references usuario(id_usuario) on delete cascade,
    foreign key (id_evento) references evento(id_evento) on delete cascade
);

create table reporte (
    id_reporte int auto_increment primary key,
    razon text,
    id_usuario_reporta int not null,
    id_publicacion int,
    id_comentario int,
    foreign key (id_usuario_reporta) references usuario(id_usuario) on delete cascade,
    foreign key (id_publicacion) references publicacion(id_publicacion) on delete cascade,
    foreign key (id_comentario) references comentario(id_comentario) on delete cascade
);

-- ========================================================
-- 2. procedimientos almacenados (crud)
-- ========================================================

-- --- usuario ---
delimiter //
create procedure sp_crear_usuario(
    in p_email varchar(255),
    in p_password varchar(255),
    in p_biografia text,
    in p_ciudad varchar(100),
    in p_foto_perfil varchar(255),
    in p_fecha_registro datetime
)
begin
    insert into usuario(email, password, biografia, ciudad, foto_perfil, fecha_registro)
    values (p_email, p_password, p_biografia, p_ciudad, p_foto_perfil, p_fecha_registro);
end //

create procedure sp_leer_usuarios()
begin
    select * from usuario;
end //

create procedure sp_buscar_usuario(in p_id_usuario int)
begin
    select * from usuario where id_usuario = p_id_usuario;
end //

create procedure sp_actualizar_usuario(
    in p_id_usuario int,
    in p_email varchar(255),
    in p_password varchar(255),
    in p_biografia text,
    in p_ciudad varchar(100),
    in p_foto_perfil varchar(255)
)
begin
    update usuario
    set email = p_email,
        password = p_password,
        biografia = p_biografia,
        ciudad = p_ciudad,
        foto_perfil = p_foto_perfil
    where id_usuario = p_id_usuario;
end //

create procedure sp_eliminar_usuario(in p_id_usuario int)
begin
    delete from usuario where id_usuario = p_id_usuario;
end //
delimiter ;

-- --- instrumento ---
delimiter //
create procedure sp_crear_instrumento(in p_nombre varchar(100))
begin
    insert into instrumento(nombre) values (p_nombre);
end //

create procedure sp_leer_instrumentos()
begin
    select * from instrumento;
end //

create procedure sp_buscar_instrumento(in p_id_instrumento int)
begin
    select * from instrumento where id_instrumento = p_id_instrumento;
end //

create procedure sp_actualizar_instrumento(
    in p_id_instrumento int,
    in p_nombre varchar(100)
)
begin
    update instrumento set nombre = p_nombre where id_instrumento = p_id_instrumento;
end //

create procedure sp_eliminar_instrumento(in p_id_instrumento int)
begin
    delete from instrumento where id_instrumento = p_id_instrumento;
end //
delimiter ;

-- --- generomusical ---
delimiter //
create procedure sp_crear_generomusical(in p_nombre varchar(100))
begin
    insert into generomusical(nombre) values (p_nombre);
end //

create procedure sp_leer_generosmusicales()
begin
    select * from generomusical;
end //

create procedure sp_buscar_generomusical(in p_id_genero int)
begin
    select * from generomusical where id_genero = p_id_genero;
end //

create procedure sp_actualizar_generomusical(
    in p_id_genero int,
    in p_nombre varchar(100)
)
begin
    update generomusical set nombre = p_nombre where id_genero = p_id_genero;
end //

create procedure sp_eliminar_generomusical(in p_id_genero int)
begin
    delete from generomusical where id_genero = p_id_genero;
end //
delimiter ;

-- --- banda ---
delimiter //
create procedure sp_crear_banda(
    in p_nombre varchar(100),
    in p_nombre_namaio varchar(100),
    in p_descripcion text,
    in p_fecha_creacion date
)
begin
    insert into banda(nombre, nombre_namaio, descripcion, fecha_creacion)
    values (p_nombre, p_nombre_namaio, p_descripcion, p_fecha_creacion);
end //

create procedure sp_leer_bandas()
begin
    select * from banda;
end //

create procedure sp_buscar_banda(in p_id_banda int)
begin
    select * from banda where id_banda = p_id_banda;
end //

create procedure sp_actualizar_banda(
    in p_id_banda int,
    in p_nombre varchar(100),
    in p_nombre_namaio varchar(100),
    in p_descripcion text,
    in p_fecha_creacion date
)
begin
    update banda
    set nombre = p_nombre,
        nombre_namaio = p_nombre_namaio,
        descripcion = p_descripcion,
        fecha_creacion = p_fecha_creacion
    where id_banda = p_id_banda;
end //

create procedure sp_eliminar_banda(in p_id_banda int)
begin
    delete from banda where id_banda = p_id_banda;
end //
delimiter ;

-- --- suscripcion ---
delimiter //
create procedure sp_crear_suscripcion(
    in p_tipo_suscripcion varchar(50),
    in p_fecha_inicio date,
    in p_fecha_fin date,
    in p_estado boolean,
    in p_id_usuario int
)
begin
    insert into suscripcion(tipo_suscripcion, fecha_inicio, fecha_fin, estado, id_usuario)
    values (p_tipo_suscripcion, p_fecha_inicio, p_fecha_fin, p_estado, p_id_usuario);
end //

create procedure sp_leer_suscripciones()
begin
    select * from suscripcion;
end //

create procedure sp_buscar_suscripcion(in p_id_suscripcion int)
begin
    select * from suscripcion where id_suscripcion = p_id_suscripcion;
end //

create procedure sp_actualizar_suscripcion(
    in p_id_suscripcion int,
    in p_tipo_suscripcion varchar(50),
    in p_fecha_inicio date,
    in p_fecha_fin date,
    in p_estado boolean,
    in p_id_usuario int
)
begin
    update suscripcion
    set tipo_suscripcion = p_tipo_suscripcion,
        fecha_inicio = p_fecha_inicio,
        fecha_fin = p_fecha_fin,
        estado = p_estado,
        id_usuario = p_id_usuario
    where id_suscripcion = p_id_suscripcion;
end //

create procedure sp_eliminar_suscripcion(in p_id_suscripcion int)
begin
    delete from suscripcion where id_suscripcion = p_id_suscripcion;
end //
delimiter ;

-- --- publicacion ---
delimiter //
create procedure sp_crear_publicacion(
    in p_id_usuario int,
    in p_fecha_publicacion datetime,
    in p_contenido text
)
begin
    insert into publicacion(id_usuario, fecha_publicacion, contenido)
    values (p_id_usuario, p_fecha_publicacion, p_contenido);
end //

create procedure sp_leer_publicaciones()
begin
    select * from publicacion;
end //

create procedure sp_buscar_publicacion(in p_id_publicacion int)
begin
    select * from publicacion where id_publicacion = p_id_publicacion;
end //

create procedure sp_actualizar_publicacion(
    in p_id_publicacion int,
    in p_contenido text
)
begin
    update publicacion set contenido = p_contenido where id_publicacion = p_id_publicacion;
end //

create procedure sp_eliminar_publicacion(in p_id_publicacion int)
begin
    delete from publicacion where id_publicacion = p_id_publicacion;
end //
delimiter ;

-- --- evento ---
delimiter //
create procedure sp_crear_evento(
    in p_nombre varchar(100),
    in p_descripcion text,
    in p_fecha datetime,
    in p_ubicacion varchar(255),
    in p_id_banda int
)
begin
    insert into evento(nombre, descripcion, fecha, ubicacion, id_banda)
    values (p_nombre, p_descripcion, p_fecha, p_ubicacion, p_id_banda);
end //

create procedure sp_leer_eventos()
begin
    select * from evento;
end //

create procedure sp_buscar_evento(in p_id_evento int)
begin
    select * from evento where id_evento = p_id_evento;
end //

create procedure sp_actualizar_evento(
    in p_id_evento int,
    in p_nombre varchar(100),
    in p_descripcion text,
    in p_fecha datetime,
    in p_ubicacion varchar(255),
    in p_id_banda int
)
begin
    update evento
    set nombre = p_nombre,
        descripcion = p_descripcion,
        fecha = p_fecha,
        ubicacion = p_ubicacion,
        id_banda = p_id_banda
    where id_evento = p_id_evento;
end //

create procedure sp_eliminar_evento(in p_id_evento int)
begin
    delete from evento where id_evento = p_id_evento;
end //
delimiter ;

-- --- usuarioinstrumento ---
delimiter //
create procedure sp_crear_usuarioinstrumento(
    in p_id_usuario int,
    in p_id_instrumento int
)
begin
    insert into usuarioinstrumento(id_usuario, id_instrumento)
    values (p_id_usuario, p_id_instrumento);
end //

create procedure sp_leer_usuarioinstrumentos()
begin
    select * from usuarioinstrumento;
end //

create procedure sp_buscar_usuarioinstrumento(
    in p_id_usuario int,
    in p_id_instrumento int
)
begin
    select * from usuarioinstrumento
    where id_usuario = p_id_usuario and id_instrumento = p_id_instrumento;
end //

create procedure sp_eliminar_usuarioinstrumento(
    in p_id_usuario int,
    in p_id_instrumento int
)
begin
    delete from usuarioinstrumento
    where id_usuario = p_id_usuario and id_instrumento = p_id_instrumento;
end //
delimiter ;

-- --- usuariogenero ---
delimiter //
create procedure sp_crear_usuariogenero(
    in p_id_usuario int,
    in p_id_genero int
)
begin
    insert into usuariogenero(id_usuario, id_genero)
    values (p_id_usuario, p_id_genero);
end //

create procedure sp_leer_usuariogeneros()
begin
    select * from usuariogenero;
end //

create procedure sp_buscar_usuariogenero(
    in p_id_usuario int,
    in p_id_genero int
)
begin
    select * from usuariogenero
    where id_usuario = p_id_usuario and id_genero = p_id_genero;
end //

create procedure sp_eliminar_usuariogenero(
    in p_id_usuario int,
    in p_id_genero int
)
begin
    delete from usuariogenero
    where id_usuario = p_id_usuario and id_genero = p_id_genero;
end //
delimiter ;

-- --- comentario ---
delimiter //
create procedure sp_crear_comentario(
    in p_id_usuario int,
    in p_id_publicacion int,
    in p_fecha datetime,
    in p_contenido text
)
begin
    insert into comentario(id_usuario, id_publicacion, fecha, contenido)
    values (p_id_usuario, p_id_publicacion, p_fecha, p_contenido);
end //

create procedure sp_leer_comentarios()
begin
    select * from comentario;
end //

create procedure sp_buscar_comentario(in p_id_comentario int)
begin
    select * from comentario where id_comentario = p_id_comentario;
end //

create procedure sp_actualizar_comentario(
    in p_id_comentario int,
    in p_contenido text
)
begin
    update comentario set contenido = p_contenido where id_comentario = p_id_comentario;
end //

create procedure sp_eliminar_comentario(in p_id_comentario int)
begin
    delete from comentario where id_comentario = p_id_comentario;
end //
delimiter ;

-- --- reaccion ---
delimiter //
create procedure sp_crear_reaccion(
    in p_tipo varchar(50),
    in p_id_usuario int,
    in p_id_publicacion int
)
begin
    insert into reaccion(tipo, id_usuario, id_publicacion)
    values (p_tipo, p_id_usuario, p_id_publicacion);
end //

create procedure sp_leer_reacciones()
begin
    select * from reaccion;
end //

create procedure sp_buscar_reaccion(in p_id_reaccion int)
begin
    select * from reaccion where id_reaccion = p_id_reaccion;
end //

create procedure sp_actualizar_reaccion(
    in p_id_reaccion int,
    in p_tipo varchar(50)
)
begin
    update reaccion set tipo = p_tipo where id_reaccion = p_id_reaccion;
end //

create procedure sp_eliminar_reaccion(in p_id_reaccion int)
begin
    delete from reaccion where id_reaccion = p_id_reaccion;
end //
delimiter ;

-- --- seguidor ---
delimiter //
create procedure sp_crear_seguidor(
    in p_id_usuario_seguidor int,
    in p_id_usuario_seguido int
)
begin
    insert into seguidor(id_usuario_seguidor, id_usuario_seguido)
    values (p_id_usuario_seguidor, p_id_usuario_seguido);
end //

create procedure sp_leer_seguidores()
begin
    select * from seguidor;
end //

create procedure sp_buscar_seguidor(
    in p_id_usuario_seguidor int,
    in p_id_usuario_seguido int
)
begin
    select * from seguidor
    where id_usuario_seguidor = p_id_usuario_seguidor 
      and id_usuario_seguido = p_id_usuario_seguido;
end //

create procedure sp_eliminar_seguidor(
    in p_id_usuario_seguidor int,
    in p_id_usuario_seguido int
)
begin
    delete from seguidor
    where id_usuario_seguidor = p_id_usuario_seguidor 
      and id_usuario_seguido = p_id_usuario_seguido;
end //
delimiter ;

-- --- notificacionevento ---
delimiter //
create procedure sp_crear_notificacionevento(
    in p_mensaje text,
    in p_fecha datetime,
    in p_id_usuario int,
    in p_id_evento int
)
begin
    insert into notificacionevento(mensaje, fecha, id_usuario, id_evento)
    values (p_mensaje, p_fecha, p_id_usuario, p_id_evento);
end //

create procedure sp_leer_notificacionesevento()
begin
    select * from notificacionevento;
end //

create procedure sp_buscar_notificacionevento(in p_id_notificacion int)
begin
    select * from notificacionevento where id_notificacion = p_id_notificacion;
end //

create procedure sp_actualizar_notificacionevento(
    in p_id_notificacion int,
    in p_mensaje text
)
begin
    update notificacionevento set mensaje = p_mensaje where id_notificacion = p_id_notificacion;
end //

create procedure sp_eliminar_notificacionevento(in p_id_notificacion int)
begin
    delete from notificacionevento where id_notificacion = p_id_notificacion;
end //
delimiter ;

-- --- reporte ---
delimiter //
create procedure sp_crear_reporte(
    in p_razon text,
    in p_id_usuario_reporta int,
    in p_id_publicacion int,
    in p_id_comentario int
)
begin
    insert into reporte(razon, id_usuario_reporta, id_publicacion, id_comentario)
    values (p_razon, p_id_usuario_reporta, p_id_publicacion, p_id_comentario);
end //

create procedure sp_leer_reportes()
begin
    select * from reporte;
end //

create procedure sp_buscar_reporte(in p_id_reporte int)
begin
    select * from reporte where id_reporte = p_id_reporte;
end //

create procedure sp_actualizar_reporte(
    in p_id_reporte int,
    in p_razon text
)
begin
    update reporte set razon = p_razon where id_reporte = p_id_reporte;
end //

create procedure sp_eliminar_reporte(in p_id_reporte int)
begin
    delete from reporte where id_reporte = p_id_reporte;
end //
delimiter ;