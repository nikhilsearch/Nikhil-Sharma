import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Tool {
  name: string;
  category: 'seo' | 'ai' | 'analytics' | 'project-management';
  description: string;
}

const ToolsProficiencyRadar = () => {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const tools: Tool[] = [
    // SEO Tools - distributed evenly
    { 
      name: 'Google Search Console', 
      category: 'seo',
      description: 'My primary source for organic performance data. I monitor impressions, clicks, CTR, and keyword positions. I also use GSC to submit sitemaps, identify indexation issues, and analyze Core Web Vitals.'
    },
    { 
      name: 'ChatGPT', 
      category: 'ai',
      description: 'Helps me draft content briefs, generate schema markup, and even create quick scripts for data formatting. Also useful for brainstorming content angles.'
    },
    { 
      name: 'Google Analytics', 
      category: 'analytics',
      description: 'Tracks user behavior and traffic sources. I use event tracking to measure conversions, analyze engagement per landing page, and align SEO KPIs with business goals.'
    },
    { 
      name: 'Jira', 
      category: 'project-management',
      description: 'My go-to for managing complex SEO projects with development teams. I use it to track technical SEO implementations, create detailed tickets for developers, and maintain sprint planning for website optimization projects.'
    },
    { 
      name: 'Ahrefs', 
      category: 'seo',
      description: 'My go-to for backlink analysis, broken link opportunities, and competitive keyword gap research. I also use its content explorer for link prospecting.'
    },
    { 
      name: 'Claude', 
      category: 'ai',
      description: 'I use it for summarizing long reports, competitor pages, or technical documentation into actionable insights.'
    },
    { 
      name: 'Google Tag Manager', 
      category: 'analytics',
      description: 'Essential for deploying tracking pixels and custom events without dev dependency. I often configure scroll depth tracking, button clicks, and structured data testing via GTM.'
    },
    { 
      name: 'Asana', 
      category: 'project-management',
      description: 'Perfect for client project coordination and content marketing campaigns. I use it to manage content calendars, track deliverables, assign tasks to team members, and maintain visibility into project timelines.'
    },
    { 
      name: 'Semrush', 
      category: 'seo',
      description: 'I rely on it for keyword tracking, SERP analysis, and competitive audits. I often cross-validate keyword data with Ahrefs for accuracy.'
    },
    { 
      name: 'Perplexity', 
      category: 'ai',
      description: 'Great for quick research and staying updated on SEO trends with cited sources.'
    },
    { 
      name: 'Looker Studio', 
      category: 'analytics',
      description: 'I build client dashboards combining GA4, GSC, and third-party SEO data, creating real-time visualizations for performance tracking.'
    },
    { 
      name: 'Trello', 
      category: 'project-management',
      description: 'Great for visual project management and workflow organization. I use Kanban boards to track SEO audit processes, content production stages, and client communication workflows from ideation to completion.'
    },
    { 
      name: 'Screaming Frog', 
      category: 'seo',
      description: 'My crawling powerhouse. I use it for large-scale site audits, broken link checks, redirect chain analysis, and extracting structured data.'
    },
    { 
      name: 'Google Gemini', 
      category: 'ai',
      description: 'Useful for multimodal insights (text + data), helping me interpret analytics patterns or brainstorm optimization strategies.'
    },
    { 
      name: 'Google Sheets', 
      category: 'analytics',
      description: 'My go-to for organizing keyword research, backlink audits, and content calendars. I connect Sheets with APIs (e.g., GSC, Semrush) to automate reporting.'
    },
    { 
      name: 'Lumar', 
      category: 'seo',
      description: 'I rely on it for enterprise-level crawling, monitoring site migrations, and maintaining clean indexation across large websites.'
    },
    { 
      name: 'Sitebulb', 
      category: 'seo',
      description: 'Complements Screaming Frog with visual site audits and prioritization insights for developers. Great for explaining issues to non-technical stakeholders.'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const generateRadarPoints = () => {
    const centerX = 200;
    const centerY = 160;
    const maxRadius = 80;
    
    return tools.map((tool, index) => {
      const angle = (index * 2 * Math.PI) / tools.length - Math.PI / 2;
      const radius = maxRadius; // All tools at max radius since no proficiency
      
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
        labelX: centerX + (maxRadius + 50) * Math.cos(angle),
        labelY: centerY + (maxRadius + 50) * Math.sin(angle),
        tool,
        angle
      };
    });
  };

  const generateGridLines = () => {
    const centerX = 200;
    const centerY = 160;
    const maxRadius = 80;
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
      case 'project-management': return 'hsl(120, 100%, 60%)';
      default: return 'hsl(var(--primary))';
    }
  };

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-background via-muted/10 to-primary/5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3">
            <span className="text-foreground">Professional</span>{" "}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-cyan-500 bg-clip-text text-transparent">Tools</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Interactive visualization of professional tools across SEO, AI, Analytics, and Project Management
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Radar Chart */}
          <div className="flex-1 w-full">
            <Card className="bg-gradient-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-xl border border-primary/20 shadow-xl shadow-primary/10 overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500">
              <CardContent className="p-4 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 pointer-events-none" />
                <svg 
                  width="400" 
                  height="320" 
                  viewBox="0 0 400 320"
                  className={`w-full h-auto transition-all duration-1000 relative z-10 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                >
                  {/* Gradient Definitions */}
                  <defs>
                    <radialGradient id="chartGradient" cx="200" cy="160" r="80">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                      <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
                      <stop offset="33%" stopColor="hsl(280, 100%, 70%)" stopOpacity="0.3" />
                      <stop offset="66%" stopColor="hsl(200, 100%, 70%)" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="hsl(120, 100%, 60%)" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                  
                  {/* Background Glow */}
                  <circle cx="200" cy="160" r="80" fill="url(#chartGradient)" />
                  
                  {/* Background Grid */}
                  {gridLines.map((grid, index) => (
                    <polygon
                      key={index}
                      points={grid.points}
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="1.5"
                      opacity={0.3 - (index * 0.05)}
                      className="animate-pulse"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    />
                  ))}
                  
                  {/* Axis Lines */}
                  {radarPoints.map((point, index) => (
                    <line
                      key={index}
                      x1="200"
                      y1="160"
                      x2={point.labelX}
                      y2={point.labelY}
                      stroke="hsl(var(--primary))"
                      strokeWidth="1.5"
                      opacity="0.4"
                      className="transition-all duration-300 hover:opacity-60"
                    />
                  ))}
                  
                  {/* Proficiency Area */}
                  <polygon
                    points={pathPoints}
                    fill="url(#areaGradient)"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    className={`transition-all duration-1000 ${isVisible ? 'animate-scale-in' : ''}`}
                    filter="drop-shadow(0 0 15px hsl(var(--primary) / 0.3))"
                  />
                  
                  {/* Data Points */}
                  {radarPoints.map((point, index) => (
                    <g key={index}>
                      {/* Outer Glow Ring */}
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r={hoveredTool === point.tool.name ? "8" : "6"}
                        fill={getCategoryColor(point.tool.category)}
                        opacity="0.2"
                        className="transition-all duration-300 animate-pulse"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      />
                      {/* Main Point */}
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r={hoveredTool === point.tool.name ? "5" : "3.5"}
                        fill={getCategoryColor(point.tool.category)}
                        stroke="hsl(var(--background))"
                        strokeWidth="2"
                        className="transition-all duration-200 cursor-pointer hover-scale"
                        style={{
                          filter: hoveredTool === point.tool.name 
                            ? `drop-shadow(0 0 10px ${getCategoryColor(point.tool.category)})` 
                            : `drop-shadow(0 0 3px ${getCategoryColor(point.tool.category)})`
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
                      textAnchor={point.labelX > 200 ? "start" : point.labelX < 200 ? "end" : "middle"}
                      dominantBaseline={point.labelY > 140 ? "hanging" : point.labelY < 140 ? "text-bottom" : "central"}
                      fill="hsl(var(--foreground))"
                      fontSize="11"
                      fontWeight={hoveredTool === point.tool.name ? "700" : "500"}
                      className={`transition-all duration-200 cursor-pointer story-link ${
                        hoveredTool === point.tool.name ? 'text-primary' : ''
                      }`}
                      style={{
                        filter: hoveredTool === point.tool.name ? 'drop-shadow(0 1px 2px hsl(var(--primary) / 0.3))' : 'none',
                        textShadow: hoveredTool === point.tool.name ? '0 0 8px hsl(var(--primary) / 0.5)' : 'none'
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
          <div className="w-full lg:w-72 shrink-0">
            {hoveredTool && (
              <Card className="bg-card/50 backdrop-blur-md border border-primary/20 animate-fade-in">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base text-primary">
                    {hoveredTool}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  {(() => {
                    const tool = tools.find(t => t.name === hoveredTool);
                    return tool ? (
                      <div className="space-y-3">
                        <Badge 
                          variant="outline" 
                          className="capitalize text-xs"
                          style={{ borderColor: getCategoryColor(tool.category), color: getCategoryColor(tool.category) }}
                        >
                          {tool.category.replace('-', ' ')} Tool
                        </Badge>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {tool.description}
                        </p>
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