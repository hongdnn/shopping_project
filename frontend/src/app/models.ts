interface Category {
  id: number;
  name: string;
  image: string;
}

interface Product {
  id: number;
  name: string;
  image: string;
  category: Category;
  starRating: number;
  price: number;
}

export type { Category, Product };