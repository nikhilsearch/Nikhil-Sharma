import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

const ToolsMindMap = () => {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [floatingParticles, setFloatingParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    angle: number;
    opacity: number;
  }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  const tools = [
    { name: "Google Search Console", value: 95, category: "SEO" },
    { name: "Google Analytics", value: 95, category: "Analytics" },
    { name: "Screaming Frog", value: 85, category: "SEO" },
    { name: "Ahrefs", value: 88, category: "SEO" },
    { name: "SEMrush", value: 90, category: "SEO" },
    { name: "Looker Studio", value: 87, category: "Analytics" },
    { name: "ChatGPT", value: 87, category: "AI" },
    { name: "Gemini", value: 85, category: "AI" },
    { name: "Claude", value: 84, category: "AI" },
    { name: "Moz", value: 80, category: "SEO" },
    { name: "Lumar", value: 82, category: "SEO" }
  ];

  // Initialize floating particles
  useEffect(() => {
    const particles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 0.3 + 0.1,
      angle: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.4 + 0.1,
    }));
    setFloatingParticles(particles);
  }, []);

  // Animate floating particles
  useEffect(() => {
    const animate = () => {
      setFloatingParticles(prev => prev.map(particle => {
        let newAngle = particle.angle + 0.005;
        let newX = particle.x + Math.cos(newAngle) * particle.speed;
        let newY = particle.y + Math.sin(newAngle) * particle.speed;

        // Wrap around edges
        if (newX > 100) newX = 0;
        if (newX < 0) newX = 100;
        if (newY > 100) newY = 0;
        if (newY < 0) newY = 100;

        return {
          ...particle,
          x: newX,
          y: newY,
          angle: newAngle,
        };
      }));
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "SEO": return "from-blue-500 to-cyan-500";
      case "Analytics": return "from-green-500 to-emerald-500";
      case "AI": return "from-purple-500 to-pink-500";
      default: return "from-gray-500 to-slate-500";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "SEO": return "🔍";
      case "Analytics": return "📊";
      case "AI": return "🤖";
      default: return "🛠️";
    }
  };

  return (
    <section className="w-full py-12 md:py-20 px-4 bg-gradient-to-b from-background via-background/95 to-muted/20 relative overflow-hidden">
      {/* Background floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingParticles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-primary/20 to-accent/20 animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              transform: 'translate(-50%, -50%)',
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            <span className="bg-gradient-to-r from-primary via-purple-400 to-accent bg-clip-text text-transparent">
              SEO & AI Tools
            </span>{" "}
            Proficiency
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Interactive visualization of professional expertise across essential SEO and AI tools
          </p>
        </header>
        
        {/* Interactive Tools Grid */}
        <div 
          ref={containerRef}
          className="relative min-h-[600px] md:min-h-[700px] bg-gradient-to-br from-card/40 to-card/20 backdrop-blur-sm border border-border/30 rounded-3xl p-6 md:p-12 overflow-hidden"
          onMouseMove={handleMouseMove}
        >
          {/* Mouse follower effect */}
          <div 
            className="absolute w-32 h-32 pointer-events-none transition-all duration-300 ease-out opacity-30"
            style={{
              left: `${mousePosition.x}%`,
              top: `${mousePosition.y}%`,
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)',
              filter: 'blur(20px)',
            }}
          />

          {/* Tools as floating bubbles */}
          <div className="relative h-full">
            {tools.map((tool, index) => {
              const isHovered = hoveredTool === tool.name;
              
              // Calculate position in a more organic layout
              const angle = (index / tools.length) * Math.PI * 2;
              const radiusX = 35 + (tool.value / 100) * 15; // 35-50% from center
              const radiusY = 25 + (tool.value / 100) * 15; // More elliptical
              const x = 50 + Math.cos(angle) * radiusX;
              const y = 50 + Math.sin(angle) * radiusY;
              
              // Mouse interaction effect
              const distanceFromMouse = Math.sqrt(
                Math.pow(x - mousePosition.x, 2) + Math.pow(y - mousePosition.y, 2)
              );
              const mouseInfluence = Math.max(0, 1 - distanceFromMouse / 30);
              const scale = 1 + mouseInfluence * 0.3;
              
              return (
                <div
                  key={tool.name}
                  className={`absolute transition-all duration-500 ease-out cursor-pointer group ${
                    isHovered ? 'z-30' : 'z-10'
                  }`}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: `translate(-50%, -50%) scale(${scale})`,
                  }}
                  onMouseEnter={() => setHoveredTool(tool.name)}
                  onMouseLeave={() => setHoveredTool(null)}
                >
                  {/* Tool bubble */}
                  <div className={`relative ${isHovered ? 'animate-pulse' : ''}`}>
                    {/* Glow effect */}
                    <div 
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${getCategoryColor(tool.category)} opacity-20 blur-xl transition-all duration-500 ${
                        isHovered ? 'scale-150 opacity-40' : 'scale-100'
                      }`}
                    />
                    
                    {/* Main bubble */}
                    <div 
                      className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${getCategoryColor(tool.category)} shadow-2xl border-2 border-white/20 flex items-center justify-center text-white font-bold transition-all duration-500 ${
                        isHovered ? 'scale-110 shadow-3xl' : ''
                      }`}
                      style={{
                        filter: isHovered ? 'drop-shadow(0 0 20px hsl(var(--primary) / 0.5))' : '',
                      }}
                    >
                      <span className="text-xl md:text-2xl">{getCategoryIcon(tool.category)}</span>
                      
                      {/* Proficiency indicator */}
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 md:w-8 md:h-8 bg-background rounded-full border-2 border-current flex items-center justify-center text-xs md:text-sm font-bold text-foreground">
                        {tool.value}
                      </div>
                    </div>
                    
                    {/* Tool name tooltip */}
                    <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-background/90 backdrop-blur-sm border border-border/50 rounded-lg text-sm font-medium text-foreground whitespace-nowrap transition-all duration-300 ${
                      isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                    }`}>
                      {tool.name}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-background/90" />
                    </div>
                    
                    {/* Floating particles around hovered tool */}
                    {isHovered && (
                      <>
                        {[...Array(5)].map((_, particleIndex) => (
                          <div
                            key={particleIndex}
                            className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${getCategoryColor(tool.category)} animate-ping`}
                            style={{
                              left: `${50 + Math.cos((particleIndex * Math.PI * 2) / 5 + Date.now() * 0.005) * 40}%`,
                              top: `${50 + Math.sin((particleIndex * Math.PI * 2) / 5 + Date.now() * 0.005) * 40}%`,
                              transform: 'translate(-50%, -50%)',
                              animationDelay: `${particleIndex * 0.2}s`,
                            }}
                          />
                        ))}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
            
            {/* Central hub */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary to-accent shadow-2xl border-4 border-white/20 flex items-center justify-center animate-pulse">
                  <div className="text-2xl md:text-4xl font-bold text-white">⚡</div>
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent opacity-20 blur-xl scale-150 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 md:gap-8">
          {["SEO", "Analytics", "AI"].map((category) => (
            <div key={category} className="flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm border border-border/30 rounded-full">
              <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${getCategoryColor(category)}`} />
              <span className="text-sm font-medium text-foreground">{getCategoryIcon(category)} {category}</span>
            </div>
          ))}
        </div>
        
        {/* Mobile Tool List */}
        <div className="block md:hidden mt-8">
          <h3 className="text-xl font-bold text-foreground mb-6 text-center">Tool Proficiency Details</h3>
          <div className="grid gap-4">
            {tools.map((tool) => (
              <Card key={tool.name} className="p-4 bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card/90 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${getCategoryColor(tool.category)} flex items-center justify-center text-white text-sm`}>
                      {getCategoryIcon(tool.category)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{tool.name}</h4>
                      <p className="text-xs text-muted-foreground">{tool.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-foreground">{tool.value}%</div>
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${getCategoryColor(tool.category)} rounded-full transition-all duration-500`}
                        style={{ width: `${tool.value}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsMindMap;