import { ADD_TODO, EDIT_TODO, REMOVE_TODO, MARK_TODO } from '../action_types/todo_action_types'
import { REMOVE_DAY } from '../action_types/day_action_types'

module.exports = function(todos = [], action) {
	switch (action.type) {
		case ADD_TODO:
			var new_id = todos.length == 0 ? 1 : todos[todos.length - 1].id + 1
			return [
				...todos,
				{
					id: new_id,
					text: action.text,
					day_id: action.day_id,
					completed: false
				}
			]
		case EDIT_TODO:
			return todos.map( todo => {
				if (todo.id === action.id) {
					todo.text = action.text
				}
				return todo
			})
		case REMOVE_TODO:
			return todos.reduce(function(new_todos, todo) {
				if (todo.id !== action.id) {
					new_todos.push(todo)
				}
				return new_todos
			}, [])
		case MARK_TODO:
			return Object.assign([], todos.map(function(todo) {
				if (todo.id === action.id) {
					todo.completed = !todo.completed
				}
				return todo
			}))
		case REMOVE_DAY:
			return todos.filter( (todo) => {
				// Remove all todos in this day
				return todo.day_id !== action.id
			})
		default:
			return todos
	}
}