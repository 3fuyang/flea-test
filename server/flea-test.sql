-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: flea_test
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `adminaccount`
--

DROP TABLE IF EXISTS `adminaccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adminaccount` (
  `admin_id` varchar(9) NOT NULL,
  `admin_password` varchar(30) NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adminaccount`
--

LOCK TABLES `adminaccount` WRITE;
/*!40000 ALTER TABLE `adminaccount` DISABLE KEYS */;
INSERT INTO `adminaccount` VALUES ('0001','qwe12345');
/*!40000 ALTER TABLE `adminaccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goodinfo`
--

DROP TABLE IF EXISTS `goodinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goodinfo` (
  `good_id` int unsigned NOT NULL AUTO_INCREMENT,
  `seller_id` varchar(9) DEFAULT NULL,
  `price` decimal(6,2) NOT NULL DEFAULT '0.00',
  `category` varchar(10) NOT NULL DEFAULT '其他',
  `available` tinyint(1) NOT NULL DEFAULT '1',
  `title` varchar(60) NOT NULL DEFAULT '车票 但是疯狂的打折',
  `campus` varchar(15) NOT NULL DEFAULT '四平路校区',
  `intro` varchar(600) NOT NULL DEFAULT '商品介绍',
  `images` varchar(200) NOT NULL DEFAULT 'default.png',
  PRIMARY KEY (`good_id`),
  KEY `seller_id` (`seller_id`),
  CONSTRAINT `goodinfo_ibfk_1` FOREIGN KEY (`seller_id`) REFERENCES `useraccount` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goodinfo`
--

LOCK TABLES `goodinfo` WRITE;
/*!40000 ALTER TABLE `goodinfo` DISABLE KEYS */;
INSERT INTO `goodinfo` VALUES (1,'1951002',15.00,'图书音像',0,'大学物理学 (附)网络课程&配套习题','嘉定校区','九成新，附习题，可以跨校区包邮','default.png'),(2,'1951002',3499.00,'电子产品',1,'Apple iPad Pro 11英寸平板电脑','四平路校区','八成新，附两年保修，只接受线下','default.png');
/*!40000 ALTER TABLE `goodinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdata`
--

DROP TABLE IF EXISTS `orderdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderdata` (
  `order_id` int unsigned NOT NULL AUTO_INCREMENT,
  `buyer` varchar(9) DEFAULT NULL,
  `seller` varchar(9) DEFAULT NULL,
  `good_id` int unsigned DEFAULT NULL,
  `price` decimal(6,2) NOT NULL,
  `generated_time` datetime NOT NULL DEFAULT '2022-04-17 16:50:00',
  `stat` varchar(12) NOT NULL DEFAULT '待付款',
  PRIMARY KEY (`order_id`),
  KEY `buyer` (`buyer`),
  KEY `seller` (`seller`),
  KEY `good_id` (`good_id`),
  CONSTRAINT `orderdata_ibfk_1` FOREIGN KEY (`buyer`) REFERENCES `useraccount` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orderdata_ibfk_2` FOREIGN KEY (`seller`) REFERENCES `useraccount` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `orderdata_ibfk_3` FOREIGN KEY (`good_id`) REFERENCES `goodinfo` (`good_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdata`
--

LOCK TABLES `orderdata` WRITE;
/*!40000 ALTER TABLE `orderdata` DISABLE KEYS */;
INSERT INTO `orderdata` VALUES (11,'1951001','1951002',1,15.00,'2022-06-22 22:06:55','已封禁');
/*!40000 ALTER TABLE `orderdata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reportdata`
--

DROP TABLE IF EXISTS `reportdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reportdata` (
  `order_id` int unsigned NOT NULL,
  `reason` varchar(400) NOT NULL DEFAULT '骗钱',
  `stat` varchar(9) NOT NULL DEFAULT '待处理',
  PRIMARY KEY (`order_id`),
  CONSTRAINT `reportdata_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orderdata` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reportdata`
--

LOCK TABLES `reportdata` WRITE;
/*!40000 ALTER TABLE `reportdata` DISABLE KEYS */;
INSERT INTO `reportdata` VALUES (11,'Not good','已封禁');
/*!40000 ALTER TABLE `reportdata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `useraccount`
--

DROP TABLE IF EXISTS `useraccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `useraccount` (
  `user_id` varchar(9) NOT NULL,
  `user_password` varchar(30) NOT NULL,
  `available` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `useraccount`
--

LOCK TABLES `useraccount` WRITE;
/*!40000 ALTER TABLE `useraccount` DISABLE KEYS */;
INSERT INTO `useraccount` VALUES ('1951001','qwe12345',1),('1951002','qwe12345',0);
/*!40000 ALTER TABLE `useraccount` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-22 22:18:44
