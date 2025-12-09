"use client";

import { cn } from "@/src/lib/utils";
import { Button, ButtonProps } from "../../ui/button";
import ProcessingOverlay from "../processing-overlay";
import { useFormStatus } from "react-dom";

function SubmitButton({
    children,
    className,
    pending,
    ...rest
}: ButtonProps & { pending?: boolean }) {
    const { pending: formPending } = useFormStatus();
    const isButtonPending = pending === undefined ? formPending : pending;

    return (
        <Button
            type="submit"
            size={"default"}
            {...rest}
            className={cn("text-center", className)}
            inert={isButtonPending}
        >
            <ProcessingOverlay processing={isButtonPending}>
                {children ?? "Submit"}
            </ProcessingOverlay>
        </Button>
    );
}

export default SubmitButton;
