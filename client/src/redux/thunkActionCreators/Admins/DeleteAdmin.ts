import { getAuthHeaders } from '../sharedHeaders';
import { SERVERAPI, LOCALSERVER } from '../constants';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../reducers';
import { DeleteAdminAction, DeleteAdmin } from '../../actionCreators/admins';
import Axios from 'axios';

const SERVER = window.location.href.indexOf('localhost') > 0? LOCALSERVER: SERVERAPI;

const deleteAdmin: (id: string) => ThunkAction<Promise<void>, AppState, null, DeleteAdminAction> = (id) => async (dispatch) => {
    return Axios.delete(SERVER + '/api/admins/' + id, {
        headers: getAuthHeaders()
    })
    .then(response => {
        dispatch(
            DeleteAdmin(response.data)
        );
    });
}

export default deleteAdmin;
