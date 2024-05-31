import { useEffect, useState } from "react";

export default function QuantityCounter({ quantity, setQuantity, stock }) {
  const [inputValue, setInputValue] = useState(quantity);

  useEffect(() => {
    setInputValue(quantity);
  }, [quantity, setInputValue]);
  const handleInputChange = (e) => {
    const value = Math.max(1, Math.min(Number(e.target.value), stock));
    setQuantity(value);
  };

  const increment = () => {
    setQuantity((prev) => Math.max(1, Math.min(prev + 1, stock)));
  };

  const decrement = () => {
    setQuantity((prev) => Math.max(1, Math.min(prev - 1, stock)));
  };

  return (
    <div className="mt-4">
      <h3 className="mb-1 text-sm uppercase text-gray-800">Quantity</h3>
      <div className="flex w-max divide-x divide-gray-300 border border-gray-300 text-gray-600">
        <div
          onClick={decrement}
          className="flex h-8 w-8 cursor-pointer select-none items-center justify-center text-xl"
        >
          -
        </div>
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          // onBlur={handleBlur}
          className="flex h-8 w-12 items-center justify-center border-none text-center text-base"
          min="1"
          max={stock}
        />
        <div
          onClick={increment}
          className="flex h-8 w-8 cursor-pointer select-none items-center justify-center text-xl"
        >
          +
        </div>
      </div>
    </div>
  );
}
