import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight,
  Code,
  Database,
  Brain,
  Eye,
  Server,
  Layers,
  Cpu,
  Cloud
} from 'lucide-react';

const techStack = [
  {
    name: 'Python',
    icon: Code,
    category: 'Backend',
    description: 'Primary programming language for AI model development and data processing.',
    version: '3.11+',
    color: 'primary',
  },
  {
    name: 'CNN',
    icon: Brain,
    category: 'AI/ML',
    description: 'Convolutional Neural Network architecture for accurate image classification.',
    version: 'Custom Model',
    color: 'accent',
  },
  {
    name: 'TensorFlow',
    icon: Layers,
    category: 'AI Framework',
    description: 'Deep learning framework powering our waste classification model.',
    version: '2.x',
    color: 'primary',
  },
  {
    name: 'OpenCV',
    icon: Eye,
    category: 'Computer Vision',
    description: 'Image processing library for preprocessing and augmentation.',
    version: '4.x',
    color: 'accent',
  },
  {
    name: 'FastAPI',
    icon: Server,
    category: 'Backend API',
    description: 'Modern, fast web framework for building APIs with automatic documentation.',
    version: '0.100+',
    color: 'primary',
  },
  {
    name: 'React',
    icon: Code,
    category: 'Frontend',
    description: 'Modern JavaScript library for building responsive user interfaces.',
    version: '18.x',
    color: 'accent',
  },
  {
    name: 'PostgreSQL',
    icon: Database,
    category: 'Database',
    description: 'Robust relational database for storing analytics and user data.',
    version: '15+',
    color: 'primary',
  },
  {
    name: 'Cloud Services',
    icon: Cloud,
    category: 'Infrastructure',
    description: 'Scalable cloud infrastructure for model deployment and API hosting.',
    version: 'AWS/GCP',
    color: 'accent',
  },
];

const aiFeatures = [
  {
    title: 'Image Preprocessing',
    description: 'Automatic image resizing, normalization, and augmentation for optimal model input.',
  },
  {
    title: 'Feature Extraction',
    description: 'Multiple convolutional layers extract visual features from waste images.',
  },
  {
    title: 'Classification',
    description: 'Softmax layer provides probability distribution across waste categories.',
  },
  {
    title: 'Confidence Scoring',
    description: 'Model outputs confidence percentage for prediction reliability.',
  },
];

const Technology = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 text-center">
          <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Under the Hood
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mt-6 mb-4 text-foreground">
            Technology Stack
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built with cutting-edge technologies and AI frameworks to deliver 
            accurate, fast, and reliable waste classification.
          </p>
        </div>
      </section>

      {/* Tech Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((tech) => (
              <div 
                key={tech.name}
                className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-card transition-all duration-300"
              >
                <div className={`p-3 rounded-xl ${
                  tech.color === 'primary' ? 'bg-primary/10' : 'bg-accent/10'
                } w-fit mb-4 group-hover:scale-110 transition-transform`}>
                  <tech.icon className={`h-6 w-6 ${
                    tech.color === 'primary' ? 'text-primary' : 'text-accent'
                  }`} />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-lg text-foreground">{tech.name}</h3>
                  <span className="px-2 py-0.5 bg-muted rounded text-xs text-muted-foreground">
                    {tech.version}
                  </span>
                </div>
                <span className="text-xs font-medium text-primary uppercase tracking-wide">
                  {tech.category}
                </span>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Model Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                AI Model
              </span>
              <h2 className="text-3xl font-bold mt-6 mb-4 text-foreground">
                Convolutional Neural Network
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Our custom CNN model is specifically trained for waste classification. 
                With multiple convolutional layers and a carefully curated dataset of 50,000+ 
                waste images, it achieves 95%+ accuracy in identifying waste types.
              </p>

              <div className="space-y-4">
                {aiFeatures.map((feature, index) => (
                  <div 
                    key={feature.title}
                    className="flex gap-4 p-4 rounded-xl bg-card border border-border/50"
                  >
                    <div className="shrink-0 w-8 h-8 rounded-lg gradient-hero flex items-center justify-center text-primary-foreground font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="p-8 rounded-2xl bg-card border border-border shadow-card">
                <div className="flex items-center justify-center gap-4 mb-8">
                  <Cpu className="h-12 w-12 text-primary" />
                  <div>
                    <h3 className="font-bold text-xl text-foreground">AI Model Status</h3>
                    <p className="text-sm text-muted-foreground">Production Ready</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Model Accuracy</span>
                      <span className="font-medium text-foreground">95.7%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-[95.7%] bg-primary rounded-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Processing Speed</span>
                      <span className="font-medium text-foreground">~1.2s</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-[88%] bg-accent rounded-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Dataset Size</span>
                      <span className="font-medium text-foreground">50K+ Images</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-[100%] gradient-hero rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    System operational and ready for analysis
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
            System Architecture
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-12">
            A modern, scalable architecture designed for reliability and performance.
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              {['Frontend', 'API Gateway', 'AI Model', 'Database'].map((item, index) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="px-6 py-4 rounded-xl bg-card border border-border shadow-soft">
                    <span className="font-semibold text-foreground">{item}</span>
                  </div>
                  {index < 3 && (
                    <ArrowRight className="h-5 w-5 text-primary hidden md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
            See the Technology in Action
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Experience our AI-powered waste classification system firsthand.
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/upload">
              Try It Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Technology;
