import { getAuthHeaders } from '../sharedHeaders';
import { SERVERAPI, LOCALSERVER } from '../constants';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../reducers';
import { GetAllAdmins, GetAllAdminsAction } from '../../actionCreators/admins';
import Axios from 'axios';
const SERVER = window.location.href.indexOf('localhost') > 0? LOCALSERVER: SERVERAPI;
const getAllAdmins: () => ThunkAction<Promise<void>, AppState, null, GetAllAdminsAction> = () => async (dispatch) => {
    return Axios.get(SERVER + '/api/admins', {
        headers: getAuthHeaders()
    })
    .then(response => {
        dispatch(
            GetAllAdmins(response.data)
        );
    });
}

export default getAllAdmins;
