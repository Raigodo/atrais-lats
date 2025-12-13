import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

async function Layout({ children }: { children: ReactNode }) {
    const session = await getServerSession();

    if (session?.user !== undefined) {
        return redirect("/");
    }

    return (
        <main className="h-screen grid place-items-center bg-background2 p-8">
            <div className="relative w-full max-w-[1020px] h-fit bg-background rounded-4xl shadow-[0_60px_40px_-30px_rgba(0,0,0,0.27)]">
                {children}
            </div>
        </main>
    );
}

export default Layout;
