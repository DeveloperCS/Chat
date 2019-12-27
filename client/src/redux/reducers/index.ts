import { combineReducers } from 'redux';
import authentication from './authentication';
import error from './error';
import admins from './admins';
import clients from './clients';
import messages from './messages';

const rootReducer = combineReducers({
    authentication: authentication,
    error: error,
    admins: admins,
    clients: clients,
    messages: messages
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer;
