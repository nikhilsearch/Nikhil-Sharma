// Prerender utility for dynamic rendering
// Implements client-side prerendering support for bot detection

import { isBot } from './botDetection';

export interface PrerenderConfig {
  rendertronUrl?: string;
  timeout?: number;
  enableCache?: boolean;
}

export const defaultConfig: PrerenderConfig = {
  rendertronUrl: process.env.RENDERTRON_URL || 'https://render-tron.appspot.com/render',
  timeout: 10000,
  enableCache: true
};

export class PrerenderManager {
  private config: PrerenderConfig;

  constructor(config: PrerenderConfig = {}) {
    this.config = { ...defaultConfig, ...config };
  }

  public shouldPrerender(userAgent?: string, url?: string): boolean {
    // Check if request is from a bot
    if (!isBot(userAgent)) {
      return false;
    }

    // Skip prerendering for certain file types
    if (url && this.isStaticResource(url)) {
      return false;
    }

    return true;
  }

  private isStaticResource(url: string): boolean {
    const staticExtensions = ['.js', '.css', '.xml', '.less', '.png', '.jpg', '.jpeg', '.gif', '.pdf', '.doc', '.txt', '.ico', '.rss', '.zip', '.mp3', '.rar', '.exe', '.wmv', '.doc', '.avi', '.ppt', '.mpg', '.mpeg', '.tif', '.wav', '.mov', '.psd', '.ai', '.xls', '.mp4', '.m4a', '.swf', '.dat', '.dmg', '.iso', '.flv', '.m4v', '.torrent', '.ttf', '.woff', '.svg', '.webmanifest'];
    
    return staticExtensions.some(ext => url.toLowerCase().endsWith(ext));
  }

  public async prerenderUrl(url: string): Promise<string> {
    try {
      const rendertronUrl = `${this.config.rendertronUrl}/${encodeURIComponent(url)}`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

      const response = await fetch(rendertronUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Prerender Bot'
        }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Rendertron returned ${response.status}: ${response.statusText}`);
      }

      return await response.text();
    } catch (error) {
      console.error('Prerender failed:', error);
      throw error;
    }
  }
}

export const prerenderManager = new PrerenderManager();