import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { TrendingUp, Users, Award, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const Expertise = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [visibleStats, setVisibleStats] = useState(false);

  const stats = [
    { icon: TrendingUp, value: 250, label: "SEO Projects Completed", suffix: "+" },
    { icon: Users, value: 150, label: "Happy Clients", suffix: "+" },
    { icon: Award, value: 5, label: "Years Experience", suffix: "" },
    { icon: Target, value: 98, label: "Success Rate", suffix: "%" }
  ];

  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

  useEffect(() => {
    const timer = setTimeout(() => setVisibleStats(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (visibleStats) {
      stats.forEach((stat, index) => {
        let start = 0;
        const increment = stat.value / 50;
        const timer = setInterval(() => {
          start += increment;
          if (start >= stat.value) {
            start = stat.value;
            clearInterval(timer);
          }
          setAnimatedStats(prev => {
            const newStats = [...prev];
            newStats[index] = Math.floor(start);
            return newStats;
          });
        }, 30);
      });
    }
  }, [visibleStats]);

  const expertiseAreas = [
    {
      id: 1,
      title: "Technical SEO",
      description: "Site audits, page speed optimization, schema markup, and crawlability improvements.",
      skills: ["Core Web Vitals", "Schema Markup", "Site Architecture", "Mobile Optimization"]
    },
    {
      id: 2,
      title: "Keyword Research",
      description: "Strategic keyword analysis and competitive research for maximum organic visibility.",
      skills: ["SEMrush", "Ahrefs", "Keyword Planning", "Competitor Analysis"]
    },
    {
      id: 3,
      title: "Content Strategy",
      description: "SEO-optimized content planning and optimization for better search rankings.",
      skills: ["Content Optimization", "Topic Clusters", "E-A-T", "User Intent"]
    },
    {
      id: 4,
      title: "Analytics & Reporting",
      description: "Data-driven insights and comprehensive SEO performance tracking.",
      skills: ["Google Analytics", "Search Console", "Data Studio", "ROI Tracking"]
    },
    {
      id: 5,
      title: "Local SEO",
      description: "Google My Business optimization and local search visibility enhancement.",
      skills: ["Google My Business", "Local Citations", "Review Management", "Local Keywords"]
    },
    {
      id: 6,
      title: "AI SEO",
      description: "Optimizing websites for AI-powered search engines and LLM models.",
      skills: ["ChatGPT Optimization", "Perplexity SEO", "AI Overview", "LLM Models"]
    },
    {
      id: 7,
      title: "Semantic SEO",
      description: "Understanding search intent and entity-based optimization strategies.",
      skills: ["Entity Optimization", "Knowledge Graphs", "Topic Modeling", "Intent Matching"]
    },
    {
      id: 8,
      title: "Ecommerce SEO",
      description: "Product optimization, category structuring, and conversion-focused SEO.",
      skills: ["Product Schema", "Category Optimization", "Technical Audits", "Conversion Tracking"]
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-foreground">What I Bring to the</span>{" "}
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Table</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive SEO solutions that drive organic growth, improve search visibility, and deliver measurable results for businesses of all sizes.
          </p>
        </div>
        
        {/* Animated Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-card/30 backdrop-blur-md border border-white/20 rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
              <div className="text-3xl font-bold text-foreground mb-2">
                {animatedStats[index]}{stat.suffix}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {expertiseAreas.map((area, index) => (
            <Card 
              key={index} 
              className="bg-card/30 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-700 ease-out hover:scale-105 hover:-translate-y-1 relative overflow-hidden group cursor-pointer animate-fade-in"
              style={{
                animationDelay: `${index * 0.15}s`,
                animationFillMode: 'both',
                animationDuration: '0.8s'
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Number badge */}
              <div className={cn(
                "absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ease-out z-20",
                hoveredCard === index ? "bg-primary text-white scale-125 rotate-12" : "bg-card/90 text-primary border border-primary/30"
              )}>
                {area.id}
              </div>

              {/* Floating glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-400/10 transition-all duration-700 ease-out ${hoveredCard === index ? 'opacity-100 scale-110 rotate-1' : 'opacity-0 scale-100'}`} />
              
              {/* Animated border */}
              <div className={`absolute inset-0 border-2 border-primary/30 rounded-lg transition-all duration-500 ease-out ${hoveredCard === index ? 'scale-105 opacity-100' : 'scale-100 opacity-0'}`} />
              
              
              <CardHeader className="relative z-10 pt-12 pb-2 px-4">
                <CardTitle className="text-lg font-semibold text-foreground transition-all duration-500 ease-out group-hover:text-primary">
                  {area.title}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground transition-all duration-500 ease-out line-clamp-2">
                  {area.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10 px-4 pb-4">
                <div className="flex flex-wrap gap-1">
                  {area.skills.map((skill, skillIndex) => (
                    <Badge 
                      key={skillIndex} 
                      variant="secondary" 
                      className={`bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-all duration-500 ease-out backdrop-blur-sm transform text-xs px-2 py-1 ${hoveredCard === index ? 'scale-105 translate-y-[-2px]' : 'scale-100'}`}
                      style={{
                        animationDelay: `${skillIndex * 0.1}s`,
                        transitionDelay: `${skillIndex * 50}ms`
                      }}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;