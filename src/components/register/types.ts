import { RegisterAction } from "../../store/register/types";
import { CheckUsernameAction } from "../../store/user/check-username/types";

export type Actions = {
    type: "UPDATE" | "ERROR" | "RESET";
    key?: keyof State;
    value?: string;
};

export type Values = {
    value: string;
    error: string;
};

export type State = {
    username: Values;
    password: Values;
    email: Values;
};

export type StateSelector = {
    isSubmitting: boolean;
    registered: boolean;
    registerUser: ReturnType<RegisterAction>;
    isFetching: boolean;
    usernameTaken: boolean | undefined;
    checkUsername: ReturnType<CheckUsernameAction>;
};

export type Props = {
    open: boolean;
    toggleDialog: () => void;
};
