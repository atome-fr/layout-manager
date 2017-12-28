import SplitterComponent from './SplitterComponent.js';
import VerticalSplitter from './VerticalSplitter.js';

class RowComponent extends SplitterComponent{

	/**
	* Create a row component that display a list of component align horizontaly
	* @param id [String] id of the component
	*/
	constructor(id){
		super(id);
		this.element.addClass('row');
	}

	/**
	* Get the width of a children of the component
	* @param component [LayoutComponent] The children of the component
	* @return [Float] The width of the children
	*/
	_getWidthOf(component){
		var splittersWidth = this._splitters.reduce((acc,val)=>{return acc + val.width;},0);
		return (this.width-splittersWidth) * this.ratios[this.children.indexOf(component)];
	}

	/**
	* Return a splitter for the components
	* @return [Splitter] The splitter that will be added to the component
	*/
	_createSplitter(){
		var splitter = new VerticalSplitter(this);
		return splitter;
	}
	
	/**
	* Callback called when a splitter is dragged
	* @param evt [Event] The event dispatched when the splitter is dragged
	*/
	_onSplitterDrag(evt){
		var splittersWidth = this._splitters.reduce((acc,val)=>{return acc + val.width;},0);
		const ratioOffset = (evt.params.x / (this.width-splittersWidth));
		const i = this._splitters.indexOf(evt.target);

		this._updateRatios(i,ratioOffset);	
	}


}

module.exports = RowComponent;