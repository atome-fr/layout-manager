import Splitter from './splitter.js';

class HorizontalSplitter extends Splitter {
	

	constructor(parent){
		super(parent);
		this.element.addClass('horizontal');
		this.element.css({width:'100%',height:'10px'});
	}
}

module.exports = HorizontalSplitter;

