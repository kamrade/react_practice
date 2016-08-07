var $c_01 = '#4080ff',
	$c_02 = '#1abc9c',
	$c_03 = '#e2234c';

var $c_white = '#fff',
	$c_bg_light = '#f5f8fd',
	$c_border_light = '#d8e1ea',
	$c_text_light_01 = '#778796',
	$c_bg_dark_selected = '#555e75',
	$c_bg_dark_main = '#383f52';

console.log( "D3 version: " + d3.version );




var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var Route = ReactRouter.Router;
var Navigation = ReactRouter.Navigation;
var History = ReactRouter.History;
var createBrowserHistory = require('history/lib/createBrowserHistory');

var h = require('./helpers');




var App = React.createClass({
	render: function(){
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market" num="5000" />
				</div>
				<Order />
				<Inventory />
			</div>
		)
	}
});

var Header = React.createClass({
	render: function(){
		return (
			<header className="top">
				<h1>Cath
					<span className="ofThe">
						<span className="of"> of</span>
						<span className="of"> The </span>
					</span> 
					Day</h1>
				<h3 className="tagline">{this.props.tagline}</h3>
			</header>
		);
	}
});

var Inventory = React.createClass({
	render: function(){
		return (
			<p>Inventory</p>
		);
	}
});

var Order = React.createClass({
	render: function(){
		return (
			<p>Order</p>
		);
	}
});

// StorePicker component
var StorePicker = React.createClass({
	mixins: [History],
	goToStore: function(event){
		event.preventDefault();
		// get the data from input
		var storeId = this.refs.storeId.value;
					// transition from <StorePicker /> to <App />
					// window.location.hash = '#' + storeId
		this.history.pushState(null, '/store/' + storeId);
	},

	render: function(){
		var name = "Wes";
		return (
			<form className="store-selector" onSubmit={this.goToStore} > 
				<h2>Please Enter a Store {name}</h2>
				<input type="text" ref="storeId" required defaultValue={h.getFunName()} />
				<input type="submit" />
			</form>
		)
	}
});

// Not found component
var NotFound = React.createClass({
	render: function(){
		return <h1>Not found.</h1>
	}
});

/*
	REACT ROUTES
*/
var routes = (
	<Router history={ createBrowserHistory() }>
		<Route path="/" component={StorePicker} />
		<Route path="/store/:storeId" component={App} />
		<Route path="*" component={NotFound} />
	</Router>
)


ReactDOM.render(routes, document.querySelector("#main"));