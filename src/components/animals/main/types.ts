export interface MainFormState {
    officialName: string;
    suffix: string;
    dob: string;
    petName: string;
    sex: string;
    neutered: string;
    breeders: string;
    owners: string;
    countryOfOrigin: string;
    countryOfResidence: string;
}

export type Props = MainFormState & {
    onChange: (state: MainFormState) => void;
};
