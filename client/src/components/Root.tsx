import * as React from 'react';
import App from './App';
import { Provider } from 'react-redux';

interface Props {
    store: any
}

const Root: React.FunctionComponent<Props> = (props) => {
    const {store} = props;
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

export default Root;
