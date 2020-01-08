import { getAuthHeaders } from '../sharedHeaders';
import { SERVERAPI, LOCALSERVER } from '../constants';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../reducers';
import { PutAdmin, PutAdminAction } from '../../actionCreators/admins';
import Axios from 'axios';
import { JSONUser } from '../../../models/User';//server
const SERVER = window.location.href.indexOf('localhost') > 0? LOCALSERVER: SERVERAPI;

const putAdmin: (admin: JSONUser) => ThunkAction<Promise<void>, AppState, null, PutAdminAction> = (admin) => async (dispatch) => {
    return Axios.put(SERVER + '/api/admins/' + admin.id, admin, {
        headers: getAuthHeaders()
    })
    .then(response => {
        dispatch(
            PutAdmin(response.data)
        );
    });
}

export default putAdmin;
