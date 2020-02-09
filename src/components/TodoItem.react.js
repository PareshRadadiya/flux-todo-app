var React = require('react');
var TodoActions = require('../actions/TodoActions');
var TodoItem = React.createClass({

	render: function() {
		var todo = this.props.todo;
		return (
			<li
				key={todo.id}
				className={(
					           this.props.todo.complete ? ' completed ' : ''
				           ) + (
					           this.props.todo.editing ? ' editing ' : ''
				           )}
			>
				<div className="view">
					<input
						className="toggle"
						type="checkbox"
						onChange={this._onToggleClick}
						checked={todo.complete}
					/>
					<label>
						{todo.text}
					</label>
					<button className="destroy" onClick={this._onDestroyClick} />
				</div>
			</li>
		);
	},
	_onDestroyClick: function() {
		TodoActions.destroy(this.props.todo.id);
	},
	_onToggleClick: function() {
		TodoActions.toggle(this.props.todo.id);
	}
});
module.exports = TodoItem;