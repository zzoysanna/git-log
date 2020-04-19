import { Action } from '@ngrx/store';
import { AuthActionTypes } from '../actions/auth.actions';

export const initialState = false;

export function reducer(state = initialState, action: Action): boolean {
    switch (action.type) {
        case AuthActionTypes.LOG_ON:
            return state = true;
        case AuthActionTypes.LOG_OFF:
            return state = false;
        default:
            return state;
    }
}
