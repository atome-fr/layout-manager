

class Event {

	constructor(type){
	
		this.type = type;

	}

}

Event.ON_ADDED = "onAdded";
Event.ON_REMOVE = "onRemove";

module.exports = Event;