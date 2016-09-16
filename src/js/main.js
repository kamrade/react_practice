console.log( "D3 version: " + d3.version );

var React = require('react');
var ReactDOM = require('react-dom')


// getInitialState
// getDefaultProps
// componentWillMount
// componentDidMount

var Jumbotron = React.createClass({
	propTypes: {
		// свойство title должно быть строкой и оно required
		title: React.PropTypes.string.isRequired
	},
	getDefaultProps: function(){
		return {
			title      : "Hey, this is the title",
			main_title : "Hello woo!",
			link       : "http://google.com"
		};
	},
	render: function(){
		return(
			<div>
				<div className="jumbotron">
					<h1>{this.props.main_title}</h1>
					<a href={this.props.link}><p>{this.props.title}</p></a>
				</div>
			</div>
		);
	}
})

var Component = React.createClass({
	render: function(){
		return (
			<div className="component">
				<strong><p>This is my component, {this.props.name}</p></strong>
			</div>
		)
	}
});

ReactDOM.render(<Jumbotron />, document.querySelector("#jumbotron"));
ReactDOM.render(<Component name="Denis"/>, document.querySelector("#main"));
