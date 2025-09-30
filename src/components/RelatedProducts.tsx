import ProductCard from '@/components/ProductCard';

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

interface RelatedProductsProps {
  currentProductId: number;
  currentProductCategories: string[];
  products: Product[];
  limit?: number;
}

export default function RelatedProducts({ 
  currentProductId, 
  currentProductCategories,
  products,
  limit = 10 
}: RelatedProductsProps) {
  const relatedProducts = products
    .filter(p => {
      if (p.id === currentProductId) return false;
      
      
      return p.categories.some(cat => currentProductCategories.includes(cat));
    })
    .slice(0, limit);

  const displayProducts = relatedProducts.length > 0 
    ? relatedProducts 
    : products.filter(p => p.id !== currentProductId).slice(0, limit);

  if (displayProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
          RELATED PRODUCTS
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {displayProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              showCategories={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}