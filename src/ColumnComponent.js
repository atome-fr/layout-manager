import SplitterComponent from './SplitterComponent.js';
import HorizontalSplitter from './HorizontalSplitter.js';

class ColumnComponent extends SplitterComponent{

	/**
	* Create a column component that display a list of component align verticaly
	* @param id [String] id of the component
	*/
	constructor(id){
		super(id);
		this.element.addClass('column');
	}

	/**
	* Get the height of a children of the component
	* @param component [LayoutComponent] The children of the component
	* @return [Float] The height of the children
	*/
	_getHeightOf(component){
		const splittersHeight = this._splitters.reduce((acc,val)=>{return acc + val.height;},0);
		return (this.height-splittersHeight) * this.ratios[this.children.filter((c)=>c.visible).indexOf(component)];
	}

	/**
	* Return a splitter for the components
	* @return [Splitter] The splitter that will be added to the component
	*/
	_createSplitter(){
		const splitter =  new HorizontalSplitter(this);
		return splitter;
	}

	/**
	* Callback called when a splitter is dragged
	* @param evt [Event] The event dispatched when the splitter is dragged
	*/
	_onSplitterDrag(evt){
		const splittersHeight = this._splitters.reduce((acc,val)=>{return acc + val.height;},0);
		const ratioOffset = (evt.params.y / (this.height-splittersHeight));
		const i = this._splitters.indexOf(evt.target);

		this._updateRatios(i,ratioOffset);
	}

}

module.exports = ColumnComponent;