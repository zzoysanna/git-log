import { ReposActionTypes } from '../actions/repos.actions';
import { Repository } from '../../types/Repository';

export const initialState = null;

export interface ReposAction {
    type: string;
    data?: any;
    id?: number;
    contributors?: string[];
}

export function reducer(state = initialState, action: ReposAction): Repository[] {
    switch (action.type) {

        case ReposActionTypes.SET_REPOS:
            return state = action.data;

        case ReposActionTypes.UPDATE_REPO:
            const {id, contributors} = action;
            const index = state.findIndex(item => item.id === id);
            const newState = state.slice();
            newState[index] = {...newState[index], ...{contributors}};
            return newState;

        default:
            return state;
    }
}
