import { Action, Dispatch } from "redux";
import { APIErrorAction, State } from "../../types";

export interface CheckUsernameFetch extends Action {
    type: "CHECK_USERNAME_FETCH";
};

export interface CheckUsernameFetchSuccess extends Action {
    type: "CHECK_USERNAME_FETCH_SUCCESS";
    taken: boolean;
};

export type CheckUsernameSubmitActionTypes = CheckUsernameFetch | CheckUsernameFetchSuccess | APIErrorAction;

export type CheckUsernameAction = (state: State, dispatch: Dispatch<CheckUsernameSubmitActionTypes>) => (
    username: string
) => void;

export interface CheckUsernameState {
    fetching: boolean;
    taken: boolean | undefined;
};
