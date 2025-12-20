import { cn } from "@/src/lib/utils";
import SubmitButton from "../buttons/submit-button";
import { BaseFormProps } from "../base-form-props";
import { ReactNode } from "react";
import { Label } from "../../ui/label";
import { inputVariants } from "../../ui/input";

type CompactFormProps = BaseFormProps & {
    children: ReactNode;
    className?: string;
    renderAdditionalButton?: ReactNode;
};

function CompactForm({ action, children, className, renderAdditionalButton }: CompactFormProps) {
    return (
        <form
            action={action}
            className={cn("grid grid-rows-[minmax(0,1fr)_auto] gap-y-6", className)}
        >
            <div className="space-y-6 w-full">{children}</div>
            <div className="mt-2 flex justify-end gap-x-4">
                {renderAdditionalButton}
                <SubmitButton className="min-w-[20%] shadow-md">Submit</SubmitButton>
            </div>
        </form>
    );
}

function CompactFormRow({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <div className={cn("grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-4", className)}>
            {children}
        </div>
    );
}

function CompactFormField({
    label,
    children,
    className,
}: {
    children: ReactNode;
    label: string;
    className?: string;
}) {
    return (
        <div className={cn("flex flex-col gap-2", className)}>
            <Label>{label}</Label>
            {children}
        </div>
    );
}

function CompactFormInfoField({
    label,
    value,
    className,
}: {
    label: string;
    value: string | number;
    className?: string;
}) {
    return (
        <CompactFormField label={label} className={className}>
            <div className={cn(inputVariants({ inputSize: "sm" }))}>{value}</div>
        </CompactFormField>
    );
}

function CompactFormSection({
    label,
    children,
    className,
}: {
    children: ReactNode;
    label: string;
    className?: string;
}) {
    return (
        <div className={className}>
            <div className="border-primary border-l-4 ">
                <div className="border rounded-r-md">
                    <Label className="py-2 pl-3">{label}</Label>
                </div>
            </div>
            <div className="ml-2 space-y-6 border-l pt-2.5 pb-2 pl-2">{children}</div>
        </div>
    );
}

export { CompactForm, CompactFormField, CompactFormInfoField, CompactFormRow, CompactFormSection };
