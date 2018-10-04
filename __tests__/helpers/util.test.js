import Util from '../../src/helpers/util';

import React from 'react';
import ReactDOM from 'react-dom';

describe('Util Class', () => {

    it('should call the searchSplitterIndex method and return the index of the splitter', () => {
        const splitter1 = "splitter1";
        const splitter2 = "splitter2";

        const splitters = [splitter1, splitter2];

        const oldVal = ReactDOM.findDOMNode;
        ReactDOM.findDOMNode = jest.fn().mockReturnValueOnce(splitter1).mockReturnValueOnce(splitter1).mockReturnValueOnce(splitter2);

        expect(Util.searchSplitterIndex(splitters, "splitter1")).toBe(0);
        expect(Util.searchSplitterIndex(splitters, "splitter2")).toBe(1);

        ReactDOM.findDOMNode = oldVal;
    });

    it('should call the checkGroupVisibility method and return the correct boolean', () => {
        let children = [
            <div visible={true}>View 1</div>,
            <div visible={true}>View 2</div>
        ];

        expect(Util.checkGroupVisibility(children)).toBe(true);

        children = [
            <div visible={true}>View 1</div>,
            <div visible={false}>View 2</div>
        ];

        expect(Util.checkGroupVisibility(children)).toBe(true);

        children = [
            <div visible={false}>View 1</div>,
            <div visible={false}>View 2</div>
        ];

        expect(Util.checkGroupVisibility(children)).toBe(false);
    });

    it('should call the childShouldBeDisplay method and return the correct boolean', () => {
        expect(Util.childShouldBeDisplay(<div split="vertical">
            <div visible={true}>View 1</div>
            <div visible={true}>View 2</div>
        </div>)).toBe(true);

        expect(Util.childShouldBeDisplay(<div split="vertical">
            <div visible={false}>View 1</div>
            <div visible={true}>View 2</div>
        </div>)).toBe(true);

        expect(Util.childShouldBeDisplay(<div split="vertical">
            <div visible={false}>View 1</div>
            <div visible={false}>View 2</div>
        </div>)).toBe(false);
    });

    it('should call the checkChildVisibility method and return the correct boolean', () => {
        let child = <div visible={true}>View 1</div>;

        expect(Util.checkChildVisibility(child)).toBe(true);

        child = <div visible={false}>View 1</div>;

        expect(Util.checkChildVisibility(child)).toBe(false);
    });

});