import { cn } from "@/src/lib/utils";
import { Button } from "../ui/button";

function LoginButton({ className }: { className?: string }) {
    return <Button className={cn("hover:cursor-pointer", className)}>Pieslēgties</Button>;
}

export default LoginButton;
