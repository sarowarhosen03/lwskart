export default function ProductScaffolding({ count = 6 }) {
    return Array(count)
        .fill(null)
        .map((_i, index) => <ProductItemScaffolding key={index} />);
}
function ProductItemScaffolding() {
    return (
        <div className="group row-span-3 grid animate-pulse grid-rows-subgrid overflow-hidden rounded bg-white shadow">
            <div className="relative  bg-gray-200">
                <div className="h-64 w-full bg-gray-300"></div>
                {/* <!-- Image Placeholder --> */}
            </div>
            <div className="px-4 pb-3 pt-4">
                <div className="mb-2 h-6 rounded bg-gray-300"></div>
                <div className="mb-1 flex items-baseline space-x-2">
                    <div className="h-6 w-20 rounded bg-gray-300"></div>
                    <div className="h-6 w-10 rounded bg-gray-200"></div>
                </div>
                <div className="flex items-center">
                    <div className="flex gap-1 text-sm text-yellow-400">
                        <div className="h-4 w-4 rounded-full bg-gray-200"></div>
                        <div className="h-4 w-4 rounded-full bg-gray-200"></div>
                        <div className="h-4 w-4 rounded-full bg-gray-200"></div>
                        <div className="h-4 w-4 rounded-full bg-gray-200"></div>
                        <div className="h-4 w-4 rounded-full bg-gray-200"></div>
                    </div>
                    <div className="ml-3 h-4 w-10 rounded bg-gray-200"></div>
                </div>
            </div>
            <div className="block w-full rounded-b border bg-gray-200 py-1 text-center text-white transition hover:bg-transparent hover:text-primary"></div>
        </div>
    );
}
