// SSR Service for fetching and analyzing server-side rendered content

export interface SSRSnapshot {
  html: string;
  headers: Record<string, string>;
  url: string;
  timestamp: string;
  isBot: boolean;
  isPrerendered: boolean;
  loadTime: number;
}

export interface MetaAnalysis {
  title: string;
  description: string;
  keywords: string;
  ogTags: Record<string, string>;
  twitterTags: Record<string, string>;
  canonicalUrl: string;
  metaTags: string[];
  linkTags: string[];
  structuredData: any[];
}

export class SSRService {
  /**
   * Fetch SSR snapshot for a given URL
   */
  static async fetchSnapshot(
    url: string, 
    options: {
      forceBot?: boolean;
      timeout?: number;
    } = {}
  ): Promise<SSRSnapshot> {
    const { forceBot = false, timeout = 10000 } = options;
    const startTime = performance.now();

    try {
      const targetUrl = new URL(url);
      
      // Add snapshot parameter if forcing bot view
      if (forceBot) {
        targetUrl.searchParams.set('_snapshot', 'true');
      }

      const response = await fetch(targetUrl.toString(), {
        headers: {
          'User-Agent': forceBot 
            ? 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
            : navigator.userAgent
        },
        signal: AbortSignal.timeout(timeout)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const html = await response.text();
      const headers: Record<string, string> = {};
      
      response.headers.forEach((value, key) => {
        headers[key] = value;
      });

      const loadTime = performance.now() - startTime;

      return {
        html,
        headers,
        url: targetUrl.toString(),
        timestamp: new Date().toISOString(),
        isBot: headers['x-bot-detected'] === 'true',
        isPrerendered: headers['x-prerendered'] === 'true',
        loadTime
      };
    } catch (error) {
      throw new Error(`Failed to fetch SSR snapshot: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Analyze meta tags and SEO data from HTML
   */
  static analyzeMetaData(html: string): MetaAnalysis {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Extract basic meta information
    const title = doc.querySelector('title')?.textContent || '';
    const description = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    const keywords = doc.querySelector('meta[name="keywords"]')?.getAttribute('content') || '';
    const canonicalUrl = doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';

    // Extract Open Graph tags
    const ogTags: Record<string, string> = {};
    doc.querySelectorAll('meta[property^="og:"]').forEach(meta => {
      const property = meta.getAttribute('property');
      const content = meta.getAttribute('content');
      if (property && content) {
        ogTags[property] = content;
      }
    });

    // Extract Twitter Card tags
    const twitterTags: Record<string, string> = {};
    doc.querySelectorAll('meta[name^="twitter:"]').forEach(meta => {
      const name = meta.getAttribute('name');
      const content = meta.getAttribute('content');
      if (name && content) {
        twitterTags[name] = content;
      }
    });

    // Extract all meta tags
    const metaTags: string[] = [];
    doc.querySelectorAll('meta').forEach(meta => {
      metaTags.push(meta.outerHTML);
    });

    // Extract all link tags
    const linkTags: string[] = [];
    doc.querySelectorAll('link').forEach(link => {
      linkTags.push(link.outerHTML);
    });

    // Extract structured data
    const structuredData: any[] = [];
    doc.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
      try {
        const data = JSON.parse(script.textContent || '');
        structuredData.push(data);
      } catch (e) {
        // Invalid JSON, skip
      }
    });

    return {
      title,
      description,
      keywords,
      ogTags,
      twitterTags,
      canonicalUrl,
      metaTags,
      linkTags,
      structuredData
    };
  }

  /**
   * Compare two SSR snapshots
   */
  static compareSnapshots(snapshot1: SSRSnapshot, snapshot2: SSRSnapshot): {
    htmlDiff: boolean;
    headersDiff: string[];
    metaDiff: {
      added: string[];
      removed: string[];
      changed: string[];
    };
  } {
    const htmlDiff = snapshot1.html !== snapshot2.html;

    // Compare headers
    const headersDiff: string[] = [];
    const allHeaders = new Set([
      ...Object.keys(snapshot1.headers),
      ...Object.keys(snapshot2.headers)
    ]);

    allHeaders.forEach(header => {
      const val1 = snapshot1.headers[header];
      const val2 = snapshot2.headers[header];
      
      if (val1 !== val2) {
        headersDiff.push(`${header}: "${val1}" → "${val2}"`);
      }
    });

    // Compare meta tags
    const meta1 = this.analyzeMetaData(snapshot1.html);
    const meta2 = this.analyzeMetaData(snapshot2.html);

    const metaDiff = {
      added: meta2.metaTags.filter(tag => !meta1.metaTags.includes(tag)),
      removed: meta1.metaTags.filter(tag => !meta2.metaTags.includes(tag)),
      changed: []
    };

    // Check for changed meta values
    if (meta1.title !== meta2.title) {
      metaDiff.changed.push(`title: "${meta1.title}" → "${meta2.title}"`);
    }
    if (meta1.description !== meta2.description) {
      metaDiff.changed.push(`description: "${meta1.description}" → "${meta2.description}"`);
    }

    return {
      htmlDiff,
      headersDiff,
      metaDiff
    };
  }

  /**
   * Generate SEO report from snapshot
   */
  static generateSEOReport(snapshot: SSRSnapshot): {
    score: number;
    issues: string[];
    recommendations: string[];
    analysis: MetaAnalysis;
  } {
    const analysis = this.analyzeMetaData(snapshot.html);
    const issues: string[] = [];
    const recommendations: string[] = [];
    let score = 100;

    // Check for basic SEO requirements
    if (!analysis.title) {
      issues.push('Missing page title');
      score -= 20;
    } else if (analysis.title.length > 60) {
      issues.push('Title tag too long (>60 characters)');
      score -= 5;
    }

    if (!analysis.description) {
      issues.push('Missing meta description');
      score -= 15;
    } else if (analysis.description.length > 160) {
      issues.push('Meta description too long (>160 characters)');
      score -= 5;
    }

    if (!analysis.canonicalUrl) {
      issues.push('Missing canonical URL');
      score -= 10;
    }

    if (Object.keys(analysis.ogTags).length === 0) {
      issues.push('Missing Open Graph tags');
      score -= 10;
    }

    if (analysis.structuredData.length === 0) {
      issues.push('No structured data found');
      score -= 10;
    }

    // Generate recommendations
    if (score < 90) {
      recommendations.push('Add missing meta tags for better SEO');
    }
    if (!analysis.structuredData.length) {
      recommendations.push('Implement structured data (Schema.org) for rich snippets');
    }
    if (Object.keys(analysis.twitterTags).length === 0) {
      recommendations.push('Add Twitter Card meta tags for better social sharing');
    }

    return {
      score: Math.max(0, score),
      issues,
      recommendations,
      analysis
    };
  }
}