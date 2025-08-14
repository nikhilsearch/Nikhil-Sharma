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
      skills: ["Core Web Vitals", "Schema Markup", "Site Architecture", "Mobile Optimization"],
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
    <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-white">What I Bring to the</span>{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Table</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Comprehensive SEO solutions that drive organic growth and deliver measurable results
          </p>
        </div>
        
        {/* Animated Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-slate-800/40 backdrop-blur-md border border-slate-700/30 rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-400" />
              <div className="text-3xl font-bold text-white mb-2">
                {animatedStats[index]}{stat.suffix}
              </div>
              <div className="text-sm text-slate-300">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Card Grid Layout - 2 Rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {expertiseAreas.map((area, index) => (
            <Card 
              key={index} 
              className="group cursor-pointer transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative overflow-hidden border-0 shadow-2xl animate-fade-in"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both'
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${area.bgGradient} opacity-90`} />
              
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-black/20" />
              
              {/* Hover Glow Effect */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br from-white/10 to-transparent transition-all duration-500",
                hoveredCard === index ? "opacity-100" : "opacity-0"
              )} />

              {/* Content */}
              <CardContent className="relative z-10 p-6 h-full flex flex-col justify-between min-h-[280px]">
                {/* Header */}
                <div>
                  {/* Icon */}
                  <div className="text-4xl mb-4">{area.image}</div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                    {area.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-white/90 text-sm mb-4 leading-relaxed line-clamp-3">
                    {area.description}
                  </p>
                </div>

                {/* Footer */}
                <div>
                  {/* Skills Preview */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {area.skills.slice(0, 2).map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="text-xs px-2 py-1 bg-white/20 text-white rounded-full backdrop-blur-sm"
                      >
                        {skill}
                      </span>
                    ))}
                    {area.skills.length > 2 && (
                      <span className="text-xs px-2 py-1 bg-white/10 text-white/80 rounded-full">
                        +{area.skills.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Category Badge */}
                  <div className="flex items-center justify-between">
                    <span className={cn(
                      "text-xs px-3 py-1 rounded-full font-medium backdrop-blur-sm",
                      area.category === "core" 
                        ? "bg-green-500/20 text-green-200 border border-green-400/30" 
                        : "bg-blue-500/20 text-blue-200 border border-blue-400/30"
                    )}>
                      {area.category === "core" ? "Core Skill" : "Advanced"}
                    </span>
                    
                    {/* Plus Icon */}
                    <div className={cn(
                      "w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-all duration-300",
                      hoveredCard === index ? "scale-110 bg-white/30" : ""
                    )}>
                      <Target className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-8 mt-12">
          <div className="flex items-center gap-3 px-4 py-2 bg-slate-800/40 rounded-full border border-slate-700/30">
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <span className="text-sm text-slate-300">Core Skills</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-slate-800/40 rounded-full border border-slate-700/30">
            <div className="w-3 h-3 rounded-full bg-blue-400" />
            <span className="text-sm text-slate-300">Advanced Skills</span>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
    </section>
  );
};

export default Expertise;