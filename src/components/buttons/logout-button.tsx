import { cn } from "@/src/lib/utils";
import { Button } from "../ui/button";

function LogoutButton({ className }: { className?: string }) {
    return <Button className={cn("hover:cursor-pointer", className)}>Atslēgties</Button>;
}

export default LogoutButton;
