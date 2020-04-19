import { createAction, props } from '@ngrx/store';
import { Repository } from '../../types/Repository';

export enum ReposActionTypes {
    SET_REPOS = '[REPOS] Set Repos',
    UPDATE_REPO = '[REPOS] Update Repo',
    SELECT_REPO = '[REPOS] Select Repo',
    CLEAR_REPO = '[REPOS] Clear Repo',
}

export const SetReposAction = createAction(
    ReposActionTypes.SET_REPOS,
    props<{
        data: Repository[]
    }>(),
);

export const UpdateRepoAction = createAction(
    ReposActionTypes.UPDATE_REPO,
    props<{
        id: number,
        contributors: string[],
    }>(),
);

export const SelectRepoAction = createAction(
    ReposActionTypes.SELECT_REPO,
    props<{
        data: Repository,
    }>(),
);

export const ClearRepoAction = createAction(
    ReposActionTypes.CLEAR_REPO,
    props<{}>(),
);
