-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 09, 2012 at 07:10 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text NOT NULL,
  `media` text NOT NULL,
  `category` text NOT NULL,
  `paragraph` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ans_id` int(11) NOT NULL,
  `q_id` int(11) NOT NULL,
  `question` text NOT NULL,
  `answer` text NOT NULL,
  `logic` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=27 ;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `ans_id`, `q_id`, `question`, `answer`, `logic`) VALUES
(1, 1, 1, 'I imagine myself making a difference by:', 'Developing new technology to make everyday items better, faster, smaller or stronger', 'A4;A3;O3;O6'),
(2, 2, 1, 'I imagine myself making a difference by:', 'Creating sustainable solutions in health, energy or environmental issues', 'A4;O4;O7;O6'),
(3, 3, 1, 'I imagine myself making a difference by:', 'Sharing my knowledge with others and having an impact on the community', 'A3;O4;O7;A9'),
(4, 4, 1, 'I imagine myself making a difference by:', 'Making something new and risky like the next Google or SpaceX', 'A1;O2;O6;L7'),
(5, 5, 1, 'I imagine myself making a difference by:', 'Traveling the world to help developing nations', 'A1;O4;O7;O8'),
(6, 1, 2, 'While in school, I would rather:', 'Get a global perspective by traveling or volunteering in another country', 'A1;O1;O3;O5;O8'),
(7, 2, 2, 'While in school, I would rather:', 'Continue with my artistic endeavors to help hone my creative skills ', 'L2;L6;L7;L8'),
(8, 3, 2, 'While in school, I would rather:', 'Participate in a non-engineering activity or sports team ', 'A7;L3;L4;L1'),
(9, 4, 2, 'While in school, I would rather:', 'Use my skills in a school or community activity or competition', 'A9;O7;O9;O6'),
(10, 5, 2, 'While in school, I would rather:', 'Join a society or organization to make connections with people just like me ', 'O10;A10;L1;L5;L7'),
(11, 6, 2, 'While in school, I would rather:', 'Challenge myself through an academic honors or multidisciplinary program', 'A1;A2;A6;A8;O9'),
(12, 1, 3, 'My personal interests include:', 'Staying healthy and happy through activities and exercise', 'A7;L3;L4;L5;L8'),
(13, 2, 3, 'My personal interests include:', 'Studying cutting edge research, technology and developments', 'A1;A3;A4;A2'),
(14, 3, 3, 'My personal interests include:', 'Creative ventures such as arts, music or literature', 'A2;L6;L2;L7'),
(15, 4, 3, 'My personal interests include:', 'Meeting new people and being involved in group organizations or activities', 'A9;O9;O10;L1;L4'),
(16, 5, 3, 'My personal interests include:', 'Business and innovation through entrepreneurship or competitions', 'O1;O2;O5;O6'),
(17, 1, 4, 'My dream job would be:', 'Working for a large, global corporation', 'O1;O3;O5;O8'),
(18, 2, 4, 'My dream job would be:', 'Getting in on the ground floor of a local startup or creating my own firm', 'A2;O2;O4;O7'),
(19, 3, 4, 'My dream job would be:', 'Continuing in education through research or teaching', 'A1;A3;A4;A5'),
(20, 4, 4, 'My dream job would be:', 'Entering the law, medical or business field', 'A1;A2;A3;A4;A6'),
(21, 5, 4, 'My dream job would be:', 'Dedicating my energies to a non-profit or public job where I can make a difference ', 'A10;O4;O6;O7'),
(22, 1, 5, 'As I enter college, I am most concerned about:', 'The affordability of a college education', 'A5;A8;A10;O10'),
(23, 2, 5, 'As I enter college, I am most concerned about:', 'The pressure and workload of classes', 'A5;A6;A7;A9;O9'),
(24, 3, 5, 'As I enter college, I am most concerned about:', 'Fitting in on campus', 'A9;O10;A10;L1'),
(25, 4, 5, 'As I enter college, I am most concerned about:', 'Where I will live and how I will get around', 'A8;A9;L5;L7;L8'),
(26, 5, 5, 'As I enter college, I am most concerned about:', 'Getting the most of out living in a college town', 'L8;L6;L3;L2');

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE `results` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `r_id` varchar(3) NOT NULL,
  `title` varchar(200) DEFAULT NULL,
  `desctiption` text CHARACTER SET utf8,
  `category` varchar(200) DEFAULT NULL,
  `subcategory` varchar(200) DEFAULT NULL,
  `img_src` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=30 ;

--
-- Dumping data for table `results`
--

INSERT INTO `results` (`id`, `r_id`, `title`, `desctiption`, `category`, `subcategory`, `img_src`) VALUES
(1, 'A1', 'Honors Programs', '<p>With specialized courses, unique academic tracks and special access to faculty mentors, the Honors Program creates an enriched learning environment. It is a unique opportunity for highly-motivated students to reach their full potential.</p>\n<p>The <a  href="http://www.engin.umich.edu/academics/honors/egl">Engineering Global Leadership (EGL)</a> specialization is a unique opportunity for students interested in integrating engineering into a global business environment. EGL students continue at U-M beyond the College of Engineering Honors Program to earn a Masters in an engineering discipline.</p>', 'Academics', 'Programs & Research', 'img/scroll/scroll1.png'),
(2, 'A2', 'Programs & Minors', '<p>The University of Michigan has 95 top-ranked programs, nine top-ten engineering departments, state-of-the-art facilities and award-winning faculty &ndash; which all empower you to carve your own path. The College of Engineering offers 14 undergraduate programs, and many courses for one undergraduate program apply towards the requirements for another. That means that pursuing more than one degree in engineering is not just possible, it''s encouraged.</p>\n<p>You can also take advantage of a number of joint degrees or minors with other U-M schools.<br /><a href="http://www.engin.umich.edu/departments/">http://www.engin.umich.edu/departments/</a><br /><a href="http://www.engin.umich.edu/bulletin/uged/degree.html">http://www.engin.umich.edu/bulletin/uged/degree.html</a><br /><a href="http://www.engin.umich.edu/bulletin/uged/coeminors.html">http://www.engin.umich.edu/bulletin/uged/coeminors.html</a><br /><a href="http://www.engin.umich.edu/bulletin/uged/minors.html">http://www.engin.umich.edu/bulletin/uged/minors.html</a></p>', 'Academics', 'Programs & Research', 'img/scroll/scroll1.png'),
(3, 'A3', 'Graduate Studies', '<p>(Needs content)</p>', 'Academics', 'Programs & Research', 'img/scroll/scroll1.png'),
(4, 'A4', 'Undergraduate Research', '<p>The College of Engineering offers hundreds of labs and opportunities to students looking to create their own projects or assist award-winning professors with groundbreaking research. Opportunities are available throughout the semester and during the summer.</p>\n<ul>\n<li><a href="http://www.lsa.umich.edu/urop/">http://www.lsa.umich.edu/urop/</a></li>\n<li><a href="http://www.lsa.umich.edu/urop/students/fallwinterprograms/researchscholarsprogram">http://www.lsa.umich.edu/urop/students/fallwinterprograms/researchscholarsprogram</a></li>\n<li><a href="http://www.engin.umich.edu/gradadmissions/sure/">http://www.engin.umich.edu/gradadmissions/sure/</a></li>\n</ul>', 'Academics', 'Programs & Research', 'img/scroll/scroll1.png'),
(5, 'A5', 'Academic Advising', '<p>Academic advising isn?t like high school. At Michigan Engineering, you meet one-on-one with an advisor, who will help you manage your credits and course distributions.<br />\n<a href="http://www.engin.umich.edu/students/advising/">Engineering Advising Center</a><br />\nThe College of Engineering Advising Center is all about helping you explore and navigate your college experience. Your advisor will talk to you about careers, personal counseling and graduation requirements, and help demystify the college experience.\nEmail an advisor {links to the ?Email Us? page under ?Who else is in the pond??}</p>', 'Academics', 'Support & Services', 'img/scroll/scroll1.png'),
(6, 'A6', 'Tutoring', '<p>Make no mistake about it: College courses are hard, and sometimes you need to do more than just homework to understand material. That?s where expert, affordable tutoring comes in.<br />\n<a href="http://www.engin.umich.edu/elc/">Engineering Learning Center</a>\nLooking for somewhere quiet to do your homework, with easy access to help if you need it? The ELC was made for you, offering a 24-hour study area with computers, free peer tutoring and academic skill development workshops.<br />\n<a href="http://academicsupport.umich.edu/view.cfm?cat=40">More U-M Tutoring Options</a></p>', 'Academics', 'Support & Services', 'img/scroll/scroll1.png'),
(7, 'A7', 'Health & Wellness', '<p>The "freshman 15" doesn''t have to be a reality. Using U-M''s exercise facilities for cardio, strength training or a game of basketball is time well spent.</p>\n<p><a href="http://www.recsports.umich.edu/facilities/north-campus-recreation-building-ncrb">North Campus Rec Building</a>: Just minutes away from the residence halls, the North Campus Rec Building offers free 7am to 9pm access to weights, cardio machines, a pool and courts for volleyball, basketball, racquetball and more.</p>\n\n<p><a href="http://www.recsports.umich.edu/facilities/central-campus-recreation-building-ccrb">Central Campus Rec Building</a>\n<a href="http://www.recsports.umich.edu/facilities/intramural-sports-building-imsb">Intramural Sports Building</a></p>\n', 'Academics', 'Support & Services', 'img/scroll/scroll1.png'),
(8, 'A8', 'Scholarships & Financial Aid', '<p>The College of Engineering offers a variety of scholarships to help you through your college years and reward you for the extraordinary work you have done, and will continue to do.</p>\n<p>There are many scholarships available at U-M. Some are available for all students and others require special applications. The best tactic to secure scholarships is to look into them and apply early, taking the time to revise as needed. And, of course, maintain good academic standing!</p>\n<p><a href="http://www.engin.umich.edu/students/scholarships/">Student Scholarship Opportunities</a></p>', 'Academics', 'Support & Services', 'img/scroll/scroll1.png'),
(9, 'A9', 'Mentoring', '<p>Ever feel like you could use an older sibling at U-M? Someone to show you around, help you with your courses, and give you sage advice about college and life? Look no further than a peer mentor!</p>\n<p>Whether you?re taking advantage of one of the many mentoring programs U-M has to offer or you?ve decided to mentor someone yourself, entering into a mentoring relationship with someone is a proud legacy at U-M, forging friendships and connections that last lifetimes.</p>\n<p><a href="http://www.engin.umich.edu/students/advising/mentoring">Engineering Peer Mentors</a></p>', 'Academics', 'Support & Services', 'img/scroll/scroll1.png'),
(10, 'A10', 'Diversity & Social Justice', '<p>Having a diverse student population is very important at U-M, and we take social justice to heart, participating in an annual school-wide <a href="http://mchange.umich.edu/doc/index.html">Day of Change</p>, among countless other events. The Day of Change is an event during Welcome Week on the U-M campus that features keynote speakers, discussions and events for anyone interested in pursuing and experiencing the rich diversity the school and Ann Arbor has to offer.</p>', 'Academics', 'Support & Services', 'img/scroll/scroll1.png'),
(11, 'O1', 'Internships & Co-ops', '<p>(Needs content)</p>', 'Opportunities', 'Career Path', 'img/scroll/scroll1.png'),
(12, 'O2', 'Entrepreneurship', '<p>U-M has the support systems and funding to get you started making your own venture &mdash; the limit is only your ambition and imagination. The <a href="http://cfe.umich.edu">Center for Entrepreneurship</a> connects students with alumni in the start-up community, provides grants, facilitates intellectual property transfer and develops entrepreneurial courses within the College of Engineering. It?s venture accelerator <a href="http://cfe.umich.edu/techarb/">TechArb</a> has granted more than $5 million in start-up funds - launching more than 100 startups by over 300 students!</p>\n<p><a href="http://micevc.com/">Michigan Clean Energy Venture</a><br /><a href="https://1000pitches.com">1000 Pitches</a></p>', 'Opportunities', 'Career Path', 'img/scroll/scroll1.png'),
(13, 'O3', 'Corporate Jobs', '<p>(Needs content)</p>', 'Opportunities', 'Career Path', 'img/scroll/scroll1.png'),
(14, 'O4', 'Non-Profit or Public Sector', '<p>(Needs content)</p>', 'Opportunities', 'Career Path', 'img/scroll/scroll1.png'),
(15, 'O5', 'Work Abroad', '<p>(Needs content)</p>', 'Opportunities', 'Career Path', 'img/scroll/scroll1.png'),
(16, 'O6', 'Design, Test, Build Orgs', '<p>If you''re looking for hands-on experience while you''re still in college, the design, test and build organizations at Michigan Engineering offer that opportunity. With more than 50 teams in the <a href="http://www.engin.umich.edu/teamprojects/">Wilson Student Team Project Center</a>, students can experience hands-on development, fabrication and develop a well-rounded approach to the engineering system. From Solar Car to BLUELab, the center furnishes groups with an opportunity to interact, share ideas and showcase their projects.</p>\n<p>Many students in the center also participate in the <a href="http://www.engin.umich.edu/minors/multidisciplinarydesign/index.html">Multidisciplinary Design Program</a>, which mimics real-life environments by encouraging teamwork in different specialties.  </p>', 'Opportunities', 'Orgs & More', 'img/scroll/scroll1.png'),
(17, 'O7', 'Volunteering & Service ', '<p>Community service is more than just a resume-booster; it''s a way of exploring Ann Arbor, making new connections, and feeling good about helping others. There are many available <a href="http://www.engin.umich.edu/students/involvement/communityservice.html">Community Service Opportunities</a> through Michigan Engineering and the U-M for you to take advantage of. </p>\n<p>Not sure where you want to do your community service? Visit the <a href="http://ginsberg.umich.edu/about/">Ginsberg Center</a>, an office solely devoted to helping students learn through service. Their advisors will work with you to find the perfect fit, whether it?s tutoring young kids or working in a food kitchen.</p>', 'Opportunities', 'Orgs & More', 'img/scroll/scroll1.png'),
(18, 'O8', 'Volunteering & Service ', '<p>In a field that is becoming more global, why not get your international experience started early? The <a href="http://www.engin.umich.edu/ipe">International Programs in Engineering Office</a> makes the travel abroad process easy, and the intercultural learning will last the rest of your life.</p>\n<p>The Engineering Global Leadership (EGL) specialization is a unique opportunity for students interested in integrating engineering into a global business environment. EGL students continue at U-M beyond the College of Engineering Honors Program to earn a Masters in an engineering discipline.</p>', 'Opportunities', 'Orgs & More', 'img/scroll/scroll1.png'),
(19, 'O9', 'Professional & Academic Orgs', '<p>(Needs content)</p>', 'Opportunities', 'Orgs & More', 'img/scroll/scroll1.png'),
(21, 'O10', 'Identity-Based Societies ', '<p>(Needs content)</p>', 'Opportunities', 'Orgs & More', 'img/scroll/scroll1.png'),
(22, 'L1', 'Greek Life', '<p>One of the university’s longest traditions, <a href="http://greeklife.umich.edu/">Greek Life</a> will welcome you into a family away from home, creating opportunities and friendships that will last for years to come. The legacy of Greek life at U-M dates back to 1845, when two national fraternities established chapters in Ann Arbor. Today, almost 5,000 students are involved in the Greek Community, with many unique and culturally diverse fraternities and sororities available to anyone.</p>', 'Life & Activities', 'Extracurriculars', 'img/scroll/scroll1.png'),
(23, 'L2', 'Music', '<p>With a campus shared with the School of Music, Theatre & Dance and a town dedicated to local artists, the college is surrounded by chances to get involved with music: <a href="http://www.music.umich.edu/performances_events/event_display.php?f=m">U-M Performances</a>\r\nMichigan Engineering comprises more than one-third of the <a href="http://mmb.music.umich.edu/">Michigan Marching Band</a>, and students interested in playing percussion, brass and woodwinds or being a flag bearer are encouraged to audition and join this musical legacy.</p>', 'Life & Activities', 'Extracurriculars', 'img/scroll/scroll1.png'),
(24, 'L3', 'Athletics', '<p>Michigan athletics is all about being a leader and the best on and off the field - teamwork, loyalty, fun and skill are all strengthened through U-M’s most endearing legacy.  Renowned for our football games in the famous "Big House", Michigan also has winning baseball, basketball, softball and ice hockey teams, among countless others. Many of the events can be attended by students for free through <a href="http://www.mgoblue.com/">MGoBlue</a>.</p>', 'Life & Activities', 'Extracurriculars', 'img/scroll/scroll1.png'),
(25, 'L4', 'Intramurals & Fitness', '<p>Soccer, basketball, tennis and... wallyball? <a href="http://www.recsports.umich.edu/intramurals/">Intramural Sports</a> and <a href="http://www.recsports.umich.edu/clubs/">Club Sports</a> offer dozens of opportunities for students to participate in their favorite sport on a semi-competitive level - so you can get out and get some exercise and have fun doing it.</p>\r\n<p>Or, if you’re just looking for somewhere to work out and relieve some stress during finals, the <a href="http://www.recsports.umich.edu/clubs/">North Campus Rec Building</a> is just minutes away from the residence halls and offers free 7am to 9pm access to weights, cardio machines, a pool and courts for volleyball, basketball, racquetball and more.</p>', 'Life & Activities', 'Extracurriculars', 'img/scroll/scroll1.png'),
(26, 'L5', 'Living & Dining', '<p>Nothing says college life more than living in a residence hall, and U-M’s close-knit communities and modern facilities will make you never want to leave. There are many options to choose from, including <a href="http://www.housing.umich.edu/options/">On-campus</a> and <a href="http://www.offcampus.housing.umich.edu/lt/index.cfm">Off-Campus Housing</a>.</p>\r\n<p>U-M <a href="http://www.housing.umich.edu/dining/">dining & meal plans</a> offers options across campus with <a href="http://www.housing.umich.edu/dining/menus/">menus</a> ranging from pizza buffets to all-vegan fare. But the residence halls aren’t the only food options available at U-M. Your meal plan will also come with <a href="http://www.housing.umich.edu/bluebucks">Blue Bucks</a> -- which allow you to go to food courts across campus and purchase at select restaurants. And, all of Ann Arbor has options ranging from five-star restaurants to college classics like Buffalo Wild Wings.</p>', 'Life & Activities', 'Student Life', 'img/scroll/scroll1.png'),
(27, 'L6', 'Arts & Culture', '<p>As one of Michigan’s cultural hotspots, U-M students can take advantage of film festivals, art fairs and award-winning theatre just minutes away from campus. Located in the heart of downtown Ann Arbor, the historic <a href="http://www.michtheater.org/">Michigan Theatre</a> is a mecca of culture. You can catch organ performances, live speakers, current movies and concerts -- plus the annual Ann Arbor Film Festival and TED talks.</p>\n<p><a href="http://www.umich.edu/museums.php">Local Museums & Galleries</a><br />\n<a href="http://www.umich.edu/perform_arts.php">Local Performing Arts</a></p>', 'Life & Activities', 'Student Life', 'img/scroll/scroll1.png'),
(28, 'L7', 'Learning Communities', '<p>(Needs content)</p>', 'Life & Activities', 'Student Life', 'img/scroll/scroll1.png'),
(29, 'L8', 'In your free time', '<p>(Needs content)</p>', 'Life & Activities', 'Student Life', 'img/scroll/scroll1.png');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
