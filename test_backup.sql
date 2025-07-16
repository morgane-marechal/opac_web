--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE root;
ALTER ROLE root WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'md5b4b8daf4b8ea9d39568719e1e320076f';






--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 13.20 (Debian 13.20-1.pgdg120+1)
-- Dumped by pg_dump version 13.20 (Debian 13.20-1.pgdg120+1)

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

--
-- PostgreSQL database dump complete
--

--
-- Database "app" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 13.20 (Debian 13.20-1.pgdg120+1)
-- Dumped by pg_dump version 13.20 (Debian 13.20-1.pgdg120+1)

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

--
-- Name: app; Type: DATABASE; Schema: -; Owner: root
--

CREATE DATABASE app WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE app OWNER TO root;

\connect app

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

--
-- Name: adonis_schema_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.adonis_schema_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.adonis_schema_id_seq OWNER TO root;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: adonis_schema; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.adonis_schema (
    id integer DEFAULT nextval('public.adonis_schema_id_seq'::regclass) NOT NULL,
    name character varying(255) NOT NULL,
    batch integer NOT NULL,
    migration_time timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.adonis_schema OWNER TO root;

--
-- Name: adonis_schema_versions; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.adonis_schema_versions (
    version integer NOT NULL
);


ALTER TABLE public.adonis_schema_versions OWNER TO root;

--
-- Name: auth_access_tokens; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.auth_access_tokens (
    id integer NOT NULL,
    tokenable_id integer NOT NULL,
    type character varying(255) NOT NULL,
    name character varying(255),
    hash character varying(255) NOT NULL,
    abilities text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    last_used_at timestamp with time zone,
    expires_at timestamp with time zone
);


ALTER TABLE public.auth_access_tokens OWNER TO root;

--
-- Name: auth_access_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.auth_access_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.auth_access_tokens_id_seq OWNER TO root;

--
-- Name: auth_access_tokens_id_seq1; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.auth_access_tokens_id_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_access_tokens_id_seq1 OWNER TO root;

--
-- Name: auth_access_tokens_id_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.auth_access_tokens_id_seq1 OWNED BY public.auth_access_tokens.id;


--
-- Name: autors_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.autors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.autors_id_seq OWNER TO root;

--
-- Name: autors; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.autors (
    id integer DEFAULT nextval('public.autors_id_seq'::regclass) NOT NULL,
    name character varying(255),
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.autors OWNER TO root;

--
-- Name: books; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.books (
    id integer NOT NULL,
    editor_id integer,
    title character varying(255) NOT NULL,
    description text,
    isbn character varying(255),
    cover character varying(255),
    dewey_indice integer,
    pdf character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.books OWNER TO root;

--
-- Name: books_autors_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.books_autors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.books_autors_id_seq OWNER TO root;

--
-- Name: books_autors; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.books_autors (
    id integer DEFAULT nextval('public.books_autors_id_seq'::regclass) NOT NULL,
    book_id integer,
    autor_id integer,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.books_autors OWNER TO root;

--
-- Name: books_copies_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.books_copies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.books_copies_id_seq OWNER TO root;

--
-- Name: books_copies; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.books_copies (
    id integer DEFAULT nextval('public.books_copies_id_seq'::regclass) NOT NULL,
    books_id integer,
    state integer,
    created_at timestamp with time zone
);


ALTER TABLE public.books_copies OWNER TO root;

--
-- Name: books_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.books_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.books_id_seq OWNER TO root;

--
-- Name: books_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.books_id_seq OWNED BY public.books.id;


--
-- Name: comments; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    book_id integer,
    user_id integer,
    description text,
    canceled boolean DEFAULT false,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.comments OWNER TO root;

--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_id_seq OWNER TO root;

--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: editors; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.editors (
    id integer NOT NULL,
    name character varying(255),
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.editors OWNER TO root;

--
-- Name: editors_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.editors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.editors_id_seq OWNER TO root;

--
-- Name: editors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.editors_id_seq OWNED BY public.editors.id;


--
-- Name: emprunts; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.emprunts (
    id integer NOT NULL,
    user_id integer,
    book_copy_id integer,
    borrow_date timestamp with time zone NOT NULL,
    planned_return_date timestamp with time zone NOT NULL,
    actual_return_date timestamp with time zone,
    status integer DEFAULT 1 NOT NULL,
    notes text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.emprunts OWNER TO root;

--
-- Name: emprunts_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.emprunts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.emprunts_id_seq OWNER TO root;

--
-- Name: emprunts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.emprunts_id_seq OWNED BY public.emprunts.id;


--
-- Name: favorises; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.favorises (
    id integer NOT NULL,
    book_id integer,
    user_id integer,
    state integer,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.favorises OWNER TO root;

--
-- Name: favorises_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.favorises_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.favorises_id_seq OWNER TO root;

--
-- Name: favorises_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.favorises_id_seq OWNED BY public.favorises.id;


--
-- Name: gender_books_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.gender_books_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.gender_books_id_seq OWNER TO root;

--
-- Name: gender_books; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.gender_books (
    id integer DEFAULT nextval('public.gender_books_id_seq'::regclass) NOT NULL,
    book_id integer,
    gender_id integer
);


ALTER TABLE public.gender_books OWNER TO root;

--
-- Name: genders_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.genders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.genders_id_seq OWNER TO root;

--
-- Name: genders; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.genders (
    id integer DEFAULT nextval('public.genders_id_seq'::regclass) NOT NULL,
    name character varying(255)
);


ALTER TABLE public.genders OWNER TO root;

--
-- Name: reservations; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.reservations (
    id integer NOT NULL,
    book_id integer,
    user_id integer,
    canceled boolean DEFAULT false,
    "beginDate" timestamp with time zone,
    "endDate" timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE public.reservations OWNER TO root;

--
-- Name: reservations_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.reservations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reservations_id_seq OWNER TO root;

--
-- Name: reservations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.reservations_id_seq OWNED BY public.reservations.id;


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO root;

--
-- Name: users; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.users (
    id integer DEFAULT nextval('public.users_id_seq'::regclass) NOT NULL,
    full_name character varying(255),
    email character varying(254) NOT NULL,
    password character varying(255) NOT NULL,
    "right" integer DEFAULT 1 NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone
);


ALTER TABLE public.users OWNER TO root;

--
-- Name: auth_access_tokens id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.auth_access_tokens ALTER COLUMN id SET DEFAULT nextval('public.auth_access_tokens_id_seq1'::regclass);


--
-- Name: books id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.books ALTER COLUMN id SET DEFAULT nextval('public.books_id_seq'::regclass);


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: editors id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.editors ALTER COLUMN id SET DEFAULT nextval('public.editors_id_seq'::regclass);


--
-- Name: emprunts id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.emprunts ALTER COLUMN id SET DEFAULT nextval('public.emprunts_id_seq'::regclass);


--
-- Name: favorises id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.favorises ALTER COLUMN id SET DEFAULT nextval('public.favorises_id_seq'::regclass);


--
-- Name: reservations id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.reservations ALTER COLUMN id SET DEFAULT nextval('public.reservations_id_seq'::regclass);


--
-- Data for Name: adonis_schema; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.adonis_schema (id, name, batch, migration_time) FROM stdin;
5	database/migrations/1733310135454_create_users_table	5	2024-12-04 15:18:45.798989+00
9	database/migrations/1733409194508_create_editors_table	8	2024-12-05 14:40:45.624873+00
10	database/migrations/1733409217543_create_autors_table	8	2024-12-05 14:40:45.682261+00
17	database/migrations/1733479626854_create_books_table	15	2024-12-06 10:07:50.521762+00
18	database/migrations/1733491303670_create_genders_table	16	2024-12-06 13:24:26.49047+00
19	database/migrations/1733492848134_create_gender_books_table	17	2024-12-06 13:49:57.585406+00
21	database/migrations/1735314490453_create_books_autors_table	18	2025-01-09 14:35:21.436884+00
24	database/migrations/1738425811423_create_books_copies_table	19	2025-02-12 08:59:07.629058+00
6	database/migrations/1744820922237_create_auth_access_tokens_table	20	2025-04-16 16:38:51.295196+00
8	database/migrations/1748271498805_create_reservations_table	21	2025-05-26 15:09:12.531405+00
13	database/migrations/1748272802194_create_comments_table	22	2025-05-26 15:31:11.207784+00
14	database/migrations/1748274572145_create_favorises_table	23	2025-05-26 15:50:30.118009+00
15	database/migrations/1751900707192_create_emprunts_table	24	2025-07-08 08:29:26.206659+00
\.


--
-- Data for Name: adonis_schema_versions; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.adonis_schema_versions (version) FROM stdin;
2
\.


--
-- Data for Name: auth_access_tokens; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.auth_access_tokens (id, tokenable_id, type, name, hash, abilities, created_at, updated_at, last_used_at, expires_at) FROM stdin;
1	5	auth_token	\N	d8e846dedc56674f99f18ed0a05772d378202b8b9a233a8cd5e6b3429b2ca822	["*"]	2025-04-16 16:39:12.782+00	2025-04-16 16:39:12.782+00	\N	\N
2	5	auth_token	\N	aeaf229b78cbec395979370d8901721788216b5a7aa7c7eb9def60695c374d01	["*"]	2025-04-16 16:45:20.688+00	2025-04-16 16:45:20.688+00	\N	\N
3	5	auth_token	\N	2436216d3d0f08ffa3c243f02c38a693c663260a5673c156684a569282bb5b82	["*"]	2025-04-16 16:46:15.794+00	2025-04-16 16:46:15.794+00	\N	\N
4	5	auth_token	\N	c8adf8afc2e1f297fa26f78fd5512f1aa5748651366c9759aa2b9647e56cbbb7	["*"]	2025-04-16 16:47:33.387+00	2025-04-16 16:47:33.387+00	\N	\N
5	5	auth_token	\N	c948916698d3cf7d128c280213f8b0dbef77597194252f00dec2e272d39e1ada	["*"]	2025-04-16 16:48:01.755+00	2025-04-16 16:48:01.755+00	\N	\N
6	5	auth_token	\N	d04484c5eae354cf9fe8d0e847cd7a845480552caa7b1a03091781d53b8983e1	["*"]	2025-04-16 16:49:05.425+00	2025-04-16 16:49:05.425+00	\N	\N
7	5	auth_token	\N	e9ce9f636afd312fc92dc04f0db15ac020690207a29610008b6c2b2844bbf826	["*"]	2025-04-16 16:49:29.712+00	2025-04-16 16:49:29.712+00	\N	\N
8	5	auth_token	\N	ada1287a63797895cdbc4c0400df81acb467da7b4bf40ecbdb3b44902a26c7c8	["*"]	2025-04-16 16:51:25.876+00	2025-04-16 16:51:25.876+00	\N	\N
9	5	auth_token	\N	bc2a31216b3acda3c4c7063b93c606a5f5e39994f787517142a770b2c4508667	["*"]	2025-04-16 16:52:45.582+00	2025-04-16 16:52:45.582+00	\N	\N
10	5	auth_token	\N	6ba92b807b6992a7d2aee4731d82f839e1d91c6aebc8c64720b1302be57161ef	["*"]	2025-04-16 16:53:13.434+00	2025-04-16 16:53:13.434+00	\N	\N
11	5	auth_token	\N	070dfbfbd3d07a28c7d3f3ead1df5beace96df458613d239d958237e83f93514	["*"]	2025-04-16 16:53:38.14+00	2025-04-16 16:53:38.14+00	\N	\N
12	6	auth_token	\N	e1652efc9ce58d57e118a7465b2672a4b1ecf2feca14041e8a475a472eb2d636	["*"]	2025-04-16 16:55:35.241+00	2025-04-16 16:55:35.241+00	\N	\N
13	6	auth_token	\N	cb97c0d7108cbeebbe58f2891b358c2e9acc6b9265c8a038af4216b99a17d78b	["*"]	2025-04-16 17:02:01.823+00	2025-04-16 17:02:01.823+00	\N	\N
14	6	auth_token	\N	b2db61e2731a712d62bab829f3a7e8e56faabe93f7b5b823133561be31fdf71c	["*"]	2025-04-16 17:02:24.33+00	2025-04-16 17:02:24.33+00	\N	\N
15	6	auth_token	\N	15d616cf87433d26598c9ad2ae6af06241d8994702c3c74de0462c6a39b5e3df	["*"]	2025-04-22 09:23:43.454+00	2025-04-22 09:23:43.454+00	\N	\N
16	6	auth_token	\N	3fc52b51778b72fbc6e8ff98531947d21629e23265c1ee4fb5513e7e806912fd	["*"]	2025-04-22 09:30:07.123+00	2025-04-22 09:30:07.123+00	\N	\N
17	6	auth_token	\N	5d4070a9a4a87250fea542d5408bf0d0ee0939ad7ee884dca1174f1c0245458c	["*"]	2025-04-22 09:30:20.97+00	2025-04-22 09:30:20.97+00	\N	\N
18	6	auth_token	\N	60dd42eb9f328c775b2065dd8771b15c00ec9d0476bbe9aec50a6e23563712be	["*"]	2025-04-22 14:15:56.379+00	2025-04-22 14:15:56.379+00	\N	\N
19	6	auth_token	\N	7f297cb449b8d12d0fceedf7a0ccd3c940053eea9e0542a5effd72ca397cf9f1	["*"]	2025-04-22 14:25:03.887+00	2025-04-22 14:25:03.887+00	\N	\N
20	6	auth_token	\N	dca55789c939ce8f12fd90f35e790a664601b9d61d5441d9f268a014607baa58	["*"]	2025-05-01 12:57:32.971+00	2025-05-01 12:57:32.971+00	\N	\N
21	6	auth_token	\N	c4a085facc2319344a206e7dd30b15ffceedf68ca9d0c5c3a6da3aa2a073d2de	["*"]	2025-05-09 12:07:44.903+00	2025-05-09 12:07:44.903+00	\N	\N
22	14	auth_token	\N	0bb6c49484875010f818da1c755554883a56a021712af113ccf3d626c0bb8859	["*"]	2025-05-11 14:45:15.522+00	2025-05-11 14:45:15.522+00	\N	\N
23	14	auth_token	\N	a294d91fe96b0153b0589ec312284732cbf814d0a89c33d4d711bb396c1c2296	["*"]	2025-05-11 15:06:32.898+00	2025-05-11 15:06:32.898+00	\N	\N
24	14	auth_token	\N	9fa826252691d748b455f078e98652dca7202811666b16f4043676409c0e494a	["*"]	2025-05-11 15:09:35.035+00	2025-05-11 15:09:35.035+00	\N	\N
25	14	auth_token	\N	78804ae70125b969c6bf13102fd9b1cb013a7212e0dd32fea9bc02b8cef47523	["*"]	2025-05-11 15:11:03.244+00	2025-05-11 15:11:03.244+00	\N	\N
26	14	auth_token	\N	a6808d136c3b81052c701ce23cc86465d1f95f125b5952a76d56f220ca40d66d	["*"]	2025-05-11 15:18:24.817+00	2025-05-11 15:18:24.817+00	\N	\N
27	14	auth_token	\N	c7b06606fb51b5036b246c401831d93d4ca838baf9f3ee684d4c6d04b7d9aaf7	["*"]	2025-05-11 15:23:39.271+00	2025-05-11 15:23:39.271+00	\N	\N
28	14	auth_token	\N	71b4a84773c48984a7e121092e69e39a8bd720722510e014f03d6196827d357e	["*"]	2025-05-11 15:25:08.067+00	2025-05-11 15:25:08.067+00	\N	\N
29	14	auth_token	\N	4b25a25bba71018b467fb6bce166054d50176676846f458981814898e68ef489	["*"]	2025-05-11 15:33:34.706+00	2025-05-11 15:33:34.706+00	\N	\N
30	14	auth_token	\N	b8ce30b9bb5ce92ba23f77a086c3ee73b04ad32ad0ab996d288be16a573cd49f	["*"]	2025-05-11 15:37:21.665+00	2025-05-11 15:37:21.665+00	\N	\N
31	14	auth_token	\N	4f3bebd2b08e0307c3b735177c001b863ea75aa0bdf063e52c12dcce18b91557	["*"]	2025-05-11 15:38:05.032+00	2025-05-11 15:38:05.032+00	\N	\N
32	14	auth_token	\N	3d31bab914b744c8b3f97938090cc0c646faa3b8a9e2554cf92b1e7b083cc6bc	["*"]	2025-05-11 15:43:45.588+00	2025-05-11 15:43:45.588+00	\N	\N
33	14	auth_token	\N	a9ae0437bdcf4c2c7ec8dcf5de29fcff0df4941eb82e4789b64c8cd13e8ce0e9	["*"]	2025-05-11 15:45:40.296+00	2025-05-11 15:45:40.296+00	\N	\N
34	14	auth_token	\N	aa77afeda4008bb0b3a093cf36e631378a2266a1bf3f5e92b92640dad711d238	["*"]	2025-05-11 15:51:50.102+00	2025-05-11 15:51:50.102+00	\N	\N
35	14	auth_token	\N	b4480a82a1014e20a25c4b85c1dd02f16d369f57065e461fcde4b9fffbde6838	["*"]	2025-05-11 15:59:08.987+00	2025-05-11 15:59:08.987+00	\N	\N
36	14	auth_token	\N	faea7aaf4cf09e18521996542390d0f89587d4b4dc3c2315dca432d63ea67b5e	["*"]	2025-05-11 15:59:21.611+00	2025-05-11 15:59:21.611+00	\N	\N
37	14	auth_token	\N	39a3deaf5171ca3674c18ce3f1dd3a6e13cb9801d8c89354f4b3a5df3f13d6c2	["*"]	2025-05-11 16:24:47.036+00	2025-05-11 16:24:47.036+00	\N	\N
38	14	auth_token	\N	477b42243d02671b0e66b78255c437c2f02ce7547d917f86aeb8657a4b5e2026	["*"]	2025-05-11 16:29:17.494+00	2025-05-11 16:29:17.494+00	\N	\N
39	14	auth_token	\N	10f4ef13f1682ff519f0ac78047d1dba3a30fcba0e02d5b8d877e027ef9f6f09	["*"]	2025-05-11 16:32:18.557+00	2025-05-11 16:32:18.557+00	\N	\N
40	14	auth_token	\N	d73f646de582d6d6ab6c8d322d0a9015dac08f95080c320a7ef58e309ba9a11c	["*"]	2025-05-11 16:32:49.701+00	2025-05-11 16:32:49.701+00	\N	\N
41	14	auth_token	\N	9e6ed511d79b5034d582ae940b9d32e19fe0a3fa8890ccb3cf98f3f8075a1700	["*"]	2025-05-11 16:33:27.079+00	2025-05-11 16:33:27.079+00	\N	\N
42	14	auth_token	\N	d5c5391469e534997da9f0bfecef4a501eb046d1a41b6277f888a85c7d533cd2	["*"]	2025-05-11 16:42:06.012+00	2025-05-11 16:42:06.012+00	\N	\N
43	14	auth_token	\N	0d58728ff6e2029909ca6d90b08f6427711e62de1e01133f34a28f38677dbff0	["*"]	2025-05-26 14:29:25.992+00	2025-05-26 14:29:25.992+00	\N	\N
44	15	auth_token	\N	629a9e233b4c848e9fbbec06593cc7dfdc7ce646101c53d26b90cf31c368497e	["*"]	2025-05-26 14:48:05.946+00	2025-05-26 14:48:05.946+00	\N	\N
45	17	auth_token	\N	0d9bf6671eedb097a9a8169e9c874e84b0a331d1d13b84ffe90c2d0d0d8eef4d	["*"]	2025-07-03 13:39:25.635+00	2025-07-03 13:39:25.635+00	\N	\N
46	21	auth_token	\N	2a23b7b2f7aea78a433ecadb8082b6bc81f17b00a9de197c0d2b61ca7d33212f	["*"]	2025-07-03 15:09:39.146+00	2025-07-03 15:09:39.146+00	\N	\N
47	18	auth_token	\N	2fa3bbc63fed512e9bda158a73aa924eb75da5dcdb62d0044f64fab2c0b5b73b	["*"]	2025-07-07 15:00:05.197+00	2025-07-07 15:00:05.197+00	\N	\N
\.


--
-- Data for Name: autors; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.autors (id, name, created_at, updated_at) FROM stdin;
1	John Smith	2024-12-05 15:36:45.520856+00	2024-12-05 15:36:45.520856+00
2	Jane Doe	2024-12-05 15:36:45.520856+00	2024-12-05 15:36:45.520856+00
3	Alice Johnson	2024-12-05 15:36:45.520856+00	2024-12-05 15:36:45.520856+00
4	Robert Brown	2024-12-05 15:36:45.520856+00	2024-12-05 15:36:45.520856+00
5	Emily Davis	2024-12-05 15:36:45.520856+00	2024-12-05 15:36:45.520856+00
6	Michael Wilson	2024-12-05 15:36:45.520856+00	2024-12-05 15:36:45.520856+00
7	Jessica Martinez	2024-12-05 15:36:45.520856+00	2024-12-05 15:36:45.520856+00
8	Daniel Garcia	2024-12-05 15:36:45.520856+00	2024-12-05 15:36:45.520856+00
9	Sophia Lee	2024-12-05 15:36:45.520856+00	2024-12-05 15:36:45.520856+00
10	James Anderson	2024-12-05 15:36:45.520856+00	2024-12-05 15:36:45.520856+00
11	Marie Dureas	\N	\N
12	Laura Vasquez	\N	\N
\.


--
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.books (id, editor_id, title, description, isbn, cover, dewey_indice, pdf, created_at, updated_at) FROM stdin;
53	1	L’Éveil des Héroïnes	Roman sur des femmes ordinaires qui deviennent des héroïnes inattendues.	978-1-56789-001-3	\N	403	eveil_heroines.pdf	2025-01-10 12:00:00+00	2025-01-10 12:00:00+00
54	2	La Force des Silencieuses	Essais sur des personnes souvent ignorées mais incroyablement influentes.	978-1-56789-001-4	\N	404	force_silencieuses.pdf	2025-01-10 12:00:00+00	2025-01-10 12:00:00+00
55	1	Horizon Féminin	Roman sur un monde où les femmes réécrivent les règles de la société.	978-1-56789-001-5	\N	405	horizon_feminin.pdf	2025-01-10 12:00:00+00	2025-01-10 12:00:00+00
56	2	Révolutions Intimes	Essais sur les petites révolutions qui transforment la vie des femmes.	978-1-56789-001-6	\N	406	revolutions_intimes.pdf	2025-01-10 12:00:00+00	2025-01-10 12:00:00+00
57	1	La Maison des Échos	Roman sur une communauté de femmes qui redéfinit la famille et l’entraide.	978-1-56789-001-7	\N	407	maison_echos.pdf	2025-01-10 12:00:00+00	2025-01-10 12:00:00+00
58	2	Manifeste pour Nos Mères	Essais sur les sacrifices et contributions des générations de femmes passées.	978-1-56789-001-8	\N	408	manifeste_meres.pdf	2025-01-10 12:00:00+00	2025-01-10 12:00:00+00
59	1	Les Jardins du Courage	Roman poétique sur une communauté de Fayries qui trouvent leur force dans l’adversité.	978-1-56789-001-9	\N	409	jardins_courage.pdf	2025-01-10 12:00:00+00	2025-01-10 12:00:00+00
60	2	Une Histoire Cachée	Essais sur les femmes qui ont façonné l’histoire dans l’ombre.	978-1-56789-002-0	\N	410	histoire_cachee.pdf	2025-01-10 12:00:00+00	2025-01-10 12:00:00+00
61	1	Les Tisseuses de Destin	Roman fantastique sur des femmes qui contrôlent les fils du destin.	978-1-56789-002-1	\N	411	tisseuses_destin.pdf	2025-01-10 12:00:00+00	2025-01-10 12:00:00+00
62	2	Éclats de Verre	Essais sur la brisure des plafonds de verre dans les domaines dominés par les hommes.	978-1-56789-002-2	\N	412	eclats_verre.pdf	2025-01-10 12:00:00+00	2025-01-10 12:00:00+00
63	1	Les Héritières du Feu	Roman sur des femmes courageuses qui luttent pour leur liberté.	978-1-56789-002-3	\N	413	heritières_feu.pdf	2025-01-10 12:00:00+00	2025-01-10 12:00:00+00
64	2	Puissances Invisibles	Essais sur les forces discrètes mais déterminantes des femmes dans la société.	978-1-56789-002-4	\N	414	puissances_invisibles.pdf	2025-01-10 12:00:00+00	2025-01-10 12:00:00+00
65	1	Larmes de Soleil	Roman poignant sur des femmes luttant pour une vie meilleure dans un monde hostile.	978-1-56789-002-5	\N	415	larmes_soleil.pdf	2025-01-10 12:00:00+00	2025-01-10 12:00:00+00
66	2	Les Racines Féminines	Essais explorant le rôle des femmes dans les traditions et rituels ancestraux.	978-1-56789-002-6	\N	416	racines_feminines.pdf	2025-01-10 12:00:00+00	2025-01-10 12:00:00+00
31	1	The Art of Programming	Comprehensive guide to modern programming practices and algorithms.	978-0-123456-47-2	\N	500	programming.pdf	2024-12-05 15:32:22.266767+00	2024-12-05 15:32:22.266767+00
32	2	Mastering Databases	A deep dive into database systems and architecture.	978-1-234567-89-3	\N	300	databases.pdf	2024-12-05 15:32:22.266767+00	2024-12-05 15:32:22.266767+00
33	1	Introduction to AI	Basics of artificial intelligence and machine learning.	978-2-345678-91-4	\N	600	ai_basics.pdf	2024-12-05 15:32:22.266767+00	2024-12-05 15:32:22.266767+00
34	1	Networking Essentials	Fundamentals of computer networks and security.	978-3-456789-01-5	\N	400	networking.pdf	2024-12-05 15:32:22.266767+00	2024-12-05 15:32:22.266767+00
35	1	Cloud Computing Explained	A practical approach to cloud technologies and services.	978-4-567890-12-6	\N	350	cloud.pdf	2024-12-05 15:32:22.266767+00	2024-12-05 15:32:22.266767+00
36	2	Cybersecurity Handbook	Essential strategies for protecting information systems.	978-5-678901-23-7	\N	450	cybersecurity.pdf	2024-12-05 15:32:22.266767+00	2024-12-05 15:32:22.266767+00
37	1	Web Development Guide	Step-by-step guide to modern web development.	978-6-789012-34-8	\N	200	web_dev.pdf	2024-12-05 15:32:22.266767+00	2024-12-05 15:32:22.266767+00
38	2	Data Science for All	Introductory book on data science techniques and tools.	978-7-890123-45-9	\N	700	data_science.pdf	2024-12-05 15:32:22.266767+00	2024-12-05 15:32:22.266767+00
39	2	Agile Project Management	Guide to implementing agile methodologies.	978-8-901234-56-0	\N	650	agile.pdf	2024-12-05 15:32:22.266767+00	2024-12-05 15:32:22.266767+00
40	1	Quantum Computing Basics	Understanding quantum computing concepts and applications.	978-9-012345-67-1	\N	800	quantum.pdf	2024-12-05 15:32:22.266767+00	2024-12-05 15:32:22.266767+00
1	1	La Reine des Brumes	Une épopée fascinante à travers un royaume perdu dans la brume éternelle.	978-1-12345-678-9	\N	813	reine_des_brumes.pdf	2024-12-06 10:18:28.711496+00	2024-12-06 10:18:28.711496+00
2	2	Ombres sur Nagasaki	Une guerre secrète menée par des clans de sorcières dans le Japon médiéval.	978-1-12345-679-6	\N	813	ombres_sur_nagasaki.pdf	2024-12-06 10:18:28.711496+00	2024-12-06 10:18:28.711496+00
3	1	Le Grimoire d"Arven	Une quête périlleuse pour retrouver un grimoire magique perdu.	978-1-12345-680-2	\N	813	grimoire_arven.pdf	2024-12-06 10:18:28.711496+00	2024-12-06 10:18:28.711496+00
4	2	Furtună și Foc	Une saga épique sur un royaume en proie à des dragons et à des intrigues politiques.	978-1-12345-681-9	\N	813	furtuna_si_foc.pdf	2024-12-06 10:18:28.711496+00	2024-12-06 10:18:28.711496+00
5	1	L"Étoile de Minuit	Une guerrière solitaire doit protéger une étoile tombée du ciel.	978-1-12345-682-5	\N	813	etoile_minuit.pdf	2024-12-06 10:18:28.711496+00	2024-12-06 10:18:28.711496+00
6	2	Kaze no Shiro	Une histoire de vengeance et de rédemption dans un château hanté.	978-1-12345-683-2	\N	813	kaze_no_shiro.pdf	2024-12-06 10:18:28.711496+00	2024-12-06 10:18:28.711496+00
7	1	Les Larmes d"Edea	Un monde fantastique menacé par une mystérieuse maladie.	978-1-12345-684-9	\N	813	larmes_edea.pdf	2024-12-06 10:18:28.711496+00	2024-12-06 10:18:28.711496+00
8	2	Visul de Aur	Une prophétie ancienne menace de détruire le royaume des rêves.	978-1-12345-685-6	\N	813	visul_de_aur.pdf	2024-12-06 10:18:28.711496+00	2024-12-06 10:18:28.711496+00
9	1	La Sorcière de Paris	Une jeune femme découvre qu"elle est l"héritière d"un ancien pouvoir magique.	978-1-12345-686-3	\N	813	sorciere_paris.pdf	2024-12-06 10:18:28.711496+00	2024-12-06 10:18:28.711496+00
10	2	Flacăra și Umbra	Un pacte dangereux entre une prêtresse et une ombre mystérieuse.	978-1-12345-687-0	\N	813	flacara_si_umbra.pdf	2024-12-06 10:18:28.711496+00	2024-12-06 10:18:28.711496+00
11	2	L'amour logique	bla bla bla	123412341234	\N	123	\N	2025-01-08 13:50:23.218371+00	2025-01-08 13:50:23.218371+00
41	3	Les fées metals	Une fée est un être légendaire, généralement décrit comme anthropomorphe et féminin, d'une grande beauté, capable de conférer des dons aux nouveau-nés, de voler dans les airs, de lancer des sorts et d'influencer le futur. L'idée que l'homme se fait des fées varie selon les cultures et les pays : revenantes, anges déchus, élémentaires ou même humaines, minuscules ou immenses, toutes sont étroitement liées aux forces de la nature et au concept de monde parallèle. La Befana, la Dame blanche, les sirènes, les nymphes, Morgane, Viviane et une grande variété d'êtres et de créatures généralement féminines peuvent être considérés comme des « fées ». Les Anglo-Saxons utilisent le nom fairies pour désigner les fées, mais également toutes les petites créatures anthropomorphes du folklore païen telles que les lutins, les nains et les elfes.	123412341234	\N	910	\N	2025-01-08 14:07:45.68186+00	2025-01-08 14:07:45.68186+00
12	3	Parole de Cris	Le nom « Cris » est l'abréviation de « Knistenaux » (ou « Christenaux ») du nom français d'un ancien village appelé « Kenisteniwuik ». La Première Nation de Deer Lake est une bande indienne de la Première Nation oji-cree du Nord de l'Ontario au Canada. Elle possède une réserve, Deer Lake, de 1 654 hectares située sur la rive nord du lac Red. Elle fait partie du Conseil Keewaytinook Okimakanak et de la Nishnawbe Aski Nation. Elle est signataire du Traité 5. En décembre 2007, elle avait une population totale enregistrée de 1 072 membres dont 868 vivaient sur la réserve.	978-1-234567-89-3	\N	920	\N	2025-01-08 14:24:52.206244+00	2025-01-08 14:24:52.206244+00
42	2	Reflets Arc-en-Ciel	Essais sur l’intersection entre l’art et l’activisme LGBTQ+.	978-1-56789-000-2	\N	306	reflets_arc_en_ciel.pdf	2025-01-10 12:00:00+00	2025-01-10 12:00:00+00
43	1	Au-Delà du Binaire	Perspectives critiques sur la fluidité de genre et les expériences non-binaires.	978-1-56789-000-3	\N	307	au_dela_du_binaire.pdf	2025-01-10 12:00:00+00	2025-01-10 12:00:00+00
44	2	Histoires d"Identités	Récits intimes sur la diversité des expériences LGBTQ+.	978-1-56789-000-4	\N	308	histoires_identites.pdf	2025-01-10 12:00:00+00	2025-01-10 12:00:00+00
45	1	Fierté et Luttes	Une analyse des mouvements de défense des droits LGBTQ+ à travers l’histoire.	978-1-56789-000-5	\N	309	fierte_et_luttes.pdf	2025-01-10 12:00:00+00	2025-01-10 12:00:00+00
46	2	Amour Sous le Spectre	Un regard sur les relations amoureuses dans la communauté queer.	978-1-56789-000-6	\N	310	amour_sous_le_spectre.pdf	2025-01-10 12:00:00+00	2025-01-10 12:00:00+00
47	1	Chroniques Queer	Des témoignages de vie célébrant la résilience et l’identité.	978-1-56789-000-7	\N	311	chroniques_queer.pdf	2025-01-10 12:00:00+00	2025-01-10 12:00:00+00
48	2	Perspectives Inclusives	Essais sur l’importance de l’inclusion dans la société contemporaine.	978-1-56789-000-8	\N	312	perspectives_inclusives.pdf	2025-01-10 12:00:00+00	2025-01-10 12:00:00+00
49	1	Une Histoire Arc-en-Ciel	Un aperçu des étapes majeures dans la lutte pour les droits LGBTQ+.	978-1-56789-000-9	\N	313	histoire_arc_en_ciel.pdf	2025-01-10 12:00:00+00	2025-01-10 12:00:00+00
50	2	Voix Invisibles	Un hommage aux figures méconnues du mouvement LGBTQ+.	978-1-56789-001-0	\N	314	voix_invisibles.pdf	2025-01-10 12:00:00+00	2025-01-10 12:00:00+00
51	1	Les Fleurs Rebelles	Roman puissant sur des femmes qui refusent de se conformer aux attentes de la société.	978-1-56789-001-1	\N	401	fleurs_rebelles.pdf	2025-01-10 12:00:00+00	2025-01-10 12:00:00+00
52	2	Voix Féminines	Essais qui explorent les luttes et triomphes des femmes à travers l’histoire.	978-1-56789-001-2	\N	402	voix_feminines.pdf	2025-01-10 12:00:00+00	2025-01-10 12:00:00+00
67	1	Les Ombres Lumineuses	Roman sur des femmes qui transforment leurs épreuves en forces lumineuses.	978-1-56789-002-7	\N	417	ombres_lumineuses.pdf	2025-01-10 12:00:00+00	2025-01-10 12:00:00+00
68	2	Repenser le Féminisme	Essais sur les nouvelles approches du féminisme au 21ème siècle.	978-1-56789-002-8	\N	418	repenser_feminisme.pdf	2025-01-10 12:00:00+00	2025-01-10 12:00:00+00
69	1	Les Âmes Libres	Roman sur des femmes qui brisent les chaînes des attentes sociétales.	978-1-56789-002-9	\N	419	ames_libres.pdf	2025-01-10 12:00:00+00	2025-01-10 12:00:00+00
70	2	Déconstruire le Patriarcat	Essais incisifs sur les moyens de dépasser les structures patriarcales.	978-1-56789-003-0	\N	420	deconstruire_patriarcat.pdf	2025-01-10 12:00:00+00	2025-01-10 12:00:00+00
14	1	Le livre du large et du long	Une épopée versifiée, imaginée comme une exploration du monde par les actions, les gestes, les aventures.\r\n\r\nLa narratrice vit des scènes et des idées, dans son esprit et en dehors, à toute allure. Elle est tour à tour et à la fois : folle, amoureuse, malade, sage, inquiète, calmée.\r\n\r\nUn livre comme une encyclopédie incarnée, libre et subjective, une lecture et une auscultation du monde, allant des plus petites choses : la peau, les insectes, les atomes ; aux plus larges : les populations humaines, la guerre, les ciels. Des choses les plus intérieures : les sensations, les questionnements propres ; aux plus matérielles : la médecine, l’anatomie, l’architecture.\r\n\r\nUne foi dans le langage rendu à sa force et à sa netteté, à ses trouvailles “brisant les verrous des choses”, un vif désespoir éclatant, un humour et une vivacité, un livre aussi réjouissant que troublant.	9782364686793	\N	940	\N	2025-02-12 12:35:12.80498+00	2025-02-12 12:35:12.80498+00
71	1	Le Petit Prince la suite	Un livre classique pour enfants et adultes.	9782070408504	\N	843	https://example.com/le-petit-prince.pdf	2025-03-21 11:19:55.78431+00	2025-03-21 11:19:55.78431+00
73	1	Les Fleurs du Silence	Une collection poétique explorant les thèmes de la solitude et de la contemplation. Chaque vers est une fenêtre ouverte sur l'âme humaine, avec des métaphores évocatrices qui transcendent le temps. L'auteur tisse délicatement des images de nature et d'émotions pures.	978-2-012345-01-1	\N	841	fleurs_silence.pdf	2025-07-11 15:45:36.805821+00	2025-07-11 15:45:36.805821+00
13	2	La semaine perpétuelle	Le père rêve d'une éponge qui lave le passé. La mère est partie, il dit qu'elle n'existe plus. Sorti du monde, le fils poste des vidéos sur Internet et il écrit des poèmes. La fille ne supporte pas la réalité trop proche et toutes ces personnes qui avancent avec leurs millions de détails. La grand-mère entend les clignements et les soupirs de chaque moustique. Tout ce qui leur arrive est dans l'ordre du monde.\r\n\r\nLa Semaine perpétuelle est d'abord un livre sur les gens d'Internet. Ecriture animiste, où toutes les choses du monde peuvent parler - où le monde est possédé. Un livre à la vivacité poétique frappante, la découverte d'une voix. Quand son esprit monte au plafond, elle se regarde, elle se voit dans le lit, et la grand-mère ajoute un ciel sur chaque chose. Elle regarde les objets, elle fait le tour de la pièce, elle ajoute un ciel pour chaque meuble, un ciel sur la télé, un ciel sur des bouts de pain, un ciel sur les yaourts, un ciel par couverture, un ciel sur le plancher, un ciel sur le gymnase, un ciel sur chaque enfant, Salim, Sara, un ciel sur chaque tête, et un ciel sur chacune de leurs dents, un ciel sur leur front, un ciel sur chaque mèche et tout devient léger.\r\n\r\n	9782757896556	vasquez_semaine_perpetuelle.jpg	940	\N	2025-02-12 12:33:30.313342+00	2025-02-12 12:33:30.313342+00
\.


--
-- Data for Name: books_autors; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.books_autors (id, book_id, autor_id, created_at, updated_at) FROM stdin;
1	1	1	\N	\N
2	31	1	\N	\N
3	32	1	\N	\N
4	33	1	\N	\N
5	34	1	\N	\N
6	2	1	\N	\N
7	3	1	\N	\N
8	5	2	\N	\N
9	6	2	\N	\N
10	7	3	\N	\N
11	8	3	\N	\N
12	9	3	\N	\N
13	9	4	\N	\N
14	9	5	\N	\N
15	42	2	\N	\N
16	43	2	\N	\N
17	44	11	\N	\N
18	44	9	\N	\N
19	45	9	\N	\N
20	46	9	\N	\N
21	47	9	\N	\N
22	48	9	\N	\N
23	50	9	\N	\N
24	51	9	\N	\N
25	52	9	\N	\N
26	53	10	\N	\N
27	54	10	\N	\N
29	3	2	\N	\N
30	4	2	\N	\N
33	7	2	\N	\N
35	8	4	\N	\N
36	9	4	\N	\N
31	5	3	\N	\N
32	6	5	\N	\N
34	8	6	\N	\N
37	13	12	\N	\N
38	14	12	\N	\N
\.


--
-- Data for Name: books_copies; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.books_copies (id, books_id, state, created_at) FROM stdin;
1	31	1	2025-05-11 14:44:01.715+00
2	32	\N	\N
3	33	2	\N
4	1	4	2025-07-08 08:44:48.113984+00
5	2	4	2025-07-08 08:44:48.130694+00
6	3	4	2024-07-08 08:44:48.133797+00
7	4	1	2025-07-08 08:44:48.139228+00
8	4	4	2025-04-08 08:44:48.144502+00
9	5	3	2025-07-08 08:44:48.150807+00
10	6	4	2023-07-08 08:44:48.155416+00
11	7	1	2025-07-08 08:44:48.157602+00
12	8	2	2025-07-08 08:44:48.161545+00
13	9	1	2025-07-08 08:44:48.164085+00
14	9	1	2025-07-08 08:44:48.167871+00
15	9	2	2025-01-08 08:44:48.170557+00
16	1	1	2025-07-08 08:46:26.748209+00
17	2	4	2025-07-08 08:46:26.761302+00
18	3	4	2024-07-08 08:46:26.766094+00
19	14	1	2025-07-08 08:46:26.771186+00
20	4	1	2025-04-08 08:46:26.775521+00
21	13	3	2025-07-08 08:46:26.785049+00
22	6	2	2023-07-08 08:46:26.788353+00
23	7	4	2025-07-08 08:46:26.792102+00
24	8	2	2025-07-08 08:46:26.795374+00
25	10	1	2025-07-08 08:46:26.797556+00
26	11	1	2025-07-08 08:46:26.802902+00
33	31	4	2025-07-08 08:47:37.098222+00
34	32	4	2023-07-08 08:47:37.109549+00
35	33	1	2025-07-08 08:47:37.116811+00
36	34	4	2025-07-08 08:47:37.124093+00
37	35	4	2025-07-08 08:47:37.126205+00
38	36	1	2025-07-08 08:47:37.129725+00
39	37	4	2025-01-08 08:47:37.13263+00
40	60	\N	\N
41	61	\N	\N
42	62	\N	\N
43	62	\N	\N
44	63	\N	\N
45	64	\N	\N
46	65	\N	\N
47	66	\N	\N
48	67	\N	\N
49	68	\N	\N
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.comments (id, book_id, user_id, description, canceled, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: editors; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.editors (id, name, created_at, updated_at) FROM stdin;
1	Le petit malin	\N	\N
2	Purple	\N	\N
3	La Rose	\N	\N
4	Imaginair	\N	\N
5	Tsoku	\N	\N
\.


--
-- Data for Name: emprunts; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.emprunts (id, user_id, book_copy_id, borrow_date, planned_return_date, actual_return_date, status, notes, created_at, updated_at) FROM stdin;
2	18	1	2025-07-08 08:40:01.009303+00	2025-07-22 08:40:01.009303+00	\N	1	Emprunt pour projet scolaire	\N	\N
\.


--
-- Data for Name: favorises; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.favorises (id, book_id, user_id, state, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: gender_books; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.gender_books (id, book_id, gender_id) FROM stdin;
1	1	1
2	1	5
3	2	1
4	3	1
5	4	1
6	6	1
7	6	5
8	5	11
9	7	11
10	8	11
11	9	12
12	9	13
13	10	11
14	10	15
17	10	3
18	12	2
\.


--
-- Data for Name: genders; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.genders (id, name) FROM stdin;
1	Fantasy
2	Science-fiction
3	Mystère
4	Thriller
5	Romance
6	Horreur
7	Fiction historique
8	Jeunes adultes
9	Enfants
10	Aventure
11	Dystopie
12	Fiction contemporaine
13	Fiction littéraire
14	Roman graphique
15	Classique
16	Crime
17	Mémoires
18	Biographie
19	Non-fiction
20	Développement personnel
21	Poésie
22	Drame
23	Satire
24	Anthologie
25	Épopée
26	Mythologie
27	Paranormal
28	Suspense
29	Fantasy urbaine
30	Romance historique
31	Western
32	Steampunk
33	Cyberpunk
34	Fiction politique
35	Thriller juridique
36	Thriller psychologique
37	Spiritualité
38	Réalisme magique
39	Humour
40	Fiction de guerre
41	Action
42	Fiction philosophique
43	Dark fantasy
44	Conte de fées
45	Nouvelle
46	Érotisme
47	Voyage
48	True crime
49	Science
50	Religion
\.


--
-- Data for Name: reservations; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.reservations (id, book_id, user_id, canceled, "beginDate", "endDate", created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.users (id, full_name, email, password, "right", created_at, updated_at) FROM stdin;
1	Georgia Chapak	chap@zu.net	azerty	1	2024-12-06 10:10:10.092132+00	\N
2	morgane	morgane@example.com	$scrypt$n=16384,r=8,p=1$n6tCnvtt5zEKOl7ASiKM/w$RFMnY17wBwNzwViLnjF0gXwYg/T53Wv7qTc16jK9fRuiO63NmtgMq3poGjjM9zBPsNB3w139R9JLGnjJazBsJw	1	2025-01-09 14:15:23.249+00	2025-01-09 14:15:23.25+00
3	momo	morgane2@example.com	$scrypt$n=16384,r=8,p=1$Siq5p2GEf6sxFa17H1JsPQ$R6/5Lnhnsz83fQYGyK1hkmxH1k/XYvWvpTD/u+F9aP/++9gtTxSqzLeOPByKsg7sb/3FdtXNKPNqx3Gb2ig98A	1	2025-01-09 14:55:24.496+00	2025-01-09 14:55:24.496+00
4	Jeane Dildo	didou@example.com	$scrypt$n=16384,r=8,p=1$G6BLDisENYvrKt0SDK449g$owc7yxz1CIXGbem6efyMl2zKEpOAJSEI6ovEmrzBtFDqp6Oxw28rT8j9ZnAEvTjzrSZLh7KiTqjwhEJHdXUSGA	1	2025-01-10 11:05:43.021+00	2025-01-10 11:05:43.021+00
5	Johnny Doe	test@entreprise.fr	$scrypt$n=16384,r=8,p=1$ovp3zzLMq44la22qS509nw$j6T62irEYS8DegAJVjpoEt88SDIT5jhW5TuCoNxhGGUNQuvqwiCFSHd9XxjeZ587XHr/KC2wQmkBHp+Kuw41Bw	1	2025-04-16 16:12:58.591+00	2025-04-16 16:12:58.591+00
6	Dan Dou	test2@entreprise.fr	$scrypt$n=16384,r=8,p=1$XCJvAH/4Duj8YkI6d9ofyQ$B29WnwW/ueAEm+Tw/KdleWdtJR8Zuz+tx/i+qEqeiV+EBdn47m30dGrslL7si0UBVvKM6TJlHW9tp4GbNTeFdw	1	2025-04-16 16:54:41.745+00	2025-04-16 16:54:41.745+00
7	momo2	truc@net.net	$scrypt$n=16384,r=8,p=1$tC5Zb0WBX8k7N3MHley89w$2XZ12PD9ifcEJmGCq9VxxB1R8+U/S1rXo3QElN1YM+jYGe8Omq2k6qCecpbMFHBPj+OfSnm2KgkUldZ8n4tEOQ	0	2025-05-09 13:27:25.787+00	2025-05-09 13:27:25.787+00
8	momo3	machin@net.net	$scrypt$n=16384,r=8,p=1$YLKjMae+2EJNjK6KiTIwEQ$RfUYOq+Mu99k50KtfnNvUJVdbZ4TUAEdevM6e+kxUJ22yB8TcHY+8DyFWOKjTlpIYXPpUW70UkUHKfoFAPkXHA	0	2025-05-09 13:28:24.138+00	2025-05-09 13:28:24.138+00
9	momo3	machin2@net.net	$scrypt$n=16384,r=8,p=1$xZGhVQk1ZmxwCONHpWFVNQ$QL8kQZVpPyQQvuFEy5DmYBK6YoQUu+Qa23kfqRBPAoXyRlJPKAmWdodwzeH2ICMyRMlj3yZQq56fDloTUsF8TA	0	2025-05-09 13:31:38.345+00	2025-05-09 13:31:38.346+00
10	mapa	mapa@mapa.corp	$scrypt$n=16384,r=8,p=1$khvcnod61d7viINGDxQ+4w$bVuVMlFH6Oze6YUHUzwLbnHkHmcJxtgoakgGx3LbiZrjbvVYfeWGF5IxirOZZeKD9+ag7rpvchTWm/+5vbooMw	0	2025-05-09 13:39:15.094+00	2025-05-09 13:39:15.094+00
11	mapa	mapa1@mapa.corp	$scrypt$n=16384,r=8,p=1$5NcOmx+JlwAuoWNbTn1dhA$T2CBIDPCexWCW21bFz8R8YcmD4rDZDuayi1slP7ruZbs43DpNsJs9syxdUWCwbGIZTmodDxbkXEKOFAi7Fu24A	0	2025-05-09 13:41:40.206+00	2025-05-09 13:41:40.206+00
12	toto	net@gg.vom	$scrypt$n=16384,r=8,p=1$ZeNTMXIDTj+L9U7t6lYzKA$72YNbsOiPdKV2HAScUnyFdgCnE3W7heJpYdlMKXw6ySea3/ZfIKYoPA/kvrARghOVyZXLzodIvpNLYJ0Kdl2Sw	0	2025-05-09 13:58:35.592+00	2025-05-09 13:58:35.592+00
13	toto	net1@gg.vom	$scrypt$n=16384,r=8,p=1$ghe2fiI3VPhetstinAODwg$CMl0442/TYKmVTk5rj+oWc/UGw5mLLqbOzUCUrmg9rKrU2iVPklZwXXrEnd6kloLmW7WJCIlbMuH9UnODQb/Kg	0	2025-05-09 13:58:48.63+00	2025-05-09 13:58:48.63+00
14	Lulue La Didou	didou@gmail.com	$scrypt$n=16384,r=8,p=1$QFyixoUgdbJgjGVBsqhGDg$ouHQYKlRoZbGxpSZHWFjpGKUo67/Ei23FSQ3mzx5ZY8QBQy68x1Qj5QjiP8qRuS0OHp7NEkcGn7oUdpbO1NBIA	1	2025-05-11 14:44:01.715+00	2025-05-11 14:44:01.716+00
15	Lola	lola@net.fr	$scrypt$n=16384,r=8,p=1$ehKYeQd2SXpdNVCGKP21ew$T/DYV0cGCbDMecbBt2h9Alc9qUHu4jkTz2XIJa3zKfnrGCh5jUT91yPBFpYtZk8VulOUe0Zj9WfgVVxVDnYRQw	0	2025-05-26 14:47:51.132+00	2025-05-26 14:47:51.132+00
16	momo	momo@net.fr	$scrypt$n=16384,r=8,p=1$wgXZsLhAxX5Ox92WovZtbw$q++BqzfX0r/b/ye2o+xSIRJ5LFwUow59Az1cY7i7u6jLdsKnlIPfd4QEmS2+Jaa4izlqBijcfWDRIrhdCYryFg	0	2025-07-03 13:27:23.084+00	2025-07-03 13:27:23.084+00
17	nono	nono@net.fr	$scrypt$n=16384,r=8,p=1$BWR8mUckXQupyjZUSbPuYQ$HkZjV8w1HNmeQXpwoGEW63YN5Vj5dee2Ztpa2ODKKUFdurPb2wXP2CeRh2VDM87HEC90bV9iHcDko1/5sGlSeA	0	2025-07-03 13:29:58.226+00	2025-07-03 13:29:58.227+00
18	tata	tata@net.fr	$scrypt$n=16384,r=8,p=1$vqmmMIEgdj5Ji/9jj8NGpQ$FrQbJby6bWtPbJCCy4IE+P3w2gRo5J6HRtXb3JnHWY7yyZXH89Ea+HV3vnq1EzQC/v1EexszR9ib4zmNemc8EA	0	2025-07-03 14:30:57.148+00	2025-07-03 14:30:57.148+00
19	tata	tata1@net.fr	$scrypt$n=16384,r=8,p=1$nzazDbnN7X4Qj0BNoIWD4w$jBybVFCZzkg7JKe8DDUbTsOtpqAhTZFT7BlH85wJtMoWRsc8gjOws8gC3e8iN9aqB98eyhzv97Q5g3fJYYOVhA	0	2025-07-03 15:02:57.298+00	2025-07-03 15:02:57.298+00
20	Jean Dupont	jean.dupont@example.com	$scrypt$n=16384,r=8,p=1$gP2IL9WyVGSDlwsu2TOMQw$d4mFoNWdU3OOLv3Krk6euTPEIhX+FunIE8VRVWvF3QJXo/Ysh+Rnw4QNpgzb0s1atjF0jy0d0C2fXXvXaEGTUQ	0	2025-07-03 15:05:04.103+00	2025-07-03 15:05:04.103+00
21	Jean Dupont	lebossdu02@example.com	$scrypt$n=16384,r=8,p=1$TcDeFDaiLgKHaXxEH0X/Jg$jsgXehlLdWf0Ihbwp67PYOjGyf6inyRUz/qTKEA531p0/c1xshlbI5eKynpNB3e5CmfK33ykFriQtYT29jatKw	0	2025-07-03 15:09:35.783+00	2025-07-03 15:09:35.784+00
\.


--
-- Name: adonis_schema_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.adonis_schema_id_seq', 15, true);


--
-- Name: auth_access_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.auth_access_tokens_id_seq', 1, false);


--
-- Name: auth_access_tokens_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.auth_access_tokens_id_seq1', 47, true);


--
-- Name: autors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.autors_id_seq', 1, false);


--
-- Name: books_autors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.books_autors_id_seq', 1, false);


--
-- Name: books_copies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.books_copies_id_seq', 49, true);


--
-- Name: books_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.books_id_seq', 71, true);


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.comments_id_seq', 1, false);


--
-- Name: editors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.editors_id_seq', 1, false);


--
-- Name: emprunts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.emprunts_id_seq', 2, true);


--
-- Name: favorises_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.favorises_id_seq', 1, false);


--
-- Name: gender_books_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.gender_books_id_seq', 2, true);


--
-- Name: genders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.genders_id_seq', 1, false);


--
-- Name: reservations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.reservations_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.users_id_seq', 21, true);


--
-- Name: adonis_schema adonis_schema_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.adonis_schema
    ADD CONSTRAINT adonis_schema_pkey PRIMARY KEY (id);


--
-- Name: adonis_schema_versions adonis_schema_versions_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.adonis_schema_versions
    ADD CONSTRAINT adonis_schema_versions_pkey PRIMARY KEY (version);


--
-- Name: auth_access_tokens auth_access_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.auth_access_tokens
    ADD CONSTRAINT auth_access_tokens_pkey PRIMARY KEY (id);


--
-- Name: autors autors_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.autors
    ADD CONSTRAINT autors_pkey PRIMARY KEY (id);


--
-- Name: books_autors books_autors_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.books_autors
    ADD CONSTRAINT books_autors_pkey PRIMARY KEY (id);


--
-- Name: books_copies books_copies_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.books_copies
    ADD CONSTRAINT books_copies_pkey PRIMARY KEY (id);


--
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: editors editors_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.editors
    ADD CONSTRAINT editors_pkey PRIMARY KEY (id);


--
-- Name: emprunts emprunts_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.emprunts
    ADD CONSTRAINT emprunts_pkey PRIMARY KEY (id);


--
-- Name: favorises favorises_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.favorises
    ADD CONSTRAINT favorises_pkey PRIMARY KEY (id);


--
-- Name: gender_books gender_books_book_id_gender_id_unique; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.gender_books
    ADD CONSTRAINT gender_books_book_id_gender_id_unique UNIQUE (book_id, gender_id);


--
-- Name: gender_books gender_books_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.gender_books
    ADD CONSTRAINT gender_books_pkey PRIMARY KEY (id);


--
-- Name: genders genders_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.genders
    ADD CONSTRAINT genders_pkey PRIMARY KEY (id);


--
-- Name: reservations reservations_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: auth_access_tokens auth_access_tokens_tokenable_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.auth_access_tokens
    ADD CONSTRAINT auth_access_tokens_tokenable_id_foreign FOREIGN KEY (tokenable_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: books_autors books_autors_autor_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.books_autors
    ADD CONSTRAINT books_autors_autor_id_foreign FOREIGN KEY (autor_id) REFERENCES public.genders(id);


--
-- Name: books_autors books_autors_book_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.books_autors
    ADD CONSTRAINT books_autors_book_id_foreign FOREIGN KEY (book_id) REFERENCES public.books(id);


--
-- Name: books_copies books_copies_books_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.books_copies
    ADD CONSTRAINT books_copies_books_id_foreign FOREIGN KEY (books_id) REFERENCES public.books(id) ON DELETE CASCADE;


--
-- Name: books books_editor_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_editor_id_foreign FOREIGN KEY (editor_id) REFERENCES public.editors(id) ON DELETE CASCADE;


--
-- Name: comments comments_book_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_book_id_foreign FOREIGN KEY (book_id) REFERENCES public.books(id);


--
-- Name: comments comments_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: emprunts emprunts_book_copy_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.emprunts
    ADD CONSTRAINT emprunts_book_copy_id_foreign FOREIGN KEY (book_copy_id) REFERENCES public.books_copies(id) ON DELETE CASCADE;


--
-- Name: emprunts emprunts_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.emprunts
    ADD CONSTRAINT emprunts_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: favorises favorises_book_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.favorises
    ADD CONSTRAINT favorises_book_id_foreign FOREIGN KEY (book_id) REFERENCES public.books(id);


--
-- Name: favorises favorises_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.favorises
    ADD CONSTRAINT favorises_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: gender_books gender_books_book_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.gender_books
    ADD CONSTRAINT gender_books_book_id_foreign FOREIGN KEY (book_id) REFERENCES public.books(id);


--
-- Name: gender_books gender_books_gender_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.gender_books
    ADD CONSTRAINT gender_books_gender_id_foreign FOREIGN KEY (gender_id) REFERENCES public.genders(id);


--
-- Name: reservations reservations_book_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_book_id_foreign FOREIGN KEY (book_id) REFERENCES public.books(id);


--
-- Name: reservations reservations_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 13.20 (Debian 13.20-1.pgdg120+1)
-- Dumped by pg_dump version 13.20 (Debian 13.20-1.pgdg120+1)

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

--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

