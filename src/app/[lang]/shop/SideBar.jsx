import SizeSelector from "@/components/shop/SizeSelector";
import getCategories from "@/lib/dbQueries/categoryQuery";
import { getSizes } from "@/lib/dbQueries/getProdcuts";
import { getDectionary } from "@/lib/getDictionary";
import CategorySelector, { AllCategoryBtn } from "./CategorySelector";
import PriceSelector from "./PriceSelector";

export default async function SideBar({ lang }) {
  const categories = await getCategories({ page: 1, limit: 10 });
  const sidebarDict = await getDectionary(lang, "sidebar");
  const sizes = await getSizes();

  return (
    <div className="overflow-hiddenb col-span-1 hidden rounded bg-white px-4 pb-6 shadow md:block">
      <div className="space-y-5 divide-y divide-gray-200">
        <div>
          <h3 className="mb-3 text-xl font-medium uppercase text-gray-800">
            {sidebarDict.categories}
          </h3>
          <div className="space-y-2">
            <AllCategoryBtn />

            {categories.map((category) => (
              <div key={category.id} className="flex items-center">
                <CategorySelector name={category.name} />
                <label
                  htmlFor={category.name}
                  className="cusror-pointer ml-3 text-gray-600"
                >
                  {category.name}
                </label>
                <div className="ml-auto text-sm text-gray-600">
                  ({category.product?.length})
                </div>
              </div>
            ))}
          </div>
        </div>

        <PriceSelector sidebarDict={sidebarDict} />
        <SizeSelector sizes={sizes} sidebarDict={sidebarDict} />
      </div>
    </div>
  );
}
