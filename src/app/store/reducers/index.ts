import { ActionReducerMap } from '@ngrx/store';
import { reducer as AuthReducer } from './auth.reducer';
import { reducer as UserReducer } from './user.reducer';
import { reducer as ReposReducer } from './repos.reducer';
import { reducer as SelectReducer } from './select.reducer';
import { User } from '../../types/User';
import { Repository } from '../../types/Repository';

export interface GlState {
    auth: boolean;
    user: User;
    repos: Repository[];
    selectedRepo: Repository;
}

export const reducers: ActionReducerMap<GlState> = {
    auth: AuthReducer,
    user: UserReducer,
    repos: ReposReducer,
    selectedRepo: SelectReducer,
};
