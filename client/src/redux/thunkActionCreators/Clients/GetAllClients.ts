import { getAuthHeaders } from '../sharedHeaders';
import { SERVERAPI, LOCALSERVER } from '../constants';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../reducers';
import { GetAllClients, GetAllClientsAction } from '../../actionCreators/clients';
import Axios from 'axios';
const SERVER = window.location.href.indexOf('localhost') > 0? LOCALSERVER: SERVERAPI;
const getAllClients: () => ThunkAction<Promise<void>, AppState, null, GetAllClientsAction> = () => async (dispatch) => {
    return Axios.get(SERVER + '/api/clients', {
        headers: getAuthHeaders()
    })
    .then(response => {
        dispatch(
            GetAllClients(response.data)
        );
    });
}

export default getAllClients;
