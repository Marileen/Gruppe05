-- phpMyAdmin SQL Dump
-- version 2.11.11.3
-- http://www.phpmyadmin.net
--
-- Host: mysql5.service
-- Erstellungszeit: 17. Januar 2016 um 15:23
-- Server Version: 5.0.96
-- PHP-Version: 5.4.42

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Datenbank: `HTO01FLQZCHT_2`
--

CREATE DATABASE `HTO01FLQZCHT_2`;
USE `HTO01FLQZCHT_2`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Attendees`
--

CREATE TABLE IF NOT EXISTS `Attendees` (
  `Event_ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `status` varchar(50) default NULL,
  KEY `Event_ID` (`Event_ID`),
  KEY `User_ID` (`User_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `Attendees`
--

INSERT INTO `Attendees` (`Event_ID`, `User_ID`, `status`) VALUES
  (59, 74, '1'),
  (59, 74, '1'),
  (52, 74, '1'),
  (66, 72, '1'),
  (66, 73, '1'),
  (66, 1, '1'),
  (73, 74, '1'),
  (1, 74, '1'),
  (54, 74, '1'),
  (59, 1, '1'),
  (2, 74, '1'),
  (74, 74, '1'),
  (75, 74, '1'),
  (73, 73, '1'),
  (75, 1, '1'),
  (59, 73, '1'),
  (30, 1, '1'),
  (1, 73, '1'),
  (69, 73, '1'),
  (77, 74, '1'),
  (76, 74, '1'),
  (74, 1, '1');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Contacts`
--

CREATE TABLE IF NOT EXISTS `Contacts` (
  `User_ID` int(11) NOT NULL,
  `Contact_ID` int(11) NOT NULL,
  KEY `User_ID` (`User_ID`),
  KEY `Contact_ID` (`Contact_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `Contacts`
--

INSERT INTO `Contacts` (`User_ID`, `Contact_ID`) VALUES
  (73, 1),
  (74, 72),
  (74, 73),
  (74, 2),
  (72, 73),
  (72, 74),
  (1, 74),
  (72, 1),
  (73, 74),
  (73, 72),
  (1, 73),
  (74, 1),
  (1, 72),
  (84, 72),
  (82, 74),
  (1, 2),
  (74, 77),
  (77, 74);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Events`
--

CREATE TABLE IF NOT EXISTS `Events` (
  `Event_ID` int(11) NOT NULL auto_increment,
  `Title` varchar(255) NOT NULL,
  `Description` varchar(5000) NOT NULL,
  `Street` varchar(255) NOT NULL,
  `Nr` varchar(30) NOT NULL,
  `Postcode` varchar(30) NOT NULL,
  `City` varchar(255) NOT NULL,
  `CalendarDate` varchar(100) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `MapLink` varchar(500) default NULL,
  `TimeInfo` varchar(100) default NULL,
  `mm` int(11) NOT NULL default '-1',
  `yyyy` int(11) NOT NULL default '0',
  `dd` int(11) NOT NULL default '0',
  PRIMARY KEY  (`Event_ID`),
  KEY `User_ID` (`User_ID`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=83 ;

--
-- Daten für Tabelle `Events`
--

INSERT INTO `Events` (`Event_ID`, `Title`, `Description`, `Street`, `Nr`, `Postcode`, `City`, `CalendarDate`, `User_ID`, `MapLink`, `TimeInfo`, `mm`, `yyyy`, `dd`) VALUES
  (1, 'Semesterprojekt Praesentation lorem', 'Neue Beschreibung. Dieses ist ein Testevent. Wenn du der Owner bist, kannst du es bearbeiten. Ansnsten kannst du teilnehmen und Dinge zum mitbringen anklicken, viel spaÃŸ dabei.', 'MÃ¶nkhofer Weg', '239', '23562', 'LÃ¼beck', '25.1.2016', 1, 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2354.2889670904624!2d10.697072951466312!3d53.837724145394205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b2091092f60c01:0xd5b857864e8ef7ee!2sMÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¶nkhofer Weg 136, 23562 LÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¼beck!5e0!3m2!1sde!2sde!4v1451472809117', '13 Uhr', 1, 2016, 25),
  (2, 'Tolle Party', 'Beispiel Lorem Ipsum', 'Ernst Barlach Ring', '21', '22345', 'Hamburg', '2016-02-17 11:37:22', 2, NULL, '00:00', 2, 2016, 9),
  (3, 'Testevent von User Peter', 'User Peter Silie hat in der DB die Event ID 3, das hier ist sein erstes Event', 'Grünendeicher Straße', '40', '21680', 'Stade', '2016-01-30 11:37:50', 3, NULL, '00:00', 2, 2016, 21),
  (52, 'Silvesterfeier', 'Richtig toll feiern in der City', 'Zirkusweg', '3', 'xxxxx', 'Hamburg', '2031-12-20 16:00:00', 73, 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2370.5817092456577!2d9.964079951386637!3d53.5473825672368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b18f72e6d9aef3:0xc0efe1efce898d22!2sZirkusweg 3, 20359 Hamburg!5e0!3m2!1sde!2sde!4v1451993397798', '00:00', 2, 2016, 10),
  (30, 'Chillen beim Grillen', 'Wir treffen uns zum Angrillen bei uns.', 'Am Steinautal', '51', '21514', 'BÃ¼chen', '31.1.2016', 74, '53.48367#10.59964', '', 1, 2016, 31),
  (54, 'Junggesellenabschied', 'Keine Hochzeit kommt heute ohne einen Junggesellenabschied aus. Es wird dÃ¼mmlich und peinlich, nervig und aggressiv.  Unterwegs mit einer MÃ¤delsgruppe. Daneben benehmen erwÃ¼nscht.', 'Dummstrasse ', '16', '22941', 'Hasenpfotenstadt', '22.2.2016', 1, '', '12 Uhr', 2, 2016, 22),
  (69, 'Chillen beim Grillen', 'Mal sehen was kommt ...', 'Am Steinautal', '51', '21514', 'BÃ¼chen', '30.1.2016', 74, '53.48367#10.59964', '19:00', 1, 2016, 30),
  (59, 'Geheime Geburtstagsparty fÃ¼r meine Schwester', 'Wir wollen sie Ã¼berraschen, also klickt an was ihr mitbringt und so weiter lorem ipsum dolor. Dieses ist der letzte Satz.', 'DorfstraÃŸe ', '161', '22941', 'Ahrensburg', '9.2.2016', 72, '', '', 2, 2016, 9),
  (66, 'Abgabe fÃ¼r Webprogrammierung', 'Wir geben ab und bestehen mehr als erfolgreich.', 'Am Steinautal', '51', '21514', 'BÃ¼chen', '17.1.2016', 74, '', '', 1, 2016, 17),
  (68, 'Freunde treffen', 'Mal wieder zusammen sitzen und SpaÃŸ haben', '', '', '', 'Bei mir zu Hause', '6.1.2016', 74, '', '00:00', 1, 2016, 6),
  (73, 'Noch zwei Tage dann knallt die Scheisse', 'Loem sdfnsekfjwe gw rgerh', 'teststr', '11', '23455', 'FÃ¼rth', '10.1.2016', 1, '', '14 Uhr ', 1, 2016, 10),
  (74, 'Housewarming Party', 'Einweihungsparty mit Angrillen - egal wie das Wetter wird.', 'Friesenstrasse', '22', '25832', 'TÃ¶nning', '6.2.2016', 73, '', '16:00', 2, 2016, 6),
  (75, 'Pseudo-Party', 'Ach .... mir war halt mal so', 'Ort des Vergessens', '99', '12345', 'Musterstadt', '9.1.2016', 73, '', '', 1, 2016, 9),
  (76, 'Test am Samstag', 'wefwefwef', 'Hufeisenring 25', '31', '22941', 'Bargteheide', '27.1.2016', 1, '53.73773929999999#10.2492311', '', 1, 2016, 27),
  (77, 'samstag 2', 'sfgdfg', '', '', '', 'trittau', '24.1.2016', 1, '', '', 1, 2016, 24),
  (78, 'Gans essen', 'Lorem blubber dolor sir aet', 'GrÃ¼nendeicher StraÃŸe', '', '21680', 'Stade', '20.1.2016', 82, '53.600568#9.4884922', '12', 1, 2016, 20),
  (79, 'Riesenparty', '', '', '', '', 'Irgendwo', '31.1.2016', 81, '', '20:00', 1, 2016, 31),
  (80, 'Grillparty', '...wurst und bier', 'hinzkunz', '1', '12345', 'Musterhausen', '22.1.2016', 83, '', '21.00', 1, 2016, 22),
  (81, 'sghsdfh', 'sdfhsdfh', 'adfgdfg', '', 'afg', 'adsfg', '17.1.2016', 83, '', 'dfgdfg', 1, 2016, 17),
  (82, 'Lerngruppe Datenbanken', 'PrÃ¼fungen Aaaaahhhhhhhhh!', 'Dudenstr.', '34', '85367', 'Zeug ', '29.1.2016', 84, '', '11:00', 1, 2016, 29);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Items`
--

CREATE TABLE IF NOT EXISTS `Items` (
  `Item_ID` int(11) NOT NULL auto_increment,
  `Event_ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  PRIMARY KEY  (`Item_ID`),
  KEY `Event_ID` (`Event_ID`),
  KEY `User_ID` (`User_ID`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=37 ;

--
-- Daten für Tabelle `Items`
--

INSERT INTO `Items` (`Item_ID`, `Event_ID`, `User_ID`, `Name`) VALUES
  (1, 59, 1, 'Fernglas'),
  (24, 59, 73, 'TaschentÃ¼cher'),
  (3, 59, 74, 'Holz'),
  (10, 66, 72, 'Gute Laune'),
  (9, 66, 73, 'WP-Unterlagen'),
  (11, 66, 72, 'Erleichterung'),
  (12, 74, 0, 'Bier'),
  (13, 74, 1, 'Cola'),
  (14, 74, 0, 'Fleisch'),
  (15, 74, 74, 'Noch mehr Fleisch'),
  (16, 74, 74, 'Habe ich Fleisch erwÃ¤hnt?'),
  (17, 74, 0, 'Und Salat ... als Alibi'),
  (21, 75, 1, 'sooo egal'),
  (20, 75, 74, 'ach .... wirklich egal'),
  (25, 78, 0, 'SoÃŸe'),
  (26, 78, 0, 'Gabel'),
  (27, 78, 0, 'LÃ¶ffel'),
  (28, 79, 0, 'Pizza'),
  (29, 80, 0, 'alles andere'),
  (30, 81, 0, 'sdfgsdh'),
  (31, 82, 0, 'Skript'),
  (32, 82, 0, 'alte Klausuren');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Users`
--

CREATE TABLE IF NOT EXISTS `Users` (
  `User_ID` int(11) NOT NULL auto_increment,
  `Firstname` varchar(255) NOT NULL,
  `Lastname` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Birthdate` varchar(50) NOT NULL,
  `Picture` varchar(255) default NULL,
  `Password` varchar(255) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Status` varchar(50) default NULL,
  UNIQUE KEY `User_ID` (`User_ID`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=85 ;

--
-- Daten für Tabelle `Users`
--

INSERT INTO `Users` (`User_ID`, `Firstname`, `Lastname`, `Email`, `Birthdate`, `Picture`, `Password`, `Username`, `Status`) VALUES
  (1, 'Hans', 'Mustermann', 'muster@web.de', '0000-00-00', NULL, '098f6bcd4621d373cade4e832627b4f6', 'Hansi', 'online'),
  (2, 'Karl', 'Tester', 'tester@web.de', '0000-00-00', NULL, '', '', 'online'),
  (3, 'Peter', 'Silie', 'silie@web.de', '0000-00-00', NULL, '', '', NULL),
  (4, 'Heinz', 'Ellmann', 'ellmann@web.de', '0000-00-00', NULL, '', '', NULL),
  (5, 'Wilma', 'Bier', 'bier@web.de', '0000-00-00', NULL, '', '', NULL),
  (6, 'Franz', 'Brandwein', 'brandwein@web.de', '0000-00-00', NULL, '', '', NULL),
  (7, 'Max', 'Mustermann', 'mustermann@web.de', '0000-00-00', NULL, '', '', NULL),
  (8, 'Anne', 'Ohren', 'ohren@web.de', '0000-00-00', NULL, '', '', NULL),
  (84, 'Rebecca', 'Marius', 'beckybettinger@yahoo.de', '28.061987', NULL, '962012d09b8170d912f0669f6d7d9d07', 'Rebecca', 'offline'),
  (83, 'Mops', 'Wurst', '', '1.1.2016', NULL, 'c20ad4d76fe97759aa27a0c99bff6710', 'Mopsi', 'online'),
  (82, 'Mari', 'Stamer', 'blubb@blubber.de', '1.juni', NULL, '098f6bcd4621d373cade4e832627b4f6', 'Testmarileen', 'online'),
  (81, 'Birgit', 'Reiter', 'reiterbirgit@t-online.de', '23.03.1970', NULL, 'cbbd7b006b9738f21181ebfc898b4605', 'caecilie99', 'offline'),
  (80, 'Jessica', 'test', 'mmmmarileen@gmx.net', 'sfv', NULL, '098f6bcd4621d373cade4e832627b4f6', 'Jessi', 'offline'),
  (79, 'Honkibong', 'test', 'wef@de.de', 'ddd', NULL, '098f6bcd4621d373cade4e832627b4f6', 'Honk', 'offline'),
  (78, 'Olaf', 'von Testhausen am Nordpol', 'olaftest@test.de', 'xxx', NULL, '098f6bcd4621d373cade4e832627b4f6', 'Olaf', 'offline'),
  (77, 'Sandra', 'Garding', 'sandra.garding@web.de', '12.07.1988', NULL, '1de0d5e5c412890d4071af8ecd8c8ad7', 'schnuffimaus', NULL),
  (76, 'Carla', 'Testmann', 'carla@carlchen.de', '', NULL, '098f6bcd4621d373cade4e832627b4f6', 'PinkLady', 'offline'),
  (75, 'Sören', 'User', 'test@test.de', 'test-geb', NULL, '827ccb0eea8a706c4c34a16891f84e7b', 'testuser', NULL),
  (73, 'Thomas', 'Krieger', 'thomas.krieger@stud.fh-luebeck.de', '28.04.1978', NULL, '1a4ac58f28b9785179d836eaf54d0294', 'TKrieger', 'online'),
  (74, 'Torsten', 'Garding', 'jasokuhl@hotmail.com', '12.12.1986', NULL, 'e531f8edafdd7d05ec48a17c1b0d7ce6', 'jasokuhl', 'offline'),
  (72, 'Marileen', 'Stamer', 'marileen@gmx.net', 'test-geb', NULL, '098f6bcd4621d373cade4e832627b4f6', 'Marileen', 'offline');
