import Event from '../src/Event.js';
import EventDispatcher from '../src/EventDispatcher.js';

describe('EventDispatcher',()=>{


	test('#constructor', ()=>{
		const evt = new EventDispatcher();
		expect(evt).toBeDefined();
		expect(evt.listeners).toBeDefined();
	});

	test('#addEventListener',()=>{
		const ed = new EventDispatcher();
		
		ed.addEventListener("test",jest.fn());
		expect(ed.listeners['test'].length).toBe(1);

	});

	describe('#removeEventListeners',()=>{

		test('with a callback',()=>{
			const ed = new EventDispatcher();
			const cb = jest.fn();
			ed.listeners = {'test':[jest.fn(),cb]};

			ed.removeEventListener('test',cb);

			expect(ed.listeners['test'].length).toBe(1);

		});

		test('with no callback',()=>{
			const ed = new EventDispatcher();
			const cb = jest.fn();
			ed.listeners = {'test':[jest.fn(),cb]};

			ed.removeEventListener('test');

			expect(ed.listeners['test'].length).toBe(0);
		});

	});

	test('dispatch',()=>{
		const ed = new EventDispatcher();
		const cb = jest.fn();
		const evt = new Event('test');
		
		ed.addEventListener('test', cb);

		ed.dispatch(evt);

		expect(cb).toBeCalledWith(evt);

	});	

});