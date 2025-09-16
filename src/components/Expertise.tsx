
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { TrendingUp, Users, Award, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const Expertise = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [visibleStats, setVisibleStats] = useState(false);

  const stats = [
    { icon: TrendingUp, value: 250, label: "SEO Projects Completed", suffix: "+" },
    { icon: Users, value: 150, label: "Happy Clients", suffix: "+" },
    { icon: Award, value: 5, label: "Years Experience", suffix: "" },
    { icon: Target, value: 98, label: "Success Rate", suffix: "%" }
  ];

  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

  useEffect(() => {
    const timer = setTimeout(() => setVisibleStats(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (visibleStats) {
      stats.forEach((stat, index) => {
        let start = 0;
        const increment = stat.value / 50;
        const timer = setInterval(() => {
          start += increment;
          if (start >= stat.value) {
            start = stat.value;
            clearInterval(timer);
          }
          setAnimatedStats(prev => {
            const newStats = [...prev];
            newStats[index] = Math.floor(start);
            return newStats;
          });
        }, 30);
      });
    }
  }, [visibleStats]);

  const expertiseAreas = [
    {
      id: 1,
      title: "AI SEO",
      description: "I optimize websites for the new era of AI-powered search engines and LLM models. This includes optimizing for Google's AI Overviews and other generative search experiences to ensure your content is cited and visible in AI-driven answers.",
      skills: ["AI Overviews", "LLM Optimization", "Generative Search", "Content Citation"],
      category: "advanced",
      bgGradient: "from-purple-600 to-indigo-700",
      image: "🤖"
    },
    {
      id: 2,
      title: "Technical SEO",
      description: "I ensure search engines can crawl, index, and render your site flawlessly. This includes everything from site-wide audits and Core Web Vitals optimization to schema markup implementation and crawl budget management to improve crawlability and indexing.",
      skills: ["Core Web Vitals", "Schema Markup", "Site Architecture", "Crawl Budget Management"],
      category: "core",
      bgGradient: "from-blue-600 to-cyan-700",
      image: "⚙️"
    },
    {
      id: 3,
      title: "Semantic SEO",
      description: "I focus on understanding search intent and entity-based optimization. By building out knowledge graphs and leveraging topic modeling, I help search engines understand the contextual relevance of your content, leading to better rankings for a wider range of queries.",
      skills: ["Knowledge Graphs", "Entity Optimization", "Topic Modeling", "Contextual Relevance"],
      category: "advanced",
      bgGradient: "from-green-600 to-emerald-700",
      image: "🧠"
    },
    {
      id: 4,
      title: "Keyword Research",
      description: "I move beyond simple search volume to conduct strategic keyword analysis and competitive research. This allows me to identify high-intent, persona-aligned keyword clusters that drive maximum organic visibility and conversions.",
      skills: ["High-Intent Keywords", "Competitor Research", "Keyword Clusters", "Search Volume Analysis"],
      category: "core",
      bgGradient: "from-orange-600 to-red-700",
      image: "🔍"
    },
    {
      id: 5,
      title: "Content Strategy",
      description: "My approach is centered on creating SEO-optimized content that satisfies user intent. By developing topic clusters and leveraging the E-E-A-T (Experience, Expertise, Authoritativeness, and Trust) framework, I build content ecosystems that search engines and users trust.",
      skills: ["Topic Clusters", "E-E-A-T Framework", "User Intent", "Content Ecosystems"],
      category: "core",
      bgGradient: "from-pink-600 to-rose-700",
      image: "📝"
    },
    {
      id: 6,
      title: "Analytics & Reporting",
      description: "I translate data into actionable insights through comprehensive SEO performance tracking. Using tools like Google Analytics, Search Console, and Looker Studio, I monitor key metrics to demonstrate ROI and inform strategy.",
      skills: ["Google Analytics", "Search Console", "Looker Studio", "ROI Tracking"],
      category: "core",
      bgGradient: "from-teal-600 to-cyan-700",
      image: "📊"
    },
    {
      id: 7,
      title: "Local SEO",
      description: "I enhance local search visibility through targeted business optimization. This includes managing Google My Business profiles, building local citations, and implementing review management strategies to dominate local keywords.",
      skills: ["Google My Business", "Local Citations", "Review Management", "Local Dominance"],
      category: "advanced",
      bgGradient: "from-violet-600 to-purple-700",
      image: "📍"
    },
    {
      id: 8,
      title: "E-commerce SEO",
      description: "I specialize in product optimization, category structuring, and conversion-focused SEO for online stores. From implementing product schema to conducting technical audits and optimizing category navigation, I drive qualified traffic that converts.",
      skills: ["Product Schema", "Category Navigation", "Technical Audits", "Conversion Optimization"],
      category: "advanced",
      bgGradient: "from-amber-600 to-orange-700",
      image: "🛒"
    }
  ];

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-background to-muted/10">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            <span className="text-foreground">What I Bring to the</span>{" "}
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Table</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A comprehensive SEO skills framework designed to deliver organic growth and measurable results.
          </p>
        </header>
        

        {/* SEO Skills Framework Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="bg-card/80 backdrop-blur-md border-2 border-border/50 dark:border-white/20 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 max-w-sm md:max-w-md mx-auto">
            <h3 className="text-xl md:text-3xl font-bold text-foreground">SEO Skills Framework</h3>
          </div>
        </div>

        {/* Curved Arrow Connections */}
        <div className="relative mb-4 md:mb-6">
          <svg className="w-full h-24 md:h-32" viewBox="0 0 800 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Main stem down from SEO Skills Framework */}
            <path 
              d="M400 10 L400 40" 
              stroke="url(#gradient1)" 
              strokeWidth="2" 
              className="animate-pulse"
            />
            
            {/* Curved paths to Core and Advanced Skills - precisely positioned */}
            <path 
              d="M400 40 Q400 55 200 70 L200 110" 
              stroke="url(#gradient2)" 
              strokeWidth="2" 
              className="hover:stroke-[3] transition-all duration-300"
            />
            <path 
              d="M400 40 Q400 55 600 70 L600 110" 
              stroke="url(#gradient3)" 
              strokeWidth="2" 
              className="hover:stroke-[3] transition-all duration-300"
            />
            
            {/* Arrow heads pointing to skill category boxes */}
            <polygon points="196,106 200,114 204,106" fill="url(#gradient2)" className="animate-bounce" />
            <polygon points="596,106 600,114 604,106" fill="url(#gradient3)" className="animate-bounce" />
            
            {/* Gradient definitions */}
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(147, 51, 234)" stopOpacity="0.9" />
                <stop offset="50%" stopColor="rgb(168, 85, 247)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="rgb(196, 181, 253)" stopOpacity="0.7" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(147, 51, 234)" stopOpacity="0.9" />
                <stop offset="50%" stopColor="rgb(168, 85, 247)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0.7" />
              </linearGradient>
              <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(147, 51, 234)" stopOpacity="0.9" />
                <stop offset="50%" stopColor="rgb(168, 85, 247)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.7" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Core and Advanced Skills Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 mb-8 md:mb-12">
          
          {/* Core Skills Section */}
          <section className="space-y-6 md:space-y-8">
            <header className="text-center">
              <div className="bg-card/80 backdrop-blur-md border-2 border-border/50 dark:border-white/20 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300">
                <h3 className="text-lg md:text-2xl font-bold text-foreground">Core Skills</h3>
              </div>
              {/* Interactive Arrow to Core Skills */}
              <div className="hidden md:flex justify-center my-4">
                <div className="relative group">
                  <div className="w-px h-8 bg-gradient-to-b from-green-500/60 to-emerald-500/60 group-hover:from-green-500 group-hover:to-emerald-500 transition-all duration-500"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-green-500/60 group-hover:text-green-500 transition-all duration-500 hover:scale-110">
                    <svg className="w-3 h-3 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </header>
            
            {/* Core Skills Cards */}
            <div className="space-y-4 md:space-y-6">
              {expertiseAreas.filter(area => area.category === "core").map((area, index) => (
                <article 
                  key={area.id} 
                  className="group cursor-pointer transition-all duration-500 ease-out hover:scale-105 md:hover:scale-110 hover:-translate-y-2 md:hover:-translate-y-6 animate-fade-in"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'both'
                  }}
                  onMouseEnter={() => setHoveredCard(area.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="relative bg-card/80 backdrop-blur-md border-2 border-border/40 dark:border-white/20 rounded-xl md:rounded-2xl p-4 md:p-8 shadow-lg hover:shadow-2xl hover:shadow-green-500/20 dark:hover:shadow-green-500/30 hover:border-green-500/60 dark:hover:border-green-500/50 hover:bg-card/90 dark:hover:bg-card/60 hover:backdrop-blur-lg transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] before:absolute before:inset-0 before:rounded-xl md:before:rounded-2xl before:bg-gradient-to-r before:from-green-500/5 before:to-emerald-500/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 min-h-[160px] md:min-h-[200px]">
                    <div className="mb-3 md:mb-4 relative z-10">
                      <h4 className="text-lg md:text-xl font-bold text-foreground mb-2">
                        {area.title}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 relative z-10">
                      {area.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="text-xs px-2 py-1 bg-primary/20 dark:bg-primary/30 text-primary dark:text-primary-foreground border border-primary/30 dark:border-primary/50 rounded-full font-medium dark:shadow-lg dark:shadow-primary/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Advanced Skills Section */}
          <section className="space-y-6 md:space-y-8">
            <header className="text-center">
              <div className="bg-card/80 backdrop-blur-md border-2 border-border/50 dark:border-white/20 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
                <h3 className="text-lg md:text-2xl font-bold text-foreground">Advanced Skills</h3>
              </div>
              {/* Interactive Arrow to Advanced Skills */}
              <div className="hidden md:flex justify-center my-4">
                <div className="relative group">
                  <div className="w-px h-8 bg-gradient-to-b from-blue-500/60 to-cyan-500/60 group-hover:from-blue-500 group-hover:to-cyan-500 transition-all duration-500"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-blue-500/60 group-hover:text-blue-500 transition-all duration-500 hover:scale-110">
                    <svg className="w-3 h-3 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </header>
            
            {/* Advanced Skills Cards */}
            <div className="space-y-4 md:space-y-6">
              {expertiseAreas.filter(area => area.category === "advanced").map((area, index) => (
                <article 
                  key={area.id} 
                  className="group cursor-pointer transition-all duration-500 ease-out hover:scale-105 md:hover:scale-110 hover:-translate-y-2 md:hover:-translate-y-6 animate-fade-in"
                  style={{
                    animationDelay: `${(index + 4) * 0.1}s`,
                    animationFillMode: 'both'
                  }}
                  onMouseEnter={() => setHoveredCard(area.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="relative bg-card/80 backdrop-blur-md border-2 border-border/40 dark:border-white/20 rounded-xl md:rounded-2xl p-4 md:p-8 shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/30 hover:border-blue-500/60 dark:hover:border-blue-500/50 hover:bg-card/90 dark:hover:bg-card/60 hover:backdrop-blur-lg transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] before:absolute before:inset-0 before:rounded-xl md:before:rounded-2xl before:bg-gradient-to-r before:from-blue-500/5 before:to-cyan-500/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 min-h-[160px] md:min-h-[200px]">
                    <div className="mb-3 md:mb-4 relative z-10">
                      <h4 className="text-lg md:text-xl font-bold text-foreground mb-2">
                        {area.title}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 relative z-10">
                      {area.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="text-xs px-2 py-1 bg-primary/20 dark:bg-primary/30 text-primary dark:text-primary-foreground border border-primary/30 dark:border-primary/50 rounded-full font-medium dark:shadow-lg dark:shadow-primary/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        {/* Interactive Connecting Arrows to Bottom Section */}
        <div className="hidden md:flex justify-center mb-6">
          <div className="relative group">
            <div className="w-px h-12 bg-gradient-to-b from-purple-500/70 to-purple-400/50 group-hover:from-purple-500 group-hover:to-purple-400 transition-all duration-500"></div>
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-80 h-px bg-gradient-to-r from-transparent via-purple-500/70 via-purple-400/70 to-transparent group-hover:via-purple-500 group-hover:via-purple-400 transition-all duration-500"></div>
            <div className="absolute top-6 -left-40 w-px h-6 bg-gradient-to-b from-purple-500/70 to-transparent group-hover:from-purple-500 transition-all duration-500"></div>
            <div className="absolute top-6 left-40 w-px h-6 bg-gradient-to-b from-purple-500/70 to-transparent group-hover:from-purple-500 transition-all duration-500"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-purple-500/70 group-hover:text-purple-500 transition-all duration-500 hover:scale-110">
              <svg className="w-3 h-3 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Integrated SEO Strategy Section */}
        <footer className="text-center mt-8 md:mt-0">
          <div className="bg-card/80 backdrop-blur-md border-2 border-border/50 dark:border-white/20 rounded-xl md:rounded-2xl p-4 md:p-8 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 max-w-xl md:max-w-2xl mx-auto">
            <h3 className="text-lg md:text-2xl font-bold text-foreground mb-3 md:mb-4">Integrated SEO Strategy</h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Coherent search marketing approach combining core and advanced SEO tactics for comprehensive organic growth and sustainable results.
            </p>
          </div>
        </footer>

        {/* Legend */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 mt-8 md:mt-12">
          <div className="flex items-center gap-3 px-4 py-2 bg-card/80 backdrop-blur-md border-2 border-border/50 dark:border-white/20 rounded-full shadow-lg hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm text-muted-foreground">Core Skills</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-card/80 backdrop-blur-md border-2 border-border/50 dark:border-white/20 rounded-full shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-sm text-muted-foreground">Advanced Skills</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;
