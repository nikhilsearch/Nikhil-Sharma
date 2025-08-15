import { useState } from "react";
import { Card } from "@/components/ui/card";

const ToolsMindMap = () => {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  const tools = [
    { name: "Google Search Console", value: 9.5 },
    { name: "Google Analytics", value: 9.5 },
    { name: "Screaming Frog", value: 8.5 },
    { name: "Ahrefs", value: 8.8 },
    { name: "SEMrush", value: 9.0 },
    { name: "Looker Studio", value: 8.7 },
    { name: "ChatGPT", value: 8.7 },
    { name: "Gemini", value: 8.5 },
    { name: "Claude", value: 8.4 },
    { name: "Moz", value: 8.0 },
    { name: "Lumar", value: 8.2 }
  ];

  const centerX = 300;
  const centerY = 300;
  const maxRadius = 150;
  const gridLevels = 10;

  // Generate points for the tool polygon
  const getToolPoints = () => {
    return tools.map((tool, index) => {
      const angle = (index * 2 * Math.PI) / tools.length - Math.PI / 2;
      const radius = (tool.value / 10) * maxRadius;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      return { x, y, tool };
    });
  };

  // Generate grid circles (scale 0-10)
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
      const labelDistance = maxRadius + 60;
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
    <section className="py-20 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">SEO & AI Tools</span>{" "}
            <span className="text-white">Proficiency</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Interactive visualization of professional expertise across essential SEO and AI tools
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="relative">
            <svg
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
                  stroke="#374151"
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
                  stroke="#374151"
                  strokeWidth="1"
                  opacity="0.5"
                />
              ))}

              {/* Tool polygon */}
              <path
                d={pathString}
                fill="#3bb273"
                fillOpacity={hoveredTool ? "0.6" : "0.4"}
                stroke="#3bb273"
                strokeWidth="2"
                className="transition-all duration-300 ease-out"
                style={{
                  filter: hoveredTool ? 'drop-shadow(0 0 10px #3bb273)' : 'none'
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
                      r={isHovered ? "5" : "3"}
                       fill="white"
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
                        fill="#3bb273"
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
                      className="font-medium transition-all duration-300 ease-out cursor-pointer"
                       style={{
                         fill: isHovered ? "#3bb273" : "#ffffff",
                         fontFamily: "sans-serif",
                         fontSize: isHovered ? "16px" : "14px",
                         fontWeight: isHovered ? "600" : "500",
                         filter: isHovered ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' : 'none'
                       }}
                      onMouseEnter={() => setHoveredTool(axis.tool.name)}
                      onMouseLeave={() => setHoveredTool(null)}
                    >
                      {axis.tool.name}
                    </text>
                    {/* Show value on hover */}
                    {isHovered && (
                      <text
                        x={axis.labelX}
                        y={axis.labelY + 20}
                        textAnchor={isRightSide ? "start" : "end"}
                        dominantBaseline="middle"
                        className="text-xs transition-all duration-300"
                        style={{
                          fill: "#3bb273",
                          fontFamily: "sans-serif",
                          fontSize: "12px",
                          fontWeight: "600"
                        }}
                      >
                        {axis.tool.value}/10
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Center point */}
              <circle
                cx={centerX}
                cy={centerY}
                r="3"
                fill="#3bb273"
                className="animate-pulse"
              />
            </svg>
          </div>
        </div>

        {/* Interactive Legend Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-8">
          {tools.map((tool, index) => (
            <Card
              key={index}
              className={`p-4 cursor-pointer transition-all duration-500 ease-out ${
                hoveredTool === tool.name
                  ? 'bg-primary/10 border-primary/50 scale-105 -translate-y-1 shadow-xl'
                  : 'bg-card/30 backdrop-blur-md border-border/30 hover:scale-102'
              }`}
              onMouseEnter={() => setHoveredTool(tool.name)}
              onMouseLeave={() => setHoveredTool(null)}
              style={{
                filter: hoveredTool === tool.name ? `drop-shadow(0 8px 20px #3bb27330)` : 'none'
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    hoveredTool === tool.name ? 'w-5 h-5' : ''
                  }`}
                  style={{ backgroundColor: "#3bb273" }}
                />
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {tool.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {tool.value}/10 • Proficiency
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Scale indicators */}
        <div className="text-center text-gray-400 text-sm">
          <p>Interactive Scale: 0 - 10 (Proficiency Level)</p>
        </div>
      </div>
    </section>
  );
};

export default ToolsMindMap;