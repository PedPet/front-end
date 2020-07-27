import { LoginSubmit, LoginSubmitSuccess, LoginAction, LoginSubmitActionTypes } from "./types";
import { User } from "../types";
import { State } from "../../types";
import { Dispatch } from "redux";
import { checkLoginSubmitting } from "./selector";

const loginSubmitting = (): LoginSubmit => ({
    type: "LOGIN_SUBMITTING"
});

const loginSubmitSuccess = (user: User): LoginSubmitSuccess => ({
    type: "LOGIN_SUBMIT_SUCCESS",
    user
});

export const loginAction: LoginAction = (
    state: State,
    dispatch: Dispatch<LoginSubmitActionTypes>
) => async (username: string, password: string) => {
    if (checkLoginSubmitting(state)) {
        return;
    }

    dispatch(loginSubmitting());

    let resp;
    try {
        const apiURL = process.env.REACT_APP_API_URL;
        resp = await fetch(`${apiURL}/user/login`)
    } catch (err) {

    }
};
