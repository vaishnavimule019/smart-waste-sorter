import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Recycle, Leaf, AlertTriangle, CheckCircle } from 'lucide-react';
import recyclableImage from '@/assets/recyclable-waste.jpg';
import organicImage from '@/assets/organic-waste.jpg';
import hazardousImage from '@/assets/hazardous-waste.jpg';

const categories = [
  {
    id: 'recyclable',
    title: 'Recyclable Waste',
    icon: '♻️',
    color: 'recyclable',
    image: recyclableImage,
    description: 'Materials that can be processed and transformed into new products, reducing the need for raw materials and conserving natural resources.',
    items: [
      { name: 'Plastic Bottles', tip: 'Rinse and remove caps before recycling' },
      { name: 'Paper & Cardboard', tip: 'Keep dry and flatten boxes' },
      { name: 'Metal Cans', tip: 'Rinse out food residue' },
      { name: 'Glass Containers', tip: 'Remove lids and rinse clean' },
      { name: 'Aluminum Foil', tip: 'Clean and ball up for recycling' },
    ],
    disposal: 'Place in green recycling bin. Ensure items are clean, dry, and free from food contamination.',
    benefits: ['Reduces landfill waste', 'Conserves natural resources', 'Saves energy', 'Reduces pollution'],
  },
  {
    id: 'organic',
    title: 'Organic Waste',
    icon: '🌱',
    color: 'organic',
    image: organicImage,
    description: 'Biodegradable waste from plants or animals that can be composted to create nutrient-rich soil for gardens and agriculture.',
    items: [
      { name: 'Food Scraps', tip: 'Fruit peels, vegetable trimmings, leftovers' },
      { name: 'Garden Waste', tip: 'Leaves, grass clippings, small branches' },
      { name: 'Coffee Grounds', tip: 'Include filters, excellent for composting' },
      { name: 'Eggshells', tip: 'Crush for faster decomposition' },
      { name: 'Tea Bags', tip: 'Remove staples if present' },
    ],
    disposal: 'Use brown compost bin or home composting system. Avoid adding meat, dairy, or oily foods.',
    benefits: ['Creates nutrient-rich compost', 'Reduces methane emissions', 'Improves soil health', 'Supports plant growth'],
  },
  {
    id: 'hazardous',
    title: 'Hazardous Waste',
    icon: '⚠️',
    color: 'hazardous',
    image: hazardousImage,
    description: 'Waste that poses substantial or potential threats to public health or the environment, requiring special handling and disposal.',
    items: [
      { name: 'Batteries', tip: 'Never throw in regular trash, can leak toxic chemicals' },
      { name: 'Electronic Waste', tip: 'Old phones, computers, TVs contain toxic materials' },
      { name: 'Chemicals', tip: 'Paints, solvents, pesticides need special disposal' },
      { name: 'Light Bulbs', tip: 'CFLs and fluorescents contain mercury' },
      { name: 'Medical Waste', tip: 'Needles, medications require special handling' },
    ],
    disposal: 'Take to designated hazardous waste collection centers. Never mix with regular trash or pour down drains.',
    benefits: ['Prevents soil contamination', 'Protects water sources', 'Ensures public safety', 'Allows safe material recovery'],
    warning: 'Improper disposal of hazardous waste can cause serious environmental damage and health risks.',
  },
];

const Categories = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 text-center">
          <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Waste Types
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mt-6 mb-4 text-foreground">
            Waste Categories
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Learn about the three main categories of waste and how to properly dispose of each type 
            for a cleaner, more sustainable environment.
          </p>
        </div>
      </section>

      {/* Categories Detail */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            {categories.map((category, index) => (
              <div 
                key={category.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative rounded-2xl overflow-hidden shadow-lg">
                    <img 
                      src={category.image} 
                      alt={category.title}
                      className="w-full aspect-[4/3] object-cover"
                    />
                    <div className={`absolute top-4 left-4 px-4 py-2 rounded-full ${
                      category.color === 'recyclable' ? 'bg-recyclable' :
                      category.color === 'organic' ? 'bg-organic' : 'bg-hazardous'
                    } text-primary-foreground font-medium flex items-center gap-2`}>
                      <span className="text-xl">{category.icon}</span>
                      {category.title}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h2 className={`text-3xl font-bold mb-4 ${
                    category.color === 'recyclable' ? 'text-recyclable' :
                    category.color === 'organic' ? 'text-organic' : 'text-hazardous'
                  }`}>
                    {category.title}
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Warning for Hazardous */}
                  {category.warning && (
                    <div className="p-4 rounded-xl bg-hazardous/10 border border-hazardous/20 mb-6">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-hazardous shrink-0 mt-0.5" />
                        <p className="text-sm text-hazardous">{category.warning}</p>
                      </div>
                    </div>
                  )}

                  {/* Items */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-foreground mb-3">Common Items:</h3>
                    <div className="space-y-2">
                      {category.items.map((item) => (
                        <div 
                          key={item.name}
                          className="p-3 rounded-lg bg-muted/50 flex items-start gap-3"
                        >
                          <CheckCircle className={`h-5 w-5 shrink-0 mt-0.5 ${
                            category.color === 'recyclable' ? 'text-recyclable' :
                            category.color === 'organic' ? 'text-organic' : 'text-hazardous'
                          }`} />
                          <div>
                            <p className="font-medium text-foreground text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.tip}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Disposal */}
                  <div className="p-4 rounded-xl bg-card border border-border mb-6">
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      {category.color === 'recyclable' ? <Recycle className="h-4 w-4 text-recyclable" /> :
                       category.color === 'organic' ? <Leaf className="h-4 w-4 text-organic" /> :
                       <AlertTriangle className="h-4 w-4 text-hazardous" />}
                      Disposal Instructions
                    </h3>
                    <p className="text-sm text-muted-foreground">{category.disposal}</p>
                  </div>

                  {/* Benefits */}
                  <div className="flex flex-wrap gap-2">
                    {category.benefits.map((benefit) => (
                      <span 
                        key={benefit}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          category.color === 'recyclable' ? 'bg-recyclable/10 text-recyclable' :
                          category.color === 'organic' ? 'bg-organic/10 text-organic' : 
                          'bg-hazardous/10 text-hazardous'
                        }`}
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
            Not Sure Which Category?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Upload an image of your waste and let our AI classify it instantly.
          </p>
          <Button asChild variant="hero" size="lg">
            <Link to="/upload">
              Try AI Classification
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Categories;
