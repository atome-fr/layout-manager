import React, {Component} from 'react';

// Import component
import ContainerView from './ContainerView';
import Splitter from './Splitter';
import ReactDOM from "react-dom";

// Import helpers
import Util from './helpers/util';

/**
 * Class used to manage a group of containers
 * @class
 */
export default class GroupContainer extends Component {

    /**
     * Override the constructor
     * @param props
     */
    constructor(props) {
        super(props);

        this.handleSplitterChange = this.handleSplitterChange.bind(this);
        this._computeSize = this._computeSize.bind(this);

        this.sliderSize = 10;

        this.splitters = [];
        this.children = [];

        if (props.split === 'vertical') {
            this.sizePropName = "width";
            this.offsetPropName = "x";
            this.splitterType = props.split;
            this.containerType = "column";
        }
        else if (props.split === 'horizontal') {
            this.sizePropName = "height";
            this.offsetPropName = "y";
            this.splitterType = props.split;
            this.containerType = "row";
        }
    }

    /**
     * Component lifecycle method
     */
    componentDidMount() {
        this._computeSize(true);
        window.addEventListener("resize", this._computeSize);
    }

    /**
     * Component lifecycle method
     */
    componentDidUpdate() {
        if (this.children.length > 0) {
            this._computeSize();
        }
    }

    /**
     * Component lifecycle method
     */
    componentWillUnmount() {
        window.removeEventListener("resize", this._computeSize);
    }

    /**
     * Handler when the splitter is moved
     * @param splitterOffset The position of the slider
     * @param splitterNode The splitter node
     */
    handleSplitterChange(splitterOffset, splitterNode) {
        const sizeAvailable = this.container[`client${this.sizePropName.charAt(0).toUpperCase() + this.sizePropName.slice(1)}`] - (this.splitters.length * this.sliderSize);
        const ratioOffset = splitterOffset[this.offsetPropName] / sizeAvailable;
        const splitterIndex = Util.searchSplitterIndex(this.splitters, splitterNode);

        this._updateRatios(splitterIndex, ratioOffset);

        this._applyRatios();
    }

    /**
     * Method for update the ratio for the view components
     * @param index The index of the ratio to change
     * @param ratio The new ratio to change
     * @private
     */
    _updateRatios(index, ratio) {
        const newRatios = this.ratios.slice();

        let ratioToAdd = ratio;
        let indexToAdd = index;
        while (ratioToAdd !== 0 && indexToAdd >= 0) {
            if (newRatios[indexToAdd] + ratioToAdd > 0) {
                newRatios[indexToAdd] += ratioToAdd;
                ratioToAdd = 0;
            } else {
                ratioToAdd += newRatios[indexToAdd];
                newRatios[indexToAdd] = 0;
                indexToAdd--;
            }
        }

        let ratioToRem = ratio;
        let indexToRem = index + 1;
        while (ratioToRem !== 0 && indexToRem < this.children.length) {
            if (newRatios[indexToRem] - ratioToRem > 0) {
                newRatios[indexToRem] -= ratioToRem;
                ratioToRem = 0;
            } else {
                ratioToRem -= newRatios[indexToRem];
                newRatios[indexToRem] = 0;
                indexToRem++;
            }
        }

        const sumRatios = newRatios.reduce((acc, val) => acc + val, 0);
        if (sumRatios < 0.99999 || sumRatios > 1.00001) {
            return;
        }

        this.ratios = newRatios;

        this.props.onResize();
    }

    /**
     * Method for apply the ratio to the components
     * @private
     */
    _applyRatios() {
        for (let i = 0; i < this.children.length; i++) {
            ReactDOM.findDOMNode(this.children[i]).style[this.sizePropName] = this.ratios[i] * 100 + '%';
        }
    }

    /**
     * Method for compute the size for each component
     * @private
     */
    _computeSize(isInitialization = false) {

        this.ratios = [1];

        if (this.children.length === 2 && this.props.size) {
            this.ratios = this.props.size;
        }
        else if (this.children.length === 2 && !this.props.size) {
            this.ratios = [0.5, 0.5];
        }

        this._applyRatios();

        if (typeof(isInitialization) !== "boolean" || !isInitialization) {
            document.dispatchEvent(new Event("resizeComponents"));
        }
    }

    /**
     * Method for generate the render
     * @returns {Array}
     * @private
     */
    _generateRender() {
        let toRender = [];

        // Reset array of refs
        this.splitters = [];
        this.children = [];

        let index = 0;

        React.Children.forEach(this.props.children, (child, i) => {
            if ((typeof child.type === "function" && child.type === SplitLayout && Util.childShouldBeDisplay(child)) || child.props.visible) {
                if (index > 0) {
                    toRender.push(this._generateSplitter(index));
                }

                toRender.push(this._generateContainerView(index, child));

                index++;
            }
        });

        return toRender;
    }

    /**
     * Method for generate the splitter component
     * @param index The index of the current child
     * @returns {*}
     * @private
     */
    _generateSplitter(index) {
        return <Splitter ref={splitter => {
            if (splitter) this.splitters.push(splitter);
        }}
                         key={'splitter_group_' + this.props.split + '_' + index}
                         type={this.splitterType}
                         onChange={(offset, node) => this.handleSplitterChange(offset, node)}/>
    }

    /**
     * Method for generate the correct container component
     * @param index The index of the current child
     * @param child The child to render
     * @returns {*}
     * @private
     */
    _generateContainerView(index, child) {
        return <ContainerView ref={col => {
            if (col) this.children.push(col);
        }}
                              key={this.containerType + '_' + index}
                              type={this.containerType}
        >
            {child}
        </ContainerView>
    }

    /**
     * Method for render the components
     * @returns {*}
     */
    render() {
        return (
            <div ref={(el) => this.container = el}
            style={{width:'100%', height:'50%'}}>

                {this._generateRender()}

            </div>
        );
    }
}