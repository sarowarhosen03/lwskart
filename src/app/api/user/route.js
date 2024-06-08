// Import necessary modules
import { auth } from "@/auth/auth";
import { updateProfile } from "@/lib/dbQueries/userQuery";
import { uploadFile } from "@/lib/externel/storage";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
// Define the POST handler for the file upload
export const POST = async (req) => {
  try {
    const formData = await req.formData();

    const file = formData.get("file");

    const body = JSON.parse(formData.get("profile"));
    const session = await auth();
    let filename = "";

    if (file) {
      filename = await uploadFile(formData);
    }
    const newData = {
      ...body,
      image: filename ? filename : body.image,
    };
    await updateProfile(newData, session?.user?.id);
    const headerList = headers();
    const { pathname } = new URL(headerList.get("referer"));
    revalidatePath(pathname);
    revalidatePath(`/[lang]/user/checkout`, "page");
    return NextResponse.json({
      Message: "Success",
      status: 201,
      data: newData,
    });
  } catch (error) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }
};
