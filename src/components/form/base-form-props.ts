export type BaseFormProps = {
    action: (data: FormData) => Promise<void> | void;
};

export type BaseServerAction<T extends Record<string, unknown>> = (
    prevState: unknown,
    data: FormData
) => Promise<BaseServerActionState<T>>;

export type BaseServerActionState<T extends Record<string, unknown>> = {
    success: boolean;
    errors: {
        [K in keyof T]?: string;
    } & {
        _global?: string[];
    };
};
