import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  canonicalUrl?: string;
  author?: string;
}

export default function SEO({
  title,
  description,
  keywords = 'portfolio, discord, developer, samir thakuri, notsopreety, spotify, gaming',
  ogImage = 'https://cdn.discordapp.com/avatars/931511745284038696/a_ef70c1c850e0a7b1e8e3c6c8d8f5e7c0.gif',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  canonicalUrl,
  author = 'Samir Thakuri (notsopreety)'
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'author', content: author },
      
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: ogType },
      { property: 'og:image', content: ogImage },
      { property: 'og:url', content: canonicalUrl || window.location.href },
      { property: 'og:site_name', content: 'notsopreety Portfolio' },
      
      { name: 'twitter:card', content: twitterCard },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
      { name: 'twitter:creator', content: '@notsopreety' },
      
      { name: 'theme-color', content: '#8B5CF6' },
      { name: 'robots', content: 'index, follow' },
      { name: 'googlebot', content: 'index, follow' },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const attribute = name ? 'name' : 'property';
      const value = name || property;
      
      let element = document.querySelector(`meta[${attribute}="${value}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, value!);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    });

    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', canonicalUrl);
    }
  }, [title, description, keywords, ogImage, ogType, twitterCard, canonicalUrl, author]);

  return null;
}
