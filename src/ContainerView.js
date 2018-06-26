import React from 'react';

// Import components
import Container from './Container';

/**
 * Method for render a container of columns
 */
function ContainerView(props) {
    return (
        <div className="containerView">

            <Container type="column" views={props.views}/>

        </div>
    );
}

export default ContainerView;