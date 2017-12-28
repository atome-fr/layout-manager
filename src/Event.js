

class Event {

	/**
	* Create an event object that will be dispatched by an event dispatcher
	* @param type [String] The type of the event dispatched
	* @param params [Object] The optional and added parameters of the event (usualy used by the callback)
	*/
	constructor(type,params){
	
		this.type = type;
		this.params = params;

	}

}

Event.ON_ADDED = "onAdded";
Event.ON_ADDED_TO_LAYOUT = "onAddedToLayout";
Event.ON_RESIZE = "onResize";
Event.ON_REMOVE = "onRemove";

Event.ON_DRAG = "onDrag";
Event.ON_DROP = "onDrop";


module.exports = Event;