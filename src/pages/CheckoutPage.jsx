import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Loader2, ArrowLeft, User, Mail, Phone, MapPin, FileText, Banknote, Tag } from 'lucide-react';
import { placeCodOrder, validatePromoCode } from '../api';

const CheckoutPage = ({ cartItems, onOrderSuccess }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    deliveryNotes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [promoInput, setPromoInput] = useState('');
  const [promoApplying, setPromoApplying] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.discountedPrice ?? item.price ?? item.originalPrice ?? 0) * (item.quantity || 1),
    0
  );
  const promoDiscount = appliedPromo?.discount ?? 0;
  const total = Math.max(0, subtotal - promoDiscount);

  useEffect(() => {
    // Re-validate promo if cart subtotal changes
    if (!appliedPromo?.code) return;
    let cancelled = false;
    (async () => {
      try {
        const data = await validatePromoCode(appliedPromo.code, subtotal);
        if (!cancelled) {
          setAppliedPromo({
            code: data.code,
            discount: data.discount,
            discount_type: data.discount_type,
            discount_value: data.discount_value,
          });
          setPromoError('');
        }
      } catch (err) {
        if (!cancelled) {
          setAppliedPromo(null);
          setPromoError(err.message || 'Promo code no longer valid for this cart');
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [subtotal]);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validateForm = () => {
    const { name, email, phone, address } = form;
    if (!name?.trim()) return 'Please enter your full name.';
    if (!email?.trim()) return 'Please enter your email.';
    if (!phone?.trim()) return 'Please enter your phone number.';
    if (!address?.trim()) return 'Please enter your delivery address.';
    return null;
  };

  const getCustomer = () => {
    const { name, email, phone, address, city, postalCode, deliveryNotes } = form;
    return {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city: (city || '').trim(),
      postalCode: (postalCode || '').trim(),
      deliveryNotes: (deliveryNotes || '').trim(),
    };
  };

  const handleApplyPromo = async (e) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput.trim()) {
      setPromoError('Enter a promo code');
      return;
    }
    setPromoApplying(true);
    try {
      const data = await validatePromoCode(promoInput.trim(), subtotal);
      setAppliedPromo({
        code: data.code,
        discount: data.discount,
        discount_type: data.discount_type,
        discount_value: data.discount_value,
      });
      setPromoInput(data.code);
    } catch (err) {
      setAppliedPromo(null);
      setPromoError(err.message || 'Invalid promo code');
    } finally {
      setPromoApplying(false);
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoInput('');
    setPromoError('');
  };

  const handlePlaceCodOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      setError('Your cart is empty.');
      return;
    }
    const err = validateForm();
    if (err) {
      setError(err);
      return;
    }
    setError('');
    setLoading(true);
    try {
      const payload = cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity || 1,
        discountedPrice: item.discountedPrice ?? item.price ?? item.originalPrice,
        price: item.discountedPrice ?? item.price ?? item.originalPrice,
      }));
      const { order } = await placeCodOrder(payload, getCustomer(), appliedPromo?.code || undefined);
      if (typeof onOrderSuccess === 'function') onOrderSuccess();
      navigate(`/checkout/success?cod=1&order_id=${order?.id || ''}`, { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && !loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add products from the shop before checkout.</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-biomed-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-biomed-navy/90"
          >
            <ArrowLeft size={20} />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-biomed-navy mb-6">
          <ArrowLeft size={20} />
          Back to store
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
        <p className="text-gray-600 mb-8">
          Enter your details and place your order. Pay when your order is delivered (Cash on Delivery).
        </p>

        <form onSubmit={handlePlaceCodOrder}>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-sm border p-6 order-2 md:order-1 space-y-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Delivery & contact information</h2>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={update('name')}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-biomed-teal focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-biomed-teal focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={update('phone')}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-biomed-teal focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    id="address"
                    value={form.address}
                    onChange={update('address')}
                    rows={3}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-biomed-teal focus:border-transparent resize-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    value={form.city}
                    onChange={update('city')}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-biomed-teal focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                    Postal code
                  </label>
                  <input
                    id="postalCode"
                    type="text"
                    value={form.postalCode}
                    onChange={update('postalCode')}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-biomed-teal focus:border-transparent"
                    placeholder="e.g. 54000"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="deliveryNotes" className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery notes <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    id="deliveryNotes"
                    value={form.deliveryNotes}
                    onChange={update('deliveryNotes')}
                    rows={2}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-biomed-teal focus:border-transparent resize-none"
                    placeholder="Landmark, floor, timing preference, etc."
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6 order-1 md:order-2">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <ShoppingBag size={22} />
                  Order Summary
                </h2>
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 py-3 border-b border-gray-100 last:border-0">
                      <img
                        src={item.image || (item.images && item.images[0]) || '/assets/products/main-product.jpeg'}
                        alt={item.name}
                        className="w-16 h-16 object-contain rounded-lg bg-gray-50"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 line-clamp-2">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity || 1}</p>
                        <p className="text-biomed-teal font-semibold">
                          Rs. {(item.discountedPrice ?? item.price ?? item.originalPrice ?? 0) * (item.quantity || 1)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal}</span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                      <Tag size={16} />
                      Promo code
                    </label>
                    {appliedPromo ? (
                      <div className="flex items-center justify-between gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                        <div>
                          <p className="text-sm font-semibold text-green-800">{appliedPromo.code}</p>
                          <p className="text-xs text-green-700">− Rs. {appliedPromo.discount}</p>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemovePromo}
                          className="text-sm font-medium text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 uppercase font-mono text-sm focus:ring-2 focus:ring-biomed-teal focus:border-transparent"
                          placeholder="Enter code"
                        />
                        <button
                          type="button"
                          onClick={handleApplyPromo}
                          disabled={promoApplying}
                          className="px-4 py-2 bg-gray-900 hover:bg-gray-800 disabled:opacity-60 text-white rounded-lg text-sm font-semibold"
                        >
                          {promoApplying ? '…' : 'Apply'}
                        </button>
                      </div>
                    )}
                    {promoError && <p className="text-xs text-red-600 mt-1.5">{promoError}</p>}
                  </div>

                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-sm text-green-700 font-medium">
                      <span>Promo discount</span>
                      <span>− Rs. {promoDiscount}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-lg font-bold pt-1">
                    <span>Total</span>
                    <span className="text-biomed-teal">Rs. {total}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Banknote size={22} />
                  Cash on Delivery
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  Pay when your order is delivered. No online payment required.
                </p>
                {error && (
                  <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg mb-4">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-biomed-navy hover:bg-biomed-navy/90 disabled:opacity-70 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Placing order…
                    </>
                  ) : (
                    <>
                      <Banknote size={20} />
                      Place order (Cash on Delivery)
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
