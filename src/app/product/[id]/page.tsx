"use client";

import { useState } from "react";
import { notFound, useParams } from "next/navigation";
import { Package, ShoppingCart } from "lucide-react";
import RelatedProducts from "@/components/RelatedProducts";
import { products } from "@/app/shop/data";
import { cartStorage, orderStorage } from "@/lib/storage";

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    notFound();
  }

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  const sizes = ["M", "L", "XL", "XXL"];

  const sizeChart = [
    { size: "M", chest: 38, length: 27, sleeve: "-" },
    { size: "L", chest: 40, length: 28, sleeve: "-" },
    { size: "XL", chest: 42, length: 29, sleeve: "-" },
    { size: "XXL", chest: 44, length: 30, sleeve: "-" },
  ];

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }


    cartStorage.addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      image: product.image,
      categories: product.categories,
      subcategories: product.subcategories,
      quantity,
      selectedSize,
    });

    alert(`Added ${quantity} item(s) to cart - Size: ${selectedSize}`);
  };

  const handleOrderNow = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }


    cartStorage.addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      image: product.image,
      categories: product.categories,
      subcategories: product.subcategories,
      quantity,
      selectedSize,
    });


    const cartItems = cartStorage.getCartItems();
    const currentItem = cartItems.find(
      (item) => item.id === product.id && item.selectedSize === selectedSize
    );

    if (currentItem) {
      orderStorage.addOrder({
        total: currentItem.price * currentItem.quantity,
        items: [currentItem],
      });
    }

    alert(
      `Proceeding to checkout - ${quantity} item(s) - Size: ${selectedSize}`
    );

    window.location.href = '/dashboard#cart';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 text-sm text-gray-600">
          <span>Home</span>
          {product.categories.map((cat, idx) => (
            <span key={idx}> / {cat}</span>
          ))}
          <span className="text-gray-900 font-medium"> / {product.name}</span>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="space-y-4">
              <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.discount > 0 && (
                  <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold">
                      Save ৳{product.discount}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>

                <div className="flex flex-wrap gap-2 mb-4">
                  {product.categories.map((cat, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {cat}
                    </span>
                  ))}
                  {product.subcategories.map((sub, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {sub}
                    </span>
                  ))}
                </div>

                <div className="flex items-baseline gap-3 mb-6">
                  {product.originalPrice && (
                    <span className="text-gray-400 line-through text-xl">
                      ৳ {product.originalPrice}
                    </span>
                  )}
                  <span className="text-4xl font-bold text-gray-900">
                    ৳ {product.price}
                  </span>
                  {product.discount > 0 && (
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-md text-sm font-semibold">
                      Save ৳{product.discount}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Select Size:
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                        selectedSize === size
                          ? "border-blue-600 bg-blue-50 text-blue-600"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-sm font-semibold text-gray-700">
                  Code:{" "}
                </span>
                <span className="text-sm text-gray-600">{product.id}</span>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-4 py-3 hover:bg-gray-100 transition-colors"
                  >
                    −
                  </button>
                  <span className="px-6 py-3 font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-4 py-3 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Add To Cart
                </button>
              </div>

              <button
                onClick={handleOrderNow}
                className="w-full bg-indigo-600 text-white py-4 rounded-lg hover:bg-indigo-700 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <Package size={20} />
                Order Now
              </button>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-3">Product Details</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Engineered for breathability and comfort, this premium-quality
                  mesh fabric is crafted to deliver both performance and style.
                  Its lightweight structure ensures maximum airflow, while the
                  smooth surface is perfect for vibrant sublimation printing.
                </p>

                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    <strong>Material:</strong> 100% Mesh Fabrics
                  </li>
                  <li>
                    <strong>Fabric Type:</strong> Sublimation Print & Mesh
                    Fabric
                  </li>
                  <li>
                    <strong>GSM:</strong> 160
                  </li>
                  <li>
                    <strong>Fit & Feel:</strong> Regular fit with breathable and
                    soft-stretch comfort
                  </li>
                </ul>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">
                  Size Chart - In inches (Expected Deviation ± 3%)
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-3 px-4 text-left font-semibold">
                          Size
                        </th>
                        <th className="py-3 px-4 text-left font-semibold">
                          Chest (Round)
                        </th>
                        <th className="py-3 px-4 text-left font-semibold">
                          Length
                        </th>
                        <th className="py-3 px-4 text-left font-semibold">
                          Sleeve
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {sizeChart.map((row) => (
                        <tr key={row.size} className="hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{row.size}</td>
                          <td className="py-3 px-4">{row.chest}</td>
                          <td className="py-3 px-4">{row.length}</td>
                          <td className="py-3 px-4">{row.sleeve}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RelatedProducts
          currentProductId={product.id}
          currentProductCategories={product.categories}
          products={products}
          limit={10}
        />
      </div>
    </div>
  );
}
