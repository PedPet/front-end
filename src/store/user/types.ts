import { CheckUsernameState } from "./check-username/types";
import { LoginState } from "./login/types";
import { ConfirmUserState } from "./confirm/types";

export interface UserState {
    checkUsername: CheckUsernameState;
    login: LoginState;
    confirm: ConfirmUserState;
}

export interface User {
    username: string;
    email?: string;
    jwt: string;
}
