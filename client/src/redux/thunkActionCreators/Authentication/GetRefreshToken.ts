import { GetRefreshToken, GetRefreshTokenAction } from '../../actionCreators/authentication';
import { getRefreshAuthHeaders } from '../sharedHeaders';
import { SERVERAPI, LOCALSERVER } from '../constants';
import { AppState } from '../../reducers';
import { ThunkAction } from 'redux-thunk';
import Axios from 'axios';
const SERVER = window.location.href.indexOf('localhost') > 0? LOCALSERVER: SERVERAPI;

const getRefreshToken: () => ThunkAction<Promise<void>, AppState, null, GetRefreshTokenAction> = () => async (dispatch) => {
    Axios.get(SERVER + '/api/auth/refreshtoken', {
        headers: getRefreshAuthHeaders()
    }).then(response => {
        const date = new Date();
        localStorage.setItem('refreshToken', response.data.refreshToken);
        localStorage.setItem('refreshTokenDate', date.toString());
        dispatch(GetRefreshToken(response.data.token));
    });
}

export default getRefreshToken;
