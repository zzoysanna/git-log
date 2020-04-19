import { createAction } from '@ngrx/store';

export enum AuthActionTypes {
    LOG_ON = '[Auth] Log on',
    LOG_OFF = '[Auth] Log off',
}

export const AuthLogOnAction = createAction(AuthActionTypes.LOG_ON);
export const AuthLogOffAction = createAction(AuthActionTypes.LOG_OFF);
