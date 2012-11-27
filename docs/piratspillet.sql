CREATE TABLE rolls (gameId int(6) NOT NULL, player varchar(25) NOT NULL, first datetime NOT NULL, last datetime NOT NULL, one int(6) NOT NULL, two int(6) NOT NULL, three int(6) NOT NULL, four int(6) NOT NULL, five int(6) NOT NULL, six int(6) NOT NULL, PRIMARY KEY (gameId,player));

CREATE TABLE landed (gameId int(6) NOT NULL, player varchar(25) NOT NULL, harbour int(6) NOT NULL, parrotTwo int(6) NOT NULL, skull int(6) NOT NULL, buyOne int(6) NOT NULL, mouth int(6) NOT NULL, parrotThree int(6) NOT NULL, chestOpen int(6) NOT NULL, buyTwo int(6) NOT NULL, exchange int(6) NOT NULL, steal int(6) NOT NULL, parrotFour int(6) NOT NULL, chestClosed int(6) NOT NULL, island int(6) NOT NULL, buyThree int(6) NOT NULL, PRIMARY KEY (gameId,player));

CREATE TABLE activated (gameId int(6) NOT NULL, player varchar(25) NOT NULL, harbour int(6) NOT NULL, parrotTwo int(6) NOT NULL, skull int(6) NOT NULL, buyOne int(6) NOT NULL, mouth int(6) NOT NULL, parrotThree int(6) NOT NULL, chestOpen int(6) NOT NULL, buyTwo int(6) NOT NULL, exchange int(6) NOT NULL, steal int(6) NOT NULL, parrotFour int(6) NOT NULL, chestClosed int(6) NOT NULL, island int(6) NOT NULL, buyThree int(6) NOT NULL, PRIMARY KEY (gameId,player));

CREATE TABLE coins (gameId int(6) NOT NULL, player varchar(25) NOT NULL, gold int(6) NOT NULL, silver int(6) NOT NULL, whore int(6) NOT NULL, PRIMARY KEY (gameId,player));

CREATE TABLE sips (gameId int(6) NOT NULL, player varchar(25) NOT NULL, taken int(6) NOT NULL, given int(6) NOT NULL, PRIMARY KEY (gameId,player));

