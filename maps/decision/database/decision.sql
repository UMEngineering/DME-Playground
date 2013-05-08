-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 31, 2012 at 06:21 PM
-- Server version: 5.5.25
-- PHP Version: 5.4.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `decision`
--
CREATE DATABASE `decision` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `decision`;

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `q_id` int(11) NOT NULL,
  `question` text NOT NULL,
  `answer` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`q_id`, `question`, `answer`) VALUES
(1, 'I imagine myself making a difference by:', 'Developing new technology to make everyday items better, faster, smaller or stronger'),
(1, 'I imagine myself making a difference by:', 'Creating sustainable solutions in health, energy or environmental issues'),
(1, 'I imagine myself making a difference by:', 'Sharing my knowledge with others and having an impact on the community'),
(1, 'I imagine myself making a difference by:', 'Making something new and risky like the next Google or SpaceX'),
(1, 'I imagine myself making a difference by:', 'Traveling the world to help developing nations'),
(2, 'While in school, I would rather:', 'Intern at a national corporation in a major city'),
(2, 'While in school, I would rather:', 'Get a global perspective by traveling or volunteering in another country'),
(2, 'While in school, I would rather:', 'Join a non-engineering activity or sports team'),
(2, 'While in school, I would rather:', 'Use my skills in a school or community activity or competition'),
(2, 'While in school, I would rather:', 'Participate in an identity-based society to make connections with people just like me'),
(2, 'While in school, I would rather:', 'Challenge myself through an academic honors or multidisciplinary program'),
(3, 'My personal interests include:', 'Staying healthy and happy through activities and exercise'),
(3, 'My personal interests include:', 'Studying cutting edge research, technology and developments'),
(3, 'My personal interests include:', 'Creative ventures such as arts, music or literature'),
(3, 'My personal interests include:', 'Meeting new people and being involved in group organizations, activities or competitions'),
(3, 'My personal interests include:', 'Business and innovation through entrepreneurship or communications'),
(4, 'My dream job would be:', 'Working for a large, global corporation'),
(4, 'My dream job would be:', 'Getting in on the ground floor of a local startup or creating my own firm'),
(4, 'My dream job would be:', 'Continuing in education through research or teaching'),
(4, 'My dream job would be:', 'Entering the law, medical or business field'),
(4, 'My dream job would be:', 'Dedicating my energies to a non-profit or public job where I can make a difference '),
(5, 'As I enter college, I am most concerned about:', 'The affordability of a college education'),
(5, 'As I enter college, I am most concerned about:', 'The pressure and workload of classes'),
(5, 'As I enter college, I am most concerned about:', 'Fitting in on campus'),
(5, 'As I enter college, I am most concerned about:', 'Where I will live and how I will get around'),
(5, 'As I enter college, I am most concerned about:', 'Having a good time while I''m there ');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
