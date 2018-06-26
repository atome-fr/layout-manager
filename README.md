# Layout Manager
LayoutManager is a simple library to manage the inner space of a DOM Object.

## Tech

LayoutManager uses React to manage the DOMElements.


## Current Feature

 - Component give a jQueryElement to add some DOMElements inside
 - Splitter display some component splitted by a handle to change the size of the components :
 -- RowView display multiple components in row
 -- ColumnView display multiple components in column


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
    import {ContainerView} from 'layout-manager';
```

And then :

```js
        render() {
            return (<ContainerView/>);
        }
```

See "More Examples" section for more informations.

## Docs

The docs can be generated using npm:
```sh
$ npm run docs
```


## More Examples

In the folder of the library :
```sh
$ npm install
$ npm run build-examples
```

And then start the index.html in the examples folder