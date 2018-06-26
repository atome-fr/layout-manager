import React from 'react';
import Splitter from '../src/Splitter';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Splitter Component', () => {

    describe('UI Render Test', () => {

        it('should render', () => {
            const wrapper = shallow(<Splitter type=""/>);
            const tree = toJson(wrapper);

            expect(tree).toMatchSnapshot();
        });

        it('should call the correct callback when a touch start or a mouse down is trigger on the splitter', () => {
            const oldVal = Splitter.prototype.handleMouseOrTouchStart;
            Splitter.prototype.handleMouseOrTouchStart = jest.fn();
            const wrapper = shallow(<Splitter/>);

            expect(Splitter.prototype.handleMouseOrTouchStart).toHaveBeenCalledTimes(0);

            wrapper.simulate('touchstart');

            expect(Splitter.prototype.handleMouseOrTouchStart).toHaveBeenCalledTimes(1);

            wrapper.simulate('mousedown');

            expect(Splitter.prototype.handleMouseOrTouchStart).toHaveBeenCalledTimes(2);

            Splitter.prototype.handleMouseOrTouchStart = oldVal;
        });

    });

    describe('Component Method Test', () => {

        it('should add some listeners on the document and store the position of the click', () => {
            const oldVal = document.addEventListener;
            document.addEventListener = jest.fn();

            const wrapper = shallow(<Splitter />);

            const ev = {
                clientX: 10,
                clientY: 10
            };

            wrapper.instance().handleMouseOrTouchStart(ev);

            expect(wrapper.instance().mousePos).toEqual({x: 10, y: 10});
            expect(document.addEventListener).toHaveBeenCalledTimes(4);
            expect(document.addEventListener.mock.calls[0]).toEqual(["mousemove", expect.any(Function)]);
            expect(document.addEventListener.mock.calls[1]).toEqual(["touchmove", expect.any(Function)]);
            expect(document.addEventListener.mock.calls[2]).toEqual(["mouseup", expect.any(Function)]);
            expect(document.addEventListener.mock.calls[3]).toEqual(["touchend", expect.any(Function)]);

            document.addEventListener = oldVal;
        });

        it('should handle the move position and call a callback method', () => {
            const handleOnChange = jest.fn();

            const wrapper = shallow(<Splitter onChange={handleOnChange}/>);

            wrapper.instance().mousePos = {x: 10, y: 10};

            const ev = {
                clientX: 15,
                clientY: 15,
                preventDefault: jest.fn()
            };

            wrapper.instance().handleMouseOrTouchMove(ev);

            expect(ev.preventDefault).toHaveBeenCalledTimes(1);
            expect(handleOnChange).toHaveBeenCalledTimes(1);
        });

        it('should remove some listeners on the document', () => {
            const oldVal = document.removeEventListener;
            document.removeEventListener = jest.fn();

            const wrapper = shallow(<Splitter />);

            wrapper.instance().handleMouseOrTouchEnd();

            expect(document.removeEventListener).toHaveBeenCalledTimes(4);
            expect(document.removeEventListener.mock.calls[0]).toEqual(["mousemove", expect.any(Function)]);
            expect(document.removeEventListener.mock.calls[1]).toEqual(["touchmove", expect.any(Function)]);
            expect(document.removeEventListener.mock.calls[2]).toEqual(["mouseup", expect.any(Function)]);
            expect(document.removeEventListener.mock.calls[3]).toEqual(["touchend", expect.any(Function)]);

            document.removeEventListener = oldVal;
        });

    });

});