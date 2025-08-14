import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";

const ToolsMindMap = () => {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const tools = [
    { name: "Google Analytics", proficiency: 95, color: "#ea4335", category: "Analytics" },
    { name: "Google Search Console", proficiency: 93, color: "#4285f4", category: "Monitoring" },
    { name: "SEMrush", proficiency: 90, color: "#ff642d", category: "Research" },
    { name: "Ahrefs", proficiency: 88, color: "#ff7900", category: "Analysis" },
    { name: "Screaming Frog", proficiency: 85, color: "#00c851", category: "Technical" },
    { name: "WordPress", proficiency: 92, color: "#21759b", category: "CMS" },
    { name: "ChatGPT", proficiency: 87, color: "#10a37f", category: "AI Tools" },
    { name: "Power BI", proficiency: 83, color: "#f2c811", category: "Visualization" }
  ];

  const centerX = 300;
  const centerY = 300;
  const maxRadius = 180;
  const gridLevels = 5;

  // Generate points for the tool polygon
  const getToolPoints = () => {
    return tools.map((tool, index) => {
      const angle = (index * 2 * Math.PI) / tools.length - Math.PI / 2;
      const radius = (tool.proficiency / 100) * maxRadius;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      return { x, y, tool };
    });
  };

  // Generate grid circles
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
      const x = centerX + Math.cos(angle) * (maxRadius + 40);
      const y = centerY + Math.sin(angle) * (maxRadius + 40);
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
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">SEO Tools</span>{" "}
            <span className="text-foreground">Mastery</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Interactive visualization of my proficiency with essential SEO and analytics tools
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="relative">
            <svg
              ref={svgRef}
              width="600"
              height="600"
              viewBox="0 0 600 600"
              className="filter drop-shadow-lg"
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
                  opacity="0.3"
                />
              ))}

              {/* Axis lines */}
              {axisLines.map((axis, index) => (
                <g key={index}>
                  <line
                    x1={centerX}
                    y1={centerY}
                    x2={axis.lineX}
                    y2={axis.lineY}
                    stroke="hsl(var(--border))"
                    strokeWidth="1"
                    opacity="0.3"
                  />
                  {/* Tool proficiency dots with floating effect */}
                  <g>
                    <circle
                      cx={toolPoints[index].x}
                      cy={toolPoints[index].y}
                      r={hoveredTool === axis.tool.name ? "10" : "6"}
                      fill={axis.tool.color}
                      className="cursor-pointer transition-all duration-500 ease-out drop-shadow-lg"
                      onMouseEnter={() => setHoveredTool(axis.tool.name)}
                      onMouseLeave={() => setHoveredTool(null)}
                      style={{
                        filter: hoveredTool === axis.tool.name ? `drop-shadow(0 0 15px ${axis.tool.color})` : 'none'
                      }}
                    />
                    {/* Floating glow effect */}
                    {hoveredTool === axis.tool.name && (
                      <circle
                        cx={toolPoints[index].x}
                        cy={toolPoints[index].y}
                        r="15"
                        fill={axis.tool.color}
                        opacity="0.2"
                        className="animate-pulse"
                      />
                    )}
                  </g>
                </g>
              ))}

              {/* Tool polygon with glow effect */}
              <path
                d={pathString}
                fill="hsl(var(--primary))"
                fillOpacity="0.15"
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                className="transition-all duration-700 ease-out"
                style={{
                  filter: hoveredTool ? 'drop-shadow(0 0 10px hsl(var(--primary)))' : 'none'
                }}
              />

              {/* Tool labels with floating effect */}
              {axisLines.map((axis, index) => {
                const isHovered = hoveredTool === axis.tool.name;
                return (
                  <g key={index}>
                    <text
                      x={axis.labelX}
                      y={axis.labelY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={`text-sm font-medium transition-all duration-500 ease-out cursor-pointer ${
                        isHovered ? 'text-primary' : 'text-foreground'
                      }`}
                      onMouseEnter={() => setHoveredTool(axis.tool.name)}
                      onMouseLeave={() => setHoveredTool(null)}
                      style={{
                        fontSize: isHovered ? '16px' : '12px',
                        fontWeight: isHovered ? '700' : '500',
                        transform: isHovered ? 'translateY(-3px)' : 'translateY(0px)',
                        filter: isHovered ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' : 'none'
                      }}
                    >
                      {axis.tool.name}
                    </text>
                    {/* Tool proficiency percentage */}
                    <text
                      x={axis.labelX}
                      y={axis.labelY + (isHovered ? 22 : 18)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-xs transition-all duration-500"
                      style={{
                        fill: isHovered ? axis.tool.color : 'hsl(var(--muted-foreground))',
                        opacity: isHovered ? 1 : 0.7,
                        fontSize: isHovered ? '12px' : '10px',
                        fontWeight: isHovered ? '600' : '400'
                      }}
                    >
                      {axis.tool.proficiency}%
                    </text>
                  </g>
                );
              })}

              {/* Center point */}
              <circle
                cx={centerX}
                cy={centerY}
                r="4"
                fill="hsl(var(--primary))"
                className="animate-pulse"
              />
            </svg>
          </div>
        </div>

        {/* Legend with floating cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {tools.map((tool, index) => (
            <Card
              key={index}
              className={`p-4 cursor-pointer transition-all duration-500 ease-out ${
                hoveredTool === tool.name
                  ? 'bg-primary/10 border-primary/50 scale-110 -translate-y-2 shadow-xl'
                  : 'bg-card/30 backdrop-blur-md border-border/30 hover:scale-105'
              }`}
              onMouseEnter={() => setHoveredTool(tool.name)}
              onMouseLeave={() => setHoveredTool(null)}
              style={{
                filter: hoveredTool === tool.name ? `drop-shadow(0 8px 20px ${tool.color}30)` : 'none'
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    hoveredTool === tool.name ? 'w-5 h-5' : ''
                  }`}
                  style={{ backgroundColor: tool.color }}
                />
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {tool.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {tool.proficiency}% • {tool.category}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Description */}
        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-4">
            <span className="font-semibold text-primary">Professional SEO Toolkit</span>
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            This radar visualization showcases my mastery of industry-leading SEO tools and platforms, 
            each representing years of hands-on experience delivering measurable results.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ToolsMindMap;