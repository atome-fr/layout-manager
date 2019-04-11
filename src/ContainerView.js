import React, {Component} from 'react';

// Import component
import View from './View';

/**
 * Class used to manage a container view
 * @class
 */
export default class ContainerView extends Component {

    /**
     * Method for render the components
     * @returns {*}
     */
    render() {
        let style = {};
        if (this.props.type === 'row'){
            style['height'] = `calc(${this.props.ratio * 100}% - 5px)`;
        } else{
            style['width'] = `calc(${this.props.ratio * 100}% - 5px)`;
        }
        return (
            <div className={this.props.type} style={style}>
                {
                    React.Children.map(this.props.children, child => {
                        if (child.props.visible && child.type === "div") {
                            return <View>
                                {child}
                            </View>
                        }
                        else if (child.type !== "div") {
                            return child
                        }
                    })
                }
            </div>
        );
    }
}