import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "How is AI changing the landscape of SEO in 2025?",
      answer: "AI is fundamentally reshaping SEO by powering more sophisticated search algorithms like Google's BERT and creating new search experiences such as AI Overviews. In 2025, success in SEO means optimizing for AI-driven \"answer engines,\" not just traditional search results. This requires creating high-quality, structured content that directly answers user questions, can be easily interpreted by LLMs, and is authoritative enough to be cited in AI-generated summaries. Strategies must now account for zero-click searches and focus on building brand authority that AI systems trust."
    },
    {
      id: 2,
      question: "What are the most effective strategies for link building in 2025?",
      answer: "In 2025, effective link building prioritizes quality and relevance over quantity. Top strategies include Digital PR to earn media mentions, creating \"link bait\" assets like original research or free tools, and reclaiming unlinked brand mentions. Another powerful technique is broken link building, where you find dead links on relevant sites and offer your content as a replacement. Guest posting remains effective, but only when it provides genuine value to the audience of a reputable website, rather than just being a vehicle for a backlink."
    },
    {
      id: 3,
      question: "How do you measure the ROI of an Enterprise SEO campaign?",
      answer: "Measuring enterprise SEO ROI involves tracking the revenue generated from organic traffic against the total cost of the SEO investment. The formula is: **SEO ROI = [(Revenue from SEO - SEO Costs) / SEO Costs] × 100%**. To do this accurately, you must track organic traffic conversions, attribute revenue to organic channels, and account for all costs, including agency fees, tool subscriptions, and team salaries. Because SEO has a delayed impact, it's also important to consider long-term metrics like Customer Lifetime Value (CLV) for customers acquired through organic search."
    },
    {
      id: 4,
      question: "How should a business prepare for Google's frequent algorithm updates?",
      answer: "The best preparation for any Google algorithm update is to consistently focus on creating high-quality, \"people-first\" content that aligns with Google's E-E-A-T guidelines (Experience, Expertise, Authoritativeness, Trustworthiness). Instead of reacting to every minor fluctuation, maintain strong technical SEO fundamentals, ensure a positive user experience, and regularly audit your content for relevance and quality. Staying informed by following official Google sources and industry leaders helps, but a resilient strategy is built on a foundation of genuine value for the user."
    },
    {
      id: 5,
      question: "What are the top priorities for a technical SEO audit in 2025?",
      answer: "In 2025, a technical SEO audit should prioritize several key areas. First is **Crawlability and Indexability**, ensuring search engines can access and index your valuable pages without issue. Second are **Core Web Vitals** (LCP, CLS, and INP), as site speed and user experience are direct ranking factors. Third, **Structured Data (Schema Markup)** is crucial for enhancing visibility in SERPs and getting featured in rich results and AI Overviews. Finally, ensuring your site is secure with **HTTPS** and has a logical, mobile-first architecture remains fundamental."
    }
  ];

  const toggleQuestion = (questionId: number) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

  return (
    <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-muted/10 to-background">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <HelpCircle className="w-8 h-8 text-primary" />
            <h2 className="text-2xl md:text-4xl font-bold">
              <span className="text-foreground">Frequently Asked</span>{" "}
              <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Questions</span>
            </h2>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Here's a list of frequently asked questions about modern SEO practices:
          </p>
        </header>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <Card 
              key={faq.id} 
              className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 border-border/50 hover:border-primary/30"
            >
              <CardHeader 
                className="pb-3"
                onClick={() => toggleQuestion(faq.id)}
              >
                <CardTitle className="flex items-center justify-between gap-4 text-left">
                  <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0">
                    {openQuestion === faq.id ? (
                      <ChevronUp className="w-5 h-5 text-primary transition-transform duration-300" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              
              {openQuestion === faq.id && (
                <CardContent className="pt-0 pb-6 animate-in fade-in-50 slide-in-from-top-2 duration-300">
                  <div className="border-t border-border/30 pt-4">
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Have more questions? Feel free to{" "}
            <a 
              href="mailto:imnikhil10@outlook.com" 
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              get in touch
            </a>
            {" "}with me directly.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;