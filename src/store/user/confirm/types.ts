import { Action, Dispatch } from "redux";
import { State, APIErrorAction } from "../../types";

export interface ConfirmUserSubmit extends Action {
    type: "CONFIRM_USER_SUBMITTING";
}

export interface ConfirmUserSubmitSuccess extends Action {
    type: "CONFIRM_USER_SUBMIT_SUCCESS";
    success: boolean;
}

export type ConfirmUserActions =
    | ConfirmUserSubmit
    | ConfirmUserSubmitSuccess
    | APIErrorAction;

export type ConfirmUserAction = (
    state: State,
    dispatch: Dispatch<ConfirmUserActions>,
) => (username: string, code: string) => void;

export interface ConfirmUserState {
    submitting: boolean;
    success: boolean;
}
