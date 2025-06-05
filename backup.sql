--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9 (Ubuntu 16.9-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.9 (Ubuntu 16.9-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.admins (
    id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.admins OWNER TO postgres;

--
-- Name: admins_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.admins_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admins_id_seq OWNER TO postgres;

--
-- Name: admins_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.admins_id_seq OWNED BY public.admins.id;


--
-- Name: equipos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.equipos (
    id integer NOT NULL,
    nombre character varying(50) NOT NULL,
    goles_a_favor character varying(50) DEFAULT 0,
    goles_en_contra character varying(50) DEFAULT 0,
    diferencia_goles character varying(50) DEFAULT 0,
    partidos_jugados character varying(50) DEFAULT 0,
    puntos character varying(50) DEFAULT 0
);


ALTER TABLE public.equipos OWNER TO postgres;

--
-- Name: equipos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.equipos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.equipos_id_seq OWNER TO postgres;

--
-- Name: equipos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.equipos_id_seq OWNED BY public.equipos.id;


--
-- Name: partidos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.partidos (
    id integer NOT NULL,
    equipo_local integer,
    equipo_visitante integer,
    goles_local integer,
    goles_visitante integer,
    jornada integer
);


ALTER TABLE public.partidos OWNER TO postgres;

--
-- Name: partidos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.partidos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.partidos_id_seq OWNER TO postgres;

--
-- Name: partidos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.partidos_id_seq OWNED BY public.partidos.id;


--
-- Name: tabla_posiciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tabla_posiciones (
    equipo_id integer NOT NULL,
    partidos_jugados integer DEFAULT 0,
    ganados integer DEFAULT 0,
    empatados integer DEFAULT 0,
    perdidos integer DEFAULT 0,
    goles_favor integer DEFAULT 0,
    goles_contra integer DEFAULT 0,
    puntos integer DEFAULT 0
);


ALTER TABLE public.tabla_posiciones OWNER TO postgres;

--
-- Name: admins id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins ALTER COLUMN id SET DEFAULT nextval('public.admins_id_seq'::regclass);


--
-- Name: equipos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipos ALTER COLUMN id SET DEFAULT nextval('public.equipos_id_seq'::regclass);


--
-- Name: partidos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partidos ALTER COLUMN id SET DEFAULT nextval('public.partidos_id_seq'::regclass);


--
-- Data for Name: admins; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.admins (id, username, password) FROM stdin;
1	admin1	$2b$10$MRVA5NfxTvRBVhpChRSpDOxyRmtLri5zkjNNenoiRSCDhoQSOiRVK
2	admin2	$2b$10$X8.UwqFGvw.0HVYxtvhodu5hDkoKDSNLa/oHoMMxcXOroYZnUVok2
\.


--
-- Data for Name: equipos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.equipos (id, nombre, goles_a_favor, goles_en_contra, diferencia_goles, partidos_jugados, puntos) FROM stdin;
13	San Lucas F. C.	\N	\N	\N	\N	\N
14	Atlético Juvenil	\N	\N	\N	\N	\N
15	La Cuadra	\N	\N	\N	\N	\N
16	Sazón Mexicano	\N	\N	\N	\N	\N
17	San José	\N	\N	\N	\N	\N
18	Dep. Moca	\N	\N	\N	\N	\N
19	Chamusqueros	\N	\N	\N	\N	\N
20	Milán	\N	\N	\N	\N	\N
21	River	\N	\N	\N	\N	\N
22	Deportivo Alux	\N	\N	\N	\N	\N
\.


--
-- Data for Name: partidos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.partidos (id, equipo_local, equipo_visitante, goles_local, goles_visitante, jornada) FROM stdin;
366	21	20	\N	\N	12
367	19	14	\N	\N	12
368	15	13	\N	\N	12
369	16	17	\N	\N	12
370	22	18	\N	\N	12
\.


--
-- Data for Name: tabla_posiciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tabla_posiciones (equipo_id, partidos_jugados, ganados, empatados, perdidos, goles_favor, goles_contra, puntos) FROM stdin;
\.


--
-- Name: admins_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.admins_id_seq', 2, true);


--
-- Name: equipos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.equipos_id_seq', 22, true);


--
-- Name: partidos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.partidos_id_seq', 370, true);


--
-- Name: admins admins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_pkey PRIMARY KEY (id);


--
-- Name: admins admins_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.admins
    ADD CONSTRAINT admins_username_key UNIQUE (username);


--
-- Name: equipos equipos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipos
    ADD CONSTRAINT equipos_pkey PRIMARY KEY (id);


--
-- Name: partidos partidos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partidos
    ADD CONSTRAINT partidos_pkey PRIMARY KEY (id);


--
-- Name: tabla_posiciones tabla_posiciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tabla_posiciones
    ADD CONSTRAINT tabla_posiciones_pkey PRIMARY KEY (equipo_id);


--
-- Name: partidos partidos_equipo_local_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partidos
    ADD CONSTRAINT partidos_equipo_local_fkey FOREIGN KEY (equipo_local) REFERENCES public.equipos(id);


--
-- Name: partidos partidos_equipo_visitante_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.partidos
    ADD CONSTRAINT partidos_equipo_visitante_fkey FOREIGN KEY (equipo_visitante) REFERENCES public.equipos(id);


--
-- Name: tabla_posiciones tabla_posiciones_equipo_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tabla_posiciones
    ADD CONSTRAINT tabla_posiciones_equipo_id_fkey FOREIGN KEY (equipo_id) REFERENCES public.equipos(id);


--
-- PostgreSQL database dump complete
--

