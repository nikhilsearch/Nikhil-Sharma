import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

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
      name: "Vishnu Sudevan",
      role: "SEO Business Manager",
      company: "Publicis Global Delivery",
      text: "I have worked with Nikhil on a couple of projects on SEO. What amazed me about him was his expertise in technical SEO and moreover his enthusiasm to learn, experiment and get quality results. He is someone who will always get into the depth of any issue and find out the best possible solution for them. I would recommend his technical SEO skills to anyone who is looking out.",
    },
    {
      name: "Mariya Pathanwala",
      role: "Senior Manager - Client Servicing",
      company: "IProspect",
      text: "Nikhil is proactive & dedicated team member. He has good knowledge of SEO and being a great team player, he would push himself and the team to do better work. I recommend Nikhil as he would be a great addition to any company he joins.",
    },
    {
      name: "Richa Sharma",
      role: "Senior Marketing Manager",
      company: "People10 Technologies Inc",
      text: "Nikhil is a giver! When I first interacted with him, the domain score of their website was 9, a month later it shot up to 20, and that's where Nikhil spells his magic. He is a marketing genius with a deep understanding of organic growth. I've got to learn a lot from him, and I am still learning! All the best for his future endeavors!",
    },
    {
      name: "Divyani Paliwal",
      role: "Sr. Customer Success Manager",
      company: "Volopay",
      text: "He is very dedicated towards his work and a go getter! I have worked with him for a brief period but I strongly appreciate his technical skills and commitment towards SEO.",
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

      </div>
    </section>
  );
};

export default Testimonials;