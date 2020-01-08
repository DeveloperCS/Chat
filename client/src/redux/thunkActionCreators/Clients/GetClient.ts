import { getAuthHeaders } from '../sharedHeaders';
import { SERVERAPI, LOCALSERVER } from '../constants';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../reducers';
import { GetClientAction, GetClient } from '../../actionCreators/clients';
import Axios from 'axios';
const SERVER = window.location.href.indexOf('localhost') > 0? LOCALSERVER: SERVERAPI;
const getClient: (id: string) => ThunkAction<Promise<void>, AppState, null, GetClientAction> = (id) => async (dispatch) => {
    return Axios.get(SERVER + '/api/clients/' + id, {
        headers: getAuthHeaders()
    })
    .then(response => {
        dispatch(
            GetClient(response.data)
        );
    });
}

export default getClient;
