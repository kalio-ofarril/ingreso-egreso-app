import { ActionReducerMap } from '@ngrx/store';
import { uiReducer, uiState } from './shared/ui.reducer';
import { authReducer, userState } from './auth/auth.reducer';
import { ingresoEgresoReducer, itemState } from './ingreso-egreso/ingreso-egreso.reducer';

export interface AppState {
  ui: uiState;
  user: userState;
  items: itemState;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: uiReducer,
  user: authReducer,
  items: ingresoEgresoReducer
};
