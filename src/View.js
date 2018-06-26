import React from 'react';

/**
 * Method for render the component
 * @param {Object} props The props passed to the component
 */
function View(props) {
    return (
        <div className="component">
            {props.children}
        </div>
    );
}

export default View;