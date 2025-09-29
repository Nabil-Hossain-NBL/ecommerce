"use client";
import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, User, ChevronDown } from "lucide-react";

export default function NavBar() {
  const [isShopOpen, setIsShopOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <div className="bg-[#1a1a4d] text-white px-2 py-1 rounded font-bold text-xl">
                D
              </div>
              <span className="ml-1 font-semibold text-gray-800">
                DEEN <span className="text-blue-500">FASHION</span>
              </span>
            </div>
          </Link>

          <div className="relative">
            <button
              onClick={() => setIsShopOpen(!isShopOpen)}
              className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 font-medium"
            >
              <span>Shop</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {isShopOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <Link
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Men
                </Link>
                <Link
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Women
                </Link>
                <Link
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Accessories
                </Link>
              </div>
            )}
          </div>

          <div className="flex-1 max-w-2xl mx-8">
            <input
              type="text"
              placeholder="Search Your Products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-6">
           
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-gray-900" />
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>

            <Link href="#">
              <User className="w-6 h-6 text-gray-700 hover:text-gray-900" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
