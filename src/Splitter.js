import Event from './Event.js';
import EventDispatcher from './EventDispatcher.js';

class Splitter extends EventDispatcher{

	/**
	* Create a splitter
	* @param parent [LayoutComponent] The component that create the splitter
	*/
	constructor(parent){
		super();

		this.parent = parent;

		this.element = $('<div>',{class:'splitter'});
		this.interaction = $('<div>',{class:'handle'});
		this.interaction.on('tapstart',this._onTapStart.bind(this));
		this.element.append(this.interaction);
	}
/*
	get width(){
		return this.element.width();
	}

	set width(value){
		this.element.css({width:value});
		this.interaction.css({width:value});
	}

	get height(){
		return this.element.height();
	}
	
	set height(value){
		this.element.css({height:value});
		this.interaction.css({height:value});
	}
*/
	/**
	* Listener of the begining of a drag of the splitter
	*/
	_onTapStart(evt){
		this.parent.element.on('tapmove',this._onTapMove.bind(this));
		this.parent.element.on('tapend',this._onTapEnd.bind(this));
		this.mousePos = {x:evt.clientX,y:evt.clientY};
	}

	/**
	* Listener to get movement of the finger or the mouse
	*/
	_onTapMove(evt){
		const offset = {x : evt.clientX - this.mousePos.x, y : evt.clientY - this.mousePos.y};
		this.mousePos = {x:evt.clientX,y:evt.clientY};
		this.dispatch(new Event(Event.ON_DRAG,offset));
	}

	/**
	* Listener to get the end of the dragging of a splitter
	*/ 
	_onTapEnd(){
		this.parent.element.off('tapmove');
		this.parent.element.off('tapend');
		this.dispatch(new Event(Event.ON_DROP));
	}



}

module.exports = Splitter;