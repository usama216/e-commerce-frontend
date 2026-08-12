import React, { useState, useEffect } from 'react';
import { Star, ShoppingCart, Grid, List, Loader2 } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { getProductPrice, productHasUiDiscount, getProductDiscountPercent } from '../utils/pricing';
import { fetchProducts } from '../api';
import {
  PRODUCT_NAV_CATEGORIES,
  OFFER_NAV_CATEGORIES,
  OFFER_CATEGORY_OPTIONS,
  normalizeCategorySlug,
  productHasCategory,
  productInOfferSection,
} from '../constants/productCategories';

const ProductsPage = ({ addToCart, variant }) => {
  const isOffers = variant === 'offers';
  const { category } = useParams();
  const [priceRange, setPriceRange] = useState([0, 4500]);
  const [viewMode, setViewMode] = useState('grid');
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [sortBy, setSortBy] = useState('bestselling');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsError, setProductsError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const data = await fetchProducts();
        if (!cancelled) {
          setProducts(Array.isArray(data) ? data : []);
          setProductsError('');
        }
      } catch (err) {
        if (!cancelled) {
          setProductsError(err.message || 'Failed to load products');
          setProducts([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = isOffers ? OFFER_NAV_CATEGORIES : PRODUCT_NAV_CATEGORIES;

  const getCategoryTitle = () => {
    if (isOffers && !category) return 'Offers & Discounts';
    if (isOffers && category) {
      const match = OFFER_NAV_CATEGORIES.find((cat) => normalizeCategorySlug(cat) === category);
      if (match) return match;
    }
    if (!category) return 'All Products';
    const match = PRODUCT_NAV_CATEGORIES.find((cat) => normalizeCategorySlug(cat) === category);
    if (match) return match;
    return category.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const getHeroSubtitle = () => {
    if (isOffers) return "Looking for an amazing discount offer? We bring to you some of the most exciting offers & discounts on your favorite products. Grab your favorite deal today and kick-start your journey of fitness & wellness.";
    return "Every day is a new challenge & to keep up you need your daily dose of energy. BIOMED's health care products help you keep energetic, active & ready for any stage of life.";
  };

  const filteredProducts = React.useMemo(() => {
    if (isOffers) {
      const offerProducts = products.filter(productInOfferSection);
      if (!category || category === 'all-offers') return offerProducts;

      const selectedCategory = OFFER_CATEGORY_OPTIONS.find(
        (cat) => normalizeCategorySlug(cat) === category
      );
      if (!selectedCategory) return offerProducts;

      return offerProducts.filter((product) => productHasCategory(product, selectedCategory));
    }

    if (!category || category === 'all-products') return products;

    const selectedCategory = PRODUCT_NAV_CATEGORIES.find(
      (cat) => normalizeCategorySlug(cat) === category
    );

    if (!selectedCategory || selectedCategory === 'All Products') return products;

    return products.filter((product) => productHasCategory(product, selectedCategory));
  }, [category, products, isOffers]);

  return (
    <div className="min-h-screen bg-gray-50">
      {isOffers ? (
        <>
          {/* Offers Hero Image */}
          <section className="relative w-full overflow-hidden bg-gray-100">
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/8] md:aspect-[21/9] lg:h-[700px] lg:aspect-auto">
              <img
                src="/assets/hero-section-banner/banner-image-15-1.jpeg"
                alt="Offers & Discounts"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </div>
          </section>
          {/* Offers Description */}
          <section className="py-8 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <h1 className="text-3xl font-bold text-biomed-navy mb-4">{getCategoryTitle()}</h1>
              <p className="text-gray-700 text-lg leading-relaxed max-w-4xl">
                {getHeroSubtitle()}
              </p>
            </div>
          </section>
        </>
      ) : (
        /* Products Hero Banner */
        <div className="bg-gradient-to-r from-blue-100 to-teal-100 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">{getCategoryTitle()}</h1>
            <p className="text-xl text-gray-700">
              {getHeroSubtitle()}
            </p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {productsError && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800">
            {productsError}
          </div>
        )}
        <div className="grid md:grid-cols-4 gap-8">
          {/* Left Sidebar - Filters */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-4">
              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-4">CATEGORIES</h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {categories.map((cat, idx) => {
                    const categorySlug = normalizeCategorySlug(cat);
                    const isAllLink = cat === 'All Products' || cat === 'All Offers';
                    const isActive = !category ? isAllLink : category === categorySlug;
                    return (
                      <Link
                        key={idx}
                        to={isAllLink ? (isOffers ? '/offers' : '/products') : (isOffers ? `/offers/${categorySlug}` : `/products/${categorySlug}`)}
                        className={`block py-2 px-3 rounded hover:bg-biomed-teal/10 transition-colors ${
                          isActive
                            ? 'bg-biomed-teal/20 font-semibold' 
                            : ''
                        }`}
                      >
                        {cat}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Availability */}
              <div className="mb-6 border-t pt-6">
                <h3 className="font-bold text-lg mb-4">AVAILABILITY</h3>
                <label className="flex items-center gap-2 mb-2">
                  <input type="checkbox" className="w-4 h-4" defaultChecked />
                  <span className="text-sm">In Stock (11)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm">Out Of Stock (0)</span>
                </label>
              </div>

              {/* Price Range */}
              <div className="border-t pt-6">
                <h3 className="font-bold text-lg mb-4">PRICE</h3>
                <div className="mb-4">
                  <input 
                    type="range" 
                    min="0" 
                    max="4500" 
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>Rs. {priceRange[0]}</span>
                    <span>Rs. {priceRange[1]}</span>
                  </div>
                </div>
                <button className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded font-semibold">
                  APPLY
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Products Grid */}
          <div className="md:col-span-3">
            {/* Controls Bar */}
            <div className="bg-white rounded-lg shadow p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold">VIEW AS</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-biomed-navy text-white' : 'bg-gray-100'}`}
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-biomed-navy text-white' : 'bg-gray-100'}`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold">ITEMS PER PAGE</label>
                  <select 
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                    className="border rounded px-3 py-1"
                  >
                    <option value="12">12</option>
                    <option value="20">20</option>
                    <option value="40">40</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold">SORT BY</label>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border rounded px-3 py-1"
                  >
                    <option value="bestselling">Best Selling</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'grid-cols-1 gap-4'}`}>
              {loading ? (
                <div className="col-span-full flex flex-col items-center justify-center py-24">
                  <Loader2 className="w-10 h-10 text-biomed-teal animate-spin mb-4" />
                  <p className="text-gray-500 text-lg">Loading products…</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">No products found in this category.</p>
                </div>
              ) : (
                filteredProducts.map((product) => (
                <Link 
                  key={product.id} 
                  to={`/product/${product.id}`}
                  className="bg-white rounded-lg shadow hover:shadow-xl transition-shadow overflow-hidden block cursor-pointer"
                >
                  <div className="relative">
                    <div className="h-64 bg-gray-50 flex items-center justify-center p-4">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    {product.inStock && productHasUiDiscount(product) && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        -{getProductDiscountPercent(product)}%
                      </div>
                    )}
                    {!product.inStock && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        Sold Out
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 h-12 line-clamp-2">{product.name}</h3>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">({product.reviews})</span>
                    </div>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

                    <div className="flex items-center gap-2 mb-3">
                      {productHasUiDiscount(product) && (
                        <span className="text-gray-500 line-through text-sm">Rs. {product.originalPrice}</span>
                      )}
                      <span className="text-xl font-bold text-biomed-teal">Rs. {getProductPrice(product)}</span>
                    </div>

                    <div className="flex gap-2">
                      <div className="flex-1 bg-gray-800 hover:bg-gray-900 text-white py-2 rounded text-sm font-semibold text-center">
                        VIEW PRODUCT
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart({ ...product, discountedPrice: getProductPrice(product) });
                        }}
                        disabled={!product.inStock}
                        className={`p-2 rounded ${
                          product.inStock 
                            ? 'bg-biomed-navy hover:bg-biomed-navy/90 text-white' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  </div>
                </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

