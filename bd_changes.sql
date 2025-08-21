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