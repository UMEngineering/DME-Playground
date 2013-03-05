-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 28, 2013 at 04:42 PM
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
-- Table structure for table `ethic_answers`
--

CREATE TABLE `ethic_answers` (
  `a_id` int(11) NOT NULL AUTO_INCREMENT,
  `q_id` int(11) NOT NULL,
  `set_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_answer` text NOT NULL,
  PRIMARY KEY (`a_id`),
  KEY `q_id` (`q_id`,`set_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=54 ;

-- --------------------------------------------------------

--
-- Table structure for table `ethic_questions`
--

CREATE TABLE `ethic_questions` (
  `q_id` int(11) NOT NULL AUTO_INCREMENT,
  `set_id` int(11) NOT NULL,
  `question` text NOT NULL,
  `answer1` text NOT NULL,
  `answer2` text NOT NULL,
  PRIMARY KEY (`q_id`),
  KEY `set_id` (`set_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=16 ;

--
-- Dumping data for table `ethic_questions`
--

INSERT INTO `ethic_questions` (`q_id`, `set_id`, `question`, `answer1`, `answer2`) VALUES
(1, 1, 'Engineers have developed a single technology that will increase domestic production of energy to a level that meets and possibly exceeds the needs of North America, will make use energy independent, decrease consumer costs and emit zero greenhouse gases. Would you invest in the technology?', 'Yes', 'No'),
(2, 1, 'However, if there were a human or mechanical error during the production of this energy, the technology could damage the environment and kill millions of people over a period of time. Would you invest in the technology?', 'Yes', 'No'),
(3, 1, 'The development of this energy source would create thousands of jobs and improve local economies over a 20-year period; however, there''s a possibility that many of those jobs and much of the local economic boost will vanish after that period. Would you invest in the technology? ', 'Yes', 'No'),
(4, 2, 'You''re the engineer in charge of the design and construction of an office building. After construction is complete and the building is fully occupied, you discover that a mistake in a critical calculation. The building was in an area that experienced hurricanes, but only rarely; however, because of the mistake, the building could not be considered hurricane-proof. Reporting the mistake might lead to a multi-million dollar lawsuit against your employer, ruin the company''s reputation and probably cause you to lose your job. Would you report the mistake to your superior? ', 'Yes', 'No'),
(5, 2, 'You report the mistake to your superior, who informs you that your job is secure - on the condition that you will not reveal the mistake to anyone else, ever. Would you accept this deal or report the mistake to outside authorities?', 'I''d report the mistake', 'I would not report the mistake, ever'),
(6, 2, 'You report the mistake to your superior and, as you expected, lose your job. Months later, you discover that the company hasn''t revealed the mistake and no action has been initiated to alleviate the potential problem. This also means that the engineering community doesn''t know about your mistake and, therefore, your reputation is not in jeopardy. Would you report the problem to outside authorities?', 'I''d report the mistake', 'I would not report the mistake, ever'),
(7, 3, 'There''s a project to replace a fence in a remote location.  The previous engineer used an unusual anchoring system. You have a conventional, modern system in mind; however, because of the remote location, the cost of transporting materials and workers would be very high - it would cost as much as ten times more to install the modern system. Which system would you use?', 'the old unusual system', 'the conventional, modern system'),
(8, 3, 'The old system lasted for 20 years. You do some calculations and find that, according to your figures, the old system shouldn''t have lasted five years, must less 20 years. You can''t verify that the old, unusual system would work again. Which system would you use?', 'the old unusual system', 'the different, modern system'),
(9, 3, 'If the fence were to fail, it would simply fall over in an area where there are no people or buildings. Safety is not an issue. Which anchoring system would you use? ', 'the old unusual system', 'the different, modern system'),
(10, 4, '<p>A city hires an engineering firm to design a retaining wall that would hold back the flood waters that would result if there were a 30-year rain. The engineering firm develops a design and meets with city officials to discuss it. The officials feel that the design could be simplified and made less expensive; the engineers believe that a simpler design would endanger tens of thousands of lives and property. The city demands that the engineering firm turn over the drawings; the city wants to give the plans to another engineering firm that has agreed to complete the project as the city wishes. The city offers to pay the original engineering firm for the drawings and the work that it completed.</p>\n<p>Is the original engineering firm obligated to hand over the drawings, whether they accept payment or not?</p>\n', 'Yes', 'No'),
(11, 4, 'Is the original engineering firm obligated to alert citizens or a higher government authority about the potential danger of the retaining wall that the city plans to build?', 'Yes', 'No'),
(12, 5, 'You work in the hard disk drive group of the semiconductor division at a large information technology company.  Your group is designing a read channel chip, a chip that communicates between the computer and the disk. This is a very competitive area in the semiconductor business. You employ the common practice of reverse engineering to see what your biggest competitor is doing and eventually uncover the chip''s system-level design. Does it matter how much or how little of the design you use in your own design?', 'Yes', 'No'),
(13, 5, 'Both companies agree that reverse engineering and learning from what others have done is a valid practice; however, they also agree it must be done in with care - learning what others have done is valid, but copying what they have done is dishonest. Does it matter how much of the design you use in your own design, as long as it isn''t an exact copy?', 'Yes', 'No'),
(14, 6, 'You work for a company that has just won a government contract to create fully autonomous battle robots. The contract for these future weapons, sometimes called "killer robots," has the potential to grow into a billion-dollar contract. The company offers you the opportunity to work on the program; that is, you can opt out of the assignment if you want. However, the job will put you in a prestigious position in the company and will be accompanied by a substantial raise in salary. Would you accept the position?', 'Yes', 'No'),
(15, 6, 'You learn that the killer robots must be fully autonomous and be able to choose and fire on targets without human intervention, which would give machines the power to decide who lives and dies on the battlefield.  Would you accept the position? ', 'Yes', 'No');

-- --------------------------------------------------------

--
-- Table structure for table `ethic_users`
--

CREATE TABLE `ethic_users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_ip` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `user_ip` (`user_ip`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
