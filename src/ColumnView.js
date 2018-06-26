import React, {Component} from 'react';

// Import components
import Container from './Container';

/**
 * Class used to manage a column view and render a container of rows
 * @class
 */
class ColumnView extends Component {

    /**
     * Method for render the components
     * @returns {*}
     */
    render() {
        return (
            <div className="column">

                <Container type="row" views={this.props.views}/>

            </div>
        );
    }
}

export default ColumnView;