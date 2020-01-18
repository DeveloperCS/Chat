import { Record, List } from 'immutable';
import { POST_MESSAGE } from '../actions';
import { PostMessageAction } from '../actionCreators/messages';
import { BaseMessage } from '../../models/Message'; //server

const MessageRecord = Record<BaseMessage>({
    userId: undefined,
    sender: undefined,
    text: undefined,
    date: undefined,
    fields:{
        inputOption: { stringValue: "" },
        valuesOptions: { stringValue: "" },
        continueBot:{ stringValue: "" }
    },
    action:''
});

export class Message extends MessageRecord {}

const initialState:any[] = [];

export default (state:any = initialState, action: PostMessageAction) => {
    switch (action.type) {
        case POST_MESSAGE:
            const message = new Message(action.payload.message);
            return [
                ...state,
                message
            ];
    }
    return state;
}
