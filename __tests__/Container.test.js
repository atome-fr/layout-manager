import React from 'react';
import ReactDOM from 'react-dom';
import Container from '../src/Container';
import ColumnView from '../src/ColumnView';
import RowView from '../src/RowView';
import Splitter from '../src/Splitter';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Container Component', () => {
    let oldVal = null;

    beforeEach(() => {
        oldVal = Container.prototype.componentDidMount;
        Container.prototype.componentDidMount = jest.fn();
    });

    afterEach(() => {
        Container.prototype.componentDidMount = oldVal;
    });

    describe('UI Render Test', () => {

        it('should render with ColumnView children component', () => {
            const views = [
                {
                    visible: true,
                    components: [
                        {
                            name: 'rendering',
                            visible: true
                        },
                        {
                            name: 'ide',
                            visible: true
                        }
                    ]
                },
                {
                    visible: true,
                    components: [
                        {
                            name: 'nodal',
                            visible: true
                        }
                    ]
                }
            ];

            const wrapper = shallow(<Container type="column" views={views}/>);
            const tree = toJson(wrapper);

            expect(tree).toMatchSnapshot();
            expect(wrapper.find(ColumnView).length).toBe(2);
            expect(wrapper.find(Splitter).length).toBe(1);
        });

        it('should render with RowView children component', () => {
            const views = [
                {
                    name: 'rendering',
                    visible: true
                },
                {
                    name: 'ide',
                    visible: true
                }
            ];

            const wrapper = shallow(<Container type="row" views={views}/>);
            const tree = toJson(wrapper);

            expect(tree).toMatchSnapshot();
            expect(wrapper.find(RowView).length).toBe(2);
            expect(wrapper.find(Splitter).length).toBe(1);
        });
    });

    describe('Component Method Test', () => {

        it('should call the handleSplitterChange method and call the methods for update the size of the different components', () => {
            const oldVal2 = Container.prototype._searchSplitterIndex;
            Container.prototype._searchSplitterIndex = jest.fn(() => 0);

            const oldVal3 = Container.prototype._updateRatios;
            Container.prototype._updateRatios = jest.fn();

            const oldVal4 = Container.prototype._applyRatios;
            Container.prototype._applyRatios = jest.fn();

            const wrapper = shallow(<Container type="column" views={[]}/>);

            wrapper.instance().container = {
                clientWidth: 300
            };

            wrapper.instance().handleSplitterChange({x: 1, y: 1}, {});

            expect(Container.prototype._searchSplitterIndex).toHaveBeenCalledTimes(1);
            expect(Container.prototype._searchSplitterIndex).toHaveBeenCalledWith({});
            expect(Container.prototype._updateRatios).toHaveBeenCalledTimes(1);
            expect(Container.prototype._updateRatios).toHaveBeenCalledWith(0, (1 / 300));
            expect(Container.prototype._applyRatios).toHaveBeenCalledTimes(1);
            expect(Container.prototype._applyRatios).toHaveBeenCalledWith(300);

            Container.prototype._searchSplitterIndex = oldVal2;
            Container.prototype._updateRatios = oldVal3;
            Container.prototype._applyRatios = oldVal4;
        });

        it('should call the _updateRatios method and update the ratio of the container', () => {
            const wrapper = shallow(<Container type="column" views={[]}/>);

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
            const wrapper = shallow(<Container type="column" views={[]}/>);

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

            const wrapper = shallow(<Container type="column" views={[]}/>);

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

            const wrapper = shallow(<Container type="column" views={[]}/>);

            wrapper.instance().splitters = [splitter1, splitter2];

            expect(wrapper.instance()._searchSplitterIndex("splitter1")).toBe(0);
            expect(wrapper.instance()._searchSplitterIndex("splitter2")).toBe(1);

            ReactDOM.findDOMNode = oldVal;
        });

        it('should call the _computeSize method and set the ratios for the components of the container', () => {
            const oldVal2 = Container.prototype._applyRatios;
            Container.prototype._applyRatios = jest.fn();

            const oldVal3 = document.dispatchEvent;
            document.dispatchEvent = jest.fn();

            const wrapper = shallow(<Container type="column" views={[]}/>);

            wrapper.instance().container = {
                clientWidth: 300
            };
            wrapper.instance().children = {
                length: 4
            };

            wrapper.instance()._computeSize(true);

            expect(wrapper.instance().ratios).toEqual([0.25, 0.25, 0.25, 0.25]);
            expect(Container.prototype._applyRatios).toHaveBeenCalledTimes(1);
            expect(document.dispatchEvent).toHaveBeenCalledTimes(0);
            expect(Container.prototype._applyRatios).toHaveBeenCalledWith(300);

            wrapper.instance()._computeSize();
            expect(document.dispatchEvent).toHaveBeenCalledTimes(1);

            Container.prototype._applyRatios = oldVal2;
            document.dispatchEvent = oldVal3;
        });

        it('should call the _generateRender method and return the correct array of ColumnView components to render', () => {
            const views = [
                {
                    visible: true,
                    components: [
                        {
                            name: 'rendering',
                            visible: true
                        },
                        {
                            name: 'ide',
                            visible: true
                        }
                    ]
                },
                {
                    visible: true,
                    components: [
                        {
                            name: 'nodal',
                            visible: true
                        }
                    ]
                }
            ];

            const wrapper = shallow(<Container type="column" views={views}/>);

            const toRender = wrapper.instance()._generateRender();

            expect(toRender.length).toBe(3);
            expect(toRender[0].type).toBe(ColumnView);
            expect(toRender[1].type).toBe(Splitter);
            expect(toRender[2].type).toBe(ColumnView);
        });

        it('should call the _generateRender method and return the correct array of RowView components to render', () => {
            const views = [
                {
                    name: 'rendering',
                    visible: true
                },
                {
                    name: 'ide',
                    visible: true
                }
            ];

            const wrapper = shallow(<Container type="row" views={views}/>);

            const toRender = wrapper.instance()._generateRender();

            expect(toRender.length).toBe(3);
            expect(toRender[0].type).toBe(RowView);
            expect(toRender[1].type).toBe(Splitter);
            expect(toRender[2].type).toBe(RowView);
        });

    });

});