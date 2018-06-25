/*
1.
SELECT Politicians.name, Politicians.location,Politicians.grade_current, count(Politicians.name) AS totalVote FROM Voting 
JOIN Politicians
	ON Politicians.id_politician = Voting.id_politician
WHERE Politicians.grade_current < 9
GROUP by Politicians.name
ORDER by Politicians.grade_current

2.

SELECT 
	(select count(Voting.id_politician) from Voting
    WHERE Politicians.id_politician = Voting.id_politician
    ) AS totalVote,
	Politicians.name AS politicianName,
	(Voters.first_name || ' ' || Voters.last_name) AS voterName,
	Voters.gender
FROM Voting
	JOIN Politicians
		ON Voting.id_politician = Politicians.id_politician
	JOIN Voters
        ON Voters.id_voter = Voting.id_voter
ORDER BY totalVote DESC
LIMIT 3;

3. 

SELECT 
	(SELECT COUNT(Voting.id_voter) FROM Voting
	WHERE Voting.id_voter = Voters.id_voter) AS totalVotes,
	(Voters.first_name || ' ' || Voters.last_name) AS name,
	Voters.gender,
	Voters.age
FROM Voting
	JOIN Voters
		ON Voting.id_voter = Voters.id_voter
GROUP BY Voting.id_voter
ORDER BY totalVotes DESC
*/

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./poll.db')

db.all(
    `SELECT Politicians.name, Politicians.location,Politicians.grade_current, count(Politicians.name) AS totalVote FROM Voting 
    JOIN Politicians
        ON Politicians.id_politician = Voting.id_politician
    WHERE Politicians.grade_current < 9
    GROUP by Politicians.name
    ORDER by Politicians.grade_current`, 

    function (err,data) {
        if (err) throw err
        console.log('RELEASE 0 - 1: ');        
        console.log(data);   
    }
)

db.all(
    `SELECT 
	(select count(Voting.id_politician) from Voting
    WHERE Politicians.id_politician = Voting.id_politician
    ) AS totalVote,
	Politicians.name AS politicianName,
	(Voters.first_name || ' ' || Voters.last_name) AS voterName,
	Voters.gender
FROM Voting
	JOIN Politicians
		ON Voting.id_politician = Politicians.id_politician
	JOIN Voters
        ON Voters.id_voter = Voting.id_voter
ORDER BY totalVote DESC
LIMIT 3;`, 

    function (err,data) {
        if (err) throw err
        console.log('RELEASE 0 - 2: ');
        console.log(data);   
    }
)

db.all(
    `SELECT 
	(SELECT COUNT(Voting.id_voter) FROM Voting
	WHERE Voting.id_voter = Voters.id_voter) AS totalVotes,
	(Voters.first_name || ' ' || Voters.last_name) AS name,
	Voters.gender,
	Voters.age
FROM Voting
	JOIN Voters
        ON Voting.id_voter = Voters.id_voter
WHERE totalVotes > 1
GROUP BY Voting.id_voter
ORDER BY totalVotes DESC`, 

    function (err,data) {
        if (err) throw err
        console.log('RELEASE 0 - 3: ');
        console.log(data);   
    }
)


