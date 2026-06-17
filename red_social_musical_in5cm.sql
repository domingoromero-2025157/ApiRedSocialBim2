drop database if exists red_social_musical_in5cm;
create database red_social_musical_in5cm;
use red_social_musical_in5cm;

-- =========================
-- TABLAS
-- =========================

create table usuario (
    id_usuario int auto_increment primary key,
    nombre varchar(100),
    email varchar(100) unique,
    password varchar(255),
    biografia text,
    ciudad varchar(100),
    foto_perfil varchar(255),
    fecha_registro timestamp default current_timestamp
);

create table publicacion (
    id_publicacion int auto_increment primary key,
    contenido text,
    fecha_publicacion timestamp default current_timestamp,
    id_usuario int,
    foreign key (id_usuario) references usuario(id_usuario) on delete cascade
);

create table comentario (
    id_comentario int auto_increment primary key,
    contenido text,
    fecha timestamp default current_timestamp,
    id_usuario int,
    id_publicacion int,
    foreign key (id_usuario) references usuario(id_usuario) on delete cascade,
    foreign key (id_publicacion) references publicacion(id_publicacion) on delete cascade
);

create table reaccion (
    id_reaccion int auto_increment primary key,
    tipo enum('like','love','aplausos'),
    id_usuario int,
    id_publicacion int,
    foreign key (id_usuario) references usuario(id_usuario) on delete cascade,
    foreign key (id_publicacion) references publicacion(id_publicacion) on delete cascade
);

create table banda (
    id_banda int auto_increment primary key,
    nombre varchar(100),
    descripcion text,
    fecha_creacion timestamp default current_timestamp
);

create table evento (
    id_evento int auto_increment primary key,
    nombre varchar(100),
    descripcion text,
    fecha datetime,
    ubicacion varchar(255),
    id_banda int,
    foreign key (id_banda) references banda(id_banda) on delete cascade
);

-- =========================
-- CRUD USUARIO
-- =========================

delimiter $$

create procedure sp_usuario_create(
    in p_nombre varchar(100),
    in p_email varchar(100),
    in p_password varchar(255),
    in p_biografia text,
    in p_ciudad varchar(100),
    in p_foto varchar(255)
)
begin
    insert into usuario(nombre,email,password,biografia,ciudad,foto_perfil)
    values(p_nombre,p_email,p_password,p_biografia,p_ciudad,p_foto);
end $$

create procedure sp_usuario_get_all()
begin
    select * from usuario;
end $$

create procedure sp_usuario_get_by_id(in p_id int)
begin
    select * from usuario where id_usuario = p_id;
end $$

create procedure sp_usuario_update(
    in p_id int,
    in p_nombre varchar(100),
    in p_email varchar(100),
    in p_password varchar(255),
    in p_biografia text,
    in p_ciudad varchar(100),
    in p_foto varchar(255)
)
begin
    update usuario
    set nombre = p_nombre,
        email = p_email,
        password = p_password,
        biografia = p_biografia,
        ciudad = p_ciudad,
        foto_perfil = p_foto
    where id_usuario = p_id;
end $$

create procedure sp_usuario_delete(in p_id int)
begin
    delete from usuario where id_usuario = p_id;
end $$

-- =========================
-- CRUD PUBLICACION
-- =========================

create procedure sp_publicacion_create(
    in p_contenido text,
    in p_id_usuario int
)
begin
    insert into publicacion(contenido,id_usuario)
    values(p_contenido,p_id_usuario);
end $$

create procedure sp_publicacion_get_all()
begin
    select * from publicacion;
end $$

create procedure sp_publicacion_get_by_id(in p_id int)
begin
    select * from publicacion where id_publicacion = p_id;
end $$

create procedure sp_publicacion_update(
    in p_id int,
    in p_contenido text
)
begin
    update publicacion
    set contenido = p_contenido
    where id_publicacion = p_id;
end $$

create procedure sp_publicacion_delete(in p_id int)
begin
    delete from publicacion where id_publicacion = p_id;
end $$

-- =========================
-- CRUD COMENTARIO
-- =========================

create procedure sp_comentario_create(
    in p_contenido text,
    in p_id_usuario int,
    in p_id_publicacion int
)
begin
    insert into comentario(contenido,id_usuario,id_publicacion)
    values(p_contenido,p_id_usuario,p_id_publicacion);
end $$

create procedure sp_comentario_get_all()
begin
    select * from comentario;
end $$

create procedure sp_comentario_get_by_id(in p_id int)
begin
    select * from comentario where id_comentario = p_id;
end $$

create procedure sp_comentario_update(
    in p_id int,
    in p_contenido text
)
begin
    update comentario
    set contenido = p_contenido
    where id_comentario = p_id;
end $$

create procedure sp_comentario_delete(in p_id int)
begin
    delete from comentario where id_comentario = p_id;
end $$

-- =========================
-- CRUD REACCION
-- =========================

create procedure sp_reaccion_create(
    in p_tipo varchar(20),
    in p_id_usuario int,
    in p_id_publicacion int
)
begin
    insert into reaccion(tipo,id_usuario,id_publicacion)
    values(p_tipo,p_id_usuario,p_id_publicacion);
end $$

create procedure sp_reaccion_get_all()
begin
    select * from reaccion;
end $$

create procedure sp_reaccion_get_by_id(in p_id int)
begin
    select * from reaccion where id_reaccion = p_id;
end $$

create procedure sp_reaccion_update(
    in p_id int,
    in p_tipo varchar(20)
)
begin
    update reaccion
    set tipo = p_tipo
    where id_reaccion = p_id;
end $$

create procedure sp_reaccion_delete(in p_id int)
begin
    delete from reaccion where id_reaccion = p_id;
end $$

-- =========================
-- CRUD BANDA
-- =========================

create procedure sp_banda_create(
    in p_nombre varchar(100),
    in p_descripcion text
)
begin
    insert into banda(nombre,descripcion)
    values(p_nombre,p_descripcion);
end $$

create procedure sp_banda_get_all()
begin
    select * from banda;
end $$

create procedure sp_banda_get_by_id(in p_id int)
begin
    select * from banda where id_banda = p_id;
end $$

create procedure sp_banda_update(
    in p_id int,
    in p_nombre varchar(100),
    in p_descripcion text
)
begin
    update banda
    set nombre = p_nombre,
        descripcion = p_descripcion
    where id_banda = p_id;
end $$

create procedure sp_banda_delete(in p_id int)
begin
    delete from banda where id_banda = p_id;
end $$

-- =========================
-- CRUD EVENTO
-- =========================

create procedure sp_evento_create(
    in p_nombre varchar(100),
    in p_descripcion text,
    in p_fecha datetime,
    in p_ubicacion varchar(255),
    in p_id_banda int
)
begin
    insert into evento(nombre,descripcion,fecha,ubicacion,id_banda)
    values(p_nombre,p_descripcion,p_fecha,p_ubicacion,p_id_banda);
end $$

create procedure sp_evento_get_all()
begin
    select * from evento;
end $$

create procedure sp_evento_get_by_id(in p_id int)
begin
    select * from evento where id_evento = p_id;
end $$

create procedure sp_evento_update(
    in p_id int,
    in p_nombre varchar(100),
    in p_descripcion text,
    in p_fecha datetime,
    in p_ubicacion varchar(255)
)
begin
    update evento
    set nombre = p_nombre,
        descripcion = p_descripcion,
        fecha = p_fecha,
        ubicacion = p_ubicacion
    where id_evento = p_id;
end $$

create procedure sp_evento_delete(in p_id int)
begin
    delete from evento where id_evento = p_id;
end $$

delimiter ;