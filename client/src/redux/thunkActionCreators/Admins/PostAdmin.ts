import { getAuthHeaders } from '../sharedHeaders';
import { SERVER } from '../constants';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../../reducers';
import { PostAdmin, PostAdminAction } from '../../actionCreators/admins';
import Axios from 'axios';
import { BaseUser } from '../../../../../server/models/User';

const postAdmin: (admin: BaseUser) => ThunkAction<Promise<void>, AppState, null, PostAdminAction> = (admin) => async (dispatch) => {
    return Axios.post(SERVER + '/api/admins', admin, {
        headers: getAuthHeaders()
    })
    .then(response => {
        dispatch(
            PostAdmin(response.data)
        );
    });
}

export default postAdmin;
