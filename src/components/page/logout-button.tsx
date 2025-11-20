"use client";

import { cn } from "@/src/lib/utils";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

function LogoutButton({ className }: { className?: string }) {
    return (
        <Button className={cn("hover:cursor-pointer", className)} onClick={() => signOut()}>
            Atslēgties
        </Button>
    );
}

export default LogoutButton;
