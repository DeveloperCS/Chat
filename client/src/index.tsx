import * as React from 'react';
import { render } from 'react-dom';
import Root from './components/Root';
import store from './redux/store'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

render(
    <Root store={store}/>, document.getElementById('root')
);
