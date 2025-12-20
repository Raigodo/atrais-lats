import { cn } from "@/src/lib/utils";
import { Input, InputProps } from "../../ui/input";
import ModalMessage from "../../ui/modal-message";
import { BaseFormInputProps } from "../base-form-input-props";

interface InputLineProps
    extends Omit<InputProps, "onChange" | "value" | "name">,
        BaseFormInputProps<string> {}

function InputProtectedLine({ message, className, ...rest }: InputLineProps) {
    return (
        <div className={cn("relative", className)}>
            <FormInput {...rest} className={cn(message && "pr-8")} />
            {message && (
                <div className={`absolute top-0 right-0 bottom-0`}>
                    <ModalMessage message={message} />
                </div>
            )}
        </div>
    );
}

export default InputProtectedLine;

type FormInputProps = Omit<InputLineProps, "message">;

function FormInput({ value, onChange, className, ...rest }: FormInputProps) {
    return (
        <Input
            type="password"
            value={value}
            onChange={(e) => onChange?.((e.target as HTMLInputElement).value)}
            className={cn("h-8 w-full", className)}
            {...rest}
        />
    );
}
