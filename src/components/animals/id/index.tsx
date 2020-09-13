import React, { useState } from "react";
import { TextField, makeStyles } from "@material-ui/core";
import { useDidUpdateEffect } from "../../../hooks";
import { Props } from "./types";
import useFormStyles from "../styles";

const useStyles = makeStyles({
    form: {
        marginBottom: 25,
    },
});

const IDForm: React.FC<Props> = ({ onChange }) => {
    const [registrationList, setRegistrationsList] = useState("");
    const [tattooTag, setTattooTag] = useState("");
    const [brandMark, setBrandMark] = useState("");
    const [microchipNumber, setMicrochipNumber] = useState("");
    const [registrationBodies, setRegistrationBodies] = useState("");
    const styles = useStyles();
    const formStyles = useFormStyles();
    const classes = { ...styles, ...formStyles };

    useDidUpdateEffect(
        () =>
            onChange({
                registrationList,
                brandMark,
                microchipNumber,
                registrationBodies,
                tattooTag,
            }),
        [
            registrationList,
            tattooTag,
            brandMark,
            microchipNumber,
            registrationBodies,
        ],
    );

    return (
        <form className={classes.form}>
            <TextField
                className={classes.input}
                label="Registration List"
                name="registrations_list"
                fullWidth
                onChange={({ target: { value } }) =>
                    setRegistrationsList(value)
                }
                value={registrationList}
            />
            <TextField
                className={classes.input}
                label="Tattoo / Tag"
                name="tattoo_tag"
                fullWidth
                onChange={({ target: { value } }) => setTattooTag(value)}
                value={tattooTag}
            />
            <TextField
                className={classes.input}
                label="Brand / Mark"
                name="brand_mark"
                fullWidth
                onChange={({ target: { value } }) => setBrandMark(value)}
                value={brandMark}
            />
            <TextField
                className={classes.input}
                label="Microchip Number"
                name="microchip_number"
                fullWidth
                onChange={({ target: { value } }) => setMicrochipNumber(value)}
                value={microchipNumber}
            />
            <TextField
                className={classes.input}
                label="Registration Bodies"
                name="registration_bodies"
                fullWidth
                onChange={({ target: { value } }) =>
                    setRegistrationBodies(value)
                }
                value={registrationBodies}
            />
        </form>
    );
};

export default IDForm;
