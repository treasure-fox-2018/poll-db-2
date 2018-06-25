const Model = require('../model/model')
const View = require('../view/view')


class Controller {
  static query1() {
    Model.query1(function(data) {
      let title = "List votes of politicians that have grade under 9"
      View.printTable(title, data)
    })
  }

  static query2() {
    Model.query2(function(data) {
      let title = "List of top 3 voted politicians and their voters"
      View.printTable(title, data)
    })
  }

  static query3() {
    Model.query3(function(data) {
      let title = "List of cheated voters who voted more than 1"
      View.printTable(title, data)
    })
  }
  
}

module.exports = Controller