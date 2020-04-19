import { createAction, props } from '@ngrx/store';
import { User } from '../../types/User';

export enum UserActionTypes {
    SET_USER = '[USER] Set User',
}

export const SetUserAction = createAction(
    UserActionTypes.SET_USER,
    props<{data: User}>(),
);
