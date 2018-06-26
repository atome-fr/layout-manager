import React from 'react';
import ContainerView from '../src/ContainerView';
import Container from '../src/Container';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('ContainerView Component', () => {

    describe('UI Render Test', () => {

        it('should render with Container child component', () => {
            const wrapper = shallow(<ContainerView/>);
            const tree = toJson(wrapper);

            expect(tree).toMatchSnapshot();
            expect(wrapper.find(Container).length).toBe(1);
        });

    });

});