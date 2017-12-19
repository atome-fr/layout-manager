import EventEmmiter from './EventEmmiter.js'

class Splitter extends EventEmmiter{

	constructor(){
		super();

		this.parent = parent;

		this.element = $('<div>',{class:'splitter'});

	}


}

module.exports = Splitter;