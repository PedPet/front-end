import React, { useState, useEffect } from "react";
import { Props, ValidInputs, SelectorState } from "./types";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import ProgressButton from "../progress-button";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import {
    checkLoginSubmitting,
    loggedInUser,
    loginNeedToConfirm,
} from "../../store/user/login/selector";
import { loginAction } from "../../store/user/login/action";
import { State } from "../../store/types";
import ErrorNotification from "../notification/error";

const Login: React.FC<Props> = ({
    open,
    toggleDialog,
    toggleRegister,
    setUsername: setParentUsername,
    closeLogin,
}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isSubmitting, user, login, needToConfirm } = useSelector<
        State,
        SelectorState
    >((state) => ({
        isSubmitting: checkLoginSubmitting(state),
        user: loggedInUser(state),
        login: loginAction(state, dispatch),
        needToConfirm: loginNeedToConfirm(state),
    }));

    useEffect(
        () => () => {
            setUsername("");
            setPassword("");
        },
        [],
    );
    useEffect(() => {
        if (user) {
            setTimeout(() => closeLogin && closeLogin(), 1000);
        }
    }, [user]);

    const openRegister = () => {
        setParentUsername(username);
        toggleDialog();
        toggleRegister();
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if ((name as ValidInputs) === "username") {
            return setUsername(value);
        }

        if ((name as ValidInputs) === "password") {
            return setPassword(value);
        }
    };

    const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        setParentUsername(username);
        login(username, password);
    };

    return (
        <Dialog open={open && !needToConfirm} onClose={closeLogin}>
            <ErrorNotification />
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <form>
                    <TextField
                        label="username"
                        name="username"
                        autoFocus
                        required
                        fullWidth
                        onChange={onChange}
                        value={username}
                    />

                    <TextField
                        type="password"
                        label="password"
                        name="password"
                        required
                        fullWidth
                        onChange={onChange}
                        value={password}
                    />
                </form>
            </DialogContent>
            <DialogActions style={{ flexDirection: "column" }}>
                <Button
                    variant="contained"
                    color="default"
                    onClick={openRegister}
                >
                    Register
                </Button>
                <ProgressButton
                    loading={isSubmitting}
                    success={user ? true : false}
                    onClick={onSubmit}
                >
                    Login
                </ProgressButton>
            </DialogActions>
        </Dialog>
    );
};

export default Login;
