import React, {Component} from 'react';
import {LayoutManager, SplitLayout} from "../../src/index";

/**
 * Class used for the examples
 * @class
 */
export default class ExamplesContainer extends Component {

    /**
     * Override constructor
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            viewOneIsVisible: true,
            viewTwoIsVisible: true,
            viewThreeIsVisible: true,
            showDemoButtons: false
        }
    }

    /**
     * Method called when a button for toggle a component is pressed
     * @param colIndex The column's index of the component
     * @param compIndex The component's index of the component
     */
    handleToggleComponent(colIndex, compIndex) {
        let views = this.state.views.concat();
        views[colIndex].components[compIndex].visible = !this.state.views[colIndex].components[compIndex].visible;

        // Check if column had to be visible
        let columnHadToBeVisible = false;
        for (let i = 0; i < this.state.views[colIndex].components.length; i++) {
            if (this.state.views[colIndex].components[i].visible) {
                columnHadToBeVisible = true;
                break;
            }
        }
        this.state.views[colIndex].visible = columnHadToBeVisible;

        this.setState(views);
    }

    /**
     * Method for generate the right number of buttons for toggle each component
     * @returns {Array}
     * @private
     */
    _generateButtons() {
        let toRender = [];

        toRender.push(<button id={'toggle_view_one'}
                              key={'button_toggle_view_one'}
                              onClick={() =>
                                  this.setState((prevState, props) => {
                                      return {viewOneIsVisible: !prevState.viewOneIsVisible};
                                  })
                              }>
            Toggle View 1
        </button>);

        toRender.push(<button id={'toggle_view_two'}
                              key={'button_toggle_view_two'}
                              onClick={() =>
                                  this.setState((prevState, props) => {
                                      return {viewTwoIsVisible: !prevState.viewTwoIsVisible};
                                  })
                              }>
            Toggle View 2
        </button>);

        toRender.push(<button id={'toggle_view_three'}
                              key={'button_toggle_view_three'}
                              onClick={() =>
                                  this.setState((prevState, props) => {
                                      return {viewThreeIsVisible: !prevState.viewThreeIsVisible};
                                  })
                              }>
            Toggle View 3
        </button>);

        return toRender;
    }

    /**
     * Method for render the components
     * @returns {*}
     */
    render() {
        const rootStyle = {width: '100%', height: '100%'};
        const demosButtonsStyle = {position: 'absolute', zIndex: '20'};
        const buttonsDivStyle = {position: 'absolute', bottom: '0'};

        return (
            <div style={rootStyle}>
                <div style={demosButtonsStyle}>
                    <button onClick={() => {
                        this.setState({showDemoButtons: false})
                    }}>Demo drag splitter
                    </button>
                    <button onClick={() => {
                        this.setState({showDemoButtons: true})
                    }}>Demo drag splitter + show/hide components
                    </button>
                </div>

                <LayoutManager>
                    <SplitLayout split="vertical">
                        <SplitLayout split="horizontal">
                            <div visible={this.state.viewOneIsVisible}>View 1</div>
                            <div visible={this.state.viewTwoIsVisible}>View 2</div>
                        </SplitLayout>
                        <div visible={this.state.viewThreeIsVisible}>View 3</div>
                    </SplitLayout>
                </LayoutManager>

                {this.state.showDemoButtons &&
                <div style={buttonsDivStyle}>
                    {this._generateButtons()}
                </div>
                }
            </div>
        )
    }

}