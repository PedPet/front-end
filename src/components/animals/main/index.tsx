import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Props } from "./types";
import { Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import { useDidUpdateEffect } from "../../../hooks";
import useFormStyles from "../styles";

const MainForm: React.FC<Props> = ({ onChange, ...formState }) => {
    const [officialName, setOfficialName] = useState(formState.officialName);
    const [suffix, setSuffix] = useState(formState.suffix);
    const [dob, setDob] = useState(formState.dob);
    const [petName, setPetName] = useState(formState.petName);
    const [sex, setSex] = useState(formState.sex);
    const [neutered, setNeutered] = useState(formState.neutered);
    const [breeders, setBreeders] = useState(formState.breeders);
    const [owners, setOwners] = useState(formState.owners);
    const [countryOfOrigin, setCountryOfOrigin] = useState(
        formState.countryOfOrigin,
    );
    const [countryOfResidence, setCountryOfResidence] = useState(
        formState.countryOfResidence,
    );
    const classes = useFormStyles();

    useDidUpdateEffect(
        () =>
            onChange({
                officialName,
                suffix,
                dob,
                petName,
                sex,
                neutered,
                breeders,
                owners,
                countryOfOrigin,
                countryOfResidence,
            }),
        [
            officialName,
            suffix,
            dob,
            petName,
            sex,
            neutered,
            breeders,
            owners,
            countryOfOrigin,
            countryOfResidence,
        ],
    );

    return (
        <form>
            <Grid container>
                <Grid item xs={5} className={classes.grid}>
                    <TextField
                        className={classes.input}
                        label="Official Name"
                        name="official_name"
                        fullWidth
                        onChange={({ target: { value } }) =>
                            setOfficialName(value)
                        }
                        value={officialName}
                    />
                    <TextField
                        className={classes.input}
                        label="Suffix"
                        name="suffix"
                        fullWidth
                        onChange={({ target: { value } }) => setSuffix(value)}
                        value={suffix}
                    />
                    <TextField
                        className={classes.input}
                        label="DOB"
                        name="dob"
                        fullWidth
                        onChange={({ target: { value } }) => setDob(value)}
                        value={dob}
                    />
                    <TextField
                        className={classes.input}
                        label="Pet Name"
                        name="pet_name"
                        fullWidth
                        onChange={({ target: { value } }) => setPetName(value)}
                        value={petName}
                    />
                    <FormControl className={classes.input} fullWidth>
                        <InputLabel id="main-form-sex">Sex</InputLabel>
                        <Select
                            labelId="main-form-sex"
                            onChange={({ target: { value } }) =>
                                setSex(value as string)
                            }
                            fullWidth
                            value={sex}
                        >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={5}>
                    <TextField
                        className={classes.input}
                        label="Neutered"
                        name="neutered"
                        fullWidth
                        onChange={({ target: { value } }) => setNeutered(value)}
                        value={neutered}
                    />
                    <TextField
                        className={classes.input}
                        label="Breeder(s)"
                        name="breeders"
                        fullWidth
                        onChange={({ target: { value } }) => setBreeders(value)}
                        value={breeders}
                    />
                    <TextField
                        className={classes.input}
                        label="Owner(s)"
                        name="owners"
                        fullWidth
                        onChange={({ target: { value } }) => setOwners(value)}
                        value={owners}
                    />
                    <TextField
                        className={classes.input}
                        label="Country of Origin"
                        name="country_of_origin"
                        fullWidth
                        onChange={({ target: { value } }) =>
                            setCountryOfOrigin(value)
                        }
                        value={countryOfOrigin}
                    />
                    <TextField
                        className={classes.input}
                        label="Country of Residence"
                        name="country_of_residence"
                        fullWidth
                        onChange={({ target: { value } }) =>
                            setCountryOfResidence(value)
                        }
                        value={countryOfResidence}
                    />
                </Grid>
            </Grid>
        </form>
    );
};

export default MainForm;
