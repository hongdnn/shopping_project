"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Category, Product } from "./models";
import ProductCard from "./components/ProductCard";
import axios from "axios";


const Products: Product[] = [
  {
    id: 1,
    name: "Sonos Ultra Open Earbuds",
    image: "/earbud.jpg",
    category: { id: 4, name: "Earbuds", image: "/earbud.jpg" },
    starRating: 4.5,
    price: 299,
  },
  {
    id: 2,
    name: "Sonos Smart Speaker",
    image: "/speaker.jpg",
    category: { id: 2, name: "Speakers", image: "/speaker.jpg" },
    starRating: 4.5,
    price: 1000,
  },
  {
    id: 3,
    name: "Sonos Flex Portable Speaker",
    image: "/speaker.jpg",
    category: { id: 2, name: "Speakers", image: "/speaker.jpg" },
    starRating: 2.5,
    price: 700,
  },
  {
    id: 4,
    name: "Sonos Headphone",
    image: "/headphone.jpg",
    category: { id: 1, name: "Headphones", image: "/headphone.jpg" },
    starRating: 2.5,
    price: 499,
  },
    {
    id: 5,
    name: "Sonos Pro Audio",
    image: "/pro-audio.jpg",
    category: { id: 5, name: "Pro Audio", image: "/pro-audio.jpg" },
    starRating: 3.5,
    price: 175,
  },
]

const Categories: Category[] = [
  { id: 1, name: "Headphones", image: "/headphone.jpg" },
  { id: 2, name: "Sound Bar Speakers", image: "/speaker.jpg" },
  { id: 3, name: "Amplifier Woofer", image: "/speaker.jpg" },
  { id: 4, name: "Earbuds", image: "/earbud.jpg" },
  { id: 5, name: "Pro Audio", image: "/pro-audio.jpg" },
  { id: 6, name: "Home Theater", image: "/pro-audio.jpg" },
  { id: 7, name: "Home Theater", image: "/pro-audio.jpg" },
  { id: 8, name: "Home Theater", image: "/pro-audio.jpg" },
  { id: 9, name: "Home Theater", image: "/pro-audio.jpg" },
  { id: 10, name: "Home Theater", image: "/pro-audio.jpg" },
];

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      // Fake decoding the token to get username
      // Replace this with real JWT decoding in real apps
      const username = "admin"; // You can decode the token here if needed
      setUser(username);
      fetchCategories()
      fetchProducts()
      setLoading(false);
    }
  }, []);

  const fetchCategories = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_DOMAIN}/categories`,{
      headers: { 'Authorization': `Bearer ${token}`}
    })
    setCategories(response.data)
  }

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_DOMAIN}/products`,{
      headers: { 'Authorization': `Bearer ${token}`}
    })
    setProducts(response.data)
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white"></main>
    );
  }

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
        <div className="mt-8 flex h-[550px] items-center bg-[url('/sonos-image.jpg')] bg-cover bg-center p-8">
          <div className="w-1/2">
            <div className="border-1 items-center, inline-block justify-center rounded-full border-white px-4 py-2 text-white">
              <p className="text-xs">Premium Sound</p>
            </div>
            <h1 className="mt-4 text-4xl font-bold text-white">
              Unleash Powerful Sound - Anytime, Anywhere.
            </h1>
            <p className="mb-6 mt-4 text-white">
              Discover top-rated headphones, speakers wich rich bass,
              crystal-clear audio, and seamless wireless connection.
            </p>
            <button className="flex items-center gap-2 rounded-full bg-white px-8 py-4">
              Shop Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            </button>
          </div>
        </div>
        <p className="mt-8 text-lg font-semibold">Shop By Category</p>
        <div className="scrollbar-hide flex gap-7 overflow-x-auto">
          {categories.map((category) => (
            <div
              className="flex flex-col items-center"
              key={category.id}
              onClick={() => {}}
            >
              <div
                className={`bg-gray my-4 flex h-[200px] w-[200px] cursor-pointer items-center bg-[url(${category.image})] justify-center rounded-lg p-4 shadow-lg hover:shadow-xl`}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  width={150}
                  height={150}
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-semibold">{category.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-100 p-10">
        <p className="mt-8 mb-6 text-lg font-semibold">Our Bestsellers</p>
        <div className="grid grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="flex justify-center">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
