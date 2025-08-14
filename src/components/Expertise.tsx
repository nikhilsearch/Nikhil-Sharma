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
    <section className="py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-white">What I Bring to the</span>{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Table</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Comprehensive SEO solutions that drive organic growth, improve search visibility, and deliver measurable results for businesses of all sizes.
          </p>
        </div>
        
        {/* Animated Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-slate-700/50 backdrop-blur-md border border-slate-600/50 rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:border-blue-400/50"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-400" />
              <div className="text-3xl font-bold text-white mb-2">
                {animatedStats[index]}{stat.suffix}
              </div>
              <div className="text-sm text-slate-300">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {expertiseAreas.map((area, index) => (
            <Card 
              key={index} 
              className="bg-slate-800/60 backdrop-blur-md border border-slate-600/50 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative overflow-hidden group cursor-pointer hover:border-blue-400/50"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both'
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Number badge */}
              <div className={cn(
                "absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 z-20",
                hoveredCard === index ? "bg-blue-500 text-white scale-110" : "bg-slate-700/80 text-blue-400"
              )}>
                {area.id}
              </div>

              {/* Floating glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 transition-all duration-500 ${hoveredCard === index ? 'opacity-100 scale-110' : 'opacity-0 scale-100'}`} />
              
              {/* Animated border */}
              <div className={`absolute inset-0 border-2 border-blue-500/30 rounded-lg transition-all duration-300 ${hoveredCard === index ? 'scale-105 opacity-100' : 'scale-100 opacity-0'}`} />
              
              
              <CardHeader className="relative z-10 pt-16">
                <CardTitle className="text-xl font-semibold text-white transition-colors duration-300">
                  {area.title}
                </CardTitle>
                <CardDescription className="text-slate-300 transition-all duration-300">
                  {area.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="flex flex-wrap gap-2">
                  {area.skills.map((skill, skillIndex) => (
                    <Badge 
                      key={skillIndex} 
                      variant="secondary" 
                      className={`bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30 transition-all duration-300 backdrop-blur-sm transform ${hoveredCard === index ? 'scale-105' : 'scale-100'}`}
                      style={{
                        animationDelay: `${skillIndex * 0.1}s`
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