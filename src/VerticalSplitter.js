import Splitter from './splitter.js';

class VerticalSplitter extends Splitter {
	

	/**
	* Create an vertical spliter with the right classes for the DOM element
	* @param parent [LayoutComponent] The component that create the splitter 
	*/
	constructor(parent){
		super(parent);
		this.element.addClass('vertical');
	}
}

module.exports = VerticalSplitter;