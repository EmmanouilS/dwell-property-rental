-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 24, 2024 at 04:04 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ds_estate`
--

-- --------------------------------------------------------

--
-- Table structure for table `listings`
--

CREATE TABLE `listings` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `region` varchar(255) NOT NULL,
  `rooms` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `listings`
--

INSERT INTO `listings` (`id`, `title`, `region`, `rooms`, `price`, `image_path`) VALUES
(1, 'Modern Apartment', 'Downtown', 2, 120.00, 'images/property1.jpg'),
(2, 'Cozy Cottage', 'Suburbs', 3, 80.00, 'images/property2.jpg'),
(3, 'Luxury Villa', 'Beachside', 5, 350.00, 'images/property3.jpg'),
(4, 'City Loft', 'Downtown', 1, 100.00, 'images/property4.jpg'),
(5, 'Country House', 'Countryside', 4, 150.00, 'images/property5.jpg'),
(6, 'Penthouse Suite', 'City Center', 3, 220.00, 'images/property6.jpg'),
(7, 'Beach Bungalow', 'Beachside', 2, 180.00, 'images/property7.jpg'),
(8, 'Mountain Cabin', 'Mountains', 3, 90.00, 'images/property8.jpg'),
(9, 'Suburban Home', 'Suburbs', 4, 130.00, 'images/property9.jpg'),
(10, 'Urban Studio', 'City Center', 1, 70.00, 'images/property10.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `listing_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `total_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`id`, `user_id`, `listing_id`, `start_date`, `end_date`, `first_name`, `last_name`, `email`, `total_price`) VALUES
(61, 2, 4, '2024-06-30', '2024-07-06', 'EMMANOUIL', 'SIFOGIANNAKIS', 'mansifo2003@gmail.gr', 492.00),
(62, 2, 2, '2024-06-02', '2024-06-15', 'EMMANOUIL', 'SIFOGIANNAKIS', 'mansifo2003@gmail.gr', 780.00);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `first_name`, `last_name`) VALUES
(1, 'asd', '$2y$10$p5LC4/hQyM.bQanjZy0IGOSTEROCNpRIZAJh6YtYPqOKCvCZLAeLm', 'mansifo2003@gmail.com', 'EMMANOUIL', 'SIFOGIANNAKIS'),
(2, 'manos123', '$2y$10$g4PVVObn8GN9cyomJYOJfeQyCGnqU.O5UWxzY8zKz2kYkMZiugKy2', 'mansifo2003@gmail.gr', 'EMMANOUIL', 'SIFOGIANNAKIS'),
(3, 'katerolosid', '$2y$10$DAGwN3x.fC5ymkV.8UTc4OcfNP86.mGfEKm6ZFMToEpGN8Bs16fVe', 'katerolosid@gmail.com', 'katerina', 'rologisidiropoulou');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `listings`
--
ALTER TABLE `listings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `listing_id` (`listing_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `listings`
--
ALTER TABLE `listings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`listing_id`) REFERENCES `listings` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
