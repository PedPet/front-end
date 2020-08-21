import { combineReducers } from "redux";
import checkUsername from "./check-username/reducer";
import login from "./login/reducer";
import confirm from "./confirm/reducer";

export default combineReducers({
    checkUsername,
    login,
    confirm,
});
