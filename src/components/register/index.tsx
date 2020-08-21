import React, { useReducer, useEffect, useState } from "react";
import { password } from "../../config/validation.json";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { Props, State, Actions, StateSelector } from "./types";
import { useDispatch, useSelector } from "react-redux";
import {
    registerIsSubmitting,
    registerSuccess,
} from "../../store/register/selectors";
import { State as StoreState } from "../../store/types";
import { register, registerClear } from "../../store/register/actions";
import ProgressButton from "../progress-button";
import ErrorNotification from "../notification/error";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { checkUsernameTaken } from "../../store/user/check-username/action";
import {
    checkUsernameFetching,
    checkUsernameIsTaken,
} from "../../store/user/check-username/selector";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import { apiErrorSelector } from "../../store/selector";

const useStyles = makeStyles({
    checkUsername: {
        position: "absolute",
        right: 24,
        top: 92,
    },
    usernameIsTaken: {
        position: "absolute",
        right: 24,
        top: 92,
    },
});

const initialState = {
    username: {
        value: "",
        error: "",
    },
    password: {
        value: "",
        error: "",
    },
    email: {
        value: "",
        error: "",
    },
};
const allowedInputs = ["username", "password", "email"];

const Register: React.FC<Props> = ({
    open,
    toggleDialog,
    toggleLogin,
    username,
}) => {
    const rDispatch = useDispatch();
    const {
        isSubmitting,
        registered,
        registerUser,
        isFetching,
        usernameTaken,
        checkUsername,
        apiError,
        clearRegister,
    } = useSelector<StoreState, StateSelector>((state) => ({
        isSubmitting: registerIsSubmitting(state),
        registered: registerSuccess(state),
        registerUser: register(state, rDispatch),
        isFetching: checkUsernameFetching(state),
        usernameTaken: checkUsernameIsTaken(state),
        checkUsername: checkUsernameTaken(state, rDispatch),
        apiError: apiErrorSelector(state),
        clearRegister: registerClear,
    }));
    const classes = useStyles();

    const [usernameEditing, setUsernameEditing] = useState<
        boolean | undefined
    >();
    const [state, dispatch] = useReducer(
        (state: State, action: Actions) => {
            const { type, key, value } = action;

            switch (type) {
                case "UPDATE":
                    if (key) {
                        return {
                            ...state,
                            [key]: {
                                error: state[key].error,
                                value,
                            },
                        };
                    }

                    return state;

                case "ERROR":
                    if (key && value) {
                        return {
                            ...state,
                            [key]: {
                                value: state[key].value,
                                error: value,
                            },
                        };
                    }

                    return state;

                case "RESET":
                    return initialState;

                default:
                    return state;
            }
        },
        {
            ...initialState,
            username: {
                ...initialState.username,
                value: username,
            },
        },
    );

    // On close register
    useEffect(() => {
        dispatch({
            type: "UPDATE",
            key: "username",
            value: username,
        });
    }, [username]);
    useEffect(
        () => () => {
            dispatch({
                type: "RESET",
            });
        },
        [],
    );

    useEffect(() => {
        if (usernameTaken) {
            dispatch({
                type: "ERROR",
                key: "username",
                value: "Username taken",
            });
        }
    }, [usernameTaken]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate all inputs
        const formValid = Object.entries(state).reduce(
            (formValid, [key, val]) => {
                const [valid, err] = validate(key as keyof State, val.value);
                if (!valid) {
                    dispatch({
                        type: "ERROR",
                        key: key as keyof State,
                        value: err,
                    });
                    formValid = valid;
                }

                return formValid;
            },
            true,
        );

        if (!formValid) {
            return;
        }

        const { username, password, email } = state;
        registerUser(username.value, password.value, email.value);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (!allowedInputs.includes(name)) {
            return;
        }

        if ((name as keyof State) === "username") {
            setUsernameEditing(true);
        }

        const [_, err] = validate(name as keyof State, value);
        // If input is valid and there was previously an error set it to empty
        if (state[name as keyof State].error !== "") {
            dispatch({
                type: "ERROR",
                key: name as keyof State,
                value: err,
            });
        }

        dispatch({
            type: "UPDATE",
            key: name as keyof State,
            value,
        });
    };

    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const [valid, err] = validate(name as keyof State, value);
        if (!valid) {
            dispatch({
                type: "ERROR",
                key: name as keyof State,
                value: err,
            });
        }

        if ((name as keyof State) === "username" && valid && usernameEditing) {
            checkUsername(value);
            setUsernameEditing(false);
        }
    };

    const validate = (name: keyof State, val: string): [boolean, string] => {
        switch (name) {
            case "username":
                if (val === "") {
                    return [false, "Username is required"];
                }

                if (val.length < 2 || val.length > 100) {
                    return [
                        false,
                        "Username must be between 2 and 100 characters",
                    ];
                }

                return [true, ""];

            case "email":
                if (val === "") {
                    return [false, "Email is required"];
                }

                // Regex from https://emailregex.com
                if (
                    !val.match(
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    )
                ) {
                    return [false, "Email must be a valid email address"];
                }

                return [true, ""];

            case "password":
                const { required, length, regex, format } = password;
                if (required) {
                    if (val === "") {
                        return [false, "Password is required"];
                    }
                }

                if (val.length < length.min || val.length > length.max) {
                    return [
                        false,
                        `Password must be between ${length.min} and ${length.max}`,
                    ];
                }

                let regexArr = regex;
                if (!Array.isArray(regex)) {
                    regexArr = [regex];
                }

                const matches = regexArr.reduce<boolean>((matches, regex) => {
                    if (matches) {
                        const regexp = new RegExp(regex);
                        return regexp.test(val);
                    }

                    return matches;
                }, true);

                if (!matches) {
                    return [
                        false,
                        `Password must be in a format of: ${format}`,
                    ];
                }

                return [true, ""];
        }

        return [false, "Invalid input"];
    };

    const loginClick = () => {
        toggleDialog();
        toggleLogin();
        clearRegister();
    };

    // const onClose = () => {
    //     dispatch({
    //         type: "RESET",
    //     });
    //     toggleDialog();
    // };

    return (
        <Dialog open={open} onClose={toggleDialog}>
            <ErrorNotification />
            <DialogTitle>{!registered ? "Register" : "Registered"}</DialogTitle>
            <DialogContent style={{ overflow: "hidden" }}>
                {!registered ? (
                    <>
                        <TextField
                            label="username"
                            name="username"
                            onChange={onChange}
                            value={state.username.value}
                            autoFocus
                            required
                            fullWidth
                            helperText={state.username.error}
                            error={state.username.error !== ""}
                            onBlur={onBlur}
                        />

                        {isFetching ? (
                            <CircularProgress
                                className={classes.checkUsername}
                                size={14}
                            />
                        ) : (
                            state.username.value &&
                            usernameTaken !== undefined &&
                            !usernameEditing &&
                            (usernameTaken ? (
                                <CancelOutlinedIcon
                                    className={`${classes.checkUsername} ${classes.usernameIsTaken}`}
                                    color="secondary"
                                />
                            ) : (
                                !apiError && (
                                    <CheckCircleOutlinedIcon
                                        className={classes.checkUsername}
                                        color="primary"
                                    />
                                )
                            ))
                        )}

                        <TextField
                            type="password"
                            label="password"
                            name="password"
                            onChange={onChange}
                            value={state.password.value}
                            fullWidth
                            required
                            helperText={state.password.error}
                            error={state.password.error !== ""}
                            onBlur={onBlur}
                        />

                        <TextField
                            type="email"
                            label="email"
                            name="email"
                            onChange={onChange}
                            value={state.email.value}
                            fullWidth
                            required
                            helperText={state.email.error}
                            error={state.email.error !== ""}
                            onBlur={onBlur}
                        />
                    </>
                ) : (
                    <p>
                        Please log in and confirm your account using the
                        verification code emailed to you
                    </p>
                )}
            </DialogContent>
            <DialogActions style={{ justifyContent: "space-between" }}>
                {!registered ? (
                    <>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={toggleDialog}
                        >
                            Cancel
                        </Button>
                        <ProgressButton
                            type="submit"
                            onClick={submit}
                            loading={isSubmitting}
                            success={registered}
                        >
                            Save
                        </ProgressButton>
                    </>
                ) : (
                    <>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={toggleDialog}
                        >
                            Close
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={loginClick}
                        >
                            Login
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default Register;
