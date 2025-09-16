import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "What's your core philosophy when it comes to SEO?",
      answer: "My philosophy is simple: Serve the user, and you'll serve the search engine. For too long, SEO has been seen as a dark art of tricking algorithms. I see it as a science of understanding user intent and a craft of delivering the best possible answer. I build strategies that focus on creating genuine value through a technically sound website and high-quality, authoritative content. I don't chase short-term algorithm loopholes; I build sustainable, long-term organic growth engines that Google and your customers will both reward."
    },
    {
      id: 2,
      question: "How do you justify SEO investment? How do you measure and report on ROI?",
      answer: "I justify SEO by proving it's not a cost center, but a revenue driver. To me, vanity metrics like \"Number 1 ranking\" are useless without context. I focus on business impact. My reporting centers on a custom ROI model that connects my actions to your bottom line:\n\n**Attributed Revenue:** I use analytics to track conversions from organic traffic and attribute real dollar values to them, calculating the direct revenue generated.\n\n**Paid Channel Equivalency:** I calculate what your organic traffic would have cost if you'd paid for it via PPC. This demonstrates the direct cost savings and efficiency of investing in organic growth.\n\n**Share of Voice (SOV):** I track your visibility for your most important keywords against your top competitors. Growth in SOV is a leading indicator of increased market share.\n\n**Customer Acquisition Cost (CAC) Reduction:** I demonstrate how a strong organic channel lowers your overall blended CAC by bringing in high-intent users at a lower cost than paid channels."
    },
    {
      id: 3,
      question: "You talk about AI and Semantic SEO. How does this translate into a real strategy for my business?",
      answer: "It means we stop optimizing for just keywords and start optimizing for topics and answers. Search engines no longer just match strings of text; they understand concepts and entities. My strategy puts this into practice by:\n\n**Building Topic Clusters:** Instead of one-off blog posts, I create interconnected hubs of content that cover a subject comprehensively. This establishes your site as an authority, making it a go-to source for AI Overviews.\n\n**Implementing Structured Data:** I use schema markup to explicitly label your content for search engines. This is like giving them a cheat sheet to understand your services, products, and articles, which dramatically increases the chance of being featured in rich results.\n\n**Optimizing for Natural Language:** I analyze \"People Also Ask\" sections and other natural language queries to ensure your content answers the specific questions your audience is asking, in the way they're asking them."
    },
    {
      id: 4,
      question: "Your portfolio highlights SaaS and EdTech. How do you adapt your SEO strategy for different industries?",
      answer: "While the fundamentals of SEO are universal, the strategy must be tailored to the specific industry's sales cycle and user behavior.\n\n**For SaaS:** The user journey is often complex and consideration-heavy. My focus here is on full-funnel content strategy—from top-of-funnel blog posts that capture problem-aware users, to mid-funnel comparison pages and bottom-of-funnel feature pages that drive free trial signups or demo requests.\n\n**For E-commerce:** The focus is on scalability and transactional intent. I prioritize technical SEO for large inventories, category page optimization, product schema implementation, and conversion rate optimization (CRO) elements within the SERPs.\n\n**For Local Businesses:** The strategy is hyperlocal. It's all about dominating the map pack through Google Business Profile optimization, local citation building, and generating geo-targeted landing pages and content.\n\nMy strength is in quickly learning the nuances of a new industry and identifying where SEO can make the biggest commercial impact."
    },
    {
      id: 5,
      question: "How do you collaborate with other teams like Content, Product, and Paid Search?",
      answer: "I believe SEO is a team sport, not a solo mission. I act as a strategic partner, not just an external consultant.\n\n**With Content Teams:** I don't just hand over a list of keywords. I provide detailed content briefs that include search intent analysis, target audience personas, suggested outlines, and internal linking opportunities. I act as their strategic SEO guide.\n\n**With Product/Dev Teams:** I translate SEO needs into clear, prioritized tickets for developers. I work with them to ensure new features are built with SEO in mind from the start, avoiding costly fixes later.\n\n**With Paid Search Teams:** This is a crucial alliance. We share data on what keywords are converting, test ad copy for organic meta descriptions, and align our strategies to dominate the entire SERP for high-value terms, ensuring we're not cannibalizing each other's efforts."
    },
    {
      id: 6,
      question: "Can't I just do SEO once? Why does it need to be an ongoing effort?",
      answer: "Thinking of SEO as a one-time project is like thinking of fitness as a one-time workout. You might feel good for a day, but the results won't last.\n\nSEO must be ongoing for three simple reasons:\n\n**Your Competitors Aren't Standing Still:** While you're paused, your competitors are actively creating new content, earning new links, and improving their site. SEO is a zero-sum game; to climb the rankings, you have to outperform the sites currently there.\n\n**Search Engines Are Always Changing:** Google rolls out thousands of algorithm updates every year. An ongoing strategy allows me to adapt to these changes, protect your rankings, and capitalize on new opportunities.\n\n**User Behavior Evolves:** The way people search changes over time. An ongoing SEO program allows us to keep a pulse on these trends and continually refine our strategy to match user intent."
    },
    {
      id: 7,
      question: "Can you guarantee me a #1 ranking on Google?",
      answer: "No, and you should run from anyone who says they can.\n\nA \"guarantee\" is the single biggest red flag in the SEO industry. Here's why:\n\n**No one controls the Google algorithm.** I don't work for Google, and neither does any other SEO professional. We can only build strategies based on expertise, data, and a deep understanding of best practices.\n\n**Rankings are a means, not an end.** My goal isn't just to get you a #1 ranking for a vanity keyword; my goal is to drive qualified organic traffic that converts into paying customers. I guarantee my commitment, my process, and my transparent communication—not a specific spot on a page I don't own."
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
      </div>
    </section>
  );
};

export default FAQ;