// release3

const sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('./poll.db')

db.serialize(() => {

    const query1 = `SELECT name, location, gradeCurrent, COUNT (name) as totalVote
                    FROM politicians
                    LEFT JOIN votes ON politicians.id = votes.politicianId
                    WHERE gradeCurrent<9
                    GROUP BY name
                    ORDER BY gradeCurrent ASC`

    db.all(query1, function(err, row) {
        if (err) {
            console.log (err)
        }  
        console.log(row)
    })

    const query2 = ``

    db.all(query2, function(err, row) {
        if (err) {
            console.log (err)
        }
        console.log(row)
    })

    const query3 = `SELECT COUNT (voters.id) AS totalVote,(firstName||' '||lastName) AS name, gender, age
                    FROM voters
                    LEFT JOIN votes ON voters.id = votes.voterId
                    GROUP BY voters.id
                    HAVING totalVote>1
                    ORDER BY totalVote DESC`

    db.all(query3, function(err, row) {
        if (err) {
            console.log (err)
        }
        console.log(row)
    })

})
db.close()
