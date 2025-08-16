import hubspotLogo from "@/assets/hubspot-logo.png";
import seotestingLogo from "@/assets/seotesting-logo.png";
import embedsocialLogo from "@/assets/embedsocial-logo.png";
import amaPhoenixLogo from "@/assets/ama-phoenix-logo.png";

const featuredData = [
  {
    name: "HubSpot",
    logo: hubspotLogo,
    url: "https://blog.hubspot.com/sales/ai-business-integration",
  },
  {
    name: "SEO Testing",
    logo: seotestingLogo,
    url: "https://seotesting.com/blog/technical-seo-for-ecommerce/",
  },
  {
    name: "EmbedSocial",
    logo: embedsocialLogo,
    url: "https://embedsocial.com/blog/increase-google-business-profile-traffic/",
  },
  {
    name: "AMA Phoenix",
    logo: amaPhoenixLogo,
    url: "https://amaphoenix.org/2024/01/25/how-to-approach-competitor-analysis-to-inform-your-marketing-strategy/",
  },
];

const FeaturedOn = () => {
  return (
    <section className="py-12 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            As Featured On
          </h2>
        </div>

        {/* Horizontal Scrolling Logos */}
        <div className="relative overflow-hidden">
          <div className="flex animate-[scroll_30s_linear_infinite] whitespace-nowrap">
            {[...featuredData, ...featuredData, ...featuredData].map((item, index) => (
              <a
                key={`${item.name}-${index}`}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center mx-8 p-6 min-w-[200px] h-20 bg-background/80 rounded-lg border border-border/30 hover:border-primary/50 transition-all duration-300 hover:scale-105 group"
              >
                <img
                  src={item.logo}
                  alt={`${item.name} logo`}
                  className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedOn;