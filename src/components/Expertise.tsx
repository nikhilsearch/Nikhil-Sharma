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
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/10">
      <div className="max-w-7xl mx-auto">
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

        {/* Mind Map Section */}
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
                  {/* Main connection line */}
                  <line
                    x1={centerX}
                    y1={centerY}
                    x2={endX}
                    y2={endY}
                    stroke="hsl(var(--primary))"
                    strokeWidth={isHovered ? "4" : "2"}
                    strokeOpacity={isHovered ? "0.8" : "0.3"}
                    className="transition-all duration-500"
                    strokeDasharray={isHovered ? "0" : "5,5"}
                  />
                  
                  {/* Pulse effect on hover */}
                  {isHovered && (
                    <line
                      x1={centerX}
                      y1={centerY}
                      x2={endX}
                      y2={endY}
                      stroke="hsl(var(--primary))"
                      strokeWidth="6"
                      strokeOpacity="0.3"
                      className="animate-pulse"
                    />
                  )}
                  
                  {/* Connection nodes along the line */}
                  <circle
                    cx={centerX + Math.cos(angle) * (radius * 0.3)}
                    cy={centerY + Math.sin(angle) * (radius * 0.3)}
                    r={isHovered ? "4" : "2"}
                    fill="hsl(var(--primary))"
                    className="transition-all duration-300"
                  />
                  <circle
                    cx={centerX + Math.cos(angle) * (radius * 0.6)}
                    cy={centerY + Math.sin(angle) * (radius * 0.6)}
                    r={isHovered ? "4" : "2"}
                    fill="hsl(var(--primary))"
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}

            {/* Inter-node connections for related skills */}
            {expertiseAreas.slice(0, 4).map((_, index) => {
              const nextIndex = (index + 1) % 4;
              const centerX = 350;
              const centerY = 350;
              const angle1 = (index * 2 * Math.PI) / 8 - Math.PI / 2;
              const angle2 = (nextIndex * 2 * Math.PI) / 8 - Math.PI / 2;
              const radius = 180;
              
              const x1 = centerX + Math.cos(angle1) * radius;
              const y1 = centerY + Math.sin(angle1) * radius;
              const x2 = centerX + Math.cos(angle2) * radius;
              const y2 = centerY + Math.sin(angle2) * radius;
              
              return (
                <line
                  key={`connect-${index}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="hsl(var(--primary))"
                  strokeWidth="1"
                  strokeOpacity="0.2"
                  strokeDasharray="3,3"
                />
              );
            })}
          </svg>

          {/* Central Hub */}
          <div className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2" style={{ left: '50%', top: '50%' }}>
            <Card className="w-32 h-32 flex items-center justify-center bg-gradient-to-br from-primary to-purple-400 border-0 shadow-2xl backdrop-blur-md rounded-full animate-pulse">
              <div className="text-center text-white">
                <Target className="w-8 h-8 mx-auto mb-1" />
                <div className="text-sm font-bold">SEO</div>
                <div className="text-xs opacity-90">Expertise</div>
              </div>
            </Card>
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
                  "w-44 p-3 cursor-pointer transition-all duration-700 ease-out relative overflow-hidden group",
                  "bg-card/40 backdrop-blur-lg border border-white/30 rounded-xl shadow-lg",
                  isHovered 
                    ? "scale-125 -translate-y-3 shadow-2xl shadow-primary/30 border-primary/50 z-20" 
                    : "hover:scale-110 hover:-translate-y-1"
                )}>
                  {/* Number badge */}
                  <div className={cn(
                    "absolute -top-2 -left-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 z-30",
                    isHovered ? "bg-primary text-white scale-125 rotate-12" : "bg-primary/20 text-primary border border-primary/30"
                  )}>
                    {area.id}
                  </div>

                  {/* Category indicator */}
                  <div className={cn(
                    "absolute top-1 right-1 w-2 h-2 rounded-full",
                    area.category === "core" ? "bg-green-400" : "bg-blue-400"
                  )} />

                  {/* Glow effect */}
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-400/10 rounded-xl transition-all duration-700",
                    isHovered ? "opacity-100 scale-110" : "opacity-0"
                  )} />

                  {/* Content */}
                  <div className="relative z-10 pt-2">
                    <h3 className={cn(
                      "text-sm font-semibold mb-1 transition-all duration-500 leading-tight",
                      isHovered ? "text-primary" : "text-foreground"
                    )}>
                      {area.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {area.description}
                    </p>
                    
                    {/* Skills badges */}
                    <div className="flex flex-wrap gap-1">
                      {area.skills.slice(0, 2).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className={cn(
                            "text-[10px] px-2 py-0.5 rounded-full transition-all duration-500",
                            "bg-primary/10 text-primary border border-primary/20",
                            isHovered ? "scale-105 translate-y-[-1px] bg-primary/20" : ""
                          )}
                          style={{
                            transitionDelay: `${skillIndex * 100}ms`
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                      {area.skills.length > 2 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted/20 text-muted-foreground">
                          +{area.skills.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}

          {/* Floating particles for ambiance */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-primary/20 rounded-full animate-pulse"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-8 mt-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-400/30 border border-green-400/50" />
            <span className="text-sm text-muted-foreground">Core Competencies</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-400/30 border border-blue-400/50" />
            <span className="text-sm text-muted-foreground">Advanced Specializations</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;