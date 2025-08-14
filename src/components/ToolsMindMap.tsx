import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";

const ToolsMindMap = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const skills = [
    { name: "Search Engine Optimization (SEO)", level: 95, color: "#10b981" },
    { name: "Content Marketing", level: 90, color: "#3b82f6" },
    { name: "Technical SEO", level: 93, color: "#8b5cf6" },
    { name: "Analytics & Reporting", level: 88, color: "#f59e0b" },
    { name: "Local SEO", level: 85, color: "#ef4444" },
    { name: "Keyword Research", level: 92, color: "#06b6d4" },
    { name: "AI SEO Tools", level: 87, color: "#84cc16" },
    { name: "Strategic Planning", level: 90, color: "#f97316" }
  ];

  const centerX = 300;
  const centerY = 300;
  const maxRadius = 180;
  const gridLevels = 5;

  // Generate points for the skill polygon
  const getSkillPoints = () => {
    return skills.map((skill, index) => {
      const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2;
      const radius = (skill.level / 100) * maxRadius;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      return { x, y, skill };
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
    return skills.map((skill, index) => {
      const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2;
      const x = centerX + Math.cos(angle) * (maxRadius + 40);
      const y = centerY + Math.sin(angle) * (maxRadius + 40);
      const lineX = centerX + Math.cos(angle) * maxRadius;
      const lineY = centerY + Math.sin(angle) * maxRadius;
      
      return {
        skill,
        labelX: x,
        labelY: y,
        lineX,
        lineY,
        angle: angle * (180 / Math.PI)
      };
    });
  };

  const skillPoints = getSkillPoints();
  const gridCircles = getGridCircles();
  const axisLines = getAxisLines();

  // Create path string for the skill polygon
  const pathString = skillPoints
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ') + ' Z';

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Skills</span>{" "}
            <span className="text-foreground">Radar</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            My expertise levels across different SEO and digital marketing domains
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
                  {/* Skill level dots */}
                  <circle
                    cx={skillPoints[index].x}
                    cy={skillPoints[index].y}
                    r="6"
                    fill={axis.skill.color}
                    className="cursor-pointer transition-all duration-300"
                    onMouseEnter={() => setHoveredSkill(axis.skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    style={{
                      transform: hoveredSkill === axis.skill.name ? 'scale(1.5)' : 'scale(1)',
                      transformOrigin: `${skillPoints[index].x}px ${skillPoints[index].y}px`
                    }}
                  />
                </g>
              ))}

              {/* Skill polygon */}
              <path
                d={pathString}
                fill="hsl(var(--primary))"
                fillOpacity="0.2"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                className="transition-all duration-500"
              />

              {/* Skill labels */}
              {axisLines.map((axis, index) => {
                const isHovered = hoveredSkill === axis.skill.name;
                return (
                  <g key={index}>
                    <text
                      x={axis.labelX}
                      y={axis.labelY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={`text-sm font-medium transition-all duration-300 cursor-pointer ${
                        isHovered ? 'text-primary' : 'text-foreground'
                      }`}
                      onMouseEnter={() => setHoveredSkill(axis.skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      style={{
                        fontSize: isHovered ? '14px' : '12px',
                        fontWeight: isHovered ? '600' : '500'
                      }}
                    >
                      {axis.skill.name}
                    </text>
                    {/* Skill level percentage */}
                    <text
                      x={axis.labelX}
                      y={axis.labelY + (isHovered ? 18 : 16)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-xs text-muted-foreground"
                      style={{
                        opacity: isHovered ? 1 : 0.7,
                        fontSize: isHovered ? '11px' : '10px'
                      }}
                    >
                      {axis.skill.level}%
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

        {/* Legend */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <Card
              key={index}
              className={`p-4 cursor-pointer transition-all duration-300 ${
                hoveredSkill === skill.name
                  ? 'bg-primary/10 border-primary/50 scale-105'
                  : 'bg-card/30 backdrop-blur-md border-border/30'
              }`}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: skill.color }}
                />
                <div>
                  <div className="text-sm font-medium text-foreground">
                    {skill.name.split(' ').slice(0, 2).join(' ')}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {skill.level}% Proficiency
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Description */}
        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-4">
            <span className="font-semibold text-primary">Comprehensive SEO Expertise</span>
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            This radar chart visualizes my proficiency levels across key SEO and digital marketing domains, 
            showcasing a well-rounded skill set built through years of hands-on experience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ToolsMindMap;