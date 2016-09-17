
var React = require('react');
var ReactDOM = require('react-dom')

var App = React.createClass({
	getInitialState: function(){
		return {
			text: "Hello World",
			todos: [
				{
					id: 1,
					text: "Meeting At Work"
				},
				{
					id: 2,
					text: "Configure my time machine"
				},
				{
					id: 3,
					text: "Flying to stars"
				}
			]
		};
	},
	render: function(){
		return(
			<div>
				<TodoForm onTodoAdd={this.handleTodoAdd}/>
				<TodoList
					todos={this.state.todos}
					deleteTodo={this.handleTodoDelete}
				/>
			</div>
		);
	},
	handleTodoDelete: function(todo){
		var todos = this.state.todos;
		for(var i = 0, l = todos.length; i < l; i++){
			if(todos[i].id == todo.id){
				todos.splice(i, 1);
				break;
			}
		}
		this.setState({todos: todos});
	},
	handleTodoAdd: function(text){
		var newTodo = {
			id: this.state.todos.length + 1 + new Date().getTime(),
			text: text
		};
		this.setState({todos: this.state.todos.concat(newTodo)});
	}
});

var TodoForm = React.createClass({
	render: function(){
		return(
			<div>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label htmlFor="">Todo Text
						<input className="form-control" type="text" ref="text" onChange={this.onChange} /></label>
					</div>
				</form>
			</div>
		);
	},
	onChange: function(){
		console.log("changing text");
	},
	onSubmit: function(e){
		e.preventDefault();
		var text = this.refs.text.value.trim();

		if(!text){
			alert('Please enter a todo');
			return;
		}

		this.props.onTodoAdd(text);
		this.refs.text.value = "";
	}
});

var TodoList = React.createClass({
	render: function(){

		return(
			<ul className="list-group">
				{
					this.props.todos.map(todo => {
						return <li className="list-group-item" todo={todo} key={todo.id}>
							{todo.text}
							<a className="delete" onClick={this.onDelete.bind(this, todo)} href="#">x</a>
						</li>
					})
				}
			</ul>
		);
	},
	onDelete: function(todo){
		this.props.deleteTodo(todo);
	}
});

ReactDOM.render(<App />, document.querySelector("#app"));
