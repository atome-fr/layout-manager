import React, {Component} from 'react';

/**
 * Class used to manage a splitter
 * @class
 */
class Splitter extends Component {

    /**
     * Override constructor
     * @param props
     */
    constructor(props) {
        super(props);

        this.handleMouseOrTouchStart = this.handleMouseOrTouchStart.bind(this);
        this.handleMouseOrTouchMove = this.handleMouseOrTouchMove.bind(this);
        this.handleMouseOrTouchEnd = this.handleMouseOrTouchEnd.bind(this);
    }

    /**
     * Handler when the user start to move the splitter
     */
    handleMouseOrTouchStart(ev) {
        if ((ev.clientX && ev.clientY) || (ev.touches && ev.touches.length > 0)) {
            this.mousePos = {x: ev.clientX || ev.touches[0].clientX, y: ev.clientY || ev.touches[0].clientY};
        }
        document.addEventListener('mousemove', this.handleMouseOrTouchMove);
        document.addEventListener('touchmove', this.handleMouseOrTouchMove);
        document.addEventListener('mouseup', this.handleMouseOrTouchEnd);
        document.addEventListener('touchend', this.handleMouseOrTouchEnd);
    }

    /**
     * Handler when the user move the splitter
     * @param ev
     */
    handleMouseOrTouchMove(ev) {
        ev.preventDefault();

        let newMousePos = undefined;
        if ((ev.clientX && ev.clientY) || (ev.touches && ev.touches.length > 0)) {
            newMousePos = {x: ev.clientX || ev.touches[0].clientX, y: ev.clientY || ev.touches[0].clientY};
        }

        if(newMousePos) {
            const offset = {x: newMousePos.x - this.mousePos.x, y: newMousePos.y - this.mousePos.y};
            this.mousePos = newMousePos;
            this.props.onChange(offset, this.el);
        }
    }

    /**
     * Handler when the user end to move the splitter
     */
    handleMouseOrTouchEnd() {
        document.removeEventListener('mousemove', this.handleMouseOrTouchMove);
        document.removeEventListener('touchmove', this.handleMouseOrTouchMove);
        document.removeEventListener('mouseup', this.handleMouseOrTouchEnd);
        document.removeEventListener('touchend', this.handleMouseOrTouchEnd);
    }

    /**
     * Method for render the components
     * @returns {*}
     */
    render() {
        return (
            <div ref={(el) => this.el = el}
                 className={"splitter " + this.props.type}
                 onTouchStart={this.handleMouseOrTouchStart}
                 onMouseDown={this.handleMouseOrTouchStart}>
                <div className="handle">
                </div>
            </div>
        );
    }
}

export default Splitter;