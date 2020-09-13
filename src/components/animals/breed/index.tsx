import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import useFormStyles from "../styles";
import Autocomplete from "../../autocomplete";
import TextField from "@material-ui/core/TextField";
import { Props } from "./types";
import { useDidUpdateEffect } from "../../../hooks";

const BreedForm: React.FC<Props> = ({ onChange, ...formState }) => {
    const [openAddBreed, setOpenAddBreed] = useState<boolean>(false);
    const [openAddBreeder, setOpenAddBreeder] = useState<boolean>(false);
    const [breed, setBreed] = useState(formState.breed);
    const [breeder, setBreeder] = useState(formState.breeder);
    const [variety, setVariety] = useState(formState.variety);
    const [colour, setColour] = useState(formState.colour);
    const [pattern, setPattern] = useState(formState.pattern);
    const [genus, setGenus] = useState(formState.genus);
    const [species, setSpecies] = useState(formState.species);
    const [subspecies, setSubspecies] = useState(formState.subspecies);
    const [gestationPeriod, setGestationPeriod] = useState(
        formState.gestationPeriod,
    );
    const [eyeColour, setEyeColour] = useState(formState.eyeColour);
    const [furType, setFurType] = useState(formState.furType);
    const [earType, setEarType] = useState(formState.earType);
    const [temperament, setTemperament] = useState(formState.temperament);
    const [faults, setFaults] = useState(formState.faults);
    const classes = useFormStyles();

    useDidUpdateEffect(
        () =>
            onChange({
                breed,
                breeder,
                variety,
                colour,
                pattern,
                genus,
                species,
                subspecies,
                gestationPeriod,
                eyeColour,
                furType,
                earType,
                temperament,
                faults,
            }),
        [
            breed,
            breeder,
            variety,
            colour,
            pattern,
            genus,
            species,
            subspecies,
            gestationPeriod,
            eyeColour,
            furType,
            earType,
            temperament,
            faults,
        ],
    );

    const onBreedChange = (value: string) => {
        if (value === "add") {
            setOpenAddBreed(true);
            return;
        }

        setBreed(value);
    };
    const onBreederChange = (value: string) => {
        if (value === "add") {
            setOpenAddBreeder(true);
            return;
        }

        setBreeder(value);
    };

    console.log({ openAddBreed, openAddBreeder });

    return (
        <form>
            <Grid container>
                <Grid item xs={5} className={classes.grid}>
                    <Autocomplete
                        className={classes.input}
                        withAddNew
                        options={[
                            {
                                title: "African Pygmy Hedgehog",
                                value: "African Pygmy Hedgehog",
                            },
                            {
                                title: "Long Eared Hedgehog",
                                value: "Long Eared Hedgehog",
                            },
                            {
                                title: "Desert Hedgehog",
                                value: "Desert Hedgehog",
                            },
                        ]}
                        name="Breed"
                        onChange={onBreedChange}
                        value={breed}
                    />
                    <Autocomplete
                        className={classes.input}
                        withAddNew
                        options={[
                            {
                                title: "Arctic Frost Hedgehogs",
                                value: "arc",
                            },
                            {
                                title: "Pear Hedgehogs",
                                value: "pear",
                            },
                        ]}
                        name="Breeder"
                        onChange={onBreederChange}
                        value={breeder}
                    />
                    <TextField
                        label="Variety"
                        name="variety"
                        onChange={({ target: { value } }) => setVariety(value)}
                        value={variety}
                        fullWidth
                    />
                    <TextField
                        label="Colour"
                        name="colour"
                        onChange={({ target: { value } }) => setColour(value)}
                        value={colour}
                        fullWidth
                    />
                    <TextField
                        label="Pattern"
                        name="pattern"
                        onChange={({ target: { value } }) => setPattern(value)}
                        value={pattern}
                        fullWidth
                    />
                    <TextField
                        label="Genus"
                        name="genus"
                        onChange={({ target: { value } }) => setGenus(value)}
                        value={genus}
                        fullWidth
                    />
                    <TextField
                        label="Species"
                        name="species"
                        onChange={({ target: { value } }) => setSpecies(value)}
                        value={species}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={5}>
                    <TextField
                        label="Subspecies"
                        name="subspecies"
                        onChange={({ target: { value } }) =>
                            setSubspecies(value)
                        }
                        value={subspecies}
                        fullWidth
                    />
                    <TextField
                        label="Gestation Period"
                        name="gestation_period"
                        onChange={({ target: { value } }) =>
                            setGestationPeriod(value)
                        }
                        value={gestationPeriod}
                        fullWidth
                    />
                    <TextField
                        label="Eye Colour"
                        name="eye_colour"
                        onChange={({ target: { value } }) =>
                            setEyeColour(value)
                        }
                        value={eyeColour}
                        fullWidth
                    />
                    <TextField
                        label="Fur Type"
                        name="fur_type"
                        onChange={({ target: { value } }) => setFurType(value)}
                        value={furType}
                        fullWidth
                    />
                    <TextField
                        label="Ear Type"
                        name="ear_type"
                        onChange={({ target: { value } }) => setEarType(value)}
                        value={earType}
                        fullWidth
                    />
                    <TextField
                        label="Temperament"
                        name="temperament"
                        onChange={({ target: { value } }) =>
                            setTemperament(value)
                        }
                        value={temperament}
                        fullWidth
                    />
                    <TextField
                        label="Faults"
                        name="faults"
                        onChange={({ target: { value } }) => setFaults(value)}
                        value={faults}
                        fullWidth
                    />
                </Grid>
            </Grid>
        </form>
    );
};

export default BreedForm;
