import { Record, List } from 'immutable';
import { POST_MESSAGE } from '../actions';
import { PostMessageAction } from '../actionCreators/messages';
import { BaseMessage } from '../../../../server/models/Message';

const MessageRecord = Record<BaseMessage>({
    userId: undefined,
    sender: undefined,
    text: undefined,
    date: undefined
});

export class Message extends MessageRecord {}

const initialState = List<Message>()

export default (state = initialState, action: PostMessageAction) => {
    switch (action.type) {
        case POST_MESSAGE:
            const message = new Message(action.payload.message);
            return state.push(message);
    }
    return state;
}
