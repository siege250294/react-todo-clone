var React = require('react')
var ToDoForm = require('./ToDoForm.js')
var ToDoList = require('./ToDoList.js')
var ToDoDayHeader = require('./ToDoDayHeader.js')
var todoStore = require('../redux-data/todo_store.js')
var { addTodoActionCreator, markTodoActionCreator } = require('../redux-data/todo_action_creators.js')
var style = require('../style/style.styl')

var todos = [
  {
    id: 1,
    text: "Clean house",
    completed: false
  },
  {
    id: 2,
    text: "Cook",
    completed: true
  },
  {
    id: 3,
    text: "Fix computer",
    completed: false
  }
]

for (var i in todos) {
  todoStore.dispatch(addTodoActionCreator(todos[i].text))
}

var ToDoDay = React.createClass({
  getInitialState: function() {
    // We subscribe the update function of ToDo element so
    // it will update when needed
    todoStore.subscribe(this.update)
    return {todos: todoStore.getState()}
  },
  update: function() {
    this.setState({todos: todoStore.getState()})
  },
  render: function() {
    return (
      <div className={style.todoDay}>
        <ToDoDayHeader date="25-02-1994"/>
        <ToDoList todos={this.state.todos}/>
        <ToDoForm/>
      </div>
    )
  }
})



module.exports = ToDoDay
