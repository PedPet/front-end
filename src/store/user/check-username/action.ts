import {
    CheckUsernameFetch,
    CheckUsernameFetchSuccess,
    CheckUsernameSubmitActionTypes,
    CheckUsernameAction,
} from "./types";
import { State, ConfirmResponse } from "../../types";
import { Dispatch } from "redux";
import { checkUsernameFetching as checkUsernameIsFetching } from "./selector";
import { apiError } from "../../actions";

const checkUsernameFetch = (): CheckUsernameFetch => ({
    type: "CHECK_USERNAME_FETCH",
});

const checkUsernameFetchSuccess = (
    taken: boolean,
): CheckUsernameFetchSuccess => ({
    type: "CHECK_USERNAME_FETCH_SUCCESS",
    taken,
});

export const checkUsernameTaken: CheckUsernameAction = (
    state: State,
    dispatch: Dispatch<CheckUsernameSubmitActionTypes>,
) => async (username: string) => {
    if (checkUsernameIsFetching(state)) {
        return;
    }

    dispatch(checkUsernameFetch());

    let resp;
    try {
        const apiURL = process.env.REACT_APP_API_URL;
        resp = await fetch(
            `${apiURL}/user/check-username-taken?username=${username}`,
            {
                method: "GET",
                mode: "cors",
            },
        );

        const { ok }: ConfirmResponse = await resp.clone().json();

        dispatch(checkUsernameFetchSuccess(ok));
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
