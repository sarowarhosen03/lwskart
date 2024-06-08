import ImageGalary from "@/app/[lang]/product/[productId]/ImageGalary";
import RatingStart from "@/components/ui/RatingStart";
import { getSlug } from "@/utils/slugify";
import Link from "next/link";
import ProductAction from "./ProductAction";
import ShareProduct from "./ShareProduct";

export default async function ProductDetails({
  productInfo,
  lang,
  dict,
  productdict,
}) {
  const {
    id,
    image,
    name,
    ratings,
    reviewsNumber,
    availability,
    brand,
    description,
    sku,
    category,
    price,
    discount_price,
    details,
    stock,
    soldCount,
  } = productInfo;

  const url = `${
    process.env.NEXT_PUBLIC_SITE_URL
  }/${lang}/product/${getSlug({ name, sku })}`;
  return (
    <>
      <div className="container grid grid-cols-2 gap-6">
        <ImageGalary image={image} />
        <div>
          <h2 className="mb-2 text-3xl font-medium uppercase">{name}</h2>
          <div className="mb-4 flex items-center">
            <div className="flex gap-1 text-sm text-yellow-400">
              <RatingStart count={ratings} />
            </div>
            <div className="ml-3 text-xs text-gray-500">
              ({reviewsNumber} Reviews)
            </div>
          </div>
          <div className="space-y-2">
            <p className="space-x-2 font-semibold text-gray-800">
              <span>Availability: </span>
              {availability ? (
                <span className="text-green-700">
                  {productdict.inStock} ({stock})
                </span>
              ) : (
                <span className="text-red-600">Out Of Stock</span>
              )}
            </p>
            <p className="space-x-2">
              <span className="font-semibold text-gray-800">
                {dict.brand}:{" "}
              </span>
              <span className="text-gray-600">{brand.name}</span>
            </p>
            <p className="space-x-2">
              <span className="font-semibold text-gray-800">
                {dict.category}:{" "}
              </span>
              <Link
                href={`/shop?category=${category.name}`}
                className="text-gray-600 hover:underline"
              >
                {category.name}
              </Link>
            </p>
            {availability && (
              <p className="space-x-2">
                <span className="font-semibold text-gray-800">
                  {" "}
                  {productdict.soldCount}:{" "}
                </span>
                <span className="text-gray-600">{soldCount}</span>
              </p>
            )}
            <p className="space-x-2">
              <span className="font-semibold text-gray-800">{dict.sku}: </span>
              <span className="text-gray-600">{sku}</span>
            </p>
          </div>
          <div className="mb-1 mt-4 flex items-baseline space-x-2 font-roboto">
            <p className="text-xl font-semibold text-primary">
              ${discount_price}
            </p>
            <p className="text-base text-gray-400 line-through">${price}</p>
          </div>
          <p className="mt-4 font-bold text-gray-600">{description}</p>
          <ProductAction
            stock={stock}
            availability={availability}
            productId={id}
            productdict={productdict}
          />
          <ShareProduct url={url} name={name} />
        </div>
      </div>
      <div className="container mt-3 pb-16">
        <h3 className="w-fit border-b-2 border-gray-200 pb-3 font-roboto text-xl font-medium text-gray-800">
          {dict.productDetails}
        </h3>
        <div className="w-3/5 pt-6">
          <div className="text-gray-600">
            {Object.entries(details).map(([key, value], i) => {
              return (
                <div className=" flex" key={i}>
                  <h2 className="text-lg font-bold">{key}- :</h2>
                  <p>{value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
