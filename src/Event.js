

class Event {

	constructor(type,params){
	
		this.type = type;
		this.params = params;

	}

}

Event.ON_ADDED = "onAdded";
Event.ON_ADDED_TO_LAYOUT = "onAddedToLayout";
Event.ON_RESIZE = "onResize";
Event.ON_REMOVE = "onRemove";

module.exports = Event;