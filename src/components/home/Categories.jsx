import CategoryItem from "@/components/home/CategoryItem";
import getCategories from "@/lib/dbQueries/categoryQuery";

import MoreCatergoris from "@/components/home/MoreCatergoris";

export default async function Categories({ dict }) {
  const categories = await getCategories();

  return (
    <div className="container py-16">
      <h2 className="mb-6 text-2xl font-medium uppercase text-gray-800">
        {dict.category}
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {categories.map((category) => (
          <CategoryItem key={category.id} {...category} />
        ))}
        <MoreCatergoris />
      </div>
    </div>
  );
}
