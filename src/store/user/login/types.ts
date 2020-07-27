import { Action, Dispatch } from "redux";
import { User } from "../types";
import { State } from "../../types";

export interface LoginSubmit extends Action {
    type: "LOGIN_SUBMITTING";
}

export interface LoginSubmitSuccess extends Action {
    type: "LOGIN_SUBMIT_SUCCESS";
    user: User;
}

export type LoginSubmitActionTypes = LoginSubmit | LoginSubmitSuccess;

export type LoginAction = (state: State, dispatch: Dispatch<LoginSubmitActionTypes>) => (
    username: string,
    password: string
) => void;

export interface LoginState {
    submitting: boolean;
    user: User | undefined;
}
