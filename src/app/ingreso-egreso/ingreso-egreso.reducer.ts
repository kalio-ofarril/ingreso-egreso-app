import { Action, createReducer, on } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { setItems, unSetItems } from './ingreso-egreso.actions';

export interface itemState {
  items: IngresoEgreso[];
}

export const initialState: itemState = {items: []};

const _IngresoEgresoReducer = createReducer(
  initialState,
  on(setItems, (state, { items }) => ({ ...state, items: items })),
  on(unSetItems, (state) => ({ ...state, items: [] }))
);

export function ingresoEgresoReducer(
  state: itemState | undefined,
  action: Action
) {
  return _IngresoEgresoReducer(state, action);
}
