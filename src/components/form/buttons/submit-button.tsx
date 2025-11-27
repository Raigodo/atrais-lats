"use client";

import { cn } from "@/src/lib/utils";
import { Button, ButtonProps } from "../../ui/button";
import ProcessingOverlay from "../processing-overlay";
import { useFormStatus } from "react-dom";

function SubmitButton({ children, className, ...rest }: ButtonProps) {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            size={"default"}
            {...rest}
            className={cn("text-center", className)}
            inert={pending}
        >
            <ProcessingOverlay processing={pending}>{children ?? "Submit"}</ProcessingOverlay>
        </Button>
    );
}

export default SubmitButton;
