import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  Recycle, 
  Leaf, 
  Brain, 
  Camera, 
  TrendingUp,
  Zap,
  Shield,
  Globe
} from 'lucide-react';
import heroImage from '@/assets/hero-waste.jpg';
import recyclableImage from '@/assets/recyclable-waste.jpg';
import organicImage from '@/assets/organic-waste.jpg';
import hazardousImage from '@/assets/hazardous-waste.jpg';
import { Layout } from '@/components/layout/Layout';

const stats = [
  { label: 'Images Analyzed', value: '12,847+', icon: Camera },
  { label: 'Waste Sorted', value: '8.5 Tons', icon: Recycle },
  { label: 'Impact Score', value: '94%', icon: TrendingUp },
];

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Advanced CNN model accurately classifies waste types in seconds.',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Get immediate feedback on waste category and disposal guidance.',
  },
  {
    icon: Shield,
    title: 'Safe Disposal',
    description: 'Proper handling instructions for hazardous materials.',
  },
  {
    icon: Globe,
    title: 'Environmental Impact',
    description: 'Track your contribution to a cleaner, greener planet.',
  },
];

const wasteCategories = [
  {
    type: 'Recyclable',
    color: 'recyclable',
    icon: '♻️',
    image: recyclableImage,
    items: ['Plastic bottles', 'Paper', 'Metal cans'],
    description: 'Materials that can be processed and reused.',
  },
  {
    type: 'Organic',
    color: 'organic',
    icon: '🌱',
    image: organicImage,
    items: ['Food scraps', 'Garden waste', 'Coffee grounds'],
    description: 'Biodegradable waste perfect for composting.',
  },
  {
    type: 'Hazardous',
    color: 'hazardous',
    icon: '⚠️',
    image: hazardousImage,
    items: ['Batteries', 'Chemicals', 'E-waste'],
    description: 'Requires special handling and disposal.',
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Smart Waste Segregation" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-transparent" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6 animate-fade-in">
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium backdrop-blur-sm">
                <Leaf className="inline h-4 w-4 mr-1" />
                AI-Powered Solution
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-6 leading-tight animate-slide-up">
              Smart Waste{' '}
              <span className="text-primary">Segregation</span>{' '}
              System ♻️
            </h1>
            
            <p className="text-lg md:text-xl text-background/80 mb-8 leading-relaxed animate-slide-up delay-100">
              AI-Powered Waste Sorting for a Greener Future. Upload an image of your waste and let our intelligent system classify it instantly.
            </p>

            <div className="flex flex-wrap gap-4 animate-slide-up delay-200">
              <Button asChild variant="hero" size="xl">
                <Link to="/upload">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="xl">
                <Link to="/how-it-works">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="flex items-center justify-center gap-4 p-6 rounded-2xl bg-muted/50 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-3 rounded-xl bg-primary/10">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Our Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-6 mb-4 text-foreground">
              Why Choose Smart Waste?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered system makes waste segregation simple, accurate, and impactful.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 hover:shadow-card transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waste Categories Preview */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              Categories
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-6 mb-4 text-foreground">
              Waste Classification Types
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI system classifies waste into three main categories for proper disposal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {wasteCategories.map((category, index) => (
              <div 
                key={category.type}
                className="group relative overflow-hidden rounded-2xl bg-card shadow-card hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={`${category.type} waste`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{category.icon}</span>
                    <h3 className={`font-bold text-xl text-${category.color}`}>
                      {category.type}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    {category.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <span 
                        key={item}
                        className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/categories">
                View All Categories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-background rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-background rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Recycle className="h-16 w-16 mx-auto mb-6 text-primary-foreground animate-spin-slow" />
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Join thousands of users who are helping create a cleaner planet through smart waste segregation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="xl" className="bg-background text-foreground hover:bg-background/90">
              <Link to="/upload">
                Start Sorting Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="heroOutline" size="xl">
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
