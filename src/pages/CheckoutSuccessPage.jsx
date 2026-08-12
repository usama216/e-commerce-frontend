import React, { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Loader2, ShoppingBag } from 'lucide-react';
import { getCheckoutSession, saveOrder } from '../api';

const CheckoutSuccessPage = ({ onOrderSuccess }) => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const isCod = searchParams.get('cod') === '1';
  const orderId = searchParams.get('order_id');
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const onOrderSuccessRef = useRef(onOrderSuccess);
  onOrderSuccessRef.current = onOrderSuccess;

  useEffect(() => {
    if (isCod) {
      if (typeof onOrderSuccessRef.current === 'function') onOrderSuccessRef.current();
      setSession({ cod: true, order_id: orderId });
      setLoading(false);
      return;
    }
    if (!sessionId) {
      setError('No session ID');
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const data = await getCheckoutSession(sessionId);
        if (!cancelled) setSession(data);
        try {
          await saveOrder(sessionId);
          if (!cancelled && typeof onOrderSuccessRef.current === 'function') onOrderSuccessRef.current();
        } catch {
          // Order might already be saved
        }
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load order details');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [sessionId, isCod, orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-biomed-teal animate-spin" />
      </div>
    );
  }

  if (error || (!session && !isCod)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
          <p className="text-gray-600 mb-6">{error || 'Order details could not be loaded.'}</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-biomed-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-biomed-navy/90"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const amountDisplay = session?.amount_total != null
    ? `Rs. ${(session.amount_total / 100).toLocaleString()}`
    : '';

  if (session?.cod) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg border p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order placed successfully</h1>
          <p className="text-gray-600 mb-6">
            Your Cash on Delivery order has been confirmed. Pay when you receive your order.
          </p>
          {orderId && <p className="text-sm text-gray-500 mb-6">Order reference: {orderId}</p>}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/products" className="inline-flex items-center justify-center gap-2 bg-biomed-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-biomed-navy/90">
              <ShoppingBag size={20} /> Continue Shopping
            </Link>
            <Link to="/" className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg border p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Thank you for your order</h1>
        <p className="text-gray-600 mb-6">
          Your payment was successful. We’ve received your order.
        </p>
        {session.customer_email && (
          <p className="text-sm text-gray-500 mb-2">
            Confirmation sent to <strong>{session.customer_email}</strong>
          </p>
        )}
        {amountDisplay && (
          <p className="text-biomed-teal font-semibold text-lg mb-8">Total paid: {amountDisplay}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 bg-biomed-navy text-white px-6 py-3 rounded-lg font-semibold hover:bg-biomed-navy/90"
          >
            <ShoppingBag size={20} />
            Continue Shopping
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
