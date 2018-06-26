import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// Import components
import ColumnView from './ColumnView';
import RowView from './RowView';
import Splitter from './Splitter';

/**
 * Class used to manage a container of components (columns or rows)
 * @class
 */
class Container extends Component {

    /**
     * Override the constructor
     * @param props
     */
    constructor(props) {
        super(props);

        this.handleSplitterChange = this.handleSplitterChange.bind(this);

        this.sliderSize = 10;

        this.splitters = [];
        this.children = [];

        if (props.type === 'column') {
            this.sizePropName = "width";
            this.offsetPropName = "x";
            this.splitterType = "vertical";
        }
        else if (props.type === 'row') {
            this.sizePropName = "height";
            this.offsetPropName = "y";
            this.splitterType = "horizontal";
        }
    }

    /**
     * Component lifecycle method
     */
    componentDidMount() {
        this._computeSize();
        window.addEventListener("resize", () => this._computeSize());
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
        window.removeEventListener("resize", () => this._computeSize());
    }

    /**
     * Handler when the splitter is moved
     * @param splitterOffset The position of the slider
     * @param splitterNode The splitter node
     */
    handleSplitterChange(splitterOffset, splitterNode) {
        const sizeAvailable = this.container[`client${this.sizePropName.charAt(0).toUpperCase() + this.sizePropName.slice(1)}`] - (this.splitters.length * this.sliderSize);
        const ratioOffset = splitterOffset[this.offsetPropName] / sizeAvailable;
        const splitterIndex = this._searchSplitterIndex(splitterNode);

        this._updateRatios(splitterIndex, ratioOffset);

        this._applyRatios(sizeAvailable);
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
    }

    /**
     * Method for apply the ratio to the components
     * @param sizeAvailable The available global size for apply each ratio
     * @private
     */
    _applyRatios(sizeAvailable) {
        for (let i = 0; i < this.children.length; i++) {
            ReactDOM.findDOMNode(this.children[i]).style[this.sizePropName] = sizeAvailable * this.ratios[i] + 'px';
        }
    }

    /**
     * Method for search the index of the splitter in the array of refs
     * @param splitterNode The node of the splitter moved
     * @returns {number} The index of the splitter
     * @private
     */
    _searchSplitterIndex(splitterNode) {
        for (let i = 0; i < this.splitters.length; i++) {
            if (ReactDOM.findDOMNode(this.splitters[i]) === splitterNode) {
                return i;
            }
        }
    }

    /**
     * Method for compute the size for each column
     * @private
     */
    _computeSize() {
        this.ratios = [];

        const sizeAvailable = this.container[`client${this.sizePropName.charAt(0).toUpperCase() + this.sizePropName.slice(1)}`] - (this.splitters.length * this.sliderSize);

        for (let i = 0; i < this.children.length - 1; i++) {
            this.ratios[i] = (sizeAvailable / this.children.length) / sizeAvailable;
        }
        // In order to have exactly a ratio of one
        this.ratios[this.children.length - 1] = 1 - this.ratios.reduce((acc, val) => {
            return acc + val;
        }, 0);

        this._applyRatios(sizeAvailable);
    }

    /**
     * Method for generate the render with the right numbers of columns and splitters
     * @returns {Array}
     * @private
     */
    _generateRender() {
        let toRender = [];

        // Reset array of refs
        this.splitters = [];
        this.children = [];

        let index = 0;
        this.props.views.forEach((view) => {
            if (view.visible) {
                if (index > 0) {
                    toRender.push(<Splitter ref={(splitter) => {
                        if (splitter) {
                            this.splitters.push(splitter);
                        }
                    }}
                                            key={'splitter_' + this.props.type + '_' + index}
                                            type={this.splitterType}
                                            onChange={(offset, node) => this.handleSplitterChange(offset, node)}/>);
                }

                if (this.props.type === "column") {
                    toRender.push(<ColumnView ref={(col) => {
                        if (col) {
                            this.children.push(col);
                        }
                    }}
                                              key={this.props.type + '_' + index}
                                              views={view.components}/>);
                }
                else if (this.props.type === "row") {
                    toRender.push(<RowView ref={(row) => {
                        if (row) {
                            this.children.push(row);
                        }
                    }}
                                           key={'row_' + index}
                                           view={view}/>);
                }

                index++;
            }
        });

        return toRender;
    }

    /**
     * Method for render the components
     * @returns {*}
     */
    render() {
        const classNames = (this.props.type === "column" ? "container parent" : "container");

        return (
            <div ref={(el) => this.container = el}
                 className={classNames}>

                {this._generateRender()}

            </div>
        );
    }
}

export default Container;