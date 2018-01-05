import Splitter from './Splitter.js';

class HorizontalSplitter extends Splitter {
	
	/**
	* Create an horizontal spliter with the right classes for the DOM element
	* @param parent [LayoutComponent] The component that create the splitter 
	*/
	constructor(parent){
		super(parent);
		this.element.addClass('horizontal');
	}
}

module.exports = HorizontalSplitter;

