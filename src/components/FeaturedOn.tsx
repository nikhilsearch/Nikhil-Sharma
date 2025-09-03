import { useEffect, useState } from "react";

const featuredData = [
  {
    name: "HubSpot",
    logo: "/lovable-uploads/ce220e1a-ebc4-44ea-ad0a-b9b052690dad.png",
    url: "https://blog.hubspot.com/sales/ai-business-integration",
    description: "AI Business Integration",
    brandColor: "hsl(13, 95%, 50%)", // HubSpot orange
    shadowColor: "hsl(13, 95%, 50%, 0.4)"
  },
  {
    name: "SEO Testing",
    logo: "/lovable-uploads/dd6ffc15-a466-42d6-806a-b1e09afa7961.png",
    url: "https://seotesting.com/blog/technical-seo-for-ecommerce/",
    description: "Technical SEO for eCommerce",
    brandColor: "hsl(220, 85%, 55%)", // Blue
    shadowColor: "hsl(220, 85%, 55%, 0.4)"
  },
  {
    name: "EmbedSocial",
    logo: "/lovable-uploads/d51feb89-7e27-4c22-a309-218e50771efd.png",
    url: "https://embedsocial.com/blog/increase-google-business-profile-traffic/",
    description: "Google Business Profile Traffic",
    brandColor: "hsl(280, 75%, 60%)", // Purple
    shadowColor: "hsl(280, 75%, 60%, 0.4)"
  },
  {
    name: "AMA Phoenix",
    logo: "/lovable-uploads/249694a1-7a4b-4d70-a02b-45a8b2f46a3d.png",
    url: "https://amaphoenix.org/2024/01/25/how-to-approach-competitor-analysis-to-inform-your-marketing-strategy/",
    description: "Competitor Analysis Strategy",
    brandColor: "hsl(150, 70%, 45%)", // Green
    shadowColor: "hsl(150, 70%, 45%, 0.4)"
  },
];

const FeaturedOn = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prev) => (prev + 1) % featuredData.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 animate-gradient bg-[length:400%_400%]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--primary)_0%,_transparent_50%)] opacity-20" />
      
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

        {/* Interactive Feature Cards */}
        <div className="relative mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredData.map((item, index) => (
              <div
                key={item.name}
                className={`group relative p-6 bg-card/80 backdrop-blur-sm rounded-2xl border transition-all duration-500 hover:scale-110 hover:rotate-2 cursor-pointer animate-fade-in transform-gpu ${
                  index === currentIndex 
                    ? 'border-primary/50 shadow-lg shadow-primary/20' 
                    : 'border-border/50'
                }`}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  '--brand-color': item.brandColor,
                  '--brand-shadow': item.shadowColor
                } as React.CSSProperties & { [key: string]: string }}
                onMouseEnter={() => {
                  setIsHovered(true);
                  setCurrentIndex(index);
                }}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => window.open(item.url, '_blank')}
              >
                {/* Dynamic Brand Glow Effect */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"
                  style={{ backgroundColor: item.shadowColor }}
                />
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-all duration-500"
                  style={{ backgroundColor: item.brandColor }}
                />
                
                <div className="relative z-10">
                  <div 
                    className="w-20 h-20 mx-auto mb-4 p-3 bg-background/80 rounded-xl border border-border transition-all duration-300 group-hover:shadow-xl group-hover:shadow-[var(--brand-shadow)] group-hover:scale-105"
                    style={{ '--brand-shadow': item.shadowColor } as React.CSSProperties & { [key: string]: string }}
                  >
                    <img
                      src={item.logo}
                      alt={`${item.name} logo`}
                      className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                    />
                  </div>
                  <h3 
                    className="text-lg font-semibold text-foreground transition-colors duration-300 mb-2 group-hover:font-bold"
                    style={{ color: `var(--brand-color)` }}
                  >
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 group-hover:font-medium">
                    {item.description}
                  </p>
                </div>

                {/* Enhanced Corner Accent with Brand Color */}
                <div 
                  className="absolute top-2 right-2 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-125 group-hover:animate-pulse"
                  style={{ backgroundColor: item.brandColor }}
                />
                
                {/* Brand Border on Hover */}
                <div 
                  className="absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ borderColor: item.brandColor }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedOn;