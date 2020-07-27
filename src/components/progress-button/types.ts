import { ButtonProps } from "@material-ui/core/Button";

export type Props =
    ButtonProps &
    {
        loading: boolean;
        success: boolean;
    };
