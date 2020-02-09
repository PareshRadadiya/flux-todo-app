var React = require('react');
var TodoActions = require('../actions/TodoActions');
var TodoTextInput = require('./TodoTextInput.react');
var Header = React.createClass({
	/**
	 * @return {object}
	 */
	render: function() {
		return (
			<header className="header">
				<h1>todos</h1>
				<TodoTextInput
					className="new-todo"
					placeholder="What needs to be done?"
					onSave={this._onSave}
				/>
			</header>
		);
	},
	/**
	 * Event handler called within TodoTextInput.
	 * Defining this here allows TodoTextInput to be used in multiple places
	 * in different ways.
	 * @param {string} text
	 */
	_onSave: function(text) {
		TodoActions.create(text);
	}
});
module.exports = Header;