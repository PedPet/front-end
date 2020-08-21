import { ConfirmUserAction } from "../../store/user/confirm/types";

export type Props = {
    open: boolean;
    toggleDialog: () => void;
    username: string;
};

export type SelectorState = {
    confirmUser: ReturnType<ConfirmUserAction>;
    confirmSubmitting: boolean;
    confirmedUser: boolean;
};
