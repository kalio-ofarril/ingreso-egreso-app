import { Action, createReducer, on } from "@ngrx/store";
import { setUser, unSetUser } from "./auth.actions";
import { Usuario } from "../models/usuario.model";

export interface userState {
    user: Usuario | null;
}

export const initialState: userState = {
    user: null
}

const _authReducer = createReducer(
    initialState,
    on(setUser, (state, {user}) => ({...state, user: {...user}})),
    on(unSetUser, (state) => ({...state, user: null}))
)

export function authReducer(state: userState | undefined, action: Action<string>){
    return _authReducer(state, action);
}