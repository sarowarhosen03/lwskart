"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function redirectFromServer(url, path = []) {
  path.forEach((path) => {
    revalidatePath(path);
  });
  redirect(url);
}
