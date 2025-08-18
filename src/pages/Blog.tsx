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
  title: "What Is Generative Engine Optimization",
  excerpt: "Are You Ready to Future-Proof Your Brand? The Invisible Revolution of Generative Engine Optimization is Here",
  author: {
    name: "Nikhil Sharma",
    avatar: "/lovable-uploads/841ad87e-550c-470b-bbf2-4286877526c9.png",
    role: "Digital Marketing Specialist"
  },
  category: "SEO",
  date: "2025-01-15",
  readTime: "12min read",
  image: "/lovable-uploads/ce220e1a-ebc4-44ea-ad0a-b9b052690dad.png",
  slug: "what-is-generative-engine-optimization"
};

const recentPosts = [
  {
    id: "1",
    title: "What Is Generative Engine Optimization",
    excerpt: "Are You Ready to Future-Proof Your Brand? The Invisible Revolution of Generative Engine Optimization is Here",
    author: {
      name: "Nikhil Sharma",
      avatar: "/lovable-uploads/841ad87e-550c-470b-bbf2-4286877526c9.png"
    },
    category: "SEO",
    date: "2025-01-15",
    readTime: "12min read",
    image: "/lovable-uploads/ce220e1a-ebc4-44ea-ad0a-b9b052690dad.png",
    slug: "what-is-generative-engine-optimization"
  }
];

const popularPosts = [
  {
    id: "1",
    title: "What Is Generative Engine Optimization",
    excerpt: "Are You Ready to Future-Proof Your Brand? The Invisible Revolution of Generative Engine Optimization is Here",
    author: {
      name: "Nikhil Sharma",
      avatar: "/lovable-uploads/841ad87e-550c-470b-bbf2-4286877526c9.png"
    },
    category: "SEO",
    date: "2025-01-15",
    readTime: "12min read",
    image: "/lovable-uploads/ce220e1a-ebc4-44ea-ad0a-b9b052690dad.png",
    slug: "what-is-generative-engine-optimization"
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