import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechFlow Solutions",
      quote: "Nikhil transformed our organic traffic by 300% in just 6 months. His technical SEO expertise and strategic approach to content optimization are exceptional. Highly recommend for any business serious about SEO growth.",
      metric: "+300% Organic Traffic",
      avatar: "👩‍💼"
    },
    {
      name: "Michael Chen",
      role: "CEO",
      company: "Digital Dynamics",
      quote: "Working with Nikhil was a game-changer for our online presence. His comprehensive SEO audit revealed critical issues we didn't know existed. Within 4 months, we saw a 250% increase in qualified leads.",
      metric: "+250% Qualified Leads",
      avatar: "👨‍💼"
    },
    {
      name: "Amanda Rodriguez",
      role: "E-commerce Manager",
      company: "StyleHub Fashion",
      quote: "Nikhil's local SEO strategies helped us dominate our local market. Our Google My Business optimization and local citation work resulted in a 400% increase in store visits and phone calls.",
      metric: "+400% Store Visits",
      avatar: "👩‍💻"
    },
    {
      name: "David Thompson",
      role: "Founder",
      company: "GreenTech Innovations",
      quote: "The keyword research and content strategy Nikhil developed for us was spot-on. We now rank on the first page for 15+ high-value keywords in our industry. ROI has been incredible.",
      metric: "15+ Top Rankings",
      avatar: "👨‍🔬"
    },
    {
      name: "Lisa Park",
      role: "Digital Marketing Lead",
      company: "HealthFirst Clinic",
      quote: "Nikhil's technical SEO skills are outstanding. He fixed critical site speed issues and improved our Core Web Vitals scores significantly. Our search rankings improved across the board.",
      metric: "Core Web Vitals Optimized",
      avatar: "👩‍⚕️"
    },
    {
      name: "Robert Wilson",
      role: "Operations Manager",
      company: "BuildRight Construction",
      quote: "Professional, knowledgeable, and results-driven. Nikhil's link building campaign and content strategy helped us establish authority in our competitive market. Excellent communication throughout.",
      metric: "+180% Domain Authority",
      avatar: "👨‍🏭"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-foreground">What Clients Say About</span>{" "}
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">My Work</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real feedback from professionals I've worked with on various SEO projects and campaigns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div>
                    <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm text-primary">{testimonial.company}</p>
                  </div>
                </div>
                
                <blockquote className="text-muted-foreground italic mb-4 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                <Badge 
                  variant="secondary" 
                  className="bg-primary/10 text-primary border-primary/20"
                >
                  📊 {testimonial.metric}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-foreground">Ready to Join These Success Stories?</h3>
            <p className="text-muted-foreground">
              Let's discuss how I can help your business achieve similar results with proven SEO strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <a 
                href="https://linkedin.com/in/nikhil-sharma-seo" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-purple-400 text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
              >
                Connect on LinkedIn
              </a>
              <a 
                href="mailto:nikhil.sharma@email.com" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                📧 nikhil.sharma@email.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;