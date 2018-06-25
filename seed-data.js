let db = require('./setup')
const fs = require('fs')

let politicians = fs.readFileSync('politicians.csv', 'utf-8').split('\n')
for(let i=1; i<politicians.length; i++){
    let politician = politicians[i].split(',')
    let query = `INSERT INTO politicians (name, party, location, grade_current) VALUES ('${politician[0]}', '${politician[1]}', '${politician[2]}', '${politician[3]}')`
    db.run(query, function(err){
        if(err) throw err
        // console.log("Successfully input data politicians!");
    })
}

let voters = fs.readFileSync('voters.csv', 'utf-8').split('\n')
for(let i=1; i<voters.length; i++){
    let voter = voters[i].split(',')
    let query = `INSERT INTO voters (first_name, last_name, gender, age) VALUES ("${voter[0]}", "${voter[1]}", "${voter[2]}", "${voter[3]}")`
    db.run(query, function(err){
        if(err) throw err
        // console.log("Successfully input data voters!");
    })
}

var votes = fs.readFileSync('votes.csv', 'utf-8').split('\n')
for(let i=1; i<votes.length; i++){
    var vote = votes[i].split(',')
    let query = `INSERT INTO votes (voterId, politicianId) VALUES ("${vote[0]}","${vote[1]}")`
    db.run(query, function(err){
        if(err) throw err
        // console.log("Successfully input data votes!");
    })
}