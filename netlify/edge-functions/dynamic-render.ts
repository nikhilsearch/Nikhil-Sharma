// Netlify Edge Function for dynamic rendering with Rendertron
// Based on Google's guidelines: https://developers.google.com/search/blog/2019/01/dynamic-rendering-with-rendertron

import type { Context } from "@netlify/edge-functions";

const RENDERTRON_URL = "https://render-tron.appspot.com/render";

// Bot user agents from Google's Rendertron guidelines
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
  'lighthouse'
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
    '.svg', '.webmanifest'
  ];
  
  return staticExtensions.some(ext => url.toLowerCase().endsWith(ext));
}

export default async function handler(request: Request, context: Context) {
  const url = new URL(request.url);
  const userAgent = request.headers.get('user-agent') || '';
  
  // Skip processing for static resources
  if (isStaticResource(url.pathname)) {
    return context.next();
  }
  
  // Check if request is from a bot
  if (!isBot(userAgent)) {
    return context.next();
  }
  
  console.log(`Bot detected: ${userAgent} requesting ${url.href}`);
  
  try {
    // Get prerendered content from Rendertron
    const rendertronUrl = `${RENDERTRON_URL}/${encodeURIComponent(url.href)}`;
    
    const response = await fetch(rendertronUrl, {
      headers: {
        'User-Agent': 'Netlify-Edge-Function-Prerender'
      },
      // Timeout after 10 seconds
      signal: AbortSignal.timeout(10000)
    });
    
    if (!response.ok) {
      console.error(`Rendertron error: ${response.status} ${response.statusText}`);
      return context.next();
    }
    
    const html = await response.text();
    
    // Return prerendered HTML with appropriate headers
    return new Response(html, {
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, max-age=3600', // Cache for 1 hour
        'x-prerendered': 'true',
        'x-bot-detected': userAgent
      }
    });
    
  } catch (error) {
    console.error('Prerender failed:', error);
    // Fallback to normal rendering
    return context.next();
  }
}