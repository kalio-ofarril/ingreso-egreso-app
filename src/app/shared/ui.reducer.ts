import { Action, createAction, createReducer, on, props } from '@ngrx/store';
import { isLoading, stopLoading } from './ui.actions';

export interface uiState {
  isLoading: boolean;
}
export const initialState: uiState = { isLoading: false };

// export const setLoading = createAction(
//   '[UI] Set Loading',
//   props<{ isLoading: boolean }>()
// );

const reducer = createReducer(
  initialState,
  on(isLoading, (state) => ({ ...state, isLoading: true })),
  on(stopLoading, (state) => ({...state, isLoading: false}))
);

export function uiReducer(state: uiState | undefined, action: Action) {
  return reducer(state, action);
}
