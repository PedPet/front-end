import { Reducer } from "redux";
import { LoginState, LoginSubmitActionTypes } from "./types";

const initialState: LoginState = {
    submitting: false,
    user: undefined
};

const reducer: Reducer<LoginState, LoginSubmitActionTypes> = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN_SUBMITTING":
            return {
                submitting: true,
                user: undefined
            };

        case "LOGIN_SUBMIT_SUCCESS":
            return {
                submitting: false,
                user: action.user
            };

        default:
            return state;
    }
};

export default reducer;
