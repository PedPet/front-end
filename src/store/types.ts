import { RegisterState } from "./register/types";
import { Action } from "redux";
import { UserState } from "./user/types";

export interface State {
    api: APIState;
    register: RegisterState;
    user: UserState;
}

export interface APIState {
    error: string;
}

export interface APIErrorAction extends Action {
    type: "API_ERROR";
    error: string;
}

export type ConfirmResponse = {
    ok: boolean;
};
