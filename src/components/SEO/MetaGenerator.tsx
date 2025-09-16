// Dynamic meta tag generator for enhanced SEO
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface MetaConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  canonical?: string;
  noindex?: boolean;
  structuredData?: any;
}

interface MetaGeneratorProps {
  config: MetaConfig;
  siteName?: string;
  siteUrl?: string;
  twitterHandle?: string;
}

export const MetaGenerator: React.FC<MetaGeneratorProps> = ({
  config,
  siteName = "Digital Marketing & SEO Expert",
  siteUrl = window.location.origin,
  twitterHandle = "@seoexpert"
}) => {
  const location = useLocation();
  const currentUrl = `${siteUrl}${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = config.title;

    // Clear existing meta tags
    const existingMetas = document.querySelectorAll('meta[data-dynamic="true"]');
    existingMetas.forEach(meta => meta.remove());

    // Clear existing structured data
    const existingStructuredData = document.querySelectorAll('script[data-dynamic="true"]');
    existingStructuredData.forEach(script => script.remove());

    // Add new meta tags
    const metaTags = generateMetaTags(config, currentUrl, siteName, twitterHandle);
    metaTags.forEach(tag => document.head.appendChild(tag));

    // Add structured data if provided
    if (config.structuredData) {
      const structuredDataScript = document.createElement('script');
      structuredDataScript.type = 'application/ld+json';
      structuredDataScript.textContent = JSON.stringify(config.structuredData);
      structuredDataScript.setAttribute('data-dynamic', 'true');
      document.head.appendChild(structuredDataScript);
    }

    // Update canonical URL
    updateCanonicalUrl(config.canonical || currentUrl);

    // Cleanup function
    return () => {
      const dynamicMetas = document.querySelectorAll('meta[data-dynamic="true"]');
      dynamicMetas.forEach(meta => meta.remove());
      
      const dynamicScripts = document.querySelectorAll('script[data-dynamic="true"]');
      dynamicScripts.forEach(script => script.remove());
    };
  }, [config, currentUrl, siteName, twitterHandle]);

  return null;
};

function generateMetaTags(
  config: MetaConfig, 
  currentUrl: string, 
  siteName: string, 
  twitterHandle: string
): HTMLMetaElement[] {
  const tags: HTMLMetaElement[] = [];

  // Basic meta tags
  if (config.description) {
    tags.push(createMetaTag('name', 'description', config.description));
  }

  if (config.keywords) {
    tags.push(createMetaTag('name', 'keywords', config.keywords));
  }

  if (config.author) {
    tags.push(createMetaTag('name', 'author', config.author));
  }

  // Robots tag
  const robotsContent = config.noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  tags.push(createMetaTag('name', 'robots', robotsContent));

  // Open Graph tags
  tags.push(createMetaTag('property', 'og:title', config.title));
  tags.push(createMetaTag('property', 'og:description', config.description));
  tags.push(createMetaTag('property', 'og:url', currentUrl));
  tags.push(createMetaTag('property', 'og:type', config.type || 'website'));
  tags.push(createMetaTag('property', 'og:site_name', siteName));

  if (config.image) {
    tags.push(createMetaTag('property', 'og:image', config.image));
    tags.push(createMetaTag('property', 'og:image:alt', config.title));
  }

  if (config.publishedTime) {
    tags.push(createMetaTag('property', 'article:published_time', config.publishedTime));
  }

  if (config.modifiedTime) {
    tags.push(createMetaTag('property', 'article:modified_time', config.modifiedTime));
  }

  if (config.section) {
    tags.push(createMetaTag('property', 'article:section', config.section));
  }

  if (config.author) {
    tags.push(createMetaTag('property', 'article:author', config.author));
  }

  if (config.tags) {
    config.tags.forEach(tag => {
      tags.push(createMetaTag('property', 'article:tag', tag));
    });
  }

  // Twitter Card tags
  tags.push(createMetaTag('name', 'twitter:card', 'summary_large_image'));
  tags.push(createMetaTag('name', 'twitter:title', config.title));
  tags.push(createMetaTag('name', 'twitter:description', config.description));
  tags.push(createMetaTag('name', 'twitter:site', twitterHandle));
  tags.push(createMetaTag('name', 'twitter:creator', twitterHandle));

  if (config.image) {
    tags.push(createMetaTag('name', 'twitter:image', config.image));
  }

  // Additional SEO tags
  tags.push(createMetaTag('name', 'format-detection', 'telephone=no'));
  tags.push(createMetaTag('name', 'theme-color', '#0066cc'));
  tags.push(createMetaTag('name', 'apple-mobile-web-app-capable', 'yes'));
  tags.push(createMetaTag('name', 'apple-mobile-web-app-status-bar-style', 'black-translucent'));

  return tags;
}

function createMetaTag(attribute: string, name: string, content: string): HTMLMetaElement {
  const meta = document.createElement('meta');
  meta.setAttribute(attribute, name);
  meta.setAttribute('content', content);
  meta.setAttribute('data-dynamic', 'true');
  return meta;
}

function updateCanonicalUrl(url: string): void {
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    canonical.setAttribute('data-dynamic', 'true');
    document.head.appendChild(canonical);
  }
  
  canonical.href = url;
}

// Predefined meta configurations for common pages
export const metaConfigs = {
  home: {
    title: "Digital Marketing & SEO Expert | Proven Results & Strategy",
    description: "Expert digital marketing and SEO services with proven results. Featured on HubSpot, SEO Testing, EmbedSocial. Drive organic growth and ROI.",
    keywords: "digital marketing expert, SEO specialist, content strategy, technical SEO, business growth, organic traffic",
    type: 'website' as const,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Digital Marketing & SEO Expert",
      "description": "Professional digital marketing and SEO services",
      "serviceType": "Digital Marketing",
      "areaServed": "Worldwide",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Digital Marketing Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "SEO Optimization",
              "description": "Complete SEO strategy and implementation"
            }
          },
          {
            "@type": "Offer", 
            "itemOffered": {
              "@type": "Service",
              "name": "Content Marketing",
              "description": "Strategic content creation and distribution"
            }
          }
        ]
      }
    }
  },
  
  blog: {
    title: "Digital Marketing Blog | SEO Tips & Industry Insights",
    description: "Latest digital marketing strategies, SEO tips, and industry insights. Stay updated with proven techniques for business growth.",
    keywords: "digital marketing blog, SEO tips, content marketing, marketing strategy, business growth",
    type: 'website' as const,
    section: "Blog"
  },

  contact: {
    title: "Contact Digital Marketing Expert | Free SEO Consultation",
    description: "Get in touch for expert digital marketing and SEO services. Free consultation available. Let's discuss your business growth strategy.",
    keywords: "contact SEO expert, digital marketing consultation, SEO services, business growth",
    type: 'website' as const
  }
};

export default MetaGenerator;