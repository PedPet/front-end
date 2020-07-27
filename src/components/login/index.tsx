import React, { useState, useReducer } from "react";
import { Props, ValidInputs } from "./types";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import ProgressButton from "../progress-button";
import Button from "@material-ui/core/Button";

const Login: React.FC<Props> = ({ open, toggleDialog, toggleRegister }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const openRegister = () => {
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

    return (
        <Dialog open={open} onClose={toggleDialog}>
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
                <ProgressButton loading={false} success={false} onClick={}>
                    Login
                </ProgressButton>
            </DialogActions>
        </Dialog>
    );
};

export default Login;
