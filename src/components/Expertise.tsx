
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
      title: "AI SEO",
      description: "Optimizing websites for AI-powered search engines and LLM models.",
      skills: ["ChatGPT Optimization", "Perplexity SEO", "AI Overview", "LLM Models"],
      category: "advanced",
      bgGradient: "from-purple-600 to-indigo-700",
      image: "🤖"
    },
    {
      id: 2,
      title: "Technical SEO",
      description: "Site audits, page speed optimization, schema markup, and crawlability improvements.",
      skills: ["Core Web Vitals", "Schema Markup", "Site Architecture", "Mobile SEO"],
      category: "core",
      bgGradient: "from-blue-600 to-cyan-700",
      image: "⚙️"
    },
    {
      id: 3,
      title: "Semantic SEO",
      description: "Understanding search intent and entity-based optimization strategies.",
      skills: ["Entity Optimization", "Knowledge Graphs", "Topic Modeling", "Intent Matching"],
      category: "advanced",
      bgGradient: "from-green-600 to-emerald-700",
      image: "🧠"
    },
    {
      id: 4,
      title: "Keyword Research",
      description: "Strategic keyword analysis and competitive research for maximum organic visibility.",
      skills: ["SEMrush", "Ahrefs", "Keyword Planning", "Competitor Analysis"],
      category: "core",
      bgGradient: "from-orange-600 to-red-700",
      image: "🔍"
    },
    {
      id: 5,
      title: "Content Strategy",
      description: "SEO-optimized content planning and optimization for better search rankings.",
      skills: ["Content Optimization", "Topic Clusters", "E-A-T", "User Intent"],
      category: "core",
      bgGradient: "from-pink-600 to-rose-700",
      image: "📝"
    },
    {
      id: 6,
      title: "Analytics & Reporting",
      description: "Data-driven insights and comprehensive SEO performance tracking.",
      skills: ["Google Analytics", "Search Console", "Data Studio", "ROI Tracking"],
      category: "core",
      bgGradient: "from-teal-600 to-cyan-700",
      image: "📊"
    },
    {
      id: 7,
      title: "Local SEO",
      description: "Google My Business optimization and local search visibility enhancement.",
      skills: ["Google My Business", "Local Citations", "Review Management", "Local Keywords"],
      category: "advanced",
      bgGradient: "from-violet-600 to-purple-700",
      image: "📍"
    },
    {
      id: 8,
      title: "Ecommerce SEO",
      description: "Product optimization, category structuring, and conversion-focused SEO.",
      skills: ["Product Schema", "Category Optimization", "Technical Audits", "Conversion Tracking"],
      category: "advanced",
      bgGradient: "from-amber-600 to-orange-700",
      image: "🛒"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-foreground">What I Bring to the</span>{" "}
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Table</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive SEO solutions that drive organic growth and deliver measurable results
          </p>
        </div>
        

        {/* SEO Skills Framework Header */}
        <div className="text-center mb-12">
          <div className="bg-card/30 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl max-w-md mx-auto">
            <h3 className="text-3xl font-bold text-foreground">SEO Skills Framework</h3>
          </div>
        </div>

        {/* Connecting Line from Header */}
        <div className="flex justify-center mb-8">
          <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent"></div>
        </div>

        {/* Core and Advanced Skills Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          
          {/* Core Skills Section */}
          <div className="space-y-8">
            <div className="text-center">
              <div className="bg-card/30 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
                <h3 className="text-2xl font-bold text-foreground">Core Skills</h3>
              </div>
              {/* Connecting Line */}
              <div className="flex justify-center my-6">
                <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"></div>
              </div>
            </div>
            
            {/* Core Skills Cards */}
            <div className="space-y-6">
              {expertiseAreas.filter(area => area.category === "core").map((area, index) => (
                <div 
                  key={area.id} 
                  className={cn(
                    "group cursor-pointer animate-fade-in",
                    // Different hover effects for each skill
                    area.title === "Technical SEO" && "transition-all duration-500 hover:scale-105 hover:-translate-y-4 hover:rotate-1",
                    area.title === "Keyword Research" && "transition-all duration-400 hover:scale-110 hover:-translate-y-8 hover:-rotate-2", 
                    area.title === "Content Strategy" && "transition-all duration-600 hover:scale-108 hover:-translate-y-6 hover:rotate-2",
                    area.title === "Analytics & Reporting" && "transition-all duration-500 hover:scale-112 hover:-translate-y-10 hover:-rotate-1"
                  )}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'both'
                  }}
                  onMouseEnter={() => setHoveredCard(area.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className={cn(
                    "bg-card/30 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl min-h-[200px] transition-all duration-500",
                    // Different shadow effects for each skill
                    area.title === "Technical SEO" && "group-hover:shadow-2xl group-hover:shadow-blue-500/40 group-hover:border-blue-500/60 group-hover:bg-gradient-to-br group-hover:from-blue-500/10 group-hover:to-cyan-500/10",
                    area.title === "Keyword Research" && "group-hover:shadow-2xl group-hover:shadow-orange-500/40 group-hover:border-orange-500/60 group-hover:bg-gradient-to-br group-hover:from-orange-500/10 group-hover:to-red-500/10",
                    area.title === "Content Strategy" && "group-hover:shadow-2xl group-hover:shadow-pink-500/40 group-hover:border-pink-500/60 group-hover:bg-gradient-to-br group-hover:from-pink-500/10 group-hover:to-rose-500/10",
                    area.title === "Analytics & Reporting" && "group-hover:shadow-2xl group-hover:shadow-teal-500/40 group-hover:border-teal-500/60 group-hover:bg-gradient-to-br group-hover:from-teal-500/10 group-hover:to-cyan-500/10"
                  )}>
                    <div className="mb-4">
                      <h4 className="text-xl font-bold text-foreground mb-2">
                        {area.title}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex flex-wrap gap-1">
                        {area.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="text-xs px-2 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full font-medium">
                        Core Skill
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advanced Skills Section */}
          <div className="space-y-8">
            <div className="text-center">
              <div className="bg-card/30 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
                <h3 className="text-2xl font-bold text-foreground">Advanced Skills</h3>
              </div>
              {/* Connecting Line */}
              <div className="flex justify-center my-6">
                <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"></div>
              </div>
            </div>
            
            {/* Advanced Skills Cards */}
            <div className="space-y-6">
              {expertiseAreas.filter(area => area.category === "advanced").map((area, index) => (
                <div 
                  key={area.id} 
                  className={cn(
                    "group cursor-pointer animate-fade-in",
                    // Different hover effects for each advanced skill
                    area.title === "AI SEO" && "transition-all duration-700 hover:scale-115 hover:-translate-y-12 hover:rotate-3",
                    area.title === "Semantic SEO" && "transition-all duration-500 hover:scale-108 hover:-translate-y-6 hover:-rotate-1", 
                    area.title === "Local SEO" && "transition-all duration-600 hover:scale-112 hover:-translate-y-8 hover:rotate-2",
                    area.title === "Ecommerce SEO" && "transition-all duration-400 hover:scale-110 hover:-translate-y-10 hover:-rotate-3"
                  )}
                  style={{
                    animationDelay: `${(index + 4) * 0.1}s`,
                    animationFillMode: 'both'
                  }}
                  onMouseEnter={() => setHoveredCard(area.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className={cn(
                    "bg-card/30 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl min-h-[200px] transition-all duration-500",
                    // Different shadow effects for each advanced skill
                    area.title === "AI SEO" && "group-hover:shadow-2xl group-hover:shadow-purple-500/40 group-hover:border-purple-500/60 group-hover:bg-gradient-to-br group-hover:from-purple-500/10 group-hover:to-indigo-500/10",
                    area.title === "Semantic SEO" && "group-hover:shadow-2xl group-hover:shadow-green-500/40 group-hover:border-green-500/60 group-hover:bg-gradient-to-br group-hover:from-green-500/10 group-hover:to-emerald-500/10",
                    area.title === "Local SEO" && "group-hover:shadow-2xl group-hover:shadow-violet-500/40 group-hover:border-violet-500/60 group-hover:bg-gradient-to-br group-hover:from-violet-500/10 group-hover:to-purple-500/10",
                    area.title === "Ecommerce SEO" && "group-hover:shadow-2xl group-hover:shadow-amber-500/40 group-hover:border-amber-500/60 group-hover:bg-gradient-to-br group-hover:from-amber-500/10 group-hover:to-orange-500/10"
                  )}>
                    <div className="mb-4">
                      <h4 className="text-xl font-bold text-foreground mb-2">
                        {area.title}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex flex-wrap gap-1">
                        {area.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="text-xs px-2 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full font-medium">
                        Advanced
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Connecting Lines to Bottom Section */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent"></div>
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
            <div className="absolute top-8 -left-48 w-px h-8 bg-gradient-to-b from-white/40 to-transparent"></div>
            <div className="absolute top-8 left-48 w-px h-8 bg-gradient-to-b from-white/40 to-transparent"></div>
          </div>
        </div>

        {/* Integrated SEO Strategy Section */}
        <div className="text-center">
          <div className="bg-card/30 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">Integrated SEO Strategy</h3>
            <p className="text-muted-foreground leading-relaxed">
              Coherent search marketing approach combining core and advanced SEO tactics for comprehensive organic growth and sustainable results.
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-8 mt-12">
          <div className="flex items-center gap-3 px-4 py-2 bg-card/30 backdrop-blur-md border border-white/20 rounded-full shadow-lg">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm text-muted-foreground">Core Skills</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-card/30 backdrop-blur-md border border-white/20 rounded-full shadow-lg">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-sm text-muted-foreground">Advanced Skills</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;
