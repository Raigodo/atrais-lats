import { cn } from "@/src/lib/utils";
import { buttonVariants } from "../ui/button";
import Link from "next/link";

function LoginButton({ className }: { className?: string }) {
    return (
        <Link className={cn(buttonVariants(), className)} href={"/auth/login"}>
            Pieslēgties
        </Link>
    );
}

export default LoginButton;
