import SplitterComponent from './SplitterComponent.js';

class RowComponent extends SplitterComponent{

	constructor(id){
		super(id);

		this.element.addClass('row');
	}

	_getWidthOf(component){
		return this.width * this.ratios[this.children.indexOf(component)];
	}

}

module.exports = RowComponent;