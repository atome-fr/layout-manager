import LayoutComponent from '../src/LayoutComponent';


describe('LayoutComponent', () => {
    
    test("#constructor", () => {
        const component = new LayoutComponent(12);
        expect(component.id).toEqual(12);
        expect(component.visible).toEqual(false);  
    });

    describe("#width",()=>{

    	test("if the component is the root",()=>{
    		var c = new LayoutComponent();
    		c.element = {
    			innerWidth : jest.fn(()=>234)
    		};


    		expect(c.width).toEqual(234);

    	});

    	test("if the component is not the root",()=>{
    		var p = new LayoutComponent('p');
    		p._getWidthOf = jest.fn(()=>789);

    		var c = new LayoutComponent('c');
    		c.parent = p;

    		expect(c.width).toEqual(789);
    		expect(p._getWidthOf).toBeCalledWith(c);

    	});

    })
    
});