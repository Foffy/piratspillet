SELECT player, SUM(taken), SUM(given) FROM sips GROUP BY player ORDER BY SUM(taken) DESC, SUM(given) DESC LIMIT 10

SELECT player, SUM(whore), SUM(gold), SUM(silver) FROM coins GROUP BY player ORDER BY SUM(whore) DESC, SUM(gold) DESC, SUM(silver) DESC LIMIT 10

SELECT player, COUNT(gameId) FROM winners GROUP BY player ORDER BY COUNT(gameId) DESC LIMIT 10