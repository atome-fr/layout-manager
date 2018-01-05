import Splitter from '../src/Splitter';
import SplitterComponent from '../src/SplitterComponent';
import LayoutComponent from '../src/LayoutComponent';
import Event from '../src/Event';


describe('SplitterComponent',()=>{

	test("#constructor",()=>{

	});

	describe("#addComponent",()=>{
		
		const s = new SplitterComponent("s");
		s._createSplitter = jest.fn(()=>{return new Splitter(s);})
			
		test("with no child",()=>{
			
			const c = new LayoutComponent("c");

			s.addComponent(c);

			expect(s.children.length).toEqual(1);
			expect(s._splitters.length).toEqual(0);
			expect(s.ratios).toEqual([1]);

		});

		test("with already a child",()=>{
			
			const cc = new LayoutComponent("c1");

			s.addComponent(cc);

			expect(s.children.length).toEqual(2);
			expect(s._splitters.length).toEqual(1);
			expect(s.ratios).toEqual([0.5,0.5]);

		});

	});

	describe("#removeComponent",()=>{
		
		const s = new SplitterComponent("s");
		s._createSplitter = jest.fn(()=>{return new Splitter(s);})
	
		const c = new LayoutComponent("c");
		s.addComponent(c);
		const cc = new LayoutComponent("c1");
		s.addComponent(cc);
		
		test("with two children",()=>{
			s.removeComponent(cc);

			expect(s.children.length).toEqual(1);
		
		});

		test("with one child",()=>{
			s.removeComponent(c);

			expect(s.children.length).toEqual(0);
		
		});


	});

	describe("#_showComponent",()=>{

		const s = new SplitterComponent("s");
		s._createSplitter = jest.fn(()=>{return new Splitter(s);})
		s.element.append = jest.fn();
	
		test("with one child",()=>{
			
			const c = new LayoutComponent("c");
			c._visible = true;
			s.children.push(c);

			
			s._showComponent(c);
			
			expect(s.element.append).toHaveBeenCalledTimes(1);
			expect(s._splitters.length).toEqual(0);
			expect(s.ratios).toEqual([1]);

		});

		test("with already a child",()=>{
			
			const cc = new LayoutComponent("c1");
			cc._visible = true;
			cc.element.before = jest.fn();
			s.children.push(cc);
			
			s._showComponent(cc);

			expect(s.element.append).toHaveBeenCalledTimes(2);
			expect(cc.element.before).toHaveBeenCalledTimes(1);
			expect(s._splitters.length).toEqual(1);
			expect(s.ratios).toEqual([0.5,0.5]);

		});

	
	});

	describe("#_hideComponent",()=>{

		const s = new SplitterComponent("s");
		s._createSplitter = jest.fn(()=>{return new Splitter(s);})
	
		const c = new LayoutComponent("c");
		s.addComponent(c);
		const cc = new LayoutComponent("c1");
		s.addComponent(cc);
		
	
		test("with two child",()=>{
			
			c.element.detach = jest.fn()

			s._hideComponent(c);

			expect(s._splitters.length).toEqual(0);
			expect(c.element.detach).toHaveBeenCalledTimes(1);
		});

		test("with one child",()=>{
			
			cc.element.detach = jest.fn()

			s._hideComponent(cc);

			expect(cc.element.detach).toHaveBeenCalledTimes(1);
			expect(s.visible).toEqual(false);

		});

	
	});

	test("#_onAddedToLayout",()=>{
		const s = new SplitterComponent('s');
		s._createSplitter = jest.fn(()=>{return new Splitter(s);})
	
		const c = new LayoutComponent('c');
		const cc = new LayoutComponent('cc');
		const nv = new LayoutComponent('nv');

		s.addComponent(c);
		s.addComponent(cc);
		s.addComponent(nv);

		nv.visible = false;

		const cb = jest.fn();

		c.addEventListener(Event.ON_ADDED_TO_LAYOUT,cb);
		cc.addEventListener(Event.ON_ADDED_TO_LAYOUT,cb);
		nv.addEventListener(Event.ON_ADDED_TO_LAYOUT,cb);

		s._onAddedToLayout();

		expect(cb).toHaveBeenCalledTimes(2);
	});

	test("#_updateSize",()=>{
		const s = new SplitterComponent('s');
		s._createSplitter = jest.fn(()=>{return new Splitter(s);})
	
		const c = new LayoutComponent('c');
		const cc = new LayoutComponent('cc');

		s.addComponent(c);
		s.addComponent(cc);

		cc.visible = false;

		c._updateSize = jest.fn();
		cc._updateSize = jest.fn();

		s._updateSize();

		expect(c._updateSize).toHaveBeenCalledTimes(1);
		expect(cc._updateSize).toHaveBeenCalledTimes(0);

	});


});