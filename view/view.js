let Table = require('cli-table');

class View {

  static printTable(title, data) {
    console.log(title)
    let table = new Table({
        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
              , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
              , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
              , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
      });
    let header = Object.keys(data[0])
    table.push(header)
    for (let i = 0 ; i < data.length ; i++) {
      let rowData = []
      for (let index in data[i]) {
        rowData.push(data[i][index])
      }
      table.push(rowData)
    }
    console.log(table.toString());
  }
}

module.exports = View