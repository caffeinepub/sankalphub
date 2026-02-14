import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@tanstack/react-router';
import { Calculator, Calendar, TrendingUp, Minimize2, ImagePlus } from 'lucide-react';
import { ROUTES } from '../../routes';

interface RelatedTool {
  title: string;
  description: string;
  icon: typeof Calculator;
  route: string;
}

interface RelatedToolsProps {
  currentTool: string;
}

export function RelatedTools({ currentTool }: RelatedToolsProps) {
  const allTools: Record<string, RelatedTool> = {
    emi: { title: 'EMI Calculator', description: 'Calculate loan EMI', icon: Calculator, route: ROUTES.EMI_CALCULATOR },
    age: { title: 'Age Calculator', description: 'Calculate your age', icon: Calendar, route: ROUTES.AGE_CALCULATOR },
    sip: { title: 'SIP Calculator', description: 'Calculate SIP returns', icon: TrendingUp, route: ROUTES.SIP_CALCULATOR },
    imageCompressor: { title: 'Image Compressor', description: 'Reduce image size', icon: Minimize2, route: ROUTES.IMAGE_COMPRESSOR },
    jpgToPdf: { title: 'JPG to PDF', description: 'Convert images to PDF', icon: ImagePlus, route: ROUTES.IMAGE_TO_PDF },
  };

  // Filter out the current tool
  const relatedTools = Object.entries(allTools)
    .filter(([key]) => key !== currentTool)
    .map(([, tool]) => tool);

  return (
    <div className="mt-12 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-6">Related Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {relatedTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link key={tool.title} to={tool.route}>
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 border group h-full">
                <CardHeader className="p-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-base">{tool.title}</CardTitle>
                  <CardDescription className="text-xs">{tool.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
