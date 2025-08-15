import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Eye } from "lucide-react";

// Eye component with blinking animation
const BlinkingEye = () => {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 2000 + Math.random() * 3000); // Random blink between 2-5 seconds

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className="relative w-16 h-16 mx-auto mb-6">
      <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-300 rounded-full flex items-center justify-center border-2 border-gray-400 shadow-lg">
        <div className={`w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center transition-all duration-150 ${isBlinking ? 'scale-y-0' : 'scale-y-100'}`}>
          <div className="w-2 h-2 bg-black rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "Maurice C. Nootenboom",
      role: "Founder | Managing Director",
      company: "",
      text: "Dinidu is a collaborative problem-solver who thrives in interdisciplinary settings. Their strong communication skills enable them to effectively partner with engineers, developers, and stakeholders to bridge communication gaps and build consensus.",
    },
    {
      name: "Jose Fernandez Castaño",
      role: "Co-Founder & COO at Velaris",
      company: "",
      text: "Highly recommend Dinidu. I've worked with him on several graphic design projects and he always delivered on time with great quality",
    },
    {
      name: "Malith Hatanachchige",
      role: "Founder and Ex CEO of Revox",
      company: "",
      text: "I highly recommend Dinidu for any UX Design role. As his former employer, I was consistently impressed by his exceptional design skills, work ethic, and professional demeanor. And his positive attitude and high level of emotional intelligence make him an excellent collaborator and team player.",
    },
    {
      name: "Dilima Janadith",
      role: "Lecturer | Researcher",
      company: "",
      text: "Dinidu is an exceptionally well-rounded designer, with a capacity that extends far beyond traditional UX/UI roles. His ability to empathize with users throughout the design process allows him to create thoughtful and impactful designs.",
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/20" id="recommendations">
      <div className="max-w-7xl mx-auto">
        {/* SEO Optimized Header */}
        <header className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              Recommendations
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Trusted by industry leaders and professionals who have experienced exceptional results working with our SEO expertise.
          </p>
        </header>

        {/* Grid Layout for Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <article 
              key={index} 
              className="group"
              itemScope 
              itemType="https://schema.org/Review"
            >
              <Card className="h-full bg-card/50 backdrop-blur-sm border border-muted/20 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 transform hover:-translate-y-1">
                <CardContent className="p-8 h-full flex flex-col">
                  {/* Blinking Eye Icon */}
                  <BlinkingEye />
                  
                  {/* Testimonial Content */}
                  <blockquote 
                    className="text-muted-foreground leading-relaxed mb-8 flex-grow text-center italic"
                    itemProp="reviewBody"
                  >
                    "{testimonial.text}"
                  </blockquote>

                  {/* Author Information */}
                  <div 
                    className="text-center border-t border-muted/20 pt-6"
                    itemScope 
                    itemType="https://schema.org/Person"
                  >
                    <h3 
                      className="font-bold text-foreground text-lg mb-1"
                      itemProp="name"
                    >
                      {testimonial.name}
                    </h3>
                    <p 
                      className="text-sm text-muted-foreground mb-1"
                      itemProp="jobTitle"
                    >
                      {testimonial.role}
                    </p>
                    {testimonial.company && (
                      <p 
                        className="text-sm text-primary font-medium"
                        itemProp="worksFor"
                      >
                        {testimonial.company}
                      </p>
                    )}
                  </div>

                  {/* Hidden schema.org data for SEO */}
                  <div className="hidden">
                    <span itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                      <span itemProp="ratingValue">5</span>
                      <span itemProp="bestRating">5</span>
                    </span>
                    <span itemProp="author" itemScope itemType="https://schema.org/Person">
                      <span itemProp="name">{testimonial.name}</span>
                    </span>
                  </div>
                </CardContent>
              </Card>
            </article>
          ))}
        </div>

        {/* Call-to-Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to join our satisfied clients and transform your SEO results?
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get Your Free SEO Audit
            <Eye className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;