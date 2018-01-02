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

	/**
	* Getter of the width of the splitter
	* @return [Float] The width of the splitter
	*/
	get width(){
		return this.element.width();
	}

	/**
	* Getter of the height of the splitter
	* @return [Float] The height of the splitter
	*/
	get height(){
		return this.element.height();
	}

	/**
	* Listener of the begining of a drag of the splitter
	*/
	_onTapStart(evt,touchData){
		evt.preventDefault();
		this.parent.element.on('tapmove',this._onTapMove.bind(this));
		this.parent.element.on('tapend',this._onTapEnd.bind(this));
		this.mousePos = {x:touchData.position.x,y:touchData.position.y};
	}

	/**
	* Listener to get movement of the finger or the mouse
	*/
	_onTapMove(evt,touchData){
		evt.preventDefault();
		const offset = {x : touchData.position.x - this.mousePos.x, y : touchData.position.y - this.mousePos.y};
		this.mousePos = {x: touchData.position.x,y: touchData.position.y};
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