import Link from "next/link";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  categories: string[];
  subcategories: string[];
}

interface ProductCardProps {
  product: Product;
  showCategories?: boolean;
}

export default function ProductCard({
  product,
  showCategories = true,
}: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
    >
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
            Save ৳{product.discount}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xl font-bold text-gray-900">
            ৳ {product.price}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-gray-400 line-through">
              ৳ {product.originalPrice}
            </span>
          )}
        </div>
        {showCategories && (
          <div className="mt-2 flex flex-wrap gap-1">
            {product.categories.map((category) => (
              <span
                key={category}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
              >
                {category}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
