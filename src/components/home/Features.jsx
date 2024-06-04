import Image from "next/image";

export default function Features({
  feature: { shipping, order, money, ret, support, customer },
}) {
  return (
    <div className="container py-16">
      <div className="mx-auto grid w-10/12 grid-cols-1 justify-center gap-6 md:grid-cols-3">
        <div className="flex  items-center justify-center  gap-5 rounded-sm border border-primary px-3 py-6 shadow-md hover:shadow-xl">
          <Image
            height={12}
            width={12}
            src="/assets/images/icons/delivery-van.svg"
            alt="Delivery"
            className="h-12 w-12 object-contain"
          />
          <div>
            <h4 className="text-lg font-medium capitalize">{shipping}</h4>
            <p className="text-sm text-gray-500">{order}</p>
          </div>
        </div>
        <div className="flex  items-center justify-center  gap-5 rounded-sm border border-primary px-3 py-6 shadow-md hover:shadow-xl">
          <Image
            height={12}
            width={12}
            src="/assets/images/icons/money-back.svg"
            alt="Delivery"
            className="h-12 w-12 object-contain"
          />
          <div>
            <h4 className="text-lg font-medium capitalize">{money}</h4>
            <p className="text-sm text-gray-500">{ret}</p>
          </div>
        </div>
        <div className="flex items-center justify-center  gap-5 rounded-sm border border-primary px-3 py-6 shadow-md hover:shadow-xl">
          <Image
            height={12}
            width={12}
            src="/assets/images/icons/service-hours.svg"
            alt="Delivery"
            className="h-12 w-12 object-contain"
          />
          <div>
            <h4 className="text-lg font-medium capitalize">{support}</h4>
            <p className="text-sm text-gray-500">{customer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
