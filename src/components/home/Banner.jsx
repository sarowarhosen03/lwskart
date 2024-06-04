import Link from "next/link";

export default function Banner({ dict }) {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat py-36"
      style={{
        backgroundImage: "url('/assets/images/banner-bg.jpg')",
      }}
    >
      <div className="container">
        <h1 className="mb-4 text-6xl font-medium capitalize text-gray-800">
          {dict.title}
        </h1>
        <p className="font-bold  capitalize">
          <span className=" px-2 py-1 text-2xl text-primary underline">
            Lwskart
          </span>{" "}
          {dict.subTitle}
        </p>
        <div className="mt-12">
          <Link
            href="/shop"
            className="rounded-md border border-primary bg-primary px-8 py-3 font-medium 
                text-white hover:bg-transparent hover:text-primary"
          >
            {dict.button}
          </Link>
        </div>
      </div>
    </div>
  );
}
