import Splitter from './splitter.js';

class VerticalSplitter extends Splitter {
	

	constructor(parent){
		super(parent);
		this.element.css({width:'10px',height:'100%'});
	}
}

module.exports = VerticalSplitter;