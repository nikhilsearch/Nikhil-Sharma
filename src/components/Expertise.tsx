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
    <section className="py-20 px-4 bg-slate-50 dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">
            <span>What I Bring to the</span>{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Table</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Comprehensive SEO solutions that drive organic growth and deliver measurable results
          </p>
        </div>
        
        {/* Animated Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-600 dark:text-blue-400" />
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {animatedStats[index]}{stat.suffix}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Neumorphic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {expertiseAreas.map((area, index) => (
            <div 
              key={index} 
              className="group cursor-pointer transition-all duration-300 hover:scale-[1.02] animate-fade-in"
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both'
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Neumorphic Card */}
              <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-8 shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.7)] dark:shadow-[8px_8px_16px_rgba(0,0,0,0.3),-8px_-8px_16px_rgba(255,255,255,0.05)] border border-slate-200/50 dark:border-slate-700/50 min-h-[350px] flex flex-col">
                
                {/* Card Header */}
                <div className="mb-6">
                  <div className="text-4xl mb-4">{area.image}</div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    {area.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {area.description}
                  </p>
                </div>

                {/* Skills Preview */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {area.skills.slice(0, 3).map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="text-xs px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {area.skills.length > 3 && (
                    <span className="text-xs px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-full">
                      +{area.skills.length - 3}
                    </span>
                  )}
                </div>

                {/* Card Footer */}
                <div className="mt-auto flex items-center justify-between">
                  <span className={cn(
                    "text-xs px-3 py-1 rounded-full font-medium",
                    area.category === "core" 
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" 
                      : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                  )}>
                    {area.category === "core" ? "Core Skill" : "Advanced"}
                  </span>
                  
                  {/* Read More Button */}
                  <button className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.7)] dark:shadow-[4px_4px_8px_rgba(0,0,0,0.3),-4px_-4px_8px_rgba(255,255,255,0.05)] hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1),inset_-4px_-4px_8px_rgba(255,255,255,0.7)] dark:hover:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.3),inset_-4px_-4px_8px_rgba(255,255,255,0.05)]",
                    index === 0 ? "bg-blue-500 text-white" :
                    index === 1 ? "bg-pink-500 text-white" :
                    index === 2 ? "bg-green-500 text-white" :
                    index === 3 ? "bg-orange-500 text-white" :
                    index === 4 ? "bg-purple-500 text-white" :
                    index === 5 ? "bg-teal-500 text-white" :
                    index === 6 ? "bg-indigo-500 text-white" :
                    "bg-amber-500 text-white"
                  )}>
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-8 mt-12">
          <div className="flex items-center gap-3 px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.7)] dark:shadow-[4px_4px_8px_rgba(0,0,0,0.3),-4px_-4px_8px_rgba(255,255,255,0.05)] border border-slate-200 dark:border-slate-700">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm text-slate-600 dark:text-slate-300">Core Skills</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.7)] dark:shadow-[4px_4px_8px_rgba(0,0,0,0.3),-4px_-4px_8px_rgba(255,255,255,0.05)] border border-slate-200 dark:border-slate-700">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-sm text-slate-600 dark:text-slate-300">Advanced Skills</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;