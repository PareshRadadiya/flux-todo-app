var React = require('react');
var TodoConstants = require( '../constants/TodoConstants' );
var TodoActions = require('../actions/TodoActions');
var TodoStore = require( '../stores/TodoStore' );

var Footer = React.createClass({
	/**
	 * @return {object}
	 */
	render: function() {

		let clearCompletedButton = null;
		const completedItems = TodoStore.getCompletedItems();

		if ( completedItems.length > 0 ) {
			clearCompletedButton = (
				<button
					type="button"
					onClick={this._onDestroyCompletedClick}
					className="clear-completed"
				>
					Clear completed
				</button>
			);
		}

		return (
			<footer className="footer">
				<span className="todo-count">
					<strong>{this.props.leftItemsCount}</strong> left
				</span>
				<ul className="filters">
					<li>
						<a
							href="#!"
							onClick={() => this._onFilterClick( TodoConstants.ALL_TODOS )}
							className={this.props.filter === TodoConstants.ALL_TODOS ? 'selected' : ''}>
							All
						</a>
					</li>
					{' '}
					<li>
						<a
							href="#!"
							onClick={() => this._onFilterClick( TodoConstants.ACTIVE_TODOS )}
							className={this.props.filter === TodoConstants.ACTIVE_TODOS ? 'selected' : ''}>
							Active
						</a>
					</li>
					{' '}
					<li>
						<a
							href="#!"
							onClick={() => this._onFilterClick( TodoConstants.COMPLETED_TODOS )}
							className={this.props.filter === TodoConstants.COMPLETED_TODOS ? 'selected' : ''}>
							Completed
						</a>
					</li>
				</ul>
				{clearCompletedButton}
			</footer>
		);
	},

	_onDestroyCompletedClick: function() {
		TodoActions.destroyCompleted();
	},

	_onFilterClick: function( filter ) {
		TodoActions.updateFilter( filter );
	}

});
module.exports = Footer;