import Event from './Event.js';
import LayoutComponent from './LayoutComponent.js';

class SplitterComponent extends LayoutComponent {

	constructor(id){
		super(id);

		this.children = [];
		this.ratios = [];

		this.element.addClass('splitter');
		//this.element.css({width:'100%',height:'100%'})
		
	}

	addComponent(component,index){

		component.parent = this;
		if(!index){
			this.children.push(component);
			//this.element.append(splitter);
			this.element.append(component.element);
		}else{
			this.children.splice(index,0,component);
			//this.children[index-1].element.after(splitter)
			this.children[index-1].element.after(this.element);
		}
		
		const newRatios = [];
		for(let i = 0;i<this.children.length;i++){
			newRatios.push(1/this.children.length);
		}
		this.setRatios(newRatios);
		
		component.dispatch(new Event(Event.ON_ADDED));
		if(this._addedToLayout){
			component.dispatch(new Event(Event.ON_ADDED_TO_LAYOUT));
		}
	}

	removeComponent(component){
		const index = this.children.indexOf(component);
		if(index >= 0){
			this.children.splice(index,1);
			this.element.remove(component.element);
			this.component.dispatch(new Event(Event.ON_REMOVE))
		}
	}

	setRatios(ratios){
		this.ratios = ratios;
		console.log(ratios);
		if(this._addedToLayout){
			this.children.forEach((child)=>{
				child.dispatch(new Event(Event.ON_RESIZE));
			});
		}
	}

	_getWidthOf(component){
		return this.width;
	}

	_getHeightOf(component){
		return this.height;
	}

	_onAddedToLayout(){
		super._onAddedToLayout();
		this.children.forEach((child)=>{
			child.dispatch(new Event(Event.ON_ADDED_TO_LAYOUT));
		})
	}
}

module.exports = SplitterComponent;