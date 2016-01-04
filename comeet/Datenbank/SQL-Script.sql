-- phpMyAdmin SQL Dump
-- version 2.11.11.3
-- http://www.phpmyadmin.net
--
-- Host: mysql5.service
-- Erstellungszeit: 04. Januar 2016 um 17:06
-- Server Version: 5.0.96
-- PHP-Version: 5.4.44

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Datenbank: `HTO01FLQZCHT_2`
--

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
  (1, 6, NULL),
  (1, 4, NULL);

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
  (1, 2),
  (1, 3);

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
  `CalendarDate` datetime NOT NULL,
  `User_ID` int(11) NOT NULL,
  `MapLink` varchar(500) default NULL,
  PRIMARY KEY  (`Event_ID`),
  KEY `User_ID` (`User_ID`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Daten für Tabelle `Events`
--

INSERT INTO `Events` (`Event_ID`, `Title`, `Description`, `Street`, `Nr`, `Postcode`, `City`, `CalendarDate`, `User_ID`, `MapLink`) VALUES
  (1, 'Semesterprojekt Praesentation lorem', 'Dieses ist ein Testevent, du kannst es bearbeiten oder löschen wenn du der Owner bist. Wenn das Event deinem Freund gehört, dann kannst du teilnehmen und falls der Owner Mitbringsel festgelegt hat dann kannst du eines davon anklicken, welches du mitbringen möchtest ', 'Moenkhofer Weg', '239', '23562', 'Luebeck', '2015-12-04 10:00:00', 1, 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2354.2889670904624!2d10.697072951466312!3d53.837724145394205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b2091092f60c01%3A0xd5b857864e8ef7ee!2sM%C3%B6nkhofer+Weg+136%2C+23562+L%C3%BCbeck!5e0!3m2!1sde!2sde!4v1451472809117'),
  (2, 'Event von User 2 Karl Tester', 'Beispiel Lorem Ipsum', 'Ernst Barlach Ring', '21', '22345', 'Hamburg', '2016-02-17 11:37:22', 2, NULL),
  (3, 'Testevent von User Peter', 'User Peter Silie hat in der DB die Event ID 3, das hier ist sein erstes Event', 'Grünendeicher Straße', '40', '21680', 'Stade', '2016-01-30 11:37:50', 3, NULL),
  (4, 'Testevent lorem dÃ¶lÃ¶r', '', 'TeststraÃŸe', '347', '22345', 'Testort an der Blubberalm', '0000-00-00 00:00:00', 0, '');

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Daten für Tabelle `Items`
--

INSERT INTO `Items` (`Item_ID`, `Event_ID`, `User_ID`, `Name`) VALUES
  (1, 1, 4, 'Pflaumen im Speckmantel');

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=76 ;

--
-- Daten für Tabelle `Users`
--

INSERT INTO `Users` (`User_ID`, `Firstname`, `Lastname`, `Email`, `Birthdate`, `Picture`, `Password`, `Username`, `Status`) VALUES
  (1, 'Beipspieluser', 'Gruppe5', 'muster@web.de', '0000-00-00', NULL, '098f6bcd4621d373cade4e832627b4f6', 'user', NULL),
  (2, 'Karl', 'Tester', 'tester@web.de', '0000-00-00', NULL, '', '', NULL),
  (3, 'Peter', 'Silie', 'silie@web.de', '0000-00-00', NULL, '', '', NULL),
  (4, 'Heinz', 'Ellmann', 'ellmann@web.de', '0000-00-00', NULL, '', '', NULL),
  (5, 'Wilma', 'Bier', 'bier@web.de', '0000-00-00', NULL, '', '', NULL),
  (6, 'Franz', 'Brandwein', 'brandwein@web.de', '0000-00-00', NULL, '', '', NULL),
  (7, 'Max', 'Mustermann', 'mustermann@web.de', '0000-00-00', NULL, '', '', NULL),
  (8, 'Anne', 'Ohren', 'ohren@web.de', '0000-00-00', NULL, '', '', NULL),
  (75, 'Sören', 'User', 'test@test.de', 'test-geb', NULL, '827ccb0eea8a706c4c34a16891f84e7b', 'testuser', NULL),
  (73, 'Thomas', 'Krieger', 'thomas.krieger@stud.fh-luebeck.de', '28.04.1978', NULL, '1a4ac58f28b9785179d836eaf54d0294', 'TKrieger', NULL),
  (74, 'Torsten', 'Garding', 'jasokuhl@hotmail.com', '12.12.1986', NULL, 'e531f8edafdd7d05ec48a17c1b0d7ce6', 'jasokuhl', NULL),
  (72, 'Marileen', 'Stamer', 'marileen@gmx.net', 'test-geb', NULL, '098f6bcd4621d373cade4e832627b4f6', 'Marileen', NULL);
