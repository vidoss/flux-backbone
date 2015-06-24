#Todo app using FluxBackbone

This is a rewrite of [Backbone TODO app](https://github.com/jashkenas/backbone/tree/master/examples/todos) to use Flux pattern using [FluxBackbone](https://github.com/vidoss/flux-backbone). It also uses Backbone.Sync() for the WebApi layer. 

#Install
```
cd examples/todos
npm install
npm run build
```
Run a static http server ( e.g `python -m SimpleHTTPServer` on Mac ) and load index.html

<img src="./images/flux.png" style="width: 100%;" />

[Click here for diff between original Backbone todos.js and Flux Backbone todos.js](https://www.diffchecker.com/ybnpz3rx)
