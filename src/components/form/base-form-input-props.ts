export type BaseFormInputProps<T> = {
    name: string;
    defaultValue?: T;
    value?: T;
    onChange?: (value: T) => void;
    message?: string;
};
