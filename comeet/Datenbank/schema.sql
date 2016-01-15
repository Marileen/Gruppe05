-- phpMyAdmin SQL Dump
-- version 2.11.11.3
-- http://www.phpmyadmin.net
--
-- Host: mysql5.service
-- Erstellungszeit: 15. Januar 2016 um 19:23
-- Server Version: 5.0.96
-- PHP-Version: 5.4.44

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
  `Time` varchar(100) default NULL,
  `mm` int(11) NOT NULL default '-1',
  `yyyy` bigint(20) NOT NULL default '0',
  `dd` int(11) NOT NULL default '0',
  PRIMARY KEY  (`Event_ID`),
  KEY `User_ID` (`User_ID`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=71 ;

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=539 ;

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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=81 ;
