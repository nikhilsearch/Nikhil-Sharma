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
        <div className="relative h-[900px] flex items-center justify-center">
          {/* Background glow effects */}
          <div className="absolute inset-0 bg-gradient-radial from-blue-500/5 via-transparent to-transparent rounded-full" />
          
          {/* SVG for tree-like connection structure */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            {/* Central trunk */}
            <defs>
              <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#64748b" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#475569" stopOpacity="0.4"/>
              </linearGradient>
            </defs>
            
            {/* Main trunk */}
            <rect 
              x="445" 
              y="550" 
              width="10" 
              height="200" 
              fill="url(#trunkGradient)" 
              rx="5"
              className="opacity-60"
            />
            
            {expertiseAreas.map((area, index) => {
              const centerX = 450;
              const centerY = 450;
              const angle = (index * 2 * Math.PI) / expertiseAreas.length - Math.PI / 2;
              const radius = area.category === "core" ? 280 : 340; // Expanded spacing
              const endX = centerX + Math.cos(angle) * radius;
              const endY = centerY + Math.sin(angle) * radius;
              
              const isHovered = hoveredCard === index;
              
              // Calculate branch points for tree structure
              const branchX = centerX + Math.cos(angle) * 120;
              const branchY = centerY + Math.sin(angle) * 120;
              
              return (
                <g key={index}>
                  {/* Main branch from center */}
                  <line
                    x1={centerX}
                    y1={centerY}
                    x2={branchX}
                    y2={branchY}
                    stroke={isHovered ? "#60a5fa" : "#475569"}
                    strokeWidth={isHovered ? "4" : "3"}
                    strokeOpacity="0.7"
                    className="transition-all duration-500"
                  />
                  
                  {/* Secondary branch to card */}
                  <path
                    d={`M ${branchX} ${branchY} Q ${branchX + (endX - branchX) * 0.5} ${branchY + (endY - branchY) * 0.3} ${endX} ${endY}`}
                    stroke={isHovered ? "#60a5fa" : "#64748b"}
                    strokeWidth={isHovered ? "3" : "2"}
                    strokeOpacity={isHovered ? "0.8" : "0.5"}
                    fill="none"
                    className="transition-all duration-500"
                    strokeDasharray={area.category === "core" ? "0" : "4,4"}
                  />
                  
                  {/* Branch nodes */}
                  <circle
                    cx={branchX}
                    cy={branchY}
                    r={isHovered ? "4" : "3"}
                    fill={isHovered ? "#60a5fa" : "#64748b"}
                    className="transition-all duration-300"
                  />
                  
                  {/* Connection leaves */}
                  <circle
                    cx={endX - Math.cos(angle) * 20}
                    cy={endY - Math.sin(angle) * 20}
                    r={isHovered ? "3" : "2"}
                    fill={area.category === "core" ? "#22c55e" : "#3b82f6"}
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}
          </svg>

          {/* Central Fruit - SEO Expertise */}
          <div className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2" style={{ left: '50%', top: '50%' }}>
            <div className="relative">
              <div className="w-28 h-28 flex items-center justify-center bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-full shadow-2xl shadow-orange-500/40 border-4 border-yellow-400/30 relative overflow-hidden">
                {/* Fruit shine effect */}
                <div className="absolute top-2 left-2 w-6 h-6 bg-white/30 rounded-full blur-sm" />
                <div className="text-center text-white relative z-10">
                  <Target className="w-8 h-8 mx-auto mb-1" />
                  <div className="text-xs font-bold">SEO</div>
                  <div className="text-[10px] opacity-80">Expertise</div>
                </div>
              </div>
              {/* Fruit glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400/20 to-red-400/20 animate-pulse scale-125" />
            </div>
          </div>

          {/* Ingredient Cards - Expanded Layout */}
          {expertiseAreas.map((area, index) => {
            const centerX = 450;
            const centerY = 450;
            const angle = (index * 2 * Math.PI) / expertiseAreas.length - Math.PI / 2;
            const radius = area.category === "core" ? 280 : 340; // Much more spacing
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
                  "w-72 p-5 cursor-pointer transition-all duration-500 ease-out relative overflow-hidden group",
                  "backdrop-blur-xl border rounded-2xl shadow-xl",
                  area.category === "core" 
                    ? "bg-green-900/40 border-green-600/40 shadow-green-500/20" 
                    : "bg-blue-900/40 border-blue-600/40 shadow-blue-500/20",
                  isHovered 
                    ? "scale-110 -translate-y-3 shadow-2xl z-20" 
                    : "hover:scale-105"
                )}>
                  {/* Ingredient type indicator */}
                  <div className={cn(
                    "absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium",
                    area.category === "core" 
                      ? "bg-green-500/20 text-green-300 border border-green-400/30" 
                      : "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                  )}>
                    {area.category === "core" ? "Core" : "Advanced"}
                  </div>

                  {/* Ingredient number */}
                  <div className={cn(
                    "absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white border-3 border-slate-800 shadow-lg",
                    area.category === "core" ? "bg-gradient-to-br from-green-600 to-green-700" : "bg-gradient-to-br from-blue-600 to-blue-700"
                  )}>
                    {area.id}
                  </div>

                  {/* Ingredient glow effect */}
                  <div className={cn(
                    "absolute inset-0 rounded-2xl transition-all duration-500",
                    area.category === "core" 
                      ? "bg-gradient-to-r from-green-600/10 to-emerald-600/10" 
                      : "bg-gradient-to-r from-blue-600/10 to-indigo-600/10",
                    isHovered ? "opacity-100" : "opacity-0"
                  )} />

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                      {area.title}
                    </h3>
                    <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                      {area.description}
                    </p>
                    
                    {/* Ingredient components */}
                    <div className="flex flex-wrap gap-2">
                      {area.skills.slice(0, 2).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className={cn(
                            "text-xs px-3 py-1.5 rounded-full border transition-all duration-300",
                            area.category === "core" 
                              ? "bg-green-600/20 text-green-300 border-green-500/30 hover:bg-green-600/30" 
                              : "bg-blue-600/20 text-blue-300 border-blue-500/30 hover:bg-blue-600/30"
                          )}
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