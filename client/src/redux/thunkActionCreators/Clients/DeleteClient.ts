import { getAuthHeaders } from '../sharedHeaders';
import { SERVERAPI, LOCALSERVER } from '../constants';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../reducers';
import { DeleteClientAction, DeleteClient } from '../../actionCreators/clients';
import Axios from 'axios';

const SERVER = window.location.href.indexOf('localhost') > 0? LOCALSERVER: SERVERAPI;

const deleteClient: (id: string) => ThunkAction<Promise<void>, AppState, null, DeleteClientAction> = (id) => async (dispatch) => {
    return Axios.delete(SERVER + '/api/clients/' + id, {
        headers: getAuthHeaders()
    })
    .then(response => {
        dispatch(
            DeleteClient(response.data)
        );
    });
}

export default deleteClient;
