# ************************************************************
# Sequel Pro SQL dump
# Version 3348
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: webapps-db.web.itd.umich.edu (MySQL 5.0.45-log)
# Database: engcomm
# Generation Time: 2013-02-06 18:15:41 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table enews
# ------------------------------------------------------------

DROP TABLE IF EXISTS `enews`;

CREATE TABLE `enews` (
  `id` int(11) NOT NULL auto_increment,
  `title` text NOT NULL,
  `img` text NOT NULL,
  `type` int(11) NOT NULL,
  `description` text NOT NULL,
  `href` text NOT NULL,
  `year` int(11) NOT NULL,
  `month` int(11) NOT NULL,
  `orders` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=latin1;

LOCK TABLES `enews` WRITE;
/*!40000 ALTER TABLE `enews` DISABLE KEYS */;

INSERT INTO `enews` (`id`, `title`, `img`, `type`, `description`, `href`, `year`, `month`, `orders`)
VALUES
	(45,'DME: Mobile Supercomputing','img/enews_201302_20130204111751file.jpg',0,'Mobile computers have evolved from limited handheld devices to what we considered, just a few years ago, to be supercomputers.','http://www.engin.umich.edu/newscenter/dme/mightymobile',2013,2,0),
	(46,'U-M ranks among the top 10 innovative universities','img/enews_201302_20130129145337.jpg',1,'U-M, home of TechArb, MCubed and the Master of Entrepreneurship, was named one of the nation&#039;s top 10 most innovative universities by Edudemic.','http://edudemic.com/2013/01/innovative-universities/',2013,2,1),
	(50,'Superomniphobic fabric','img/enews_201302_20130204114349file.jpg',1,'Researchers have developed a nanoscale coating that repels the broadest range of liquids of any material in its class. The coating could lead to breathable garments to protect soldiers and scientists.','http://www.engin.umich.edu/college/about/news/stories/2013/january/a-material-that-most-liquids-wont-wet',2013,2,2),
	(51,'Michigan Student venture hopes to cut fuel emissions','img/enews_201302_20130204121507file.jpg',1,'PicoSpray, a compact fuel-injection system designed specifically for small engines such as those in motorcycles and mopeds, could cut emissions in half while being up to 70 percent cheaper than existing technologies. ','http://www.engin.umich.edu/college/about/news/stories/2012/september/cleaner-motorcycle-engines-student-startup-inspired-by-growing-emissions-in-asia',2013,2,3),
	(53,'MconneX: Preventing Mistakes with Augmented Reality','img/enews_201302_20130204115735file.png',1,'Using new augmented-reality technology, construction sites can be visualized before work begins, allowing for changes to the plan and accident prevention strategies without incurring any costs or safety concerns. ','http://mconnex.engin.umich.edu/michepedia/2013/using-augmented-reality-to-prevent-mistakes-2/',2013,2,4),
	(54,'test','img/enews_201401_201301301140000.jpg',0,'test','',2014,1,0),
	(55,'test','img/enews_201401_201301301140001.jpg',1,'test','',2014,1,1),
	(56,'tewt','img/enews_201401_201301301140002.jpg',1,'wetwt','',2014,1,2),
	(57,'wetwt','img/enews_201401_20130130114112file.jpg',1,'hqhyq','',2014,1,3),
	(58,'An engineer&#039;s story of African-American entrepreneurialism','img/enews_201302_20130204124620file.jpg',1,'EECS alumnus David Tarver&#039;s new memoir explores the challenges of being a minority driven to follow the American dream, and to provide others with opportunities he never had.','http://www.engin.umich.edu/diversity/cedo-alumni-highlight',2013,2,5),
	(59,'MconneX: Creating Lasers with Unprecedented Power','img/enews_201302_20130204124831file.png',1,'Electrical engineer Mohammed Islam is working to create lasers that have an output power of up to 50 watts, allowing them to be used to measure items that are more than a kilometer away. ','http://mconnex.engin.umich.edu/michepedia/2013/creating-lasers-with-unprecendented-power/',2013,2,6),
	(60,'New $28M center will develop computers of 2025','img/enews_201302_20130204125147file.png',1,'Researchers will be tackling the end of Moore&#039;s Law - and designing the computers of 2025 - at a new research center. The Center for Future Architectures Research (C-FAR) aims to harness the power and boost the reliability of the tiniest transistors that will emerge over the next decade.','http://www.engin.umich.edu/college/about/news/stories/2013/january/center-for-future-architectures-research',2013,2,7),
	(61,'Honor a fellow alum','img/enews_201302_20130204125437file.jpg',1,'Know a fellow Michigan Engineer who is making a difference in the world, personifies the College&#039;s tradition of excellence or gives generously of their time or talent to the College? Honor them by submitting a nomination  for the 2013 College of Engineering Alumni Awards. Anyone can nominate an alum for the top three honors, which include Alumni Medal, Distinguished Service and Recent Graduate awards. Deadline is April 5.','http://www.engin.umich.edu/info/alumni/alumni-groups/alumni-board/alumni-awards/',2013,2,8),
	(62,'How to get a Master of Entrepreneurship degree in one year','img/enews_201302_20130204135917file.jpg',1,'If you would like to start your own business consider applying for the one-year Master of Entrepreneurship at U-M. This is a unique program taught jointly by Ross School of Business and Michigan Engineering. The deadline to apply is February 15.','http://entrepreneurship.umich.edu/',2013,2,9);

/*!40000 ALTER TABLE `enews` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
