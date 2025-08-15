import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building, TrendingUp, Users, Award } from "lucide-react";

const Experience = () => {
  const [activeExperience, setActiveExperience] = useState(0);

  const experiences = [
    {
      company: "WaveAI",
      location: "Singapore (Remote)",
      position: "SEO Team Lead",
      duration: "11/2022 - Present",
      type: "Full-time",
      description: "Leading global SEO strategy and team across multi-domain ecosystems with expertise in international expansion and AI-driven optimization.",
      achievements: [
        "Global SEO Strategy & International Expansion: Designed and executed SEO strategies across multi-domain ecosystems (US, APAC, Europe), implementing hreflang boosting visibility across localized SERPs and alternative search engines",
        "Technical SEO & On-Page Excellence: Led technical audits and on-page enhancements including site speed optimization, mobile-first UX, schema implementation, and signed exchange resulting in a 35% lift in Good URLs, 25% improvement in indexation, and 20% higher CTRs",
        "SaaS Keyword Research & Content Strategy: Drove full-funnel SEO content programs with a focus on bottom-of-the-funnel keywords, cluster-based planning, and persona-aligned search intent increasing blog traffic by 120% and conversions through high-intent landing pages",
        "AI-Driven SEO & Automation: Utilized generative AI tools (ChatGPT, Gemini, Claude, Perplexity) to streamline keyword clustering, content production, and programmatic SEO, accelerating content velocity while aligning with E-E-A-T principles",
        "Content Strategy & Competitive Analysis: Developed SEO-driven content strategies and identified content gaps through in-depth competitor analysis, increasing blog traffic by 120% and improving keyword rankings across strategic landing pages",
        "Cross-Functional Leadership & Scalable SEO Ops: Managed a team of 5 SEO/content specialists and collaborated with SEM, Product, and Content teams. Standardized SEO SOPs, created training playbooks, and aligned SEO with GTM and growth priorities",
        "SEO + SEM Alignment: Partnered with Paid Search teams to create unified acquisition strategies, align messaging, and optimize budget allocation—maximizing SERP share and conversion efficiency across organic and paid channels",
        "Product-Led Content & CRO Optimization: Created content focused on showcasing how Wavel's AI features solve real-world problems. Aligned SEO with conversion rate optimization (CRO) goals — increasing demo signups, free trial activation, and driving down CAC",
        "Customer Acquisition & Retention SEO: Developed SEO-driven strategies to support both new user acquisition and retention — from awareness-stage content to engagement tactics that reduced churn and boosted LTV",
        "Community Engagement & Referral Traffic Growth: Successfully leveraged public communities such as Product Hunt, driving product visibility from launch to networking support, which led to achieving \"Product of the Day\" on the platform twice. Utilized Reddit to increase referral traffic by 160%, resulting in significant growth in new users and sessions, further boosting organic traffic and user engagement"
      ],
      skills: ["Global SEO Strategy", "Technical SEO", "AI-Driven Automation", "Team Leadership", "Content Strategy", "Cross-functional Collaboration", "International SEO", "E-E-A-T Optimization"]
    },
    {
      company: "Obbserv",
      location: "India",
      position: "Technical SEO Specialist",
      duration: "03/2021 - 10/2022",
      type: "Full-time",
      description: "Specialized in technical SEO implementation and site architecture optimization for JavaScript-heavy platforms and large-scale websites.",
      achievements: [
        "Site Architecture, PageSpeed & Crawl Efficiency: Implemented technical SEO fixes including canonicalization, metadata structure, and internal linking—resulting in a 30% improvement in crawl efficiency. Improved Core Web Vitals and reduced LCP by 40% through advanced page speed strategies, lazy loading, and script deferrals",
        "JavaScript SEO & Rendering Optimization: Resolved critical CSR vs. SSR issues across 1 million pages on a JavaScript-heavy EdTech platform. Enabled seamless crawling and indexing by configuring server-side rendering, enhancing Googlebot compatibility and improving indexation coverage",
        "Sitemap & Robots.txt Protocol Optimization: Configured XML sitemaps and Robots.txt directives to enhance crawlability and guide search engine behavior. Streamlined sitemap structure to align with deep URL hierarchies, improving discovery of product and blog pages",
        "Structured Data & Schema Markup: Deployed JSON-LD schema (Product, Article, Breadcrumb) across dynamic and eCommerce pages, enhancing SERP appearance via rich results and boosting CTR by 20%",
        "Mobile-First & Accessibility Compliance: Ensured full mobile usability and responsiveness by resolving usability errors reported in Google Search Console. Achieved mobile-friendly compliance across all templates, improving engagement metrics and reducing bounce rate",
        "Indexation Management & Duplicate Content Fixes: Conducted content pruning, canonical tag audits, and hreflang cleanups to avoid duplication and thin content issues. Verified indexed content using GSC and bulk indexing tools to ensure maximum crawl value on priority URLs",
        "SEO Tools & Reporting Infrastructure: Created SEO automation tools like Crawl+, Bulk Indexing Checker, and Voice+. Developed Studio+, a Looker Studio-powered dashboard for real-time reporting of crawl stats, CWV, and indexed URL trends",
        "Client Success & Strategic Recognition: Delivered personalized SEO growth strategies for global clients, maintaining a 95% retention rate. Recognized with the High Flyer Award (2021) and Mr. Initiator (2022) for technical innovation and AI-powered SEO automation",
        "Team Leadership & Cross-Functional Collaboration: Led and mentored SEO professionals, improving team output by 25%. Collaborated across SEO, CRO, UX, and paid teams—driving a 50% uplift in integrated digital performance"
      ],
      skills: ["Technical SEO", "JavaScript SEO", "Schema Markup", "Site Speed Optimization", "Mobile-First Indexing", "Crawl Optimization", "SEO Tools Development", "Team Leadership"]
    },
    {
      company: "Elite Info. Tech",
      location: "India",
      position: "SEO Executive",
      duration: "04/2018 - 02/2021",
      type: "Full-time",
      description: "Executed comprehensive SEO strategies across multiple platforms and managed diverse client portfolios with focus on technical implementation and organic growth.",
      achievements: [
        "On-Page Optimization: Executed comprehensive on-page SEO strategies, enhancing website architecture, meta tags, and internal linking to boost search engine visibility and improve user experience",
        "Keyword Research & Content Optimization: Conducted in-depth keyword research and aligned content with user intent, leading to significant organic traffic growth and improved SERP rankings",
        "Technical SEO Audits: Performed detailed site audits to identify and resolve technical issues affecting crawlability, indexation, and overall site performance, ensuring optimal search engine accessibility",
        "Web Traffic Analysis & Growth: Developed and implemented data-driven strategies to monitor, control, and sustain organic web traffic growth by analyzing key performance metrics and user behavior",
        "Full-Spectrum SEO Execution: Led both on-page and off-page SEO initiatives across various digital platforms, resulting in improved keyword rankings, higher engagement, and increased site authority",
        "Project & Workflow Management: Successfully managed 30+ SEO projects and optimized over 100 websites built on platforms such as WordPress, PHP, WIX, and ASP.NET, ensuring timely delivery and high-quality execution",
        "International SEO Experience: Oversaw SEO strategies for clients across regions including the US, Canada, UK, Europe, Australia, and Asia—tailoring campaigns to regional search trends, cultural nuances, and local algorithm updates"
      ],
      skills: ["On-Page SEO", "Keyword Research", "Technical Audits", "Multi-Platform SEO", "International SEO", "Project Management", "Web Traffic Analysis"]
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