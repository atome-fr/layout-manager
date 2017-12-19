import LayoutManager from './LayoutManager.js';
import LayoutComponent from './LayoutComponent.js';
import RowComponent from './RowComponent.js';
import ColumnComponent from './ColumnComponent.js';

$(document).ready(function () {

	class Ten extends LayoutComponent {
		
	}


	const lm = new LayoutManager($("#stage"));

	const row = new RowComponent();
	const col = new ColumnComponent();

	lm.root = row;
	row.addComponent(col);
	row.addComponent(new LayoutComponent('nodalView'));

	const render = new LayoutComponent('renderView');
	col.addComponent(render);
	col.addComponent(new LayoutComponent('codeView'));
	col.addComponent(new LayoutComponent('consoleView'));

	col.setRatios([0.2,0.3,0.5]);

	/*
	render.addEventListener('resize',(evt)=>{
		
	}))
	*/
});