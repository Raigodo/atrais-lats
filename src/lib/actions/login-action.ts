"use server";

import { redirect } from "next/navigation";
import { createSuccessResponse } from "../helper/response";

export async function loginAction(formData: FormData) {
    const name = formData.get("name");
    const email = formData.get("email");

    console.log("Form submitted:", { name, email });

    redirect("/currencies");

    return createSuccessResponse();
}
