# ************************************************************
# Sequel Pro SQL dump
# Version 3348
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: webapps-db.web.itd.umich.edu (MySQL 5.0.45-log)
# Database: engcomm
# Generation Time: 2012-10-31 17:23:08 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table difference
# ------------------------------------------------------------

DROP TABLE IF EXISTS `difference`;

CREATE TABLE `difference` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `image1` varchar(200) default NULL,
  `hires` varchar(200) default NULL,
  `name` varchar(100) default NULL,
  `city` varchar(50) default NULL,
  `state` varchar(2) default NULL,
  `country` varchar(20) default NULL,
  `email` varchar(50) default NULL,
  `title` varchar(300) default NULL,
  `story` text,
  `under18` text,
  `color` varchar(12) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

LOCK TABLES `difference` WRITE;
/*!40000 ALTER TABLE `difference` DISABLE KEYS */;

INSERT INTO `difference` (`id`, `image1`, `hires`, `name`, `city`, `state`, `country`, `email`, `title`, `story`, `under18`, `color`)
VALUES
	(1,'http://farm8.staticflickr.com/7117/7455359906_5f68819ebe_z.jpg','http://farm8.staticflickr.com/7117/7455359906_61ed199008_o.jpg','Ben Collins',NULL,NULL,NULL,NULL,NULL,'VJ Tocco working in Prof. Phil Savage\'s lab where they study hydrothermal liquefacation of microalgae with the goal of turning it into liquid fuel.',NULL,'#007679'),
	(2,'http://farm8.staticflickr.com/7234/7204501206_4d999507ef_z.jpg','http://farm8.staticflickr.com/7234/7204501206_80d201f5e8_o.jpg','Ben Collins',NULL,NULL,NULL,NULL,NULL,'Advanced Visualization Specialist Theodore Hall speaks about MIDEN in the Duderstadt Center 3D Lab.',NULL,'#007679'),
	(3,'http://farm9.staticflickr.com/8460/7943618040_385f6301d1_z.jpg','http://farm9.staticflickr.com/8460/7943618040_cf3483b86f_o.jpg','Ben Collins',NULL,NULL,NULL,NULL,NULL,'Michigan solar car attracted a small crowd at the control spot in Alice Springs. Day three of the 2011 WSC in Australia.',NULL,'#007679'),
	(4,'https://sphotos-b.xx.fbcdn.net/hphotos-snc6/165901_10151082506888324_1290709695_n.jpg','https://sphotos-b.xx.fbcdn.net/hphotos-snc6/165901_10151082506888324_1290709695_n.jpg','Ben Collins',NULL,NULL,NULL,NULL,NULL,'Aerospace Engineering Ph.D. student Jessica Jones discusses a model airplane construction with Prof. Carlos Cesnik in his lab.',NULL,'#007679'),
	(5,'http://www.engin.umich.edu/students/prospective/graduate-profile-folder/alumni-profile-image-collection/eric-gustafson-interior-small',NULL,'Ben Collins',NULL,NULL,NULL,NULL,NULL,'Eric Gustafson',NULL,'#007679'),
	(6,'http://www.engin.umich.edu/newscenter/feature-story-photos-repository/mertifulstudentdemo2story.jpg','http://www.engin.umich.edu/newscenter/feature-story-photos-repository/meritful-school-demo/@@download/print_image/mertiful-student-demo-2-hires.jpg','Ben Collins',NULL,NULL,NULL,NULL,NULL,'Azarias Reda is launching a new online social networking platform for high school students.',NULL,'#007679'),
	(7,'http://farm9.staticflickr.com/8016/7656942502_3ce1c94588_z.jpg','http://farm9.staticflickr.com/8016/7656942502_f3c941bd12_o.jpg','Ben Collins',NULL,NULL,NULL,NULL,NULL,'4/17/12 Students in EECS481 demo and present their final projects on the Microsoft Kinect platform. Amelia Atkinson uses her hands to operate and showcase her teams TicTacToe game designed for kids with autism during a Day In the Life of the University of Michigan on April 17, 2012.',NULL,'#007679'),
	(8,'http://farm9.staticflickr.com/8163/7605133734_bab8016ed5_z.jpg','http://farm9.staticflickr.com/8163/7605133734_8f2d7c9a10_o.jpg','Ben Collins',NULL,NULL,NULL,NULL,NULL,'U-M lecturer Paul Kaminski teaches Crossing the Boundaries class in the summer as part of the Michigan Science, Technology, Engineering and Mathematics (M-STEM) Academy for the incoming freshmen. University of Michigan\'s Central Campus. Wednesday, July 11th, 2012',NULL,'#007679'),
	(9,'http://farm9.staticflickr.com/8169/7939029760_05dbe0604e_z.jpg','http://farm9.staticflickr.com/8169/7939029760_d9ac0b83bc_o.jpg','Ben Collins',NULL,NULL,NULL,NULL,NULL,'Local nurse Angela Rosales talks to U-M student Jeremy Koehler about her work at a public health clinic in the village of Santa Cruz on Lake Atitlan in Guatemala. The clinic is in a dire need of even the most basic medicine like tylenol. Friday, March 4th, 2011.',NULL,'#007679'),
	(10,'http://farm9.staticflickr.com/8040/7939259536_a1bf8b4c84_z.jpg','http://farm9.staticflickr.com/8040/7939259536_4926938994_o.jpg','Ben Collins',NULL,NULL,NULL,NULL,NULL,'BLUElab student members, including Sita Syal (right) and ATC\'s Ben Barrie (left) put final touches on the wind turbine prototype. They work with Guatemalan women weavers on Woven Wind Turbine project in a Guatemalan village of Nueva Santa Catarina Ixtahuacán. University of Michigan students are designing a wind turbine that uses locally weaved material for wind blades. The students hope that local women in Guatemala will be able to use current weaving skills to generate income and electricity. Nueva Santa Catarina Ixtahuacán. Wednesday, March 2, 2011.',NULL,'#007679'),
	(11,'http://farm9.staticflickr.com/8288/7515925516_226be030e9_z.jpg','http://farm9.staticflickr.com/8288/7515925516_5710feb540_o.jpg','Ben Collins',NULL,NULL,NULL,NULL,'EECS - Prof. Mohammed Islam','His lab?s current research concentrates on using near and mid-infrared super-continuum sources and their applications in defense and healthcare. On the defense side, the super-continuum sources are being used to protect aircraft against heat seeking missiles and for active sensing of substances such as explosives. On the medical side, therapeutic lasers are being developed to treat hypertension and atrial fibrillation. In addition, diagnostic super-continuum lasers are being developed for non-invasive detection of blood constituents, such as glucose and ketones.',NULL,'#007679'),
	(12,'http://farm9.staticflickr.com/8168/7414786642_b9297ac37d_z.jpg','http://farm9.staticflickr.com/8168/7414786642_8a784915c9_o.jpg','Ben Collins',NULL,NULL,NULL,NULL,'ChemE Professor Charles W. Monroe Liquid Battery Lab','Aaron Shinkle, a graduate student supervised by Charles Monroe and Levi Thompson in the Chemical Engineering Department, works on building a liquid battery cell in the Monroe Laboratory on June 19, 2012. Unlike normal batteries, the liquid battery decouples power from capacity, enabling better control over performance. The non-aqueous single-metal liquid battery Aaron works with is a new, high-density chemistry recently discovered at the University of Michigan.',NULL,'#007679'),
	(13,'http://farm8.staticflickr.com/7226/7296040210_e21c0436f6_z.jpg','http://farm8.staticflickr.com/7226/7296040210_51aa080e12_o.jpg','Ben Collins',NULL,NULL,NULL,NULL,'Quadrotor','Noah Katzman, Stephan Chaves, Ryan Wolcott, and Nick Carlevaris-Bianco test autonomous quadrotor landings in the François-Xavier Bagnoud Building on the University of Michigan\'s North Campus.\n\nThe quadrotor, using its on-board camera, locates the moving Segway and automatically lands on it. This is done to simulate the autonomous landing of a flying vehicle on the deck of a Navy ship.',NULL,'#007679'),
	(14,'http://farm8.staticflickr.com/7253/7695717030_7bef044ea1_z.jpg','http://farm8.staticflickr.com/7253/7695717030_1534b26986_o.jpg','Ben Collins',NULL,NULL,NULL,NULL,'ChE Professor Erdogan Gulari Lab','Members of ChE Professor Erdogan Gulari\'s lab work on preparing test samples in Gulari\'s lab in the HH Dow Building in ann Arbor, MI on July 27, 2012. Gulari\'s research group works on further sequencing the human genome with an approach based on an in situ photosynthesis platform that uses digital photolithography to activate photogenerated reactions in a microfluidic chip to produce large amounts of DNA?s or peptides using inexpensive, conventional DNA/peptide building blocks. This technology enables researchers to gain control over each individual reaction at each reactive site; to eliminate the usage of photomask-guided photolithography thus, reducing the cost considerably; yet maintaining flexibility in design, and feasibility for massively parallel in situ synthesis in their three-dimensional chambers on microfluidic chips.',NULL,'#007679'),
	(15,'http://farm9.staticflickr.com/8170/8044170254_a3d1cc1d00_z.jpg','http://farm9.staticflickr.com/8170/8044170254_da9898cbf8_o.jpg','Ben Collins',NULL,NULL,NULL,NULL,'Associate Dean James Holloway','University students, staff, and faculty attend an International Program in Engineering (IPE) Fireside Chat intended at introducing students to the different perspectives and opportunities that studying abroad offers.',NULL,'#007679'),
	(16,'http://farm8.staticflickr.com/7112/7420317152_56ba61323c_z.jpg','http://farm8.staticflickr.com/7112/7420317152_4fb6c4ffa8_o.jpg','Ben Collins',NULL,NULL,NULL,NULL,NULL,'EECS Graduate Student David Fick works on completing circuit boards, using a probe station that consists of a microscope and high-precision needles for connecting to signals on the surface of chips on June 19, 2012. Various companies manufacture circuit boards that are designed in this lab under the guidance of EECS Professor Dennis Sylvester.',NULL,'#007679'),
	(17,'http://farm8.staticflickr.com/7081/7176673210_4de4485264_z.jpg','http://farm8.staticflickr.com/7081/7176673210_280bb8eba1_o.jpg','Ben Collins',NULL,NULL,NULL,NULL,NULL,'Joshua Anderson (left) and Sharon Glotzer (right), members of The Glotzer Group in the Laboratory for Computational Nanoscience & Soft Matter, discuss their new mathematical exploration into the space of filling solutions.',NULL,'#007679'),
	(18,'http://farm9.staticflickr.com/8330/8116832174_8553c1de12_z.jpg','http://farm9.staticflickr.com/8330/8116832174_c32b03f9ea_o.jpg','Ben Collins',NULL,NULL,NULL,NULL,NULL,'Hannah Cheriyan, Biomedical Engineering Undergraduate, draws a model of a manually-powered portable centrifuge. Cheriyan and other students are part of Centricycle, a group of student entrepeneurs working with the TechArb in Ann Arbor, MI in order to bring this technology and resource to underprivileged rural area in other countries such as India.',NULL,'#007679'),
	(19,'http://farm8.staticflickr.com/7098/7153678429_c11a40f244_z.jpg','http://farm8.staticflickr.com/7098/7153678429_e628902ef2_o.jpg','Ben Collins',NULL,NULL,NULL,NULL,NULL,'U-M Supermileage Team members (from left) Laura Pillari and Robert Ognjanosvski create the first half of the fiberglass mold needed to construct their single-passenger vehicle.',NULL,'#007679');

/*!40000 ALTER TABLE `difference` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
