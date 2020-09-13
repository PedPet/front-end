export interface IDFormState {
    registrationList: string;
    tattooTag: string;
    brandMark: string;
    microchipNumber: string;
    registrationBodies: string;
}

export type Props = IDFormState & {
    onChange: (state: IDFormState) => void;
};
