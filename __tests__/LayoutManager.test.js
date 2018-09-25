import React from 'react';
import LayoutManager from '../src/LayoutManager';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('LayoutManager Component', () => {

    describe('UI Render Test', () => {

        it('should render with all the children component', () => {
            const wrapper = shallow(<LayoutManager>
                <div>View 1</div>
            </LayoutManager>);
            const tree = toJson(wrapper);

            expect(tree).toMatchSnapshot();
            expect(wrapper.find("div").length).toBe(2);
        });
    });

});