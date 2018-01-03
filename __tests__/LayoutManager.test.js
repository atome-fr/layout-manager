import LayoutManager from '../src/LayoutManager.js';


describe('LayoutManager',()=>{

	test('#constructor',()=>{
		const p = {};
		var lm = new LayoutManager(p);
		expect(lm.parent).toBe(p); 
	});

	describe('root',()=>{

		test('setter',()=>{
			const p = {
				append : jest.fn(),
				css : jest.fn()
			};

			const lm = new LayoutManager(p);
			
			const r = {
				element : {addClass:jest.fn()},
				dispatch : jest.fn(),
			};

			lm.root = r;

			expect(p.append).toBeCalledWith(r.element);
			expect(p.css).toBeCalledWith({overflow:'hidden'});
			expect(r.dispatch).toHaveBeenCalledTimes(2);

		});

		test('getter',()=>{
			const r = {};
			const lm = new LayoutManager({});
			lm._root = r;

			expect(lm.root).toBe(r);


		});
	});

	test('getComponentById',()=>{
		const r = {
			id:'azerty',
			children:[
				{id:'uiop'},
				{id:'test',children:[{id:'nbvc'}]}
			]
		};
		const lm = new LayoutManager({});

		lm._root = r;

		const t1 = lm.getComponentById('nbvc');
		const t2 = lm.getComponentById('azerty');
		const t3 = lm.getComponentById('grefd');

		expect(t1.id).toBe('nbvc');
		expect(t2.id).toBe('azerty');
		expect(t3).toBe(null);

		

	});

});