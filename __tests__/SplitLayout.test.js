import React from 'react';
import ReactDOM from 'react-dom';
import SplitLayout from '../src/SplitLayout';
import Splitter from '../src/Splitter';
import GroupContainer from '../src/GroupContainer';
import Util from '../src/helpers/util';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('SplitLayout Component', () => {

    let oldVal = null;

    beforeEach(() => {
        oldVal = SplitLayout.prototype.componentDidMount;
        SplitLayout.prototype.componentDidMount = jest.fn();
    });

    afterEach(() => {
        SplitLayout.prototype.componentDidMount = oldVal;
    });

    describe('UI Render Test', () => {

        it('should render with SplitLayout child component', () => {
            const wrapper = shallow(<SplitLayout split="horizontal">
                <div visible={true}>View 1</div>
                <div visible={true}>View 2</div>
            </SplitLayout>);
            const tree = toJson(wrapper);

            expect(tree).toMatchSnapshot();
            expect(wrapper.find("div").length).toBe(3);
        });

    });

    describe('Component Method Test', () => {

        it('should call the handleSplitterChange method and call the methods for update the size of the different components', () => {
            const oldVal2 = Util.searchSplitterIndex;
            Util.searchSplitterIndex = jest.fn(() => 0);

            const oldVal3 = SplitLayout.prototype._updateRatios;
            SplitLayout.prototype._updateRatios = jest.fn();

            const oldVal4 = SplitLayout.prototype._applyRatios;
            SplitLayout.prototype._applyRatios = jest.fn();

            const wrapper = shallow(<SplitLayout split="vertical">
                <div visible={true}>View 1</div>
                <div visible={true}>View 2</div>
            </SplitLayout>);

            wrapper.instance().container = {
                clientWidth: 300
            };

            wrapper.instance().handleSplitterChange({x: 1, y: 1}, {});

            expect(Util.searchSplitterIndex).toHaveBeenCalledTimes(1);
            expect(Util.searchSplitterIndex).toHaveBeenCalledWith([], {});
            expect(SplitLayout.prototype._updateRatios).toHaveBeenCalledTimes(1);
            expect(SplitLayout.prototype._updateRatios).toHaveBeenCalledWith(0, (1 / 300));
            expect(SplitLayout.prototype._applyRatios).toHaveBeenCalledTimes(1);

            Util.searchSplitterIndex = oldVal2;
            SplitLayout.prototype._updateRatios = oldVal3;
            SplitLayout.prototype._applyRatios = oldVal4;
        });

        it('should call the _updateRatios method and update the ratio of the container', () => {
            const oldVal2 = SplitLayout.prototype.handleResize;
            SplitLayout.prototype.handleResize = jest.fn();

            const wrapper = shallow(<SplitLayout split="vertical">
                <div visible={true}>View 1</div>
                <div visible={true}>View 2</div>
            </SplitLayout>);

            wrapper.instance().ratios = [0.2, 0.2, 0.6];
            wrapper.instance().children = {
                length: 3
            };

            // Should update the ratios
            wrapper.instance()._updateRatios(0, 0.2);
            expect(wrapper.instance().ratios).toEqual([0.4, 0, 0.6]);

            // Shouldn't update the ratios
            wrapper.instance()._updateRatios(0, 2);
            expect(wrapper.instance().ratios).toEqual([0.4, 0, 0.6]);

            expect(SplitLayout.prototype.handleResize).toHaveBeenCalledTimes(1);

            SplitLayout.prototype.handleResize = oldVal2;
        });

        it('should call the _updateRatios method and update the ratio of the container', () => {
            const oldVal2 = SplitLayout.prototype.handleResize;
            SplitLayout.prototype.handleResize = jest.fn();

            const wrapper = shallow(<SplitLayout split="vertical">
                <div visible={true}>View 1</div>
                <div visible={true}>View 2</div>
            </SplitLayout>);

            wrapper.instance().ratios = [0.2, 0.2, 0.6];
            wrapper.instance().children = {
                length: 3
            };

            // Should update the ratios
            wrapper.instance()._updateRatios(0, 0.2);
            expect(wrapper.instance().ratios).toEqual([0.4, 0, 0.6]);

            // Shouldn't update the ratios
            wrapper.instance()._updateRatios(0, 2);
            expect(wrapper.instance().ratios).toEqual([0.4, 0, 0.6]);

            expect(SplitLayout.prototype.handleResize).toHaveBeenCalledTimes(1);

            SplitLayout.prototype.handleResize = oldVal2;
        });

        it('should call the _applyRatios method and set the correct size to the children', () => {
            const child1 = {
                style: {
                    width: 0
                }
            };

            const child2 = {
                style: {
                    width: 0
                }
            };

            const oldVal = ReactDOM.findDOMNode;
            ReactDOM.findDOMNode = jest.fn().mockReturnValueOnce(child1).mockReturnValueOnce(child2);

            const wrapper = shallow(<SplitLayout split="vertical">
                <div visible={true}>View 1</div>
                <div visible={true}>View 2</div>
            </SplitLayout>);

            wrapper.instance().ratios = [0.5, 0.5];
            wrapper.instance().children = [child1, child2];

            wrapper.instance()._applyRatios();

            expect(child1.style.width).toBe('50%');
            expect(child2.style.width).toBe('50%');

            ReactDOM.findDOMNode = oldVal;
        });

        it('should call the _computeSize method and set the ratios for the components of the container', () => {
            const oldVal2 = SplitLayout.prototype._applyRatios;
            SplitLayout.prototype._applyRatios = jest.fn();

            const oldVal3 = document.dispatchEvent;
            document.dispatchEvent = jest.fn();

            const wrapper = shallow(<SplitLayout split="vertical" size={null}>
                <div visible={true}>View 1</div>
                <div visible={true}>View 2</div>
            </SplitLayout>);

            wrapper.instance().container = {
                clientWidth: 300
            };
            wrapper.instance().children = {
                length: 2
            };

            wrapper.instance()._computeSize(true);

            expect(wrapper.instance().ratios).toEqual([0.5, 0.5]);
            expect(SplitLayout.prototype._applyRatios).toHaveBeenCalledTimes(1);
            expect(document.dispatchEvent).toHaveBeenCalledTimes(0);

            wrapper.instance()._computeSize();
            expect(document.dispatchEvent).toHaveBeenCalledTimes(1);

            SplitLayout.prototype._applyRatios = oldVal2;
            document.dispatchEvent = oldVal3;
        });

        it('should call the _generateSplitter method and return a SplitterComponent', () => {
            const wrapper = shallow(<SplitLayout split="vertical">
                <div visible={true}>View 1</div>
                <div visible={true}>View 2</div>
            </SplitLayout>);

            const component = wrapper.instance()._generateSplitter(0);

            expect(component.type).toBe(Splitter);
            expect(component.key).toBe('splitter_layout_vertical_0');
        });

        it('should call the _generateGroupContainer method and return a GroupContainer Component', () => {
            const wrapper = shallow(<SplitLayout split="vertical">
                <div visible={true}>View 1</div>
                <div visible={true}>View 2</div>
            </SplitLayout>);

            const component = wrapper.instance()._generateGroupContainer(0, <div>View 1</div>);

            expect(component.type).toBe(GroupContainer);
            expect(component.key).toBe('group_container_0');
        });

        it('should call the _generateRender method and return the correct array of components to render', () => {
            const wrapper = shallow(<SplitLayout split="vertical">
                <div visible={true}>View 1</div>
                <div visible={true}>View 2</div>
                <div visible={true}>View 3</div>
            </SplitLayout>);

            const toRender = wrapper.instance()._generateRender();

            expect(toRender.length).toBe(3);
            expect(toRender[0].type).toBe(GroupContainer);
            expect(toRender[1].type).toBe(Splitter);
            expect(toRender[2].type).toBe(GroupContainer);
        });

        it('should call the _generateRender method and return the correct array of components to render', () => {
            const wrapper = shallow(<SplitLayout split="vertical">
                <div visible={false}>View 1</div>
                <div visible={true}>View 2</div>
            </SplitLayout>);

            const toRender = wrapper.instance()._generateRender();

            expect(toRender.length).toBe(1);
            expect(toRender[0].type).toBe(GroupContainer);
        });
    });

});