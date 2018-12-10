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
            size_group1: null,
            size_group2: null,
            showDemoButtons: false,
            direction: 'vertical'
        }
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

    handleResize(name, newSize) {
        let newState = {};
        newState[name] = newSize;
        this.setState(newState);
    }

    /**
     * Method for render the components
     * @returns {*}
     */
    render() {
        const rootStyle = {width: '100%', height: '100%'};
        const demosButtonsStyle = {position: 'absolute', zIndex: '20'};
        const buttonsDivStyle = {position: 'absolute', bottom: '0'};
        const viewStyle = {textAlign: 'center'};

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
                    <button onClick={() => {
                        this.setState({direction: this.state.direction === 'vertical' ? 'horizontal' : 'vertical'})
                    }}>Toggle direction
                    </button>
                </div>

                <LayoutManager>
                    <SplitLayout split={this.state.direction} size={this.state.size_group1} onResize={newSize => this.handleResize('size_group1', newSize)}>
                        <div style={viewStyle} visible={this.state.viewOneIsVisible}>View 1</div>
                        <SplitLayout split={this.state.direction} size={this.state.size_group2} onResize={newSize => this.handleResize('size_group2', newSize)}>
                            <div style={viewStyle} visible={this.state.viewTwoIsVisible}>View 2</div>
                            <div style={viewStyle} visible={this.state.viewThreeIsVisible}>View 3</div>
                        </SplitLayout>
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