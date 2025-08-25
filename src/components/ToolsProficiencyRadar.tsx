import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Search, BarChart3, Tag, Megaphone, Eye, FileSpreadsheet, 
  MessageSquare, Zap, Bot, Brain, CheckSquare, Trello, Users, X 
} from 'lucide-react';

interface Tool {
  name: string;
  category: 'seo' | 'ai' | 'analytics' | 'project-management';
  description: string;
}

const ToolsProficiencyRadar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [openPopover, setOpenPopover] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

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

  // Tool icon mapping
  const getToolIcon = (toolName: string) => {
    const iconMap: { [key: string]: any } = {
      'Google Search Console': Search,
      'Google Analytics': BarChart3,
      'Google Tag Manager': Tag,
      'Screaming Frog': Megaphone,
      'Looker Studio': Eye,
      'Ahrefs': BarChart3,
      'Semrush': BarChart3,
      'Google Sheets': FileSpreadsheet,
      'ChatGPT': MessageSquare,
      'Perplexity': Zap,
      'Google Gemini': Bot,
      'Claude': Brain,
      'Lumar': Search,
      'Sitebulb': Search,
      'Jira': CheckSquare,
      'Asana': Users,
      'Trello': Trello,
    };
    return iconMap[toolName] || Search;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'seo': return 'hsl(var(--primary))';
      case 'ai': return 'hsl(280, 100%, 70%)';
      case 'analytics': return 'hsl(200, 100%, 70%)';
      case 'project-management': return 'hsl(140, 80%, 35%)';
      default: return 'hsl(var(--primary))';
    }
  };

  // Handle popover open/close with single popover management
  const handleOpenChange = (toolName: string, open: boolean) => {
    if (open) {
      setOpenPopover(toolName);
    } else {
      setOpenPopover(null);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Tool Detail Component with Close Button
  const ToolDetailContent = ({ tool, isDesktop = false }: { tool: Tool; isDesktop?: boolean }) => (
    <div className={`space-y-3 w-full ${isDesktop ? 'max-w-[240px]' : 'max-w-[280px] sm:w-80 sm:max-w-sm'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div 
            className={`${isDesktop ? 'p-1.5' : 'p-2'} rounded-lg`} 
            style={{ 
              backgroundColor: `${getCategoryColor(tool.category)}15`,
              border: `1px solid ${getCategoryColor(tool.category)}30`
            }}
          >
            {(() => {
              const IconComponent = getToolIcon(tool.name);
              return <IconComponent className={`${isDesktop ? 'w-3 h-3' : 'w-4 h-4'}`} style={{ color: getCategoryColor(tool.category) }} />;
            })()}
          </div>
          <h3 className={`font-semibold text-primary ${isDesktop ? 'text-sm' : 'text-lg'}`}>{tool.name}</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setOpenPopover(null)}
          className="h-6 w-6 p-0 hover:bg-muted rounded-full"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
      
      <Badge 
        variant="outline" 
        className={`capitalize ${isDesktop ? 'text-xs' : 'text-xs'}`}
        style={{ 
          borderColor: getCategoryColor(tool.category), 
          color: getCategoryColor(tool.category),
          backgroundColor: `${getCategoryColor(tool.category)}10`
        }}
      >
        {tool.category.replace('-', ' ')} Tool
      </Badge>
      
      <p className={`${isDesktop ? 'text-xs' : 'text-sm'} text-muted-foreground leading-relaxed`}>
        {tool.description}
      </p>
    </div>
  );

  // Desktop radar chart functions
  const generateRadarPoints = () => {
    const centerX = 300;
    const centerY = 250;
    const maxRadius = 120;
    
    return tools.map((tool, index) => {
      const angle = (index * 2 * Math.PI) / tools.length - Math.PI / 2;
      const radius = maxRadius;
      
      const labelDistance = maxRadius + 80;
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

        {!isMobile ? (
          // Desktop Radial Chart with Popovers
          <div className="flex flex-col items-center">
            {/* Helper message for desktop - only show when no popover is open */}
            {!openPopover && (
              <div className="mb-6 text-center">
                <p className="text-sm text-muted-foreground italic animate-fade-in">
                  💡 Hover on the tools to see the details
                </p>
              </div>
            )}
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
                      <stop offset="33%" stopColor="hsl(280, 100%, 70%)" stopOpacity="0.3" />
                      <stop offset="66%" stopColor="hsl(200, 100%, 70%)" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="hsl(140, 80%, 35%)" stopOpacity="0.4" />
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
                  
                  {/* Data Points with Popovers */}
                  {radarPoints.map((point, index) => (
                    <g key={index}>
                      <Popover 
                        open={openPopover === point.tool.name}
                        onOpenChange={(open) => handleOpenChange(point.tool.name, open)}
                      >
                        <PopoverTrigger asChild>
                          <g className="cursor-pointer">
                            {/* Outer Glow Ring */}
                            <circle
                              cx={point.x}
                              cy={point.y}
                              r={openPopover === point.tool.name ? "12" : "8"}
                              fill={getCategoryColor(point.tool.category)}
                              opacity="0.2"
                              className="transition-all duration-300 animate-pulse"
                              style={{ animationDelay: `${index * 0.1}s` }}
                            />
                            {/* Main Point */}
                            <circle
                              cx={point.x}
                              cy={point.y}
                              r={openPopover === point.tool.name ? "7" : "5"}
                              fill={getCategoryColor(point.tool.category)}
                              stroke="hsl(var(--background))"
                              strokeWidth="3"
                              className="transition-all duration-200 hover-scale"
                              style={{
                                filter: openPopover === point.tool.name 
                                  ? `drop-shadow(0 0 15px ${getCategoryColor(point.tool.category)})` 
                                  : `drop-shadow(0 0 5px ${getCategoryColor(point.tool.category)})`
                              }}
                            />
                          </g>
                        </PopoverTrigger>
                        <PopoverContent 
                          className="p-3 bg-card/95 backdrop-blur-md border border-primary/20 shadow-xl"
                          sideOffset={8}
                          align="end"
                          alignOffset={-10}
                          avoidCollisions={true}
                          collisionBoundary={document.querySelector('.max-w-6xl')}
                          sticky="always"
                        >
                          <ToolDetailContent tool={point.tool} isDesktop={true} />
                        </PopoverContent>
                      </Popover>
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
                      fontWeight={openPopover === point.tool.name ? "700" : "500"}
                      className={`transition-all duration-200 cursor-pointer story-link ${
                        openPopover === point.tool.name ? 'text-primary' : ''
                      }`}
                      style={{
                        filter: openPopover === point.tool.name ? 'drop-shadow(0 2px 4px hsl(var(--primary) / 0.3))' : 'none',
                        textShadow: openPopover === point.tool.name ? '0 0 10px hsl(var(--primary) / 0.5)' : 'none'
                      }}
                      onClick={() => handleOpenChange(point.tool.name, openPopover !== point.tool.name)}
                    >
                      {point.tool.name}
                    </text>
                  ))}
                </svg>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Mobile Grid Layout with Popovers
          <div className="grid grid-cols-2 gap-6">
            {tools.map((tool, index) => {
              const IconComponent = getToolIcon(tool.name);
              return (
                <Popover 
                  key={index}
                  open={openPopover === tool.name}
                  onOpenChange={(open) => handleOpenChange(tool.name, open)}
                >
                  <PopoverTrigger asChild>
                    <div
                      className={`group relative p-6 rounded-2xl border-2 transition-all duration-500 cursor-pointer min-h-[140px] transform-gpu ${
                        openPopover === tool.name
                          ? 'bg-gradient-to-br from-primary/30 via-primary/20 to-purple-500/20 border-primary shadow-2xl shadow-primary/30 scale-110 rotate-1'
                          : 'bg-gradient-to-br from-card/80 via-card/60 to-primary/5 backdrop-blur-sm border-border/30 hover:border-primary/60 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 active:scale-95'
                      }`}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleOpenChange(tool.name, openPopover !== tool.name);
                        }
                      }}
                      aria-label={`View details for ${tool.name}`}
                    >
                      {/* Multi-layer gradient overlays for better visibility */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/15 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
                      
                      {/* Enhanced animated border glow */}
                      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary via-purple-500 to-cyan-500 opacity-0 group-hover:opacity-40 blur-sm transition-all duration-700 pointer-events-none animate-pulse" />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 group-hover:from-primary/15 group-hover:to-purple-500/15 transition-all duration-500 pointer-events-none" />
                      
                      <div className="relative z-10 flex flex-col items-center text-center space-y-4 h-full justify-center">
                        {/* Enhanced Tool Icon */}
                        <div 
                          className={`p-4 rounded-xl transition-all duration-500 transform ${
                            openPopover === tool.name 
                              ? 'shadow-2xl shadow-primary/60 scale-110 rotate-3' 
                              : 'group-hover:shadow-xl group-hover:shadow-primary/40 group-hover:scale-105 group-hover:-rotate-1'
                          }`}
                          style={{ 
                            backgroundColor: `${getCategoryColor(tool.category)}20`,
                            border: `2px solid ${getCategoryColor(tool.category)}40`,
                            boxShadow: `0 0 20px ${getCategoryColor(tool.category)}30`
                          }}
                        >
                          <IconComponent 
                            className="w-7 h-7 transition-all duration-500 group-hover:scale-110"
                            style={{ 
                              color: getCategoryColor(tool.category),
                              filter: `drop-shadow(0 2px 4px ${getCategoryColor(tool.category)}40)`
                            }}
                          />
                        </div>
                        
                        {/* Enhanced Tool Name */}
                        <h3 
                          className={`text-base font-bold transition-all duration-500 leading-tight px-2 ${
                            openPopover === tool.name 
                              ? 'text-primary scale-105' 
                              : 'text-foreground group-hover:text-primary group-hover:scale-102'
                          }`}
                          style={{
                            textShadow: openPopover === tool.name ? '0 2px 8px hsl(var(--primary) / 0.3)' : 'none'
                          }}
                        >
                          {tool.name}
                        </h3>
                        
                        {/* Enhanced Category Badge */}
                        <Badge 
                          variant="outline" 
                          className={`text-xs px-3 py-1 capitalize font-medium transition-all duration-300 ${
                            openPopover === tool.name ? 'scale-105' : 'group-hover:scale-102'
                          }`}
                          style={{ 
                            borderColor: `${getCategoryColor(tool.category)}60`, 
                            color: getCategoryColor(tool.category),
                            backgroundColor: `${getCategoryColor(tool.category)}15`,
                            boxShadow: `0 2px 8px ${getCategoryColor(tool.category)}20`
                          }}
                        >
                          {tool.category.replace('-', ' ')}
                        </Badge>
                      </div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent 
                    className="p-4 bg-card/95 backdrop-blur-md border border-primary/20 shadow-xl max-w-[280px]"
                    sideOffset={8}
                    align="center"
                    alignOffset={0}
                    avoidCollisions={true}
                    collisionBoundary={document.querySelector('.grid')}
                    side="top"
                    sticky="always"
                  >
                    <ToolDetailContent tool={tool} />
                  </PopoverContent>
                </Popover>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ToolsProficiencyRadar;