// Structured Data component for better SEO and bot understanding
import { useEffect } from 'react';

interface StructuredDataProps {
  type: 'Person' | 'WebSite' | 'Organization' | 'Portfolio';
  data: Record<string, any>;
}

const StructuredData = ({ type, data }: StructuredDataProps) => {
  useEffect(() => {
    // Remove existing structured data script if any
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Create new structured data script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    
    let structuredData: Record<string, any> = {
      "@context": "https://schema.org",
      "@type": type,
      ...data
    };

    // Add specific structured data based on type
    switch (type) {
      case 'Person':
        structuredData = {
          ...structuredData,
          "@type": "Person",
          "jobTitle": data.jobTitle || "Digital Marketing Specialist",
          "worksFor": {
            "@type": "Organization",
            "name": data.company || "Freelance"
          },
          "url": window.location.origin,
          "sameAs": data.sameAs || [],
          "knowsAbout": data.skills || ["SEO", "Digital Marketing", "SEM", "Social Media Marketing"]
        };
        break;
      
      case 'WebSite':
        structuredData = {
          ...structuredData,
          "@type": "WebSite",
          "url": window.location.origin,
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${window.location.origin}/?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          }
        };
        break;
      
      case 'Portfolio':
        structuredData = {
          ...structuredData,
          "@type": "CreativeWork",
          "creator": {
            "@type": "Person",
            "name": data.creatorName || "Nikhil Sharma"
          },
          "about": data.about || "Digital Marketing Portfolio",
          "url": window.location.href
        };
        break;
    }

    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[type="application/ld+json"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [type, data]);

  return null;
};

export default StructuredData;