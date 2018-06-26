import React from 'react';
import ColumnView from '../src/ColumnView';
import Container from '../src/Container';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('ColumnView Component', () => {

    describe('UI Render Test', () => {

        it('should render with the Container component', () => {
            const wrapper = shallow(<ColumnView views={{}}/>);
            const tree = toJson(wrapper);

            expect(tree).toMatchSnapshot();
            expect(wrapper.find(Container).length).toBe(1);
        });

    });

});