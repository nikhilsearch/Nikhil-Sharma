import { useEffect, useState } from "react";
import hubspotLogo from "@/assets/hubspot-logo.png";
import seotestingLogo from "@/assets/seotesting-logo.png";
import embedsocialLogo from "@/assets/embedsocial-logo.png";
import amaPhoenixLogo from "@/assets/ama-phoenix-logo.png";

const featuredData = [
  {
    name: "HubSpot",
    logo: hubspotLogo,
    url: "https://blog.hubspot.com/sales/ai-business-integration",
    description: "AI Business Integration"
  },
  {
    name: "SEO Testing",
    logo: seotestingLogo,
    url: "https://seotesting.com/blog/technical-seo-for-ecommerce/",
    description: "Technical SEO for eCommerce"
  },
  {
    name: "EmbedSocial",
    logo: embedsocialLogo,
    url: "https://embedsocial.com/blog/increase-google-business-profile-traffic/",
    description: "Google Business Profile Traffic"
  },
  {
    name: "AMA Phoenix",
    logo: amaPhoenixLogo,
    url: "https://amaphoenix.org/2024/01/25/how-to-approach-competitor-analysis-to-inform-your-marketing-strategy/",
    description: "Competitor Analysis Strategy"
  },
];

const FeaturedOn = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-r from-background to-muted/20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            As Featured On
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted insights and expertise recognized by leading industry publications
          </p>
        </div>

        {/* Floating Animation Container */}
        <div className="relative h-40 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {featuredData.map((item, index) => {
              const isActive = index === currentIndex;
              const isPrev = index === (currentIndex - 1 + featuredData.length) % featuredData.length;
              const isNext = index === (currentIndex + 1) % featuredData.length;
              
              let translateX = '100%';
              let opacity = 0;
              let scale = 0.8;
              
              if (isActive) {
                translateX = '0%';
                opacity = 1;
                scale = 1;
              } else if (isPrev) {
                translateX = '-100%';
                opacity = 0.6;
                scale = 0.8;
              } else if (isNext) {
                translateX = '100%';
                opacity = 0.6;
                scale = 0.8;
              }

              return (
                <div
                  key={item.name}
                  className="absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out"
                  style={{
                    transform: `translateX(${translateX}) scale(${scale})`,
                    opacity,
                  }}
                >
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-4 p-8 bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    <div className="w-32 h-32 flex items-center justify-center p-4 bg-background rounded-xl border border-border group-hover:border-primary/50 transition-all duration-300">
                      <img
                        src={item.logo}
                        alt={`${item.name} logo`}
                        className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {featuredData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary shadow-lg scale-125'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Horizontal Walking Animation */}
        <div className="mt-16 relative overflow-hidden">
          <div className="flex animate-[scroll_30s_linear_infinite] whitespace-nowrap">
            {[...featuredData, ...featuredData, ...featuredData].map((item, index) => (
              <a
                key={`${item.name}-${index}`}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 mx-8 p-4 bg-card/50 rounded-xl border border-border/30 hover:border-primary/50 transition-all duration-300 hover:scale-110 group"
              >
                <img
                  src={item.logo}
                  alt={`${item.name} logo`}
                  className="w-12 h-12 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
                <span className="text-foreground font-medium group-hover:text-primary transition-colors">
                  {item.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedOn;