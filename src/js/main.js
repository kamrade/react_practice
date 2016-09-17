
let React = require('react');
let ReactDOM = require('react-dom')




let App = React.createClass({
	getInitialState: function(){
		return{
			text: 'Hello World',
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
				<h1>{this.state.text}</h1>
				<form>
					<input type="text" onChange={this.changeText} value={this.state.text} />
					<button className="btn brn-primary">Click Me</button>
				</form>
			</div>
		);
	},
	changeText: function(e){
		this.setState({text: e.target.value})
	}
});


ReactDOM.render(<App />, document.querySelector("#app"));
