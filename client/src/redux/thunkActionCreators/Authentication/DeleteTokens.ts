import { AppState } from '../../reducers';
import { ThunkAction } from 'redux-thunk';
import { DeleteTokens, DeleteTokensAction } from '../../actionCreators/authentication';

const deleteTokens: () => ThunkAction<void, AppState, null, DeleteTokensAction> = () => (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    dispatch(DeleteTokens());
}

export default deleteTokens;
