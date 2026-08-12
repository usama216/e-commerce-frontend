import React, { useState, useRef, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, ShoppingCart, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProductPrice, productHasUiDiscount, getProductDiscountPercent } from '../utils/pricing';
import { fetchProducts } from '../api';
import { productHasCategory } from '../constants/productCategories';

const TrendingProducts = ({ addToCart, title = 'TRENDING NOW', categories = null }) => {
  const scrollContainerRef = useRef(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
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

  const visibleProducts = categories
    ? products.filter((p) => categories.some((c) => productHasCategory(p, c)))
    : products;

  const duplicatedProducts =
    visibleProducts.length > 0 ? [...visibleProducts, ...visibleProducts, ...visibleProducts] : [];

  useEffect(() => {
    if (!isAutoScrolling || loading || visibleProducts.length === 0) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const maxScroll = container.scrollWidth / 3;

        if (container.scrollLeft >= maxScroll) {
          container.scrollLeft = 1;
        } else {
          container.scrollBy({
            left: 1,
            behavior: 'auto',
          });
        }
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isAutoScrolling, loading, visibleProducts.length]);

  const scrollLeft = () => {
    setIsAutoScrolling(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -320,
        behavior: 'smooth',
      });
    }
    setTimeout(() => setIsAutoScrolling(true), 5000);
  };

  const scrollRight = () => {
    setIsAutoScrolling(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 320,
        behavior: 'smooth',
      });
    }
    setTimeout(() => setIsAutoScrolling(true), 5000);
  };

  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      discountedPrice: getProductPrice(product),
      image: product.image || product.images?.[0],
    });
  };

  // Hide category sections entirely when they have no products.
  if (categories && !loading && visibleProducts.length === 0) return null;

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
        ) : visibleProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No products available right now.</p>
          </div>
        ) : (
          <div className="relative overflow-hidden">
            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
              onMouseEnter={() => setIsAutoScrolling(false)}
              onMouseLeave={() => setIsAutoScrolling(true)}
            >
              {duplicatedProducts.map((product, idx) => (
                <Link
                  key={`product-${product.id}-${idx}`}
                  to={`/product/${product.id}`}
                  className="w-[280px] min-w-[280px] max-w-[280px] bg-white border rounded-lg p-4 hover:shadow-lg transition-shadow flex-shrink-0 block cursor-pointer"
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
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 z-10 transition-all hover:scale-110"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 z-10 transition-all hover:scale-110"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingProducts;
