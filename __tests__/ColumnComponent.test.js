import ColumnComponent from '../src/ColumnComponent';
import LayoutComponent from '../src/LayoutComponent';
import HorizontalSplitter from '../src/HorizontalSplitter';

describe('ColumnComponent',()=>{

	test("_getWidthOf",()=>{
		var cc = new ColumnComponent('r');
		var c = new LayoutComponent("1");
		cc.addComponent(c);
		cc.addComponent(new LayoutComponent("2"));
		cc.element.innerHeight = jest.fn(()=>200);
		
		expect(cc._getHeightOf(c)).toEqual(100);

	});

	test("_createSplitter",()=>{
		const cc = new ColumnComponent('r');

		const s = cc._createSplitter();
		expect(s instanceof HorizontalSplitter).toEqual(true);
	});

	test("_onSplitterDrag",()=>{
		var cc = new ColumnComponent('r');
		cc.addComponent(new LayoutComponent("1"));
		cc.addComponent(new LayoutComponent("2"));
		cc.element.innerHeight = jest.fn(()=>200);
		
		cc._onSplitterDrag({target:cc._splitters[0],params:{y:10}});

		expect(cc.ratios).toEqual([0.55,0.45]);


	});
});