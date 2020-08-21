import { User } from "../../store/user/types";
import { LoginAction } from "../../store/user/login/types";

export type Props = {
    open: boolean;
    toggleDialog: () => void;
    toggleRegister: () => void;
    closeLogin?: () => void;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
};

export type ValidInputs = "username" | "password";

export type SelectorState = {
    isSubmitting: boolean;
    user: User | undefined;
    login: ReturnType<LoginAction>;
    needToConfirm: boolean;
};
