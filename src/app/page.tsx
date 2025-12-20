"use server";

import { redirect } from "next/navigation";

async function Page() {
    return redirect("/currencies");
}

export default Page;
