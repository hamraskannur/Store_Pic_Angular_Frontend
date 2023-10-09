import { createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = (state: { user: UserState }) => state.user;

export const selectUserData = createSelector(
  selectUserState,
  state => state.user
);

export const selectUserDataAndOptions = createSelector(
  selectUserData,
  user => ({ user }) 
);
