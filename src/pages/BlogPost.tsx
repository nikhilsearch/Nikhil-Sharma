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

// Your blog post data
const blogPost = {
  id: "what-is-generative-engine-optimization",
  title: "What Is Generative Engine Optimization",
  excerpt: "Are You Ready to Future-Proof Your Brand? The Invisible Revolution of Generative Engine Optimization is Here",
  content: `Have you ever felt like the digital world is a giant, ever-changing maze? One minute you've mastered the rules, and the next, a new platform or technology appears and changes everything. You've put in the time and effort to build a strong online presence, and you've probably become an expert at traditional SEO, the art of getting your website to show up in a list of search results. But what if the very way people search for information is fundamentally shifting?

A quiet but powerful revolution is underway, and it's being led by AI. Today, millions of people are no longer starting their search on Google's famous ten blue links. They're going to AI assistants like ChatGPT, Claude, and Google's own AI Overviews for a single, direct, and comprehensive answer to their question. They aren't looking for a website to click on; they're looking for a summary, a citation, or a direct response.

This is the world of Generative Engine Optimization (GEO). It's not about competing for clicks. It's about becoming the trusted, authoritative source that these intelligent assistants rely on to provide their answers. It's about ensuring that your knowledge, your expertise, and your brand's voice are directly featured in the conversations that are shaping the future of information.

## Beyond Clicks: Why the AI Revolution Demands a New SEO Strategy

Traditional SEO is an art form focused on getting traffic to your website. It's a wonderful, proven strategy. You optimize for keywords, build backlinks, and perfect technical elements to climb the ranks of a search results page. Your ultimate goal is a user's click.

Generative Engine Optimization has a different goal. It's about being understood. Think of an AI model as an incredibly smart, highly efficient student. This student's job is to read and understand all the information on the internet and then, when asked a question, provide a single, well-reasoned answer based on the most reliable sources. Your job, with GEO, is to be one of those reliable sources.

The goal isn't just to get a click; it's to be the source that gets cited. When an AI response mentions, "According to [Your Brand's Name],...", you've achieved a level of brand authority and recognition that a simple click can't match. This is a profound shift from driving traffic to building trust and reputation directly in the AI's response itself. It's about being a foundational part of the knowledge graph that these systems rely on.

## The Psychology Behind AI Search: Why GEO Resonates with Modern Users

Why are people turning to AI for answers? It's simple: they're tired of sifting through noise. In a world saturated with information, we crave clarity and efficiency. We don't want to open ten different tabs to find one answer. We want a summary, a synthesis, a direct path to the truth.

Generative AI provides this. It skips the middleman (the list of links) and gives us the final product the answer. For a user, this is incredibly convenient and satisfying. For more details on the evolution of this type of search, Google has officially acknowledged the shift, stating that AI Overviews will begin rolling out to everyone in the U.S., with a focus on answering complex questions in one go.

For your brand, this means your content must be tailored to this new user behavior. Your content should be created with the explicit purpose of answering a question in a clear, concise, and comprehensive way. It's not enough to hint at the answer; you must provide it. This is where GEO really shines. By mastering this, you become a go-to entity for both AI and the human users who interact with it.

## Your Path to Becoming an AI Authority: The Core Pillars of a GEO Strategy

So, how do you make your content an irresistible choice for a generative AI model? It's a multi-faceted approach that goes beyond simple keyword placement.

### 1. Create Content for Understanding, Not Just Keywords

Forget keyword density. Think about a topic from every possible angle. Your goal is to build an entire knowledge hub around a topic, demonstrating comprehensive expertise. For instance, a recent research paper on Generative Engine Optimization found that adding statistics, citations, and quotations can boost content visibility in generative engines by up to 40%.

**Action Items:**

• **Map a Topic Cluster**: Instead of one blog post, create a "pillar page" that provides a comprehensive overview of a broad topic (e.g., "Sustainable Gardening").
• **Build Supporting Content**: Write a series of detailed articles that answer specific, related questions (e.g., "Best Organic Fertilizers," "How to Grow Tomatoes," "Natural Pest Control").
• **Link Everything Together**: Use internal links to connect all your related content, showing AI the relationship between each piece.

### 2. Master the Art of Direct, Comprehensive Answers

AI loves a clear, definitive answer. Use structured content to make your information easy for AI to process.

**Action Items:**

• **Use Question-Based Headings**: Frame your headings as direct questions (e.g., "What is Generative Engine Optimization?") and follow them immediately with the answer.
• **Provide Concise Summaries**: Start your content or key sections with a brief, clear summary that gives the main point upfront.
• **Use Lists and Bullet Points**: Break down complex information into easy-to-read lists. This is a powerful way to make your content digestible for both humans and AI.

### 3. Build Unassailable Authority and Trust

AI models are trained to prioritize high-quality, trustworthy information. This is where your brand's reputation comes into play. Search Engine Land highlights that while E-E-A-T isn't a direct ranking factor, applying its principles helps build user trust, which in turn leads to better performance in both SEO and GEO.

**Action Items:**

• **Cite Your Sources**: Link to credible, authoritative sources to back up your claims.
• **Showcase Your Expertise**: Include author bios with clear qualifications and expertise.
• **Use Data and Statistics**: Back up your claims with hard numbers from reputable studies or your own proprietary data.

### 4. The Technical Backbone: A Clean Website is an AI's Best Friend

While GEO is heavily focused on content, the technical foundation of your website is still crucial. A slow, cluttered, or confusing website is difficult for AI to crawl and understand.

**Action Items:**

• **Implement Structured Data (Schema Markup)**: Use schema markup (like FAQPage or Article schema) to explicitly tell the AI what your content is about.
• **Ensure Clean Site Architecture**: Make sure your website's navigation is logical and your internal linking is sensible.
• **Optimize for Speed**: A fast-loading site is a signal of a well-maintained, professional brand.

## Practical Steps to Start Your GEO Journey

Ready to put these ideas into action? Here's a quick checklist to get you started on your path to becoming an AI authority:

1. **Conduct "AI-Driven" User Research**: Go beyond simple keyword research. Use tools like ChatGPT or Perplexity to ask common questions in your industry and analyze the responses.

2. **Audit Your Existing Content**: Look at your top-performing blog posts. How could you make them more comprehensive and direct in their answers?

3. **Create a New Content Pillar**: Choose a major topic and build an entire cluster of content around it, with one long-form, comprehensive piece as the central hub.

4. **Monitor AI Overviews and Chatbot Responses**: Search for your key topics and see what the AI generates. If your competitors are being cited, study their content to understand why.

5. **Embrace the Future**: The key to success is to see GEO as an ongoing, evolving strategy. As Search Engine Journal notes, winning in the GEO space means focusing on concrete workflows, from creating for machine-readability to embracing social media (source: <a href="https://www.searchenginejournal.com/win-generative-engine-optimization-peecai-spa/550612/" target="_blank" rel="noopener noreferrer">Search Engine Journal on Winning in GEO</a>). The more you produce high-quality, authoritative, and AI-friendly content, the more you cement your brand as a foundational pillar of knowledge in your industry.

## Conclusion

The future of search is conversational and intelligent. It's no longer just about optimizing for an algorithm; it's about optimizing for understanding. By embracing Generative Engine Optimization, you are not just positioning your brand for short-term visibility, you are securing its place in the future of how information is found and shared.`,
  author: {
    name: "Nikhil Sharma",
    avatar: "/lovable-uploads/841ad87e-550c-470b-bbf2-4286877526c9.png",
    role: "Digital Marketing Specialist",
    bio: "Nikhil is a digital marketing specialist with 6+ years of experience in SEO, content marketing, and AI-powered optimization strategies."
  },
  category: "SEO",
  date: "2025-01-15",
  readTime: "12min read",
  image: "/lovable-uploads/b674ab5d-c4ab-4f11-b4fc-a8be5d4162e2.png",
  tags: ["GEO", "AI", "SEO", "Digital Marketing", "Future of Search"]
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
  { id: "beyond-clicks", title: "Beyond Clicks: Why the AI Revolution Demands a New SEO Strategy" },
  { id: "psychology-behind-ai-search", title: "The Psychology Behind AI Search" },
  { id: "core-pillars", title: "Your Path to Becoming an AI Authority" },
  { id: "create-content-for-understanding", title: "1. Create Content for Understanding, Not Just Keywords" },
  { id: "master-direct-answers", title: "2. Master the Art of Direct, Comprehensive Answers" },
  { id: "build-authority-trust", title: "3. Build Unassailable Authority and Trust" },
  { id: "technical-backbone", title: "4. The Technical Backbone" },
  { id: "practical-steps", title: "Practical Steps to Start Your GEO Journey" },
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

  const formatContent = (content: string) => {
    // Add proper IDs to headings for table of contents
    let formattedContent = content
      // Convert H2 headings with proper IDs
      .replace(/## Beyond Clicks: Why the AI Revolution Demands a New SEO Strategy/g, '<h2 id="beyond-clicks">Beyond Clicks: Why the AI Revolution Demands a New SEO Strategy</h2>')
      .replace(/## The Psychology Behind AI Search: Why GEO Resonates with Modern Users/g, '<h2 id="psychology-behind-ai-search">The Psychology Behind AI Search: Why GEO Resonates with Modern Users</h2>')
      .replace(/## Your Path to Becoming an AI Authority: The Core Pillars of a GEO Strategy/g, '<h2 id="core-pillars">Your Path to Becoming an AI Authority: The Core Pillars of a GEO Strategy</h2>')
      .replace(/## Practical Steps to Start Your GEO Journey/g, '<h2 id="practical-steps">Practical Steps to Start Your GEO Journey</h2>')
      .replace(/## Conclusion/g, '<h2 id="conclusion">Conclusion</h2>')
      // Convert H3 headings with proper IDs
      .replace(/### 1\. Create Content for Understanding, Not Just Keywords/g, '<h3 id="create-content-for-understanding">1. Create Content for Understanding, Not Just Keywords</h3>')
      .replace(/### 2\. Master the Art of Direct, Comprehensive Answers/g, '<h3 id="master-direct-answers">2. Master the Art of Direct, Comprehensive Answers</h3>')
      .replace(/### 3\. Build Unassailable Authority and Trust/g, '<h3 id="build-authority-trust">3. Build Unassailable Authority and Trust</h3>')
      .replace(/### 4\. The Technical Backbone: A Clean Website is an AI\'s Best Friend/g, '<h3 id="technical-backbone">4. The Technical Backbone: A Clean Website is an AI\'s Best Friend</h3>')
      // Bold text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Convert bullet points to proper lists with bullets
      .replace(/^• (.*)$/gm, '<li>$1</li>')
      .replace(/(<li>.*?<\/li>(\n<li>.*?<\/li>)*)/gs, '<ul>$1</ul>')
      // Convert numbered lists
      .replace(/^(\d+)\. (.*)$/gm, '<li>$2</li>')
      .replace(/(<li>.*?<\/li>(\n<li>.*?<\/li>)*)/gs, (match) => {
        // Check if this is part of the practical steps section
        if (match.includes('Conduct \"AI-Driven\"') || match.includes('Audit Your Existing') || match.includes('Create a New Content') || match.includes('Monitor AI Overviews') || match.includes('Embrace the Future')) {
          return `<ol>${match}</ol>`;
        }
        return `<ul>${match}</ul>`;
      })
      // Handle action items
      .replace(/\*\*Action Items:\*\*/g, '<h4>Action Items:</h4>')
      // Convert paragraphs
      .replace(/\n\n/g, '</p><p>')
      .replace(/^/, '<p>')
      .replace(/$/, '</p>')
      // Clean up empty paragraphs and fix heading formatting
      .replace(/<p><\/p>/g, '')
      .replace(/<p>(<h[1-6])/g, '$1')
      .replace(/(<\/h[1-6])><\/p>/g, '$1>')
      .replace(/<p>(<ol>)/g, '$1')
      .replace(/(<\/ol>)<\/p>/g, '$1')
      .replace(/<p>(<ul>)/g, '$1')
      .replace(/(<\/ul>)<\/p>/g, '$1')
      .replace(/<p>(<h4>)/g, '$1')
      .replace(/(<\/h4>)<\/p>/g, '$1')
      .replace(/<\/ul>\s*<ul>/g, '') // Merge consecutive lists
      .replace(/<\/ol>\s*<ol>/g, ''); // Merge consecutive numbered lists

    return formattedContent;
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
              <div className="aspect-video rounded-lg overflow-hidden shadow-2xl">
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
                              onClick={(e) => {
                                e.preventDefault();
                                const element = document.getElementById(item.id);
                                if (element) {
                                  element.scrollIntoView({ 
                                    behavior: 'smooth',
                                    block: 'start'
                                  });
                                }
                              }}
                              className={`block text-sm hover:text-primary transition-colors py-2 px-3 rounded-md ${
                                activeSection === item.id 
                                  ? 'text-primary bg-primary/10 font-medium border-l-2 border-primary' 
                                  : 'text-muted-foreground hover:bg-muted/50'
                              }`}
                            >
                              {item.title}
                            </a>
                          ))}
                        </nav>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">
                  <article className="space-y-8">
                    <div className="space-y-6">
                      <div 
                        className="prose prose-lg max-w-none text-foreground
                        prose-headings:text-foreground prose-headings:font-bold prose-headings:scroll-mt-24
                        prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-0 prose-h1:leading-tight prose-h1:border-b prose-h1:border-border prose-h1:pb-4
                        prose-h2:text-2xl prose-h2:mb-6 prose-h2:mt-12 prose-h2:border-b prose-h2:border-border prose-h2:pb-3 prose-h2:scroll-mt-24
                        prose-h3:text-xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:font-semibold prose-h3:scroll-mt-24
                        prose-h4:text-lg prose-h4:mb-3 prose-h4:mt-6 prose-h4:font-semibold prose-h4:text-primary
                        prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6 prose-p:text-base
                        prose-strong:text-foreground prose-strong:font-semibold
                        prose-ul:my-6 prose-ul:space-y-2 prose-ul:pl-6
                        prose-ol:my-6 prose-ol:space-y-2 prose-ol:pl-6
                        prose-li:text-muted-foreground prose-li:leading-relaxed prose-li:text-base prose-li:mb-2
                        prose-li:marker:text-primary prose-li:marker:font-medium
                        prose-blockquote:border-primary prose-blockquote:bg-muted/50 prose-blockquote:p-6 prose-blockquote:rounded-lg prose-blockquote:my-8
                        prose-code:text-primary prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                        prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:p-4 prose-pre:rounded-lg prose-pre:my-6
                        prose-a:text-primary prose-a:underline prose-a:decoration-primary/30 hover:prose-a:decoration-primary prose-a:font-medium
                        [&>*:first-child]:mt-0
                        [&_ul]:list-disc [&_ol]:list-decimal [&_ol]:pl-6
                        [&_ul_li]:list-item [&_ol_li]:list-item [&_li]:ml-0 
                        [&_ol_li]:pl-2 [&_ul_li]:pl-2"
                        dangerouslySetInnerHTML={{ 
                          __html: formatContent(blogPost.content)
                        }}
                      />
                    </div>

                    {/* Tags */}
                    <div className="pt-8 border-t border-border">
                      <div className="flex flex-wrap gap-2">
                        {blogPost.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-sm">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Author Bio */}
                    <Card className="bg-muted/50">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={blogPost.author.avatar} alt={blogPost.author.name} />
                            <AvatarFallback>{blogPost.author.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-2">
                            <h3 className="font-semibold text-foreground text-lg">{blogPost.author.name}</h3>
                            <p className="text-sm text-primary font-medium">{blogPost.author.role}</p>
                            <p className="text-muted-foreground text-sm leading-relaxed">{blogPost.author.bio}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </article>
                </div>
              </div>
            </div>
          </section>

          {/* Related Articles */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="text-3xl font-bold text-foreground mb-8">Related Articles</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {relatedPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-foreground text-lg mb-3 hover:text-primary transition-colors">
                        <Link to={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/blog/${post.slug}`}>
                          Read More
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
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