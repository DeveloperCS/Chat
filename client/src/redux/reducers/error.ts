import { CreateErrorAction, CleanErrorAction } from "../actionCreators/error";
import { CREATE_ERROR, CLEAN_ERROR } from "../actions";
import { Record } from "immutable";

interface ErrorState {
    message: string
}

const ErrorRecord = Record<ErrorState>({
    message: null
});

class Error extends ErrorRecord {}

const initialState = new Error();

export default (state = initialState, action: CreateErrorAction | CleanErrorAction) => {
    switch (action.type) {
        case CREATE_ERROR:
            return state.set('message', action.payload.error.message);
        case CLEAN_ERROR:
            return state.set('message', null);
    }
    return state;
}