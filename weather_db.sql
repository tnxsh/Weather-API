-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 06, 2024 at 04:38 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `weather_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `weather`
--

CREATE TABLE `weather` (
  `id` int(11) NOT NULL,
  `city` varchar(100) NOT NULL,
  `temperature` decimal(5,2) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `humidity` int(11) DEFAULT NULL,
  `wind_speed` decimal(5,2) DEFAULT NULL,
  `date_fetched` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `weather`
--

INSERT INTO `weather` (`id`, `city`, `temperature`, `description`, `humidity`, `wind_speed`, `date_fetched`) VALUES
(24, 'Alor Star', 25.55, 'overcast clouds', 88, 0.45, '2024-11-05 09:17:58'),
(32, 'Johor', 24.57, 'light rain', 97, 1.22, '2024-11-06 00:35:59'),
(33, 'London', 10.83, 'overcast clouds', 84, 1.03, '2024-11-06 00:38:20'),
(35, 'George Town', 25.73, 'few clouds', 83, 2.24, '2024-11-06 00:38:31'),
(36, 'George Town', 25.73, 'few clouds', 83, 2.24, '2024-11-06 00:41:42'),
(37, 'George Town', 26.81, 'few clouds', 83, 1.54, '2024-11-06 01:14:47'),
(38, 'London', 10.28, 'broken clouds', 86, 1.54, '2024-11-06 01:20:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `weather`
--
ALTER TABLE `weather`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `weather`
--
ALTER TABLE `weather`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
