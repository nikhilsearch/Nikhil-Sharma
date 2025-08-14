import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building, TrendingUp, Users, Award } from "lucide-react";

const Experience = () => {
  const [activeExperience, setActiveExperience] = useState(0);

  const experiences = [
    {
      company: "Wavel AI",
      location: "Singapore",
      position: "SEO Lead",
      duration: "Oct 2022 - Present",
      type: "Full-time",
      description: "Dynamic SEO Lead with 7+ years of experience driving organic growth for global brands across competitive industries.",
      achievements: [
        "Led and managed a cross-functional team of 5 members, comprising SEO specialists and content professionals",
        "Designed and executed comprehensive global SEO strategy across US, APAC, and Europe regions",
        "Developed and executed a data-driven SEO roadmap resulting in 120% increase in organic traffic",
        "Directed comprehensive on-page SEO and technical audits, improving Core Web Vitals by 40%",
        "Managed link-building program securing 40+ high-authority backlinks monthly"
      ],
      skills: ["Team Leadership", "Global SEO Strategy", "Technical SEO", "Content Strategy", "Link Building"]
    },
    {
      company: "Obsev",
      location: "Udaipur",
      position: "Tech SEO Specialist",
      duration: "Mar 2021 - Sep 2022",
      type: "Full-time",
      description: "Specialized in technical SEO optimization and site performance improvements for high-traffic websites.",
      achievements: [
        "Optimized canonicalization, internal linking, page structure, and image elements - 30% improvement in crawl efficiency",
        "Enhanced site performance by executing advanced optimization techniques, improving load times by 40%",
        "Expertly configured Robots.txt and XML Sitemaps, improving search engine crawlability by 25%",
        "Implemented comprehensive eCommerce SEO strategies, optimizing 500+ products with Schema markup",
        "Applied product schemas and Knowledge Graph optimization, boosting search engine visibility by 20%"
      ],
      skills: ["Technical SEO", "Site Speed Optimization", "Schema Markup", "eCommerce SEO", "XML Sitemaps"]
    },
    {
      company: "OPositive",
      location: "India",
      position: "SEO Product Lead",
      duration: "Mar 2021 - Sep 2022",
      type: "Contract",
      description: "Led product development for SEO tools and automation solutions.",
      achievements: [
        "Developed Crawl+, a powerful sitemap audit tool capable of crawling 50,000 URLs at 56 URLs/6 seconds",
        "Led creation of Voice+, an AI-driven voice-based site audit tool for voice search optimization",
        "Built Bulk Indexing Checker Tool for fast URL indexing status verification on Google",
        "Launched Studio+ SEO reporting solution integrated with Google Data Studio",
        "Recognized as Mr. Initiator 2022 for spearheading AI-powered SEO automation projects"
      ],
      skills: ["Product Development", "SEO Tools", "AI Integration", "Data Studio", "Automation"]
    },
    {
      company: "Techup Labs",
      location: "India",
      position: "SEO Consultant",
      duration: "Jun 2023 - Dec 2023",
      type: "Consulting",
      description: "Provided comprehensive SEO consulting services with focus on analytics and tracking implementation.",
      achievements: [
        "Setup and managed comprehensive GA4 tracking for key metrics and conversion funnels",
        "Implemented button tracking via GTM to track user interactions across website elements",
        "Built Looker Studio dashboards integrating data from GA4 and GTM for key performance metrics",
        "Monitored payment funnel drop-offs and social media shares via UTM parameters",
        "Enhanced user acquisition, retention, and engagement through data-driven insights"
      ],
      skills: ["Google Analytics 4", "Google Tag Manager", "Looker Studio", "UTM Tracking", "Data Analysis"]
    },
    {
      company: "Elite Info. Tech",
      location: "India",
      position: "SEO Executive",
      duration: "Apr 2018 - Feb 2021",
      type: "Full-time",
      description: "Comprehensive SEO execution across multiple client projects and platforms.",
      achievements: [
        "Led comprehensive on-page SEO strategies, improving website structure and meta tags",
        "Conducted in-depth keyword research and optimized content for search intent",
        "Performed detailed site audits to identify and resolve technical SEO issues",
        "Developed and implemented strategies to control and sustain organic web traffic",
        "Managed SEO projects for 30+ websites across WordPress, PHP, WIX, and ASP.NET platforms"
      ],
      skills: ["On-Page SEO", "Keyword Research", "Site Audits", "Multi-Platform SEO", "Project Management"]
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
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    activeExperience === index
                      ? "bg-primary/10 border-primary shadow-lg scale-105"
                      : "bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80"
                  }`}
                  onClick={() => setActiveExperience(index)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        activeExperience === index ? "bg-primary" : "bg-muted-foreground/30"
                      }`} />
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{exp.position}</h3>
                        <p className="text-sm text-primary font-medium">{exp.company}</p>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
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