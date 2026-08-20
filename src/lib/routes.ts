import { CATEGORY_LABELS, type ProductCategory } from '../data/products';

export type FormPrefill = { subject?: string; message?: string };

export type PageState =
  | { page: 'home' }
  | { page: 'products'; category?: ProductCategory }
  | { page: 'product'; productId: string }
  | { page: 'about' }
  | { page: 'form'; prefill?: FormPrefill }
  | { page: 'privacy' }
  | { page: 'terms' }
  | { page: 'settings' }
  | { page: 'notfound' };

const CATEGORY_SLUGS = new Set(Object.keys(CATEGORY_LABELS));

export function pathForState(state: PageState): string {
  switch (state.page) {
    case 'home':
      return '/';
    case 'products':
      return state.category ? `/products/${state.category}` : '/products';
    case 'product':
      return `/product/${state.productId}`;
    case 'about':
      return '/about';
    case 'form':
      return '/contact';
    case 'privacy':
      return '/privacy';
    case 'terms':
      return '/terms';
    case 'settings':
      return '/settings';
    case 'notfound':
      return '/';
  }
}

// Prefill is transient UI state (set when navigating in-app from a product/CTA),
// not part of the shareable URL — a direct visit to /contact always starts blank.
export function parsePathToState(pathname: string): PageState {
  const parts = pathname.replace(/\/+$/, '').split('/').filter(Boolean);

  if (parts.length === 0) return { page: 'home' };

  const [first, second] = parts;

  switch (first) {
    case 'products':
      if (parts.length === 1) return { page: 'products' };
      if (parts.length === 2 && CATEGORY_SLUGS.has(second)) {
        return { page: 'products', category: second as ProductCategory };
      }
      return { page: 'notfound' };
    case 'product':
      if (parts.length === 2 && second) return { page: 'product', productId: second };
      return { page: 'notfound' };
    case 'about':
      return parts.length === 1 ? { page: 'about' } : { page: 'notfound' };
    case 'contact':
      return parts.length === 1 ? { page: 'form' } : { page: 'notfound' };
    case 'privacy':
      return parts.length === 1 ? { page: 'privacy' } : { page: 'notfound' };
    case 'terms':
      return parts.length === 1 ? { page: 'terms' } : { page: 'notfound' };
    case 'settings':
      return parts.length === 1 ? { page: 'settings' } : { page: 'notfound' };
    default:
      return { page: 'notfound' };
  }
}
