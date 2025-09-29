"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { products, categories } from "./data";

type ExpandedSections = {
  [key: string]: boolean;
};

export default function ShopPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    []
  );
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    categories: true,
  });
  const [sortBy, setSortBy] = useState("newest");

  const toggleSection = (section: string) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
      // Remove subcategories when category is deselected
      const categorySubcats =
        categories.find((cat) => cat.name === category)?.subcategories || [];
      setSelectedSubcategories(
        selectedSubcategories.filter(
          (subcat) => !categorySubcats.includes(subcat)
        )
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const toggleSubcategory = (subcategory: string) => {
    if (selectedSubcategories.includes(subcategory)) {
      setSelectedSubcategories(
        selectedSubcategories.filter((s) => s !== subcategory)
      );
    } else {
      setSelectedSubcategories([...selectedSubcategories, subcategory]);
    }
  };

  // Filter products based on selected categories and subcategories
  const filteredProducts = products.filter((product) => {
    // If no filters are selected, show all products
    if (selectedCategories.length === 0 && selectedSubcategories.length === 0)
      return true;

    // Check category filter
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.some((category) =>
        product.categories.includes(category)
      );

    // Check subcategory filter
    const subcategoryMatch =
      selectedSubcategories.length === 0 ||
      selectedSubcategories.some((subcat) =>
        product.subcategories.includes(subcat)
      );

    return categoryMatch && subcategoryMatch;
  });

  // Sort products based on the selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
      default:
        return b.id - a.id;
    }
  });

  const itemCount = sortedProducts.length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside className="w-80 bg-gray-50 p-6 rounded-lg h-fit sticky top-4">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span>▼</span> Filters
          </h2>

          <div className="mb-6">
            <button
              onClick={() => toggleSection("categories")}
              className="w-full flex items-center justify-between font-semibold text-lg mb-3"
            >
              CATEGORIES
              {expandedSections.categories ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>

            {expandedSections.categories && (
              <div className="space-y-2 ml-2">
                {categories.map((category) => (
                  <div key={category.name}>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.name)}
                        onChange={() => toggleCategory(category.name)}
                        className="w-4 h-4"
                      />
                      <span className="font-medium">{category.name}</span>
                    </label>

                    {/* Show subcategories when category is selected */}
                    {selectedCategories.includes(category.name) &&
                      category.subcategories.length > 0 && (
                        <div className="ml-6 mt-2 space-y-2">
                          {category.subcategories.map((subcategory) => (
                            <label
                              key={subcategory}
                              className="flex items-center gap-2 cursor-pointer text-sm"
                            >
                              <input
                                type="checkbox"
                                className="w-4 h-4"
                                checked={selectedSubcategories.includes(
                                  subcategory
                                )}
                                onChange={() => toggleSubcategory(subcategory)}
                              />
                              <span>{subcategory}</span>
                            </label>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600 font-medium">{itemCount} ITEMS</p>
            <div className="flex items-center gap-3">
              <label className="text-gray-600 font-medium">Sort By :</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {sortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No products found matching your filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedSubcategories([]);
                }}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <Link
                  key={product.id}
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
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
