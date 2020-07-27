import { combineReducers } from "redux";
import register from './register/reducer';
import { Reducer } from "react";
import { APIState, APIErrorAction } from "./types";
import user from './user/reducer';

const initialAPIState: APIState = {
    error: ""
};
const apiReducer: Reducer<APIState, APIErrorAction> = (state = initialAPIState, action) => {
    switch (action.type) {
        case "API_ERROR":
            return {
                error: action.error
            };
            
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    register,
    api: apiReducer,
    user
});

export default rootReducer;
