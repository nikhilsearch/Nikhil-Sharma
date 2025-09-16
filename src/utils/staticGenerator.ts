// Static Site Generation utility for enhanced SSR
// Generates static HTML files for better performance and SEO

export interface StaticRoute {
  path: string;
  priority: number;
  changeFreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  lastMod?: string;
}

export interface StaticGenerationConfig {
  routes: StaticRoute[];
  outputDir: string;
  baseUrl: string;
  enableSitemap: boolean;
  enableRobotsTxt: boolean;
}

export class StaticGenerator {
  private config: StaticGenerationConfig;

  constructor(config: StaticGenerationConfig) {
    this.config = config;
  }

  /**
   * Generate static HTML for all routes
   */
  async generateStaticSite(): Promise<void> {
    console.log('Starting static site generation...');

    for (const route of this.config.routes) {
      try {
        await this.generateStaticPage(route);
        console.log(`✓ Generated: ${route.path}`);
      } catch (error) {
        console.error(`✗ Failed to generate: ${route.path}`, error);
      }
    }

    if (this.config.enableSitemap) {
      await this.generateSitemap();
      console.log('✓ Generated sitemap.xml');
    }

    if (this.config.enableRobotsTxt) {
      await this.generateRobotsTxt();
      console.log('✓ Generated robots.txt');
    }

    console.log('Static site generation complete!');
  }

  /**
   * Generate static HTML for a single route
   */
  private async generateStaticPage(route: StaticRoute): Promise<void> {
    const url = `${this.config.baseUrl}${route.path}`;
    
    try {
      // Fetch the page with SSR enabled
      const response = await fetch(`${url}?_ssr=true`, {
        headers: {
          'User-Agent': 'StaticGenerator-Bot/1.0'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const html = await response.text();
      
      // Enhance HTML for static generation
      const enhancedHtml = this.enhanceStaticHTML(html, route);
      
      // Save to file system (in a real implementation)
      // For now, we'll just log the generation
      console.log(`Generated static HTML for ${route.path} (${html.length} bytes)`);
      
    } catch (error) {
      throw new Error(`Failed to generate static page for ${route.path}: ${error}`);
    }
  }

  /**
   * Enhance HTML for static generation
   */
  private enhanceStaticHTML(html: string, route: StaticRoute): string {
    const now = new Date().toISOString();
    
    const staticEnhancements = `
    <!-- Static Generation Info -->
    <meta name="generated-at" content="${now}">
    <meta name="generation-method" content="static">
    <meta name="route-priority" content="${route.priority}">
    <meta name="change-frequency" content="${route.changeFreq}">
    `;

    return html.replace('<head>', `<head>${staticEnhancements}`);
  }

  /**
   * Generate XML sitemap
   */
  private async generateSitemap(): Promise<void> {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${this.config.routes.map(route => `  <url>
    <loc>${this.config.baseUrl}${route.path}</loc>
    <lastmod>${route.lastMod || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route.changeFreq}</changefreq>
    <priority>${(route.priority / 10).toFixed(1)}</priority>
  </url>`).join('\n')}
</urlset>`;

    console.log('Generated sitemap.xml:', sitemap.length, 'bytes');
    return Promise.resolve(); // In real implementation, write to file
  }

  /**
   * Generate robots.txt
   */
  private async generateRobotsTxt(): Promise<void> {
    const robotsTxt = `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${this.config.baseUrl}/sitemap.xml

# Performance optimization
Crawl-delay: 1

# Block common bot paths
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: *.json$
Disallow: *.js$
Disallow: *.css$

# Allow important SEO pages
Allow: /blog/
Allow: /case-studies/
Allow: /services/`;

    console.log('Generated robots.txt:', robotsTxt.length, 'bytes');
    return Promise.resolve(); // In real implementation, write to file
  }
}

// Default configuration for the portfolio site
export const defaultStaticConfig: StaticGenerationConfig = {
  routes: [
    { path: '/', priority: 10, changeFreq: 'weekly' },
    { path: '/blog', priority: 8, changeFreq: 'daily' },
    { path: '/case-studies', priority: 7, changeFreq: 'weekly' },
    { path: '/services', priority: 9, changeFreq: 'monthly' },
    { path: '/contact', priority: 6, changeFreq: 'monthly' },
    { path: '/about', priority: 5, changeFreq: 'monthly' }
  ],
  outputDir: './dist',
  baseUrl: 'https://your-domain.com',
  enableSitemap: true,
  enableRobotsTxt: true
};

// Export singleton instance
export const staticGenerator = new StaticGenerator(defaultStaticConfig);