-- Drop 
DROP DATABASE debug_piratspillet;
CREATE DATABASE debug_piratspillet;

-- Create tables
CREATE TABLE debug_piratspillet.games (id int NOT NULL AUTO_INCREMENT, ip varchar(25), browser varchar(255), started datetime NOT NULL, PRIMARY KEY(id));

CREATE TABLE debug_piratspillet.rolls (gameId int NOT NULL, player varchar(25) NOT NULL, first datetime NOT NULL, last datetime NOT NULL, one int(6) DEFAULT 0, two int(6) DEFAULT 0, three int(6) DEFAULT 0, four int(6) DEFAULT 0, five int(6) DEFAULT 0, six int(6) DEFAULT 0, PRIMARY KEY (gameId,player), FOREIGN KEY (gameId) REFERENCES debug_piratspillet.games(id));

CREATE TABLE debug_piratspillet.landed (gameId int NOT NULL, player varchar(25) NOT NULL, harbour int(6) DEFAULT 0, parrotTwo int(6) DEFAULT 0, skull int(6) DEFAULT 0, buyOne int(6) DEFAULT 0, mouth int(6) DEFAULT 0, parrotThree int(6) DEFAULT 0, chestOpen int(6) DEFAULT 0, buyTwo int(6) DEFAULT 0, exchange int(6) DEFAULT 0, steal int(6) DEFAULT 0, parrotFour int(6) DEFAULT 0, chestClosed int(6) DEFAULT 0, island int(6) DEFAULT 0, buyThree int(6) DEFAULT 0, PRIMARY KEY (gameId,player), FOREIGN KEY (gameId) REFERENCES debug_piratspillet.games(id));

CREATE TABLE debug_piratspillet.activated (gameId int NOT NULL, player varchar(25) NOT NULL, harbour int(6) DEFAULT 0, parrotTwo int(6) DEFAULT 0, skull int(6) DEFAULT 0, buyOne int(6) DEFAULT 0, mouth int(6) DEFAULT 0, parrotThree int(6) DEFAULT 0, chestOpen int(6) DEFAULT 0, buyTwo int(6) DEFAULT 0, exchange int(6) DEFAULT 0, steal int(6) DEFAULT 0, parrotFour int(6) DEFAULT 0, chestClosed int(6) DEFAULT 0, island int(6) DEFAULT 0, buyThree int(6) DEFAULT 0, PRIMARY KEY (gameId,player), FOREIGN KEY (gameId) REFERENCES debug_piratspillet.games(id));

CREATE TABLE debug_piratspillet.coins (id int NOT NULL AUTO_INCREMENT, gameId int NOT NULL, player varchar(25) NOT NULL, fromPlayer varchar(25), gold int(6) DEFAULT 0, silver int(6) DEFAULT 0, whore int(6) DEFAULT 0, PRIMARY KEY (gameId,player), FOREIGN KEY (gameId) REFERENCES debug_piratspillet.games(id));

CREATE TABLE debug_piratspillet.sips (gameId int NOT NULL, player varchar(25) NOT NULL, taken int(6) DEFAULT 0, given int(6) DEFAULT 0, PRIMARY KEY (gameId,player), FOREIGN KEY (gameId) REFERENCES debug_piratspillet.games(id));