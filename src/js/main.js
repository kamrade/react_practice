
var React = require('react');
var ReactDOM = require('react-dom')

var App = React.createClass({
	getInitialState: function(){
		return {
			text: '',
			isEdit: 0,
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
				<TodoForm
					{...this.state}
					changeText={this.handleChangeText}
					onTodoUpdate={this.handleTodoUpdate}
					onTodoAdd={this.handleTodoAdd}
				/>
				<TodoList
					{...this.state}
					// todos={this.state.todos}
					// insert all of the state values in this component
					deleteTodo={this.handleTodoDelete}
					editTodo={this.handleTodoEdit}
				/>
			</div>
		);
	},
	handleTodoEdit: function(todo){
		this.setState({
			text: todo.text,
			isEdit: todo.id
		});
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
	handleTodoUpdate: function(todo){
		var todos = this.state.todos;
		for(var i = 0, l = todos.length; i < l; i++){
			if(todos[i].id == todo.id){
				todos.splice(i, 1);
				break;
			}
		}
		todos.push(todo)
		this.setState({todos: todos});
	},
	handleTodoAdd: function(text){
		var newTodo = {
			id: this.state.todos.length + 1 + new Date().getTime(),
			text: text
		};
		this.setState({todos: this.state.todos.concat(newTodo)});
	},
	handleChangeText: function(text){
		this.setState({text: text});
	}
});

var TodoForm = React.createClass({
	render: function(){
		return(
			<div>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label htmlFor="">Todo Text
						<input value={this.props.text} className="form-control" type="text" ref="text" onChange={this.onChange} /></label>
					</div>
				</form>
			</div>
		);
	},
	onChange: function(e){
		console.log("changing text");
		this.props.changeText(e.target.value);
	},
	onSubmit: function(e){
		e.preventDefault();
		var text = this.refs.text.value.trim();

		if(!text){
			alert('Please enter a todo');
			return;
		}

		if(this.props.isEdit){
			var updatedTodo = {
				id: this.props.isEdit,
				text: text
			}
			this.props.onTodoUpdate(updatedTodo);
		} else {
			this.props.onTodoAdd(text);
		}

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
							<span onClick={this.editTodo.bind(this, todo)} >{todo.text}</span>
							<a className="delete" onClick={this.onDelete.bind(this, todo)} href="#">x</a>
						</li>
					})
				}
			</ul>
		);
	},
	onDelete: function(todo){
		this.props.deleteTodo(todo);
	},
	editTodo: function(todo){
		this.props.editTodo(todo);
	}
});

ReactDOM.render(<App />, document.querySelector("#app"));
