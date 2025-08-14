import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const SkillsWeb = () => {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const skills = [
    { name: "Technical SEO", category: "core", icon: "🔧" },
    { name: "Keyword Research", category: "core", icon: "🔍" },
    { name: "Content Strategy", category: "core", icon: "📝" },
    { name: "Analytics", category: "core", icon: "📊" },
    { name: "Local SEO", category: "advanced", icon: "📍" },
    { name: "AI SEO", category: "advanced", icon: "🤖" },
    { name: "Schema Markup", category: "technical", icon: "🏷️" },
    { name: "Core Web Vitals", category: "technical", icon: "⚡" },
    { name: "Link Building", category: "strategy", icon: "🔗" },
    { name: "E-A-T Optimization", category: "strategy", icon: "🎯" },
    { name: "Mobile SEO", category: "technical", icon: "📱" },
    { name: "International SEO", category: "advanced", icon: "🌍" },
    { name: "SEMrush", category: "tools", icon: "🛠️" },
    { name: "Ahrefs", category: "tools", icon: "🔎" },
    { name: "Google Analytics", category: "tools", icon: "📈" },
    { name: "Search Console", category: "tools", icon: "🎮" }
  ];

  const webConnections = [
    [0, 1], [1, 2], [2, 3], [3, 0], // Core square
    [4, 5], [5, 6], [6, 7], [7, 4], // Outer connections
    [0, 8], [1, 9], [2, 10], [3, 11], // Radial connections
    [8, 12], [9, 13], [10, 14], [11, 15], // Tool connections
    [4, 12], [5, 13], [6, 14], [7, 15] // Cross connections
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  const getSkillPosition = (index: number, total: number) => {
    const layers = [
      { radius: 80, count: 4, startAngle: 0 }, // Core skills
      { radius: 160, count: 4, startAngle: Math.PI / 4 }, // Advanced skills  
      { radius: 240, count: 4, startAngle: 0 }, // Technical skills
      { radius: 320, count: 4, startAngle: Math.PI / 4 } // Tools
    ];
    
    const layerIndex = Math.floor(index / 4);
    const positionInLayer = index % 4;
    const layer = layers[layerIndex] || layers[0];
    
    const angle = layer.startAngle + (positionInLayer * 2 * Math.PI) / layer.count;
    const x = 50 + (layer.radius * Math.cos(angle)) / 8; // Convert to percentage
    const y = 50 + (layer.radius * Math.sin(angle)) / 8;
    
    return { x: Math.min(Math.max(x, 10), 90), y: Math.min(Math.max(y, 10), 90) };
  };

  const getDistance = (index1: number, index2: number) => {
    const pos1 = getSkillPosition(index1, skills.length);
    const pos2 = getSkillPosition(index2, skills.length);
    return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
  };

  const getHoverScale = (index: number) => {
    if (hoveredSkill === null) return 1;
    if (index === hoveredSkill) return 1.4;
    
    const distance = getDistance(index, hoveredSkill);
    if (distance < 20) return 1.2;
    if (distance < 35) return 1.1;
    return 1;
  };

  const getOpacity = (index: number) => {
    if (hoveredSkill === null) return 1;
    if (index === hoveredSkill) return 1;
    
    const distance = getDistance(index, hoveredSkill);
    if (distance < 20) return 0.9;
    if (distance < 35) return 0.7;
    return 0.5;
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background via-muted/5 to-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-foreground">Skills</span>{" "}
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Web</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hover over skills to see the interconnected web of SEO expertise
          </p>
        </div>

        <div 
          ref={containerRef}
          className="relative w-full h-[600px] mx-auto"
        >
          {/* Web connections */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
          >
            {webConnections.map(([start, end], index) => {
              const startPos = getSkillPosition(start, skills.length);
              const endPos = getSkillPosition(end, skills.length);
              const isHighlighted = hoveredSkill === start || hoveredSkill === end;
              
              return (
                <line
                  key={index}
                  x1={`${startPos.x}%`}
                  y1={`${startPos.y}%`}
                  x2={`${endPos.x}%`}
                  y2={`${endPos.y}%`}
                  stroke="hsl(var(--primary))"
                  strokeWidth={isHighlighted ? "2" : "1"}
                  strokeOpacity={isHighlighted ? "0.6" : "0.2"}
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>

          {/* Skill nodes */}
          {skills.map((skill, index) => {
            const position = getSkillPosition(index, skills.length);
            const scale = getHoverScale(index);
            const opacity = getOpacity(index);
            
            return (
              <div
                key={index}
                className={cn(
                  "absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer",
                  "backdrop-blur-md border border-white/20 rounded-full",
                  "bg-card/30 shadow-xl transition-all duration-300 ease-out",
                  "hover:shadow-2xl hover:shadow-primary/20",
                  "flex flex-col items-center justify-center text-center p-4 min-w-[80px] min-h-[80px]"
                )}
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  transform: `translate(-50%, -50%) scale(${scale})`,
                  opacity,
                  zIndex: hoveredSkill === index ? 10 : 2,
                }}
                onMouseEnter={() => setHoveredSkill(index)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {/* Glow effect */}
                <div 
                  className={cn(
                    "absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-purple-400/20",
                    "transition-all duration-300",
                    hoveredSkill === index ? "scale-150 opacity-100" : "scale-100 opacity-0"
                  )}
                />
                
                {/* Icon */}
                <div className="text-2xl mb-1 relative z-10">{skill.icon}</div>
                
                {/* Skill name */}
                <div className="text-xs font-medium text-foreground relative z-10 leading-tight">
                  {skill.name}
                </div>
                
                {/* Category badge */}
                <div className={cn(
                  "text-[10px] px-2 py-1 mt-1 rounded-full relative z-10",
                  "bg-primary/10 text-primary border border-primary/20"
                )}>
                  {skill.category}
                </div>
              </div>
            );
          })}

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center flex-wrap gap-4 mt-12">
          {['core', 'advanced', 'technical', 'strategy', 'tools'].map((category) => (
            <div key={category} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary/30 border border-primary/50" />
              <span className="text-sm text-muted-foreground capitalize">{category}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsWeb;