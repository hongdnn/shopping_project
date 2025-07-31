import React, { useState } from "react";
import { Star } from "lucide-react";
import { Product } from "../models";
import Image from "next/image";

const ProductCard = ({ product }: { product: Product }) => {
  const [selectedColor, setSelectedColor] = useState(0);

  const colors = [
    { name: "Black", color: "bg-gray-800" },
    { name: "Gray", color: "bg-gray-500" },
    { name: "Light Gray", color: "bg-gray-300" },
    { name: "Beige", color: "bg-amber-100" },
    { name: "Rose", color: "bg-rose-200" },
  ];

  return (
    <div className="w-80 rounded-2xl bg-white p-4 shadow-lg">
      {/* Product Image */}
      <div className="flex items-center justify-center ">
        <Image
          src={product.image}
          alt={product.name}
          width={200}
          height={200}
          className="object-cover"
        />
      </div>

      {/* Color Options */}
      <div className="my-6 flex justify-center gap-3">
        {colors.map((color, index) => (
          <button
            key={index}
            onClick={() => setSelectedColor(index)}
            className={`h-4 w-4 rounded-full border-2 transition-all ${
              selectedColor === index
                ? "border-gray-400 ring-2 ring-gray-300"
                : "border-gray-300"
            } ${color.color}`}
          />
        ))}
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm font-medium text-amber-600">
          {product.category.name}
          {/* Rating */}
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm font-semibold text-gray-900">
              {product.starRating}
            </span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>

        {/* Price */}
        <div className="pt-2">
          <span className="text-xl font-bold text-gray-900">
            {product.price}
          </span>
          <span className="ml-2 text-lg text-gray-500 line-through">$349</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
