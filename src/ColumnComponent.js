import SplitterComponent from './SplitterComponent.js';

class ColumnComponent extends SplitterComponent{

	constructor(id){
		super(id);

		this.element.addClass('column');
	}

	_getHeightOf(component){
		return this.height * this.ratios[this.children.indexOf(component)];
	}

}

module.exports = ColumnComponent;