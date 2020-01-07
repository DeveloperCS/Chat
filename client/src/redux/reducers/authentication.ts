import { JSONUser } from '../../models/User';//server
import { Record } from 'immutable';
import { GetUserAction, GetAccessTokenAction, GetRefreshTokenAction, DeleteTokensAction, PostUserAction } from '../actionCreators/authentication';
import { DELETE_TOKENS, GET_USER, POST_USER, GET_ACCESS_TOKEN, GET_REFRESH_TOKEN, POST_MESSAGE } from '../actions';
import { PostMessageAction } from '../actionCreators/messages';

const UserRecord = Record<JSONUser>({
    id: undefined,
    name: undefined,
    lastname: undefined,
    apodo: undefined,
    sexo: undefined,
    empresa: undefined,
    edad: undefined,
    email: undefined,
    type: undefined,
    introductionDone: undefined,
    tutorialDone: undefined,
    conflicto: undefined,
    persona: undefined
});

export class User extends UserRecord {}

interface AuthenticationState {
    user: User,
    token: String,
    refreshToken: String
}

const AuthenticationRecord = Record<AuthenticationState>({
    user: null,
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refreshToken')
});

const initialState = new AuthenticationRecord();

export default (state = initialState, action: PostMessageAction | PostUserAction | GetUserAction | GetAccessTokenAction | GetRefreshTokenAction | DeleteTokensAction) => {
    switch (action.type) {
        case DELETE_TOKENS:
        case POST_USER:
        case GET_USER:
            const user = new User(action.payload.user);
            return state.withMutations((oldState) => {
                oldState.set('token', action.payload.token);
                oldState.set('refreshToken', action.payload.refreshToken);
                oldState.set('user', user);
            });
        case GET_ACCESS_TOKEN:
            return state.set('token', action.payload.token);
        case GET_REFRESH_TOKEN:
            return state.set('refreshToken', action.payload.refreshToken);
        case POST_MESSAGE:
            const updatedUser = state.user.merge(action.payload.updatedUser);
            return state.set('user', updatedUser);
    }
    return state;
}
