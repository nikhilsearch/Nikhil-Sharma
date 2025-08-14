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
      name: "Richa Sharma",
      role: "B2B Marketing | Marketing Generalist",
      company: "Marketing in IT Services",
      text: "Nikhil is a giver! When I first interacted with him, the domain score of their website was 9, a month later it shot up to 20, and that's where Nikhil spells his magic. He is a marketing genius with a deep understanding of organic growth. I've got to learn a lot from him, and I am still learning!",
      project: "Domain Authority Growth",
      avatar: "/lovable-uploads/243fc16e-6c8f-4872-9e59-8c64180633cc.png"
    },
    {
      name: "Nikita Jain",
      role: "Freelance Digital Marketing Consultant",
      company: "Social Media & Content Marketing",
      text: "Working with Nikhil I've always seen him pick up different skill sets and adapt them quickly as per project requirements. He is eager to learn new things and experiment for exponential growth in technical SEO, which is commendable. Being a team player with the ability of bringing researched ideas on the table, makes him stand out in the crowd.",
      project: "Technical SEO Innovation",
      avatar: "/lovable-uploads/8dccb528-d5d2-4c33-8f80-15dc3c51f949.png"
    },
    {
      name: "Vishnu Sudevan",
      role: "SEO Consultant",
      company: "Publicis Global Delivery",
      text: "I have worked with Nikhil on a couple of projects on SEO. What amazed me about him was his expertise in technical SEO and moreover his enthusiasm to learn, experiment and get quality results. He is someone who will always get into the depth of any issue and find out the best possible solution for them.",
      project: "Technical SEO Projects",
      avatar: "/lovable-uploads/d75e7506-1bc0-4051-a8eb-c516219917ec.png"
    },
    {
      name: "Divyani Paliwal",
      role: "Sr. Customer Success",
      company: "Volopay",
      text: "Nikhil is a dedicated and proactive SEO expert. He always brings something to the table. He is very dedicated towards his work and a go getter! I have worked with him for a brief period but I strongly appreciate his technical skills and commitment towards SEO.",
      project: "SEO Strategy & Execution",
      avatar: "/lovable-uploads/d36fecdb-f8ef-4a23-aacd-99b355b4b622.png"
    },
    {
      name: "Mariya Pathanwala",
      role: "Account Management | Brand Solutions",
      company: "Ex-Dentsu",
      text: "Nikhil is proactive & dedicated team member. He has good knowledge of SEO and being a great team player, he would push himself and the team to do better work. I recommend Nikhil as he would be a great addition to any company he joins.",
      project: "Team Leadership & SEO",
      avatar: "/lovable-uploads/d2660981-df09-44a7-a121-b45a0e93a84b.png"
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