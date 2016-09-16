
let React = require('react');
let ReactDOM = require('react-dom')




let Jumbotron = React.createClass({
	render: function(){
		return(
			<div>
				<div className="jumbotron">
					<h1>Title</h1>
					<p>...</p>
					<p><a href="#" className="btn btn-primary btn-lg" role="button">Learn More</a></p>
				</div>
			</div>
		);
	}
});




ReactDOM.render(<Jumbotron />, document.querySelector("#jumbotron"));
