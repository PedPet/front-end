import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import MainForm from "../main";
import { MainFormState } from "../main/types";
import ProgressButton from "../../progress-button";
import { makeStyles } from "@material-ui/core";
import IDForm from "../id";
import { IDFormState } from "../id/types";
import AncestorForm from "../ancestors";
import BreedForm from "../breed";
import { BreedState } from "../breed/types";

type StyleProps = { isDirty: boolean };
const useStyles = makeStyles({
    paper: {
        padding: 10,
        paddingBottom: ({ isDirty }: StyleProps) => (isDirty ? 20 : 72),
    },
    button: {
        textAlign: "right",
    },
});

const AddAnimal: React.FC = () => {
    const [tab, setTab] = useState(0);
    const [isDirty, setIsDirty] = useState(false);
    const [mainFormState, setMainFormState] = useState<MainFormState>({
        officialName: "",
        suffix: "",
        dob: "",
        petName: "",
        sex: "",
        neutered: "",
        breeders: "",
        owners: "",
        countryOfOrigin: "",
        countryOfResidence: "",
    });
    const [idFormState, setIDFormState] = useState<IDFormState>({
        registrationList: "",
        brandMark: "",
        microchipNumber: "",
        registrationBodies: "",
        tattooTag: "",
    });
    const [breederFormState, setBreederFormState] = useState<BreedState>({
        breed: "",
        breeder: "",
        variety: "",
        colour: "",
        pattern: "",
        genus: "",
        species: "",
        subspecies: "",
        gestationPeriod: "",
        eyeColour: "",
        furType: "",
        earType: "",
        temperament: "",
        faults: "",
    });
    const classes = useStyles({ isDirty });

    const tabChange = (e: React.ChangeEvent<{}>, tab: number) => {
        setTab(tab);
    };

    return (
        <Paper className={classes.paper}>
            <Tabs
                scrollButtons="auto"
                variant="scrollable"
                onChange={tabChange}
                value={tab}
            >
                <Tab label="Main" />
                <Tab label="ID" />
                <Tab label="Ancestors" />
                <Tab label="Breed" />
                <Tab label="Health" />
                <Tab label="Genotype" />
                <Tab label="Transfer" />
                <Tab label="Photos" />
                <Tab label="Notes" />
                <Tab label="Admin" />
            </Tabs>

            {tab === 0 && (
                <Box p={3}>
                    <MainForm
                        {...mainFormState}
                        onChange={(state) => {
                            setMainFormState(state);
                            setIsDirty(true);
                        }}
                    />
                </Box>
            )}
            {tab === 1 && (
                <Box p={3}>
                    <IDForm
                        {...idFormState}
                        onChange={(state) => {
                            setIDFormState(state);
                            setIsDirty(true);
                        }}
                    />
                </Box>
            )}
            {tab === 2 && (
                <Box p={3}>
                    <AncestorForm />
                </Box>
            )}
            {tab === 3 && (
                <Box p={3}>
                    <BreedForm
                        {...breederFormState}
                        onChange={(state) => {
                            setBreederFormState(state);
                            setIsDirty(true);
                        }}
                    />
                </Box>
            )}
            {isDirty && (
                <div className={classes.button}>
                    <ProgressButton loading={false} success={false}>
                        Save
                    </ProgressButton>
                </div>
            )}
        </Paper>
    );
};

export default AddAnimal;
