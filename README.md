# flux-backbone
Thin wrapper around Backbone Model and Collections to use in Flux pattern.

## Documentation
Please read the blog post on FluxBackbone: ["Building Backbone apps using Flux"](https://medium.com/@victordoss/building-backbone-apps-using-flux-f656fd8a873a).


## Installing FluxBackbone
Flux is available as a [npm module](https://www.npmjs.org/package/flux-backbone), so you can add it to your package.json file or run 

```
npm install flux-backbone
```  

Usage:

```javascript
var FluxBackbone = require('flux-backbone');
var TodoList = FluxBackbone.Collection.extend({
	...
})
```

## Building FluxBackbone from a Cloned Repo
Clone the repo and navigate into the resulting `flux-backbone` directory.  Then run 

```
npm install
```

This will run [Gulp](http://gulpjs.com/)-based build tasks automatically and produce the file FluxBackbone.js, which you can then require as a module. 

You could then require the Dispatcher like so:

```javascript
var FluxBackbone = require('path/to/this/directory/FluxBackbone');
```

The build process also produces de-sugared version of FluxBackbone in a `lib` directory, and you can require those modules directly, copying them into whatever directory is most convenient for you. 

## Examples
Todo Example: [TodoMVC](https://github.com/vidoss/flux-backbone/tree/master/examples/todos) 
