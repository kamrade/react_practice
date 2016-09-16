console.log( "D3 version: " + d3.version );
console.log("Test");


var React = require('react');
var ReactDOM = require('react-dom')

// Store picker component
// This will let us make <StorePicker/>
var Component = React.createClass({

	render: function(){
		return (
			<div className="component">
				<h1>This is my component</h1>
				<h3>And small description to it</h3>
				<p>Nullam id dolor id nibh ultricies vehicula ut id elit. Sed posuere consectetur est at lobortis. Nullam id dolor id nibh ultricies vehicula ut id elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nulla vitae elit libero, a pharetra augue. Vestibulum id ligula porta felis euismod semper. Curabitur blandit tempus porttitor. Maecenas sed diam eget risus varius blandit sit amet non magna. Aenean lacinia bibendum nulla sed consectetur. Nullam quis risus eget urna mollis ornare vel eu leo. Vestibulum id ligula porta felis euismod semper.</p>
			</div>
		)
	}

});


ReactDOM.render(<Component/>, document.querySelector("#main"));
