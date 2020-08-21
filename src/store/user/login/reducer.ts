import { Reducer } from "redux";
import { LoginState, LoginSubmitActionTypes } from "./types";

const initialState: LoginState = {
    submitting: false,
    user: undefined,
    needToConfirm: false,
};

const reducer: Reducer<LoginState, LoginSubmitActionTypes> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case "LOGIN_SUBMITTING":
            return {
                submitting: true,
                user: undefined,
                needToConfirm: false,
            };

        case "LOGIN_SUBMIT_SUCCESS":
            return {
                submitting: false,
                user: action.user,
                needToConfirm: false,
            };

        case "LOGIN_SUBMIT_SUCCESS_CONFIRM":
            return {
                submitting: false,
                user: undefined,
                needToConfirm: true,
            };

        case "CANCEL_CONFIRM":
        case "CONFIRM_USER_SUBMIT_SUCCESS":
            return {
                ...state,
                needToConfirm: false,
            };

        case "API_ERROR":
            return {
                ...state,
                submitting: false,
            };

        default:
            return state;
    }
};

export default reducer;
