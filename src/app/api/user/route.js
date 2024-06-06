// Import necessary modules
import { auth } from "@/auth/auth";
import { updateProfile } from "@/lib/dbQueries/userQuery";
import fs from "fs";
import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import path from "path";
// Define the POST handler for the file upload
export const POST = async (req) => {
  try {
    const formData = await req.formData();

    const file = formData.get("file");

    const body = JSON.parse(formData.get("profile"));
    const session = await auth();
    let filename = "";
    if (file) {
      // Convert the file data to a Buffer
      const buffer = Buffer.from(await file.arrayBuffer());
      // Replace spaces in the file name with underscores
      filename = session?.user?.id + "-profile" + path.extname(file.name);
      const filePath = path.join(process.cwd(), "/public/user/" + filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      // Write the file to the specified directory (public/assets) with the modified filename
      await writeFile(filePath, buffer);
    }
    const newData = {
      ...body,
      image: filename ? filename : body.image,
    };
    await updateProfile(newData, session?.user?.id);
    const headerList = headers();
    const { pathname } = new URL(headerList.get("referer"));
    revalidatePath(pathname);
    revalidatePath(`/[lang]/user/checkout`);
    return NextResponse.json({
      Message: "Success",
      status: 201,
      data: newData,
    });
  } catch (error) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }
};
