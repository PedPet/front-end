import {
    LoginSubmit,
    LoginSubmitSuccess,
    LoginAction,
    LoginSubmitActionTypes,
    LoginResponse,
    LoginSubmitSuccessConfirm,
    CancelConfirm,
} from "./types";
import { User } from "../types";
import { State } from "../../types";
import { Dispatch } from "redux";
import { checkLoginSubmitting } from "./selector";
import { apiError } from "../../actions";

const loginSubmitting = (): LoginSubmit => ({
    type: "LOGIN_SUBMITTING",
});

const loginSubmitSuccess = (user: User): LoginSubmitSuccess => ({
    type: "LOGIN_SUBMIT_SUCCESS",
    user,
});

const loginSubmitSuccessConfirm = (): LoginSubmitSuccessConfirm => ({
    type: "LOGIN_SUBMIT_SUCCESS_CONFIRM",
});

export const cancelConfirm = (): CancelConfirm => ({
    type: "CANCEL_CONFIRM",
});

export const loginAction: LoginAction = (
    state: State,
    dispatch: Dispatch<LoginSubmitActionTypes>,
) => async (username: string, password: string) => {
    if (checkLoginSubmitting(state)) {
        return;
    }

    dispatch(loginSubmitting());

    let resp;
    try {
        const apiURL = process.env.REACT_APP_API_URL;
        resp = await fetch(`${apiURL}/user/login`, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({ username, password }),
        });

        const { jwt }: LoginResponse = await resp.clone().json();

        dispatch(
            loginSubmitSuccess({
                username,
                jwt,
            }),
        );
    } catch (err) {
        console.error(err);

        if (resp) {
            const text = await resp.text();

            if (text === "User is not confirmed\n") {
                dispatch(loginSubmitSuccessConfirm());
                return;
            }
            dispatch(apiError(text));
            return;
        }

        dispatch(apiError());
    }
};
