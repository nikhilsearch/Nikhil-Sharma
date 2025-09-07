import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building, TrendingUp, Users, Award } from "lucide-react";

const Experience = () => {
  const [activeExperience, setActiveExperience] = useState(0);

  const experiences = [
    {
      company: "Wavel AI",
      location: "Singapore (Remote)",
      position: "SEO Team Lead",
      duration: "11/2022 - 08/2025",
      type: "Full-time",
      description: "Led a team of 5 SEO specialists to establish organic search as the primary acquisition channel across US, APAC, and European markets for AI-powered SaaS platform.",
      achievements: [
        "Increased blog traffic by 120% by developing a full-funnel content strategy centered on high-intent, persona-aligned keyword clusters",
        "Boosted technical SEO performance with 35% lift in Good URLs, 25% improvement in indexation, and 20% higher CTRs through site speed optimization and schema implementation",
        "Enhanced organic acquisition by implementing hreflang and multi-domain SEO strategies across US, APAC, and European markets",
        "Accelerated content velocity by 3x using AI-driven automation tools (ChatGPT, Gemini, Claude) for keyword clustering and programmatic SEO",
        "Led team of 5 SEO/content specialists while collaborating with SEM, Product, and Content teams to align growth priorities",
        "Standardized SEO operations by creating SOPs and training playbooks, improving team efficiency by 40%",
        "Achieved 'Product of the Day' on Product Hunt twice through strategic community engagement and product launch optimization",
        "Increased referral traffic by 160% through targeted Reddit community engagement and organic brand building",
        "Reduced customer acquisition cost (CAC) by optimizing demo signups and free trial activation through product-led content",
        "Maximized SERP share by partnering with Paid Search teams to create unified messaging and budget allocation strategies"
      ],
      skills: ["Team Leadership", "Global SEO Strategy", "Technical SEO", "AI-Driven Automation", "Content Strategy", "International SEO"]
    },
    {
      company: "Obbserv",
      location: "India",
      position: "Technical SEO Specialist",
      duration: "03/2021 - 10/2022",
      type: "Full-time",
      description: "Delivered technical SEO solutions for JavaScript-heavy platforms and large-scale websites, mentoring SEO professionals while maintaining 95% client retention rate.",
      achievements: [
        "Improved crawl efficiency by 30% through technical SEO fixes including canonicalization, metadata optimization, and internal linking structure",
        "Reduced page load time (LCP) by 40% using advanced Core Web Vitals optimization, lazy loading, and script deferrals",
        "Resolved server-side rendering issues across 1 million pages on JavaScript-heavy EdTech platform, improving indexation coverage",
        "Enhanced SERP visibility by implementing JSON-LD schema markup across dynamic pages, boosting CTR by 20%",
        "Achieved full mobile-friendly compliance across all website templates, reducing bounce rate and improving engagement metrics",
        "Streamlined XML sitemap structure for deep URL hierarchies, improving product and blog page discovery",
        "Built SEO automation tools (Crawl+, Bulk Indexing Checker, Voice+) and Looker Studio dashboard for real-time reporting",
        "Maintained 95% client retention rate by delivering personalized SEO growth strategies for global clients",
        "Mentored SEO professionals and improved team output by 25% through knowledge sharing and best practices",
        "Recognized with High Flyer Award (2021) and Mr. Initiator (2022) for technical innovation and automation"
      ],
      skills: ["Technical SEO", "JavaScript SEO", "Schema Markup", "Site Speed Optimization", "SEO Tools Development", "Team Mentoring"]
    },
    {
      company: "Elite Info. Tech",
      location: "India",
      position: "SEO Executive",
      duration: "04/2018 - 02/2021",
      type: "Full-time",
      description: "Managed 30+ SEO projects and optimized 100+ websites across multiple platforms, delivering comprehensive SEO strategies for international clients.",
      achievements: [
        "Enhanced website architecture, meta tags, and internal linking structure to boost search engine visibility and user experience",
        "Conducted in-depth keyword research aligned with user intent, leading to significant organic traffic growth",
        "Performed technical site audits to resolve crawlability and indexation issues, ensuring optimal search engine accessibility",
        "Developed data-driven strategies to monitor and sustain organic web traffic growth through performance metrics analysis",
        "Managed 30+ SEO projects across WordPress, PHP, WIX, and ASP.NET platforms with timely delivery",
        "Optimized 100+ websites using full-spectrum SEO approach, improving keyword rankings and site authority",
        "Executed international SEO strategies for clients across US, Canada, UK, Europe, Australia, and Asia markets"
      ],
      skills: ["On-Page SEO", "Keyword Research", "Technical Audits", "Multi-Platform SEO", "International SEO", "Project Management"]
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-foreground">Professional</span>{" "}
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            7+ years of driving organic growth for global brands with proven track record of leading teams and delivering measurable results.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Timeline Navigation */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <Card
                  key={index}
                  className={`group cursor-pointer transition-all duration-500 hover:shadow-2xl relative overflow-hidden ${
                    activeExperience === index
                      ? "bg-primary/10 border-primary shadow-xl scale-105 shadow-primary/20"
                      : "bg-card/50 backdrop-blur-sm border-border/50 hover:bg-primary/5 hover:border-primary/30 hover:scale-102 hover:shadow-primary/10"
                  }`}
                  onClick={() => setActiveExperience(index)}
                >
                  {/* Simple overlay for hover effect */}
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Simple border highlight */}
                  <div className="absolute inset-0 rounded-lg border-2 border-primary opacity-0 group-hover:opacity-30 transition-all duration-500 pointer-events-none" />
                  
                  <CardContent className="p-4 relative z-10">
                    <div className="flex items-start space-x-3">
                      <div className={`w-3 h-3 rounded-full mt-2 transition-all duration-300 ${
                        activeExperience === index 
                          ? "bg-primary shadow-lg shadow-primary/50" 
                          : "bg-muted-foreground/30 group-hover:bg-primary/70 group-hover:shadow-md group-hover:shadow-primary/30"
                      }`} />
                      <div className="flex-1">
                        <h3 className={`font-semibold transition-all duration-300 ${
                          activeExperience === index 
                            ? "text-primary" 
                            : "text-foreground group-hover:text-primary"
                        }`}>
                          {exp.position}
                        </h3>
                        <p className="text-sm text-primary font-medium group-hover:text-primary transition-colors duration-300">
                          {exp.company}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground mt-1 group-hover:text-foreground/80 transition-colors duration-300">
                          <Calendar className="w-3 h-3 mr-1" />
                          {exp.duration}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Experience Details */}
          <div className="lg:col-span-2">
            <Card className="bg-card/30 backdrop-blur-md border border-white/20 shadow-xl">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl text-foreground mb-2">
                      {experiences[activeExperience].position}
                    </CardTitle>
                    <div className="flex items-center space-x-4 text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Building className="w-4 h-4 mr-2 text-primary" />
                        <span className="font-medium text-primary">{experiences[activeExperience].company}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{experiences[activeExperience].location}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{experiences[activeExperience].duration}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-primary/30 text-primary">
                      {experiences[activeExperience].type}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {experiences[activeExperience].description}
                </p>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                    Key Achievements
                  </h4>
                  <ul className="space-y-3">
                    {experiences[activeExperience].achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <Award className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-primary" />
                    Core Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {experiences[activeExperience].skills.map((skill, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="bg-primary/10 text-primary border-primary/20"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;