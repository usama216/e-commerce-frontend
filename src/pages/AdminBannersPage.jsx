import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, Loader2, Plus, Pencil, Trash2 } from 'lucide-react';
import { fetchAdminBanners, createBanner, updateBanner, deleteBanner, isAdminLoggedIn } from '../api';

const AdminBannersPage = () => {
  const navigate = useNavigate();
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formFile, setFormFile] = useState(null);
  const [formSortOrder, setFormSortOrder] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const fileInputRef = React.useRef(null);

  const loadBanners = async () => {
    try {
      const data = await fetchAdminBanners();
      setBanners(data.banners || []);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to load banners');
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
    loadBanners();
  }, [navigate]);

  const openAdd = () => {
    setEditingId(null);
    setFormFile(null);
    setFormSortOrder(banners.length);
    setFormOpen(true);
    setError('');
    setSuccess('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const openEdit = (b) => {
    setEditingId(b.id);
    setFormFile(null);
    setFormSortOrder(b.sort_order ?? 0);
    setFormOpen(true);
    setError('');
    setSuccess('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setFormFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingId && !formFile) {
      setError('Please choose an image to upload');
      return;
    }
    if (editingId && !formFile) {
      const current = banners.find((b) => b.id === editingId);
      if (current && formSortOrder === (current.sort_order ?? 0)) {
        setError('Choose a new image or change sort order to update');
        return;
      }
    }
    setSubmitting(true);
    setError('');
    setSuccess('');
    try {
      if (editingId) {
        await updateBanner(editingId, { file: formFile || undefined, sort_order: formSortOrder });
        setSuccess('Banner updated.');
      } else {
        await createBanner(formFile, formSortOrder);
        setSuccess('Banner added.');
      }
      await loadBanners();
      closeForm();
    } catch (err) {
      setError(err.message || 'Failed to save');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this banner?')) return;
    setDeletingId(id);
    setError('');
    try {
      await deleteBanner(id);
      setSuccess('Banner deleted.');
      await loadBanners();
    } catch (err) {
      setError(err.message || 'Failed to delete');
    } finally {
      setDeletingId(null);
    }
  };

  const imageUrlFor = (b) => {
    const u = b.image_url || '';
    if (u.startsWith('http')) return u;
    if (u.startsWith('/')) return `${window.location.origin}${u}`;
    return u;
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
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <Image className="w-8 h-8 text-biomed-navy" />
            Banners
          </h1>
          <p className="text-gray-500 mt-1">Homepage hero carousel images</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">{success}</div>
        )}

        <div className="bg-white rounded-xl shadow border overflow-hidden mb-6">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Hero carousel banners</h2>
            <button
              type="button"
              onClick={openAdd}
              className="flex items-center gap-2 px-4 py-2 bg-biomed-teal text-white rounded-lg font-medium hover:bg-biomed-teal/90"
            >
              <Plus size={18} />
              Add banner
            </button>
          </div>

          {banners.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <Image className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No banners yet. Add one to show on the homepage hero.</p>
              <button
                type="button"
                onClick={openAdd}
                className="mt-4 text-biomed-teal font-medium hover:underline"
              >
                Add first banner
              </button>
            </div>
          ) : (
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {banners.map((b) => (
                <div key={b.id} className="border rounded-lg overflow-hidden bg-gray-50">
                  <div className="aspect-video bg-gray-200 relative">
                    <img
                      src={imageUrlFor(b)}
                      alt="Banner"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" viewBox="0 0 200 100"><rect fill="%23ddd" width="200" height="100"/><text x="50%" y="50%" fill="%23999" text-anchor="middle" dy=".3em" font-size="12">No image</text></svg>';
                      }}
                    />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(b)}
                        className="p-2 bg-white/90 rounded shadow hover:bg-white"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(b.id)}
                        disabled={deletingId === b.id}
                        className="p-2 bg-white/90 rounded shadow hover:bg-red-50 text-red-600 disabled:opacity-50"
                        title="Delete"
                      >
                        {deletingId === b.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                      </button>
                    </div>
                  </div>
                  <div className="p-3 text-xs text-gray-500 truncate" title={b.image_url}>
                    {b.image_url}
                  </div>
                  <div className="px-3 pb-3 text-xs text-gray-400">Order: {b.sort_order ?? 0}</div>
                </div>
              ))}
            </div>
          )}
        </div>

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">{editingId ? 'Edit banner' : 'Add banner'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {editingId ? 'New image (optional)' : 'Image (required)'}
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  onChange={(e) => setFormFile(e.target.files?.[0] || null)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-biomed-teal focus:border-transparent file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-biomed-teal/10 file:text-biomed-navy file:text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">JPEG, PNG, GIF or WebP. Max 5MB.</p>
                {formFile && (
                  <p className="text-sm text-green-600 mt-1">Selected: {formFile.name}</p>
                )}
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort order</label>
                <input
                  type="number"
                  min={0}
                  value={formSortOrder}
                  onChange={(e) => setFormSortOrder(parseInt(e.target.value, 10) || 0)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-biomed-teal focus:border-transparent"
                />
              </div>
              <div className="flex gap-3">
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
                  {editingId ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBannersPage;
