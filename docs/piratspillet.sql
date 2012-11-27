-- Drop if exists
IF OBJECT_ID('rolls', 'U') IS NOT NULL
  DROP TABLE rolls;
IF OBJECT_ID('landed', 'U') IS NOT NULL
  DROP TABLE landed;
IF OBJECT_ID('activated', 'U') IS NOT NULL
  DROP TABLE dbo.activated;
IF OBJECT_ID('coins', 'U') IS NOT NULL
  DROP TABLE coins;
IF OBJECT_ID('sips', 'U') IS NOT NULL
  DROP TABLE sips;

-- Create tables
CREATE TABLE rolls (gameId int(6) NOT NULL, player varchar(25) NOT NULL, first datetime NOT NULL, last datetime NOT NULL, one int(6) DEFAULT 0, two int(6) DEFAULT 0, three int(6) DEFAULT 0, four int(6) DEFAULT 0, five int(6) DEFAULT 0, six int(6) DEFAULT 0, PRIMARY KEY (gameId,player));

CREATE TABLE landed (gameId int(6) NOT NULL, player varchar(25) NOT NULL, harbour int(6) DEFAULT 0, parrotTwo int(6) DEFAULT 0, skull int(6) DEFAULT 0, buyOne int(6) DEFAULT 0, mouth int(6) DEFAULT 0, parrotThree int(6) DEFAULT 0, chestOpen int(6) DEFAULT 0, buyTwo int(6) DEFAULT 0, exchange int(6) DEFAULT 0, steal int(6) DEFAULT 0, parrotFour int(6) DEFAULT 0, chestClosed int(6) DEFAULT 0, island int(6) DEFAULT 0, buyThree int(6) DEFAULT 0, PRIMARY KEY (gameId,player));

CREATE TABLE activated (gameId int(6) NOT NULL, player varchar(25) NOT NULL, harbour int(6) DEFAULT 0, parrotTwo int(6) DEFAULT 0, skull int(6) DEFAULT 0, buyOne int(6) DEFAULT 0, mouth int(6) DEFAULT 0, parrotThree int(6) DEFAULT 0, chestOpen int(6) DEFAULT 0, buyTwo int(6) DEFAULT 0, exchange int(6) DEFAULT 0, steal int(6) DEFAULT 0, parrotFour int(6) DEFAULT 0, chestClosed int(6) DEFAULT 0, island int(6) DEFAULT 0, buyThree int(6) DEFAULT 0, PRIMARY KEY (gameId,player));

CREATE TABLE coins (gameId int(6) NOT NULL, player varchar(25) NOT NULL, gold int(6) DEFAULT 0, silver int(6) DEFAULT 0, whore int(6) DEFAULT 0, PRIMARY KEY (gameId,player));

CREATE TABLE sips (gameId int(6) NOT NULL, player varchar(25) NOT NULL, taken int(6) DEFAULT 0, given int(6) DEFAULT 0, PRIMARY KEY (gameId,player));

