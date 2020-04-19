import { Repository } from '../../types/Repository';
import { ReposActionTypes } from '../actions/repos.actions';

export const initialState = null;

export interface SelectAction {
    type: string;
    data: Repository;
}

export function reducer(state = initialState, action: SelectAction): Repository {
    switch (action.type) {
        case ReposActionTypes.SELECT_REPO:
            return state = action.data;
        case ReposActionTypes.CLEAR_REPO:
            return state = null;
        default:
            return state;
    }
}
