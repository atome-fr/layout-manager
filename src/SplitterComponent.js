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

		//this.element.addClass('splitter');
		//this.element.css({width:'100%',height:'100%'})
		
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
			this.element.append(component.element);
		}else{
			this.children.splice(index,0,component);
			this.children[index+1].element.before(component.element);
		}

		if(this.children.length > 1){
			var splitter = this._createSplitter();
			if(atTheEnd){
				this._splitters.push(splitter);
				this.children[this.children.length-1].element.before(splitter.element);
			}else{
				this._splitters.splice(index,0,splitter);
				this.children[index].element.after(splitter.element);
			}

			splitter.addEventListener(Event.ON_DRAG,this._onSplitterDrag.bind(this));
		
		}
		
		const newRatios = [];
		for(let i = 0;i<this.children.length;i++){
			newRatios.push(1/this.children.length);
		}
		this.setRatios(newRatios);
		
		component._visible = true;
		component.dispatch(new Event(Event.ON_ADDED));
		if(this._addedToLayout){
			component.dispatch(new Event(Event.ON_ADDED_TO_LAYOUT));
		}

	}

	/**
	* Remove the component if it's a child of the splitter component
	* @param component [LayoutComponent] component to remove from the splitter component 
	*/
	removeComponent(component){
		const index = this.children.indexOf(component);
		if(index >= 0){
			const splitterIndex = (index === (this.children.length - 1)) ? index-1 : index ;
			this.children.splice(index,1);
			component.element.detach();
			if(this.children.length > 0){
				const splitter = this._splitters.splice(splitterIndex,1)[0];
				splitter.element.detach();
			}
			
			const ratio = this.ratios.splice(index,1)[0];
			const nRatios = this.ratios.slice();
			for(let i in nRatios){
				nRatios[i] += ratio / nRatios.length;
			}
			this.setRatios(nRatios);

			component._visible = false;
			component.dispatch(new Event(Event.ON_REMOVE));
		}
	}

	/**
	* Set the size of the compoenent with ratio from the size of the component
	* @param ratios [Array<Float>] ratios of the childrens, the sum all the value must be equal to 1
	*/
	setRatios(ratios){
		const sumRatios = ratios.reduce((acc,val)=>acc+val);
		if(sumRatios < 0.99999 || sumRatios > 1.00001){
			throw new Error('Sum of ratios must be equal to 1 ('+sumRatios+')');
		}

		this.ratios = ratios;
		
		if(this._addedToLayout){
			this.children.forEach((child)=>{
				child._updateSize();
			});
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
			child._updateSize();
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
		while(ratioToRem !== 0 && indexToRem < this.children.length){
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