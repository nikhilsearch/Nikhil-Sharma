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
      skills: ["Core Web Vitals", "Schema Markup", "Site Architecture", "Mobile Optimization"],
      category: "core"
    },
    {
      id: 2,
      title: "Keyword Research",
      description: "Strategic keyword analysis and competitive research for maximum organic visibility.",
      skills: ["SEMrush", "Ahrefs", "Keyword Planning", "Competitor Analysis"],
      category: "core"
    },
    {
      id: 3,
      title: "Content Strategy",
      description: "SEO-optimized content planning and optimization for better search rankings.",
      skills: ["Content Optimization", "Topic Clusters", "E-A-T", "User Intent"],
      category: "core"
    },
    {
      id: 4,
      title: "Analytics & Reporting",
      description: "Data-driven insights and comprehensive SEO performance tracking.",
      skills: ["Google Analytics", "Search Console", "Data Studio", "ROI Tracking"],
      category: "core"
    },
    {
      id: 5,
      title: "Local SEO",
      description: "Google My Business optimization and local search visibility enhancement.",
      skills: ["Google My Business", "Local Citations", "Review Management", "Local Keywords"],
      category: "advanced"
    },
    {
      id: 6,
      title: "AI SEO",
      description: "Optimizing websites for AI-powered search engines and LLM models.",
      skills: ["ChatGPT Optimization", "Perplexity SEO", "AI Overview", "LLM Models"],
      category: "advanced"
    },
    {
      id: 7,
      title: "Semantic SEO",
      description: "Understanding search intent and entity-based optimization strategies.",
      skills: ["Entity Optimization", "Knowledge Graphs", "Topic Modeling", "Intent Matching"],
      category: "advanced"
    },
    {
      id: 8,
      title: "Ecommerce SEO",
      description: "Product optimization, category structuring, and conversion-focused SEO.",
      skills: ["Product Schema", "Category Optimization", "Technical Audits", "Conversion Tracking"],
      category: "advanced"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-white">What I Bring to the</span>{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Table</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Interactive expertise map showcasing comprehensive SEO solutions and specializations
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

        {/* Interactive Radial Tree - Cleaner Design */}
        <div className="relative h-[700px] flex items-center justify-center">
          {/* Background glow effects */}
          <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent rounded-full" />
          
          {/* SVG for clean connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            {expertiseAreas.map((area, index) => {
              const centerX = 350;
              const centerY = 350;
              const angle = (index * 2 * Math.PI) / expertiseAreas.length - Math.PI / 2;
              const radius = 200; // Reduced from 260 to 200
              const endX = centerX + Math.cos(angle) * radius;
              const endY = centerY + Math.sin(angle) * radius;
              
              const isHovered = hoveredCard === index;
              
              return (
                <g key={index}>
                  {/* Clean connection line */}
                  <line
                    x1={centerX}
                    y1={centerY}
                    x2={endX}
                    y2={endY}
                    stroke={isHovered ? "#60a5fa" : "#475569"}
                    strokeWidth={isHovered ? "3" : "1"}
                    strokeOpacity={isHovered ? "0.8" : "0.3"}
                    className="transition-all duration-500"
                    strokeDasharray="2,3"
                  />
                  
                  {/* Connection dots */}
                  <circle
                    cx={centerX + Math.cos(angle) * (radius * 0.5)}
                    cy={centerY + Math.sin(angle) * (radius * 0.5)}
                    r={isHovered ? "3" : "2"}
                    fill={isHovered ? "#60a5fa" : "#64748b"}
                    className="transition-all duration-300"
                  />
                  <circle
                    cx={centerX + Math.cos(angle) * (radius * 0.75)}
                    cy={centerY + Math.sin(angle) * (radius * 0.75)}
                    r={isHovered ? "3" : "2"}
                    fill={isHovered ? "#60a5fa" : "#64748b"}
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}
          </svg>

          {/* Central Hub - Improved */}
          <div className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2" style={{ left: '50%', top: '50%' }}>
            <div className="relative">
              <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 rounded-full shadow-2xl shadow-blue-500/30 border-2 border-blue-400/30">
                <div className="text-center text-white">
                  <Target className="w-6 h-6 mx-auto mb-1" />
                  <div className="text-xs font-bold">SEO</div>
                </div>
              </div>
              {/* Pulsing ring */}
              <div className="absolute inset-0 rounded-full border-2 border-blue-400/50 animate-ping" />
            </div>
          </div>

          {/* Skill Cards - Cleaner Layout */}
          {expertiseAreas.map((area, index) => {
            const centerX = 350;
            const centerY = 350;
            const angle = (index * 2 * Math.PI) / expertiseAreas.length - Math.PI / 2;
            const radius = 200; // Reduced spacing
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            const isHovered = hoveredCard === index;
            
            return (
              <div
                key={index}
                className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 animate-fade-in"
                style={{ 
                  left: `${x}px`, 
                  top: `${y}px`,
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both'
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={cn(
                  "w-64 p-4 cursor-pointer transition-all duration-500 ease-out relative overflow-hidden group",
                  "bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl",
                  isHovered 
                    ? "scale-110 -translate-y-2 shadow-2xl shadow-blue-500/20 border-blue-500/50 bg-slate-800/80" 
                    : "hover:scale-105"
                )}>
                  {/* Status indicator */}
                  <div className={cn(
                    "absolute top-4 right-4 w-3 h-3 rounded-full",
                    area.category === "core" ? "bg-green-400" : "bg-blue-400"
                  )} />

                  {/* Number badge */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-sm font-bold text-white border-2 border-slate-800 shadow-lg">
                    {area.id}
                  </div>

                  {/* Glow effect */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-2xl transition-all duration-500",
                    isHovered ? "opacity-100" : "opacity-0"
                  )} />

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                      {area.title}
                    </h3>
                    <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                      {area.description}
                    </p>
                    
                    {/* Skills badges */}
                    <div className="flex flex-wrap gap-2">
                      {area.skills.slice(0, 2).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="text-xs px-3 py-1.5 rounded-full bg-blue-600/20 text-blue-300 border border-blue-500/30 transition-all duration-300 hover:bg-blue-600/30"
                        >
                          {skill}
                        </span>
                      ))}
                      {area.skills.length > 2 && (
                        <span className="text-xs px-3 py-1.5 rounded-full bg-slate-700/50 text-slate-400 border border-slate-600/50">
                          +{area.skills.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Ambient particles */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-8 mt-12">
          <div className="flex items-center gap-3 px-4 py-2 bg-slate-800/40 rounded-full border border-slate-700/30">
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <span className="text-sm text-slate-300">Core Competencies</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-slate-800/40 rounded-full border border-slate-700/30">
            <div className="w-3 h-3 rounded-full bg-blue-400" />
            <span className="text-sm text-slate-300">Advanced Specializations</span>
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