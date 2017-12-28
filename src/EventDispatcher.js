

class EventDispatcher {
	

	/**
	* Create an object that can dispatch events
	*/
	constructor(){
		this.listeners = {};
	}

	/**
	* Add a callback the a certain type of events
	* @param type [String] the type of event to listen
	* @param callback [Function] the function that will be called when the event is dispatched
	*/
	addEventListener(type,callback){
		if(!this.listeners[type]){
			this.listeners[type] = [];
		}
		this.listeners[type].push(callback);
	}

	/**
	* Remove a callback to a type of events
	* @param type [String] the type of event to remove callback
	* @param callback [Function] the function that will be remove to the listeners
	*/
	removeEventListener(type,callback){
		if(this.listeners[type]){
			if(callback){
				const callbacks = this.listeners[type];
				callbacks.splice(callbacks.indexOf(callback),1);
			}else{
				this.listeners[type] = [];
			}
		}
	}
	
	/**
	* Dispatch an event throught the object
	* @param event [Event] The event to dispatch
	*/
	dispatch(event){
		event.target = this;
		if(this.listeners[event.type]){
			this.listeners[event.type].forEach((cb)=>{
				cb.apply(this,[event]);
			});
		}
	}

}

module.exports = EventDispatcher;