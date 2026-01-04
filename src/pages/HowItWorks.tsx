import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Camera, 
  Brain, 
  Recycle, 
  Info, 
  ArrowRight,
  CheckCircle,
  Upload,
  Cpu,
  BarChart3,
  FileCheck
} from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Camera,
    title: 'Image Input',
    emoji: '📸',
    description: 'Take a photo or upload an image of your waste item using our simple interface.',
    details: [
      'Supports JPG, PNG, and WEBP formats',
      'Camera capture on mobile devices',
      'Drag and drop file upload',
      'Max file size: 10MB',
    ],
  },
  {
    number: '02',
    icon: Brain,
    title: 'AI Analysis',
    emoji: '🧠',
    description: 'Our advanced CNN model processes the image and identifies the waste type.',
    details: [
      'Convolutional Neural Network',
      'Trained on 50,000+ waste images',
      'Real-time image processing',
      'High accuracy classification',
    ],
  },
  {
    number: '03',
    icon: Recycle,
    title: 'Waste Classification',
    emoji: '♻️',
    description: 'The system categorizes your waste into Recyclable, Organic, or Hazardous.',
    details: [
      'Three main waste categories',
      'Confidence score provided',
      'Visual category indicators',
      'Detailed item recognition',
    ],
  },
  {
    number: '04',
    icon: Info,
    title: 'Disposal Guidance',
    emoji: '🗑️',
    description: 'Receive clear instructions on how to properly dispose of your waste.',
    details: [
      'Specific disposal methods',
      'Location recommendations',
      'Environmental tips',
      'Safety precautions',
    ],
  },
];

const features = [
  {
    icon: Upload,
    title: 'Easy Upload',
    description: 'Simple drag-and-drop interface for quick image uploads.',
  },
  {
    icon: Cpu,
    title: 'Fast Processing',
    description: 'Results in seconds thanks to optimized AI algorithms.',
  },
  {
    icon: BarChart3,
    title: 'High Accuracy',
    description: '95%+ accuracy rate in waste classification.',
  },
  {
    icon: FileCheck,
    title: 'Detailed Reports',
    description: 'Comprehensive disposal instructions for each category.',
  },
];

const HowItWorks = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 text-center">
          <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            The Process
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mt-6 mb-4 text-foreground">
            How It Works
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered system makes waste segregation simple and accurate. 
            Follow these four easy steps to properly classify and dispose of your waste.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className="relative pb-16 last:pb-0"
              >
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-primary to-primary/20 hidden md:block" />
                )}

                <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                  {/* Icon */}
                  <div className="shrink-0">
                    <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center shadow-glow">
                      <step.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-4xl">{step.emoji}</span>
                      <div>
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">
                          Step {step.number}
                        </span>
                        <h3 className="text-2xl font-bold text-foreground">{step.title}</h3>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-3">
                      {step.details.map((detail) => (
                        <div 
                          key={detail}
                          className="flex items-center gap-2 p-3 rounded-lg bg-muted/50"
                        >
                          <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                          <span className="text-sm text-foreground">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Why Our System Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Built with cutting-edge technology to make waste segregation effortless.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div 
                key={feature.title}
                className="p-6 rounded-2xl bg-card border border-border/50 hover:shadow-card transition-shadow"
              >
                <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
            Ready to Try It?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Upload your first waste image and experience the power of AI-driven classification.
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/upload">
              Start Analyzing
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default HowItWorks;
