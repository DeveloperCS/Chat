import { getAuthHeaders } from '../sharedHeaders';
import { SERVERAPI, LOCALSERVER } from '../constants';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../reducers';
import { PutClient, PutClientAction } from '../../actionCreators/clients';
import Axios from 'axios';
import { JSONUser } from '../../../models/User';
const SERVER = window.location.href.indexOf('localhost') > 0? LOCALSERVER: SERVERAPI;
const putClient: (client: JSONUser) => ThunkAction<Promise<void>, AppState, null, PutClientAction> = (client) => async (dispatch) => {
    return Axios.put(SERVER + '/api/clients/' + client.id, client, {
        headers: getAuthHeaders()
    })
    .then(response => {
        dispatch(
            PutClient(response.data)
        );
    });
}

export default putClient;
