import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Loader2, MessageSquare, Star, Trash2, XCircle } from 'lucide-react';
import {
  fetchAdminReviews,
  updateAdminReview,
  deleteAdminReview,
  isAdminLoggedIn,
} from '../api';

const AdminReviewsPage = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [filter, setFilter] = useState('pending');
  const [actingId, setActingId] = useState(null);

  const loadReviews = async () => {
    try {
      const data = await fetchAdminReviews();
      setReviews(data.reviews || []);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to load reviews');
      if (err.message === 'Session expired') navigate('/admin', { replace: true });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/admin', { replace: true });
      return;
    }
    loadReviews();
  }, [navigate]);

  const filtered = reviews.filter((r) => {
    if (filter === 'pending') return !r.approved;
    if (filter === 'approved') return !!r.approved;
    return true;
  });

  const handleApprove = async (id, approved) => {
    setActingId(id);
    setError('');
    setSuccess('');
    try {
      await updateAdminReview(id, { approved });
      setSuccess(approved ? 'Review approved.' : 'Review rejected (hidden from store).');
      await loadReviews();
    } catch (err) {
      setError(err.message || 'Failed to update review');
    } finally {
      setActingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this review permanently?')) return;
    setActingId(id);
    setError('');
    setSuccess('');
    try {
      await deleteAdminReview(id);
      setSuccess('Review deleted.');
      await loadReviews();
    } catch (err) {
      setError(err.message || 'Failed to delete review');
    } finally {
      setActingId(null);
    }
  };

  const formatDate = (d) => {
    if (!d) return '';
    return new Date(d).toLocaleString('en-PK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-biomed-teal animate-spin" />
      </div>
    );
  }

  const pendingCount = reviews.filter((r) => !r.approved).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
          <MessageSquare className="w-8 h-8 text-biomed-navy" />
          Reviews
        </h1>
        <p className="text-gray-500 mt-1">
          Approve customer reviews before they appear on product pages
          {pendingCount > 0 ? ` · ${pendingCount} pending` : ''}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>
      )}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">{success}</div>
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { key: 'pending', label: 'Pending' },
          { key: 'approved', label: 'Approved' },
          { key: 'all', label: 'All' },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              filter === tab.key
                ? 'bg-biomed-navy text-white'
                : 'bg-white border text-gray-700 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow border overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-10 text-center text-gray-500">No reviews in this filter.</div>
        ) : (
          <ul className="divide-y">
            {filtered.map((review) => (
              <li key={review.id} className="p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded ${
                          review.approved
                            ? 'bg-green-50 text-green-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {review.approved ? 'Approved' : 'Pending'}
                      </span>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">{formatDate(review.created_at)}</span>
                    </div>
                    <p className="font-semibold text-gray-900">{review.author_name}</p>
                    {review.author_email && (
                      <p className="text-sm text-gray-500">{review.author_email}</p>
                    )}
                    <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap">{review.body}</p>
                    <p className="text-xs text-gray-500 mt-3">
                      Product:{' '}
                      <Link
                        to={`/product/${review.product_id}`}
                        className="text-biomed-teal hover:underline font-medium"
                      >
                        {review.product_id}
                      </Link>
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 shrink-0">
                    {!review.approved && (
                      <button
                        type="button"
                        disabled={actingId === review.id}
                        onClick={() => handleApprove(review.id, true)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-semibold disabled:opacity-50"
                      >
                        <CheckCircle size={16} />
                        Approve
                      </button>
                    )}
                    {review.approved && (
                      <button
                        type="button"
                        disabled={actingId === review.id}
                        onClick={() => handleApprove(review.id, false)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold disabled:opacity-50"
                      >
                        <XCircle size={16} />
                        Unapprove
                      </button>
                    )}
                    <button
                      type="button"
                      disabled={actingId === review.id}
                      onClick={() => handleDelete(review.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-sm font-semibold disabled:opacity-50"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminReviewsPage;
