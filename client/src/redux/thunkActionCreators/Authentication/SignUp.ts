import { PostUser, PostUserAction } from '../../actionCreators/authentication';
import { getJSONHeaders } from '../sharedHeaders';
import { SERVER } from '../constants';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../reducers';
import Axios from 'axios';

const signUp: (email: string, password: string, name: string, lastname: string, key: string) => ThunkAction<Promise<void>, AppState, null, PostUserAction> = (email, password, name, lastname, key) => async (dispatch) => {
    const body = {
        email: email,
        password: password,
        name: name,
        lastname: lastname,
        key: key
    }
    return Axios.post(SERVER + '/api/auth/signup', body, {
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

export default signUp;
