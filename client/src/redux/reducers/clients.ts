import { Map } from 'immutable';
import { PostClientAction, GetClientAction, PutClientAction, DeleteClientAction, GetAllClientsAction } from '../actionCreators/clients';
import { POST_CLIENT, GET_CLIENT, PUT_CLIENT, DELETE_CLIENT, GET_ALL_CLIENTS } from '../actions';
import { User } from './authentication';

const initialState = Map<string, User>();

export default (state = initialState, action: GetAllClientsAction | PostClientAction | GetClientAction | PutClientAction | DeleteClientAction) => {
    switch (action.type) {
        case GET_CLIENT:
        case PUT_CLIENT:
        case POST_CLIENT:
            const client = new User(action.payload.client);
            return initialState.set(action.payload.client.id, client);
        case DELETE_CLIENT:
            return initialState.delete(action.payload.id);
        case GET_ALL_CLIENTS:
            return state.withMutations((state) => {
                action.payload.clients.forEach(client => {
                    const clientRecord = new User(client);
                    state.set(client.id, clientRecord);
                });
                return state;
            });
    }
    return state;
}
