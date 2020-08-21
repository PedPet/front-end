import { Action, Dispatch } from "redux";
import { State, APIErrorAction } from "../types";

export interface RegisterSubmit extends Action {
    type: "REGISTER_SUBMIT";
}

export interface RegisterSubmitSuccess extends Action {
    type: "REGISTER_SUBMIT_SUCCESS";
    success: boolean;
}

export interface RegisterSubmitError extends Action {
    type: "REGISTER_SUBMIT_ERROR";
    error: string;
}

export interface RegisterClear extends Action {
    type: "REGISTER_CLEAR";
}

export type RegisterSubmitActionTypes = RegisterSubmit | RegisterSubmitSuccess | APIErrorAction | RegisterClear;

export type RegisterAction = (state: State, dispatch: Dispatch<RegisterSubmitActionTypes>) => (
    username: string,
    password: string,
    email: string
) => void;

export interface RegisterState {
    submitting: boolean;
    success: boolean;
};
