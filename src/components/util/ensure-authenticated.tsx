"use server";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

async function EnsureAuthenticated({ children }: { children: ReactNode }) {
    const session = await getServerSession();

    if (session) return children;
    else return redirect("/");
}

export default EnsureAuthenticated;
