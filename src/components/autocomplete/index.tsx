import React, { useMemo } from "react";
import TextField from "@material-ui/core/TextField";
import AutocompleteMui from "@material-ui/lab/Autocomplete";
import { Props } from "./types";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import green from "@material-ui/core/colors/green";

const Autocomplete: React.FC<Props> = ({
    options,
    onChange,
    className,
    name,
    value,
}) => {
    const newOptions = useMemo(
        () => [
            {
                title: `Add New ${name}`,
                value: "add",
            },
            ...options,
        ],
        options,
    );

    const parseInputValue = (value: string) => {
        if (value === newOptions[0].title) {
            return "";
        }

        return value;
    };

    return (
        <AutocompleteMui
            className={className}
            onChange={(e, value) => onChange(value?.value || "")}
            options={newOptions}
            getOptionLabel={({ title }) => title}
            getOptionSelected={(option, val) => option.value === val.value}
            renderOption={({ title, value }) => {
                if (value === "add") {
                    return (
                        <>
                            <AddIcon
                                style={{
                                    marginRight: 15,
                                    color: green["A700"],
                                }}
                            />
                            {title}
                        </>
                    );
                }

                return title;
            }}
            renderInput={(params) => {
                const inputProps = params.inputProps as { value: string };

                return (
                    <TextField
                        {...params}
                        label={name}
                        variant="standard"
                        inputProps={{
                            ...params.inputProps,
                            value: parseInputValue(inputProps.value),
                        }}
                    />
                );
            }}
        />
    );
};

export default Autocomplete;
