import React, {Component} from 'react';

// Import component
import View from './View';

/**
 * Class used to manage a row view
 * @class
 */
class RowView extends Component {

    /**
     * Method for render the components
     * @returns {*}
     */
    render() {
        return (
            <div className="row">
                <View>
                    {this.props.view.component}
                </View>
            </div>
        );
    }
}

export default RowView;