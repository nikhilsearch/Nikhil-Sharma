import { useEffect, useState } from "react";

const featuredData = [
  {
    name: "HubSpot",
    logo: "/lovable-uploads/ce220e1a-ebc4-44ea-ad0a-b9b052690dad.png",
    url: "https://blog.hubspot.com/sales/ai-business-integration",
    description: "AI Business Integration"
  },
  {
    name: "SEO Testing",
    logo: "/lovable-uploads/dd6ffc15-a466-42d6-806a-b1e09afa7961.png",
    url: "https://seotesting.com/blog/technical-seo-for-ecommerce/",
    description: "Technical SEO for eCommerce"
  },
  {
    name: "EmbedSocial",
    logo: "/lovable-uploads/d51feb89-7e27-4c22-a309-218e50771efd.png",
    url: "https://embedsocial.com/blog/increase-google-business-profile-traffic/",
    description: "Google Business Profile Traffic"
  },
  {
    name: "AMA Phoenix",
    logo: "/lovable-uploads/249694a1-7a4b-4d70-a02b-45a8b2f46a3d.png",
    url: "https://amaphoenix.org/2024/01/25/how-to-approach-competitor-analysis-to-inform-your-marketing-strategy/",
    description: "Competitor Analysis Strategy"
  },
];

const FeaturedOn = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prev) => (prev + 1) % featuredData.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section 
      className="py-20 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Particle Background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      
      {/* Morphing Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 animate-gradient bg-[length:400%_400%]" />
      <div 
        className="absolute inset-0 opacity-30 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, var(--primary) 0%, transparent 40%)`,
          opacity: isVisible ? 0.15 : 0,
        }}
      />
      
      {/* Geometric Patterns */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20">
              ✨ Trusted by Industry Leaders
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent mb-6">
            As Featured On
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Trusted insights and expertise recognized by leading industry publications
          </p>
        </div>

        {/* 3D Interactive Feature Cards */}
        <div className="relative mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredData.map((item, index) => (
              <div
                key={item.name}
                className={`group relative p-6 bg-card/80 backdrop-blur-xl rounded-2xl border transition-all duration-700 cursor-pointer animate-fade-in overflow-hidden ${
                  index === currentIndex 
                    ? 'border-primary/60 shadow-2xl shadow-primary/30 scale-105' 
                    : 'border-border/50 hover:border-primary/40 hover:scale-[1.02]'
                }`}
                style={{ 
                  animationDelay: `${index * 150}ms`,
                  transform: `perspective(1000px) rotateX(${index === currentIndex ? '5deg' : '0deg'}) rotateY(${index === currentIndex ? '2deg' : '0deg'})`,
                  transformStyle: 'preserve-3d',
                }}
                onMouseEnter={() => {
                  setIsHovered(true);
                  setCurrentIndex(index);
                }}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => window.open(item.url, '_blank')}
              >
                {/* Multi-layered Glow Effects */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/30 to-secondary/30 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl animate-pulse" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                {/* Floating Particles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-primary/60 rounded-full animate-ping"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: '3s',
                      }}
                    />
                  ))}
                </div>
                
                <div className="relative z-10 transform group-hover:translateZ-[20px] transition-transform duration-500">
                  <div className="w-20 h-20 mx-auto mb-4 p-3 bg-background/90 backdrop-blur-sm rounded-xl border border-border group-hover:border-primary/60 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/20 group-hover:scale-110 group-hover:rotate-3">
                    <img
                      src={item.logo}
                      alt={`${item.name} logo`}
                      className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-125 group-hover:drop-shadow-lg"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-all duration-500 mb-2 group-hover:scale-105">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-all duration-500 group-hover:scale-102">
                    {item.description}
                  </p>
                </div>

                {/* Animated Corner Accents */}
                <div className="absolute top-2 right-2 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-bounce" />
                <div className="absolute bottom-2 left-2 w-2 h-2 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse" />
                
                {/* Holographic Border Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-primary/20 via-purple-500/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient bg-[length:400%_400%]" style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'xor', WebkitMaskComposite: 'xor' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedOn;