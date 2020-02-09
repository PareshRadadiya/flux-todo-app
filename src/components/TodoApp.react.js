var Header = require( './Header.react' );
var Footer = require( './Footer.react' );
var MainSection = require( './MainSection.react' );
var React = require( 'react' );
var TodoStore = require( '../stores/TodoStore' );
var TodoConstants = require( '../constants/TodoConstants' );

function getTodoState() {
	return {
		allTodos: TodoStore.getAll(),
		areAllComplete: TodoStore.areAllComplete(),
		filter: TodoStore.getFilter()
	};
}

var TodoApp = React.createClass( {
	getInitialState: function() {
		return getTodoState();
	},
	componentDidMount: function() {
		TodoStore.addChangeListener( this._onChange );
	},
	componentWillUnmount: function() {
		TodoStore.removeChangeListener( this._onChange );
	},

	/**
	 * @return {object}
	 */
	render: function() {
		const completedItems = TodoStore.getCompletedItems();
		const activeItems = TodoStore.getActiveItems();
		let shownItems = [];

		switch ( this.state.filter ) {
			case TodoConstants.ACTIVE_TODOS:
				shownItems = activeItems;
				break;
			case TodoConstants.COMPLETED_TODOS:
				shownItems = completedItems;
				break;
			default:
				shownItems = this.state.allTodos;
		}

		const leftItems = this.state.allTodos.length - completedItems.length;
		return (
			<div>
				<Header/>
				<MainSection
					allTodos={shownItems}
					areAllComplete={this.state.areAllComplete}
				/>
				<Footer
					leftItemsCount={leftItems}
					areAllComplete={this.state.areAllComplete}
					filter={this.state.filter}
				/>
			</div>
		);
	},
	_onChange: function() {
		this.setState( getTodoState() );
	},
} );
module.exports = TodoApp;