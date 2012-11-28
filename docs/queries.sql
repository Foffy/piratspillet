-- CREATE GAME
INSERT INTO games (ip,browser,started) VALUES ($ip,$browser,$timestamp)
-- returns the autoincremented id

-- ROLLS
UPDATE rolls SET $field = $field + 1, last = $timestamp WHERE gameId = $gameId AND player = $player

-- if 0 affected create
INSERT INTO rolls (gameId,player,$field,first,last) VALUES ($gameId, $player, 1, $timestamp, $timestamp)

-- LANDED
UPDATE landed SET $field = $field + 1 WHERE gameId = @gameId AND player = $player

-- if 0 affected create
INSERT INTO landed (gameId,player,$field) VALUES ($gameId, $player, 1)

-- ACTIVATED
UPDATE activated SET $field = $field + 1 WHERE gameId = $gameId AND player = $player

-- if 0 affected create
INSERT INTO activated (gameId,player,$field) VALUES ($gameId, $player, 1)

-- COINS
UPDATE coins SET gold = gold + $gold, silver = silver + $silver, whore = whore + $whore WHERE gameId = $gameId AND player = $player

-- if 0 affected create
INSERT INTO coins (gameId, player, gold, silver, whore) VALUES ($gameId, $player, $gold, $silver, $whore)

-- SIPS
UPDATE sips SET taken = taken + $taken, given = given + $given WHERE gameId = $gameId AND player = $player

-- if 0 affected create
INSERT INTO sips (gameId, player, taken, given) VALUES ($gameId, $player, $taken, $given)