import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, BookOpen, Users, Target, TrendingUp, Search, MessageSquare, Lightbulb } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingThemeToggle from "@/components/FloatingThemeToggle";
import { useEffect } from "react";

const SemanticSEO = () => {
  // Redirect to home in production
  if (import.meta.env.PROD) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    // Set canonical URL for SEO
    const link = document.querySelector("link[rel='canonical']") || document.createElement("link");
    link.setAttribute("rel", "canonical");
    link.setAttribute("href", window.location.href);
    document.head.appendChild(link);
  }, []);

  const features = [
    {
      icon: Target,
      title: "Search Intent Analysis",
      description: "Deep analysis of user search intent and content alignment with user needs.",
      benefit: "Create content that perfectly matches what users are actually looking for."
    },
    {
      icon: BookOpen,
      title: "Topic Cluster Strategy",
      description: "Comprehensive topic mapping and content cluster development.",
      benefit: "Build topical authority and improve content discoverability across related searches."
    },
    {
      icon: MessageSquare,
      title: "Entity & Relationship Mapping",
      description: "Strategic implementation of entities, relationships, and semantic connections.",
      benefit: "Help search engines better understand your content context and relevance."
    },
    {
      icon: Lightbulb,
      title: "Content Gap Analysis",
      description: "Identify missing content opportunities within your topic clusters.",
      benefit: "Cover all aspects of your expertise area and capture more relevant traffic."
    }
  ];

  const problems = [
    "Content not ranking for relevant long-tail keywords",
    "Low engagement and high bounce rates on content pages",
    "Difficulty establishing topical authority in your niche",
    "Content that doesn't match user search intent",
    "Missing opportunities for semantic keyword variations"
  ];

  const caseStudies = [
    {
      client: "Legal Services Firm",
      challenge: "Content was ranking but not converting due to poor intent alignment.",
      solution: "Implemented semantic SEO strategy focusing on user intent and topic clusters.",
      results: "+75% increase in qualified leads, 40% improvement in content engagement"
    },
    {
      client: "Healthcare Provider",
      challenge: "Struggled to rank for medical topics due to E-A-T requirements.",
      solution: "Developed comprehensive topic authority through semantic content strategy.",
      results: "+90% improvement in health-related keyword rankings, 60% more organic traffic"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* SEO Meta Tags */}
      <title>Semantic SEO Services - Content Optimization for Search Intent | Nikhil Sharma</title>
      <meta name="description" content="Professional semantic SEO services to optimize content for search intent, build topical authority, and improve content relevance. Drive more qualified organic traffic." />
      <meta name="keywords" content="semantic SEO, search intent optimization, topic clusters, content optimization, topical authority, entity SEO" />
      <meta property="og:title" content="Semantic SEO Services - Content Optimization for Search Intent" />
      <meta property="og:description" content="Optimize content for search intent, build topical authority, and improve content relevance with semantic SEO strategies." />
      <meta property="og:type" content="service" />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-background via-green-500/5 to-background overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="secondary" className="mb-6">
                <BookOpen className="w-4 h-4 mr-2" />
                Semantic SEO Expert
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Semantic SEO: Content That Speaks Search Engine Language
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Optimize content for search intent, build topical authority, and create meaningful connections that search engines understand and reward.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-6">
                  Analyze My Content
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  Content Strategy Guide
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Problem/Solution Section */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-8">
                  Is Your Content Missing the Mark with Search Intent?
                </h2>
                <ul className="space-y-4">
                  {problems.map((problem, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-destructive rounded-full mt-3 flex-shrink-0" />
                      <p className="text-lg text-muted-foreground">{problem}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-background p-8 rounded-2xl shadow-lg border">
                <h3 className="text-2xl font-bold mb-4 text-primary">
                  Our Semantic SEO Strategy Aligns Content with User Intent
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Through comprehensive semantic analysis and topic mapping, we ensure your content not only ranks 
                  well but also provides exactly what users are searching for. Our approach builds lasting topical 
                  authority that grows stronger over time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features & Benefits Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                What Our Semantic SEO Service Includes
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive content strategy that speaks both to users and search engines
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-green-500/10 rounded-lg">
                        <feature.icon className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                        <p className="text-muted-foreground mb-4">{feature.description}</p>
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm font-medium text-green-700 dark:text-green-300">{feature.benefit}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Semantic SEO Process Section */}
        <section className="py-20 bg-gradient-to-br from-green-500/5 to-blue-500/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Semantic SEO Methodology
              </h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <Card className="p-8">
                <CardContent className="p-0">
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    We analyze the semantic relationships between topics, entities, and user intent to create content 
                    strategies that demonstrate expertise and build authority. Our approach goes beyond keywords to 
                    understand the deeper meaning and context that search engines value.
                  </p>
                  <div className="grid md:grid-cols-4 gap-6 mt-8">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Search className="w-6 h-6 text-green-600" />
                      </div>
                      <p className="font-medium">Intent Research</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Target className="w-6 h-6 text-green-600" />
                      </div>
                      <p className="font-medium">Topic Mapping</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <BookOpen className="w-6 h-6 text-green-600" />
                      </div>
                      <p className="font-medium">Content Strategy</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                      <p className="font-medium">Authority Building</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Semantic SEO Success Stories
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {caseStudies.map((study, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-8">
                    <Badge variant="outline" className="mb-4">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Client: {study.client}
                    </Badge>
                    <h3 className="text-xl font-semibold mb-4">The Challenge</h3>
                    <p className="text-muted-foreground mb-4">{study.challenge}</p>
                    <h3 className="text-xl font-semibold mb-4">The Semantic Solution</h3>
                    <p className="text-muted-foreground mb-4">{study.solution}</p>
                    <h3 className="text-xl font-semibold mb-4">The Results</h3>
                    <p className="font-medium text-green-600">{study.results}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-green-500">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Build Content Authority?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Let's analyze your content strategy and identify opportunities to build topical authority 
              through semantic SEO. Create content that truly serves your audience.
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Get Content Analysis
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingThemeToggle />
    </div>
  );
};

export default SemanticSEO;