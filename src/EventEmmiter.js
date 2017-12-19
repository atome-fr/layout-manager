import Event from './Event.js';


class EventEmmiter {
	

	constructor(){
		this.listeners = {};
	}

	addEventListener(type,callback){
		if(!this.listeners[type]){
			this.listeners[type] = [];
		}
		this.listeners[type].push(callback);
	}

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

	dispatch(event){
		event.target = this;
		if(this.listeners[event.type]){
			this.listeners[event.type].forEach((cb)=>{
				cb.apply(this,[event]);
			});
		}
	}

}

module.exports = EventEmmiter;