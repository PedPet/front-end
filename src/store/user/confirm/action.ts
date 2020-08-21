import {
    ConfirmUserSubmit,
    ConfirmUserSubmitSuccess,
    ConfirmUserAction,
    ConfirmUserActions,
} from "./types";
import { State, ConfirmResponse } from "../../types";
import { Dispatch } from "redux";
import { confirmUserSubmitting } from "./selector";
import { apiError } from "../../actions";

const confirmUserSubmit = (): ConfirmUserSubmit => ({
    type: "CONFIRM_USER_SUBMITTING",
});

const confirmUserSubmitSuccess = (
    success: boolean,
): ConfirmUserSubmitSuccess => ({
    type: "CONFIRM_USER_SUBMIT_SUCCESS",
    success,
});

export const confirmUserAction: ConfirmUserAction = (
    state: State,
    dispatch: Dispatch<ConfirmUserActions>,
) => async (username: string, code: string) => {
    if (confirmUserSubmitting(state)) {
        return;
    }

    dispatch(confirmUserSubmit());

    let resp;
    try {
        const apiURL = process.env.REACT_APP_API_URL;
        resp = await fetch(`${apiURL}/user/confirm`, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({ username, code }),
        });

        const { ok }: ConfirmResponse = await resp.clone().json();

        dispatch(confirmUserSubmitSuccess(ok));
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
