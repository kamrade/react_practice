var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var Route = ReactRouter.Router;
var Link = ReactRouter.Link;

var Navigation = ReactRouter.Navigation;
var History = ReactRouter.History;
var createBrowserHistory = require('history/lib/createBrowserHistory');

var h = require('./helpers');

var App = React.createClass({
	render: function(){
		return (
			<div className="catch-of-the-day">
				<Header tagline="Fresh Seafood Market" num="5000" />
				<Order />
				<Inventory />
			</div>
		)
	}
});

/*
	ADD FISH FORM
	<AddFishForm />
*/

var AddFishForm = React.createClass({
	render: function(){
		return (
			<p>Testing. This is the fish form</p>
		)
	}
});


var Header = React.createClass({
	render: function(){
		// console.log(this);
		return (
			<header className="header">
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
			<section className="inventory">
				<h2>Inventory</h2>
				<AddFishForm />
			</section>
		);
	}
});

var Order = React.createClass({
	render: function(){
		return (
			<section className="order">
				<p>Order</p>
			</section>
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
		var name = "Store";
		return (
			<div className="store-selector-wrapper">
				<form className="store-selector" onSubmit={this.goToStore} > 
					{/* This is comment in JSX */}
					<h2>Please Enter a {name}</h2>
					<input type="text" ref="storeId" required defaultValue={h.getFunName()} />
					<input type="submit" value="Enter" />
				</form>
			</div>
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