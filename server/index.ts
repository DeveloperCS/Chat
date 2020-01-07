import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import authRouter from './routers/AuthRouter';
import helmet from 'helmet';
import cors from 'cors';
import clientsRouter from './routers/ClientsRouter';
import adminsRouter from './routers/AdminsRouter';
import messagesRouter from './routers/MessagesRouter';

//client server
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../client/webpack.common';


mongoose.connect('mongodb://admin:Hola1234@ds061464.mlab.com:61464/wizcoach', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(helmet());

app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/clients', clientsRouter);
app.use('/api/admins', adminsRouter);
app.use('/api/messages', messagesRouter);


//client server 
app.use(webpackDevMiddleware(webpack(webpackConfig)));

app.use(express.static('../client'));


app.set('port',process.env.PORT|| 3001);


/*const production  = 'wizcoach.herokuapp.com';
const development = 'localhost';
const url = (process.env.PORT!=undefined ? production : development);*/

app.listen(app.get('port'), () => {
    console.log(`Server started in ${app.get('port')} PORT`);
});
