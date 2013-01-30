-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 03, 2013 at 06:23 PM
-- Server version: 5.5.25
-- PHP Version: 5.4.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `engcomm`
--

-- --------------------------------------------------------

--
-- Table structure for table `enews`
--

CREATE TABLE `enews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `img` text NOT NULL,
  `type` int(11) NOT NULL,
  `description` text NOT NULL,
  `href` text NOT NULL,
  `year` int(11) NOT NULL,
  `month` int(11) NOT NULL,
  `orders` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=48 ;

--
-- Dumping data for table `enews`
--

INSERT INTO `enews` (`id`, `title`, `img`, `type`, `description`, `href`, `year`, `month`, `orders`) VALUES
(36, 'Rap in Review from Michigan Engineering', 'http://engcomm.engin.umich.edu/dec_enews_12/img/dave.jpg', 0, 'Catch up on 2012 with David C. Munson, Jr., Robert J. Vlasic Dean of Engineering, at the University of Michigan, as he holds forth on some of the exciting initiatives that are underway at the College of Engineering with a jaunty &quot;Rap in Review.&quot;', 'http://youtu.be/11gEh8-3JFc', 2012, 12, 0),
(37, 'In nuclear engineering, &quot;crud&quot; is a technical term.', 'http://engcomm.engin.umich.edu/dec_enews_12/img/2.jpg', 1, 'An ambitious U-M project to build a complete 3D computer model of how nuclear power reactors operate and degrade is only halfway through its first five years, but already the new software is tackling real-world problems.', 'http://www.engin.umich.edu/college/about/news/stories/2012/november/nuclear-crud', 2012, 12, 2),
(41, 'MconneX: satellites in a box', 'http://engcomm.engin.umich.edu/dec_enews_12/img/3.jpg', 1, 'CubeSats &ndash; small satellites encased in a box and attached to a spacecraft &ndash; are sparking innovation and providing easier access to space, according to Aerospace Engineering Professor Jamie Cutler. Cutler''s RAX mission is the first to prove that scientific information can be gathered from these tiny tools.', 'http://mconnex.engin.umich.edu/michepedia/2012/satellites-in-a-box/', 2012, 12, 1),
(45, 'DME: Making a Difference interactive photo album', 'http://www.engin.umich.edu/newscenter/dme/makingadifference/img/lead.jpg', 0, '', 'http://www.engin.umich.edu/newscenter/dme/makingadifference', 2012, 11, 0),
(46, 'Converting Algae into Fuel', 'http://engcomm.engin.umich.edu/nov_enews_12/img/1.jpg', 1, 'Chemical Engineering researchers are developing an effective method for converting plants into fuel. This would be an energy-development breakthrough because algae, the basic ingredient, can be grown and harvested in water of any condition. An MconneX presentation.', 'http://mconnex.engin.umich.edu/michepedia/2012/turning-algae-into-fuel/', 2012, 11, 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
