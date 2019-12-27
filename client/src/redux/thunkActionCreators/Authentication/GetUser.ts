import { getAuthHeaders } from '../sharedHeaders';
import { SERVER } from '../constants';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../reducers';
import { GetUserAction, GetUser } from '../../actionCreators/authentication';
import Axios from 'axios';

const getUser: (token: string, refreshToken: string) => ThunkAction<Promise<void>, AppState, null, GetUserAction> = (token, refreshToken) => async (dispatch) => {
    return Axios.get(SERVER + '/api/auth/', {
        headers: getAuthHeaders()
    })
    .then(response => {
        dispatch(
            GetUser(
                response.data,
                token,
                refreshToken
            )
        );
    });
}

export default getUser;
