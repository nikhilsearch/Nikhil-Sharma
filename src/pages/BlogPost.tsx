import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  Calendar, 
  Share2, 
  Twitter, 
  Facebook, 
  Linkedin,
  ChevronUp,
  CheckSquare
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/SEO/StructuredData";

// Sample blog post data - replace with real data from your CMS/API
const blogPost = {
  id: "advanced-seo-strategies-2025",
  title: "Advanced SEO Strategies for 2025: AI-Powered Optimization",
  excerpt: "Discover how AI is revolutionizing SEO and learn advanced strategies to boost your organic traffic by 300%+",
  content: `
## Introduction

Artificial intelligence is revolutionizing how we approach search engine optimization. As we move into 2025, traditional SEO tactics are evolving, and smart marketers are leveraging AI to gain competitive advantages.

In this comprehensive guide, we'll explore cutting-edge SEO strategies that combine proven fundamentals with innovative AI-powered techniques.

## What Is AI-Powered SEO?

AI-powered SEO refers to the use of artificial intelligence and machine learning technologies to enhance traditional search engine optimization efforts. Instead of relying solely on manual analysis and optimization, AI tools can:

- Analyze massive datasets in seconds
- Identify patterns humans might miss
- Automate repetitive optimization tasks
- Predict search trends before they happen
- Generate optimized content at scale

## Core AI SEO Strategies for 2025

### 1. Semantic Search Optimization

Modern search engines understand context and intent, not just keywords. Here's how to optimize for semantic search:

**Understanding User Intent**
- Use AI tools to analyze search queries and identify user intent
- Create content that matches the searcher's journey stage
- Optimize for related keywords and synonyms

**Entity-Based SEO**
- Focus on entities (people, places, things) rather than just keywords
- Build topical authority through comprehensive content coverage
- Use structured data to help search engines understand your content

### 2. AI-Powered Content Creation

**Content Generation Tools**
- Use AI writing assistants for initial drafts
- Generate multiple headline variations for A/B testing
- Create content outlines based on top-ranking competitors

**Content Optimization**
- Analyze top-performing content in your niche
- Identify content gaps and opportunities
- Optimize existing content for better performance

### 3. Technical SEO Automation

**Site Auditing**
- Automate technical SEO audits with AI-powered tools
- Identify and prioritize technical issues
- Monitor site performance continuously

**Performance Optimization**
- Use AI to optimize page load speeds
- Automate image compression and optimization
- Implement predictive caching strategies

## Implementation Strategies

### Phase 1: Foundation Building (Weeks 1-4)

**Week 1-2: Audit and Analysis**
- Conduct comprehensive site audit
- Analyze current keyword rankings
- Identify technical issues and opportunities

**Week 3-4: Strategy Development**
- Develop content strategy based on AI insights
- Create optimization roadmap
- Set up tracking and monitoring systems

### Phase 2: Content Optimization (Weeks 5-12)

**Content Creation**
- Develop AI-assisted content creation workflow
- Create comprehensive topic clusters
- Optimize existing high-potential content

**Technical Implementation**
- Implement structured data markup
- Optimize site architecture and internal linking
- Improve page speed and Core Web Vitals

### Phase 3: Scaling and Automation (Weeks 13-24)

**Automation Setup**
- Implement AI-powered monitoring systems
- Set up automated reporting and alerts
- Create scalable content production processes

**Performance Tracking**
- Monitor keyword rankings and traffic growth
- Track conversion improvements
- Analyze ROI and adjust strategies

## Tools and Technologies

### Essential AI SEO Tools

**Content Optimization**
- Surfer SEO for content optimization
- MarketMuse for content planning
- Clearscope for semantic optimization

**Technical SEO**
- Screaming Frog for site auditing
- DeepCrawl for enterprise monitoring
- Google Search Console for performance tracking

**Analytics and Reporting**
- Google Analytics 4 for advanced insights
- Data Studio for custom reporting
- SEMrush for competitive analysis

## Measuring Success

### Key Metrics to Track

**Organic Traffic Growth**
- Monitor overall organic traffic trends
- Track traffic for target keywords
- Analyze traffic quality and engagement

**Ranking Improvements**
- Track keyword position changes
- Monitor featured snippet captures
- Analyze SERP feature appearances

**Conversion Metrics**
- Measure organic conversion rates
- Track revenue from organic traffic
- Analyze user journey and behavior

### ROI Calculation

To calculate the ROI of your AI-powered SEO efforts:

1. **Revenue Attribution**: Track revenue directly attributed to organic traffic
2. **Cost Analysis**: Calculate total investment in tools, content, and resources
3. **ROI Formula**: (Revenue - Investment) / Investment × 100

## Advanced Techniques

### 1. Predictive SEO

Use AI to predict future search trends and prepare content in advance:

- Analyze search volume patterns
- Identify emerging topics in your industry
- Create content for trending topics before they peak

### 2. Personalized Search Optimization

Optimize for personalized search results:

- Understand how personalization affects rankings
- Create location-specific content
- Optimize for user behavior patterns

### 3. Voice Search Optimization

Prepare for the growing importance of voice search:

- Optimize for conversational queries
- Create FAQ-style content
- Focus on local search optimization

## Common Pitfalls to Avoid

### Over-Reliance on AI

While AI is powerful, human oversight is crucial:

- Always review AI-generated content
- Maintain brand voice and quality standards
- Use AI as a tool, not a replacement for strategy

### Ignoring User Experience

Technical optimization means nothing without good UX:

- Prioritize page speed and mobile experience
- Ensure content is genuinely helpful
- Focus on user satisfaction metrics

### Neglecting Local SEO

Don't forget about local search optimization:

- Optimize Google My Business listings
- Create location-specific content
- Build local citations and reviews

## Future Outlook

As we look toward the future of SEO, several trends will shape the landscape:

### Emerging Technologies

**AI and Machine Learning**
- More sophisticated understanding of content quality
- Improved natural language processing
- Better prediction of user intent

**Visual and Voice Search**
- Increased importance of image optimization
- Growth in voice search queries
- New opportunities for content discovery

### Evolving Search Behavior

**Mobile-First Indexing**
- Continued emphasis on mobile optimization
- Importance of page speed and Core Web Vitals
- Mobile user experience as ranking factor

**E-A-T (Expertise, Authoritativeness, Trustworthiness)**
- Greater emphasis on content quality and authority
- Importance of author credentials and expertise
- Trust signals becoming more critical

## Conclusion

AI-powered SEO represents the future of search optimization. By combining traditional SEO fundamentals with innovative AI technologies, you can achieve remarkable results and stay ahead of the competition.

The key is to start implementing these strategies systematically, measure your results, and continuously optimize based on data insights. Remember that SEO is a long-term investment, and the efforts you make today will compound over time.

Ready to revolutionize your SEO strategy? Start with a comprehensive audit of your current approach and identify opportunities to integrate AI-powered tools and techniques.

## Take Action Today

1. **Audit Your Current SEO**: Use AI tools to identify quick wins and opportunities
2. **Develop Your Strategy**: Create a comprehensive plan based on the strategies outlined above
3. **Start Implementation**: Begin with high-impact, low-effort optimizations
4. **Monitor and Optimize**: Track your results and continuously improve your approach

The future of SEO is here, and it's powered by artificial intelligence. Don't get left behind – start implementing these strategies today and watch your organic traffic soar.
  `,
  author: {
    name: "Nikhil Sharma",
    avatar: "/lovable-uploads/841ad87e-550c-470b-bbf2-4286877526c9.png",
    role: "Digital Marketing Specialist",
    bio: "Nikhil is a digital marketing specialist with 6+ years of experience in SEO, content marketing, and AI-powered optimization strategies."
  },
  category: "SEO",
  date: "2025-01-15",
  readTime: "28min read",
  image: "/lovable-uploads/ce220e1a-ebc4-44ea-ad0a-b9b052690dad.png",
  tags: ["SEO", "AI", "Content Marketing", "Digital Strategy"]
};

const relatedPosts = [
  {
    id: "1",
    title: "Content Marketing ROI: How to Measure Performance",
    image: "/lovable-uploads/d51feb89-7e27-4c22-a309-218e50771efd.png",
    slug: "content-marketing-roi-measurement"
  },
  {
    id: "2",
    title: "Social Media Marketing Trends for 2025",
    image: "/lovable-uploads/d2660981-df09-44a7-a121-b45a0e93a84b.png",
    slug: "social-media-trends-2025"
  }
];

const tableOfContents = [
  { id: "introduction", title: "Introduction" },
  { id: "what-is-ai-powered-seo", title: "What Is AI-Powered SEO?" },
  { id: "core-ai-seo-strategies", title: "Core AI SEO Strategies for 2025" },
  { id: "implementation-strategies", title: "Implementation Strategies" },
  { id: "tools-and-technologies", title: "Tools and Technologies" },
  { id: "measuring-success", title: "Measuring Success" },
  { id: "advanced-techniques", title: "Advanced Techniques" },
  { id: "common-pitfalls", title: "Common Pitfalls to Avoid" },
  { id: "future-outlook", title: "Future Outlook" },
  { id: "conclusion", title: "Conclusion" }
];

const BlogPost = () => {
  const { slug } = useParams();
  const [showTableOfContents, setShowTableOfContents] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = tableOfContents.map(item => document.getElementById(item.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(tableOfContents[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shareUrl = window.location.href;
  const shareTitle = blogPost.title;

  const handleShare = (platform: string) => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    };
    
    window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <StructuredData 
        type="Article" 
        data={{
          headline: blogPost.title,
          description: blogPost.excerpt,
          author: {
            "@type": "Person",
            "name": blogPost.author.name
          },
          datePublished: blogPost.date,
          dateModified: blogPost.date,
          image: blogPost.image,
          publisher: {
            "@type": "Person",
            "name": "Nikhil Sharma"
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": window.location.href
          }
        }} 
      />

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-12 lg:py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="space-y-6">
                {/* Breadcrumb */}
                <nav className="text-sm text-muted-foreground">
                  <Link to="/blog" className="hover:text-primary transition-colors">
                    Blog
                  </Link>
                  <span className="mx-2">/</span>
                  <Badge variant="outline">{blogPost.category}</Badge>
                </nav>

                {/* Title and Meta */}
                <div className="space-y-4">
                  <h1 className="text-3xl lg:text-5xl font-bold text-foreground leading-tight">
                    {blogPost.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={blogPost.author.avatar} alt={blogPost.author.name} />
                        <AvatarFallback>{blogPost.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{blogPost.author.name}</p>
                        <p className="text-xs">{blogPost.author.role}</p>
                      </div>
                    </div>
                    
                    <Separator orientation="vertical" className="h-8" />
                    
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(blogPost.date).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{blogPost.readTime}</span>
                    </div>
                  </div>

                  {/* Share Buttons */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Share:</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleShare('twitter')}
                      className="p-2"
                    >
                      <Twitter className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleShare('linkedin')}
                      className="p-2"
                    >
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleShare('facebook')}
                      className="p-2"
                    >
                      <Facebook className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Image */}
          <section className="mb-12">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="aspect-video rounded-lg overflow-hidden">
                <img 
                  src={blogPost.image} 
                  alt={blogPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </section>

          {/* Article Content */}
          <section className="pb-16">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="grid lg:grid-cols-4 gap-12">
                {/* Table of Contents - Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 space-y-6">
                    {/* Toggle for mobile */}
                    <Button
                      variant="outline"
                      onClick={() => setShowTableOfContents(!showTableOfContents)}
                      className="lg:hidden w-full justify-between"
                    >
                      Table of Contents
                      <ChevronUp className={`w-4 h-4 transition-transform ${showTableOfContents ? 'rotate-180' : ''}`} />
                    </Button>

                    {/* Table of Contents */}
                    <Card className={`${showTableOfContents ? 'block' : 'hidden'} lg:block`}>
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-foreground mb-4">Table of Contents</h3>
                        <nav className="space-y-2">
                          {tableOfContents.map((item) => (
                            <a
                              key={item.id}
                              href={`#${item.id}`}
                              className={`block text-sm transition-colors hover:text-primary ${
                                activeSection === item.id ? 'text-primary font-medium' : 'text-muted-foreground'
                              }`}
                            >
                              {item.title}
                            </a>
                          ))}
                        </nav>
                      </CardContent>
                    </Card>

                    {/* CTA Card */}
                    <Card className="bg-primary/5 border-primary/20">
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-center gap-2">
                          <CheckSquare className="w-5 h-5 text-primary" />
                          <h3 className="font-semibold text-foreground">Start using these strategies today</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Boost your organic traffic</li>
                          <li>• Improve search rankings</li>
                          <li>• Get expert guidance</li>
                        </ul>
                        <Button className="w-full">
                          Get Started
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">
                  <article className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80">
                    <div dangerouslySetInnerHTML={{ __html: blogPost.content.replace(/\n/g, '<br />') }} />
                  </article>
                  
                  {/* Tags */}
                  <div className="mt-12 pt-8 border-t border-border">
                    <div className="flex flex-wrap gap-2">
                      {blogPost.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Author Bio */}
                  <Card className="mt-8">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={blogPost.author.avatar} alt={blogPost.author.name} />
                          <AvatarFallback>{blogPost.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">{blogPost.author.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{blogPost.author.role}</p>
                          <p className="text-sm text-muted-foreground">{blogPost.author.bio}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Related Posts */}
                  <div className="mt-12">
                    <h3 className="text-2xl font-bold text-foreground mb-6">Related Articles</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {relatedPosts.map((post) => (
                        <Link key={post.id} to={`/blog/${post.slug}`}>
                          <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20 overflow-hidden">
                            <div className="aspect-video overflow-hidden">
                              <img 
                                src={post.image} 
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <CardContent className="p-4">
                              <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                {post.title}
                              </h4>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;