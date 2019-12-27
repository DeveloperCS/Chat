import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import SignIn from './Authentication/SignIn';
import SignUp from './Authentication/SignUp';
import Home from './Home';
import ErrorToast from './ErrorToast';
import Homme from './Home';
    

const App: React.FunctionComponent<{}> = () => {
    return (
        <div id='App' className='root'>
            <ErrorToast />
            <Router>
                <Route path='/signin' component={SignIn} />
                <Route path='/signup' component={SignUp} />
                <Route path='/' component={Home} />
            </Router>
        </div>
    )
}

export default App;
