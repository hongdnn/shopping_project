"use client";

import { Product } from "@/app/models";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";

const colors = [
  { name: "Black", color: "bg-gray-800" },
  { name: "Gray", color: "bg-gray-500" },
  { name: "Light Gray", color: "bg-gray-300" },
  { name: "Beige", color: "bg-amber-100" },
  { name: "Rose", color: "bg-rose-200" },
];

export default function ProductDetailPage(props: { params: { id: string } }) {
  const params = props.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  useEffect(() => {
    fetchProduct(params.id);
  }, []);

  const fetchProduct = async (productId: string) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/products/${productId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    setProduct(response.data);
  };

  return (
    <main className="min-h-screen">
      <div className="bg-white p-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Sonos</h2>
          <div className="flex justify-center gap-6">
            <span>Headphones</span>
            <span>Speakers</span>
            <span>Earbuds</span>
            <span>Home Audio</span>
          </div>
          <button
            onClick={handleLogout}
            className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        {product ? (
          <div className="mt-8 grid grid-cols-2 gap-6 pr-20">
            <div className="relative flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.name}
                height={500}
                width={500}
                className="relative h-auto w-2/3 object-cover"
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold">{product.name}</h2>
              <p className="mt-3">{product.category.name}</p>
              <p className="my-4 text-xl font-semibold">$ {product.price}</p>
              <div className="flex items-center gap-6">
                <span className="font-semibold">Color:</span>
                <div className="flex gap-4">
                  {colors.map((color, index) => (
                    <div
                      key={color.name}
                      onClick={() => setSelectedColor(index)}
                      className={`flex cursor-pointer items-center justify-center rounded-lg border-1 border-gray-300 px-4 py-2 hover:bg-gray-200 ${selectedColor == index ? "bg-black text-white" : null}`}
                    >
                      {color.name}
                    </div>
                  ))}
                </div>
              </div>
              <div className="my-4 flex gap-6">
                <span className="font-semibold">Rating:</span>
                <span>{product.starRating}</span>
              </div>
              <span className="text-xl font-semibold">Quantity</span>
              <div className="my-4 flex gap-4">
                <div className="flex h-15 items-center justify-center rounded-full border-1 border-gray-300 px-14 text-2xl">
                  1
                </div>
                <div className="flex h-15 w-15 items-center justify-center rounded-full border-1 border-gray-300 text-2xl">
                  -
                </div>
                <div className="flex h-15 w-15 items-center justify-center rounded-full border-1 border-gray-300 text-2xl">
                  +
                </div>
              </div>
              <button className="relative my-5 w-full rounded-full bg-black py-4 text-2xl font-semibold text-white">
                Buy Now
              </button>
              <button className="relative my-5 w-full rounded-full border-1 py-4 text-2xl font-semibold">
                Add To Cart
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
