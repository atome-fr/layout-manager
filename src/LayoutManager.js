import React from 'react';

export default function LayoutManager(props) {
    return (
        <div className="containerView">
            {
                props.children
            }
        </div>
    );
}