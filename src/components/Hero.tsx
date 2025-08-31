import { useState, useEffect } from "react";
import { ArrowDown, Sparkles, TrendingUp, Users } from "lucide-react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "Dynamic SEO Lead";

  useEffect(() => {
    setIsVisible(true);
    
    // Typing animation for the subtitle
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    { icon: TrendingUp, value: "250+", label: "SEO Projects" },
    { icon: Users, value: "150+", label: "Happy Clients" },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/10 px-4 overflow-hidden pt-16">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left Column - Content */}
        <div className={`text-center lg:text-left space-y-8 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Name with animation */}
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="block text-foreground animate-fade-in">
                Nikhil <span className="bg-gradient-to-r from-primary via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient">Sharma</span>
              </span>
            </h1>
            
            {/* Typing animation for subtitle */}
            <div className="relative">
              <h2 className="text-3xl lg:text-4xl font-semibold text-foreground min-h-[3rem] flex items-center justify-center lg:justify-start">
                {typedText}
                <span className="ml-1 w-0.5 h-8 bg-primary animate-pulse"></span>
              </h2>
            </div>
          </div>

          {/* Professional tagline with icon */}
          <div className="flex items-center justify-center lg:justify-start gap-3 animate-fade-in delay-500">
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            <span className="text-xl font-medium text-primary tracking-wide">
              SEO Expert | 7+ Years Experience
            </span>
          </div>

          {/* Enhanced description */}
          <div className="space-y-6 animate-fade-in delay-700">
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              <span className="font-semibold text-foreground">Driving organic growth</span> for global brands across 
              competitive industries. I execute <span className="text-primary font-medium">data-driven SEO strategies</span> that 
              boost visibility, lead generation, and revenue with a proven track record of leading cross-functional 
              teams and consistently <span className="font-semibold text-foreground">surpassing KPIs</span>.
            </p>
            
            {/* Mini stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-card/30 backdrop-blur-md border border-white/20 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <stat.icon className="w-5 h-5 text-primary" />
                  <span className="font-bold text-foreground">{stat.value}</span>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Enhanced Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 animate-fade-in delay-1000">
            <a
              href="https://www.linkedin.com/in/nikhil-sharma"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#0077B5] text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#0077B5]/25 transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#0077B5] to-[#00A0DC] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg className="relative w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className="relative">LinkedIn Profile</span>
            </a>
            
            <a
              href="https://drive.google.com/file/d/1-1CNRcXNFg0bPG2fHRVenlz3uYm1lzFm/view"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-purple-400 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/25 transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg className="relative w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="relative">Download Resume</span>
            </a>
          </div>
        </div>

        {/* Right Column - Natural Image */}
        <div className={`flex justify-center lg:justify-end transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative group">
            {/* Subtle glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-purple-400/20 to-blue-400/20 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition duration-1000"></div>
            
            {/* Image with natural appearance */}
            <div className="relative">
              <img
                src="/lovable-uploads/e6ae7ed7-6710-4268-ad7b-1e8896e9ce47.png"
                alt="Nikhil Sharma - Dynamic SEO Lead and Expert"
                className="relative max-w-sm sm:max-w-md lg:max-w-lg w-full h-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Floating badge */}
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-primary to-purple-400 text-white px-4 py-2 rounded-xl shadow-xl animate-bounce">
                <span className="font-bold text-xs sm:text-sm">SEO Expert</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </div>
    </section>
  );
};

export default Hero;