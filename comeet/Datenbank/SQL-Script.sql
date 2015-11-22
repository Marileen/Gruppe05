CREATE DATABASE Comeet;

-- -----------------------------------------------------
-- Tables
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS User (
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

  User_ID INT NOT NULL,

  INDEX FK_User_Events_IDX (User_ID ASC),

  CONSTRAINT FK_User_Events
  FOREIGN KEY (User_ID) REFERENCES User(ID),

  PRIMARY KEY (ID)
  );


CREATE TABLE IF NOT EXISTS Friends (
  ID INT NOT NULL AUTO_INCREMENT,
  User_ID INT NOT NULL,
  Friend_ID INT NOT NULL,

  INDEX FK_Friends_IDX (User_ID, Friend_ID  ASC),

  CONSTRAINT FK_User
  FOREIGN KEY (User_ID) REFERENCES User(ID),

  CONSTRAINT FK_Friend
  FOREIGN KEY (Friend_ID) REFERENCES User(ID),

  PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS Attendee (
  ID INT NOT NULL AUTO_INCREMENT,
  Event_ID INT NOT NULL,
  User_ID INT NOT NULL,

  INDEX FK_Attendee_IDX (Event_ID, User_ID  ASC),

  CONSTRAINT FK_Event
  FOREIGN KEY (Event_ID) REFERENCES Event(ID),

  CONSTRAINT FK_User
  FOREIGN KEY (User_ID) REFERENCES User(ID),

  PRIMARY KEY (ID)
  );


-- -----------------------------------------------------
-- Inserts
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Insert User
-- -----------------------------------------------------

INSERT INTO User
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
  (Title, Headline, Description, CalendarDate, Street, Nr, Postcode, City, User_ID)
VALUES
  ('Semesterprojekt Präsentation', 'Gruppe5 wird ihr Semesterprojekt - Webanwendung zur selbstorganisieren Eventplanung vorstellen',
    'Überall dieselbe alte Leier. Das Layout ist fertig, der Text lässt auf sich warten. Damit das Layout nun nicht nackt im Raume steht und sich klein und leer vorkommt, springe ich ein: der Blindtext. Genau zu diesem Zwecke erschaffen, immer im Schatten meines großen Bruders »Lorem Ipsum«, freue ich mich jedes Mal, wenn Sie ein paar Zeilen lesen.',
     2015-04-12 10:00:00, 'Mönkhofer Weg', '239', '23562', 'Lübeck', (SELECT User_ID from User where Lastname = 'Gruppe5'));


-- -----------------------------------------------------
-- Insert Attendees
-- -----------------------------------------------------

INSERT INTO Attendees



-- -----------------------------------------------------
-- Insert Friends
-- -----------------------------------------------------

INSERT INTO Friends