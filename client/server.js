import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from './webpack.common';
const proxy = require("express-http-proxy");
//inicializando paquetes
const app = express();

app.set('port',process.env.PORT|| 3000);

app.use(express.static('./'));
//configurar servidor
const clientUrl = process.env.PORT?'https://wizcoach.herokuapp.com/':`http://localhost:${app.get('port')}`;

//middlewares
app.use(webpackDevMiddleware(webpack(webpackConfig)));

//routes
app.use("/*", proxy(clientUrl)); // WEB PORTAL

//start server
app.listen(app.get('port'), () => {
    console.log('Client started in',app.get('port'));
});
