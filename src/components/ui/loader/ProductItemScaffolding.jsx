export default function ProductItemScaffolding() {
    return (

        <div className="grid row-span-3 grid-rows-subgrid group overflow-hidden rounded animate-pulse bg-white shadow">

            <div className="relative  bg-gray-200">
                <div className="w-full h-64 bg-gray-300"></div>
                {/* <!-- Image Placeholder --> */}

            </div>
            <div className="px-4 pb-3 pt-4">
                <div className="h-6 mb-2 bg-gray-300 rounded"></div>
                <div className="mb-1 flex items-baseline space-x-2">
                    <div className="w-20 h-6 bg-gray-300 rounded"></div>
                    <div className="w-10 h-6 bg-gray-200 rounded"></div>
                </div>
                <div className="flex items-center">
                    <div className="flex gap-1 text-sm text-yellow-400">
                        <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                        <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                        <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                        <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                        <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="ml-3 w-10 h-4 bg-gray-200 rounded"></div>

                </div>
            </div>
            <div className="block w-full rounded-b border bg-gray-200 py-1 text-center text-white transition hover:bg-transparent hover:text-primary">

            </div>
        </div>

    )
}
