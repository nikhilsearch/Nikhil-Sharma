import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Clock, Target } from "lucide-react";

const CaseStudies = () => {
  const [activeCase, setActiveCase] = useState(0);

  const caseStudies = [
    {
      title: "E-commerce Growth Strategy",
      client: "TechRetail Inc.",
      challenge: "Low organic traffic and poor search rankings",
      solution: "Comprehensive technical SEO audit, content optimization, and link building campaign",
      results: [
        { metric: "Organic Traffic", increase: "+285%" },
        { metric: "Keyword Rankings", increase: "+150%" },
        { metric: "Conversion Rate", increase: "+45%" }
      ],
      timeline: "6 months",
      industry: "E-commerce",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Local Business Dominance",
      client: "Metro Services",
      challenge: "Invisible in local search results",
      solution: "Local SEO optimization, Google My Business enhancement, and review management",
      results: [
        { metric: "Local Rankings", increase: "+400%" },
        { metric: "Phone Calls", increase: "+180%" },
        { metric: "Store Visits", increase: "+65%" }
      ],
      timeline: "4 months",
      industry: "Local Services",
      color: "from-green-500 to-green-600"
    },
    {
      title: "AI-Powered Content Strategy",
      client: "StartupTech AI",
      challenge: "Competing in saturated AI market",
      solution: "AI SEO optimization for ChatGPT, Perplexity, and LLM model visibility",
      results: [
        { metric: "AI Search Visibility", increase: "+320%" },
        { metric: "Brand Mentions", increase: "+250%" },
        { metric: "Thought Leadership", increase: "+190%" }
      ],
      timeline: "5 months",
      industry: "AI Technology",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-foreground">Success</span>{" "}
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Stories</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real results from real projects. See how strategic SEO transforms businesses and drives measurable growth.
          </p>
        </div>

        {/* Case Study Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-2 bg-card/30 backdrop-blur-md p-2 rounded-lg border border-white/20">
            {caseStudies.map((study, index) => (
              <Button
                key={index}
                variant={activeCase === index ? "default" : "ghost"}
                className={`transition-all duration-300 ${
                  activeCase === index 
                    ? "bg-primary text-primary-foreground shadow-lg" 
                    : "hover:bg-primary/10"
                }`}
                onClick={() => setActiveCase(index)}
              >
                {study.client}
              </Button>
            ))}
          </div>
        </div>

        {/* Active Case Study */}
        <div className="relative">
          {caseStudies.map((study, index) => (
            <Card
              key={index}
              className={`transition-all duration-500 transform ${
                activeCase === index 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-8 absolute inset-0"
              } bg-card/30 backdrop-blur-md border border-white/20 shadow-xl overflow-hidden`}
            >
              <div className={`h-2 bg-gradient-to-r ${study.color}`} />
              
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <CardTitle className="text-2xl font-bold text-foreground mb-2">
                      {study.title}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <Badge variant="outline" className="border-primary/30">
                        {study.industry}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {study.timeline}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Target className="w-4 h-4 text-primary" />
                        Challenge
                      </h4>
                      <p className="text-muted-foreground">{study.challenge}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-primary" />
                        Solution
                      </h4>
                      <p className="text-muted-foreground">{study.solution}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      Results
                    </h4>
                    <div className="space-y-3">
                      {study.results.map((result, resultIndex) => (
                        <div 
                          key={resultIndex} 
                          className="flex justify-between items-center p-3 bg-primary/5 rounded-lg border border-primary/10 hover:bg-primary/10 transition-colors duration-300"
                        >
                          <span className="text-foreground font-medium">{result.metric}</span>
                          <Badge 
                            variant="secondary" 
                            className="bg-primary/20 text-primary border-primary/30 font-bold"
                          >
                            {result.increase}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {caseStudies.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeCase === index 
                  ? "bg-primary scale-125" 
                  : "bg-muted-foreground/30 hover:bg-primary/50"
              }`}
              onClick={() => setActiveCase(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;