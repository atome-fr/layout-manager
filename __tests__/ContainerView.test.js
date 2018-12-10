import React from 'react';
import ContainerView from '../src/ContainerView';
import View from '../src/View';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('ContainerView Component', () => {

    describe('UI Render Test', () => {

        it('should render with the ContainerView component in row', () => {
            const wrapper = shallow(<ContainerView type="row" ratio={0.5}>
                <div visible="true"></div>
            </ContainerView>);
            const tree = toJson(wrapper);

            expect(tree).toMatchSnapshot();
            expect(wrapper.find(View).length).toBe(1);
        });
        
        it('should render with the ContainerView component in column', () => {
            const wrapper = shallow(<ContainerView type="column" ratio={0.2}>
                <div visible="true"></div>
            </ContainerView>);
            const tree = toJson(wrapper);

            expect(tree).toMatchSnapshot();
            expect(wrapper.find(View).length).toBe(1);
        });

    });

});