import Event from './Event.js';
import LayoutComponent from './LayoutComponent.js';

class SplitterComponent extends LayoutComponent {

	/**
	* Create a container component that can display other component with splitter between them
	* @param id [String] The id of the component
	*/
	constructor(id){
		super(id);

		this.children = [];
		this.ratios = [];

		this._splitters = [];
	
	}

	/**
	* Add a component as children and add the element to the DOM
	* @param component [LayoutComponent] The component to add
	* @param index [Int] optional The index where the component will be added
	*/
	addComponent(component,index){

		component.parent = this;
		const atTheEnd = (index === undefined || index >= this.children.length);
		if(atTheEnd){
			this.children.push(component);
		}else{
			this.children.splice(index,0,component);
		}
		
		component.dispatch(new Event(Event.ON_ADDED));
		component._visible = true;
		this._showComponent(component);
		
	}

	/**
	* Remove the component if it's a child of the splitter component
	* @param component [LayoutComponent] component to remove from the splitter component 
	*/
	removeComponent(component){
		this._hideComponent(component);
		const index = this.children.indexOf(component);
		if(index >= 0){
			this.children.splice(index,1);
			component.dispatch(new Event(Event.ON_REMOVE));
		}
	}

	/**
	* Set the size of the compoenent with ratio from the size of the component
	* @param ratios [Array<Float>] ratios of the childrens, the sum all the value must be equal to 1
	*/
	setRatios(ratios){
		if(ratios.length === 0 && this.children.filter((c)=>c.visible).length === 0){
			this.ratios = ratios;
			return;
		}
		const sumRatios = ratios.reduce((acc,val)=>acc+val,0);
		if(sumRatios < 0.99999 || sumRatios > 1.00001){
			return;
		}

		const oldRatios = this.ratios;
		this.ratios = ratios;
		
		if(this._addedToLayout){
			const _children = this.children.filter((c)=>c.visible);
			for(let i=0;i<_children.length;i++){
				if(oldRatios[i] !== this.ratios[i]){
					_children[i]._updateSize();
				} 
			}
		}
	}


	/**
	* Get the width of a children of the component
	* @return [Float] The width of the children
	*/
	_getWidthOf(){
		return this.width;
	}

	/**
	* Get the height of a children of the component
	* @return [Float] The height of the children
	*/
	_getHeightOf(){
		return this.height;
	}

	/**
	* Update the size of the component
	* @param nSize [Object] optional The new size of the component
	*/
	_updateSize(nSize){
		super._updateSize(nSize);
		this.children.forEach((child)=>{
			if(child.visible){
				child._updateSize();
			}
		});
	}

	/**
	* Call when the component is added to the window
	*/
	_onAddedToLayout(){
		super._onAddedToLayout();
		this.children.forEach((child)=>{
			child.dispatch(new Event(Event.ON_ADDED_TO_LAYOUT));
		});
	}

	/**
	* Handle all the tasks when a component is added to the DOM
	* @param component [LayoutComponent] The component to show (must be a part of the splitter component)
	*/
	_showComponent(component){
		const children = this.children.filter((c)=>c.visible);
		const index = children.indexOf(component);
		if(index < 0){
			component._visible = false;
			return;
		}
		
		// attach the element to the DOM
		const atTheEnd = (index === (children.length - 1));
		if(atTheEnd){
			this.element.append(component.element);
		}else{
			children[index+1].element.before(component.element);
		}


		// if needed add a splitter
		if(children.length > 1){
			var splitter = this._createSplitter();
			if(atTheEnd){
				this._splitters.push(splitter);
				children[children.length-1].element.before(splitter.element);
			}else{
				this._splitters.splice(index,0,splitter);
				children[index].element.after(splitter.element);
			}
			splitter.addEventListener(Event.ON_DRAG,this._onSplitterDrag.bind(this));
		}
		
		// update the ratios to use all the space
		const newRatios = [];
		for(let i = 0;i<children.length;i++){
			newRatios.push(1/children.length);
		}
		this.setRatios(newRatios);
		

		component.dispatch(new Event(Event.ON_SHOW));
		if(this._addedToLayout){
			component.dispatch(new Event(Event.ON_ADDED_TO_LAYOUT));
		}

		
		if(children.length === 1){
			this.visible = true;
		}
	}


	/**
	* Handle all the tasks when a component is removed from the DOM
	* @param component [LayoutComponent] The component to hide (must be a part of the splitter component)
	*/
	_hideComponent(component){
		component._visible = true;

		const children = this.children.filter((c)=>c.visible);
		const index = children.indexOf(component);
		if(index < 0){
			return;
		}
	
		component.element.detach();
		component._visible = false;
		component.dispatch(new Event(Event.ON_HIDE));

		const splitterIndex = (index === (children.length - 1)) ? index-1 : index ;
		if(splitterIndex >= 0){
			const splitter = this._splitters.splice(splitterIndex,1)[0];
			splitter.element.detach();
			splitter.removeEventListener(Event.ON_DRAG);
		}

		
		if(this.children.filter((c)=>c.visible).length === 0){
			this.visible = false;
		}
		
		const ratio = this.ratios.splice(index,1)[0];
		const nRatios = this.ratios.slice();
		for(let i in nRatios){
			nRatios[i] += ratio / nRatios.length;
		}
		
		this.setRatios(nRatios);
		
		
	}

	/**
	* [Abstract] Create the splitter to put between children
	* @return [Splitter] The splitter to add to the DOM
	*/
	_createSplitter(){
		return null;
	}

	/**
	* Listener to know when a splitter is dragged
	*/
	_onSplitterDrag(){}

	/**
	* Update the ratios of the components with the drag listeners
	* @param index [Int] The index where the ratio evolve
	* @param ratio [Float] The update value of ratio 
	*/
	_updateRatios(index,ratio){
		const newRatios = this.ratios.slice();
		const children = this.children.filter((c)=>c.visible);

		let ratioToAdd = ratio;
		let indexToAdd = index;
		while(ratioToAdd !== 0 && indexToAdd >= 0){
			if(newRatios[indexToAdd]+ratioToAdd > 0){
				newRatios[indexToAdd] += ratioToAdd;
				ratioToAdd = 0;
			}else{
				ratioToAdd += newRatios[indexToAdd];
				newRatios[indexToAdd] = 0;
				indexToAdd--;
			}
		}

		let ratioToRem = ratio;
		let indexToRem = index+1;
		while(ratioToRem !== 0 && indexToRem < children.length){
			if(newRatios[indexToRem]-ratioToRem > 0){
				newRatios[indexToRem] -= ratioToRem;
				ratioToRem = 0;
			}else{
				ratioToRem -= newRatios[indexToRem];
				newRatios[indexToRem] = 0;
				indexToRem++;
			}
		}

		this.setRatios(newRatios);	
	}

}

module.exports = SplitterComponent;