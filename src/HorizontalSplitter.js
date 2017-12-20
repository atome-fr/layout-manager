import Splitter from './splitter.js';

class HorizontalSplitter extends Splitter {
	

	constructor(parent){
		super(parent);
		this.element.addClass('splitter horizontal');
	}
}

module.exports = HorizontalSplitter;

