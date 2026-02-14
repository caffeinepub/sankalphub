import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Minimize2, Maximize2, FileImage, Image as ImageIcon, RefreshCw } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { ROUTES } from '../routes';

interface Tool {
  title: string;
  description: string;
  icon: typeof Minimize2;
  color: string;
  route: string;
}

export function ImageToolsPage() {
  const tools: Tool[] = [
    { title: 'Image Compressor', description: 'Reduce image file size', icon: Minimize2, color: 'text-green-500', route: ROUTES.IMAGE_COMPRESSOR },
    { title: 'Resize Image', description: 'Resize images to any dimension', icon: Maximize2, color: 'text-blue-500', route: ROUTES.IMAGE_RESIZER },
    { title: 'JPG to PNG', description: 'Convert JPG to PNG format', icon: FileImage, color: 'text-purple-500', route: ROUTES.JPG_TO_PNG },
    { title: 'PNG to JPG', description: 'Convert PNG to JPG format', icon: ImageIcon, color: 'text-orange-500', route: ROUTES.PNG_TO_JPG },
    { title: 'Image Converter', description: 'Convert between image formats', icon: RefreshCw, color: 'text-pink-500', route: ROUTES.IMAGE_CONVERTER },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Image Tools</h1>
        <p className="text-muted-foreground">Professional image tools for all your needs</p>
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
