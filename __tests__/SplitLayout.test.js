import React from 'react';
import ReactDOM from 'react-dom';
import SplitLayout from '../src/SplitLayout';
import Splitter from '../src/Splitter';
import ContainerView from '../src/ContainerView';
import Util from '../src/helpers/util';
import {shallow, mount} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('SplitLayout Component', () => {
    
    describe('UI Render Test', () => {

        it('should render horizontal SplitLayout', () => {
            const wrapper = shallow(<SplitLayout split="horizontal" size={[0.2, 0.8]}>
                <div visible={true}>View 1</div>
                <div visible={true}>View 2</div>
            </SplitLayout>);
            const tree = toJson(wrapper);

            expect(tree).toMatchSnapshot();
            expect(wrapper.find(ContainerView).length).toBe(2);
            expect(wrapper.find(Splitter).length).toBe(1);
        });
        
        it('should render vertical SplitLayout', () => {
            const wrapper = shallow(<SplitLayout split="horizontal">
                <div visible={true}>View 1</div>
                <div visible={true}>View 2</div>
            </SplitLayout>);
            const tree = toJson(wrapper);

            expect(tree).toMatchSnapshot();
            expect(wrapper.find(ContainerView).length).toBe(2);
            expect(wrapper.find(Splitter).length).toBe(1);
        });
        
        it('should render SplitLayout with one child hidden', () => {
            const wrapper = shallow(<SplitLayout split="horizontal">
                <div visible={false}>View 1</div>
                <div visible={true}>View 2</div>
            </SplitLayout>);
            const tree = toJson(wrapper);

            expect(tree).toMatchSnapshot();
            expect(wrapper.find(ContainerView).length).toBe(1);
            expect(wrapper.find(Splitter).length).toBe(0);
        });
        
        it('should raise an error when pass more than 2 children to the SplitLayout', () => {
            expect(() => {
                mount(<SplitLayout split="horizontal">
                    <div visible={true}>View 1</div>
                    <div visible={true}>View 2</div>
                    <div visible={true}>View 3</div>
                </SplitLayout>);
            }).toThrow("SplitLayout must have extactly 2 children");
        });
        
    });

    describe('Component Method Test', () => {
        
        describe('#handleSplitterChange', () => {
            it('should call the onResize listener with the new ratio - vertical', () => {
                const handleResize = jest.fn();
                const wrapper = shallow(<SplitLayout split="vertical" onResize={handleResize}>
                    <div visible={true}>View 1</div>
                    <div visible={true}>View 2</div>
                </SplitLayout>);

                wrapper.instance().container = {
                    clientWidth: 310
                };

                wrapper.instance().handleSplitterChange({x: 30, y: 0}, {});

                expect(handleResize).toBeCalledWith([0.6, 0.4]);
            });
            
            it('should call the onResize listener with the new ratio - horizontal', () => {
                const handleResize = jest.fn();
                const wrapper = shallow(<SplitLayout split="horizontal" onResize={handleResize}>
                    <div visible={true}>View 1</div>
                    <div visible={true}>View 2</div>
                </SplitLayout>);

                wrapper.instance().container = {
                    clientHeight: 310
                };

                wrapper.instance().handleSplitterChange({x: 0, y: -30}, {});

                expect(handleResize).toBeCalledWith([0.4, 0.6]);
            });
        });

    });

});