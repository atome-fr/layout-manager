import Event from './Event.js';

class LayoutManager {

	/**
	* Create the LayoutManager to handle and access to the different components
	*/
	constructor(parent){
		this.parent = parent;
	}

	/**
	* Getter of the root component of the layout
	* @return [layoutComponent] The root of the layout
	*/
	get root(){
		return this._root;
	}

	/**
	* Setter of the root component of the layout
	* @param value [LayoutComponent] The component that will be the root of the layout 
	*/
	set root(value){
		this._root = value;
		this.parent.append(this._root.element);
		this._root.element.addClass('rootComponent');
		this._root.dispatch(new Event(Event.ON_ADDED));
		this._root.dispatch(new Event(Event.ON_ADDED_TO_LAYOUT));
		this.parent.css({overflow:'hidden'});
	} 
	
	/**
	* Get a component in the layout by his id
	* @param id [String] id of the component to find
	* @return [LayerComponent] The component with the id
	*/
	getComponentById(id){
		const getComponentByIdFrom = (lc,id) => {
			if (lc.id === id){
				return lc;
			}else{	
				if(lc.children){
					for(let i in lc.children){
						const child = lc.children[i];
						const ret =	getComponentByIdFrom(child,id);
						if(ret){
							return ret;
						}
					}
				}
			}
			return null;
		};

		return getComponentByIdFrom(this._root,id);
	}

	/**
	* Update the size of the layout
	* @param width [Float] the new width of the layout
	* @param height [Float] the new height of the layout
	*/
	updateSize(width,height){
		if(this._root){
			const nSize = {x:width, y:height};
			this._root._updateSize(nSize);
		}else{
			this.parent.css({width:width,height:height});
		}	
	}
}

module.exports = LayoutManager;