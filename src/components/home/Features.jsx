import Image from "next/image";

export default function Features() {
    return (
        <div className="container py-16">
            <div className="mx-auto grid w-10/12 grid-cols-1 justify-center gap-6 md:grid-cols-3">
                <div className="flex  shadow-md hover:shadow-xl  items-center justify-center gap-5 rounded-sm border border-primary px-3 py-6">
                    <Image
                        height={12}
                        width={12}
                        src="/assets/images/icons/delivery-van.svg"
                        alt="Delivery"
                        className="h-12 w-12 object-contain"
                    />
                    <div>
                        <h4 className="text-lg font-medium capitalize">Free Shipping</h4>
                        <p className="text-sm text-gray-500">Order over $200</p>
                    </div>
                </div>
                <div className="flex  shadow-md hover:shadow-xl  items-center justify-center gap-5 rounded-sm border border-primary px-3 py-6">
                    <Image
                        height={12}
                        width={12}
                        src="/assets/images/icons/money-back.svg"
                        alt="Delivery"
                        className="h-12 w-12 object-contain"
                    />
                    <div>
                        <h4 className="text-lg font-medium capitalize">Money Rturns</h4>
                        <p className="text-sm text-gray-500">30 days money returs</p>
                    </div>
                </div>
                <div className="flex shadow-md hover:shadow-xl  items-center justify-center gap-5 rounded-sm border border-primary px-3 py-6">
                    <Image
                        height={12}
                        width={12}
                        src="/assets/images/icons/service-hours.svg"
                        alt="Delivery"
                        className="h-12 w-12 object-contain"
                    />
                    <div>
                        <h4 className="text-lg font-medium capitalize">24/7 Support</h4>
                        <p className="text-sm text-gray-500">Customer support</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
