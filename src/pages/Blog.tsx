import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Clock, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/SEO/StructuredData";

// Sample blog data - replace with real data from your CMS/API
const featuredPost = {
  id: "featured-1",
  title: "Advanced SEO Strategies for 2025: AI-Powered Optimization",
  excerpt: "Discover how AI is revolutionizing SEO and learn advanced strategies to boost your organic traffic by 300%+",
  author: {
    name: "Nikhil Sharma",
    avatar: "/lovable-uploads/841ad87e-550c-470b-bbf2-4286877526c9.png",
    role: "Digital Marketing Specialist"
  },
  category: "SEO",
  date: "2025-01-15",
  readTime: "8min read",
  image: "/lovable-uploads/ce220e1a-ebc4-44ea-ad0a-b9b052690dad.png",
  slug: "advanced-seo-strategies-2025"
};

const recentPosts = [
  {
    id: "1",
    title: "Content Marketing ROI: How to Measure and Improve Performance",
    excerpt: "Learn proven strategies to track and optimize your content marketing ROI with data-driven insights.",
    author: {
      name: "Nikhil Sharma",
      avatar: "/lovable-uploads/841ad87e-550c-470b-bbf2-4286877526c9.png"
    },
    category: "Content Marketing",
    date: "2025-01-10",
    readTime: "6min read",
    image: "/lovable-uploads/d51feb89-7e27-4c22-a309-218e50771efd.png",
    slug: "content-marketing-roi-measurement"
  },
  {
    id: "2", 
    title: "Social Media Marketing Trends That Will Dominate 2025",
    excerpt: "Stay ahead of the curve with these emerging social media trends and platforms that savvy marketers are already leveraging.",
    author: {
      name: "Nikhil Sharma",
      avatar: "/lovable-uploads/841ad87e-550c-470b-bbf2-4286877526c9.png"
    },
    category: "Social Media",
    date: "2025-01-08",
    readTime: "5min read",
    image: "/lovable-uploads/d2660981-df09-44a7-a121-b45a0e93a84b.png",
    slug: "social-media-trends-2025"
  },
  {
    id: "3",
    title: "Email Marketing Automation: Complete Guide to Drip Campaigns",
    excerpt: "Build high-converting email sequences that nurture leads and drive sales with advanced automation strategies.",
    author: {
      name: "Nikhil Sharma", 
      avatar: "/lovable-uploads/841ad87e-550c-470b-bbf2-4286877526c9.png"
    },
    category: "Email Marketing",
    date: "2025-01-05",
    readTime: "7min read",
    image: "/lovable-uploads/dd6ffc15-a466-42d6-806a-b1e09afa7961.png",
    slug: "email-marketing-automation-guide"
  }
];

const popularPosts = [
  {
    id: "4",
    title: "SEO Case Study: 10x Organic Traffic Growth in 6 Months",
    excerpt: "Real-world case study showing how strategic SEO implementation led to massive organic growth.",
    author: {
      name: "Nikhil Sharma",
      avatar: "/lovable-uploads/841ad87e-550c-470b-bbf2-4286877526c9.png"
    },
    category: "Case Studies",
    date: "2024-12-20",
    readTime: "12min read",
    image: "/lovable-uploads/d36fecdb-f8ef-4a23-aacd-99b355b4b622.png",
    slug: "seo-case-study-10x-growth"
  },
  {
    id: "5",
    title: "PPC Campaign Optimization: Reducing CPA by 50%",
    excerpt: "Learn the exact strategies used to dramatically reduce cost-per-acquisition while maintaining quality leads.",
    author: {
      name: "Nikhil Sharma",
      avatar: "/lovable-uploads/841ad87e-550c-470b-bbf2-4286877526c9.png"
    },
    category: "PPC",
    date: "2024-12-15",
    readTime: "9min read",
    image: "/lovable-uploads/8dccb528-d5d2-4c33-8f80-15dc3c51f949.png",
    slug: "ppc-optimization-reduce-cpa"
  }
];

const categories = ["All", "SEO", "Content Marketing", "Social Media", "Email Marketing", "PPC", "Case Studies"];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <>
      {/* SEO Meta Tags */}
      <StructuredData 
        type="WebSite" 
        data={{
          name: "Digital Marketing Blog - Nikhil Sharma",
          description: "Expert insights on SEO, content marketing, social media, and digital marketing strategies. Boost your online presence with proven tactics.",
          author: "Nikhil Sharma",
          publisher: {
            "@type": "Person",
            "name": "Nikhil Sharma"
          }
        }} 
      />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 lg:py-24">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
                    Digital marketing tips & trends,{" "}
                    <span className="text-primary">delivered.</span>
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-lg">
                    Join marketing professionals from around the world that receive expert insights on SEO, content marketing, and growth strategies.
                  </p>
                  
                  {/* Newsletter Signup */}
                  <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                    <Input 
                      placeholder="Enter your email"
                      type="email"
                      className="flex-1"
                    />
                    <Button className="px-8">
                      Subscribe
                    </Button>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Follow us on social media for daily tips and updates.
                  </p>
                </div>
                
                {/* Featured Post Card */}
                <div className="lg:pl-8">
                  <Link to={`/blog/${featuredPost.slug}`}>
                    <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/20 overflow-hidden">
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={featuredPost.image} 
                          alt={featuredPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-6">
                        <Badge variant="secondary" className="mb-3">
                          {featuredPost.category}
                        </Badge>
                        <h2 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                          {featuredPost.title}
                        </h2>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={featuredPost.author.avatar} alt={featuredPost.author.name} />
                              <AvatarFallback>{featuredPost.author.name[0]}</AvatarFallback>
                            </Avatar>
                            <span>{featuredPost.author.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{featuredPost.readTime}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Articles Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
                <h2 className="text-3xl font-bold text-foreground">Articles</h2>
              </div>

              {/* Search and Filter */}
              <div className="mb-8 space-y-4">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="text-sm"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Recent and Popular Tabs */}
              <Tabs defaultValue="recent" className="space-y-8">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="recent" className="text-primary data-[state=active]:text-primary-foreground">
                    Recent
                  </TabsTrigger>
                  <TabsTrigger value="popular" className="text-primary data-[state=active]:text-primary-foreground">
                    Popular
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="recent" className="space-y-8">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recentPosts.map((post) => (
                      <Link key={post.id} to={`/blog/${post.slug}`}>
                        <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/20 h-full overflow-hidden">
                          <div className="aspect-video overflow-hidden">
                            <img 
                              src={post.image} 
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <CardContent className="p-6 flex flex-col flex-1">
                            <Badge variant="outline" className="mb-3 w-fit">
                              {post.category}
                            </Badge>
                            <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Avatar className="w-6 h-6">
                                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                                </Avatar>
                                <span>{post.author.name}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{post.readTime}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="popular" className="space-y-8">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {popularPosts.map((post) => (
                      <Link key={post.id} to={`/blog/${post.slug}`}>
                        <Card className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/20 h-full overflow-hidden">
                          <div className="aspect-video overflow-hidden">
                            <img 
                              src={post.image} 
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <CardContent className="p-6 flex flex-col flex-1">
                            <Badge variant="outline" className="mb-3 w-fit">
                              {post.category}
                            </Badge>
                            <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Avatar className="w-6 h-6">
                                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                                </Avatar>
                                <span>{post.author.name}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{post.readTime}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Blog;