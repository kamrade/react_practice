
let React = require('react');
let ReactDOM = require('react-dom')

let App = React.createClass({
	getInitialState: function(){
		return {
			text: "Hello World"
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
				<br/>
				<ComponentTwo name={this.state.text} />
			</div>
		);
	},
	changeText: function(e){
		this.setState({text: e.target.value})
	}
});

let ComponentTwo = React.createClass({
	render: function(){
		return (
			<div>
				{this.props.name}
			</div>
		);
	}
});

ReactDOM.render(<App />, document.querySelector("#app"));
