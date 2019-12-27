import { getAuthHeaders } from '../sharedHeaders';
import { SERVER } from '../constants';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../reducers';
import { GetAdmin, GetAdminAction } from '../../actionCreators/admins';
import Axios from 'axios';

const getAdmin: (id: string) => ThunkAction<Promise<void>, AppState, null, GetAdminAction> = (id) => async (dispatch) => {
    return Axios.get(SERVER + '/api/admins/' + id, {
        headers: getAuthHeaders()
    })
    .then(response => {
        dispatch(
            GetAdmin(response.data)
        );
    });
}

export default getAdmin;
