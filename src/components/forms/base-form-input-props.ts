export type BaseFormInputProps<T> = {
    name: string;
    value?: T;
    onChange?: (value: T) => void;
    message?: string;
};
