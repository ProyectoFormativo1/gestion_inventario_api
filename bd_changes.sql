-- Database: PF_inventario
CREATE TABLE public.tipo_movimiento (
    id bigint NOT NULL,
    codigo character varying(20) unique,
    descripcion character varying(100),  --'prestamo', 'baja', 'devolucion', 'compra', 'donacion', 'remision'
    tipo public.tipo_movimiento_enum
);

ALTER TABLE public.tipo_movimiento ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tipo_movimiento_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


ALTER TABLE public.movimientos DROP COLUMN tipo;


-- Asegurar clave primaria
ALTER TABLE public.tipo_movimiento
ADD CONSTRAINT tipo_movimiento_pkey PRIMARY KEY (id);

-- Agregar la FK en movimientos
ALTER TABLE public.movimientos
ADD COLUMN tipo_movimiento_id bigint REFERENCES public.tipo_movimiento(id);


ALTER TABLE public.tipo_movimiento
ADD CONSTRAINT tipo_movimiento_codigo_tipo_key UNIQUE (codigo, tipo);



--Cambios 21 Agosto 2025

ALTER TABLE public.fichas ADD area_id int8 NULL;
ALTER TABLE public.fichas ADD CONSTRAINT fichas_area_id_fkey FOREIGN KEY (area_id) REFERENCES areas(id);
ALTER TABLE public.programas ADD descripcion varchar(50) NULL;

ALTER TABLE public.bodega ADD descripcion varchar(200) NULL;
ALTER TABLE public.bodega ADD responsable varchar(200) NULL;


---Cambios 22 Agosto 2025

ALTER TABLE public.ambientes DROP CONSTRAINT ambientes_ficha_id_fkey;
ALTER TABLE public.ambientes DROP COLUMN ficha_id;

ALTER TABLE public.ambientes ADD area_id int8 NULL;
ALTER TABLE public.ambientes ADD CONSTRAINT ambientes_area_id_fkey FOREIGN KEY (area_id) REFERENCES areas(id);


ALTER TABLE public.fichas ADD ambiente_id int8 NULL;
ALTER TABLE public.fichas ADD CONSTRAINT fichas_ambiente_id_fkey FOREIGN KEY (ambiente_id) REFERENCES ambientes(id);


DELETE FROM public.unidad_medida;
INSERT INTO public.unidad_medida (nombre, simbolo, tipo, descripcion)
VALUES
-- Longitud
('Metro', 'm', 'Longitud', 'Unidad básica de longitud en el SI'),
('Centímetro', 'cm', 'Longitud', 'Equivale a 0.01 metros'),
('Milímetro', 'mm', 'Longitud', 'Equivale a 0.001 metros'),
('Kilómetro', 'km', 'Longitud', 'Equivale a 1000 metros'),

-- Masa
('Gramo', 'g', 'Masa', 'Unidad básica de masa en el SI'),
('Kilogramo', 'kg', 'Masa', 'Equivale a 1000 gramos'),
('Tonelada', 't', 'Masa', 'Equivale a 1000 kilogramos'),
('Miligramo', 'mg', 'Masa', 'Equivale a 0.001 gramos'),

-- Volumen
('Litro', 'L', 'Volumen', 'Unidad de volumen común'),
('Mililitro', 'mL', 'Volumen', 'Equivale a 0.001 litros'),
('Metro cúbico', 'm³', 'Volumen', 'Equivale a 1000 litros'),

-- Tiempo
('Segundo', 's', 'Tiempo', 'Unidad básica de tiempo en el SI'),
('Minuto', 'min', 'Tiempo', 'Equivale a 60 segundos'),
('Hora', 'h', 'Tiempo', 'Equivale a 3600 segundos'),

-- Unidades diversas
('Unidad', 'und', 'Cantidad', 'Unidad de conteo o pieza'),
('Docena', 'doc', 'Cantidad', 'Equivale a 12 unidades'),
('Porcentaje', '%', 'Proporción', 'Parte en cien');


---Cambios 23 Agosto 2025


INSERT INTO public.tipo_movimiento (codigo, descripcion, tipo) VALUES
('prestamo', 'Salida por prestamo', 'salida'),
('baja', 'Salida por baja', 'salida'),
('devolucion', 'Salida por devolucion', 'salida'),
('compra', 'Entrada por compra', 'entrada'),
('donacion', 'Entrada por donacion', 'entrada'),
('remision', 'Entrada por remision', 'entrada'),
('devolucion', 'Entrada por devolucion', 'entrada');


ALTER TABLE public.salidas
    ADD CONSTRAINT salidas_movimiento_id_unique UNIQUE (movimiento_id);


---Cambios 27 Agosto 2025

CREATE TABLE categoria (
  id BIGINT PRIMARY KEY,
  nombre VARCHAR(250),
  codigo_unspsc VARCHAR(50),
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.materiales DROP COLUMN codigo_unspsc;

ALTER TABLE public.materiales ADD categoria_id bigint NULL;
ALTER TABLE public.materiales ADD CONSTRAINT materiales_categoria_id_fkey FOREIGN KEY (categoria_id) REFERENCES categoria(id);

ALTER TABLE public.permisos ADD modulo varchar(150) NULL;

--Nomenclatura = module-componente-permiso


ALTER TABLE public.permisos
ADD CONSTRAINT permisos_nombre_key UNIQUE (nombre);

-- Permisos del Modulo de Ciudad
INSERT INTO public.permisos (nombre, descripcion, modulo) VALUES
('ciudad-table-lista', 'Permite ver la lista de ciudades', 'ciudad'),
('ciudad-btn-crear', 'Permite crear una ciudad', 'ciudad'),
('ciudad-btn-eliminar', 'Permite eliminar una ciudad', 'ciudad'),
('ciudad-btn-editar', 'Permite editar una ciudad', 'ciudad');

-- Permisos del Modulo de CentroFormacion
INSERT INTO public.permisos (nombre, descripcion, modulo) VALUES
('centroformacion-table-lista', 'Permite ver la lista de centros de formación', 'centroformacion'),
('centroformacion-btn-crear', 'Permite crear un centro de formación', 'centroformacion'),
('centroformacion-btn-eliminar', 'Permite eliminar un centro de formación', 'centroformacion'),
('centroformacion-btn-editar', 'Permite editar un centro de formación', 'centroformacion');

-- Permisos del Modulo de Sedes
INSERT INTO public.permisos (nombre, descripcion, modulo) VALUES
('sedes-table-lista', 'Permite ver la lista de sedes', 'sedes'),
('sedes-btn-crear', 'Permite crear una sede', 'sedes'),
('sedes-btn-eliminar', 'Permite eliminar una sede', 'sedes'),
('sedes-btn-editar', 'Permite editar una sede', 'sedes');

-- Permisos del Modulo de Areas
INSERT INTO public.permisos (nombre, descripcion, modulo) VALUES
('areas-table-lista', 'Permite ver la lista de áreas', 'areas'),
('areas-btn-crear', 'Permite crear un área', 'areas'),
('areas-btn-eliminar', 'Permite eliminar un área', 'areas'),
('areas-btn-editar', 'Permite editar un área', 'areas');

-- Permisos del Modulo de Programas
INSERT INTO public.permisos (nombre, descripcion, modulo) VALUES
('programas-table-lista', 'Permite ver la lista de programas', 'programas'),
('programas-btn-crear', 'Permite crear un programa', 'programas'),
('programas-btn-eliminar', 'Permite eliminar un programa', 'programas'),
('programas-btn-editar', 'Permite editar un programa', 'programas');

-- Permisos del Modulo de Fichas
INSERT INTO public.permisos (nombre, descripcion, modulo) VALUES
('fichas-table-lista', 'Permite ver la lista de fichas', 'fichas'),
('fichas-btn-crear', 'Permite crear una ficha', 'fichas'),
('fichas-btn-eliminar', 'Permite eliminar una ficha', 'fichas'),
('fichas-btn-editar', 'Permite editar una ficha', 'fichas');

-- Permisos del Modulo de Ambientes
INSERT INTO public.permisos (nombre, descripcion, modulo) VALUES
('ambientes-table-lista', 'Permite ver la lista de ambientes', 'ambientes'),
('ambientes-btn-crear', 'Permite crear un ambiente', 'ambientes'),
('ambientes-btn-eliminar', 'Permite eliminar un ambiente', 'ambientes'),
('ambientes-btn-editar', 'Permite editar un ambiente', 'ambientes');

-- Permisos del Modulo de Usuarios
INSERT INTO public.permisos (nombre, descripcion, modulo) VALUES
('usuarios-table-lista', 'Permite ver la lista de usuarios', 'usuarios'),
('usuarios-btn-crear', 'Permite crear un usuario', 'usuarios'),
('usuarios-btn-eliminar', 'Permite eliminar un usuario', 'usuarios'),
('usuarios-btn-editar', 'Permite editar un usuario', 'usuarios');

-- Permisos del Modulo de Bodega
INSERT INTO public.permisos (nombre, descripcion, modulo) VALUES
('bodega-table-lista', 'Permite ver la lista de bodegas', 'bodega'),
('bodega-btn-vermateriales', 'Permite ver materiales en la bodega', 'bodega'),
('bodega-btn-crear', 'Permite crear una bodega', 'bodega'),
('bodega-btn-eliminar', 'Permite eliminar una bodega', 'bodega'),
('bodega-btn-editar', 'Permite editar una bodega', 'bodega');

-- Permisos del Modulo de Materiales
INSERT INTO public.permisos (nombre, descripcion, modulo) VALUES
('materiales-table-lista', 'Permite ver la lista de materiales', 'materiales'),
('materiales-btn-crear', 'Permite crear un material', 'materiales'),
('materiales-btn-eliminar', 'Permite eliminar un material', 'materiales'),
('materiales-btn-editar', 'Permite editar un material', 'materiales');

-- Permisos del Modulo de Categoria
INSERT INTO public.permisos (nombre, descripcion, modulo) VALUES
('categoria-table-lista', 'Permite ver la lista de categorías', 'categoria'),
('categoria-btn-crear', 'Permite crear una categoría', 'categoria'),
('categoria-btn-eliminar', 'Permite eliminar una categoría', 'categoria'),
('categoria-btn-editar', 'Permite editar una categoría', 'categoria');

-- Permisos del Modulo de Movimientos
INSERT INTO public.permisos (nombre, descripcion, modulo) VALUES
('movimientos-table-listar', 'Permite listar movimientos', 'movimientos');

-- Permisos del Modulo de Roles
INSERT INTO public.permisos (nombre, descripcion, modulo) VALUES
('roles-table-lista', 'Permite ver la lista de roles', 'roles'),
('roles-btn-permiso', 'Permite asignar permisos a un rol', 'roles'),
('roles-btn-crear', 'Permite crear un rol', 'roles'),
('roles-btn-eliminar', 'Permite eliminar un rol', 'roles'),
('roles-btn-editar', 'Permite editar un rol', 'roles');

-- Permisos del Modulo de Cargo
INSERT INTO public.permisos (nombre, descripcion, modulo) VALUES
('cargo-table-lista', 'Permite ver la lista de cargos', 'cargo'),
('cargo-btn-crear', 'Permite crear un cargo', 'cargo'),
('cargo-btn-eliminar', 'Permite eliminar un cargo', 'cargo'),
('cargo-btn-editar', 'Permite editar un cargo', 'cargo');

-- Permisos del Modulo de Estadistica
INSERT INTO public.permisos (nombre, descripcion, modulo) VALUES
('estadistica-report-ver', 'Permite ver los reportes de estadísticas', 'estadistica');


INSERT INTO public.roles (nombre, codigo)
VALUES ('Root', 'ROOT')
ON CONFLICT (codigo) DO NOTHING;


-- Asignar todos los permisos al rol Root (sin importar cuál sea su id)
INSERT INTO public.rol_permisos (rol_id, permiso_id)
SELECT r.id, p.id
FROM public.permisos p
CROSS JOIN public.roles r
WHERE r.codigo = 'ROOT'
ON CONFLICT DO NOTHING;


ALTER TABLE public.categoria ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.categoria_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
