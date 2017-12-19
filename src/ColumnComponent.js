import SplitterComponent from './SplitterComponent.js';
import HorizontalSplitter from './HorizontalSplitter.js';

class ColumnComponent extends SplitterComponent{

	constructor(id){
		super(id);

		this.element.addClass('column');
	}

	_getHeightOf(component){
		return this.height * this.ratios[this.children.indexOf(component)];
	}

	_createSplitter(){
		return new HorizontalSplitter(this);
	}

}

module.exports = ColumnComponent;