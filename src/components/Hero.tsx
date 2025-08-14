import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left space-y-8">
          <h1 className="text-6xl lg:text-7xl font-bold">
            <span className="text-foreground">Nikhil</span>{" "}
            <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              Sharma
            </span>
            <br />
            <span className="text-foreground text-4xl lg:text-5xl">Dynamic SEO Lead</span>
          </h1>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-primary">SEO Expert | 7+ Years Experience</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Dynamic SEO Lead driving organic growth for global brands across competitive industries. 
              Adept at executing data-driven SEO strategies that boost visibility, lead generation, and revenue 
              with proven track record of leading cross-functional teams and consistently surpassing KPIs.
            </p>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <img
              src="/lovable-uploads/209a2e34-b533-4448-a499-e64d4c9cdf98.png"
              alt="Nikhil Sharma - SEO Expert"
              className="relative w-80 h-80 object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;