import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const SkillsWeb = () => {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const skills = [
    { name: "Technical SEO", category: "core", icon: "🔧", level: "expert" },
    { name: "Keyword Research", category: "core", icon: "🔍", level: "expert" },
    { name: "Content Strategy", category: "core", icon: "📝", level: "expert" },
    { name: "Analytics", category: "core", icon: "📊", level: "expert" },
    { name: "Local SEO", category: "advanced", icon: "📍", level: "advanced" },
    { name: "AI SEO", category: "advanced", icon: "🤖", level: "advanced" },
    { name: "Schema Markup", category: "technical", icon: "🏷️", level: "expert" },
    { name: "Core Web Vitals", category: "technical", icon: "⚡", level: "expert" },
    { name: "Link Building", category: "strategy", icon: "🔗", level: "advanced" },
    { name: "Mobile SEO", category: "technical", icon: "📱", level: "expert" },
    { name: "SEMrush", category: "tools", icon: "🛠️", level: "expert" },
    { name: "Google Analytics", category: "tools", icon: "📈", level: "expert" }
  ];

  const webConnections = [
    [0, 1], [1, 2], [2, 3], [3, 0], // Core inner circle
    [4, 5], [5, 6], [6, 7], // Advanced layer
    [8, 9], [9, 10], [10, 11], // Outer layer
    [0, 4], [1, 5], [2, 6], [3, 7], // Core to advanced
    [4, 8], [5, 9], [6, 10], [7, 11] // Advanced to tools
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
      { radius: 100, count: 4, startAngle: 0 }, // Core skills (center)
      { radius: 200, count: 4, startAngle: Math.PI / 4 }, // Advanced skills  
      { radius: 280, count: 4, startAngle: 0 } // Tools (outer)
    ];
    
    const layerIndex = Math.floor(index / 4);
    const positionInLayer = index % 4;
    const layer = layers[layerIndex] || layers[2];
    
    const angle = layer.startAngle + (positionInLayer * 2 * Math.PI) / layer.count;
    const x = 50 + (layer.radius * Math.cos(angle)) / 10;
    const y = 50 + (layer.radius * Math.sin(angle)) / 10;
    
    return { x: Math.min(Math.max(x, 15), 85), y: Math.min(Math.max(y, 15), 85) };
  };

  const getDistance = (index1: number, index2: number) => {
    const pos1 = getSkillPosition(index1, skills.length);
    const pos2 = getSkillPosition(index2, skills.length);
    return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
  };

  const getHoverScale = (index: number) => {
    if (hoveredSkill === null) return 1;
    if (index === hoveredSkill) return 1.5;
    
    const distance = getDistance(index, hoveredSkill);
    if (distance < 25) return 1.25;
    return 0.95;
  };

  const getOpacity = (index: number) => {
    if (hoveredSkill === null) return 1;
    if (index === hoveredSkill) return 1;
    
    const distance = getDistance(index, hoveredSkill);
    if (distance < 25) return 0.9;
    return 0.4;
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
          className="relative w-full h-[500px] mx-auto"
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
                  strokeWidth={isHighlighted ? "3" : "1"}
                  strokeOpacity={isHighlighted ? "0.8" : "0.15"}
                  className="transition-all duration-500 ease-out"
                  strokeDasharray={isHighlighted ? "0" : "2,4"}
                />
              );
            })}
          </svg>

          {/* Central glow effect */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-radial from-primary/20 to-transparent rounded-full blur-xl" />

          {/* Skill nodes */}
          {skills.map((skill, index) => {
            const position = getSkillPosition(index, skills.length);
            const scale = getHoverScale(index);
            const opacity = getOpacity(index);
            
            return (
              <div
                key={index}
                className={cn(
                  "absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group",
                  "backdrop-blur-lg border border-white/30 rounded-2xl",
                  "bg-card/40 shadow-2xl transition-all duration-500 ease-out",
                  "hover:shadow-3xl hover:shadow-primary/30",
                  "flex flex-col items-center justify-center text-center p-3 min-w-[90px] min-h-[90px]",
                  hoveredSkill === index && "ring-2 ring-primary/50"
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
                {/* Pulse glow effect */}
                <div 
                  className={cn(
                    "absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/30 to-purple-400/30",
                    "transition-all duration-500 ease-out",
                    hoveredSkill === index ? "scale-110 opacity-100" : "scale-100 opacity-0"
                  )}
                />
                
                {/* Icon with better sizing */}
                <div className="text-3xl mb-2 relative z-10 transition-transform duration-300 group-hover:scale-110">
                  {skill.icon}
                </div>
                
                {/* Skill name with better typography */}
                <div className="text-xs font-semibold text-foreground relative z-10 leading-tight mb-1">
                  {skill.name}
                </div>
                
                {/* Level indicator */}
                <div className={cn(
                  "text-[9px] px-2 py-0.5 rounded-full relative z-10 font-medium",
                  skill.level === "expert" ? "bg-green-500/20 text-green-400 border border-green-500/30" :
                  "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                )}>
                  {skill.level}
                </div>
              </div>
            );
          })}

          {/* Subtle floating particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 bg-primary/20 rounded-full animate-pulse"
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

        {/* Simplified Legend */}
        <div className="flex justify-center gap-8 mt-8">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500/30 border border-green-500/50" />
            <span className="text-sm text-muted-foreground">Expert Level</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500/30 border border-blue-500/50" />
            <span className="text-sm text-muted-foreground">Advanced Level</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsWeb;