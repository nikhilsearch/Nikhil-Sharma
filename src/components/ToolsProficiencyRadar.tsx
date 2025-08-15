import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Tool {
  name: string;
  proficiency: number; // 0-100
  category: 'seo' | 'ai' | 'analytics';
}

const ToolsProficiencyRadar = () => {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const tools: Tool[] = [
    { name: 'Google Search Console', proficiency: 100, category: 'seo' },
    { name: 'Google Analytics', proficiency: 80, category: 'analytics' },
    { name: 'Google Tag Manager', proficiency: 70, category: 'analytics' },
    { name: 'Screaming Frog', proficiency: 90, category: 'seo' },
    { name: 'Looker Studio', proficiency: 80, category: 'analytics' },
    { name: 'Ahrefs', proficiency: 90, category: 'seo' },
    { name: 'Semrush', proficiency: 80, category: 'seo' },
    { name: 'Google Sheets', proficiency: 80, category: 'analytics' },
    { name: 'ChatGPT', proficiency: 90, category: 'ai' },
    { name: 'Perplexity', proficiency: 90, category: 'ai' },
    { name: 'Claude', proficiency: 90, category: 'ai' },
    { name: 'Lumar', proficiency: 70, category: 'seo' },
    { name: 'Sitebulb', proficiency: 70, category: 'seo' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const generateRadarPoints = () => {
    const centerX = 300;
    const centerY = 200;
    const maxRadius = 160;
    
    return tools.map((tool, index) => {
      const angle = (index * 2 * Math.PI) / tools.length - Math.PI / 2;
      const radius = (tool.proficiency / 100) * maxRadius;
      
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
        labelX: centerX + (maxRadius + 60) * Math.cos(angle),
        labelY: centerY + (maxRadius + 60) * Math.sin(angle),
        tool,
        angle
      };
    });
  };

  const generateGridLines = () => {
    const centerX = 300;
    const centerY = 200;
    const maxRadius = 160;
    const levels = [0.2, 0.4, 0.6, 0.8, 1.0];
    
    return levels.map(level => {
      const radius = level * maxRadius;
      const points = tools.map((_, index) => {
        const angle = (index * 2 * Math.PI) / tools.length - Math.PI / 2;
        return `${centerX + radius * Math.cos(angle)},${centerY + radius * Math.sin(angle)}`;
      }).join(' ');
      
      return { points, opacity: 0.2 - (level * 0.05) };
    });
  };

  const radarPoints = generateRadarPoints();
  const gridLines = generateGridLines();
  const pathPoints = radarPoints.map(point => `${point.x},${point.y}`).join(' ');

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'seo': return 'hsl(var(--primary))';
      case 'ai': return 'hsl(280, 100%, 70%)';
      case 'analytics': return 'hsl(200, 100%, 70%)';
      default: return 'hsl(var(--primary))';
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-foreground">SEO & AI Tools</span>{" "}
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Proficiency</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Interactive visualization of professional expertise across essential SEO and AI tools
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Radar Chart */}
          <div className="flex-1 w-full">
            <Card className="bg-card/30 backdrop-blur-md border border-white/10 overflow-hidden">
              <CardContent className="p-8">
                <svg 
                  width="600" 
                  height="400" 
                  viewBox="0 0 600 400"
                  className={`w-full h-auto transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                >
                  {/* Background Grid */}
                  {gridLines.map((grid, index) => (
                    <polygon
                      key={index}
                      points={grid.points}
                      fill="none"
                      stroke="hsl(var(--border))"
                      strokeWidth="1"
                      opacity={grid.opacity}
                    />
                  ))}
                  
                  {/* Axis Lines */}
                  {radarPoints.map((point, index) => (
                    <line
                      key={index}
                      x1="300"
                      y1="200"
                      x2={point.labelX}
                      y2={point.labelY}
                      stroke="hsl(var(--border))"
                      strokeWidth="1"
                      opacity="0.3"
                    />
                  ))}
                  
                  {/* Proficiency Area */}
                  <polygon
                    points={pathPoints}
                    fill="hsl(var(--primary))"
                    fillOpacity="0.3"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    className={`transition-all duration-1000 ${isVisible ? 'animate-scale-in' : ''}`}
                  />
                  
                  {/* Data Points */}
                  {radarPoints.map((point, index) => (
                    <circle
                      key={index}
                      cx={point.x}
                      cy={point.y}
                      r={hoveredTool === point.tool.name ? "6" : "4"}
                      fill={getCategoryColor(point.tool.category)}
                      stroke="white"
                      strokeWidth="2"
                      className="transition-all duration-200 cursor-pointer"
                      style={{
                        filter: hoveredTool === point.tool.name ? 'drop-shadow(0 0 8px currentColor)' : 'none'
                      }}
                      onMouseEnter={() => setHoveredTool(point.tool.name)}
                      onMouseLeave={() => setHoveredTool(null)}
                    />
                  ))}
                  
                  {/* Tool Labels */}
                  {radarPoints.map((point, index) => (
                    <text
                      key={index}
                      x={point.labelX}
                      y={point.labelY}
                      textAnchor={point.labelX > 300 ? "start" : point.labelX < 300 ? "end" : "middle"}
                      dominantBaseline={point.labelY > 200 ? "hanging" : point.labelY < 200 ? "text-bottom" : "central"}
                      fill="hsl(var(--foreground))"
                      fontSize="13"
                      fontWeight={hoveredTool === point.tool.name ? "600" : "400"}
                      className={`transition-all duration-200 cursor-pointer ${
                        hoveredTool === point.tool.name ? 'text-primary' : ''
                      }`}
                      onMouseEnter={() => setHoveredTool(point.tool.name)}
                      onMouseLeave={() => setHoveredTool(null)}
                    >
                      {point.tool.name}
                    </text>
                  ))}
                </svg>
              </CardContent>
            </Card>
          </div>

          {/* Tool Details */}
          <div className="w-full lg:w-80 shrink-0">
            {hoveredTool && (
              <Card className="bg-card/50 backdrop-blur-md border border-primary/20 animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">
                    {hoveredTool}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const tool = tools.find(t => t.name === hoveredTool);
                    return tool ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Proficiency</span>
                          <span className="text-foreground font-semibold">{tool.proficiency}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="h-2 rounded-full transition-all duration-500"
                            style={{ 
                              width: `${tool.proficiency}%`,
                              backgroundColor: getCategoryColor(tool.category)
                            }}
                          />
                        </div>
                        <Badge 
                          variant="outline" 
                          className="capitalize"
                          style={{ borderColor: getCategoryColor(tool.category), color: getCategoryColor(tool.category) }}
                        >
                          {tool.category} Tool
                        </Badge>
                      </div>
                    ) : null;
                  })()}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsProficiencyRadar;