import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Plus, Pencil, Trash2, Tag } from 'lucide-react';
import {
  isAdminLoggedIn,
  fetchAdminPromoCodes,
  createPromoCode,
  updatePromoCode,
  deletePromoCode,
} from '../api';

const emptyForm = {
  code: '',
  discount_type: 'percent',
  discount_value: '',
  min_order_amount: '0',
  max_uses: '',
  active: true,
  expires_at: '',
};

const AdminPromoCodesPage = () => {
  const navigate = useNavigate();
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const loadCodes = async () => {
    try {
      const data = await fetchAdminPromoCodes();
      setCodes(data.promo_codes || []);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to load promo codes');
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
    loadCodes();
  }, [navigate]);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormOpen(true);
    setError('');
    setSuccess('');
  };

  const openEdit = (row) => {
    setEditingId(row.id);
    setForm({
      code: row.code || '',
      discount_type: row.discount_type || 'percent',
      discount_value: row.discount_value ?? '',
      min_order_amount: row.min_order_amount ?? '0',
      max_uses: row.max_uses ?? '',
      active: row.active !== false,
      expires_at: row.expires_at ? String(row.expires_at).slice(0, 10) : '',
    });
    setFormOpen(true);
    setError('');
    setSuccess('');
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const updateField = (key) => (e) => {
    const value = e?.target?.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!String(form.code).trim()) {
      setError('Code is required.');
      return;
    }
    if (!String(form.discount_value).trim() || Number(form.discount_value) <= 0) {
      setError('Discount value must be greater than 0.');
      return;
    }
    setSubmitting(true);
    setError('');
    setSuccess('');
    try {
      const payload = {
        code: form.code.trim(),
        discount_type: form.discount_type,
        discount_value: Number(form.discount_value),
        min_order_amount: Number(form.min_order_amount) || 0,
        max_uses: form.max_uses === '' ? null : Number(form.max_uses),
        active: !!form.active,
        expires_at: form.expires_at || null,
      };
      if (editingId) {
        await updatePromoCode(editingId, payload);
        setSuccess('Promo code updated.');
      } else {
        await createPromoCode(payload);
        setSuccess('Promo code created.');
      }
      await loadCodes();
      closeForm();
    } catch (err) {
      setError(err.message || 'Failed to save');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this promo code?')) return;
    setDeletingId(id);
    setError('');
    try {
      await deletePromoCode(id);
      setSuccess('Promo code deleted.');
      await loadCodes();
    } catch (err) {
      setError(err.message || 'Failed to delete');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-biomed-teal animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <Tag className="w-8 h-8 text-biomed-navy" />
            Promo Codes
          </h1>
          <p className="text-gray-500 mt-1">Create discount codes for checkout (percent or fixed amount)</p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="inline-flex items-center gap-2 bg-biomed-teal hover:bg-biomed-navy text-white px-4 py-2.5 rounded-lg font-semibold"
        >
          <Plus size={18} />
          Add promo code
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>
      )}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">{success}</div>
      )}

      <div className="bg-white rounded-xl shadow border overflow-hidden">
        {codes.length === 0 ? (
          <div className="p-10 text-center text-gray-500">No promo codes yet. Create one to get started.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-600">
                <tr>
                  <th className="px-4 py-3 font-semibold">Code</th>
                  <th className="px-4 py-3 font-semibold">Discount</th>
                  <th className="px-4 py-3 font-semibold">Min order</th>
                  <th className="px-4 py-3 font-semibold">Usage</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Expires</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {codes.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono font-semibold text-gray-900">{row.code}</td>
                    <td className="px-4 py-3">
                      {row.discount_type === 'percent'
                        ? `${row.discount_value}%`
                        : `Rs. ${row.discount_value}`}
                    </td>
                    <td className="px-4 py-3">Rs. {row.min_order_amount ?? 0}</td>
                    <td className="px-4 py-3">
                      {row.used_count ?? 0}
                      {row.max_uses != null ? ` / ${row.max_uses}` : ' / ∞'}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded ${
                          row.active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {row.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {row.expires_at ? new Date(row.expires_at).toLocaleDateString('en-PK') : '—'}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => openEdit(row)}
                        className="inline-flex items-center gap-1 text-biomed-teal hover:text-biomed-navy font-medium mr-3"
                      >
                        <Pencil size={14} /> Edit
                      </button>
                      <button
                        type="button"
                        disabled={deletingId === row.id}
                        onClick={() => handleDelete(row.id)}
                        className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 font-medium disabled:opacity-50"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full my-8 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingId ? 'Edit promo code' : 'Add promo code'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Code *</label>
                <input
                  type="text"
                  value={form.code}
                  onChange={updateField('code')}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 uppercase font-mono focus:ring-2 focus:ring-biomed-teal focus:border-transparent"
                  placeholder="e.g. SAVE10"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                  <select
                    value={form.discount_type}
                    onChange={updateField('discount_type')}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-biomed-teal focus:border-transparent"
                  >
                    <option value="percent">Percent (%)</option>
                    <option value="fixed">Fixed amount (Rs.)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Value * {form.discount_type === 'percent' ? '(%)' : '(Rs.)'}
                  </label>
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={form.discount_value}
                    onChange={updateField('discount_value')}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-biomed-teal focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min order (Rs.)</label>
                  <input
                    type="number"
                    min="0"
                    value={form.min_order_amount}
                    onChange={updateField('min_order_amount')}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-biomed-teal focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max uses</label>
                  <input
                    type="number"
                    min="1"
                    value={form.max_uses}
                    onChange={updateField('max_uses')}
                    placeholder="Unlimited"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-biomed-teal focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry date</label>
                <input
                  type="date"
                  value={form.expires_at}
                  onChange={updateField('expires_at')}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-biomed-teal focus:border-transparent"
                />
              </div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={!!form.active}
                  onChange={updateField('active')}
                  className="rounded border-gray-300 text-biomed-teal focus:ring-biomed-teal"
                />
                Active
              </label>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="flex-1 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2 bg-biomed-teal text-white rounded-lg font-medium hover:bg-biomed-teal/90 disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {submitting ? <Loader2 size={18} className="animate-spin" /> : null}
                  {editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPromoCodesPage;
