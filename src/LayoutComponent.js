

import EventEmmiter from './EventEmmiter.js';

class LayoutComponent extends EventEmmiter {



	constructor(id){
		super();

		this.id = id;

		this.element = $('<div>',{id:this.id});

		//this.addEventListener(Event.ON_ADDED,this.onAdded)
		
	}

	get width(){
		if(this.parent){
			return this.parent._getWidthOf(this);
		}else{
			console.log(this.element.width())
			return this.element.width();
		}
	}

	get height(){
		if(this.parent){
			return this.parent._getHeightOf(this);
		}else{
			console.log(this.element.height())
			return this.parent.height();
		}
	}

	show(){}

	hide(){}

	onShow(){}

	onResize(){}

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
}

module.exports = LayoutComponent;