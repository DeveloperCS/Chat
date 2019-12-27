import { JSONUser } from '../../../../server/models/User';
import { ActionCreator } from "redux";
import { POST_CLIENT, GET_ALL_CLIENTS, GET_CLIENT, PUT_CLIENT, DELETE_CLIENT } from "../actions";

export interface PostClientAction {
    type: typeof POST_CLIENT,
    payload: {
        client: JSONUser
    }
}

export const PostClient: ActionCreator<PostClientAction> = (client: JSONUser) => {
    return {
        type: POST_CLIENT,
        payload: {
            client: client
        }
    }
}

export interface GetAllClientsAction {
    type: typeof GET_ALL_CLIENTS,
    payload: {
        clients: Array<JSONUser>
    }
}

export const GetAllClients: ActionCreator<GetAllClientsAction> = (clients: Array<JSONUser>) => {
    return {
        type: GET_ALL_CLIENTS,
        payload: {
            clients: clients
        }
    }
}

export interface GetClientAction {
    type: typeof GET_CLIENT,
    payload: {
        client: JSONUser
    }
}

export const GetClient: ActionCreator<GetClientAction> = (client: JSONUser) => {
    return {
        type: GET_CLIENT,
        payload: {
            client: client
        }
    }
}

export interface PutClientAction {
    type: typeof PUT_CLIENT,
    payload: {
        client: JSONUser
    }
}

export const PutClient: ActionCreator<PutClientAction> = (client: JSONUser) => {
    return {
        type: PUT_CLIENT,
        payload: {
            client: client
        }
    }
}

export interface DeleteClientAction {
    type: typeof DELETE_CLIENT,
    payload: {
        id: string
    }
}

export const DeleteClient: ActionCreator<DeleteClientAction> = (id: string) => {
    return {
        type: DELETE_CLIENT,
        payload: {
            id: id
        }
    }
}
