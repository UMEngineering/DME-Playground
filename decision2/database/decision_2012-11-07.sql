# ************************************************************
# Sequel Pro SQL dump
# Version 3348
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.5.9)
# Database: decision
# Generation Time: 2012-11-07 16:49:07 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table results
# ------------------------------------------------------------

DROP TABLE IF EXISTS `results`;

CREATE TABLE `results` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `desctiption` text CHARACTER SET utf8,
  `category` varchar(200) DEFAULT NULL,
  `subcategory` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

LOCK TABLES `results` WRITE;
/*!40000 ALTER TABLE `results` DISABLE KEYS */;

INSERT INTO `results` (`id`, `title`, `desctiption`, `category`, `subcategory`)
VALUES
	(1,'Honors Programs','<p>With specialized courses, unique academic tracks and special access to faculty mentors, the Honors Program creates an enriched learning environment. It is a unique opportunity for highly-motivated students to reach their full potential.</p>\n<p>The <a  href=\"http://www.engin.umich.edu/academics/honors/egl\">Engineering Global Leadership (EGL)</a> specialization is a unique opportunity for students interested in integrating engineering into a global business environment. EGL students continue at U-M beyond the College of Engineering Honors Program to earn a Masters in an engineering discipline.</p>','Academics','Programs & Research'),
	(2,'Programs & Minors','<p>The University of Michigan has 95 top-ranked programs, nine top-ten engineering departments, state-of-the-art facilities and award-winning faculty &ndash; which all empower you to carve your own path. The College of Engineering offers 14 undergraduate programs, and many courses for one undergraduate program apply towards the requirements for another. That means that pursuing more than one degree in engineering is not just possible, it\'s encouraged.</p>\n<p>You can also take advantage of a number of joint degrees or minors with other U-M schools.<br /><a href=\"http://www.engin.umich.edu/departments/\">http://www.engin.umich.edu/departments/</a><br /><a href=\"http://www.engin.umich.edu/bulletin/uged/degree.html\">http://www.engin.umich.edu/bulletin/uged/degree.html</a><br /><a href=\"http://www.engin.umich.edu/bulletin/uged/coeminors.html\">http://www.engin.umich.edu/bulletin/uged/coeminors.html</a><br /><a href=\"http://www.engin.umich.edu/bulletin/uged/minors.html\">http://www.engin.umich.edu/bulletin/uged/minors.html</a></p>','Academics','Programs & Research'),
	(3,'Graduate Studies','<p>(Needs content)</p>','Academics','Programs & Research'),
	(4,'Undergraduate Research','<p>The College of Engineering offers hundreds of labs and opportunities to students looking to create their own projects or assist award-winning professors with groundbreaking research. Opportunities are available throughout the semester and during the summer.</p>\n<ul>\n<li><a href=\"http://www.lsa.umich.edu/urop/\">http://www.lsa.umich.edu/urop/</a></li>\n<li><a href=\"http://www.lsa.umich.edu/urop/students/fallwinterprograms/researchscholarsprogram\">http://www.lsa.umich.edu/urop/students/fallwinterprograms/researchscholarsprogram</a></li>\n<li><a href=\"http://www.engin.umich.edu/gradadmissions/sure/\">http://www.engin.umich.edu/gradadmissions/sure/</a></li>\n</ul>','Academics','Programs & Research'),
	(5,'Academic Advising','<p>Academic advising isn?t like high school. At Michigan Engineering, you meet one-on-one with an advisor, who will help you manage your credits and course distributions.<br />\n<a href=\"http://www.engin.umich.edu/students/advising/\">Engineering Advising Center</a><br />\nThe College of Engineering Advising Center is all about helping you explore and navigate your college experience. Your advisor will talk to you about careers, personal counseling and graduation requirements, and help demystify the college experience.\nEmail an advisor {links to the ?Email Us? page under ?Who else is in the pond??}</p>','Academics','Support & Services'),
	(6,'Tutoring','<p>Make no mistake about it: College courses are hard, and sometimes you need to do more than just homework to understand material. That?s where expert, affordable tutoring comes in.<br />\n<a href=\"http://www.engin.umich.edu/elc/\">Engineering Learning Center</a>\nLooking for somewhere quiet to do your homework, with easy access to help if you need it? The ELC was made for you, offering a 24-hour study area with computers, free peer tutoring and academic skill development workshops.<br />\n<a href=\"http://academicsupport.umich.edu/view.cfm?cat=40\">More U-M Tutoring Options</a></p>','Academics','Support & Services'),
	(7,'Health & Wellness','<p>The \"freshman 15\" doesn\'t have to be a reality. Using U-M\'s exercise facilities for cardio, strength training or a game of basketball is time well spent.</p>\n<p><a href=\"http://www.recsports.umich.edu/facilities/north-campus-recreation-building-ncrb\">North Campus Rec Building</a>: Just minutes away from the residence halls, the North Campus Rec Building offers free 7am to 9pm access to weights, cardio machines, a pool and courts for volleyball, basketball, racquetball and more.</p>\n\n<p><a href=\"http://www.recsports.umich.edu/facilities/central-campus-recreation-building-ccrb\">Central Campus Rec Building</a>\n<a href=\"http://www.recsports.umich.edu/facilities/intramural-sports-building-imsb\">Intramural Sports Building</a></p>\n','Academics','Support & Services'),
	(8,'Scholarships & Financial Aid','<p>The College of Engineering offers a variety of scholarships to help you through your college years and reward you for the extraordinary work you have done, and will continue to do.</p>\n<p>There are many scholarships available at U-M. Some are available for all students and others require special applications. The best tactic to secure scholarships is to look into them and apply early, taking the time to revise as needed. And, of course, maintain good academic standing!</p>\n<p><a href=\"http://www.engin.umich.edu/students/scholarships/\">Student Scholarship Opportunities</a></p>','Academics','Support & Services'),
	(9,'Mentoring','<p>Ever feel like you could use an older sibling at U-M? Someone to show you around, help you with your courses, and give you sage advice about college and life? Look no further than a peer mentor!</p>\n<p>Whether you?re taking advantage of one of the many mentoring programs U-M has to offer or you?ve decided to mentor someone yourself, entering into a mentoring relationship with someone is a proud legacy at U-M, forging friendships and connections that last lifetimes.</p>\n<p><a href=\"http://www.engin.umich.edu/students/advising/mentoring\">Engineering Peer Mentors</a></p>','Academics','Support & Services'),
	(10,'Diversity & Social Justice','<p>Having a diverse student population is very important at U-M, and we take social justice to heart, participating in an annual school-wide <a href=\"http://mchange.umich.edu/doc/index.html\">Day of Change</p>, among countless other events. The Day of Change is an event during Welcome Week on the U-M campus that features keynote speakers, discussions and events for anyone interested in pursuing and experiencing the rich diversity the school and Ann Arbor has to offer.</p>','Academics','Support & Services'),
	(11,'Internships & Co-ops','<p>(Needs content)</p>','Opportunities','Career Path'),
	(12,'Entrepreneurship','<p>U-M has the support systems and funding to get you started making your own venture &mdash; the limit is only your ambition and imagination. The <a href=\"http://cfe.umich.edu\">Center for Entrepreneurship</a> connects students with alumni in the start-up community, provides grants, facilitates intellectual property transfer and develops entrepreneurial courses within the College of Engineering. It?s venture accelerator <a href=\"http://cfe.umich.edu/techarb/\">TechArb</a> has granted more than $5 million in start-up funds - launching more than 100 startups by over 300 students!</p>\n<p><a href=\"http://micevc.com/\">Michigan Clean Energy Venture</a><br /><a href=\"https://1000pitches.com\">1000 Pitches</a></p>','Opportunities','Career Path'),
	(13,'Corporate Jobs','<p>(Needs content)</p>','Opportunities','Career Path'),
	(14,'Non-Profit or Public Sector','<p>(Needs content)</p>','Opportunities','Career Path'),
	(15,'Work Abroad','<p>(Needs content)</p>','Opportunities','Career Path'),
	(16,'Design, Test, Build Orgs','<p>If you\'re looking for hands-on experience while you\'re still in college, the design, test and build organizations at Michigan Engineering offer that opportunity. With more than 50 teams in the <a href=\"http://www.engin.umich.edu/teamprojects/\">Wilson Student Team Project Center</a>, students can experience hands-on development, fabrication and develop a well-rounded approach to the engineering system. From Solar Car to BLUELab, the center furnishes groups with an opportunity to interact, share ideas and showcase their projects.</p>\n<p>Many students in the center also participate in the <a href=\"http://www.engin.umich.edu/minors/multidisciplinarydesign/index.html\">Multidisciplinary Design Program</a>, which mimics real-life environments by encouraging teamwork in different specialties.  </p>','Opportunities','Orgs & More'),
	(17,'Volunteering & Service ','<p>Community service is more than just a resume-booster; it\'s a way of exploring Ann Arbor, making new connections, and feeling good about helping others. There are many available <a href=\"http://www.engin.umich.edu/students/involvement/communityservice.html\">Community Service Opportunities</a> through Michigan Engineering and the U-M for you to take advantage of. </p>\n<p>Not sure where you want to do your community service? Visit the <a href=\"http://ginsberg.umich.edu/about/\">Ginsberg Center</a>, an office solely devoted to helping students learn through service. Their advisors will work with you to find the perfect fit, whether it?s tutoring young kids or working in a food kitchen.</p>','Opportunities','Orgs & More'),
	(18,'Volunteering & Service ','<p>In a field that is becoming more global, why not get your international experience started early? The <a href=\"http://www.engin.umich.edu/ipe\">International Programs in Engineering Office</a> makes the travel abroad process easy, and the intercultural learning will last the rest of your life.</p>\n<p>The Engineering Global Leadership (EGL) specialization is a unique opportunity for students interested in integrating engineering into a global business environment. EGL students continue at U-M beyond the College of Engineering Honors Program to earn a Masters in an engineering discipline.</p>','Opportunities','Orgs & More'),
	(19,'Professional & Academic Orgs','<p>(Needs content)</p>','Opportunities','Orgs & More'),
	(20,'Internships & Co-ops','<p>(Needs content)</p>','Opportunities','Orgs & More'),
	(21,'Identity-Based Societies ','<p>(Needs content)</p>','Opportunities','Orgs & More'),
	(22,'Greek Life','<p>(Needs content)</p>','Life & Activities','Extracurriculars'),
	(23,'Music','<p>(Needs content)</p>','Life & Activities','Extracurriculars'),
	(24,'Athletics','<p>(Needs content)</p>','Life & Activities','Extracurriculars'),
	(25,'Intramurals & Fitness','<p>(Needs content)</p>','Life & Activities','Extracurriculars'),
	(26,'Living & Dining','<p>(Needs content)</p>','Life & Activities','Student Life'),
	(27,'Arts & Culture','<p>(Needs content)</p>','Life & Activities','Student Life'),
	(28,'Learning Communities','<p>(Needs content)</p>','Life & Activities','Student Life'),
	(29,'In your free time','<p>(Needs content)</p>','Life & Activities','Student Life');

/*!40000 ALTER TABLE `results` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
