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
    <section className="py-20 px-4 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-white">What I Bring to the</span>{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Table</span>
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
              className="text-center p-6 bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-purple-400" />
              <div className="text-3xl font-bold text-white mb-2">
                {animatedStats[index]}{stat.suffix}
              </div>
              <div className="text-sm text-slate-300">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Interactive Radial Tree Diagram */}
        <div className="relative h-[700px] flex items-center justify-center overflow-hidden">
          {/* SVG for connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            {expertiseAreas.map((area, index) => {
              const centerX = 350;
              const centerY = 350;
              const angle = (index * 2 * Math.PI) / expertiseAreas.length - Math.PI / 2;
              const radius = area.category === "core" ? 180 : 240;
              const endX = centerX + Math.cos(angle) * radius;
              const endY = centerY + Math.sin(angle) * radius;
              
              const isHovered = hoveredCard === index;
              
              return (
                <g key={index}>
                  {/* Dotted connection lines */}
                  <line
                    x1={centerX}
                    y1={centerY}
                    x2={endX}
                    y2={endY}
                    stroke="#8b5cf6"
                    strokeWidth={isHovered ? "3" : "2"}
                    strokeOpacity={isHovered ? "0.8" : "0.4"}
                    className="transition-all duration-500"
                    strokeDasharray="4,4"
                  />
                  
                  {/* Glow effect on hover */}
                  {isHovered && (
                    <line
                      x1={centerX}
                      y1={centerY}
                      x2={endX}
                      y2={endY}
                      stroke="#8b5cf6"
                      strokeWidth="5"
                      strokeOpacity="0.3"
                      className="animate-pulse"
                      strokeDasharray="4,4"
                    />
                  )}
                  
                  {/* Connection dots */}
                  <circle
                    cx={centerX + Math.cos(angle) * (radius * 0.3)}
                    cy={centerY + Math.sin(angle) * (radius * 0.3)}
                    r={isHovered ? "3" : "2"}
                    fill="#8b5cf6"
                    className="transition-all duration-300"
                  />
                  <circle
                    cx={centerX + Math.cos(angle) * (radius * 0.6)}
                    cy={centerY + Math.sin(angle) * (radius * 0.6)}
                    r={isHovered ? "3" : "2"}
                    fill="#8b5cf6"
                    className="transition-all duration-300"
                  />
                  <circle
                    cx={centerX + Math.cos(angle) * (radius * 0.8)}
                    cy={centerY + Math.sin(angle) * (radius * 0.8)}
                    r={isHovered ? "3" : "2"}
                    fill="#8b5cf6"
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}

            {/* Remove inter-node connections as they're not in the reference design */}
          </svg>

          {/* Central Hub */}
          <div className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2" style={{ left: '50%', top: '50%' }}>
            <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600 border-0 shadow-2xl backdrop-blur-md rounded-full">
              <div className="text-center text-white">
                <Target className="w-6 h-6 mx-auto mb-1" />
                <div className="text-xs font-bold">SEO</div>
              </div>
            </div>
          </div>

          {/* Skill Nodes */}
          {expertiseAreas.map((area, index) => {
            const centerX = 350;
            const centerY = 350;
            const angle = (index * 2 * Math.PI) / expertiseAreas.length - Math.PI / 2;
            const radius = area.category === "core" ? 180 : 240;
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
                  animationDelay: `${index * 0.15}s`,
                  animationFillMode: 'both'
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Card className={cn(
                  "w-52 p-4 cursor-pointer transition-all duration-700 ease-out relative overflow-hidden group",
                  "bg-slate-800/80 backdrop-blur-lg border border-slate-700/50 rounded-xl shadow-xl",
                  isHovered 
                    ? "scale-110 -translate-y-2 shadow-2xl shadow-purple-500/30 border-purple-500/50 z-20" 
                    : "hover:scale-105 hover:-translate-y-1"
                )}>
                  {/* Status dot */}
                  <div className={cn(
                    "absolute top-3 right-3 w-3 h-3 rounded-full",
                    area.category === "core" ? "bg-green-400" : "bg-blue-400"
                  )} />

                  {/* Number badge */}
                  <div className={cn(
                    "absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 z-30",
                    "bg-purple-600 text-white border-2 border-slate-800"
                  )}>
                    {area.id}
                  </div>

                  {/* Dark glow effect */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-xl transition-all duration-700",
                    isHovered ? "opacity-100 scale-105" : "opacity-0"
                  )} />

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className={cn(
                      "text-lg font-semibold mb-2 transition-all duration-500 leading-tight text-white"
                    )}>
                      {area.title}
                    </h3>
                    <p className="text-sm text-slate-300 mb-3 line-clamp-2">
                      {area.description}
                    </p>
                    
                    {/* Skills badges */}
                    <div className="flex flex-wrap gap-2">
                      {area.skills.slice(0, 2).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className={cn(
                            "text-xs px-3 py-1 rounded-full transition-all duration-500",
                            "bg-purple-600/20 text-purple-300 border border-purple-500/30",
                            isHovered ? "scale-105 bg-purple-600/30" : ""
                          )}
                          style={{
                            transitionDelay: `${skillIndex * 100}ms`
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                      {area.skills.length > 2 && (
                        <span className="text-xs px-3 py-1 rounded-full bg-slate-700/50 text-slate-400 border border-slate-600/50">
                          +{area.skills.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-pulse"
                style={{
                  left: `${15 + Math.random() * 70}%`,
                  top: `${15 + Math.random() * 70}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-8 mt-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-400" />
            <span className="text-sm text-slate-300">Core Competencies</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-400" />
            <span className="text-sm text-slate-300">Advanced Specializations</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;