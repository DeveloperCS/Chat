import { JSONUser } from "../../../../server/models/User";
import { ActionCreator } from "redux";
import { POST_ADMIN, GET_ALL_ADMINS, GET_ADMIN, PUT_ADMIN, DELETE_ADMIN } from "../actions";

export interface PostAdminAction {
    type: typeof POST_ADMIN,
    payload: {
        admin: JSONUser
    }
}

export const PostAdmin: ActionCreator<PostAdminAction> = (admin: JSONUser) => {
    return {
        type: POST_ADMIN,
        payload: {
            admin: admin
        }
    }
}

export interface GetAllAdminsAction {
    type: typeof GET_ALL_ADMINS,
    payload: {
        admins: Array<JSONUser>
    }
}

export const GetAllAdmins: ActionCreator<GetAllAdminsAction> = (admins: Array<JSONUser>) => {
    return {
        type: GET_ALL_ADMINS,
        payload: {
            admins: admins
        }
    }
}

export interface GetAdminAction {
    type: typeof GET_ADMIN,
    payload: {
        admin: JSONUser
    }
}

export const GetAdmin: ActionCreator<GetAdminAction> = (admin: JSONUser) => {
    return {
        type: GET_ADMIN,
        payload: {
            admin: admin
        }
    }
}

export interface PutAdminAction {
    type: typeof PUT_ADMIN,
    payload: {
        admin: JSONUser
    }
}

export const PutAdmin: ActionCreator<PutAdminAction> = (admin: JSONUser) => {
    return {
        type: PUT_ADMIN,
        payload: {
            admin: admin
        }
    }
}

export interface DeleteAdminAction {
    type: typeof DELETE_ADMIN,
    payload: {
        id: string
    }
}

export const DeleteAdmin: ActionCreator<DeleteAdminAction> = (id: string) => {
    return {
        type: DELETE_ADMIN,
        payload: {
            id: id
        }
    }
}
