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
    { 
      name: 'Google Search Console', 
      category: 'seo',
      description: 'My primary source for organic performance data. I monitor impressions, clicks, CTR, and keyword positions. I also use GSC to submit sitemaps, identify indexation issues, and analyze Core Web Vitals.'
    },
    { 
      name: 'Google Analytics', 
      category: 'analytics',
      description: 'Tracks user behavior and traffic sources. I use event tracking to measure conversions, analyze engagement per landing page, and align SEO KPIs with business goals.'
    },
    { 
      name: 'Google Tag Manager', 
      category: 'analytics',
      description: 'Essential for deploying tracking pixels and custom events without dev dependency. I often configure scroll depth tracking, button clicks, and structured data testing via GTM.'
    },
    { 
      name: 'Screaming Frog', 
      category: 'seo',
      description: 'My crawling powerhouse. I use it for large-scale site audits, broken link checks, redirect chain analysis, and extracting structured data.'
    },
    { 
      name: 'Looker Studio', 
      category: 'analytics',
      description: 'I build client dashboards combining GA4, GSC, and third-party SEO data, creating real-time visualizations for performance tracking.'
    },
    { 
      name: 'Ahrefs', 
      category: 'seo',
      description: 'My go-to for backlink analysis, broken link opportunities, and competitive keyword gap research. I also use its content explorer for link prospecting.'
    },
    { 
      name: 'Semrush', 
      category: 'seo',
      description: 'I rely on it for keyword tracking, SERP analysis, and competitive audits. I often cross-validate keyword data with Ahrefs for accuracy.'
    },
    { 
      name: 'Google Sheets', 
      category: 'analytics',
      description: 'My go-to for organizing keyword research, backlink audits, and content calendars. I connect Sheets with APIs (e.g., GSC, Semrush) to automate reporting.'
    },
    { 
      name: 'ChatGPT', 
      category: 'ai',
      description: 'Helps me draft content briefs, generate schema markup, and even create quick scripts for data formatting. Also useful for brainstorming content angles.'
    },
    { 
      name: 'Perplexity', 
      category: 'ai',
      description: 'Great for quick research and staying updated on SEO trends with cited sources.'
    },
    { 
      name: 'Google Gemini', 
      category: 'ai',
      description: 'Useful for multimodal insights (text + data), helping me interpret analytics patterns or brainstorm optimization strategies.'
    },
    { 
      name: 'Claude', 
      category: 'ai',
      description: 'I use it for summarizing long reports, competitor pages, or technical documentation into actionable insights.'
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
    },
    { 
      name: 'Jira', 
      category: 'project-management',
      description: 'My go-to for managing complex SEO projects with development teams. I use it to track technical SEO implementations, create detailed tickets for developers, and maintain sprint planning for website optimization projects.'
    },
    { 
      name: 'Asana', 
      category: 'project-management',
      description: 'Perfect for client project coordination and content marketing campaigns. I use it to manage content calendars, track deliverables, assign tasks to team members, and maintain visibility into project timelines.'
    },
    { 
      name: 'Trello', 
      category: 'project-management',
      description: 'Great for visual project management and workflow organization. I use Kanban boards to track SEO audit processes, content production stages, and client communication workflows from ideation to completion.'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const generateRadarPoints = (isMobile = false) => {
    const centerX = isMobile ? 200 : 300;
    const centerY = isMobile ? 180 : 250;
    const maxRadius = isMobile ? 80 : 120;
    
    return tools.map((tool, index) => {
      const angle = (index * 2 * Math.PI) / tools.length - Math.PI / 2;
      const radius = maxRadius; // All tools at max radius since no proficiency
      
      const labelDistance = isMobile ? maxRadius + 40 : maxRadius + 80;
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
        labelX: centerX + labelDistance * Math.cos(angle),
        labelY: centerY + labelDistance * Math.sin(angle),
        tool,
        angle
      };
    });
  };

  const generateGridLines = (isMobile = false) => {
    const centerX = isMobile ? 200 : 300;
    const centerY = isMobile ? 180 : 250;
    const maxRadius = isMobile ? 80 : 120;
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

  // Check if we're on mobile
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const radarPoints = generateRadarPoints(isMobile);
  const gridLines = generateGridLines(isMobile);
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
    <section className="py-20 px-4 bg-gradient-to-br from-background via-muted/10 to-primary/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-foreground">Professional</span>{" "}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-cyan-500 bg-clip-text text-transparent animate-gradient-x">Tools</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Interactive visualization of professional tools across SEO, AI, Analytics, and Project Management
          </p>
        </div>

        <div className="flex flex-col gap-8 items-center">
          {/* Radar Chart */}
          <div className="w-full max-w-4xl">
            <Card className="bg-gradient-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-xl border border-primary/20 shadow-2xl shadow-primary/10 overflow-hidden hover:shadow-3xl hover:shadow-primary/20 transition-all duration-500 hover:scale-[1.02]">
              <CardContent className={`${isMobile ? 'p-4' : 'p-8'} relative`}>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 pointer-events-none" />
                <svg 
                  width={isMobile ? "400" : "600"} 
                  height={isMobile ? "320" : "500"} 
                  viewBox={isMobile ? "0 0 400 320" : "0 0 600 500"}
                  className={`w-full h-auto transition-all duration-1000 relative z-10 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                >
                  {/* Gradient Definitions */}
                  <defs>
                    <radialGradient 
                      id="chartGradient" 
                      cx={isMobile ? "200" : "300"} 
                      cy={isMobile ? "180" : "250"} 
                      r={isMobile ? "80" : "120"}
                    >
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
                  <circle 
                    cx={isMobile ? "200" : "300"} 
                    cy={isMobile ? "180" : "250"} 
                    r={isMobile ? "80" : "120"} 
                    fill="url(#chartGradient)" 
                  />
                  
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
                      x1={isMobile ? "200" : "300"}
                      y1={isMobile ? "180" : "250"}
                      x2={point.labelX}
                      y2={point.labelY}
                      stroke="hsl(var(--primary))"
                      strokeWidth={isMobile ? "1" : "2"}
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
                        textAnchor={point.labelX > (isMobile ? 200 : 300) ? "start" : point.labelX < (isMobile ? 200 : 300) ? "end" : "middle"}
                        dominantBaseline={point.labelY > (isMobile ? 140 : 200) ? "hanging" : point.labelY < (isMobile ? 140 : 200) ? "text-bottom" : "central"}
                        fill="hsl(var(--foreground))"
                        fontSize={isMobile ? "10" : "13"}
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
                        {isMobile && point.tool.name.length > 15 ? 
                          point.tool.name.substring(0, 12) + '...' : 
                          point.tool.name
                        }
                      </text>
                  ))}
                </svg>
              </CardContent>
            </Card>
          </div>

          {/* Tool Details */}
          <div className="w-full max-w-md mx-auto">
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
                      <div className="space-y-4">
                        <Badge 
                          variant="outline" 
                          className="capitalize"
                          style={{ borderColor: getCategoryColor(tool.category), color: getCategoryColor(tool.category) }}
                        >
                          {tool.category.replace('-', ' ')} Tool
                        </Badge>
                        <p className="text-sm text-muted-foreground leading-relaxed">
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