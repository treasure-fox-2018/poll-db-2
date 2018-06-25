const fs = require('fs')
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./data.db');

    var politicians = fs.readFileSync('./politicians.csv','utf-8').split('\n')
    var query = `INSERT INTO politicians VALUES`
    for(var i = 1; i < politicians.length-1;i++){
        var splitPoliticians = politicians[i].split(',')
        if(i === politicians.length-2){
            query += `(null,"${splitPoliticians[0]}", "${splitPoliticians[1]}", "${splitPoliticians[2]}","${splitPoliticians[3]}");`
        }else{
            query += `(null,"${splitPoliticians[0]}", "${splitPoliticians[1]}", "${splitPoliticians[2]}","${splitPoliticians[3]}"), `
        }
    }

    var voters = fs.readFileSync('./voters.csv','utf-8').split('\n')
    var query = `INSERT INTO voters VALUES`
    for(var i = 1; i < voters.length-1;i++){
            var splitVoters = voters[i].split(',')
            if(i === voters.length-2){
                query += `(null,"${splitVoters[0]}", "${splitVoters[1]}", "${splitVoters[2]}","${splitVoters[3]}");`
            }else{
                query += `(null,"${splitVoters[0]}", "${splitVoters[1]}", "${splitVoters[2]}","${splitVoters[3]}"), `
            }
        }

    var votes = fs.readFileSync('./votes.csv','utf-8').split('\n')
    var query = `INSERT INTO votes VALUES`
    for(var i = 1; i < votes.length-1;i++){
            var splitVotes = votes[i].split(',')
            if(i === votes.length-2){
                query += `("${splitVotes[0]}", "${splitVotes[1]}");`
            }else{
                query += `("${splitVotes[0]}", "${splitVotes[1]}"), `
            }
        }


db.run(query)









    