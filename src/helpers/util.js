import ReactDOM from 'react-dom';
import React from "react";

/**
 * Represent a Util class
 * @class
 */
export default class Util {
    /**
     * Constructor of the Util.
     * @classdesc A class that represents all the methods that can help
     * @constructs Util
     */
    constructor() {

    }

    /**
     * Method for search the index of the splitter in the array of refs
     * @param arraySplitters The array with all the splitters for the component
     * @param splitterNode The node of the splitter moved
     * @returns {number} The index of the splitter
     */
    static searchSplitterIndex(arraySplitters, splitterNode) {
        for (let i = 0; i < arraySplitters.length; i++) {
            if (ReactDOM.findDOMNode(arraySplitters[i]) === splitterNode) {
                return i;
            }
        }
    }

    /**
     * Method for check if a child is visible or not
     * @param child
     * @returns {boolean|*}
     */
    static checkChildVisibility(child) {
        return ((child.type === 'div' || typeof child.type === 'function' && child.type !== SplitLayout) && child.props.visible)
            || (typeof child.type === 'function' && child.type === SplitLayout);
    }

    /**
     * Method for check if a group is visible or not
     * @param arrayChildren
     */
    static checkGroupVisibility(arrayChildren) {
        for (let i = 0; i < arrayChildren.length; i++) {
            if (Util.checkChildVisibility(arrayChildren[i])) return true;
        }
        return false;
    }

    /**
     * Method for check if the component got one children visible
     * @param child
     */
    static childShouldBeDisplay(child) {
        const children = React.Children.toArray(child.props.children);
        for (let child of children) {
            let childShouldBeDisplay = false;
            if ((typeof child.type === "function" && child.type === SplitLayout)) {
                childShouldBeDisplay = Util.childShouldBeDisplay(child);
            }

            if (child.props.visible || childShouldBeDisplay) return true;
        }

        return false;
    }
}