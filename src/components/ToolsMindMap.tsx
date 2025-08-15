import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

const ToolsMindMap = () => {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [floatingElements, setFloatingElements] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    direction: number;
    opacity: number;
    color: string;
  }>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  // Initialize floating elements
  useEffect(() => {
    const elements = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 600,
      y: Math.random() * 400,
      size: Math.random() * 20 + 10,
      speed: Math.random() * 0.5 + 0.2,
      direction: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.3 + 0.1,
      color: i % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--accent))',
    }));
    setFloatingElements(elements);
  }, []);

  // Animation loop for floating elements
  useEffect(() => {
    const animate = () => {
      setFloatingElements(prev => prev.map(element => {
        let newX = element.x + Math.cos(element.direction) * element.speed;
        let newY = element.y + Math.sin(element.direction) * element.speed;
        let newDirection = element.direction;

        // Bounce off walls
        if (newX <= 0 || newX >= 600) {
          newDirection = Math.PI - element.direction;
          newX = Math.max(0, Math.min(600, newX));
        }
        if (newY <= 0 || newY >= 400) {
          newDirection = -element.direction;
          newY = Math.max(0, Math.min(400, newY));
        }

        return {
          ...element,
          x: newX,
          y: newY,
          direction: newDirection,
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

  // Mouse tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 600,
        y: ((e.clientY - rect.top) / rect.height) * 400,
      });
    }
  };

  const tools = [
    { name: "Google Search Console", value: 95 },
    { name: "Google Analytics", value: 95 },
    { name: "Screaming Frog", value: 85 },
    { name: "Ahrefs", value: 88 },
    { name: "SEMrush", value: 90 },
    { name: "Looker Studio", value: 87 },
    { name: "ChatGPT", value: 87 },
    { name: "Gemini", value: 85 },
    { name: "Claude", value: 84 },
    { name: "Moz", value: 80 },
    { name: "Lumar", value: 82 }
  ];

  const centerX = 300;
  const centerY = 200; // Adjusted for mobile
  const maxRadius = 150; // Smaller for mobile
  const gridLevels = 5;

  // Generate points for the tool polygon
  const getToolPoints = () => {
    return tools.map((tool, index) => {
      const angle = (index * 2 * Math.PI) / tools.length - Math.PI / 2;
      const radius = (tool.value / 100) * maxRadius;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      return { x, y, tool };
    });
  };

  // Generate grid circles (scale 0-100)
  const getGridCircles = () => {
    return Array.from({ length: gridLevels }, (_, i) => {
      const radius = ((i + 1) / gridLevels) * maxRadius;
      return radius;
    });
  };

  // Generate axis lines and labels
  const getAxisLines = () => {
    return tools.map((tool, index) => {
      const angle = (index * 2 * Math.PI) / tools.length - Math.PI / 2;
      const labelDistance = maxRadius + 40;
      const x = centerX + Math.cos(angle) * labelDistance;
      const y = centerY + Math.sin(angle) * labelDistance;
      const lineX = centerX + Math.cos(angle) * maxRadius;
      const lineY = centerY + Math.sin(angle) * maxRadius;
      
      return {
        tool,
        labelX: x,
        labelY: y,
        lineX,
        lineY,
        angle: angle * (180 / Math.PI)
      };
    });
  };

  const toolPoints = getToolPoints();
  const gridCircles = getGridCircles();
  const axisLines = getAxisLines();

  // Create path string for the tool polygon
  const pathString = toolPoints
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ') + ' Z';

  return (
    <section className="w-full py-12 md:py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-foreground">
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              SEO & AI Tools
            </span>{" "}
            Proficiency
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Interactive visualization of professional expertise across essential SEO and AI tools
          </p>
        </header>
        
        {/* Mind Map Container - Responsive */}
        <div className="relative flex justify-center items-center overflow-hidden">
          <div 
            ref={containerRef}
            className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-md border-2 border-border/50 dark:border-white/20 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl w-full relative overflow-hidden"
            onMouseMove={handleMouseMove}
          >
            {/* Mobile Warning */}
            <div className="block md:hidden text-center mb-4 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Rotate device for better view</p>
            </div>
            {/* Floating Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {floatingElements.map((element) => {
                // Calculate distance from mouse for interactive effect
                const distanceFromMouse = Math.sqrt(
                  Math.pow(element.x - mousePosition.x, 2) + 
                  Math.pow(element.y - mousePosition.y, 2)
                );
                const maxDistance = 100;
                const influence = Math.max(0, 1 - distanceFromMouse / maxDistance);
                const scale = 1 + influence * 0.5;
                const opacity = element.opacity + influence * 0.3;

                return (
                  <div
                    key={element.id}
                    className="absolute rounded-full transition-all duration-300 ease-out"
                    style={{
                      left: `${(element.x / 600) * 100}%`,
                      top: `${(element.y / 400) * 100}%`,
                      width: element.size * scale,
                      height: element.size * scale,
                      background: `radial-gradient(circle, ${element.color} 0%, transparent 70%)`,
                      opacity: opacity,
                      transform: `translate(-50%, -50%) scale(${scale})`,
                      filter: influence > 0.3 ? 'blur(1px)' : 'blur(2px)',
                    }}
                  />
                );
              })}
            </div>

            {/* Mouse follower element */}
            <div 
              className="absolute w-20 h-20 pointer-events-none transition-all duration-700 ease-out"
              style={{
                left: `${(mousePosition.x / 600) * 100}%`,
                top: `${(mousePosition.y / 400) * 100}%`,
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)',
                filter: 'blur(8px)',
              }}
            />

            <svg
              width="100%"
              height="400"
              viewBox="0 0 600 400" 
              className="w-full h-auto max-w-[600px] max-h-[400px] md:max-h-[600px] relative z-10"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Grid circles */}
              {gridCircles.map((radius, index) => (
                <circle
                  key={index}
                  cx={centerX}
                  cy={centerY}
                  r={radius}
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="1"
                  opacity="0.5"
                />
              ))}

              {/* Axis lines */}
              {axisLines.map((axis, index) => (
                <line
                  key={index}
                  x1={centerX}
                  y1={centerY}
                  x2={axis.lineX}
                  y2={axis.lineY}
                  stroke="hsl(var(--border))"
                  strokeWidth="1"
                  opacity="0.5"
                />
              ))}

              {/* Gradient definitions */}
              <defs>
                <radialGradient id="toolGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.2" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Tool polygon with enhanced styling */}
              <path
                d={pathString}
                fill="url(#toolGradient)"
                fillOpacity={hoveredTool ? "0.8" : "0.5"}
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                className="transition-all duration-500 ease-out"
                style={{
                  filter: hoveredTool ? 'url(#glow) drop-shadow(0 0 15px hsl(var(--primary) / 0.5))' : 'drop-shadow(0 2px 8px hsl(var(--primary) / 0.2))'
                }}
              />

              {/* Tool points with enhanced interactive effects */}
              {toolPoints.map((point, index) => {
                const isHovered = hoveredTool === point.tool.name;
                const angle = (index * 2 * Math.PI) / tools.length;
                
                return (
                  <g key={index}>
                    {/* Outer glow ring */}
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={isHovered ? "16" : "8"}
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="1"
                      opacity={isHovered ? "0.4" : "0.1"}
                      className="transition-all duration-500 ease-out"
                    />
                    
                    {/* Pulsing background */}
                    {isHovered && (
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="20"
                        fill="hsl(var(--primary))"
                        opacity="0.2"
                        className="animate-pulse"
                      />
                    )}
                    
                    {/* Main point */}
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={isHovered ? "7" : "5"}
                      fill="hsl(var(--background))"
                      stroke="hsl(var(--primary))"
                      strokeWidth={isHovered ? "3" : "2"}
                      className="cursor-pointer transition-all duration-300 ease-out hover:animate-pulse"
                      onMouseEnter={() => setHoveredTool(point.tool.name)}
                      onMouseLeave={() => setHoveredTool(null)}
                      style={{
                        filter: isHovered ? 'drop-shadow(0 0 8px hsl(var(--primary)))' : 'none'
                      }}
                    />
                    
                    {/* Floating particle effect */}
                    {isHovered && (
                      <>
                        <circle
                          cx={point.x + Math.cos(angle + Date.now() * 0.002) * 15}
                          cy={point.y + Math.sin(angle + Date.now() * 0.002) * 15}
                          r="2"
                          fill="hsl(var(--accent))"
                          opacity="0.6"
                          className="animate-pulse"
                        />
                        <circle
                          cx={point.x + Math.cos(angle + Date.now() * 0.003 + Math.PI) * 12}
                          cy={point.y + Math.sin(angle + Date.now() * 0.003 + Math.PI) * 12}
                          r="1.5"
                          fill="hsl(var(--primary))"
                          opacity="0.8"
                          className="animate-pulse"
                        />
                      </>
                    )}
                  </g>
                );
              })}

              {/* Tool labels with interactive effects */}
              {axisLines.map((axis, index) => {
                const isHovered = hoveredTool === axis.tool.name;
                const isRightSide = axis.labelX > centerX;
                
                return (
                  <g key={index}>
                    <text
                      x={axis.labelX}
                      y={axis.labelY}
                      textAnchor={isRightSide ? "start" : "end"}
                      dominantBaseline="middle"
                      fontSize={isHovered ? "12" : "10"}
                      className={`cursor-pointer transition-all duration-300 select-none ${
                        isHovered 
                          ? 'fill-foreground font-semibold' 
                          : 'fill-muted-foreground font-normal'
                      }`}
                      onMouseEnter={() => setHoveredTool(axis.tool.name)}
                      onMouseLeave={() => setHoveredTool(null)}
                    >
                      {axis.tool.name}
                    </text>
                  </g>
                );
              })}

              {/* Enhanced center point */}
              <g>
                <circle
                  cx={centerX}
                  cy={centerY}
                  r="15"
                  fill="hsl(var(--primary))"
                  opacity="0.1"
                  className="animate-pulse"
                />
                <circle
                  cx={centerX}
                  cy={centerY}
                  r="12"
                  fill="hsl(var(--background))"
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                  className="drop-shadow-lg"
                />
                <circle
                  cx={centerX}
                  cy={centerY}
                  r="6"
                  fill="hsl(var(--primary))"
                  opacity="0.8"
                />
              </g>
            </svg>
          </div>
        </div>
        
        {/* Mobile Tool List */}
        <div className="block md:hidden mt-8">
          <h3 className="text-lg font-bold text-foreground mb-4 text-center">Tool Proficiency</h3>
          <div className="grid grid-cols-2 gap-3">
            {tools.map((tool) => (
              <div key={tool.name} className="bg-card/80 backdrop-blur-md border border-border/50 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">{tool.name}</span>
                  <div className="flex items-center gap-1">
                    <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-purple-400 rounded-full transition-all duration-300"
                        style={{ width: `${tool.value}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground ml-1">{tool.value}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsMindMap;