import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Plus, Pencil, Trash2, Package, Image as ImageIcon, ChevronUp, ChevronDown, Eye } from 'lucide-react';
import {
  isAdminLoggedIn,
  fetchAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
} from '../api';
import { PRODUCT_CATEGORY_OPTIONS } from '../constants/productCategories';

const DEFAULT_CATEGORY = ['Best Selling'];

function partitionDbCategories(dbCategories) {
  const arr = Array.isArray(dbCategories) ? dbCategories : [];
  const known = [];
  const orphans = [];
  for (const c of arr) {
    const label = String(c || '').trim();
    if (!label) continue;
    if (PRODUCT_CATEGORY_OPTIONS.includes(label)) known.push(label);
    else orphans.push(label);
  }
  return { known, orphans };
}

function mergeCategoriesForSubmit(selections, orphans) {
  const merged = [...new Set([...(selections || []), ...(orphans || [])])].filter(Boolean);
  return merged.length ? merged : DEFAULT_CATEGORY;
}

function ingredientsToText(ingredients) {
  if (!Array.isArray(ingredients)) return '';
  return ingredients
    .map((item) => {
      if (!item || typeof item !== 'object') return '';
      const name = String(item.name || '').trim();
      const amount = String(item.amount || '').trim();
      if (!name && !amount) return '';
      if (!amount) return name;
      return `${name} | ${amount}`;
    })
    .filter(Boolean)
    .join('\n');
}

function parseIngredientsText(text) {
  return String(text || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, amount] = line.split('|').map((part) => String(part || '').trim());
      return { name: name || line, amount: amount || '' };
    });
}

function normalizeFaqs(faqs) {
  if (!Array.isArray(faqs)) return [];
  return faqs
    .map((item) => ({
      question: String(item?.question || '').trim(),
      answer: String(item?.answer || '').trim(),
    }))
    .filter((item) => item.question && item.answer);
}

/** Reverse-calc % from stored prices for edit form. Empty string = no discount. */
function percentFromPrices(original, discounted) {
  const o = Number(original);
  const d = Number(discounted);
  if (!Number.isFinite(o) || o <= 0 || !Number.isFinite(d) || d <= 0 || d >= o) return '';
  return String(Math.round(((o - d) / o) * 100));
}

/** Apply discount % to original. 0 / empty = no discount. */
function priceFromPercent(original, percent) {
  const o = Number(original);
  const p = Number(percent);
  if (!Number.isFinite(o) || o < 0) return 0;
  if (!Number.isFinite(p) || p <= 0) return Math.round(o);
  return Math.round(o * (1 - Math.min(p, 100) / 100));
}

function buildImagesForApi(mainImageUrl, galleryImageUrls) {
  const main = String(mainImageUrl || '').trim();
  const gallery = (galleryImageUrls || []).map((u) => String(u || '').trim()).filter(Boolean);
  if (main) {
    const rest = gallery.filter((u) => u !== main);
    return [main, ...rest];
  }
  return gallery;
}

function displayImageSrc(url) {
  const u = String(url || '');
  if (!u) return '';
  if (u.startsWith('http')) return u;
  return `${window.location.origin}${u.startsWith('/') ? u : `/${u}`}`;
}

export default function AdminProductsPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formOpen, setFormOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [viewProduct, setViewProduct] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [uploadingImages, setUploadingImages] = useState(false);

  const [form, setForm] = useState({
    id: '',
    name: '',
    original_price: '',
    discount_percent: '',
    in_stock: true,
    categorySelections: [...DEFAULT_CATEGORY],
    orphanCategories: [],
    sort_order: 0,
    mainImageUrl: '',
    galleryImageUrls: [],
    description: '',
    pack_size: '',
    wellness_coins: '',
    helpsText: '',
    details: '',
    directions: '',
    ingredientsText: '',
    faqs: [],
  });

  const loadProducts = async () => {
    try {
      const data = await fetchAdminProducts();
      setProducts(data.products || []);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to load products');
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
    loadProducts();
  }, [navigate]);

  const openAdd = () => {
    setEditingId(null);
    setForm({
      id: '',
      name: '',
      original_price: '',
      discount_percent: '',
      in_stock: true,
      categorySelections: [...DEFAULT_CATEGORY],
      orphanCategories: [],
      sort_order: 0,
      mainImageUrl: '',
      galleryImageUrls: [],
      description: '',
      pack_size: '',
      wellness_coins: '',
      helpsText: '',
      details: '',
      directions: '',
      ingredientsText: '',
      faqs: [],
    });
    setFormOpen(true);
    setError('');
    setSuccess('');
  };

  const openEdit = (p) => {
    const { known, orphans } = partitionDbCategories(p.category ?? DEFAULT_CATEGORY);
    setEditingId(p.id);
    setForm({
      id: p.id || '',
      name: p.name || '',
      original_price: p.originalPrice ?? '',
      discount_percent: percentFromPrices(p.originalPrice, p.discountedPrice),
      in_stock: p.inStock !== false,
      categorySelections: known.length ? known : [...DEFAULT_CATEGORY],
      orphanCategories: orphans,
      sort_order: p.sort_order ?? 0,
      ...(() => {
        const all =
          Array.isArray(p.images) && p.images.length > 0
            ? [...p.images]
            : p.image
              ? [p.image]
              : [];
        const main = all[0] ? String(all[0]) : '';
        const gallery = all.slice(1).map(String);
        return { mainImageUrl: main, galleryImageUrls: gallery };
      })(),
      description: p.description || '',
      pack_size: p.packSize || '',
      wellness_coins: p.wellnessCoins ?? '',
      helpsText: Array.isArray(p.helps) ? p.helps.join('\n') : '',
      details: p.details || '',
      directions: p.directions || '',
      ingredientsText: ingredientsToText(p.ingredients ?? []),
      faqs: Array.isArray(p.faqs)
        ? p.faqs.map((f) => ({
            question: String(f?.question || ''),
            answer: String(f?.answer || ''),
          }))
        : [],
    });
    setFormOpen(true);
    setError('');
    setSuccess('');
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
  };

  const updateField = (key) => (e) => {
    const value = e?.target?.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
  };

  const addFaqRow = () => {
    setForm((f) => ({
      ...f,
      faqs: [...(f.faqs || []), { question: '', answer: '' }],
    }));
  };

  const updateFaqRow = (index, key, value) => {
    setForm((f) => {
      const faqs = [...(f.faqs || [])];
      faqs[index] = { ...faqs[index], [key]: value };
      return { ...f, faqs };
    });
  };

  const removeFaqRow = (index) => {
    setForm((f) => ({
      ...f,
      faqs: (f.faqs || []).filter((_, i) => i !== index),
    }));
  };

  const toggleCategory = (label) => {
    setForm((f) => {
      const set = new Set(f.categorySelections || []);
      if (set.has(label)) set.delete(label);
      else set.add(label);
      return { ...f, categorySelections: [...set] };
    });
  };

  const removeOrphanCategory = (label) => {
    setForm((f) => ({
      ...f,
      orphanCategories: (f.orphanCategories || []).filter((c) => c !== label),
    }));
  };

  const moveGalleryImage = (index, dir) => {
    setForm((f) => {
      const arr = [...(f.galleryImageUrls || [])];
      const j = index + dir;
      if (j < 0 || j >= arr.length) return f;
      [arr[index], arr[j]] = [arr[j], arr[index]];
      return { ...f, galleryImageUrls: arr };
    });
  };

  const removeGalleryAt = (index) => {
    setForm((f) => ({
      ...f,
      galleryImageUrls: (f.galleryImageUrls || []).filter((_, i) => i !== index),
    }));
  };

  const clearMainImage = () => {
    setForm((f) => ({ ...f, mainImageUrl: '' }));
  };

  /** Gallery row becomes cover; previous cover moves to top of gallery */
  const makeGalleryImageMain = (galleryIndex) => {
    setForm((f) => {
      const g = [...(f.galleryImageUrls || [])];
      const picked = g[galleryIndex];
      if (!picked) return f;
      g.splice(galleryIndex, 1);
      const prev = String(f.mainImageUrl || '').trim();
      if (prev) g.unshift(prev);
      return { ...f, mainImageUrl: picked, galleryImageUrls: g };
    });
  };

  const onPickMainImage = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploadingImages(true);
    setError('');
    try {
      const url = await uploadProductImage(file);
      setForm((f) => ({ ...f, mainImageUrl: url }));
    } catch (err) {
      setError(err.message || 'Image upload failed');
    } finally {
      setUploadingImages(false);
    }
  };

  const onPickGalleryImages = async (e) => {
    const files = [...(e.target.files || [])];
    e.target.value = '';
    if (!files.length) return;
    setUploadingImages(true);
    setError('');
    try {
      const urls = [];
      for (const file of files) {
        urls.push(await uploadProductImage(file));
      }
      setForm((f) => ({
        ...f,
        galleryImageUrls: [...(f.galleryImageUrls || []), ...urls],
      }));
    } catch (err) {
      setError(err.message || 'Image upload failed');
    } finally {
      setUploadingImages(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError('Name is required.');
      return;
    }
    if (!String(form.original_price).trim() || Number.isNaN(Number(form.original_price))) {
      setError('Original price is required.');
      return;
    }
    const discountPercentRaw = String(form.discount_percent ?? '').trim();
    if (discountPercentRaw !== '' && (Number.isNaN(Number(discountPercentRaw)) || Number(discountPercentRaw) < 0 || Number(discountPercentRaw) > 100)) {
      setError('Discount % must be between 0 and 100.');
      return;
    }
    if (!editingId && !form.id.trim()) {
      setError('Product id is required (example: prod-15).');
      return;
    }
    const hasAnyCategory =
      (form.categorySelections && form.categorySelections.length > 0) ||
      (form.orphanCategories && form.orphanCategories.length > 0);
    if (!hasAnyCategory) {
      setError('Select at least one category.');
      return;
    }

    setSubmitting(true);
    setError('');
    setSuccess('');
    try {
      const category = mergeCategoriesForSubmit(form.categorySelections, form.orphanCategories);
      const ingredients = parseIngredientsText(form.ingredientsText);
      const faqs = normalizeFaqs(form.faqs);
      const originalPrice = Number(form.original_price);
      const discountedPrice = priceFromPercent(originalPrice, form.discount_percent);
      const payload = {
        id: form.id.trim(),
        name: form.name.trim(),
        original_price: originalPrice,
        discounted_price: discountedPrice,
        in_stock: !!form.in_stock,
        category,
        sort_order: parseInt(form.sort_order, 10) || 0,
        description: form.description || '',
        pack_size: form.pack_size || '',
        wellness_coins: form.wellness_coins === '' ? undefined : parseInt(form.wellness_coins, 10) || 0,
        helps: form.helpsText || '',
        details: form.details || '',
        directions: form.directions || '',
        ingredients,
        faqs,
        images: buildImagesForApi(form.mainImageUrl, form.galleryImageUrls),
      };

      if (editingId) {
        await updateProduct(editingId, payload);
        setSuccess('Product updated.');
      } else {
        await createProduct(payload);
        setSuccess('Product added.');
      }
      await loadProducts();
      closeForm();
    } catch (err) {
      setError(err.message || 'Failed to save');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    setDeletingId(id);
    setError('');
    try {
      await deleteProduct(id);
      setSuccess('Product deleted.');
      await loadProducts();
    } catch (err) {
      setError(err.message || 'Failed to delete');
    } finally {
      setDeletingId(null);
    }
  };

  const openProductPreview = (product) => {
    setViewProduct(product);
    setViewOpen(true);
  };

  const imageUrlFor = (p) => {
    const u = p.image || '';
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
            <Package className="w-8 h-8 text-biomed-navy" />
            Products
          </h1>
          <p className="text-gray-500 mt-1">Catalog, prices, categories & images</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">{success}</div>
        )}

        <div className="bg-white rounded-xl shadow border overflow-hidden mb-6">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">All products</h2>
            <button
              type="button"
              onClick={openAdd}
              className="flex items-center gap-2 px-4 py-2 bg-biomed-teal text-white rounded-lg font-medium hover:bg-biomed-teal/90"
            >
              <Plus size={18} />
              Add product
            </button>
          </div>

          {products.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No products yet. Add one to show on the website.</p>
              <button type="button" onClick={openAdd} className="mt-4 text-biomed-teal font-medium hover:underline">
                Add first product
              </button>
            </div>
          ) : (
            <div className="divide-y">
              {products.map((p) => (
                <div key={p.id} className="p-6 flex flex-col sm:flex-row gap-4 hover:bg-gray-50/50">
                  <div className="w-full sm:w-40 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                    {p.image ? (
                      <img
                        src={imageUrlFor(p)}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = 'none';
                          e.target.nextSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div className={`w-full h-full flex items-center justify-center ${p.image ? 'hidden' : ''}`}>
                      <ImageIcon className="w-10 h-10 text-gray-400" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 line-clamp-2">{p.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{p.id}</p>
                        <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-400">
                          <span>
                            {Number(p.discountedPrice) > 0 &&
                            Number(p.originalPrice) > 0 &&
                            Number(p.discountedPrice) < Number(p.originalPrice)
                              ? `Rs. ${p.discountedPrice} (−${Math.round(((Number(p.originalPrice) - Number(p.discountedPrice)) / Number(p.originalPrice)) * 100)}%)`
                              : `Rs. ${p.originalPrice ?? p.discountedPrice}`}
                          </span>
                          <span>•</span>
                          <span>{p.inStock ? 'In stock' : 'Out of stock'}</span>
                          {Array.isArray(p.category) && p.category.length > 0 ? (
                            <>
                              <span>•</span>
                              <span>{p.category.join(', ')}</span>
                            </>
                          ) : null}
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => openProductPreview(p)}
                          className="p-2 bg-gray-100 rounded-lg hover:bg-biomed-teal/10 text-biomed-navy"
                          title="View product"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => openEdit(p)}
                          className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(p.id)}
                          disabled={deletingId === p.id}
                          className="p-2 bg-gray-100 rounded-lg hover:bg-red-50 text-red-600 disabled:opacity-50"
                          title="Delete"
                        >
                          {deletingId === p.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
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
            <h3 className="text-lg font-semibold mb-4">{editingId ? 'Edit product' : 'Add product'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {!editingId && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product id *</label>
                    <input
                      type="text"
                      value={form.id}
                      onChange={updateField('id')}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-biomed-teal focus:border-transparent"
                      placeholder="prod-15"
                      required
                    />
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={updateField('name')}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-biomed-teal focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sort order</label>
                    <input
                      type="number"
                      value={form.sort_order}
                      onChange={updateField('sort_order')}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-biomed-teal focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Original price (Rs.) *</label>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={form.original_price}
                      onChange={updateField('original_price')}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-biomed-teal focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      value={form.discount_percent}
                      onChange={updateField('discount_percent')}
                      placeholder="e.g. 10 or 15 (0 = no discount)"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-biomed-teal focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Leave empty or 0 for no discount.
                      {form.original_price !== '' && !Number.isNaN(Number(form.original_price)) && (
                        <>
                          {' '}
                          Sell price:{' '}
                          <span className="font-semibold text-biomed-navy">
                            Rs. {priceFromPercent(form.original_price, form.discount_percent)}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 pt-7">
                    <input
                      type="checkbox"
                      id="form-in-stock"
                      checked={!!form.in_stock}
                      onChange={updateField('in_stock')}
                      className="rounded border-gray-300 text-biomed-teal focus:ring-biomed-teal"
                    />
                    <label htmlFor="form-in-stock" className="text-sm font-medium text-gray-700">In stock</label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pack size</label>
                    <input
                      type="text"
                      value={form.pack_size}
                      onChange={updateField('pack_size')}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-biomed-teal focus:border-transparent"
                      placeholder="30 Tablets"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Wellness coins</label>
                    <input
                      type="number"
                      value={form.wellness_coins}
                      onChange={updateField('wellness_coins')}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-biomed-teal focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categories (same as store filters)</label>
                  {form.orphanCategories?.length > 0 && (
                    <div className="mb-3 p-3 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-900">
                      <p className="font-medium mb-2">Old labels not in the list (remove when done migrating):</p>
                      <div className="flex flex-wrap gap-2">
                        {form.orphanCategories.map((c) => (
                          <span
                            key={c}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white border border-amber-300 text-amber-950"
                          >
                            {c}
                            <button
                              type="button"
                              onClick={() => removeOrphanCategory(c)}
                              className="text-amber-700 hover:text-amber-900 font-bold px-1"
                              aria-label={`Remove ${c}`}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="border border-gray-200 rounded-lg p-3 max-h-52 overflow-y-auto bg-gray-50/80">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {PRODUCT_CATEGORY_OPTIONS.map((cat) => (
                        <label
                          key={cat}
                          className="flex items-center gap-2 cursor-pointer text-sm text-gray-800 hover:bg-white/80 rounded px-2 py-1"
                        >
                          <input
                            type="checkbox"
                            checked={(form.categorySelections || []).includes(cat)}
                            onChange={() => toggleCategory(cat)}
                            className="rounded border-gray-300 text-biomed-teal focus:ring-biomed-teal shrink-0"
                          />
                          <span>{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Pick one or more — product appears under each selected category on Products and Offers pages.
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Main image (cover)</label>
                    <p className="text-xs text-gray-500 mb-3">
                      Used on product listings, cart, and checkout. Upload one clear pack/front shot.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                      <div className="w-full sm:w-44 h-44 rounded-xl border-2 border-dashed border-gray-300 bg-white flex items-center justify-center overflow-hidden">
                        {form.mainImageUrl ? (
                          <img
                            src={displayImageSrc(form.mainImageUrl)}
                            alt="Main product"
                            className="max-h-full max-w-full object-contain"
                          />
                        ) : (
                          <div className="text-center px-3 text-gray-400 text-sm">
                            <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-50" />
                            No cover yet
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0 space-y-2">
                        <input
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                          disabled={uploadingImages}
                          onChange={onPickMainImage}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-biomed-teal/10 file:text-biomed-navy file:text-sm disabled:opacity-60"
                        />
                        {form.mainImageUrl ? (
                          <button
                            type="button"
                            onClick={clearMainImage}
                            className="text-sm text-red-600 hover:underline"
                          >
                            Remove main image
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <label className="block text-sm font-semibold text-gray-900 mb-1">Gallery images</label>
                    <p className="text-xs text-gray-500 mb-3">
                      Extra photos on the product detail page only. Reorder with arrows; use “Make cover” to swap with the main image.
                    </p>
                    {(form.galleryImageUrls || []).length > 0 && (
                      <ul className="space-y-2 mb-3">
                        {(form.galleryImageUrls || []).map((url, idx) => (
                          <li
                            key={`${url}-${idx}`}
                            className="flex items-center gap-3 p-2 rounded-lg border border-gray-200 bg-white"
                          >
                            <img
                              src={displayImageSrc(url)}
                              alt=""
                              className="w-14 h-14 object-contain rounded bg-gray-50 flex-shrink-0"
                            />
                            <span className="text-xs text-gray-500 truncate flex-1 min-w-0">{url}</span>
                            <div className="flex flex-wrap items-center gap-1 flex-shrink-0 justify-end">
                              <button
                                type="button"
                                onClick={() => makeGalleryImageMain(idx)}
                                className="text-xs px-2 py-1 rounded-md bg-biomed-teal/15 text-biomed-navy font-medium hover:bg-biomed-teal/25"
                                title="Use as main image"
                              >
                                Make cover
                              </button>
                              <button
                                type="button"
                                onClick={() => moveGalleryImage(idx, -1)}
                                disabled={idx === 0}
                                className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-40"
                                title="Move up"
                              >
                                <ChevronUp size={18} />
                              </button>
                              <button
                                type="button"
                                onClick={() => moveGalleryImage(idx, 1)}
                                disabled={idx === (form.galleryImageUrls || []).length - 1}
                                className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-40"
                                title="Move down"
                              >
                                <ChevronDown size={18} />
                              </button>
                              <button
                                type="button"
                                onClick={() => removeGalleryAt(idx)}
                                className="p-1.5 rounded hover:bg-red-50 text-red-600"
                                title="Remove"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                      multiple
                      disabled={uploadingImages}
                      onChange={onPickGalleryImages}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-biomed-teal/10 file:text-biomed-navy file:text-sm disabled:opacity-60"
                    />
                  </div>

                  {uploadingImages && (
                    <p className="text-sm text-biomed-teal flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" /> Uploading…
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Short description</label>
                  <textarea
                    value={form.description}
                    onChange={updateField('description')}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-biomed-teal focus:border-transparent"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Helps (one per line)</label>
                  <textarea
                    value={form.helpsText}
                    onChange={updateField('helpsText')}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-biomed-teal focus:border-transparent"
                    rows={4}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
                    <textarea
                      value={form.details}
                      onChange={updateField('details')}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-biomed-teal focus:border-transparent"
                      rows={6}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Directions</label>
                    <textarea
                      value={form.directions}
                      onChange={updateField('directions')}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-biomed-teal focus:border-transparent"
                      rows={6}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients (one per line)</label>
                  <textarea
                    value={form.ingredientsText}
                    onChange={updateField('ingredientsText')}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-biomed-teal focus:border-transparent"
                    rows={6}
                  />
                  <p className="text-xs text-gray-500 mt-1">Format: Name | Amount (e.g., Vitamin D3 | 200,000 IU)</p>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <label className="block text-sm font-medium text-gray-700">FAQs</label>
                    <button
                      type="button"
                      onClick={addFaqRow}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-biomed-teal hover:text-biomed-navy"
                    >
                      <Plus size={16} />
                      Add FAQ
                    </button>
                  </div>
                  {(form.faqs || []).length === 0 ? (
                    <p className="text-sm text-gray-500 border border-dashed rounded-lg px-3 py-4">
                      No FAQs yet. Click “Add FAQ” to add question & answer for this product.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {(form.faqs || []).map((faq, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-3 space-y-2 bg-gray-50">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">FAQ {index + 1}</p>
                            <button
                              type="button"
                              onClick={() => removeFaqRow(index)}
                              className="text-red-600 hover:text-red-700 text-sm font-medium inline-flex items-center gap-1"
                            >
                              <Trash2 size={14} />
                              Remove
                            </button>
                          </div>
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => updateFaqRow(index, 'question', e.target.value)}
                            placeholder="Question"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-biomed-teal focus:border-transparent bg-white"
                          />
                          <textarea
                            value={faq.answer}
                            onChange={(e) => updateFaqRow(index, 'answer', e.target.value)}
                            placeholder="Answer"
                            rows={3}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-biomed-teal focus:border-transparent bg-white"
                          />
                        </div>
                      ))}
                    </div>
                  )}
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
      {viewOpen && viewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full my-8 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{viewProduct.name}</h3>
                <p className="text-sm text-gray-500">{viewProduct.id}</p>
              </div>
              <button
                type="button"
                onClick={() => setViewOpen(false)}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Main image</h4>
                  <div className="h-56 bg-gray-50 rounded-lg border flex items-center justify-center overflow-hidden">
                    {viewProduct.image ? (
                      <img src={displayImageSrc(viewProduct.image)} alt="" className="max-h-full max-w-full object-contain" />
                    ) : (
                      <span className="text-gray-400 text-sm">No image</span>
                    )}
                  </div>
                </div>
                {!!viewProduct.images?.length && (
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Gallery</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {viewProduct.images.map((u, i) => (
                        <div key={`${u}-${i}`} className="h-20 bg-gray-50 rounded border flex items-center justify-center overflow-hidden">
                          <img src={displayImageSrc(u)} alt="" className="max-h-full max-w-full object-contain" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3 text-sm">
                <p><strong>Price:</strong> Rs. {viewProduct.discountedPrice} (Original: Rs. {viewProduct.originalPrice})</p>
                <p><strong>Stock:</strong> {viewProduct.inStock ? 'In stock' : 'Out of stock'}</p>
                <p><strong>Pack size:</strong> {viewProduct.packSize || '—'}</p>
                <p><strong>Wellness coins:</strong> {viewProduct.wellnessCoins ?? '—'}</p>
                <p><strong>Categories:</strong> {Array.isArray(viewProduct.category) ? viewProduct.category.join(', ') : (viewProduct.category || '—')}</p>
                {viewProduct.description ? <p><strong>Description:</strong> {viewProduct.description}</p> : null}
                {viewProduct.details ? <p><strong>Details:</strong> {viewProduct.details}</p> : null}
                {viewProduct.directions ? <p><strong>Directions:</strong> {viewProduct.directions}</p> : null}
                {Array.isArray(viewProduct.helps) && viewProduct.helps.length > 0 && (
                  <div>
                    <strong>Helps:</strong>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      {viewProduct.helps.map((h, i) => <li key={i}>{h}</li>)}
                    </ul>
                  </div>
                )}
                {Array.isArray(viewProduct.ingredients) && viewProduct.ingredients.length > 0 && (
                  <div>
                    <strong>Ingredients:</strong>
                    <ul className="mt-1 space-y-1">
                      {viewProduct.ingredients.map((ing, i) => (
                        <li key={i}>- {ing.name || 'Ingredient'}{ing.amount ? ` | ${ing.amount}` : ''}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {Array.isArray(viewProduct.faqs) && viewProduct.faqs.length > 0 && (
                  <div>
                    <strong>FAQs:</strong>
                    <ul className="mt-1 space-y-2">
                      {viewProduct.faqs.map((faq, i) => (
                        <li key={i}>
                          <p className="font-medium">Q: {faq.question}</p>
                          <p className="text-gray-600">A: {faq.answer}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

