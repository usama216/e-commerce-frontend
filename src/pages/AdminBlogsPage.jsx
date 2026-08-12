import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Loader2, Plus, Pencil, Trash2, Image as ImageIcon } from 'lucide-react';
import { fetchAdminBlogs, createBlog, updateBlog, deleteBlog, isAdminLoggedIn } from '../api';
import RichTextEditor from '../components/RichTextEditor';

const CATEGORIES = ['Health', 'Wellness', 'Nutrition', 'Lifestyle', 'Other'];

const AdminBlogsPage = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formTitle, setFormTitle] = useState('');
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formCategory, setFormCategory] = useState('Health');
  const [formReadTime, setFormReadTime] = useState(5);
  const [formPublished, setFormPublished] = useState(true);
  const [formCoverFile, setFormCoverFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [contentUploading, setContentUploading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const fileInputRef = React.useRef(null);

  const loadBlogs = async () => {
    try {
      const data = await fetchAdminBlogs();
      setBlogs(data.blogs || []);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to load blogs');
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
    loadBlogs();
  }, [navigate]);

  const openAdd = () => {
    setEditingId(null);
    setFormTitle('');
    setFormExcerpt('');
    setFormContent('');
    setFormCategory('Health');
    setFormReadTime(5);
    setFormPublished(true);
    setFormCoverFile(null);
    setFormOpen(true);
    setError('');
    setSuccess('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const openEdit = (blog) => {
    setEditingId(blog.id);
    setFormTitle(blog.title || '');
    setFormExcerpt(blog.excerpt || '');
    setFormContent(blog.content || '');
    setFormCategory(blog.category || 'Health');
    setFormReadTime(blog.read_time_minutes ?? 5);
    setFormPublished(blog.published !== false);
    setFormCoverFile(null);
    setFormOpen(true);
    setError('');
    setSuccess('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      setError('Title is required');
      return;
    }
    setSubmitting(true);
    setError('');
    setSuccess('');
    try {
      const payload = {
        title: formTitle.trim(),
        excerpt: formExcerpt.trim() || undefined,
        content: formContent.trim() || undefined,
        category: formCategory,
        read_time_minutes: formReadTime,
        published: formPublished,
      };
      if (formCoverFile) payload.cover_image = formCoverFile;
      if (editingId) {
        await updateBlog(editingId, payload);
        setSuccess('Blog updated.');
      } else {
        await createBlog(payload);
        setSuccess('Blog added.');
      }
      await loadBlogs();
      closeForm();
    } catch (err) {
      setError(err.message || 'Failed to save');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog?')) return;
    setDeletingId(id);
    setError('');
    try {
      await deleteBlog(id);
      setSuccess('Blog deleted.');
      await loadBlogs();
    } catch (err) {
      setError(err.message || 'Failed to delete');
    } finally {
      setDeletingId(null);
    }
  };

  const imageUrlFor = (b) => {
    const u = b.cover_image_url || '';
    if (u.startsWith('http')) return u;
    if (u.startsWith('/')) return `${window.location.origin}${u}`;
    return u;
  };

  const formatDate = (d) => {
    if (!d) return '';
    const date = new Date(d);
    return date.toLocaleDateString('en-PK', { year: 'numeric', month: 'short', day: 'numeric' });
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
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
              <FileText className="w-8 h-8 text-biomed-navy" />
              Blogs
            </h1>
            <p className="text-gray-500 mt-1">Create and publish articles for the website</p>
          </div>
          <Link
            to="/blogs"
            className="text-sm font-medium text-biomed-teal hover:underline shrink-0"
          >
            View blogs on site →
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">{success}</div>
        )}

        <div className="bg-white rounded-xl shadow border overflow-hidden mb-6">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">All blogs</h2>
            <button
              type="button"
              onClick={openAdd}
              className="flex items-center gap-2 px-4 py-2 bg-biomed-teal text-white rounded-lg font-medium hover:bg-biomed-teal/90"
            >
              <Plus size={18} />
              Add blog
            </button>
          </div>

          {blogs.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No blogs yet. Add one to show on the website.</p>
              <button
                type="button"
                onClick={openAdd}
                className="mt-4 text-biomed-teal font-medium hover:underline"
              >
                Add first blog
              </button>
            </div>
          ) : (
            <div className="divide-y">
              {blogs.map((b) => (
                <div key={b.id} className="p-6 flex flex-col sm:flex-row gap-4 hover:bg-gray-50/50">
                  <div className="w-full sm:w-40 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                    {b.cover_image_url ? (
                      <img
                        src={imageUrlFor(b)}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = 'none';
                          e.target.nextSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div className={`w-full h-full flex items-center justify-center ${b.cover_image_url ? 'hidden' : ''}`}>
                      <ImageIcon className="w-10 h-10 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 line-clamp-2">{b.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{b.excerpt ? `${b.excerpt.slice(0, 80)}...` : 'No excerpt'}</p>
                        <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-400">
                          <span>{b.category || 'Health'}</span>
                          <span>•</span>
                          <span>{b.read_time_minutes ?? 5} min read</span>
                          <span>•</span>
                          <span>{formatDate(b.created_at)}</span>
                          {!b.published && (
                            <>
                              <span>•</span>
                              <span className="text-amber-600 font-medium">Draft</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => openEdit(b)}
                          className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(b.id)}
                          disabled={deletingId === b.id}
                          className="p-2 bg-gray-100 rounded-lg hover:bg-red-50 text-red-600 disabled:opacity-50"
                          title="Delete"
                        >
                          {deletingId === b.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full my-8 p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">{editingId ? 'Edit blog' : 'Add blog'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-biomed-teal focus:border-transparent"
                    placeholder="Blog title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt (short summary)</label>
                  <input
                    type="text"
                    value={formExcerpt}
                    onChange={(e) => setFormExcerpt(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-biomed-teal focus:border-transparent"
                    placeholder="Brief summary for listing"
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content (rich text – use toolbar for bold, lists, images)</label>
                  <RichTextEditor
                    value={formContent ?? ''}
                    onChange={setFormContent}
                    placeholder="Write your blog post… You can add images via the image button in the toolbar."
                    height="320px"
                    onImageUploadError={(msg) => setError(msg || 'Image upload failed')}
                    onUploadingChange={setContentUploading}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-biomed-teal focus:border-transparent"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Read time (minutes)</label>
                    <input
                      type="number"
                      min={1}
                      max={60}
                      value={formReadTime}
                      onChange={(e) => setFormReadTime(parseInt(e.target.value, 10) || 5)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-biomed-teal focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {editingId ? 'Cover image (optional, leave empty to keep current)' : 'Cover image (optional)'}
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                    onChange={(e) => setFormCoverFile(e.target.files?.[0] || null)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-biomed-teal/10 file:text-biomed-navy file:text-sm"
                  />
                  {formCoverFile && <p className="text-sm text-green-600 mt-1">Selected: {formCoverFile.name}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="form-published"
                    checked={formPublished}
                    onChange={(e) => setFormPublished(e.target.checked)}
                    className="rounded border-gray-300 text-biomed-teal focus:ring-biomed-teal"
                  />
                  <label htmlFor="form-published" className="text-sm font-medium text-gray-700">Published (visible on site)</label>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
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
      {(submitting || contentUploading) && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl px-6 py-4 flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-biomed-teal animate-spin" />
            <p className="text-sm text-gray-700">
              {contentUploading ? 'Uploading image…' : 'Saving blog…'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlogsPage;
