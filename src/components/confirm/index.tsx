import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import { Props } from "./types";
import ErrorNotification from "../notification/error";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ProgressButton from "../progress-button";
import { useSelector, useDispatch } from "react-redux";
import { SelectorState } from "./types";
import { State } from "../../store/types";
import { confirmUserAction } from "../../store/user/confirm/action";
import {
    confirmUserSubmitting,
    userConfirmed,
} from "../../store/user/confirm/selector";

const useStyles = makeStyles({
    paper: {
        width: "30%",
    },
});

const Confirm: React.FC<Props> = ({ open, toggleDialog, username }) => {
    const [code, setCode] = useState("");
    const classes = useStyles();
    const dispatch = useDispatch();
    const { confirmSubmitting, confirmedUser, confirmUser } = useSelector<
        State,
        SelectorState
    >((state) => ({
        confirmSubmitting: confirmUserSubmitting(state),
        confirmedUser: userConfirmed(state),
        confirmUser: confirmUserAction(state, dispatch),
    }));

    const codeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setCode(value);
    };
    const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        confirmUser(username, code);
    };

    return (
        <Dialog
            open={open}
            onClose={toggleDialog}
            classes={{
                paper: classes.paper,
            }}
        >
            <ErrorNotification />
            <DialogTitle>Verify</DialogTitle>
            <DialogContent>
                <TextField
                    label="Verification Code"
                    fullWidth
                    name="verification_code"
                    onChange={codeChange}
                    value={code}
                />
            </DialogContent>
            <DialogActions style={{ justifyContent: "space-between" }}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={toggleDialog}
                >
                    Close
                </Button>
                <ProgressButton
                    loading={confirmSubmitting}
                    success={confirmedUser}
                    onClick={onSubmit}
                >
                    Confirm
                </ProgressButton>
            </DialogActions>
        </Dialog>
    );
};

export default Confirm;
