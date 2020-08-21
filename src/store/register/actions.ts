import {
    RegisterSubmit,
    RegisterSubmitSuccess,
    RegisterSubmitActionTypes,
    RegisterAction,
    RegisterClear,
} from "./types";
import { Dispatch } from "redux";
import { State, ConfirmResponse } from "../types";
import { registerIsSubmitting } from "./selectors";
import { apiError } from "../actions";

const registerSubmit = (): RegisterSubmit => ({
    type: "REGISTER_SUBMIT",
});

const registerSubmitSuccess = (success: boolean): RegisterSubmitSuccess => ({
    type: "REGISTER_SUBMIT_SUCCESS",
    success,
});

export const registerClear = (): RegisterClear => ({
    type: "REGISTER_CLEAR",
});

export const register: RegisterAction = (
    state: State,
    dispatch: Dispatch<RegisterSubmitActionTypes>,
) => async (username: string, password: string, email: string) => {
    if (registerIsSubmitting(state)) {
        return;
    }

    dispatch(registerSubmit());

    let resp;
    try {
        const apiURL = process.env.REACT_APP_API_URL;
        resp = await fetch(`${apiURL}/user/register`, {
            method: "POST",
            body: JSON.stringify({ username, email, password }),
            mode: "cors",
        });

        const { ok }: ConfirmResponse = await resp.clone().json();

        dispatch(registerSubmitSuccess(ok));
    } catch (err) {
        console.error(err);
        if (resp) {
            const text = await resp.text();
            dispatch(apiError(text));
            return;
        }

        dispatch(apiError());
    }
};
