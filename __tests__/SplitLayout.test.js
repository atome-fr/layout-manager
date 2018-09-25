import React from 'react';
import ReactDOM from 'react-dom';
import SplitLayout from '../src/SplitLayout';
import Splitter from '../src/Splitter';
import ContainerView from '../src/ContainerView';
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
            const oldVal2 = SplitLayout.prototype._searchSplitterIndex;
            SplitLayout.prototype._searchSplitterIndex = jest.fn(() => 0);

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

            expect(SplitLayout.prototype._searchSplitterIndex).toHaveBeenCalledTimes(1);
            expect(SplitLayout.prototype._searchSplitterIndex).toHaveBeenCalledWith({});
            expect(SplitLayout.prototype._updateRatios).toHaveBeenCalledTimes(1);
            expect(SplitLayout.prototype._updateRatios).toHaveBeenCalledWith(0, (1 / 300));
            expect(SplitLayout.prototype._applyRatios).toHaveBeenCalledTimes(1);
            expect(SplitLayout.prototype._applyRatios).toHaveBeenCalledWith(300);

            SplitLayout.prototype._searchSplitterIndex = oldVal2;
            SplitLayout.prototype._updateRatios = oldVal3;
            SplitLayout.prototype._applyRatios = oldVal4;
        });

        it('should call the _updateRatios method and update the ratio of the container', () => {
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
        });

        it('should call the _updateRatios method and update the ratio of the container', () => {
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

            wrapper.instance()._applyRatios(300);

            expect(child1.style.width).toBe('150px');
            expect(child2.style.width).toBe('150px');

            ReactDOM.findDOMNode = oldVal;
        });

        it('should call the _searchSplitterIndex method and return the index of the splitter', () => {
            const splitter1 = "splitter1";
            const splitter2 = "splitter2";

            const oldVal = ReactDOM.findDOMNode;
            ReactDOM.findDOMNode = jest.fn().mockReturnValueOnce(splitter1).mockReturnValueOnce(splitter1).mockReturnValueOnce(splitter2);

            const wrapper = shallow(<SplitLayout split="vertical">
                <div visible={true}>View 1</div>
                <div visible={true}>View 2</div>
            </SplitLayout>);

            wrapper.instance().splitters = [splitter1, splitter2];

            expect(wrapper.instance()._searchSplitterIndex("splitter1")).toBe(0);
            expect(wrapper.instance()._searchSplitterIndex("splitter2")).toBe(1);

            ReactDOM.findDOMNode = oldVal;
        });

        it('should call the _computeSize method and set the ratios for the components of the container', () => {
            const oldVal2 = SplitLayout.prototype._applyRatios;
            SplitLayout.prototype._applyRatios = jest.fn();

            const oldVal3 = document.dispatchEvent;
            document.dispatchEvent = jest.fn();

            const wrapper = shallow(<SplitLayout split="vertical">
                <div visible={true}>View 1</div>
                <div visible={true}>View 2</div>
            </SplitLayout>);

            wrapper.instance().container = {
                clientWidth: 300
            };
            wrapper.instance().children = {
                length: 4
            };

            wrapper.instance()._computeSize(true);

            expect(wrapper.instance().ratios).toEqual([0.25, 0.25, 0.25, 0.25]);
            expect(SplitLayout.prototype._applyRatios).toHaveBeenCalledTimes(1);
            expect(document.dispatchEvent).toHaveBeenCalledTimes(0);
            expect(SplitLayout.prototype._applyRatios).toHaveBeenCalledWith(300);

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
            expect(component.key).toBe('splitter_vertical_0');
        });

        it('should call the _generateContainerView method and return a SplitterComponent', () => {
            const wrapper = shallow(<SplitLayout split="vertical">
                <div visible={true}>View 1</div>
                <div visible={true}>View 2</div>
            </SplitLayout>);

            const component = wrapper.instance()._generateContainerView(0, <div>View 1</div>);

            expect(component.type).toBe(ContainerView);
            expect(component.key).toBe('column_0');
        });

        it('should call the _generateRender method and return the correct array of components to render', () => {
            const wrapper = shallow(<SplitLayout split="vertical">
                <div visible={true}>View 1</div>
                <div visible={true}>View 2</div>
            </SplitLayout>);

            const toRender = wrapper.instance()._generateRender();

            expect(toRender.length).toBe(3);
            expect(toRender[0].type).toBe(ContainerView);
            expect(toRender[1].type).toBe(Splitter);
            expect(toRender[2].type).toBe(ContainerView);
        });

        it('should call the _generateRender method and return the correct array of components to render', () => {
            const wrapper = shallow(<SplitLayout split="vertical">
                <div visible={false}>View 1</div>
                <div visible={true}>View 2</div>
            </SplitLayout>);

            const toRender = wrapper.instance()._generateRender();

            expect(toRender.length).toBe(1);
            expect(toRender[0].type).toBe(ContainerView);
        });

        it('should call the childShouldBeDisplay method and return the correct boolean', () => {
            const wrapper = shallow(<SplitLayout split="vertical">
                <div visible={true}>View 1</div>
                <div visible={true}>View 2</div>
            </SplitLayout>);

            expect(wrapper.instance().childShouldBeDisplay(<SplitLayout split="vertical">
                <div visible={true}>View 1</div>
                <div visible={true}>View 2</div>
            </SplitLayout>)).toBe(true);

            expect(wrapper.instance().childShouldBeDisplay(<SplitLayout split="vertical">
                <div visible={false}>View 1</div>
                <div visible={true}>View 2</div>
            </SplitLayout>)).toBe(true);

            expect(wrapper.instance().childShouldBeDisplay(<SplitLayout split="vertical">
                <div visible={false}>View 1</div>
                <div visible={false}>View 2</div>
            </SplitLayout>)).toBe(false);
        });

    });

});