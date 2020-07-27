import { CheckUsernameState } from "./check-username/types";
import { LoginState } from "./login/types";

export interface UserState {
    checkUsername: CheckUsernameState;
    login: LoginState;
};

export interface User {
    username: string;
    email: string;
};
