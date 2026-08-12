import React, { useState, useEffect } from 'react';
import { Star, ShoppingCart, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProductPrice, productHasUiDiscount, getProductDiscountPercent } from '../utils/pricing';
import { fetchProducts } from '../api';
import { productHasCategory } from '../constants/productCategories';

const ProductGridSection = ({ addToCart, title, categories, viewMoreLink }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const data = await fetchProducts();
        if (!cancelled) setProducts(Array.isArray(data) ? data : []);
      } catch {
        if (!cancelled) setProducts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = products.filter((p) => categories.some((c) => productHasCategory(p, c)));
  const visibleProducts = filtered.slice(0, 8);

  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      discountedPrice: getProductPrice(product),
      image: product.image || product.images?.[0],
    });
  };

  if (!loading && visibleProducts.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold text-gray-900">{title}</h2>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-10 h-10 text-biomed-teal animate-spin mb-4" />
            <p className="text-gray-500 text-lg">Loading products…</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {visibleProducts.map((product) => (
                <Link
                  key={`product-${product.id}`}
                  to={`/product/${product.id}`}
                  className="bg-white border rounded-lg p-4 hover:shadow-lg transition-shadow block cursor-pointer"
                >
                  <div className="h-48 rounded-lg mb-4 flex items-center justify-center bg-gray-50 overflow-hidden relative">
                    {(product.image || product.images?.[0]) ? (
                      <img
                        src={product.image || product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-contain hover:scale-105 transition-transform"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">No image</span>
                    )}
                    {productHasUiDiscount(product) && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                        -{getProductDiscountPercent(product)}%
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 h-12 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < Math.floor(product.rating || 0)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.reviews ?? 0})</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    {productHasUiDiscount(product) && (
                      <span className="text-gray-500 line-through text-sm">Rs. {product.originalPrice}</span>
                    )}
                    <span className="text-xl font-bold text-biomed-teal">
                      Rs. {getProductPrice(product)}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product);
                    }}
                    className="w-full bg-biomed-navy hover:bg-biomed-navy/90 text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                </Link>
              ))}
            </div>

            <div className="flex justify-center mt-10">
              <Link
                to={viewMoreLink}
                className="inline-block bg-biomed-teal hover:bg-biomed-navy text-white font-semibold py-3 px-10 rounded-lg transition-colors"
              >
                View More
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductGridSection;
