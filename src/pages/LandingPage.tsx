import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Palette, Users, Zap, Github, Linkedin, Mail, Star, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const LandingPage = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Create Unique Portfolio",
      description: "Build your distinctive personal website in minutes with professional templates and advanced customization tools",
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Complete Customization",
      description: "Modify design, colors, and fonts to perfectly reflect your personality and professional identity",
      color: "from-purple-500 to-pink-400"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Project Collaboration",
      description: "Connect your projects with colleagues and collaborators, showcase your teamwork professionally",
      color: "from-green-500 to-emerald-400"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Quick Connect",
      description: "Automatically extract your information from Github, LinkedIn, and other accounts to fill your portfolio instantly",
      color: "from-orange-500 to-yellow-400"
    }
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
        <div className="container mx-auto px-4 py-20 lg:py-32 relative">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <div className="flex items-center justify-center mb-6">
              <Badge variant="secondary" className="text-primary font-semibold px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Advanced Portfolio Platform
              </Badge>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight">
              VitePortfolio
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Create your professional portfolio in minutes with smart tools to automatically extract your information from various accounts
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/register">
                <Button size="lg" className="text-lg px-8 py-6 hover-lift group">
                  Start Free Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link to="/login">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 hover-lift">
                  Sign In
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Completely Free</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>No Credit Card</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Setup in Minutes</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
      </section>

      {/* Features Section */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Why VitePortfolio?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide you with advanced tools to create a professional portfolio that highlights your skills and projects in an innovative way
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className={`card-3d cursor-pointer border-0 overflow-hidden group ${
                  hoveredFeature === index ? 'shadow-2xl scale-105' : ''
                }`}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                <CardHeader className="text-center card-3d-content">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${feature.color} text-white mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center card-3d-content">
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Login Preview Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Quick Connect with Your Accounts
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Automatically extract your information from various accounts and build your portfolio in seconds
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {[
                { name: 'GitHub', icon: <Github className="h-8 w-8" />, color: 'from-gray-700 to-gray-900' },
                { name: 'LinkedIn', icon: <Linkedin className="h-8 w-8" />, color: 'from-blue-600 to-blue-800' },
                { name: 'Gmail', icon: <Mail className="h-8 w-8" />, color: 'from-red-500 to-red-700' },
                { name: 'Facebook', icon: <div className="w-8 h-8 bg-blue-600 rounded text-white flex items-center justify-center font-bold">f</div>, color: 'from-blue-500 to-blue-700' }
              ].map((platform, index) => (
                <Card key={index} className="hover-lift cursor-pointer group border-2 hover:border-primary/50">
                  <CardContent className="p-6 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${platform.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {platform.icon}
                    </div>
                    <p className="font-semibold group-hover:text-primary transition-colors">
                      {platform.name}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Link to="/register">
              <Button size="lg" className="text-lg px-10 py-6 hover-lift">
                Start Connecting Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              What Our Customers Say?
            </h2>
            <p className="text-xl text-muted-foreground">
              Real reviews from satisfied users of our services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-3d hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Create Your Portfolio?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of professionals who chose VitePortfolio to build their distinctive digital presence
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="text-lg px-10 py-6 hover-lift">
                Start Free Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Link to="/projects">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary hover-lift">
                View Examples
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;