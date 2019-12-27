import { Map } from 'immutable';
import { PostAdminAction, GetAdminAction, PutAdminAction, DeleteAdminAction, GetAllAdminsAction } from '../actionCreators/admins';
import { POST_ADMIN, GET_ADMIN, PUT_ADMIN, DELETE_ADMIN, GET_ALL_ADMINS } from '../actions';
import { User } from './authentication';

const initialState = Map<string, User>();

export default (state = initialState, action: GetAllAdminsAction | PostAdminAction | GetAdminAction | PutAdminAction | DeleteAdminAction) => {
    switch (action.type) {
        case GET_ADMIN:
        case PUT_ADMIN:
        case POST_ADMIN:
            const admin = new User(action.payload.admin);
            return initialState.set(action.payload.admin.id, admin);
        case GET_ALL_ADMINS:
            return state.withMutations((state) => {
                action.payload.admins.forEach(admin => {
                    const recordAdmin = new User(admin);
                    state.set(admin.id, recordAdmin);
                });
                return state;
            });
        case DELETE_ADMIN:
            return initialState.delete(action.payload.id);
    }
    return state;
}
