import Link from "next/link";
import Image from "next/image";

export default function Catalog() {
  const catalogItems = [
    {
      id: 1,
      title: "T-Shirt and Trouser",
      image:
        "https://deenfashionbd.com/public/storage/images/banner/vcfIdFzDG6I9ZNvvHlI48ofFL9QP83vSxmbyrfhP.jpg",
      link: "#hero",
    },
    {
      id: 2,
      title: "Kids T-shirt",
      image:
        "https://deenfashionbd.com/public/storage/images/banner/IuFTS1LmSn1HszBj62qnf1WybuwMbbpS4rpJ02AP.jpg",
      link: "#hero",
    },
    {
      id: 3,
      title: "Half Sleeve T-shirt",
      image:
        "https://deenfashionbd.com/public/storage/images/banner/qgeMueIzENLOdlhOHak4G0JiWMEoALRkAAPIhRyJ.jpg",
      link: "#hero",
    },
    {
      id: 4,
      title: "Calligraphy T-Shirt",
      image:
        "https://deenfashionbd.com/public/storage/images/banner/3cD0cYNuRAF4aLhAQFvSuQJbGMeeKix10xhmynQX.jpg",
      link: "#hero",
    },
    {
      id: 5,
      title: "Full Sleeve",
      image:
        "https://deenfashionbd.com/public/storage/images/banner/Hao04eoaXcqKIhls8NTdZKNkhf1NPIal5GykSnLX.jpg",
      link: "#hero",
    },
    {
      id: 6,
      title: "Polo T-shirt",
      image:
        "https://deenfashionbd.com/public/storage/images/banner/mhMddey9RPJra5z8jv2JLw27ttCeKjLqZDVNWPrr.jpg",
      link: "#hero",
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {catalogItems.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white text-2xl md:text-3xl font-bold">
                    {item.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
