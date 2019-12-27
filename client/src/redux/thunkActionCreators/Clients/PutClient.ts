import { getAuthHeaders } from '../sharedHeaders';
import { SERVER } from '../constants';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../reducers';
import { PutClient, PutClientAction } from '../../actionCreators/clients';
import Axios from 'axios';
import { JSONUser } from '../../../../../server/models/User';

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
