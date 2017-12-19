import LayoutComponent from '../src/LayoutComponent';


describe('LayoutComponent', () => {
    
    test("#constructor", () => {
        const component = new LayoutComponent(12);
        expect(component.id).toEqual(12);
    });
    
});