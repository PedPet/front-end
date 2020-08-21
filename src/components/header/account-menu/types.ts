import { User } from "../../../store/user/types";

export type Props = {
    mobile?: boolean;
};

export type SelectorState = {
    user: User | undefined
};
