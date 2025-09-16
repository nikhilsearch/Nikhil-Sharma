import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, Sparkles, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "What's your core philosophy when it comes to SEO?",
      answer: "My philosophy is simple: Serve the user, and you'll serve the search engine.\n\nFor too long, SEO has been seen as a dark art of tricking algorithms. I see it as a science of understanding user intent and a craft of delivering the best possible answer.\n\nI build strategies that focus on creating genuine value through a technically sound website and high-quality, authoritative content. I don't chase short-term algorithm loopholes; I build sustainable, long-term organic growth engines that Google and your customers will both reward."
    },
    {
      id: 2,
      question: "How do you justify SEO investment? How do you measure and report on ROI?",
      answer: "I justify SEO by proving it's not a cost center, but a revenue driver. To me, vanity metrics like \"Number 1 ranking\" are useless without context. I focus on business impact.\n\nMy reporting centers on a custom ROI model that connects my actions to your bottom line:\n\n• Attributed Revenue: I use analytics to track conversions from organic traffic and attribute real dollar values to them, calculating the direct revenue generated.\n\n• Paid Channel Equivalency: I calculate what your organic traffic would have cost if you'd paid for it via PPC. This demonstrates the direct cost savings and efficiency of investing in organic growth.\n\n• Share of Voice (SOV): I track your visibility for your most important keywords against your top competitors. Growth in SOV is a leading indicator of increased market share.\n\n• Customer Acquisition Cost (CAC) Reduction: I demonstrate how a strong organic channel lowers your overall blended CAC by bringing in high-intent users at a lower cost than paid channels."
    },
    {
      id: 3,
      question: "You talk about AI and Semantic SEO. How does this translate into a real strategy for my business?",
      answer: "It means we stop optimizing for just keywords and start optimizing for topics and answers. Search engines no longer just match strings of text; they understand concepts and entities.\n\nMy strategy puts this into practice by:\n\n• Building Topic Clusters: Instead of one-off blog posts, I create interconnected hubs of content that cover a subject comprehensively. This establishes your site as an authority, making it a go-to source for AI Overviews.\n\n• Implementing Structured Data: I use schema markup to explicitly label your content for search engines. This is like giving them a cheat sheet to understand your services, products, and articles, which dramatically increases the chance of being featured in rich results.\n\n• Optimizing for Natural Language: I analyze \"People Also Ask\" sections and other natural language queries to ensure your content answers the specific questions your audience is asking, in the way they're asking them."
    },
    {
      id: 4,
      question: "Your portfolio highlights SaaS and EdTech. How do you adapt your SEO strategy for different industries?",
      answer: "While the fundamentals of SEO are universal, the strategy must be tailored to the specific industry's sales cycle and user behavior.\n\n• For SaaS: The user journey is often complex and consideration-heavy. My focus here is on full-funnel content strategy—from top-of-funnel blog posts that capture problem-aware users, to mid-funnel comparison pages and bottom-of-funnel feature pages that drive free trial signups or demo requests.\n\n• For E-commerce: The focus is on scalability and transactional intent. I prioritize technical SEO for large inventories, category page optimization, product schema implementation, and conversion rate optimization (CRO) elements within the SERPs.\n\n• For Local Businesses: The strategy is hyperlocal. It's all about dominating the map pack through Google Business Profile optimization, local citation building, and generating geo-targeted landing pages and content.\n\nMy strength is in quickly learning the nuances of a new industry and identifying where SEO can make the biggest commercial impact."
    },
    {
      id: 5,
      question: "How do you collaborate with other teams like Content, Product, and Paid Search?",
      answer: "I believe SEO is a team sport, not a solo mission. I act as a strategic partner, not just an external consultant.\n\n• With Content Teams: I don't just hand over a list of keywords. I provide detailed content briefs that include search intent analysis, target audience personas, suggested outlines, and internal linking opportunities. I act as their strategic SEO guide.\n\n• With Product/Dev Teams: I translate SEO needs into clear, prioritized tickets for developers. I work with them to ensure new features are built with SEO in mind from the start, avoiding costly fixes later.\n\n• With Paid Search Teams: This is a crucial alliance. We share data on what keywords are converting, test ad copy for organic meta descriptions, and align our strategies to dominate the entire SERP for high-value terms, ensuring we're not cannibalizing each other's efforts."
    },
    {
      id: 6,
      question: "Can't I just do SEO once? Why does it need to be an ongoing effort?",
      answer: "Thinking of SEO as a one-time project is like thinking of fitness as a one-time workout. You might feel good for a day, but the results won't last.\n\nSEO must be ongoing for three simple reasons:\n\n1. Your Competitors Aren't Standing Still: While you're paused, your competitors are actively creating new content, earning new links, and improving their site. SEO is a zero-sum game; to climb the rankings, you have to outperform the sites currently there.\n\n2. Search Engines Are Always Changing: Google rolls out thousands of algorithm updates every year. An ongoing strategy allows me to adapt to these changes, protect your rankings, and capitalize on new opportunities.\n\n3. User Behavior Evolves: The way people search changes over time. An ongoing SEO program allows us to keep a pulse on these trends and continually refine our strategy to match user intent."
    },
    {
      id: 7,
      question: "Can you guarantee me a #1 ranking on Google?",
      answer: "No, and you should run from anyone who says they can.\n\nA \"guarantee\" is the single biggest red flag in the SEO industry. Here's why:\n\n• No one controls the Google algorithm. I don't work for Google, and neither does any other SEO professional. We can only build strategies based on expertise, data, and a deep understanding of best practices.\n\n• Rankings are a means, not an end. My goal isn't just to get you a #1 ranking for a vanity keyword; my goal is to drive qualified organic traffic that converts into paying customers.\n\nI guarantee my commitment, my process, and my transparent communication—not a specific spot on a page I don't own."
    }
  ];

  const toggleQuestion = (questionId: number) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

  return (
    <section className="relative py-12 md:py-20 px-4 bg-gradient-to-b from-muted/10 via-background to-muted/5 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-emerald-400/20 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-1/3 w-1.5 h-1.5 bg-blue-400/25 rounded-full animate-pulse delay-700"></div>
      </div>

      <div className="max-w-4xl mx-auto relative">
        <header className="text-center mb-12 md:mb-16 animate-fade-in">
          <div className="relative inline-block mb-6">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-purple-400/20 to-emerald-400/20 rounded-full blur-lg animate-pulse"></div>
            <div className="relative flex items-center justify-center gap-4 p-4">
              <div className="relative">
                <HelpCircle className="w-8 h-8 text-primary animate-pulse" />
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-purple-400 animate-pulse delay-300" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-purple-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                Frequently Asked Questions
              </h2>
              <div className="relative">
                <Zap className="w-8 h-8 text-emerald-400 animate-pulse delay-150" />
                <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-md animate-pulse delay-150"></div>
              </div>
            </div>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed opacity-0 animate-[fade-in_0.8s_ease-out_0.3s_forwards]">
            Get insights into modern SEO strategies and practices that drive real results
          </p>
          <div className="mt-8 w-24 h-1 bg-gradient-to-r from-primary via-purple-400 to-emerald-400 mx-auto rounded-full opacity-0 animate-[fade-in_1s_ease-out_0.6s_forwards]"></div>
        </header>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <Card 
              key={faq.id} 
              className={`group cursor-pointer relative overflow-hidden
                         bg-gradient-to-br from-card/90 via-card to-card/80 
                         backdrop-blur-sm border-2 border-border/30 
                         hover:border-gradient-to-r hover:border-primary/50
                         transition-all duration-500 ease-out
                         hover:shadow-2xl hover:shadow-primary/15
                         hover:-translate-y-2 hover:scale-[1.02]
                         before:absolute before:inset-0 
                         before:bg-gradient-to-r before:from-primary/5 before:via-purple-400/5 before:to-emerald-400/5
                         before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500
                         animate-[fade-in_0.6s_ease-out_${index * 0.1}s_both]`}
            >
              {/* Floating Elements */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 bg-primary/30 rounded-full animate-pulse"></div>
              </div>
              
              <CardHeader 
                className="pb-4 relative z-10"
                onClick={() => toggleQuestion(faq.id)}
              >
                <CardTitle className="flex items-center justify-between gap-4 text-left">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center
                                   bg-gradient-to-r from-primary/20 to-purple-400/20
                                   group-hover:from-primary/30 group-hover:to-purple-400/30
                                   transition-all duration-300 ${openQuestion === faq.id ? 'ring-2 ring-primary/50' : ''}`}>
                      <span className="text-sm font-bold text-primary">{faq.id}</span>
                    </div>
                    <span className={`text-lg font-semibold transition-all duration-300
                                    ${openQuestion === faq.id 
                                      ? 'text-primary' 
                                      : 'text-foreground group-hover:text-primary'}`}>
                      {faq.question}
                    </span>
                  </div>
                  <div className="flex-shrink-0 relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center
                                   transition-all duration-300 group-hover:bg-primary/10
                                   ${openQuestion === faq.id ? 'bg-primary/20 rotate-180' : ''}`}>
                      {openQuestion === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-primary transition-transform duration-300" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                      )}
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              
              {openQuestion === faq.id && (
                <CardContent className="pt-0 pb-6 relative z-10 animate-[accordion-down_0.3s_ease-out]">
                  <div className="border-t border-gradient-to-r from-primary/20 via-purple-400/20 to-emerald-400/20 pt-6 mx-4">
                    <div className="relative">
                      <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-primary via-purple-400 to-emerald-400 rounded-full opacity-50"></div>
                      <div className="pl-6">
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line
                                     animate-[fade-in_0.4s_ease-out_0.1s_both]
                                     text-base md:text-lg">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
              
              {/* Subtle Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-primary/2 to-transparent
                             opacity-0 transition-opacity duration-500
                             ${openQuestion === faq.id ? 'opacity-100' : 'group-hover:opacity-50'}`}></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;