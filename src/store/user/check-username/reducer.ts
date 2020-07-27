import { CheckUsernameState, CheckUsernameSubmitActionTypes } from "./types";
import { Reducer } from "react";

const initialState: CheckUsernameState = {
    fetching: false,
    taken: undefined,
};

const reducer: Reducer<CheckUsernameState, CheckUsernameSubmitActionTypes> = (state = initialState, action) => {
    switch (action.type) {
        case "CHECK_USERNAME_FETCH":
            return {
                fetching: true,
                taken: false,
            };

        case "CHECK_USERNAME_FETCH_SUCCESS":
            return {
                fetching: false,
                taken: action.taken
            };

        case "API_ERROR":
            return {
                fetching: false,
                taken: false,
            };

        default:
            return state;
    }
};

export default reducer;
