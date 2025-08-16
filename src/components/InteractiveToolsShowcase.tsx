import React, { useState, useEffect, useRef } from 'react';
import { Search, BarChart3, Brain, Zap, TrendingUp, Target, Star, Sparkles } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  category: string;
  description: string;
  level: number;
  color: string;
}

const InteractiveToolsShowcase = () => {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const tools: Tool[] = [
    { id: '1', name: 'Google Analytics', icon: BarChart3, category: 'Analytics', description: 'Advanced web analytics and insights', level: 95, color: 'from-blue-500 to-cyan-500' },
    { id: '2', name: 'SEMrush', icon: Search, category: 'SEO', description: 'Comprehensive SEO and SEM platform', level: 90, color: 'from-green-500 to-emerald-500' },
    { id: '3', name: 'ChatGPT', icon: Brain, category: 'AI', description: 'AI-powered content and strategy', level: 88, color: 'from-purple-500 to-pink-500' },
    { id: '4', name: 'Ahrefs', icon: TrendingUp, category: 'SEO', description: 'Backlink analysis and keyword research', level: 92, color: 'from-orange-500 to-red-500' },
    { id: '5', name: 'Google Search Console', icon: Target, category: 'SEO', description: 'Search performance monitoring', level: 96, color: 'from-indigo-500 to-blue-500' },
    { id: '6', name: 'Perplexity AI', icon: Zap, category: 'AI', description: 'Research and content intelligence', level: 85, color: 'from-yellow-500 to-orange-500' },
  ];

  const categories = ['all', 'SEO', 'Analytics', 'AI'];

  const filteredTools = selectedCategory === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-background to-muted/20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <header className="text-center mb-16">
          <div className="relative group">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 relative z-10">
              <span className="bg-gradient-to-r from-primary via-purple-400 to-secondary bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
                Professional Tools
              </span>
              <br />
              <span className="text-foreground">Mastery</span>
            </h2>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Interactive showcase of cutting-edge tools and technologies
          </p>
        </header>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-card/50 backdrop-blur-sm rounded-2xl p-2 border border-border/50">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                    : 'text-muted-foreground hover:text-foreground hover:bg-primary/10'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid with 3D Effects */}
        <div 
          ref={containerRef}
          className="relative"
          onMouseMove={handleMouseMove}
        >
          {/* Dynamic Background Gradient */}
          <div 
            className="absolute inset-0 opacity-30 transition-all duration-1000 ease-out pointer-events-none"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, var(--primary) 0%, transparent 40%)`,
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.map((tool, index) => (
              <div
                key={tool.id}
                className={`group relative p-8 bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 transition-all duration-700 cursor-pointer overflow-hidden
                  hover:scale-105 hover:-translate-y-4 hover:rotate-1 hover:shadow-2xl hover:border-primary/50
                  animate-fade-in`}
                style={{ 
                  animationDelay: `${index * 150}ms`,
                  transform: hoveredTool === tool.id ? 'perspective(1000px) rotateX(10deg) rotateY(5deg)' : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                  transformStyle: 'preserve-3d',
                }}
                onMouseEnter={() => setHoveredTool(tool.id)}
                onMouseLeave={() => setHoveredTool(null)}
              >
                {/* Holographic Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-3xl`} />
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 -top-px overflow-hidden rounded-3xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                </div>

                {/* Floating Particles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-primary/60 rounded-full animate-ping"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: '2s',
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-10">
                  {/* Tool Icon */}
                  <div className={`w-20 h-20 mx-auto mb-6 p-4 bg-gradient-to-br ${tool.color} rounded-2xl shadow-lg group-hover:shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                    <tool.icon className="w-full h-full text-white" />
                  </div>

                  {/* Tool Name */}
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-500 mb-3 text-center group-hover:scale-105">
                    {tool.name}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-center mb-4 group-hover:text-foreground transition-colors duration-500">
                    {tool.description}
                  </p>

                  {/* Skill Level Visualization */}
                  <div className="relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-muted-foreground">Proficiency</span>
                      <span className="text-sm font-bold text-primary">{tool.level}%</span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${tool.color} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
                        style={{ width: hoveredTool === tool.id ? `${tool.level}%` : '0%' }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                      </div>
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="flex justify-center mt-4 space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 transition-all duration-300 ${
                          i < Math.floor(tool.level / 20)
                            ? 'text-yellow-400 fill-current scale-110'
                            : 'text-muted-foreground'
                        }`}
                        style={{ animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <Sparkles className="w-6 h-6 text-primary animate-spin" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Stats */}
        <div className="mt-20 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Tools Mastered', value: '25+', icon: Target },
              { label: 'Years Experience', value: '6+', icon: TrendingUp },
              { label: 'Success Rate', value: '98%', icon: Star },
            ].map((stat, index) => (
              <div
                key={index}
                className="relative group p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-500 hover:scale-105"
              >
                <div className="w-12 h-12 mx-auto mb-4 p-3 bg-primary/20 rounded-xl group-hover:bg-primary/30 transition-colors duration-300">
                  <stat.icon className="w-full h-full text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveToolsShowcase;