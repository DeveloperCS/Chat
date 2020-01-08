import { getAuthHeaders } from '../sharedHeaders';
import { SERVERAPI, LOCALSERVER } from '../constants';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../reducers';
import { PostMessageAction, PostMessage } from '../../actionCreators/messages';
import Axios from 'axios';
import { BaseMessage } from '../../../models/Message';
const SERVER = window.location.href.indexOf('localhost') > 0? LOCALSERVER: SERVERAPI;
const postMessage: (sessionId: string, message: BaseMessage) => ThunkAction<Promise<void>, AppState, null, PostMessageAction> = (sessionId, message) => async (dispatch) => {
    dispatch(PostMessage(message));
    return Axios.post(SERVER + '/api/messages/' + sessionId, {
        message: message.text
    }, {
        headers: getAuthHeaders()
    })
    .then(response => {
        dispatch(
            PostMessage(response.data.message, response.data.user)
        );
    });
}

export default postMessage;
