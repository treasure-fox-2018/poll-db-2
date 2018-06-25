'use strict'

const db = require('./db')

class fraud {
    static lowestGrade() {
      const query = `SELECT name, location, grade_current, COUNT(*) as totalVote
                        FROM politicans
                        JOIN votes
                        ON politicans.id = votes.politicanId
                        WHERE politicans.grade_current < 9
                        GROUP BY politicans.name
                        ORDER BY totalVote ASC`

      db.all(query, function (err, result) {
          console.log(result);
      })
    }

    static highestPoliticanWithVoters() {
        const query = `SELECT totalCount,
                              name,
                              (first_name || ' ' || last_name) AS voterName,
                              gender FROM votes,
                                (SELECT COUNT(politicanId) AS totalCount,
                                name,
                                politicanId FROM politicans
                                LEFT JOIN votes
                                ON politicans.id = votes.politicanId
                                GROUP BY politicanId
                                ORDER BY totalCount DESC
                                LIMIT 3) AS newTable
                          LEFT JOIN voters
                          ON votes.voterId = voters.id
                          WHERE votes.politicanId = newTable.politicanId`

        db.all(query, function (err, result) {
            console.log(result);
        })
    }

    static findFrauder() {
        const query = `SELECT COUNT(voterId) AS totalVote,
                              (first_name || ' ' || last_name) as name,
                              gender,
                              age FROM voters
                          LEFT JOIN votes
                          ON voters.id = votes.voterId
                          GROUP BY name
                          HAVING totalVote > 1
                          ORDER BY totalVote DESC`
        db.all(query, function(err, result) {
          console.log(result);
        })
    }

}

fraud.lowestGrade()
fraud.highestPoliticanWithVoters()
fraud.findFrauder()
