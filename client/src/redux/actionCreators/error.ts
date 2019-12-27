import { ActionCreator } from 'redux';
import { CREATE_ERROR, CLEAN_ERROR } from '../actions';

export interface CreateErrorAction {
    type: typeof CREATE_ERROR,
    payload: {
        error: Error
    }
}

export const CreateError: ActionCreator<CreateErrorAction> = (error: Error) => {
    return {
        type: CREATE_ERROR,
        payload: {
            error: error
        }
    }
}

export interface CleanErrorAction {
    type: typeof CLEAN_ERROR,
    payload: {
        error: Error
    }
}

export const CleanError: ActionCreator<CleanErrorAction> = () => {
    return {
        type: CLEAN_ERROR,
        payload: {
            error: null
        }
    }
}
