import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight,
  Recycle,
  Leaf,
  TreePine,
  Droplets,
  Wind,
  Building,
  TrendingUp,
  Users,
  Target
} from 'lucide-react';

const impactStats = [
  {
    icon: Recycle,
    value: '8.5+',
    unit: 'Tons',
    label: 'Waste Properly Sorted',
    description: 'Total waste correctly classified and directed to appropriate disposal.',
  },
  {
    icon: TreePine,
    value: '120+',
    unit: 'Trees',
    label: 'Equivalent Saved',
    description: 'Environmental impact equivalent to preserving trees.',
  },
  {
    icon: Droplets,
    value: '45K',
    unit: 'Liters',
    label: 'Water Protected',
    description: 'Clean water sources protected from contamination.',
  },
  {
    icon: Wind,
    value: '2.3',
    unit: 'Tons CO₂',
    label: 'Emissions Reduced',
    description: 'Carbon dioxide emissions prevented through proper recycling.',
  },
];

const benefits = [
  {
    icon: Recycle,
    title: 'Improves Recycling Efficiency',
    description: 'Accurate classification ensures recyclable materials actually get recycled, not sent to landfills.',
    stat: '40% more materials recycled',
  },
  {
    icon: Leaf,
    title: 'Reduces Landfill Waste',
    description: 'Proper segregation diverts organic waste to composting and recyclables to processing facilities.',
    stat: '60% less landfill volume',
  },
  {
    icon: Users,
    title: 'Encourages Eco-Friendly Behavior',
    description: 'Easy-to-use system motivates more people to participate in sustainable waste management.',
    stat: '85% user engagement',
  },
  {
    icon: Building,
    title: 'Supports Smart Cities',
    description: 'Integrates with urban infrastructure to create more sustainable and cleaner communities.',
    stat: 'Smart city ready',
  },
];

const sdgGoals = [
  { number: 11, title: 'Sustainable Cities', color: 'bg-orange-500' },
  { number: 12, title: 'Responsible Consumption', color: 'bg-amber-600' },
  { number: 13, title: 'Climate Action', color: 'bg-green-700' },
  { number: 14, title: 'Life Below Water', color: 'bg-blue-500' },
  { number: 15, title: 'Life on Land', color: 'bg-green-500' },
];

const Impact = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 text-center">
          <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Making a Difference
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mt-6 mb-4 text-foreground">
            Environmental Impact
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how our AI-powered waste segregation system is contributing to 
            a cleaner, greener planet through smarter waste management.
          </p>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat) => (
              <div 
                key={stat.label}
                className="p-6 rounded-2xl bg-card border border-border/50 hover:shadow-card transition-shadow text-center"
              >
                <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-foreground">{stat.value}</span>
                  <span className="text-xl font-medium text-primary ml-1">{stat.unit}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-1">{stat.label}</h3>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Score */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  Sustainability Score
                </span>
                <h2 className="text-3xl font-bold mt-6 mb-4 text-foreground">
                  Our Environmental Rating
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Based on total waste processed, recycling rates, and environmental 
                  protection metrics, our system has achieved an outstanding sustainability score.
                </p>
                <div className="flex items-center gap-4">
                  <Target className="h-12 w-12 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Current Score</p>
                    <p className="text-3xl font-bold text-primary">94/100</p>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-card border border-border shadow-card">
                <h3 className="font-semibold text-foreground mb-6 text-center">Score Breakdown</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Recycling Rate', value: 95, color: 'bg-recyclable' },
                    { label: 'Composting Efficiency', value: 88, color: 'bg-organic' },
                    { label: 'Hazardous Safety', value: 98, color: 'bg-hazardous' },
                    { label: 'User Engagement', value: 92, color: 'bg-primary' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-medium text-foreground">{item.value}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${item.color}`}
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              How We Make an Impact
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our system creates positive environmental change through multiple channels.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit) => (
              <div 
                key={benefit.title}
                className="flex gap-6 p-6 rounded-2xl bg-card border border-border/50 hover:shadow-card transition-shadow"
              >
                <div className="shrink-0">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{benefit.description}</p>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    <TrendingUp className="h-3 w-3" />
                    {benefit.stat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDG Goals */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Supporting UN Sustainable Development Goals
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Our project aligns with and supports multiple UN SDGs for global sustainability.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {sdgGoals.map((goal) => (
              <div 
                key={goal.number}
                className={`${goal.color} px-6 py-4 rounded-xl text-center min-w-[140px]`}
              >
                <span className="text-3xl font-bold text-primary-foreground block">
                  {goal.number}
                </span>
                <span className="text-xs text-primary-foreground/90 font-medium">
                  {goal.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <Leaf className="h-12 w-12 mx-auto mb-4 text-primary-foreground" />
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Join the Movement
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Every waste item properly classified makes a difference. 
            Start your contribution to a cleaner planet today.
          </p>
          <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90">
            <Link to="/upload">
              Start Making Impact
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Impact;
