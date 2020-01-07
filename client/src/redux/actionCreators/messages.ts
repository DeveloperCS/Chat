import { POST_MESSAGE } from "../actions"
import { ActionCreator } from "redux";
import { BaseMessage } from '../../models/Message';//server
import { JSONUser } from "../../models/User";//server


export interface PostMessageAction {
    type: typeof POST_MESSAGE,
    payload: {
        message: BaseMessage,
        updatedUser: JSONUser
    }
}

export const PostMessage: ActionCreator<PostMessageAction> = (message: BaseMessage, user: JSONUser) => {
    return {
        type: POST_MESSAGE,
        payload: {
            message: message,
            updatedUser: user
        }
    }
}