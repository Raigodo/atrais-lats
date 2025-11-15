"use server";

import { revalidatePath } from "next/cache";

export async function toggleBookmark(formData: FormData) {
    revalidatePath("/currencies");
}
