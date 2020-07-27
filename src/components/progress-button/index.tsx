import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Props } from "./types";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
    wrapper: {
        margin: theme.spacing(1),
        position: "relative",
    },
    buttonSuccess: {
        backgroundColor: green[500],
        "&:hover": {
            backgroundColor: green[700],
        },
    },
    buttonProgress: {
        color: green[500],
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -12,
        marginLeft: -12,
    },
}));

const ProgressButton: React.FC<Props> = ({
    type,
    variant = "contained",
    color = "primary",
    onClick,
    loading,
    success,
    children,
    ...props
}) => {
    const classes = useStyles();
    const buttonClassName = clsx({
        [classes.buttonSuccess]: success,
    });

    return (
        <div className={classes.wrapper}>
            <Button
                className={buttonClassName}
                variant={variant}
                color={color}
                onClick={onClick}
                {...props}
            >
                {children}
            </Button>
            {loading && (
                <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                />
            )}
        </div>
    );
};

export default ProgressButton;
