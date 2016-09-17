
let React = require('react');
let ReactDOM = require('react-dom')




let App = React.createClass({
	getInitialState: function(){
		return{
			text: '',
			todos: [
				{
					id: 1,
					name: "Meeting at work"
				},
				{
					id: 2,
					name: "Meeting at home"
				},
				{
					id: 3,
					name: "Go to space"
				}
			]
		};
	},
	render: function(){
		return(
			<div>
				<TodoForm />
				<TodoList todos={this.state.todos} />
			</div>
		);
	}
});

let TodoForm = React.createClass({
	render: function(){
		return(
			<div>
				TodoForm
			</div>
		);
	}
});

let TodoList = React.createClass({
	render: function(){
		return(
			<ul className="list-group">
				{
					this.props.todos.map(todo => {
						return <li className="list-group-item" todo={todo} key={todo.id} >{todo.name}</li>
					})
				}
			</ul>
		);
	}
});

ReactDOM.render(<App />, document.querySelector("#app"));
