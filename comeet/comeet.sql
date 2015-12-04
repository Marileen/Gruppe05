CREATE DATABASE Comeet;

-- use Comeet;
-- -----------------------------------------------------
-- Tables
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Users (
  ID INT NOT NULL AUTO_INCREMENT,
  Firstname VARCHAR(255) NOT NULL,
  Lastname VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL,

  PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS Events(
  ID INT NOT NULL AUTO_INCREMENT,
  Title VARCHAR(255) NOT NULL,
  Headline VARCHAR(255) NOT NULL,
  Description VARCHAR(5000) NOT NULL,
  Street VARCHAR(255) NOT NULL,
  Nr VARCHAR(30) NOT NULL,
  Postcode VARCHAR(30) NOT NULL,
  City VARCHAR(255) NOT NULL,
  CalendarDate DATETIME NOT NULL,

  Users_ID INT NOT NULL,

  INDEX FK_Users_Events_IDX (ID ASC),

  CONSTRAINT FK_Users_Events
  FOREIGN KEY (ID) REFERENCES Users(ID),

  PRIMARY KEY (ID)
  );


CREATE TABLE IF NOT EXISTS Contacts (
  User_ID INT NOT NULL,
  Contact_ID INT NOT NULL,

  INDEX FK_Contacts_IDX (User_ID, Contact_ID  ASC),

  CONSTRAINT FK_User
  FOREIGN KEY (User_ID) REFERENCES Users(ID),

  CONSTRAINT FK_Contact
  FOREIGN KEY (Contact_ID) REFERENCES Users(ID)

);

CREATE TABLE IF NOT EXISTS Attendees (
  Event_ID INT NOT NULL,
  User_ID INT NOT NULL,

  INDEX Attendee_IDX (Event_ID, User_ID  ASC),

  CONSTRAINT FK_Attendee_Event
  FOREIGN KEY (Event_ID) REFERENCES Events(ID),

  CONSTRAINT FK_Attendee_User
  FOREIGN KEY (User_ID) REFERENCES Users(ID)

);


-- -----------------------------------------------------
-- Inserts
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Insert User
-- -----------------------------------------------------

INSERT INTO Users
(Firstname, Lastname, Email)
VALUES
  ('User', 'Gruppe5', 'muster@web.de'),
  ('Karl', 'Tester', 'tester@web.de'),
  ('Peter', 'Silie', 'silie@web.de'),
  ('Heinz', 'Ellmann', 'ellmann@web.de'),
  ('Wilma', 'Bier', 'bier@web.de'),
  ('Franz', 'Brandwein', 'brandwein@web.de'),
  ('Max', 'Mustermann', 'mustermann@web.de'),
  ('Anne', 'Ohren', 'ohren@web.de');

-- -----------------------------------------------------
-- Insert Events
-- -----------------------------------------------------

INSERT INTO Events
  (Title, Headline, Description, CalendarDate, Street, Nr, Postcode, City, Users_ID)
VALUES
  ('Semesterprojekt Präsentation', 'Gruppe5 wird ihr Semesterprojekt - Webanwendung zur selbstorganisieren Eventplanung vorstellen',
    'Überall dieselbe alte Leier. Das Layout ist fertig, der Text lässt auf sich warten. Damit das Layout nun nicht nackt im Raume steht und sich klein und leer vorkommt, springe ich ein: der Blindtext. Genau zu diesem Zwecke erschaffen, immer im Schatten meines großen Bruders »Lorem Ipsum«, freue ich mich jedes Mal, wenn Sie ein paar Zeilen lesen.',
     '2015-12-04 10:00:00', 'Mönkhofer Weg', '239', '23562', 'Lübeck', (SELECT ID from Users where Lastname = 'Gruppe5'));


-- -----------------------------------------------------
-- Insert Attendees
-- -----------------------------------------------------

INSERT INTO Attendees
  (Event_ID, User_ID)
VALUES
  ((SELECT ID FROM events WHERE Title = 'Semesterprojekt Präsentation'),(SELECT ID from Users where Lastname = 'Silie')),
  ((SELECT ID FROM events WHERE Title = 'Semesterprojekt Präsentation'),(SELECT ID from Users where Lastname = 'Brandwein'));



-- -----------------------------------------------------
-- Insert Friends
-- -----------------------------------------------------

INSERT INTO Contacts
  (User_ID, Contact_ID)
VALUES
  ((SELECT ID from Users where Lastname = 'Gruppe5'), (SELECT ID from Users where Lastname = 'Silie')),
  ((SELECT ID from Users where Lastname = 'Gruppe5'), (SELECT ID from Users where Lastname = 'Brandwein')),
  ((SELECT ID from Users where Lastname = 'Gruppe5'), (SELECT ID from Users where Lastname = 'Ohren')),
  ((SELECT ID from Users where Lastname = 'Gruppe5'), (SELECT ID from Users where Lastname = 'Bier')),
  ((SELECT ID from Users where Lastname = 'Gruppe5'), (SELECT ID from Users where Lastname = 'Tester')),
  ((SELECT ID from Users where Lastname = 'Gruppe5'), (SELECT ID from Users where Lastname = 'Mustermann')),
  ((SELECT ID from Users where Lastname = 'Gruppe5'), (SELECT ID from Users where Lastname = 'Ellmann'));