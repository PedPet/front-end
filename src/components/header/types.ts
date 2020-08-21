import { User } from "../../store/user/types";

export type SelectorState = {
    needToConfirm: boolean;
    user: User | undefined;
};

export type StyleProps = {
    drawerWidth: number;
};
