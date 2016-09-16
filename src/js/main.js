
let React = require('react');
let ReactDOM = require('react-dom')




let Jumbotron = React.createClass({
	getDefaultProps : function() {
		return {
			title: "Hello Title!",
			text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos ea ducimus natus labore velit aspernatur sunt ipsum explicabo libero, temporibus suscipit, cumque, quos accusantium. Corrupti tempora maxime, iure molestias recusandae."
		};
	},
	render: function(){
		return(
			<div>
				<div className="jumbotron">
					<h1>{this.props.title}</h1>
					<p>{this.props.text}</p>
					<p><a onClick={this.onClick.bind(this, 'Racoon', 'Fox')} href="#" className="btn btn-primary btn-lg" role="button">Learn More</a></p>
				</div>
			</div>
		);
	},
	onClick: function(beast1, beast2){
		console.log("click " + beast1 + " | " + beast2);
	}
});




ReactDOM.render(<Jumbotron />, document.querySelector("#jumbotron"));
