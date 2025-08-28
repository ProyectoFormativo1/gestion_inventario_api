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

--Permisos del Modulo de Ciudad
ciudad-table-lista
ciudad-btn-crear
ciudad-btn-eliminar
ciudad-btn-editar
--Permisos del Modulo de CentroFormacion
centroformacion-table-lista
centroformacion-btn-crear
centroformacion-btn-eliminar
centroformacion-btn-editar
--Permisos del Modulo de sedes
sedes-table-lista
sedes-btn-crear
sedes-btn-eliminar
sedes-btn-editar
--Permisos del Modulo de areas
areas-table-lista
areas-btn-crear
areas-btn-eliminar
areas-btn-editar
--Permisos del Modulo de programas
programas-table-lista
programas-btn-crear
programas-btn-eliminar
programas-btn-editar
--Permisos del Modulo de fichas
fichas-table-lista
fichas-btn-crear
fichas-btn-eliminar
fichas-btn-editar
--Permisos del Modulo de ambientes
ambientes-table-lista
ambientes-btn-crear
ambientes-btn-eliminar
ambientes-btn-editar
--Permisos del Modulo de usuarios
usuarios-table-lista
usuarios-btn-crear
usuarios-btn-eliminar
usuarios-btn-editar
--Permisos del Modulo de bodega
bodega-table-lista
bodega-btn-ver
bodega-btn-crear
bodega-btn-eliminar
bodega-btn-editar
--Permisos del Modulo de materiales
materiales-table-lista
materiales-btn-crear
materiales-btn-eliminar
materiales-btn-editar
--Permisos del Modulo de categoria
categoria-table-lista
categoria-btn-crear
categoria-btn-eliminar
categoria-btn-editar
--Permisos del Modulo de movimientos
movimientos-btn-crear
movimientos-btn-eliminar
movimientos-btn-editar
--Permisos del Modulo de roles
roles-table-lista
roles-btn-permiso
roles-btn-crear
roles-btn-eliminar
roles-btn-editar
--Permisos del Modulo de cargo
cargo-table-lista
cargo-btn-crear
cargo-btn-eliminar
cargo-btn-editar