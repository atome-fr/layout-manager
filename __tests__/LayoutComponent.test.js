import LayoutComponent from '../src/LayoutComponent';


describe('LayoutComponent', () => {
    
    test("#constructor", () => {
        const component = new LayoutComponent(12);
        expect(component.id).toEqual(12);
        expect(component.visible).toEqual(false);  
    });

    describe("#width",()=>{

    	test("if the component is the root",()=>{
    		const c = new LayoutComponent();
    		c.element = {
    			innerWidth : jest.fn(()=>234)
    		};


    		expect(c.width).toEqual(234);

    	});

    	test("if the component is not the root",()=>{
    		const p = new LayoutComponent('p');
    		p._getWidthOf = jest.fn(()=>789);

    		const c = new LayoutComponent('c');
    		c.parent = p;

    		expect(c.width).toEqual(789);
    		expect(p._getWidthOf).toBeCalledWith(c);

    	});

    })

    describe("#height",()=>{

    	test("if the component is the root",()=>{
    		const c = new LayoutComponent();
    		c.element = {
    			innerHeight : jest.fn(()=>123)
    		};


    		expect(c.height).toEqual(123);

    	});

    	test("if the component is not the root",()=>{
    		const p = new LayoutComponent('p');
    		p._getHeightOf = jest.fn(()=>456);

    		const c = new LayoutComponent('c');
    		c.parent = p;

    		expect(c.height).toEqual(456);
    		expect(p._getHeightOf).toBeCalledWith(c);

    	});

    })

    test("#updateSize",()=>{
    	const c = new LayoutComponent("c");
    	c.element = {css:jest.fn()};
    	const resizeCB = jest.fn();
    	c.addEventListener('onResize',resizeCB);

    	c._updateSize({x:15,y:65});

    	expect(c.element.css).toHaveBeenCalledWith({width:'15px',height:'65px'});
    	expect(resizeCB).toHaveBeenCalledTimes(1);
    });
    

    
});