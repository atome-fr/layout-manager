import React from 'react';
import RowView from '../src/RowView';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import View from "../src/View";

describe('RowView Component', () => {

    describe('UI Render Test', () => {

        it('should render with the component passed in parameter', () => {
            const wrapper = shallow(<RowView  view={{component: RowView}}/>);
            const tree = toJson(wrapper);

            expect(tree).toMatchSnapshot();
            expect(wrapper.find(View).length).toBe(1);
        });

    });

});