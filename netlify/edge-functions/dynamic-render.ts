// Netlify Edge Function for enhanced SSR dynamic rendering
// Supports both Rendertron and local snapshot generation

import type { Context } from "@netlify/edge-functions";

const RENDERTRON_URL = "https://render-tron.appspot.com/render";

// Comprehensive bot user agents for better detection
const BOT_USER_AGENTS = [
  'googlebot',
  'google-structured-data-testing-tool',
  'bingbot',
  'linkedinbot',
  'mediapartners-google',
  'adsbot-google',
  'feedfetcher-google',
  'google-read-aloud',
  'duckduckbot',
  'facebookexternalhit',
  'applebot',
  'whatsapp',
  'skypeuripreview',
  'twitterbot',
  'slackbot',
  'vkshare',
  'w3c_validator',
  'redditbot',
  'rogerbot',
  'embedly',
  'quora link preview',
  'showyoubot',
  'outbrain',
  'pinterest/0.',
  'developers.google.com/+/web/snippet',
  'tumblr',
  'bitlybot',
  'nuzzel',
  'discordbot',
  'google page speed',
  'qwantify',
  'pinterestbot',
  'baiduspider',
  'pinterest',
  'flipboard',
  'lighthouse',
  'mj12bot',
  'dotbot',
  'semrushbot'
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
    '.svg', '.webmanifest', '.woff2'
  ];
  
  return staticExtensions.some(ext => url.toLowerCase().endsWith(ext));
}

function generateEnhancedHTML(originalHtml: string, url: URL): string {
  // Enhanced meta tags and structured data for better SEO
  const enhancedMetaTags = `
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${url.href}">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="canonical" href="${url.href}">
    <meta name="generator" content="Netlify-Edge-SSR">
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "url": "${url.href}",
      "name": "Digital Marketing & SEO Expert Portfolio",
      "description": "Expert digital marketing and SEO services with proven results. Featured on HubSpot, SEO Testing, EmbedSocial, and AMA Phoenix.",
      "mainEntity": {
        "@type": "Person",
        "@id": "${url.origin}/#person",
        "name": "Digital Marketing Expert",
        "jobTitle": "Senior Digital Marketing Strategist & SEO Specialist",
        "description": "Experienced digital marketing professional specializing in SEO, content strategy, technical optimization, and business growth with measurable results.",
        "url": "${url.origin}",
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
          "Google Business Profile Optimization"
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
  
  // Skip processing for static resources
  if (isStaticResource(url.pathname)) {
    return context.next();
  }
  
  // Check if request is from a bot or explicit snapshot request
  const shouldPrerender = isBot(userAgent) || isSnapshotRequest;
  
  if (!shouldPrerender) {
    return context.next();
  }
  
  console.log(`SSR request detected: ${userAgent} requesting ${url.href}`);
  
  try {
    let html: string;
    
    // Try Rendertron first for comprehensive rendering
    try {
      const rendertronUrl = `${RENDERTRON_URL}/${encodeURIComponent(url.href)}`;
      
      const response = await fetch(rendertronUrl, {
        headers: {
          'User-Agent': 'Netlify-Edge-Function-Enhanced-Prerender'
        },
        signal: AbortSignal.timeout(8000)
      });
      
      if (response.ok) {
        html = await response.text();
      } else {
        throw new Error(`Rendertron failed: ${response.status}`);
      }
    } catch (rendertronError) {
      console.log('Rendertron unavailable, using local snapshot');
      
      // Fallback: get the original response and enhance it
      const originalResponse = await context.next();
      html = await originalResponse.text();
    }
    
    // Enhance HTML with better meta tags and structured data
    const enhancedHtml = generateEnhancedHTML(html, url);
    
    // Return enhanced HTML with appropriate headers
    return new Response(enhancedHtml, {
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, max-age=3600, s-maxage=7200',
        'x-prerendered': 'true',
        'x-enhanced-ssr': 'true',
        'x-bot-detected': isBot(userAgent).toString(),
        'x-snapshot-request': isSnapshotRequest.toString(),
        'x-user-agent': userAgent,
        'vary': 'User-Agent'
      }
    });
    
  } catch (error) {
    console.error('Enhanced SSR failed:', error);
    // Fallback to normal rendering
    return context.next();
  }
}