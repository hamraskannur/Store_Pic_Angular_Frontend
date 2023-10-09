// user.actions.ts
import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/core/models/interceptors';

export const loadUserData = createAction('[User] Load User Data');
export const loadUserDataSuccess = createAction('[User] Load User Data Success', props<{ user: User }>());
export const updateOptions = createAction('[User] Update Options', props<{ user: User}>());
export const removeUserData = createAction('[User] Remove User Data');
export const addPostSuccess = createAction('[User] Add Post Success');


