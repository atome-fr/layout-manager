
import Event from './Event.js';
import EventEmmiter from './EventEmmiter.js';

class LayoutComponent extends EventEmmiter {



	constructor(id){
		super();
		this._addedToLayout = false;


		this.id = id;

		this.element = $('<div>',{id:this.id});

		//this.addEventListener(Event.ON_ADDED,this.onShow);
		this.addEventListener(Event.ON_ADDED_TO_LAYOUT, this._onAddedToLayout);
		this.addEventListener(Event.ON_RESIZE,this.onResize);

		console.log(this.listeners);
		
	}

	get width(){
		if(this.parent){
			return this.parent._getWidthOf(this);
		}else{
			return this.element.width();
		}
	}

	get height(){
		if(this.parent){
			return this.parent._getHeightOf(this);
		}else{
			return this.element.height();
		}
	}

	show(){}

	hide(){}

	onShow(){}

	onResize(){
		console.log("onResize")
		this.element.css({width:this.width,height:this.height});
	}

	onHide(){}

	saveState(){}

	loadState(){}

	_getWidthOf(){
		throw(new Error('Abstract method, use it on container components'));
		return this.width;
	}

	_getHeightOf(){
		throw(new Error('Abstract method, use it on container components'));
		return this.height;
	}

	_onAddedToLayout(){
		this._addedToLayout = true;
		this.dispatch(new Event(Event.ON_RESIZE));
	}
}

module.exports = LayoutComponent;