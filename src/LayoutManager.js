import Event from './Event.js';

class LayoutManager {


	constructor(parent){
		this.parent = parent;
	}


	get root(){
		return this._root;
	}

	set root(value){
		this._root = value;
		this.parent.append(this._root.element);
		this._root.element.css({width:'100%',height:'100%'});
		this._root.dispatch(new Event(Event.ON_ADDED));
		this._root.dispatch(new Event(Event.ON_ADDED_TO_LAYOUT));

	}

	getComponentById(id){
		const getComponentByIdFrom = (lc,id) => {
			console.log(lc.id,id);
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
}

module.exports = LayoutManager;