import React, {Component} from 'react';

// Import component
import ContainerView from './ContainerView';
import Splitter from './Splitter';
import ReactDOM from "react-dom";

// Import helpers
import Util from './helpers/util';

/**
 * Class used to manage different columns and rows
 * @class
 */
export default class SplitLayout extends Component {

    /**
     * Override the constructor
     * @param props
     */
    constructor(props) {
        super(props);

        this.handleSplitterChange = this.handleSplitterChange.bind(this);
        this.sliderSize = 10;
    }
    
    /**
     * Get the name of the size property depending on the the spliter direction
     * @return {String} "width" or "height"
     */
    getPropSize() {
        if(this.props.split === 'vertical'){
            return 'width';
        } else if (this.props.split === 'horizontal'){
            return 'height';
        }
    }

    /**
     * Get the name of the offset property depending on the the spliter direction
     * @return {String} "x" or "y"
     */
    getPropOffset() {
        if(this.props.split === 'vertical'){
            return 'x';
        } else if (this.props.split === 'horizontal'){
            return 'y';
        }
    }

    /**
     * Get the name of the ContainerView type depending on the the spliter direction
     * @return {String} "colum" or "row"
     */
    getContainerType() {
        if(this.props.split === 'vertical'){
            return 'column';
        } else if (this.props.split === 'horizontal'){
            return 'row';
        }
    }

    /**
     * Component lifecycle method
     */
    componentDidMount() {
        if (this.props.children.length !== 2) {
            throw new Error("SplitLayout must have extactly 2 children");
        }
    }

    /**
     * Component lifecycle method
     */
    componentDidUpdate() {
        if (this.props.children.length !== 2) {
            throw new Error("SplitLayout must have extactly 2 children");
        }
    }

    /**
     * Handler when the splitter is moved
     * @param splitterOffset The position of the slider
     * @param splitterNode The splitter node
     */
    handleSplitterChange(splitterOffset, splitterNode) {
        const propSize = this.getPropSize();
        const sizeAvailable = this.container[`client${propSize.charAt(0).toUpperCase() + propSize.slice(1)}`] - this.sliderSize;
        const ratioOffset = splitterOffset[this.getPropOffset()] / sizeAvailable;

        this._updateRatios(ratioOffset);
    }

    /**
     * Method for update the ratio for the view components
     * @param index The index of the ratio to change
     * @param ratioOffset The new ratio to change
     * @private
     */
    _updateRatios(ratioOffset) {
        const newRatios = this.ratios.slice();
        
        newRatios[0] += ratioOffset;
        newRatios[1] -= ratioOffset;
        
        if (newRatios[0] < 0){
            newRatios[0] = 0;
        }
        if (newRatios[0] > 1){
            newRatios[0] = 1;
        }
        if (newRatios[1] < 0){
            newRatios[1] = 0;
        }
        if (newRatios[1] > 1){
            newRatios[1] = 1;
        }

        const sumRatios = newRatios.reduce((acc, val) => acc + val, 0);
        if (sumRatios < 0.99999 || sumRatios > 1.00001) {
            return;
        }

        this.props.onResize(newRatios);
    }

    /**
     * Method for generate the render
     * @returns {Array}
     * @private
     */
    _generateRender() {
        let toRender = [];

        let index = 0;
        let childrenGroupCount = 0;
        let childrenGroup = [];
        let visibility = {};
        if (this.props.children[0].type.name === 'SplitLayout') {
            visibility.child1 = Util.checkGroupVisibility(this.props.children[0].props.children);
        } else {
            visibility.child1 = Util.checkChildVisibility(this.props.children[0]);
        }
        if (this.props.children[1].type.name === 'SplitLayout') {
            visibility.child2 = Util.checkGroupVisibility(this.props.children[1].props.children);
        } else {
            visibility.child2 = Util.checkChildVisibility(this.props.children[1]);
        }

        this.ratios = null;
        if (!visibility.child1){
            if (!visibility.child2){
                return toRender;
            }
            this.ratios = [0, 1];
        }
        else if (!visibility.child2){
            this.ratios = [1, 0];
        } else {
            this.ratios = this.props.size ? this.props.size : [0.5, 0.5];
        }

        if(visibility.child1) {
            toRender.push(this._generateContainerView(0, this.props.children[0], this.ratios[0]));
        }
        if(visibility.child1 && visibility.child2) {
            toRender.push(this._generateSplitter(0));
        }
        if(visibility.child2) {
            toRender.push(this._generateContainerView(1, this.props.children[1], this.ratios[1]));
        }
        return toRender;
    }

    /**
     * Method for generate the splitter component
     * @param index The index of the current child
     * @returns {*}
     * @private
     */
    _generateSplitter(index) {
        return <Splitter key={'splitter_layout_' + this.props.split + '_' + index}
                         type={this.props.split}
                         onChange={this.handleSplitterChange}/>
    }

    /**
     * Method for generate the correct container component
     * @param index The index of the current child
     * @param child The child to render
     * @returns {*}
     * @private
     */
    _generateContainerView(index, child, ratio) {
        return <ContainerView key={this.getContainerType() + '_' + index}
                              type={this.getContainerType()}
                              ratio={ratio}>
            {child}
        </ContainerView>
    }

    /**
     * Method for render the components
     * @returns {*}
     */
    render() {
        const classNames = (this.props.split === "vertical" ? "container parent" : "container");

        return (
            <div ref={(el) => this.container = el}
                 className={classNames}>

                {this._generateRender()}

            </div>
        );
    }
}