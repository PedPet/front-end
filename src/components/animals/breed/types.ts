export interface BreedState {
    breed: string;
    breeder: string;
    variety: string;
    colour: string;
    pattern: string;
    genus: string;
    species: string;
    subspecies: string;
    gestationPeriod: string;
    eyeColour: string;
    furType: string;
    earType: string;
    temperament: string;
    faults: string;
}

export type Props = BreedState & {
    onChange: (state: BreedState) => void;
};
