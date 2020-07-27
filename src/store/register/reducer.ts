import { Reducer } from "redux";
import { RegisterState, RegisterSubmitActionTypes } from "./types";

const initialState: RegisterState = {
    submitting: false,
    success: false,
};

const reducer: Reducer<RegisterState, RegisterSubmitActionTypes> = (state = initialState, action) => {
    switch (action.type) {
        case "REGISTER_SUBMIT":
            return {
                submitting: true,
                success: false,
            };

        case "REGISTER_SUBMIT_SUCCESS":
            return {
                submitting: false,
                success: action.success,
            };

        case "API_ERROR":
            return {
                submitting: false,
                success: false
            };

        default:
            return state;
    }
};

export default reducer;
