import React, { useState, useEffect } from 'react';
import { Star, Plus, Minus, ShoppingCart, ChevronDown, Loader2 } from 'lucide-react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductPrice, productHasUiDiscount, getProductDiscountPercent } from '../utils/pricing';
import { fetchProduct, fetchProductReviews, submitProductReview } from '../api';

const ProductDetailPage = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewForm, setReviewForm] = useState({ author_name: '', author_email: '', rating: 0, body: '' });
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    details: true,
    directions: true,
    ingredients: true,
    faqs: false,
    reviews: true,
    quality: false
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImage(0);
    setQuantity(1);
    setReviewForm({ author_name: '', author_email: '', rating: 0, body: '' });
    setReviewError('');
    setReviewSuccess('');
  }, [id]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setProduct(null);
      setError('');
      try {
        const p = await fetchProduct(id);
        if (!cancelled) {
          setProduct(p);
        }
      } catch (err) {
        if (!cancelled) {
          setProduct(null);
          setError(err.message || 'Failed to load product');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!id) return;
      setReviewsLoading(true);
      try {
        const data = await fetchProductReviews(id);
        if (!cancelled) setReviews(Array.isArray(data.reviews) ? data.reviews : []);
      } catch {
        if (!cancelled) setReviews([]);
      } finally {
        if (!cancelled) setReviewsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewError('');
    setReviewSuccess('');
    if (!reviewForm.rating || reviewForm.rating < 1) {
      setReviewError('Please select a rating');
      return;
    }
    setReviewSubmitting(true);
    try {
      await submitProductReview(id, {
        author_name: reviewForm.author_name,
        author_email: reviewForm.author_email,
        rating: reviewForm.rating,
        body: reviewForm.body,
      });
      setReviewSuccess('Thank you! Your review was submitted and will show shortly');
      setReviewForm({ author_name: '', author_email: '', rating: 0, body: '' });
    } catch (err) {
      setReviewError(err.message || 'Failed to submit review');
    } finally {
      setReviewSubmitting(false);
    }
  };

  const formatReviewDate = (d) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-PK', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-biomed-teal animate-spin mb-4" />
        <p className="text-gray-500 text-lg">Loading product…</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">{error || "The product you're looking for doesn't exist."}</p>
          <Link
            to="/products"
            className="inline-block bg-biomed-navy hover:bg-biomed-navy/90 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const galleryImages =
    product.images?.length > 0 ? product.images : product.image ? [product.image] : [];
  const mainImage = galleryImages[selectedImage] || galleryImages[0] || '';
  const cartImage = galleryImages[0] || product.image || '';
  const helps = Array.isArray(product.helps) ? product.helps : [];
  const ingredients = Array.isArray(product.ingredients) ? product.ingredients : [];
  const faqs = Array.isArray(product.faqs) ? product.faqs : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="grid md:grid-cols-2 gap-8 bg-white rounded-lg shadow p-6 mb-6">
          <div>
            <div className="sticky top-4">
              <div className="bg-gray-50 rounded-lg p-8 mb-3 flex items-center justify-center h-[500px] relative">
                {mainImage ? (
                  <img
                    src={mainImage}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="text-gray-400 text-sm">No image available</div>
                )}
                {product.inStock && productHasUiDiscount(product) && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded">
                    -{getProductDiscountPercent(product)}%
                  </div>
                )}
              </div>

              {galleryImages.length > 1 && (
                <div className="flex gap-3">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`flex-1 bg-gray-50 rounded-lg p-2 border-2 transition-colors ${
                        selectedImage === idx ? 'border-biomed-teal' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${idx + 1}`}
                        className="w-full h-16 object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h1>

            <div className="mb-3">
              {product.inStock ? (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  In Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  Out of Stock
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-600 ml-1">{product.reviews ?? 0} reviews</span>
              </div>
              <span className="text-xs text-gray-600">{product.questions ?? 0} questions</span>
            </div>

            <div className="mb-4 flex items-center gap-3">
              {productHasUiDiscount(product) && (
                <span className="text-gray-500 line-through text-lg">Rs. {product.originalPrice}</span>
              )}
              <span className="text-2xl font-bold text-biomed-teal">Rs. {getProductPrice(product)}</span>
            </div>

            {helps.length > 0 && (
              <div className="mb-4 bg-blue-50 p-3 rounded-lg">
                <h3 className="font-semibold text-sm mb-2">Helps to:</h3>
                <ul className="space-y-1">
                  {helps.map((help, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-biomed-teal text-xs mt-0.5">•</span>
                      <span className="text-xs text-gray-700">{help}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.packSize && (
              <div className="mb-3">
                <label className="block text-xs font-semibold mb-1">Pack Size:</label>
                <button className="px-4 py-1.5 bg-biomed-navy text-white rounded text-sm font-semibold">
                  {product.packSize}
                </button>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-xs font-semibold mb-1">Quantity:</label>
              <div className="flex items-center border rounded w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-1 text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="mb-4 bg-purple-50 p-3 rounded-lg">
              <p className="text-sm font-semibold text-purple-700">{product.wellnessCoins ?? 0} Wellness Coins</p>
              <a href="#" className="text-xs text-purple-600 underline">How it works?</a>
            </div>

            <div className="mb-4">
              <p className="text-base font-semibold">
                Subtotal:{' '}
                <span className="text-biomed-teal">
                  Rs. {getProductPrice(product) * quantity}
                </span>
              </p>
            </div>

            <div className="flex gap-3 mb-4">
              <button
                onClick={() =>
                  addToCart({
                    ...product,
                    quantity,
                    discountedPrice: getProductPrice(product),
                    image: cartImage,
                  })
                }
                disabled={!product.inStock}
                className={`flex-1 py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 ${
                  product.inStock
                    ? 'bg-gray-800 hover:bg-gray-900 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart size={16} />
                {product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
              </button>
              <button
                type="button"
                disabled={!product.inStock}
                onClick={() => {
                  if (!product.inStock) return;
                  addToCart(
                    {
                      ...product,
                      quantity,
                      discountedPrice: getProductPrice(product),
                      image: cartImage,
                    },
                    false
                  );
                  navigate('/checkout');
                }}
                className={`flex-1 py-2.5 rounded-lg font-semibold text-sm ${
                  product.inStock
                    ? 'bg-white border-2 border-gray-800 hover:bg-gray-50 text-gray-800'
                    : 'bg-gray-100 border-2 border-gray-300 text-gray-400 cursor-not-allowed'
                }`}
              >
                BUY IT NOW
              </button>
            </div>

            <div className="my-4 border rounded-lg overflow-hidden">
              <div className="border-b">
                <button
                  onClick={() => toggleSection('details')}
                  className="w-full flex items-center justify-between py-2 px-3 text-left hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-sm font-semibold">Product Details</h3>
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform duration-300 ${expandedSections.details ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedSections.details ? 'max-h-[1500px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-3 pb-2">
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {product.details || product.description || 'No details available.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b">
                <button
                  onClick={() => toggleSection('directions')}
                  className="w-full flex items-center justify-between py-2 px-3 text-left hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-sm font-semibold">Directions</h3>
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform duration-300 ${expandedSections.directions ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedSections.directions ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-3 pb-2">
                    <p className="text-xs text-gray-700">{product.directions || 'No directions available.'}</p>
                  </div>
                </div>
              </div>

              <div className="border-b">
                <button
                  onClick={() => toggleSection('ingredients')}
                  className="w-full flex items-center justify-between py-2 px-3 text-left hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-sm font-semibold">Ingredients</h3>
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform duration-300 ${expandedSections.ingredients ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedSections.ingredients ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-3 pb-2">
                    {ingredients.length > 0 ? (
                      <>
                        <p className="text-[10px] font-semibold mb-1">Serving Size: One (1) Tablet</p>
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-1 text-[10px]">Each Tablet Contains:</th>
                              <th className="text-left py-1 text-[10px]">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {ingredients.map((ingredient, idx) => (
                              <tr key={idx} className="border-b">
                                <td className="py-1 text-[10px]">{ingredient.name}</td>
                                <td className="py-1 text-[10px]">{ingredient.amount}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </>
                    ) : (
                      <p className="text-xs text-gray-700">No ingredients listed.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-b">
                <button
                  onClick={() => toggleSection('faqs')}
                  className="w-full flex items-center justify-between py-2 px-3 text-left hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-sm font-semibold">
                    FAQs{faqs.length > 0 ? ` (${faqs.length})` : ''}
                  </h3>
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform duration-300 ${expandedSections.faqs ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedSections.faqs ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-3 pb-2 space-y-3">
                    {faqs.length === 0 ? (
                      <p className="text-xs text-gray-500">No FAQs available for this product yet.</p>
                    ) : (
                      faqs.map((faq, idx) => (
                        <div key={idx} className="border-b border-gray-100 last:border-0 pb-2 last:pb-0">
                          <p className="text-xs font-semibold text-gray-900 mb-1">{faq.question}</p>
                          <p className="text-xs text-gray-700 whitespace-pre-wrap">{faq.answer}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={() => toggleSection('reviews')}
                  className="w-full flex items-center justify-between py-2 px-3 text-left hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-sm font-semibold">
                    Customer Reviews{reviews.length > 0 ? ` (${reviews.length})` : ''}
                  </h3>
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform duration-300 ${expandedSections.reviews ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${expandedSections.reviews ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-3 pb-3 space-y-4">
                    {reviewsLoading ? (
                      <div className="flex items-center gap-2 text-xs text-gray-500 py-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Loading reviews…
                      </div>
                    ) : reviews.length === 0 ? (
                      <p className="text-xs text-gray-500">No reviews yet. Be the first to review this product.</p>
                    ) : (
                      <ul className="space-y-3">
                        {reviews.map((review) => (
                          <li key={review.id} className="border rounded-lg p-3 bg-gray-50">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <p className="text-xs font-semibold text-gray-900">{review.author_name}</p>
                              <span className="text-[10px] text-gray-400">{formatReviewDate(review.created_at)}</span>
                            </div>
                            <div className="flex mb-1.5">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={12}
                                  className={
                                    i < Number(review.rating || 0)
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }
                                />
                              ))}
                            </div>
                            <p className="text-xs text-gray-700 whitespace-pre-wrap">{review.body}</p>
                          </li>
                        ))}
                      </ul>
                    )}

                    <form onSubmit={handleReviewSubmit} className="border rounded-lg p-3 bg-white space-y-2.5">
                      <p className="text-xs font-semibold text-gray-900">Write a review</p>
                      {reviewError && (
                        <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded px-2 py-1.5">{reviewError}</p>
                      )}
                      {reviewSuccess && (
                        <p className="text-xs text-green-700 bg-green-50 border border-green-100 rounded px-2 py-1.5">{reviewSuccess}</p>
                      )}
                      <div>
                        <label className="block text-[10px] font-semibold text-gray-600 mb-1">Your name *</label>
                        <input
                          type="text"
                          required
                          maxLength={120}
                          value={reviewForm.author_name}
                          onChange={(e) => setReviewForm((f) => ({ ...f, author_name: e.target.value }))}
                          className="w-full border rounded px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-biomed-teal"
                          placeholder="Name"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-gray-600 mb-1">Email (optional)</label>
                        <input
                          type="email"
                          maxLength={200}
                          value={reviewForm.author_email}
                          onChange={(e) => setReviewForm((f) => ({ ...f, author_email: e.target.value }))}
                          className="w-full border rounded px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-biomed-teal"
                          placeholder="you@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-gray-600 mb-1">Rating *</label>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setReviewForm((f) => ({ ...f, rating: star }))}
                                className="p-0.5"
                                aria-label={`${star} star`}
                              >
                                <Star
                                  size={18}
                                  className={
                                    star <= reviewForm.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }
                                />
                              </button>
                            ))}
                          </div>
                          {reviewForm.rating > 0 && (
                            <span className="text-xs font-semibold text-gray-700">{reviewForm.rating}/5</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-gray-600 mb-1">Your review *</label>
                        <textarea
                          required
                          maxLength={2000}
                          rows={3}
                          value={reviewForm.body}
                          onChange={(e) => setReviewForm((f) => ({ ...f, body: e.target.value }))}
                          className="w-full border rounded px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-biomed-teal resize-y"
                          placeholder="Share your experience with this product…"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={reviewSubmitting}
                        className="w-full bg-biomed-navy hover:bg-biomed-navy/90 disabled:opacity-60 text-white py-2 rounded-lg text-xs font-semibold"
                      >
                        {reviewSubmitting ? 'Submitting…' : 'Submit Review'}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
