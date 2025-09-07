import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, Users, TrendingUp, Zap, Search, Settings, BarChart } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingThemeToggle from "@/components/FloatingThemeToggle";
import { useEffect } from "react";

const TechnicalSEO = () => {
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
      icon: Search,
      title: "Crawlability & Indexability",
      description: "We optimize your robots.txt, sitemaps, and canonical tags.",
      benefit: "Search engines can easily find and index your most important pages."
    },
    {
      icon: Zap,
      title: "Site Speed Optimization",
      description: "We perform a comprehensive Core Web Vitals audit.",
      benefit: "Your site loads faster, improving user experience and ranking signals."
    },
    {
      icon: Settings,
      title: "Schema Markup Implementation",
      description: "We implement structured data for rich snippets.",
      benefit: "Your search listings stand out with star ratings, FAQs, and more, boosting click-through rates."
    },
    {
      icon: BarChart,
      title: "Internal Linking Strategy",
      description: "We create an optimized internal link architecture.",
      benefit: "Improved page authority flow and a better user journey across your site."
    }
  ];

  const problems = [
    "Slow page speeds affecting user experience",
    "Low crawl budget utilization",
    "Poor mobile performance and responsiveness",
    "Unexplained ranking drops and visibility issues",
    "JavaScript rendering problems blocking indexation"
  ];

  const caseStudies = [
    {
      client: "SaaS Company",
      challenge: "Slow loading times and poor Core Web Vitals scores affecting rankings.",
      solution: "Comprehensive technical audit, image optimization, and code restructuring.",
      results: "+45% increase in organic traffic, 30% faster load times"
    },
    {
      client: "E-commerce Platform",
      challenge: "Crawlability issues preventing product pages from being indexed.",
      solution: "Fixed robots.txt, optimized XML sitemaps, and implemented proper canonical tags.",
      results: "+60% indexed pages, 25% increase in product visibility"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* SEO Meta Tags */}
      <title>Technical SEO Services - Fix Website Issues & Boost Rankings | Nikhil Sharma</title>
      <meta name="description" content="Professional technical SEO services to eliminate hidden site issues, improve page speed, and build a technically sound website that search engines love. Get a free audit today." />
      <meta name="keywords" content="technical seo, website optimization, core web vitals, site speed optimization, crawlability, indexability" />
      <meta property="og:title" content="Technical SEO Services - Fix Website Issues & Boost Rankings" />
      <meta property="og:description" content="Eliminate hidden site issues, improve site speed, and build a technically sound website that search engines—and users—will love." />
      <meta property="og:type" content="service" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Technical SEO Services - Fix Website Issues & Boost Rankings" />
      <meta name="twitter:description" content="Professional technical SEO services to improve your website's performance and search rankings." />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-background via-primary/5 to-background overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="secondary" className="mb-6">
                Technical SEO Expert
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Flawless Technical SEO: The Foundation for Unstoppable Organic Growth
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Eliminate hidden site issues, improve site speed, and build a technically sound website that search engines—and users—will love.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-6">
                  Book a Free Technical Audit
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  View Case Studies
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
                  Are Technical Issues Holding Your Website Back?
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
                  Our Comprehensive Technical SEO Audit & Implementation Solves These Issues
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Through our systematic approach, we identify and fix critical technical problems that prevent your website 
                  from reaching its full potential. Our AI-powered analysis goes deeper than standard audits to uncover 
                  hidden issues that could be costing you valuable organic traffic.
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
                What Our Technical SEO Service Includes
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive technical optimization that addresses every aspect of your website's performance
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <feature.icon className="w-6 h-6 text-primary" />
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

        {/* AI & LLM Approach Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 to-purple-500/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Our AI & LLM-Powered Audits Deliver a Deeper Level of Insight
              </h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <Card className="p-8">
                <CardContent className="p-0">
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    While many agencies rely on standard tools, we use AI to analyze complex data patterns from server logs 
                    and search console data, predicting potential issues before they impact your rankings. Our LLM-based 
                    analysis helps us understand how search engines 'interpret' your site's technical signals, giving you a distinct advantage.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6 mt-8">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <BarChart className="w-6 h-6 text-primary" />
                      </div>
                      <p className="font-medium">Raw Data Analysis</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Settings className="w-6 h-6 text-primary" />
                      </div>
                      <p className="font-medium">AI Processing</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <TrendingUp className="w-6 h-6 text-primary" />
                      </div>
                      <p className="font-medium">Actionable Insights</p>
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
                Proven Results That Speak for Themselves
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {caseStudies.map((study, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-8">
                    <Badge variant="outline" className="mb-4">
                      Client: {study.client}
                    </Badge>
                    <h3 className="text-xl font-semibold mb-4">The Challenge</h3>
                    <p className="text-muted-foreground mb-4">{study.challenge}</p>
                    <h3 className="text-xl font-semibold mb-4">The Solution</h3>
                    <p className="text-muted-foreground mb-4">{study.solution}</p>
                    <h3 className="text-xl font-semibold mb-4">The Results</h3>
                    <p className="font-medium text-primary">{study.results}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Build a Better Foundation?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Let's perform a free technical health check on your site. We'll identify the key areas of improvement 
              and show you the roadmap to better performance.
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Request a Free Audit
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingThemeToggle />
    </div>
  );
};

export default TechnicalSEO;