import SplitterComponent from './SplitterComponent.js';
import VerticalSplitter from './VerticalSplitter.js';

class RowComponent extends SplitterComponent{

	constructor(id){
		super(id);

		this.element.addClass('row');
	}

	_getWidthOf(component){
		return this.width * this.ratios[this.children.indexOf(component)];
	}

	_createSplitter(){
		return new VerticalSplitter(this);
	}

}

module.exports = RowComponent;