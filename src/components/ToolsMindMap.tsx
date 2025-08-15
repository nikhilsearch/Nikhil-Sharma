import { useState } from "react";

const ToolsMindMap = () => {
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
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-black">
            SEO & AI Tools Proficiency
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional expertise across essential SEO and AI tools
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="relative">
            <svg
              width="600"
              height="600"
              viewBox="0 0 600 600"
              className="bg-white"
            >
              {/* Grid circles */}
              {gridCircles.map((radius, index) => (
                <circle
                  key={index}
                  cx={centerX}
                  cy={centerY}
                  r={radius}
                  fill="none"
                  stroke="#e5e5e5"
                  strokeWidth="1"
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
                  stroke="#e5e5e5"
                  strokeWidth="1"
                />
              ))}

              {/* Tool polygon */}
              <path
                d={pathString}
                fill="#3bb273"
                fillOpacity="0.4"
                stroke="#3bb273"
                strokeWidth="2"
              />

              {/* Tool points */}
              {toolPoints.map((point, index) => (
                <circle
                  key={index}
                  cx={point.x}
                  cy={point.y}
                  r="3"
                  fill="black"
                />
              ))}

              {/* Tool labels */}
              {axisLines.map((axis, index) => {
                const isRightSide = axis.labelX > centerX;
                const isTopSide = axis.labelY < centerY;
                
                return (
                  <text
                    key={index}
                    x={axis.labelX}
                    y={axis.labelY}
                    textAnchor={isRightSide ? "start" : "end"}
                    dominantBaseline="middle"
                    className="text-sm font-medium fill-black"
                    style={{
                      fontFamily: "sans-serif",
                      fontSize: "14px"
                    }}
                  >
                    {axis.tool.name}
                  </text>
                );
              })}

              {/* Center point */}
              <circle
                cx={centerX}
                cy={centerY}
                r="2"
                fill="#3bb273"
              />
            </svg>
          </div>
        </div>

        {/* Scale indicators */}
        <div className="text-center text-gray-600 text-sm">
          <p>Scale: 0 - 10 (Proficiency Level)</p>
        </div>
      </div>
    </section>
  );
};

export default ToolsMindMap;