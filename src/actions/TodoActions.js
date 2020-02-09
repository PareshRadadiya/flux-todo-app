/**
 * TodoActions
 */
var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../constants/TodoConstants');
var TodoActions = {
	/**
	 * @param {string} text
	 */
	create: function(text) {
		AppDispatcher.handleViewAction({
			actionType: TodoConstants.TODO_CREATE,
			text: text
		});
	},
	/**
	 * @param {string} id
	 */
	destroy: function(id) {
		AppDispatcher.handleViewAction({
			actionType: TodoConstants.TODO_DESTROY,
			id: id
		});
	},

	destroyCompleted: function() {
		AppDispatcher.handleViewAction({
			actionType: TodoConstants.TODO_DESTROY_COMPLETED,
		});
	},

	/**
	 * @param {string} id
	 */
	toggle: function(id) {
		AppDispatcher.handleViewAction({
			actionType: TodoConstants.TODO_TOGGLE,
			id: id
		});
	},

	toggleAll: function( complete ) {
		AppDispatcher.handleViewAction({
			actionType: TodoConstants.TODO_TOGGLE_ALL,
			complete: complete,
		});
	},

	updateFilter: function( filter ) {
		AppDispatcher.handleViewAction({
			actionType: TodoConstants.TODO_UPDATE_FILTER,
			filter: filter,
		});
	},
};
module.exports = TodoActions;