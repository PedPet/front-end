import React, { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { useSelector, useDispatch } from "react-redux";
import { State as GlobalState } from "../../store/types";
import { apiErrorSelector } from "../../store/selector";
import { apiError } from "../../store/actions";

const Alert: React.FC<AlertProps> = props => (
    <MuiAlert elevation={24} variant="filled" {...props} />
);

const ErrorNotification: React.FC<{ message?: string }> = ({ message }) => {
    const { error } = useSelector<GlobalState, { error: string }>(state => ({
        error: apiErrorSelector(state),
    }));
    const dispatch = useDispatch();

    const shouldBeOpen =
        (message !== "" && message !== undefined) || error !== "";
    const [open, setOpen] = useState(shouldBeOpen);

    useEffect(() => {
        if (!open && shouldBeOpen) {
            setOpen(true);
        }

        if (open && !shouldBeOpen) {
            setOpen(false);
        }
    }, [message, open, error, shouldBeOpen]);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        if (error !== "") {
            dispatch(apiError(""));
        }
        setOpen(false);
    };
    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity="error">
                {message || error}
            </Alert>
        </Snackbar>
    );
};

export default ErrorNotification;
