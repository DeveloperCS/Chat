import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from './webpack.common';
//inicializando paquetes
const app = express();

//configurar servidor
app.set('port',process.env.PORT|| 3000);

//middlewares
app.use(webpackDevMiddleware(webpack(webpackConfig)));

//routes
app.get('/',(req, res)=>{
    res.send('Hola')
})


//start server
app.listen(app.get('port'), () => {
    console.log('Client started in',app.get('port'));
});
