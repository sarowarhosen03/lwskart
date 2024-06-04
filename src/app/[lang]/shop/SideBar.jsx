import getCategories from "@/lib/dbQueries/categoryQuery";
import CategorySelector from "./CategorySelector";
import PriceSelector from "./PriceSelector";

export default async function SideBar() {
  const categories = await getCategories({ page: 1, limit: 10 });

  return (
    <div className="overflow-hiddenb col-span-1 hidden rounded bg-white px-4 pb-6 shadow md:block">
      <div className="space-y-5 divide-y divide-gray-200">
        <div>
          <h3 className="mb-3 text-xl font-medium uppercase text-gray-800">
            Categories
          </h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center">
                <CategorySelector name={category.name} />

                <label
                  htmlFor={category.name}
                  className="cusror-pointer ml-3 text-gray-600"
                >
                  {category.name}
                </label>
                <div className="ml-auto text-sm text-gray-600">(15)</div>
              </div>
            ))}
          </div>
        </div>

        <PriceSelector />
        {/* <div className="pt-4">
          <h3 className="mb-3 text-xl font-medium uppercase text-gray-800">
            size
          </h3>
          <div className="flex items-center gap-2">
            <div className="size-selector">
              <input type="radio" name="size" id="size-xs" className="hidden" />
              <label
                for="size-xs"
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-sm border border-gray-200 text-xs text-gray-600 shadow-sm"
              >
                XS
              </label>
            </div>
            <div className="size-selector">
              <input type="radio" name="size" id="size-sm" className="hidden" />
              <label
                for="size-sm"
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-sm border border-gray-200 text-xs text-gray-600 shadow-sm"
              >
                S
              </label>
            </div>
            <div className="size-selector">
              <input type="radio" name="size" id="size-m" className="hidden" />
              <label
                for="size-m"
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-sm border border-gray-200 text-xs text-gray-600 shadow-sm"
              >
                M
              </label>
            </div>
            <div className="size-selector">
              <input type="radio" name="size" id="size-l" className="hidden" />
              <label
                for="size-l"
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-sm border border-gray-200 text-xs text-gray-600 shadow-sm"
              >
                L
              </label>
            </div>
            <div className="size-selector">
              <input type="radio" name="size" id="size-xl" className="hidden" />
              <label
                for="size-xl"
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-sm border border-gray-200 text-xs text-gray-600 shadow-sm"
              >
                XL
              </label>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
