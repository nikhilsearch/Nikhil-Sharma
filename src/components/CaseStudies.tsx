import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Clock, Target } from "lucide-react";

const CaseStudies = () => {
  const [activeCase, setActiveCase] = useState(0);

  const caseStudies = [
    {
      title: "EdTech Platform Optimization",
      client: "Doubtnut.com",
      challenge: "Poor search engine crawling and low organic visibility",
      solution: "Technical SEO optimization, crawl budget management, and content structure enhancement",
      results: [
        { metric: "Crawling Efficiency", increase: "+70%" },
        { metric: "Organic Traffic", increase: "+80%" },
        { metric: "Keyword Rankings", increase: "+120%" }
      ],
      timeline: "4 months",
      industry: "EdTech",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "E-commerce SEO Success",
      client: "Novoshoes.co.nz",
      challenge: "Limited online visibility in competitive footwear market",
      solution: "Comprehensive SEO strategy with technical optimization and content marketing",
      results: [
        { metric: "Organic Traffic", increase: "+150%" },
        { metric: "Keywords Ranking", increase: "+130%" },
        { metric: "Conversion Rate", increase: "+35%" }
      ],
      timeline: "6 months",
      industry: "E-commerce",
      color: "from-green-500 to-green-600"
    },
    {
      title: "AI Technology Growth",
      client: "Wavel AI",
      challenge: "Breaking through in the competitive AI technology space",
      solution: "Strategic content optimization and technical SEO for AI-focused search queries",
      results: [
        { metric: "Organic Traffic", increase: "+220%" },
        { metric: "Keywords Ranking", increase: "+120%" },
        { metric: "Conversion Rate", increase: "+35%" }
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

                  <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-4 hover:bg-card/80 hover:border-primary/40 transition-all duration-300">
                    <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      Results
                    </h4>
                    <div className="space-y-3">
                      {study.results.map((result, resultIndex) => (
                        <div 
                          key={resultIndex} 
                          className="group flex justify-between items-center p-4 bg-muted/30 rounded-lg border border-muted/40 hover:bg-muted/50 hover:border-green-500/40 hover:shadow-md hover:shadow-green-500/10 transition-all duration-300 hover:scale-[1.02]"
                        >
                          <span className="text-foreground font-medium group-hover:text-foreground/90 transition-colors duration-200">
                            {result.metric}
                          </span>
                          <span className="text-green-400 font-bold text-lg px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20 group-hover:bg-green-500/20 group-hover:border-green-500/40 group-hover:text-green-300 group-hover:scale-110 transition-all duration-300">
                            {result.increase}
                          </span>
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