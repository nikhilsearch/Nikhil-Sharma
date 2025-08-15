import { useState } from "react";
import { Card } from "@/components/ui/card";

const ToolsMindMap = () => {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

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
          <div className="bg-card/80 backdrop-blur-md border-2 border-border/50 dark:border-white/20 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl w-full">
            {/* Mobile Warning */}
            <div className="block md:hidden text-center mb-4 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Rotate device for better view</p>
            </div>
            <svg
              width="100%"
              height="400"
              viewBox="0 0 600 400" 
              className="w-full h-auto max-w-[600px] max-h-[400px] md:max-h-[600px]"
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

              {/* Tool polygon */}
              <path
                d={pathString}
                fill="hsl(var(--primary))"
                fillOpacity={hoveredTool ? "0.6" : "0.4"}
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                className="transition-all duration-300 ease-out"
                style={{
                  filter: hoveredTool ? 'drop-shadow(0 0 10px hsl(var(--primary)))' : 'none'
                }}
              />

              {/* Tool points with interactive effects */}
              {toolPoints.map((point, index) => {
                const isHovered = hoveredTool === point.tool.name;
                return (
                  <g key={index}>
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={isHovered ? "6" : "4"}
                      fill="hsl(var(--background))"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      className="cursor-pointer transition-all duration-300 ease-out"
                      onMouseEnter={() => setHoveredTool(point.tool.name)}
                      onMouseLeave={() => setHoveredTool(null)}
                    />
                    {/* Glow effect on hover */}
                    {isHovered && (
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="12"
                        fill="hsl(var(--primary))"
                        opacity="0.3"
                        className="animate-pulse"
                      />
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

              {/* Center point */}
              <circle
                cx={centerX}
                cy={centerY}
                r="10"
                className="fill-card stroke-border stroke-2"
              />
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