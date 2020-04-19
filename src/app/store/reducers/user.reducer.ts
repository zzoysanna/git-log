import { UserActionTypes } from '../actions/user.actions';
import { User } from '../../types/User';

export const initialState = null;

export interface UserAction {
    type: string;
    data: any;
}

export function reducer(state = initialState, action: UserAction): User {
    switch (action.type) {
        case UserActionTypes.SET_USER:
            return state = action.data;
        default:
            return state;
    }
}
