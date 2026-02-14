import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Image, Calculator, Zap, Shield, Sparkles } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { ROUTES } from '../routes';

export function HomePage() {
  const toolCategories = [
    {
      title: 'PDF Tools',
      description: 'Merge, split, compress, and convert PDFs',
      icon: FileText,
      color: 'text-blue-500',
      route: ROUTES.PDF_TOOLS,
    },
    {
      title: 'Image Tools',
      description: 'Compress, resize, and convert images',
      icon: Image,
      color: 'text-green-500',
      route: ROUTES.IMAGE_TOOLS,
    },
    {
      title: 'Calculators',
      description: 'EMI, GST, BMI, Age, and more calculators',
      icon: Calculator,
      color: 'text-purple-500',
      route: ROUTES.CALCULATORS,
    },
  ];

  return (
    <>
      {/* Hero Section with Gradient Background */}
      <section className="relative -mt-12 -mx-4 px-4 pt-20 pb-16 mb-16 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 dark:from-blue-950 dark:via-purple-950 dark:to-blue-900" />
        
        {/* Overlay Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
        
        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
            All-in-One Free Online Tools
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            Convert, Compress, Edit PDFs & Images in Seconds
          </p>
          <Button 
            size="lg" 
            asChild
            className="bg-white text-blue-900 hover:bg-blue-50 font-semibold px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <Link to={ROUTES.ALL_TOOLS}>Explore Tools</Link>
          </Button>
        </div>
      </section>

      {/* Tool Categories Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {toolCategories.map((category) => {
          const Icon = category.icon;
          return (
            <Link key={category.title} to={category.route}>
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2 border-2 group h-full">
                <CardHeader>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className={`w-8 h-8 ${category.color}`} />
                  </div>
                  <CardTitle className="text-2xl">{category.title}</CardTitle>
                  <CardDescription className="text-base">{category.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 md:p-12 shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose SankalpHub?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Fast & Efficient</h3>
            <p className="text-sm text-muted-foreground">
              Process your files quickly with our optimized tools
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Secure & Private</h3>
            <p className="text-sm text-muted-foreground">
              Your files are processed securely and never stored
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h3 className="font-semibold text-lg mb-2">100% Free</h3>
            <p className="text-sm text-muted-foreground">
              All tools are completely free with no hidden charges
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
