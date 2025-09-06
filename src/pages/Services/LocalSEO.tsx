import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, MapPin, Star, Phone, Users, TrendingUp, Search, Building } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const LocalSEO = () => {
  useEffect(() => {
    // Set canonical URL for SEO
    const link = document.querySelector("link[rel='canonical']") || document.createElement("link");
    link.setAttribute("rel", "canonical");
    link.setAttribute("href", window.location.href);
    document.head.appendChild(link);
  }, []);

  const features = [
    {
      icon: MapPin,
      title: "Google Business Profile Optimization",
      description: "Complete optimization of your Google Business Profile for maximum local visibility.",
      benefit: "Appear prominently in local search results and Google Maps."
    },
    {
      icon: Star,
      title: "Review Management & Strategy",
      description: "Systematic approach to generating and managing customer reviews.",
      benefit: "Build trust and credibility that drives more local customers to your business."
    },
    {
      icon: Building,
      title: "Local Citation Building",
      description: "Strategic placement in local directories and citation sources.",
      benefit: "Establish consistency and authority across all local search platforms."
    },
    {
      icon: Phone,
      title: "Local Landing Page Optimization",
      description: "Location-specific page optimization for multiple business locations.",
      benefit: "Capture local search traffic for each of your business locations."
    }
  ];

  const problems = [
    "Not showing up in local search results when customers search nearby",
    "Competitors appearing higher in Google Maps and local listings",
    "Inconsistent business information across online directories",
    "Poor Google Business Profile optimization and low engagement",
    "Difficulty attracting foot traffic and local customers"
  ];

  const caseStudies = [
    {
      client: "Local Restaurant Chain",
      challenge: "Multiple locations not appearing in local search results consistently.",
      solution: "Comprehensive local SEO strategy with location-specific optimization and citation building.",
      results: "+150% increase in local search visibility, 80% more foot traffic"
    },
    {
      client: "Professional Services Firm",
      challenge: "Low visibility for local professional service searches in their area.",
      solution: "Google Business Profile optimization, review strategy, and local content marketing.",
      results: "+200% increase in local leads, 90% improvement in local rankings"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* SEO Meta Tags */}
      <title>Local SEO Services - Dominate Local Search Results | Nikhil Sharma</title>
      <meta name="description" content="Professional local SEO services to improve Google Business Profile, local rankings, and drive more foot traffic. Dominate local search in your area." />
      <meta name="keywords" content="local SEO, Google Business Profile optimization, local search marketing, citation building, review management, local rankings" />
      <meta property="og:title" content="Local SEO Services - Dominate Local Search Results" />
      <meta property="og:description" content="Professional local SEO services to improve local rankings and drive more foot traffic to your business." />
      <meta property="og:type" content="service" />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-background via-orange-500/5 to-background overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="secondary" className="mb-6">
                <MapPin className="w-4 h-4 mr-2" />
                Local SEO Expert
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Local SEO: Dominate Your Local Market and Drive More Customers
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Optimize your local presence, improve Google Business Profile visibility, and attract more customers from your local area with proven local SEO strategies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-6">
                  Get Local SEO Audit
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  Local Success Stories
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
                  Are Local Customers Finding Your Competitors Instead?
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
                  Our Local SEO Strategy Puts You on the Map
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Through comprehensive local optimization, we ensure your business appears prominently when local 
                  customers search for your services. Our proven strategies drive more foot traffic, phone calls, 
                  and local customer engagement.
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
                What Our Local SEO Service Includes
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Complete local search optimization to maximize your visibility in your target market
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-orange-500/10 rounded-lg">
                        <feature.icon className="w-6 h-6 text-orange-600" />
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

        {/* Local SEO Process Section */}
        <section className="py-20 bg-gradient-to-br from-orange-500/5 to-red-500/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Local SEO Process
              </h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <Card className="p-8">
                <CardContent className="p-0">
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    We start with a comprehensive local search audit, then optimize your Google Business Profile, 
                    build local citations, and implement location-specific strategies. Our approach ensures consistent 
                    NAP (Name, Address, Phone) information across all platforms and maximizes your local search visibility.
                  </p>
                  <div className="grid md:grid-cols-4 gap-6 mt-8">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Search className="w-6 h-6 text-orange-600" />
                      </div>
                      <p className="font-medium">Local Audit</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <MapPin className="w-6 h-6 text-orange-600" />
                      </div>
                      <p className="font-medium">Profile Optimization</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Building className="w-6 h-6 text-orange-600" />
                      </div>
                      <p className="font-medium">Citation Building</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <TrendingUp className="w-6 h-6 text-orange-600" />
                      </div>
                      <p className="font-medium">Performance Tracking</p>
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
                Local Businesses We've Helped Succeed
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {caseStudies.map((study, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-8">
                    <Badge variant="outline" className="mb-4">
                      <MapPin className="w-4 h-4 mr-2" />
                      Client: {study.client}
                    </Badge>
                    <h3 className="text-xl font-semibold mb-4">The Challenge</h3>
                    <p className="text-muted-foreground mb-4">{study.challenge}</p>
                    <h3 className="text-xl font-semibold mb-4">The Local Solution</h3>
                    <p className="text-muted-foreground mb-4">{study.solution}</p>
                    <h3 className="text-xl font-semibold mb-4">The Results</h3>
                    <p className="font-medium text-orange-600">{study.results}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-500">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Dominate Local Search?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Let's optimize your local presence and help you attract more customers from your area. 
              Get a comprehensive local SEO audit and see how we can improve your visibility.
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Get Local SEO Audit
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LocalSEO;