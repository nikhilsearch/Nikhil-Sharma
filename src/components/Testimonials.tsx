import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director", 
      company: "TechFlow Solutions",
      text: "Nikhil transformed our organic traffic by 300% in just 6 months. His technical SEO expertise and strategic approach are exceptional.",
      project: "E-commerce SEO",
      avatar: "/placeholder.svg"
    },
    {
      name: "Michael Chen",
      role: "CEO",
      company: "Digital Dynamics", 
      text: "Working with Nikhil was a game-changer. His comprehensive audit revealed critical issues. Within 4 months, we saw 250% increase in qualified leads.",
      project: "Technical SEO Audit",
      avatar: "/placeholder.svg"
    },
    {
      name: "Amanda Rodriguez",
      role: "E-commerce Manager",
      company: "StyleHub Fashion",
      text: "Nikhil's local SEO strategies helped us dominate our market. 400% increase in store visits and phone calls through GMB optimization.",
      project: "Local SEO Campaign",
      avatar: "/placeholder.svg"
    },
    {
      name: "David Thompson", 
      role: "Founder",
      company: "GreenTech Innovations",
      text: "The keyword research and content strategy was spot-on. We now rank first page for 15+ high-value keywords. ROI has been incredible.",
      project: "Content Strategy",
      avatar: "/placeholder.svg"
    },
    {
      name: "Lisa Park",
      role: "Digital Marketing Lead",
      company: "HealthFirst Clinic", 
      text: "Outstanding technical SEO skills. Fixed critical site speed issues and improved Core Web Vitals significantly. Rankings improved across the board.",
      project: "Technical Optimization",
      avatar: "/placeholder.svg"
    },
    {
      name: "Robert Wilson",
      role: "Operations Manager", 
      company: "BuildRight Construction",
      text: "Professional, knowledgeable, and results-driven. Link building campaign helped establish authority in our competitive market.",
      project: "Link Building Campaign",
      avatar: "/placeholder.svg"
    }
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-muted/5 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-foreground">What</span>{" "}
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Clients Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take my word for it. Here's what my clients have to say about their SEO transformation journey.
          </p>
        </div>

        {/* Interactive Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="w-full flex-shrink-0 bg-card/30 backdrop-blur-md border border-white/20 shadow-xl">
                  <CardContent className="p-8 relative">
                    <Quote className="absolute top-4 left-4 w-8 h-8 text-primary/20" />
                    
                    <div className="text-center mb-6">
                      <p className="text-lg text-muted-foreground leading-relaxed italic">
                        "{testimonial.text}"
                      </p>
                    </div>

                    <div className="flex items-center justify-center space-x-4">
                      <Avatar className="w-16 h-16 border-2 border-primary/20">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                          {testimonial.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-center">
                        <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        <p className="text-sm text-primary font-medium">{testimonial.company}</p>
                      </div>
                    </div>

                    <div className="flex justify-center mt-6">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-center mt-4">
                      <Badge variant="outline" className="border-primary/30 text-primary">
                        {testimonial.project}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-card/80 backdrop-blur-sm border-white/20 hover:bg-primary/20"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-card/80 backdrop-blur-sm border-white/20 hover:bg-primary/20"
            onClick={nextTestimonial}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center mt-8 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`relative h-2 rounded-full transition-all duration-300 ${
                activeTestimonial === index ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-primary/50"
              }`}
              onClick={() => {
                setActiveTestimonial(index);
                setIsAutoPlaying(false);
              }}
            >
              {activeTestimonial === index && (
                <div className="absolute inset-0 bg-primary/50 rounded-full animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;