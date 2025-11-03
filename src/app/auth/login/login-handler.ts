"use server";

import { redirect } from "next/navigation";

export async function handleLogin(formData: FormData) {
    const name = formData.get("name");
    const email = formData.get("email");

    console.log("Form submitted:", { name, email });

    redirect("/currencies");
}
