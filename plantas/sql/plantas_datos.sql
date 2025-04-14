-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 11-03-2025 a las 19:05:48
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `plantas`
--

--
-- Volcado de datos para la tabla `plantas`
--

INSERT INTO `plantas` (`id`, `nombre`, `created_at`) VALUES
(1, 'Orquidea', '2025-03-06 18:39:39'),
(2, 'Perejil mmm q rico', '2025-03-06 18:45:22'),
(3, 'Maíz', '2025-03-06 18:48:12'),
(4, 'Pata de elefante', '2025-03-06 18:54:54'),
(5, 'Epazote', '2025-03-06 19:04:47'),
(6, 'Margarita', '2025-03-06 19:06:21');

--
-- Volcado de datos para la tabla `posee`
--

INSERT INTO `posee` (`id_rol`, `id_privilegio`, `created_at`) VALUES
(1, 1, '2025-03-11 18:03:37'),
(2, 1, '2025-03-11 18:03:37'),
(3, 1, '2025-03-11 18:03:59'),
(3, 2, '2025-03-11 18:03:59');

--
-- Volcado de datos para la tabla `privilegios`
--

INSERT INTO `privilegios` (`id`, `nombre`, `created_at`) VALUES
(1, 'ver plantas', '2025-03-11 18:02:55'),
(2, 'agregar plantas', '2025-03-11 18:02:55');

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `nombre`, `created_at`) VALUES
(1, 'líder', '2025-03-11 18:01:52'),
(2, 'colaborador', '2025-03-11 18:01:52'),
(3, 'superadmin', '2025-03-11 18:02:00');

--
-- Volcado de datos para la tabla `tiene`
--

INSERT INTO `tiene` (`id_usuario`, `id_rol`, `created_at`) VALUES
(2, 1, '2025-03-11 18:04:44'),
(3, 2, '2025-03-11 18:05:15'),
(3, 3, '2025-03-11 18:04:44'),
(4, 2, '2025-03-11 18:05:33'),
(6, 2, '2025-03-11 18:05:15');

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `username`, `password`, `created_at`) VALUES
(1, 'Yessi', 'no', '2025-03-10 18:08:14'),
(2, 'charbel', '$2b$12$n998/r71s/YWYgDdikZqOuewu9KhrXZ0sAanoVYI9N2ET0Bvl10bG', '2025-03-10 18:12:59'),
(3, 'kami', '$2b$12$Wj183TLUloNrR6hsJ47vm.5uBKx35MqeBSVg107NbnNpTRHKrta.6', '2025-03-10 18:13:39'),
(4, 'ricardo', '$2b$14$iXVOj7mFo832AHI9qRkK7uVYGh/Tdsw2mYPYNg7nATq/HQQeCUwb.', '2025-03-10 18:16:33'),
(5, 'ana', '$2b$12$QYMNMgM/estiqafxGIyWvekhL3qU4QF3qurSqZ8ChAw6yAFrsqXzO', '2025-03-10 18:18:35'),
(6, 'choche', '$2b$12$MliPtTMZe3pZKtAlfiO3/OMZlJXFg6/8QrQy3DFSNTRWH9EcvUjEG', '2025-03-10 18:23:30');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
