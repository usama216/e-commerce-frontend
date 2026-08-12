/**
 * Canonical category labels for the store — must match ProductsPage sidebar filters exactly.
 * Assign products only from PRODUCT_CATEGORY_OPTIONS so filtering stays consistent.
 */
export const OFFER_CATEGORY_OPTIONS = ['Bundles', 'Offers'];

export const PRODUCT_CATEGORY_OPTIONS = [
  'B Vitamins',
  'Beauty',
  'Best Selling',
  'Blood Sugar Support',
  'Bones & Joints',
  "Children's Health",
  'Digestive Health',
  'Fertility Support',
  'Fish Oil',
  'Glutathione',
  'Hair Care',
  'Heart Health',
  'Immune Support',
  'Memory & Brain Support',
  "Men's Health",
  'Multivitamins',
  "Women's Health",
  ...OFFER_CATEGORY_OPTIONS,
];

/** Shop sidebar — all product categories including Bundles & Offers. */
export const PRODUCT_NAV_CATEGORIES = ['All Products', ...PRODUCT_CATEGORY_OPTIONS];

/** Offers page sidebar — Bundles & Offers only. */
export const OFFER_NAV_CATEGORIES = ['All Offers', ...OFFER_CATEGORY_OPTIONS];

export function normalizeCategorySlug(catName) {
  return String(catName).toLowerCase().replace(/[']/g, '').replace(/\s+/g, '-');
}

export function getProductCategories(product) {
  if (!product?.category) return [];
  return Array.isArray(product.category) ? product.category : [product.category];
}

export function productHasCategory(product, label) {
  return getProductCategories(product).includes(label);
}

export function productInOfferSection(product) {
  return OFFER_CATEGORY_OPTIONS.some((label) => productHasCategory(product, label));
}
