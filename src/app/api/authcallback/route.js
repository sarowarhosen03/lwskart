import { auth } from "@/auth/auth";
import { addToCart } from "@/lib/dbQueries/products";
import { toggleWishItem } from "@/lib/dbQueries/userQuery";
import { redirect } from "next/navigation";

export async function GET(req) {
  const searchPerams = req.nextUrl.searchParams;

  const { callback, type, id, quantity } = Object.fromEntries(searchPerams);
  let destination = "/en";
  const session = await auth();
  if (!session?.user) {
    return redirect("/login?error=credentialError");
  }

  try {
    if (type === "cart") {
      //if any add to cart task add item into cart
      if (!id || !quantity || !callback) {
        //ifa any of the required field is missing redirect to home page
      }
      const res = await addToCart(id, quantity);

      destination = encodeURIComponent(callback);
    } else if (type === "wish") {
      if (!id || !callback) {
        return redirect("/");
      }
      await toggleWishItem(id, "", true);
      destination = callback;
    } else {
      destination = callback ? callback : "/en";
    }
  } catch (error) {
    return redirect(
      process.env.NEXT_PUBLIC_SITE_URL + "/login?error=credentialError",
    );
  }
  return redirect(process.env.NEXT_PUBLIC_SITE_URL + callback);
}
