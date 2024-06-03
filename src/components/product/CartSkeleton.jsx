export default function CartSkeleton() {
  return (
    <div className="mb-4 flex animate-pulse items-center justify-between border-b pb-4">
      <div className="flex items-center">
        <div className="mr-4 h-4 w-4 rounded bg-gray-300"></div>
        <div className="h-24 w-24 bg-gray-300"></div>
        <div className="ml-4">
          <div className="mb-2 h-6 w-48 bg-gray-300"></div>
          <div className="mb-2 h-4 w-32 bg-gray-300"></div>
          <div className="h-6 w-24 bg-gray-300"></div>
        </div>
      </div>
      <div className="text-right">
        <div className="mt-2 flex items-center">
          <div className="mr-2 h-6 w-6 bg-gray-300"></div>
          <div className="mr-2 h-8 w-16 bg-gray-300"></div>
          <div className="mr-2 h-6 w-6 bg-gray-300"></div>
          <div className="ml-4 h-6 w-6 bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}
