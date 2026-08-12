/** Price helpers — discount comes from each product's originalPrice vs discountedPrice. */

export function getProductDiscountPercent(product) {
  const original = Number(product?.originalPrice);
  const discounted = Number(product?.discountedPrice);
  if (!Number.isFinite(original) || original <= 0) return 0;
  if (!Number.isFinite(discounted) || discounted <= 0 || discounted >= original) return 0;
  return Math.round(((original - discounted) / original) * 100);
}

/** True when product has a real discount (discounted price lower than original). */
export function productHasUiDiscount(product) {
  return getProductDiscountPercent(product) > 0;
}

/** Final sell price for a product. */
export function getProductPrice(product) {
  const original = Number(product?.originalPrice);
  const discounted = Number(product?.discountedPrice);
  if (!Number.isFinite(original)) return 0;
  if (Number.isFinite(discounted) && discounted > 0 && discounted < original) {
    return Math.round(discounted);
  }
  return Math.round(original);
}

/** @deprecated Prefer getProductPrice(product). Kept for legacy static offers. */
export const DISCOUNT_PERCENT = 15;

export const getDiscountedPrice = (originalPrice, percent = DISCOUNT_PERCENT) => {
  if (originalPrice == null) return 0;
  const p = Number(percent);
  if (!Number.isFinite(p) || p <= 0) return Math.round(Number(originalPrice));
  return Math.round(Number(originalPrice) * (1 - Math.min(p, 100) / 100));
};
