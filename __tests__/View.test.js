import React from 'react';
import View from '../src/View';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('View Component', () => {

    describe('UI Render Test', () => {

        it('should render the View component', () => {
            const wrapper = shallow(<View/>);
            const tree = toJson(wrapper);

            expect(tree).toMatchSnapshot();
        });

    });

});