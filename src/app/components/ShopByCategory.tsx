import Link from "next/link";
import Image from "next/image";

interface Category {
  name: string;
  image: string;
}

export default function ShopByCategories() {
  const categories: Category[] = [
    {
      name: "Half Sleeve T-shirt",
      image:
        "https://deenfashionbd.com/public/storage/images/subCategory/ZYToAesRsdsW1822B0dZll280FqmAwTsD5amASyv.jpg",
    },
    {
      name: "Kids T-shirt",
      image: "https://deenfashionbd.com/public/storage/images/subCategory/hvbgvVMk2j2gc9LOjz2p17mSUlq39I6ZYNykwgtk.jpg",
    },
    {
      name: "Football Jersey",
      image: "https://deenfashionbd.com/public/storage/images/subCategory/VrpwmMvEKBtmpEMgl9K5aP1fYJJNFp0mRBIUYp6n.jpg",
    },
    {
      name: "Polo T-shirt",
      image: "https://deenfashionbd.com/public/storage/images/subCategory/Ph4exTupZUChKLJhN25ANmGajY6JjPo9L0HIGdy1.jpg",
    },
    {
      name: "Calligraphy T-Shirt",
      image: "https://deenfashionbd.com/public/storage/images/subCategory/bo5PXYUHuTBfIkrxYqa6hwpChU5PcnUJHEzSXVxa.jpg",
    },
    {
      name: "Sports T- shirt",
      image: "https://deenfashionbd.com/public/storage/images/subCategory/5f8kqZqx1umATm7VoyyBuzvLU7v36f5B4s21iphZ.jpg",
    },
    {
      name: "Sports Polo T-Shirt",
      image: "https://deenfashionbd.com/public/storage/images/subCategory/32ERx2mTza2n0mfPlBMIAtnqwzW5gHDTlAWDay3C.jpg",
    },
    {
      name: "Sports Trouser",
      image: "https://deenfashionbd.com/public/storage/images/subCategory/tCKbZSZhUbAjwU5hHTtjwvnYtVxunzqSA7oYAySU.jpg",
    },
    {
      name: "Joggers",
      image: "https://deenfashionbd.com/public/storage/images/subCategory/AZO9UCQrfgVrnJyBTtOhp0hWTGNovQQUrZ8Zom4O.jpg",
    },
    {
      name: "Winter Collection",
      image: "https://deenfashionbd.com/public/storage/images/subCategory/YGAubYsnJW7IOC0d2ke0hrxVcMac5Au9b1u2MO1E.jpg",
    },
  ];

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          SHOP BY CATEGORIES
        </h2>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category: Category, index: number) => (
            <Link key={index} href="#hero" className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                {/* Category Name Badge */}
                <div className="relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-white px-4 py-1 rounded-b-2xl text-sm font-medium text-gray-700 shadow-md inline-block max-w-[200px] truncate text-center">
                      {category.name}
                    </span>
                  </div>

                  {/* Product Image */}
                  <div className="aspect-square bg-gray-200 flex items-center justify-center">
                    <div className="w-full h-full relative">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
