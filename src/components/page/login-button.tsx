"use client";

import { cn } from "@/src/lib/utils";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

function LoginButton({ className }: { className?: string }) {
    return (
        <Button className={cn("hover:cursor-pointer", className)} onClick={() => signIn("github")}>
            Pieslēgties
        </Button>
    );
}

export default LoginButton;
