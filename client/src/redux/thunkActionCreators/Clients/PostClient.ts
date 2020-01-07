import { getAuthHeaders } from '../sharedHeaders';
import { SERVER } from '../constants';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../reducers';
import { PostClientAction, PostClient } from '../../actionCreators/clients';
import Axios from 'axios';
import { BaseUser } from '../../../models/User';//server

const postClient: (client: BaseUser) => ThunkAction<Promise<void>, AppState, null, PostClientAction> = (client) => async (dispatch) => {
    return Axios.post(SERVER + '/api/clients', client, {
        headers: getAuthHeaders()
    })
    .then(response => {
        dispatch(
            PostClient(response.data)
        );
    });
}

export default postClient;
