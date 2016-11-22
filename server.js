import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import  config from './webpack.config'

import qs from 'qs'
import React from 'react';
import  { createStore } from 'redux'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import counterApp from './reducers'
import App from './containers/App'


var app = new (require('express'))()
var port = 3000

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

// app.get("/", function(req, res) {
//   res.sendFile(__dirname + '/index.html')
// })

app.use(handleRender);

function handleRender(req,res){
	const params=qs.parse(req.query)
	const count = parseInt(params.counter) || 0
	let initialState= { count };
	const store=createStore(counterApp,initialState);

	const html = renderToString(
	    <Provider store={store}>
	      <App />
	    </Provider>
	)
	console.log(html);
	const finalState=store.getState();
	res.send(renderFullPage(html,finalState));
}
function renderFullPage(html,initialState){
	 return `
	    <!doctype html>
	    <html>
	      <head>
	        <title>Redux Universal 111111 Example</title>
	      </head>
	      <body>
	        <div id="root">${html}</div>
	        <script>
	          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
	        </script>
	        <script src="/static/bundle.js"></script>
	      </body>
	    </html>
	    `
}


app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
