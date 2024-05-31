import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function useWish(wishItem, wishListed, setWishListed) {


    return [wishListed, setWishListed]
}
