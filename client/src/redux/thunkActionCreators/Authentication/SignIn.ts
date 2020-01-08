import { getJSONHeaders } from '../sharedHeaders';
import { SERVERAPI, LOCALSERVER } from '../constants';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../reducers';
import { PostUserAction, PostUser } from '../../actionCreators/authentication';
import Axios from 'axios';
const SERVER = window.location.href.indexOf('localhost') > 0? LOCALSERVER: SERVERAPI;

const signIn: (email: string, password: string) => ThunkAction<Promise<void>, AppState, null, PostUserAction> = (email, password) => async (dispatch) => {
    const body = {
        email: email,
        password: password
    }
    return Axios.post(SERVER + '/api/auth/signin', body, {
        headers: getJSONHeaders()
    }).then(response => {
        const date = new Date();
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('refreshTokenDate', date.toString());
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('tokenDate', date.toString());
        dispatch(
            PostUser(
                response.data.user,
                response.data.token,
                response.data.refreshToken
            )
        )
    });
}

export default signIn;
