import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FilePlus, Scissors, Minimize2, FileImage, ImagePlus } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { ROUTES } from '../routes';

interface Tool {
  title: string;
  description: string;
  icon: typeof FilePlus;
  color: string;
  route: string;
}

export function PdfToolsPage() {
  const tools: Tool[] = [
    { title: 'Merge PDF', description: 'Combine multiple PDFs into one', icon: FilePlus, color: 'text-blue-500', route: ROUTES.PDF_MERGE },
    { title: 'Split PDF', description: 'Split PDF by pages', icon: Scissors, color: 'text-purple-500', route: ROUTES.PDF_SPLIT },
    { title: 'Compress PDF', description: 'Reduce PDF file size', icon: Minimize2, color: 'text-green-500', route: ROUTES.COMPRESS_PDF },
    { title: 'PDF to Image', description: 'Convert PDF to images', icon: FileImage, color: 'text-orange-500', route: ROUTES.PDF_TO_IMAGE },
    { title: 'JPG to PDF', description: 'Convert images to PDF', icon: ImagePlus, color: 'text-pink-500', route: ROUTES.IMAGE_TO_PDF },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">PDF Tools</h1>
        <p className="text-muted-foreground">Professional PDF tools for all your needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link key={tool.title} to={tool.route}>
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2 border-2 group h-full">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Icon className={`w-7 h-7 ${tool.color}`} />
                  </div>
                  <CardTitle className="text-xl">{tool.title}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
