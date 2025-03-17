-- MySQL dump 10.13  Distrib 9.1.0, for Win64 (x86_64)
--
-- Host: localhost    Database: travel_agency
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `tour_id` int NOT NULL,
  `booking_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('pending','confirmed','cancelled') DEFAULT 'pending',
  PRIMARY KEY (`id`),
  KEY `bookings_ibfk_1` (`user_id`),
  KEY `bookings_ibfk_2` (`tour_id`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (7,10,3,'2025-03-16 03:07:04','pending'),(8,8,3,'2025-03-16 03:09:12','confirmed'),(25,15,4,'2025-03-17 14:30:31','confirmed');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tours`
--

DROP TABLE IF EXISTS `tours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tours` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `duration` int NOT NULL,
  `location` varchar(255) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tours`
--

LOCK TABLES `tours` WRITE;
/*!40000 ALTER TABLE `tours` DISABLE KEYS */;
INSERT INTO `tours` VALUES (3,'Mystical Lantern Walk Through the Enchanted Forest','Step into a world of wonder as you embark on a guided lantern-lit walk through the heart of the Enchanted Forest. Discover ancient trees, glowing fireflies, and hidden woodland secrets while listening to captivating tales about the forest\'s rich history and folklore. This magical experience is perfect for nature lovers and adventure seekers alike.',45.00,2,'Whispering Pines Nature Reserve, Oregon, USA','https://whisperingpinesoregon.com/wp-content/uploads/2016-03-03-12.51.37-1030x773.jpg','2025-03-16 01:34:13'),(4,'Sunset Sailing Adventure on Crystal Bay','Set sail on a breathtaking journey across the sparkling waters of Crystal Bay as the sun dips below the horizon. Feel the gentle sea breeze, enjoy light refreshments, and take in the stunning views of the coastline painted in hues of orange and pink. Whether youΓÇÖre seeking a romantic escape or a peaceful retreat, this sunset cruise promises unforgettable moments.',75.00,3,'USA','https://www.gosquaw.com/wp-content/gallery/incline-village/cache/Lake-Tahoe-East-Shore-1.jpg-nggid041687-ngg0dyn-1140x761x65-00f0w010c010r110f110r010t010.jpg','2025-03-16 15:34:26');
/*!40000 ALTER TABLE `tours` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `refresh_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (8,'admin','admin@gmail.com','$2b$10$tRPdBfd0.MtVSf1/QVMEaOv5oNEn9VQXslnmA3HLKPvLH2OKiB34i','admin','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDIxNzQxNDksImV4cCI6MTc0Mjc3ODk0OX0.HebvJccTNBPo7rHJejEOpF-b47zrEcLLtJghDj2tO1k'),(10,'florent','florent@gmail.com','$2b$10$A7GK050/hMBqjv0Y7aC99OFeFEYoqEfm.gUTfGuPvSBVpKiD0MopC','admin','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoiZmxvcmVudEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDIyMjMxMTEsImV4cCI6MTc0MjgyNzkxMX0.sLfj_lmg6Pe1Y9kbNLBC_k9VEu1ccGV_37KG2xVKemg'),(14,'xoni','xoni@gmail.com','$2b$10$I7K4DJtdTJz306jfM6OOC.JKF/jC2pb3p8UxO8wIhAn7cy6vaFf.e','user','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoieG9uaUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTc0MjIyNDkxNCwiZXhwIjoxNzQyODI5NzE0fQ.AQfR4XknG38H_1vwS9UirB_F7LuKNmTIW_OSLJAwy3Q'),(15,'usertest','usertest@gmail.com','$2b$10$1p7h82T4Ut8i55UsrZoA2eXz4ahCe8piD0Y8RdnwIYjrymOC8tFD.','user','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImVtYWlsIjoidXNlcnRlc3RAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDIyMjUxNTksImV4cCI6MTc0MjgyOTk1OX0.OPraktIpNxX5Q6A96lMK7bRIg05r6wOCms8O6u4bZLE');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-17 22:04:51
