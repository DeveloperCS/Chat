import { GetAccessToken, GetAccessTokenAction } from '../../actionCreators/authentication';
import { getRefreshAuthHeaders } from '../sharedHeaders';
import { SERVER } from '../constants';
import { AppState } from '../../reducers';
import { ThunkAction } from 'redux-thunk';
import Axios from 'axios';

const getAccessToken: () => ThunkAction<Promise<void>, AppState, null, GetAccessTokenAction> = () => async (dispatch) => {
    Axios.get(SERVER + '/api/auth/token', {
        headers: getRefreshAuthHeaders()
    }).then(response => {
        const date = new Date();
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('tokenDate', date.toString());
        dispatch(GetAccessToken(response.data.token));
    });
}

export default getAccessToken;
