// Enhanced SSR with better performance and caching
import type { Context } from "@netlify/edge-functions";

const RENDERTRON_URL = "https://render-tron.appspot.com/render";
const CACHE_DURATION = 3600; // 1 hour
const MAX_CACHE_SIZE = 1000;

// In-memory cache for prerendered content
const prerenderCache = new Map<string, { html: string; timestamp: number; headers: Record<string, string> }>();

// Comprehensive bot user agents with latest additions
const BOT_USER_AGENTS = [
  'googlebot', 'google-structured-data-testing-tool', 'bingbot', 'linkedinbot',
  'mediapartners-google', 'adsbot-google', 'feedfetcher-google', 'google-read-aloud',
  'duckduckbot', 'facebookexternalhit', 'applebot', 'whatsapp', 'skypeuripreview',
  'twitterbot', 'slackbot', 'vkshare', 'w3c_validator', 'redditbot', 'rogerbot',
  'embedly', 'quora link preview', 'showyoubot', 'outbrain', 'pinterest/0.',
  'developers.google.com/+/web/snippet', 'tumblr', 'bitlybot', 'nuzzel',
  'discordbot', 'google page speed', 'qwantify', 'pinterestbot', 'baiduspider',
  'pinterest', 'flipboard', 'lighthouse', 'mj12bot', 'dotbot', 'semrushbot',
  'ahrefsbot', 'yandexbot', 'screaming frog', 'sitebulb', 'deepcrawl'
];

const BOT_UA_PATTERN = new RegExp(BOT_USER_AGENTS.join('|'), 'i');

function isBot(userAgent: string): boolean {
  return BOT_UA_PATTERN.test(userAgent);
}

function isStaticResource(url: string): boolean {
  const staticExtensions = [
    '.js', '.css', '.xml', '.less', '.png', '.jpg', '.jpeg', '.gif',
    '.pdf', '.doc', '.txt', '.ico', '.rss', '.zip', '.mp3', '.rar',
    '.exe', '.wmv', '.avi', '.ppt', '.mpg', '.mpeg', '.tif', '.wav',
    '.mov', '.psd', '.ai', '.xls', '.mp4', '.m4a', '.swf', '.dat',
    '.dmg', '.iso', '.flv', '.m4v', '.torrent', '.ttf', '.woff',
    '.svg', '.webmanifest', '.woff2', '.json', '.map'
  ];
  
  return staticExtensions.some(ext => url.toLowerCase().endsWith(ext));
}

function getCacheKey(url: string, userAgent: string): string {
  return `${url}:${isBot(userAgent) ? 'bot' : 'user'}`;
}

function cleanCache(): void {
  const now = Date.now();
  const expiredKeys: string[] = [];
  
  for (const [key, value] of prerenderCache.entries()) {
    if (now - value.timestamp > CACHE_DURATION * 1000) {
      expiredKeys.push(key);
    }
  }
  
  expiredKeys.forEach(key => prerenderCache.delete(key));
  
  // Remove oldest entries if cache is too large
  if (prerenderCache.size > MAX_CACHE_SIZE) {
    const entries = Array.from(prerenderCache.entries());
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
    const toRemove = entries.slice(0, prerenderCache.size - MAX_CACHE_SIZE);
    toRemove.forEach(([key]) => prerenderCache.delete(key));
  }
}

function generateEnhancedHTML(originalHtml: string, url: URL): string {
  // Clean cache periodically
  cleanCache();
  
  // Generate comprehensive structured data
  const enhancedMetaTags = `
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${url.href}">
    <meta property="og:site_name" content="Digital Marketing & SEO Expert">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@seoexpert">
    <link rel="canonical" href="${url.href}">
    <meta name="generator" content="Enhanced-SSR-v2">
    <meta name="theme-color" content="#0066cc">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "url": "${url.href}",
      "name": "Digital Marketing & SEO Expert Portfolio",
      "description": "Expert digital marketing and SEO services with proven results. Featured on HubSpot, SEO Testing, EmbedSocial, and AMA Phoenix.",
      "inLanguage": "en-US",
      "isPartOf": {
        "@type": "WebSite",
        "url": "${url.origin}",
        "name": "Digital Marketing Portfolio",
        "description": "Professional digital marketing and SEO services portfolio",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "${url.origin}/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      "mainEntity": {
        "@type": "Person",
        "@id": "${url.origin}/#person",
        "name": "Digital Marketing Expert",
        "jobTitle": "Senior Digital Marketing Strategist & SEO Specialist",
        "description": "Experienced digital marketing professional specializing in SEO, content strategy, technical optimization, and business growth with measurable results.",
        "url": "${url.origin}",
        "image": "${url.origin}/assets/professional-headshot.jpg",
        "sameAs": [
          "https://blog.hubspot.com/sales/ai-business-integration",
          "https://seotesting.com/blog/technical-seo-for-ecommerce/",
          "https://embedsocial.com/blog/increase-google-business-profile-traffic/",
          "https://amaphoenix.org/2024/01/25/how-to-approach-competitor-analysis-to-inform-your-marketing-strategy/"
        ],
        "knowsAbout": [
          "Search Engine Optimization",
          "Digital Marketing Strategy", 
          "Content Marketing",
          "Technical SEO",
          "Business Growth",
          "Competitor Analysis",
          "Google Business Profile Optimization",
          "AI-Powered Marketing",
          "E-commerce SEO",
          "Local SEO"
        ],
        "hasCredential": [
          {
            "@type": "EducationalOccupationalCredential",
            "name": "Google Analytics Certified",
            "credentialCategory": "Professional Certification"
          },
          {
            "@type": "EducationalOccupationalCredential", 
            "name": "HubSpot Content Marketing Certified",
            "credentialCategory": "Professional Certification"
          }
        ]
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "${url.origin}"
          }
        ]
      }
    }
    </script>`;

  return originalHtml.replace('<head>', `<head>${enhancedMetaTags}`);
}

export default async function handler(request: Request, context: Context) {
  const url = new URL(request.url);
  const userAgent = request.headers.get('user-agent') || '';
  const isSnapshotRequest = url.searchParams.has('_snapshot') || url.searchParams.has('_ssr');
  const cacheKey = getCacheKey(url.href, userAgent);
  
  // Skip processing for static resources
  if (isStaticResource(url.pathname)) {
    return context.next();
  }
  
  // Check if request is from a bot or explicit snapshot request
  const shouldPrerender = isBot(userAgent) || isSnapshotRequest;
  
  if (!shouldPrerender) {
    return context.next();
  }
  
  // Check cache first
  const cached = prerenderCache.get(cacheKey);
  if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION * 1000) {
    console.log(`Cache hit for: ${url.href}`);
    return new Response(cached.html, {
      headers: {
        ...cached.headers,
        'x-cache': 'HIT',
        'x-cache-timestamp': new Date(cached.timestamp).toISOString()
      }
    });
  }
  
  console.log(`SSR request detected: ${userAgent} requesting ${url.href}`);
  
  try {
    let html: string;
    const responseHeaders: Record<string, string> = {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=3600, s-maxage=7200, stale-while-revalidate=86400',
      'x-prerendered': 'true',
      'x-enhanced-ssr': 'v2',
      'x-bot-detected': isBot(userAgent).toString(),
      'x-snapshot-request': isSnapshotRequest.toString(),
      'x-user-agent': userAgent.substring(0, 100),
      'vary': 'User-Agent',
      'x-cache': 'MISS'
    };
    
    // Try Rendertron first for comprehensive rendering
    try {
      const rendertronUrl = `${RENDERTRON_URL}/${encodeURIComponent(url.href)}`;
      
      const response = await fetch(rendertronUrl, {
        headers: {
          'User-Agent': 'Enhanced-Netlify-Edge-Function-v2'
        },
        signal: AbortSignal.timeout(10000)
      });
      
      if (response.ok) {
        html = await response.text();
        responseHeaders['x-render-method'] = 'rendertron';
      } else {
        throw new Error(`Rendertron failed: ${response.status}`);
      }
    } catch (rendertronError) {
      console.log('Rendertron unavailable, using local snapshot');
      
      // Fallback: get the original response and enhance it
      const originalResponse = await context.next();
      html = await originalResponse.text();
      responseHeaders['x-render-method'] = 'local-enhanced';
    }
    
    // Enhance HTML with better meta tags and structured data
    const enhancedHtml = generateEnhancedHTML(html, url);
    
    // Cache the result
    prerenderCache.set(cacheKey, {
      html: enhancedHtml,
      timestamp: Date.now(),
      headers: responseHeaders
    });
    
    // Return enhanced HTML with appropriate headers
    return new Response(enhancedHtml, { headers: responseHeaders });
    
  } catch (error) {
    console.error('Enhanced SSR failed:', error);
    // Fallback to normal rendering
    return context.next();
  }
}