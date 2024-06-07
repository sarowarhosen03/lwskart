import { placeOrder } from "@/lib/actions/createOrder";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { customerInfo, items, totalPrice } = await req.json();
    const response = await placeOrder({ customerInfo, items, totalPrice });
    revalidatePath("/[lang]/user/invoice", "page");
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      data: error.toString(),
      message: "Internal Server Error",
    });
  }
}
