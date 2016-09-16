console.log( "D3 version: " + d3.version );

var React = require('react');
var ReactDOM = require('react-dom')

var Component = React.createClass({

	render: function(){
		return (
			<div className="component">
				<h1>This is my component</h1>
				<h3>Hello, {this.props.name}</h3>
			</div>
		)
	}

});

ReactDOM.render(<Component name="Denis"/>, document.querySelector("#main"));
