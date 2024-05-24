"use client";
import CategoryItem from "@/components/home/CategoryItem";
import Alert from "@/components/ui/Alert";
import getCategories from "@/lib/dbQueries/categoryQuery";
import Image from "next/image";
import { useState } from "react";
import expandIcon from "../../../public/assets/images/icons/expand.svg";
export default function MoreCatergoris(props) {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  async function fetchAllCategories() {
    try {
      setError(null);
      const res = await getCategories({
        page: 2,
        limit: 6,
      });
      if (res) {
        return setCategories(res);
      }
      setError("No More Category found");
    } catch (error) {
      setError(error?.message);
    }
  }

  return categories.length === 0 ? (
    <>
      <div className="col-span-3 flex w-full flex-col items-center ">
        <Image
          onClick={fetchAllCategories}
          src={expandIcon}
          className="w-10  cursor-pointer  hover:bg-red-100"
          alt={"show more"}
        />
      </div>
      {error && (
        <div className="col-span-3 flex w-full flex-col items-center ">
          <Alert variant="danger" message={error} />
        </div>
      )}
    </>
  ) : (
    categories.map((category) => (
      <CategoryItem key={category.id} {...category} />
    ))
  );
}
