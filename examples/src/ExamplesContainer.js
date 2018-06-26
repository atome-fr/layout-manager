import React, {Component} from 'react';
import {ContainerView} from "../../src/index";

/**
 * Class used for the examples
 * @class
 */
class ExamplesContainer extends Component {

    /**
     * Override constructor
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            views: [
                {
                    visible: true,
                    components: [
                        {
                            name: 'component 1',
                            visible: true,
                            component: undefined
                        },
                        {
                            name: 'component 2',
                            visible: true,
                            component: undefined
                        }
                    ]
                },
                {
                    visible: true,
                    components: [
                        {
                            name: 'component 3',
                            visible: true,
                            component: undefined
                        }
                    ]
                }
            ],
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

        this.state.views.forEach((column, colIndex) => {
            column.components.forEach((component, compIndex) => {
                toRender.push(<button id={"toggle" + component.name.charAt(0).toUpperCase() + component.name.slice(1)}
                                      key={'button_' + colIndex + '_' + compIndex}
                                      onClick={() => this.handleToggleComponent(colIndex, compIndex)}>
                    Toggle {component.name}
                </button>);
            });
        });

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

                <ContainerView views={this.state.views}/>

                {this.state.showDemoButtons &&
                <div style={buttonsDivStyle}>
                    {this._generateButtons()}
                </div>
                }
            </div>
        )
    }

}

export default ExamplesContainer;