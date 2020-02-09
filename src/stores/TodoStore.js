var AppDispatcher = require( '../dispatcher/AppDispatcher' );
var EventEmitter = require( 'events' ).EventEmitter;
var TodoConstants = require( '../constants/TodoConstants' );
var assign = require( 'object-assign' );
var CHANGE_EVENT = 'change';
var _todos = []; // collection of todo items
var _filter = TodoConstants.ALL_TODOS;

/**
 * Create a TODO item.
 * @param {string} text The content of the TODO
 */
function create( text ) {
// Using the current timestamp in place of a real id.
	var id = Date.now();
	_todos.push({
		id: id,
		complete: false,
		text: text,
	});
}

/**
 * Delete a TODO item.
 * @param {string} id
 */
function destroy( id ) {
	for ( let i = 0; i < _todos.length; i++ ) {
		if ( _todos[i].id === id ) {
			_todos.splice(i, 1);
		}
	}
}

/**
 * Delete completed TODO items.
 * @param {string} id
 */
function destroyCompleted() {
	for ( let i = 0; i < _todos.length; i++ ) {
		if ( _todos[i].complete ) {
			_todos.splice(i, 1);
		}
	}
}

/**
 * Toggle a TODO item.
 * @param {string} id
 */
function toggle( id ) {
	for ( let i = 0; i < _todos.length; i++ ) {
		if (  _todos[i].id === id ) {
			_todos[i].complete = ! _todos[i].complete;
		}
	}
}

/**
 * Toggle all TODO items.
 * @param {boolean} complete
 */
function toggleAll( complete ) {
	for ( let i = 0; i < _todos.length; i++ ) {
		_todos[i].complete = complete;
	}
}

/**
 * Toggle all TODO items.
 * @param {string} filter
 */
function updateFilter( filter ) {
	_filter = filter;
}

var TodoStore = assign( {}, EventEmitter.prototype, {
	/**
	 * Get the entire collection of TODOs.
	 * @return {object}
	 */
	getAll: function() {
		return _todos;
	},
	areAllComplete: function() {
		for ( let i = 0; i < _todos.length; i++ ) {
			if ( ! _todos[i].complete ) {
				return false;
			}
		}

		return true;
	},
	getCompletedItems: function() {
		let completedItems = [];
		for ( let i = 0; i < _todos.length; i++ ) {
			if (  _todos[i].complete ) {
				completedItems.push( _todos[i] )
			}
		}
		return completedItems;
	},
	getActiveItems: function() {
		let activeItems = [];
		for ( let i = 0; i < _todos.length; i++ ) {
			if (  ! _todos[i].complete ) {
				activeItems.push( _todos[i] )
			}
		}
		return activeItems;
	},
	getFilter: function() {
		return _filter;
	},
	emitChange: function() {
		this.emit( CHANGE_EVENT );
	},
	/**
	 * @param {function} callback
	 */
	addChangeListener: function( callback ) {
		this.on( CHANGE_EVENT, callback );
	},
	/**
	 * @param {function} callback
	 */
	removeChangeListener: function( callback ) {
		this.removeListener( CHANGE_EVENT, callback );
	},
	dispatcherIndex: AppDispatcher.register( function( payload ) {
		var action = payload.action;
		var text;
		switch ( action.actionType ) {
			case TodoConstants.TODO_CREATE:
				text = action.text.trim();
				if ( text !== '' ) {
					create( text );
					TodoStore.emitChange();
				}
				break;
			case TodoConstants.TODO_DESTROY:
				destroy( action.id );
				TodoStore.emitChange();
				break;
			case TodoConstants.TODO_TOGGLE:
				toggle( action.id );
				TodoStore.emitChange();
				break;
			case TodoConstants.TODO_TOGGLE_ALL:
				toggleAll( action.complete );
				TodoStore.emitChange();
				break;
			case TodoConstants.TODO_DESTROY_COMPLETED:
				destroyCompleted();
				TodoStore.emitChange();
				break;
			case TodoConstants.TODO_UPDATE_FILTER:
				updateFilter( action.filter );
				TodoStore.emitChange();
				break;
		}
		return true; // No errors. Needed by promise in Dispatcher.
	} ),
} );
module.exports = TodoStore;
