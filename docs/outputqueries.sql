/* Top sips taken */
SELECT player, SUM(taken), SUM(given) FROM sips GROUP BY player ORDER BY SUM(taken) DESC, SUM(given) DESC LIMIT 10

/* Top coins */
SELECT player, SUM(whore), SUM(gold), SUM(silver) FROM coins GROUP BY player ORDER BY SUM(whore) DESC, SUM(gold) DESC, SUM(silver) DESC LIMIT 10

/* Top winners */
SELECT player, COUNT(gameId) FROM winners GROUP BY player ORDER BY COUNT(gameId) DESC LIMIT 10

/* Most rounds */
SELECT player, SUM(harbour) FROM landed GROUP BY player ORDER BY SUM(harbour) DESC LIMIT 10