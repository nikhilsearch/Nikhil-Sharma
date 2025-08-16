import { useEffect, useState, useRef } from "react";

const featuredData = [
  {
    name: "HubSpot",
    logo: "/lovable-uploads/ce220e1a-ebc4-44ea-ad0a-b9b052690dad.png",
    url: "https://blog.hubspot.com/sales/ai-business-integration",
    description: "AI Business Integration",
    stats: "2.5M+ readers",
    impact: "300% traffic boost"
  },
  {
    name: "SEO Testing",
    logo: "/lovable-uploads/dd6ffc15-a466-42d6-806a-b1e09afa7961.png",
    url: "https://seotesting.com/blog/technical-seo-for-ecommerce/",
    description: "Technical SEO for eCommerce",
    stats: "500K+ views",
    impact: "Advanced SEO insights"
  },
  {
    name: "EmbedSocial",
    logo: "/lovable-uploads/d51feb89-7e27-4c22-a309-218e50771efd.png",
    url: "https://embedsocial.com/blog/increase-google-business-profile-traffic/",
    description: "Google Business Profile Traffic",
    stats: "1M+ impressions",
    impact: "Local SEO mastery"
  },
  {
    name: "AMA Phoenix",
    logo: "/lovable-uploads/249694a1-7a4b-4d70-a02b-45a8b2f46a3d.png",
    url: "https://amaphoenix.org/2024/01/25/how-to-approach-competitor-analysis-to-inform-your-marketing-strategy/",
    description: "Competitor Analysis Strategy",
    stats: "750K+ readers",
    impact: "Strategic insights"
  },
];

const FeaturedOn = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prev) => (prev + 1) % featuredData.length);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <section className="py-20 relative overflow-hidden" ref={containerRef}>
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 animate-gradient bg-[length:400%_400%]" />
      <div 
        className="absolute inset-0 opacity-30 transition-all duration-700"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, hsl(var(--primary)) 0%, transparent 50%)`
        }}
      />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block mb-6 animate-float">
            <span className="px-6 py-3 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm text-primary text-sm font-medium rounded-full border border-primary/30 shadow-lg">
              ✨ Trusted by Industry Leaders
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent mb-8 animate-glow-pulse">
            As Featured On
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Trusted insights and expertise recognized by leading industry publications
          </p>
        </div>

        {/* Interactive 3D Feature Cards */}
        <div className="relative mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredData.map((item, index) => (
              <div
                key={item.name}
                className={`group relative p-8 bg-card/20 backdrop-blur-xl rounded-3xl border transition-all duration-700 cursor-pointer animate-fade-in hover:scale-110 hover:-rotate-2 hover:z-20 transform-gpu perspective-1000 ${
                  index === currentIndex 
                    ? 'border-primary/60 shadow-2xl shadow-primary/30 scale-105 bg-card/40' 
                    : 'border-border/30 hover:border-primary/50'
                }`}
                style={{ 
                  animationDelay: `${index * 150}ms`,
                  transform: index === currentIndex ? 'translateY(-10px)' : 'translateY(0)'
                }}
                onMouseEnter={() => {
                  setIsHovered(true);
                  setCurrentIndex(index);
                }}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => window.open(item.url, '_blank')}
              >
                {/* Multi-layered Glow Effects */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/30 to-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl" />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Holographic Border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" />
                
                <div className="relative z-10">
                  {/* Logo Container with 3D Effect */}
                  <div className="w-24 h-24 mx-auto mb-6 p-4 bg-gradient-to-br from-background/90 to-background/60 rounded-2xl border border-border group-hover:border-primary/60 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/20 transform group-hover:scale-110 group-hover:rotate-6">
                    <img
                      src={item.logo}
                      alt={`${item.name} logo`}
                      className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-125 group-hover:drop-shadow-lg"
                    />
                  </div>

                  {/* Company Name with Gradient */}
                  <h3 className="text-xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent group-hover:from-primary group-hover:to-secondary transition-all duration-500 mb-3">
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-500 mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Stats Display */}
                  <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <div className="text-xs text-primary font-medium">
                      📊 {item.stats}
                    </div>
                    <div className="text-xs text-secondary-foreground">
                      🚀 {item.impact}
                    </div>
                  </div>
                </div>

                {/* Animated Corner Accents */}
                <div className="absolute top-3 right-3 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-ping" />
                <div className="absolute bottom-3 left-3 w-2 h-2 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700" />
                
                {/* Magnetic Field Effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-magnetic" />
              </div>
            ))}
          </div>

          {/* Interactive Progress Indicators */}
          <div className="flex justify-center mt-12 space-x-3">
            {featuredData.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-500 cursor-pointer ${
                  index === currentIndex 
                    ? 'bg-primary scale-125 shadow-lg shadow-primary/50' 
                    : 'bg-muted-foreground/30 hover:bg-primary/50'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedOn;