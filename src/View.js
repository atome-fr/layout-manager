import React from 'react';

/**
 * Method for render the component
 * @param {Object} props The props passed to the component
 */
export default function View(props) {
    return (
        <div className="component">
            {props.children}
        </div>
    );
}