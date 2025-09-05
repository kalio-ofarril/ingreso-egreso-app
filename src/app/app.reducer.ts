import { ActionReducerMap } from '@ngrx/store';
import { uiReducer, uiState } from './shared/ui.reducer';
import { authReducer, userState } from './auth/auth.reducer';

export interface AppState {
  ui: uiState;
  user: userState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
  user: authReducer,
};
