export type Props = {
    options: Option[];
    onChange: (value: string) => void;
    className: string;
    name: string;
    withAddNew: boolean;
    value: string;
};

export type Option = {
    title: string;
    value: string;
};
