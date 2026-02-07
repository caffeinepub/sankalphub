import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, FilePlus, Scissors, Minimize2, FileImage, ImagePlus } from 'lucide-react';
import { ROUTES } from '../routes';

export function PdfToolsPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  const tools = [
    { 
      title: 'Merge PDF', 
      description: 'Combine multiple PDF files into one', 
      route: ROUTES.PDF_MERGE,
      icon: FilePlus,
      color: 'text-blue-500'
    },
    { 
      title: 'Split PDF', 
      description: 'Split PDF into separate pages', 
      route: ROUTES.PDF_SPLIT,
      icon: Scissors,
      color: 'text-purple-500'
    },
    { 
      title: 'Compress PDF', 
      description: 'Reduce PDF file size', 
      route: ROUTES.COMPRESS_PDF,
      icon: Minimize2,
      color: 'text-green-500'
    },
    { 
      title: 'PDF to Image', 
      description: 'Convert PDF pages to images', 
      route: ROUTES.PDF_TO_IMAGE,
      icon: FileImage,
      color: 'text-orange-500'
    },
    { 
      title: 'Image to PDF', 
      description: 'Convert images to PDF format', 
      route: ROUTES.IMAGE_TO_PDF,
      icon: ImagePlus,
      color: 'text-pink-500'
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">PDF Tools</h1>
        <p className="text-muted-foreground">Convert, merge, split, and compress PDF files</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Card
              key={tool.title}
              className="hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2 border-2 group"
              onClick={() => onNavigate(tool.route)}
            >
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Icon className={`w-7 h-7 ${tool.color}`} />
                </div>
                <CardTitle className="text-xl">{tool.title}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
