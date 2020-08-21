import { Reducer } from "redux";
import { ConfirmUserState, ConfirmUserActions } from "./types";

const initialState: ConfirmUserState = {
    submitting: false,
    success: false,
};

const reducer: Reducer<ConfirmUserState, ConfirmUserActions> = (
    state = initialState,
    action,
) => {
    switch (action.type) {
        case "CONFIRM_USER_SUBMITTING":
            return {
                submitting: true,
                success: false,
            };

        case "CONFIRM_USER_SUBMIT_SUCCESS":
            return {
                submitting: false,
                success: action.success,
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
