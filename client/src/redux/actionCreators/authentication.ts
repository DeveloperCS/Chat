import { JSONUser } from '../../../../server/models/User';
import { ActionCreator } from "redux";
import { GET_USER, GET_ACCESS_TOKEN, GET_REFRESH_TOKEN, DELETE_TOKENS, POST_USER } from "../actions";

export interface GetUserAction {
    type: typeof GET_USER,
    payload: {
        user: JSONUser,
        token: String,
        refreshToken: String
    }
}

export const GetUser: ActionCreator<GetUserAction> = (user: JSONUser, token: String, refreshToken: String) => {
    return {
        type: GET_USER,
        payload: {
            user: user,
            token: token,
            refreshToken: refreshToken
        }
    }
}

export interface PostUserAction {
    type: typeof POST_USER,
    payload: {
        user: JSONUser,
        token: String,
        refreshToken: String
    }
}

export const PostUser: ActionCreator<PostUserAction> = (user: JSONUser, token: String, refreshToken: String) => {
    return {
        type: POST_USER,
        payload: {
            user: user,
            token: token,
            refreshToken: refreshToken
        }
    }
}

export interface GetAccessTokenAction {
    type: typeof GET_ACCESS_TOKEN,
    payload: {
        token: String
    }
}

export const GetAccessToken: ActionCreator<GetAccessTokenAction> = (token: String) => {
    return {
        type: GET_ACCESS_TOKEN,
        payload: {
            token: token
        }
    }
}

export interface GetRefreshTokenAction {
    type: typeof GET_REFRESH_TOKEN,
    payload: {
        refreshToken: String
    }
}

export const GetRefreshToken: ActionCreator<GetRefreshTokenAction> = (refreshToken: String) => {
    return {
        type: GET_REFRESH_TOKEN,
        payload: {
            refreshToken: refreshToken
        }
    }
}

export interface DeleteTokensAction {
    type: typeof DELETE_TOKENS,
    payload: {
        user: null,
        token: null,
        refreshToken: null
    }
}

export const DeleteTokens: ActionCreator<DeleteTokensAction> = () => {
    return {
        type: DELETE_TOKENS,
        payload: {
            user: null,
            token: null,
            refreshToken: null
        }
    }
}
