import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducer";
import logger from "redux-logger";

const makeStore = () => {
    if (process.env.NODE_ENV === "development") {
        return createStore(rootReducer, applyMiddleware(logger));
    }

    return createStore(rootReducer);
};

export default makeStore();
