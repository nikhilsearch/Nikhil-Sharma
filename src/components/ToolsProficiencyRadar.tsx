import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Tool {
  name: string;
  category: 'seo' | 'ai' | 'analytics';
}

const ToolsProficiencyRadar = () => {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const tools: Tool[] = [
    { name: 'Google Search Console', category: 'seo' },
    { name: 'Google Analytics', category: 'analytics' },
    { name: 'Google Tag Manager', category: 'analytics' },
    { name: 'Screaming Frog', category: 'seo' },
    { name: 'Looker Studio', category: 'analytics' },
    { name: 'Ahrefs', category: 'seo' },
    { name: 'Semrush', category: 'seo' },
    { name: 'Google Sheets', category: 'analytics' },
    { name: 'ChatGPT', category: 'ai' },
    { name: 'Perplexity', category: 'ai' },
    {name: 'Google Gemini', category: 'ai' },
    { name: 'Claude', category: 'ai' },
    { name: 'Lumar', category: 'seo' },
    { name: 'Sitebulb', category: 'seo' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const generateRadarPoints = () => {
    const centerX = 300;
    const centerY = 250;
    const maxRadius = 120;
    
    return tools.map((tool, index) => {
      const angle = (index * 2 * Math.PI) / tools.length - Math.PI / 2;
      const radius = maxRadius; // All tools at max radius since no proficiency
      
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
        labelX: centerX + (maxRadius + 80) * Math.cos(angle),
        labelY: centerY + (maxRadius + 80) * Math.sin(angle),
        tool,
        angle
      };
    });
  };

  const generateGridLines = () => {
    const centerX = 300;
    const centerY = 250;
    const maxRadius = 120;
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
    <section className="py-20 px-4 bg-gradient-to-br from-background via-muted/10 to-primary/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-foreground">SEO & AI</span>{" "}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-cyan-500 bg-clip-text text-transparent animate-gradient-x">Tools</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Interactive visualization of professional tools across essential SEO and AI categories
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Radar Chart */}
          <div className="flex-1 w-full">
            <Card className="bg-gradient-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-xl border border-primary/20 shadow-2xl shadow-primary/10 overflow-hidden hover:shadow-3xl hover:shadow-primary/20 transition-all duration-500 hover:scale-[1.02]">
              <CardContent className="p-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 pointer-events-none" />
                <svg 
                  width="600" 
                  height="500" 
                  viewBox="0 0 600 500"
                  className={`w-full h-auto transition-all duration-1000 relative z-10 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                >
                  {/* Gradient Definitions */}
                  <defs>
                    <radialGradient id="chartGradient" cx="300" cy="250" r="120">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                      <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="hsl(280, 100%, 70%)" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="hsl(200, 100%, 70%)" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                  
                  {/* Background Glow */}
                  <circle cx="300" cy="250" r="120" fill="url(#chartGradient)" />
                  
                  {/* Background Grid */}
                  {gridLines.map((grid, index) => (
                    <polygon
                      key={index}
                      points={grid.points}
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      opacity={0.3 - (index * 0.05)}
                      className="animate-pulse"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    />
                  ))}
                  
                  {/* Axis Lines */}
                  {radarPoints.map((point, index) => (
                    <line
                      key={index}
                      x1="300"
                      y1="250"
                      x2={point.labelX}
                      y2={point.labelY}
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      opacity="0.4"
                      className="transition-all duration-300 hover:opacity-60"
                    />
                  ))}
                  
                  {/* Proficiency Area */}
                  <polygon
                    points={pathPoints}
                    fill="url(#areaGradient)"
                    stroke="hsl(var(--primary))"
                    strokeWidth="3"
                    className={`transition-all duration-1000 ${isVisible ? 'animate-scale-in' : ''}`}
                    filter="drop-shadow(0 0 20px hsl(var(--primary) / 0.3))"
                  />
                  
                  {/* Data Points */}
                  {radarPoints.map((point, index) => (
                    <g key={index}>
                      {/* Outer Glow Ring */}
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r={hoveredTool === point.tool.name ? "12" : "8"}
                        fill={getCategoryColor(point.tool.category)}
                        opacity="0.2"
                        className="transition-all duration-300 animate-pulse"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      />
                      {/* Main Point */}
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r={hoveredTool === point.tool.name ? "7" : "5"}
                        fill={getCategoryColor(point.tool.category)}
                        stroke="hsl(var(--background))"
                        strokeWidth="3"
                        className="transition-all duration-200 cursor-pointer hover-scale"
                        style={{
                          filter: hoveredTool === point.tool.name 
                            ? `drop-shadow(0 0 15px ${getCategoryColor(point.tool.category)})` 
                            : `drop-shadow(0 0 5px ${getCategoryColor(point.tool.category)})`
                        }}
                        onMouseEnter={() => setHoveredTool(point.tool.name)}
                        onMouseLeave={() => setHoveredTool(null)}
                      />
                    </g>
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
                      fontWeight={hoveredTool === point.tool.name ? "700" : "500"}
                      className={`transition-all duration-200 cursor-pointer story-link ${
                        hoveredTool === point.tool.name ? 'text-primary' : ''
                      }`}
                      style={{
                        filter: hoveredTool === point.tool.name ? 'drop-shadow(0 2px 4px hsl(var(--primary) / 0.3))' : 'none',
                        textShadow: hoveredTool === point.tool.name ? '0 0 10px hsl(var(--primary) / 0.5)' : 'none'
                      }}
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