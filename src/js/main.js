var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var Route = ReactRouter.Router;
// var Link = ReactRouter.Link;

var Navigation = ReactRouter.Navigation;

var History = ReactRouter.History;
var browserHistory = ReactRouter.browserHistory;
var createBrowserHistory = require('history/lib/createBrowserHistory');

var h = require('./helpers');

var App = React.createClass({
	getInitialState: function(){
		return {
			fishes: {},
			order: {}
		};
	},
	addToOrder: function(key){
		this.state.order[key] = this.state.order[key] + 1 || 1;
		this.setState({ order: this.state.order });
	},
	addFish: function(fish){
		var timestamp = (new Date()).getTime();
		// update the state object
		this.state.fishes['fish-' + timestamp] = fish;
		// set the state
		this.setState( {fishes: this.state.fishes} );
	},
	loadSamples: function(){
		this.setState({
			fishes : require('./sample-fishes')
		});
	},
	renderFish: function(key){
		return <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>
	},
	render: function(){
		return (
			<div className="catch-of-the-day">
				<Header tagline="Fresh Seafood Market" num="5000" />
				<ul className="list-of-fishes">
					{Object.keys(this.state.fishes).map(this.renderFish)}
				</ul>
				<Order fishes={this.state.fishes} order={this.state.order} />
				<Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
			</div>
		)
	}
});

/*
	FISH COMPONENT
	<Fish />
*/
var Fish = React.createClass({
	addFish: function(event){
		var key = this.props.index;
		this.props.addToOrder(key);
	},
	render: function(){
		var details = this.props.details;
		var isAvailable = (details.status === 'available' ? true : false);
		var buttonText = (isAvailable ? "Add to order" : "Sold Out");
		return (
			<li className="menu-fish">
				<img src={ details.image } alt={details.name} />
				<h3 className="fish-name">
					{details.name} -
					<span className="price"> { h.formatPrice(details.price) }</span>
				</h3>
				<p>{ details.desc }</p>
				<button disabled={!isAvailable} onClick={this.addFish}>{buttonText}</button>
			</li>
		);
	}
});/* {this.props.index} */

/*
    Add Fish Form
    <AddFishForm />
*/
var AddFishForm = React.createClass({
    createFish: function(event){

        // 1. Stop the form from submitting
		event.preventDefault();
        // 2. Take the data from the form and create an object
		var fish = {
			name : this.refs.name.value,
			price : this.refs.price.value,
			status : this.refs.status.value,
			desc : this.refs.desc.value,
			image : this.refs.image.value
		};

        // 3. Add the fish to the app state
		this.props.addFish(fish);
		this.refs.fishForm.reset();
    },
    render: function(){
        return(
            <form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
                <input type="text" ref="name" placeholder="Fish Name" />
                <input type="text" ref="price" placeholder="Fish Price" />
                <select ref="status">
                    <option value="available">Fresh</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea type="text" ref="desc" placeholder="Description"></textarea>
                <input type="text" ref="image" placeholder="URL to Image" />
                <button type="submit">+ Add Item</button>
            </form>
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
				<AddFishForm {...this.props} />
				<button onClick={this.props.loadSamples} > Load sample fishes </button>
			</section>
		);
	}
});

var Order = React.createClass({
	renderOrder: function(key){
		var fish = this.props.fishes[key];
		var count = this.props.order[key];

		if(!fish){
			return <li key={key}>Sorry, fish no longer available</li>
		}

		return (
			<li>
				{count}lbs
				{fish.name}
				<span className="price">{h.formatPrice(count * fish.price)}</span>
			</li>)
	},
	render: function(){
		var orderIds = Object.keys(this.props.order);
		var total = orderIds.reduce((prevTotal, key)=> {
			var fish = this.props.fishes[key];
			var count = this.props.order[key];
			var isAvailable = fish && fish.status === "available";

			if(fish && isAvailable){
				return prevTotal + (count * parseInt(fish.price) || 0);
			}
			return prevTotal;
		}, 0);
		return (
			<section className="order-wrap">
				<h2 className="order-title">Your order</h2>
				<ul className="order">
					{ orderIds.map(this.renderOrder) }
					<li className="total">
						<strong>Total:</strong>
						{h.formatPrice(total)}
					</li>
				</ul>
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
	<Router history={browserHistory}>
		<Route path="/" component={StorePicker} />
		<Route path="/store/:storeId" component={App} />
		<Route path="*" component={NotFound} />
	</Router>
)


ReactDOM.render(routes, document.querySelector("#main"));
