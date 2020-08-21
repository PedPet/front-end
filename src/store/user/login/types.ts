import { Action, Dispatch } from "redux";
import { User } from "../types";
import { State, APIErrorAction } from "../../types";
import { ConfirmUserSubmitSuccess } from "../confirm/types";

export interface LoginSubmit extends Action {
    type: "LOGIN_SUBMITTING";
}

export interface LoginSubmitSuccess extends Action {
    type: "LOGIN_SUBMIT_SUCCESS";
    user: User;
}

export interface LoginSubmitSuccessConfirm extends Action {
    type: "LOGIN_SUBMIT_SUCCESS_CONFIRM";
}

export interface CancelConfirm extends Action {
    type: "CANCEL_CONFIRM";
}

export type LoginSubmitActionTypes =
    | LoginSubmit
    | LoginSubmitSuccess
    | LoginSubmitSuccessConfirm
    | CancelConfirm
    | ConfirmUserSubmitSuccess
    | APIErrorAction;

export type LoginAction = (
    state: State,
    dispatch: Dispatch<LoginSubmitActionTypes>
) => (username: string, password: string) => void;

export interface LoginState {
    submitting: boolean;
    user: User | undefined;
    needToConfirm: boolean;
}

export interface LoginResponse {
    jwt: string;
}
