
import Event from './Event.js';
import EventDispatcher from './EventDispatcher.js';

class LayoutComponent extends EventDispatcher {


	/**
	* Create a component for the layout
	* @param id [String] The id of the component
	*/
	constructor(id){
		super();
		this._addedToLayout = false;


		this.id = id;

		this.element = $('<div>',{id:this.id});
		this.element.addClass("component");

		this._visible = false;

		this.addEventListener(Event.ON_ADDED_TO_LAYOUT, this._onAddedToLayout);
		
		this.addEventListener(Event.ON_ADDED,this.onShow);
		this.addEventListener(Event.ON_RESIZE,this.onResize);
		this.addEventListener(Event.ON_REMOVE,this.onHide);
	

	}

	/**
	* Getter of the width of the component
	* @return [Float] The width of the component
	*/
	get width(){
		if(this.parent){
			return this.parent._getWidthOf(this);
		}else{
			return this.element.width();
		}
	}

	/**
	* Getter of the height of the component
	* @return [Float] The height of the component
	*/
	get height(){
		if(this.parent){
			return this.parent._getHeightOf(this);
		}else{
			return this.element.height();
		}
	}

	/**
	* Getter of the visibility of the component
	* @return [Boolean] The visibility of the component
	*/
	get visible(){
		return this._visible;
	}

	/**
	* Show the component
	*/
	show(){
		this.parent.addComponent(this,this._hiddenIndex);
	}

	/**
	* Hide the compoenent
	*/
	hide(){
		this._hiddenIndex = this.parent.children.indexOf(this);
		this.parent.removeComponent(this);
	}

	/**
	* Call when the component is added to the scene
	*/
	onShow(){}

	/**
	* Call when the size of the component is updated
	*/
	onResize(){}

	/**
	* Call when the component is hidded
	*/
	onHide(){}

	/**
	* Call it to get an object that describe the current state of the component
	*/
	saveState(){}

	/**
	* Call it to load the state of the component
	*/
	loadState(){}


	/**
	* Get the width of a children of the component
	* @param component [LayoutComponent] The children of the component
	* @return [Float] The width of the children
	*/
	_getWidthOf(){
		throw(new Error('Abstract method, use it on container components'));
	}

	/**
	* Get the height of a children of the component
	* @param component [LayoutComponent] The children of the component
	* @return [Float] The height of the children
	*/
	_getHeightOf(){
		throw(new Error('Abstract method, use it on container components'));
	}

	/**
	* Update the size of the component
	* @param nSize [Object] optional The new size of the component
	*/
	_updateSize(nSize){
		let newWidth,newHeight;
		if(!nSize){
			newWidth = this.width;
			newHeight = this.height;
		}else{
			newWidth = nSize.x;
			newHeight = nSize.y;
		}

		this.element.css({
			width: newWidth+'px',
			height: newHeight+'px'
		});
		this.dispatch(new Event(Event.ON_RESIZE,{ width:newWidth, height:newHeight }));
	}

	/**
	* Call when the component is added to the window
	*/
	_onAddedToLayout(){
		this._addedToLayout = true;
		this._updateSize();
	}

}

module.exports = LayoutComponent;