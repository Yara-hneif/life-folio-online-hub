import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Palette, Users, Zap, Github, Linkedin, Mail, Star, CheckCircle, Sparkles, Layers, Monitor, Rocket, Trophy, Code, Paintbrush, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const LandingPage = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const features = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Create Unique Portfolio",
      description: "Build your distinctive personal website in minutes with professional templates and advanced customization tools",
      color: "from-blue-500 to-cyan-400",
      delay: "0s"
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Complete Customization",
      description: "Modify design, colors, and fonts to perfectly reflect your personality and professional identity",
      color: "from-purple-500 to-pink-400",
      delay: "0.1s"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Project Collaboration",
      description: "Connect your projects with colleagues and collaborators, showcase your teamwork professionally",
      color: "from-green-500 to-emerald-400",
      delay: "0.2s"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Quick Connect",
      description: "Automatically extract your information from Github, LinkedIn, and other accounts to fill your portfolio instantly",
      color: "from-orange-500 to-yellow-400",
      delay: "0.3s"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users", icon: <Users className="h-6 w-6" /> },
    { number: "50K+", label: "Portfolios Created", icon: <Trophy className="h-6 w-6" /> },
    { number: "99%", label: "Satisfaction Rate", icon: <Star className="h-6 w-6" /> },
    { number: "24/7", label: "Support", icon: <Rocket className="h-6 w-6" /> }
  ];

  const portfolioTypes = [
    { icon: <Code className="h-8 w-8" />, title: "Developer Portfolio", description: "Showcase your coding projects and technical skills" },
    { icon: <Paintbrush className="h-8 w-8" />, title: "Designer Portfolio", description: "Display your creative work and design process" },
    { icon: <Share className="h-8 w-8" />, title: "Business Portfolio", description: "Professional presentation for entrepreneurs" }
  ];

  const testimonials = [
    {
      name: "Ahmed Johnson",
      role: "Frontend Developer",
      content: "Thanks to VitePortfolio, I was able to create an amazing portfolio in less than an hour!",
      avatar: "/api/placeholder/50/50",
      rating: 5
    },
    {
      name: "Sarah Wilson",
      role: "UI/UX Designer",
      content: "Customization is incredibly easy and the result is professional. I recommend it to all creatives!",
      avatar: "/api/placeholder/50/50",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      content: "Auto-sync with Github and LinkedIn saved me so much time setting up my portfolio",
      avatar: "/api/placeholder/50/50",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl opacity-30 float-animation"
          style={{
            top: '10%',
            left: '80%',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        />
        <div 
          className="absolute w-64 h-64 bg-gradient-to-r from-accent/15 to-primary/15 rounded-full blur-2xl opacity-40 float-animation"
          style={{
            top: '60%',
            left: '10%',
            animationDelay: '2s',
            transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`,
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-full blur-3xl opacity-25 float-animation"
          style={{
            top: '30%',
            left: '50%',
            animationDelay: '4s',
            transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`,
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
        
        {/* Interactive Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px),
                linear-gradient(180deg, hsl(var(--border)) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
              transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
          <div className="text-center max-w-6xl mx-auto">
            {/* Floating Badge */}
            <div className="flex items-center justify-center mb-8 animate-fade-in">
              <Badge variant="secondary" className="text-primary font-semibold px-6 py-3 text-lg hover-glow shimmer">
                <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
                Next-Gen Portfolio Platform
              </Badge>
            </div>
            
            {/* Main Title with 3D Effect */}
            <div className="relative mb-8 animate-scale-in">
              <h1 className="text-6xl lg:text-8xl xl:text-9xl font-bold leading-tight relative">
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-[shine_3s_linear_infinite]">
                  VitePortfolio
                </span>
                {/* 3D Shadow Effect */}
                <span 
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 bg-clip-text text-transparent blur-sm"
                  style={{ transform: 'translate(4px, 4px)', zIndex: -1 }}
                >
                  VitePortfolio
                </span>
              </h1>
            </div>
            
            {/* Subtitle */}
            <p className="text-xl lg:text-3xl text-muted-foreground mb-12 leading-relaxed max-w-4xl mx-auto animate-fade-in font-light">
              Craft stunning portfolios with <span className="text-primary font-semibold">AI-powered design</span>, 
              <span className="text-accent font-semibold"> 3D animations</span>, and 
              <span className="text-primary font-semibold"> seamless integrations</span>
            </p>
            
            {/* CTA Buttons with Enhanced Design */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in">
              <Link to="/register">
                <Button size="lg" className="text-xl px-12 py-8 hover-lift group relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary transition-all duration-500 shadow-2xl hover:shadow-primary/25">
                  <span className="relative z-10 flex items-center">
                    Start Creating Now
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Button>
              </Link>
              
              <Link to="/login">
                <Button variant="outline" size="lg" className="text-xl px-12 py-8 hover-lift border-2 hover:border-primary hover:bg-primary/10 transition-all duration-300">
                  <Monitor className="mr-3 h-6 w-6" />
                  View Demo
                </Button>
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 animate-fade-in">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center group cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-center mb-2 text-primary group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground text-sm group-hover:text-foreground transition-colors">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Enhanced Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-xl animate-pulse opacity-60" />
        <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-gradient-to-r from-accent/25 to-primary/25 rounded-full blur-2xl animate-pulse opacity-50" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-secondary/40 to-primary/40 rounded-full blur-lg animate-pulse opacity-30" style={{ animationDelay: '2s' }} />
      </section>

      {/* Features Section with Advanced 3D Effects */}
      <section className="section-padding relative">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 animate-fade-in">
            <Badge variant="outline" className="mb-6 px-4 py-2 text-primary border-primary/20">
              <Layers className="w-4 h-4 mr-2" />
              Advanced Features
            </Badge>
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Why Choose VitePortfolio?
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Experience next-generation portfolio creation with cutting-edge technology and intuitive design tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="card-3d cursor-pointer border-0 overflow-hidden group relative bg-gradient-to-br from-card to-card/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500"
                style={{ 
                  animationDelay: feature.delay,
                  transform: hoveredFeature === index ? 'translateY(-8px) rotateY(5deg)' : 'translateY(0) rotateY(0)',
                }}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                {/* Animated Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-15 transition-all duration-500`} />
                
                {/* Glowing Border Effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                
                <CardHeader className="text-center card-3d-content relative z-10 p-8">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} text-white mb-6 mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300 mb-3">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center card-3d-content relative z-10 pb-8 px-6">
                  <CardDescription className="text-base leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                
                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </Card>
            ))}
          </div>

          {/* Portfolio Types Showcase */}
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold mb-8 text-foreground">
              Perfect for Every Professional
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {portfolioTypes.map((type, index) => (
                <div 
                  key={index} 
                  className="group cursor-pointer p-8 rounded-2xl bg-gradient-to-br from-card to-muted/30 hover:from-primary/5 hover:to-accent/5 transition-all duration-500 hover-lift border border-border/50 hover:border-primary/30"
                >
                  <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                    {type.icon}
                  </div>
                  <h4 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {type.title}
                  </h4>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors">
                    {type.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integration Showcase with 3D Cards */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center animate-fade-in">
            <Badge variant="outline" className="mb-6 px-4 py-2 text-accent border-accent/20">
              <Zap className="w-4 h-4 mr-2" />
              Instant Integration
            </Badge>
            
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Connect & Create in Seconds
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-16 leading-relaxed">
              Our AI-powered system automatically imports your data from professional platforms, 
              creating a stunning portfolio while you watch
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {[
                { 
                  name: 'GitHub', 
                  icon: <Github className="h-10 w-10" />, 
                  color: 'from-gray-600 to-gray-800',
                  description: 'Projects & Repos'
                },
                { 
                  name: 'LinkedIn', 
                  icon: <Linkedin className="h-10 w-10" />, 
                  color: 'from-blue-600 to-blue-800',
                  description: 'Experience & Skills'
                },
                { 
                  name: 'Gmail', 
                  icon: <Mail className="h-10 w-10" />, 
                  color: 'from-red-500 to-red-700',
                  description: 'Contact & Profile'
                },
                { 
                  name: 'Dribbble', 
                  icon: <div className="w-10 h-10 bg-pink-500 rounded-full text-white flex items-center justify-center font-bold text-lg">D</div>, 
                  color: 'from-pink-500 to-pink-700',
                  description: 'Creative Work'
                }
              ].map((platform, index) => (
                <Card 
                  key={index} 
                  className="card-3d cursor-pointer group border-0 overflow-hidden relative bg-gradient-to-br from-card to-card/60 backdrop-blur-sm hover:shadow-2xl transition-all duration-500"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    transform: `perspective(1000px) rotateY(${mousePosition.x * 0.01 - 5}deg) rotateX(${mousePosition.y * 0.01 - 5}deg)`
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <CardContent className="p-8 text-center relative z-10">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${platform.color} text-white mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-xl`}>
                      {platform.icon}
                    </div>
                    <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors duration-300">
                      {platform.name}
                    </h3>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {platform.description}
                    </p>
                  </CardContent>
                  
                  {/* Holographic Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </Card>
              ))}
            </div>
            
            {/* Enhanced CTA */}
            <div className="relative">
              <Link to="/register">
                <Button size="lg" className="text-xl px-12 py-8 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary transition-all duration-500 shadow-2xl hover:shadow-primary/25 hover-lift group relative overflow-hidden">
                  <span className="relative z-10 flex items-center">
                    <Rocket className="mr-3 h-6 w-6 group-hover:translate-y-1 transition-transform duration-300" />
                    Start Your Journey
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section with Advanced 3D Design */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background" />
        
        {/* Dynamic Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)) 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, hsl(var(--accent)) 0%, transparent 50%)`,
            transform: `translate(${scrollY * 0.05}px, ${scrollY * 0.02}px)`,
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 animate-fade-in">
            <Badge variant="outline" className="mb-6 px-4 py-2 text-primary border-primary/20">
              <Star className="w-4 h-4 mr-2" />
              Customer Stories
            </Badge>
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Loved by Professionals Worldwide
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join thousands of satisfied users who transformed their careers with stunning portfolios
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="card-3d hover-lift group border-0 overflow-hidden relative bg-gradient-to-br from-card to-card/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500"
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  transform: `perspective(1000px) rotateY(${(mousePosition.x - window.innerWidth / 2) * 0.005}deg)`
                }}
              >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Glowing Border */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                
                <CardContent className="p-8 relative z-10">
                  {/* Star Rating with Animation */}
                  <div className="flex items-center mb-6 justify-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="h-6 w-6 text-yellow-400 fill-current mr-1 group-hover:scale-110 transition-transform duration-300" 
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                  
                  {/* Quote */}
                  <blockquote className="text-lg text-muted-foreground mb-8 italic leading-relaxed text-center group-hover:text-foreground transition-colors duration-300">
                    "{testimonial.content}"
                  </blockquote>
                  
                  {/* Author Info */}
                  <div className="flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent p-0.5 group-hover:scale-110 transition-transform duration-300">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <div className="ml-4 text-center">
                      <p className="font-bold text-lg group-hover:text-primary transition-colors duration-300">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section with Immersive Design */}
      <section className="section-padding relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary opacity-95" />
        
        {/* Floating Orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(180deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)`,
          }}
        />

        <div className="container mx-auto px-4 text-center animate-fade-in relative z-10">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-8 px-6 py-3 text-lg font-semibold bg-white/20 text-white border-white/30 hover:bg-white/30 transition-all duration-300">
              <Rocket className="w-5 h-5 mr-2" />
              Launch Your Career Today
            </Badge>
            
            <h2 className="text-5xl lg:text-7xl font-bold mb-8 text-white leading-tight">
              Ready to Stand Out?
            </h2>
            
            <p className="text-xl lg:text-2xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed text-white/90">
              Join over <span className="font-bold text-white">50,000 professionals</span> who transformed their careers with stunning, 
              AI-powered portfolios that get noticed by top employers and clients
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link to="/register">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="text-xl px-12 py-8 bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-2xl group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    <Sparkles className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                    Create My Portfolio
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </Button>
              </Link>
              
              <Link to="/projects">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-xl px-10 py-8 border-2 border-white/50 text-white hover:bg-white/10 hover:border-white hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                >
                  <Monitor className="mr-3 h-6 w-6" />
                  View Gallery
                </Button>
              </Link>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span className="text-lg">Free Forever</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span className="text-lg">No Credit Card</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span className="text-lg">Live in 5 Minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span className="text-lg">50K+ Happy Users</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;