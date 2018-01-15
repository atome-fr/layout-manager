# Layout Manager
LayoutManager is a simple library to manage the inner space of a DOM Object.

## Tech

LayoutManager uses jQuery to manage the DOMElements.


## Current Feature

 - Component give a jQueryElement to add some DOMElements inside
 - SplitterComponent display some component splitted by a handle to change the size of the components :
 -- RowComponent display multiple components in row
 -- ColumnComponent display multipls component in column


## Installation

To install and use LayoutManager, you can install it from npm : 
```sh
$ npm install --save git+https://github.com/atome-fr/layout-manager#develop
```


## Build

In the folder of the library :
```sh
$ npm install
$ npm run build
```


## Basic Usage Example

```js
    // Create the entry point to the layout manager    
    const lm = new LayoutManager.LayoutManager($("#stage"));
	
	// Create a SplitterComponent to display the element in a row
	const row = new LayoutManager.RowComponent('row');
	
	// Set the row as root to the layout
	lm.root = row;
	
	// Add 2 abstract components
	row.addComponent(new LayoutManager.LayoutComponent('view1'));
	row.addComponent(new LayoutManager.LayoutComponent('view2'));
	
	// Set the ratios of the component, the 'view1' component will take 80% of the space
	row.setRatios([0.8,0.2]);
```

## Docs

The docs can be generated using npm:
```sh
$ npm run docs
```


## More Examples

You can find some examples of usages of the library in the folder "example".