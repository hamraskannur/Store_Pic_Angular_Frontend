// user-state.module.ts
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userReducer } from './user/user.reducer';
import { UserEffects } from './user/user.effects';

@NgModule({
  imports: [
    StoreModule.forRoot({ user: userReducer  }), 
    EffectsModule.forRoot([UserEffects]),
  ],
})
export class UserStateModule {}
