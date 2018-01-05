import RowComponent from '../src/RowComponent';
import LayoutComponent from '../src/LayoutComponent';
import VerticalSplitter from '../src/VerticalSplitter';

describe('RowComponent',()=>{

	test("_getWidthOf",()=>{
		var rc = new RowComponent('r');
		var c = new LayoutComponent("1");
		rc.addComponent(c);
		rc.addComponent(new LayoutComponent("2"));
		rc.element.innerWidth = jest.fn(()=>100);
		
		expect(rc._getWidthOf(c)).toEqual(50);

	});

	test("_createSplitter",()=>{
		const rc = new RowComponent('r');

		const s = rc._createSplitter();
		expect(s instanceof VerticalSplitter).toEqual(true);
	});

	test("_onSplitterDrag",()=>{
		var rc = new RowComponent('r');
		rc.addComponent(new LayoutComponent("1"));
		rc.addComponent(new LayoutComponent("2"));
		rc.element.innerWidth = jest.fn(()=>100);
		
		rc._onSplitterDrag({target:rc._splitters[0],params:{x:10}});

		expect(rc.ratios).toEqual([0.6,0.4]);


	});
});