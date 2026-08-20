import { useEffect } from 'react';

export type JsonLd = Record<string, unknown> | Record<string, unknown>[];

export type SEOInput = {
  /** Page title, shown as "{title} | T'sys Industrial Controls Inc." (home page passes the full site title as-is). */
  title: string;
  description: string;
  /** Canonical path, e.g. '/product/frenic-hvac'. Resolved against the current origin. */
  path: string;
  /** Root-relative image path for social previews. Defaults to a 1200×630 crop of the homepage hero background. */
  image?: string;
  ogType?: 'website' | 'product' | 'article';
  noindex?: boolean;
  jsonLd?: JsonLd;
};

const SITE_NAME = "T'sys Industrial Controls Inc.";
const DEFAULT_OG_IMAGE = '/images/og-image.png';
const JSON_LD_ELEMENT_ID = 'page-jsonld';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(data?: JsonLd) {
  let el = document.getElementById(JSON_LD_ELEMENT_ID) as HTMLScriptElement | null;
  if (!data) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = JSON_LD_ELEMENT_ID;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/** Updates document title, meta description/robots, canonical link, OG/Twitter tags, and a per-page JSON-LD block on every render. Self-referencing (uses the current origin) so it's correct on any domain this build is deployed to. */
export function useSEO({ title, description, path, image, ogType = 'website', noindex, jsonLd }: SEOInput) {
  useEffect(() => {
    const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    const canonicalUrl = `${window.location.origin}${path}`;
    const ogImage = `${window.location.origin}${image ?? DEFAULT_OG_IMAGE}`;

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow');
    upsertLink('canonical', canonicalUrl);

    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:type', ogType);
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:image', ogImage);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', ogImage);

    upsertJsonLd(jsonLd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, image, ogType, noindex, JSON.stringify(jsonLd)]);
}
