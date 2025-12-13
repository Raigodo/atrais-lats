"use client";

import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

function LogoutButton({ className }: { className?: string }) {
    return (
        <Button className={className} onClick={() => signOut()}>
            Sign Out
        </Button>
    );
}

export default LogoutButton;
