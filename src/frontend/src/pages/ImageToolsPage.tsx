import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Minimize2, Maximize2, FileImage, Image as ImageIcon, RefreshCw } from 'lucide-react';
import { ROUTES } from '../routes';

export function ImageToolsPage({ onNavigate }: { onNavigate: (path: string) => void }) {
  const tools = [
    { 
      title: 'Compress Image', 
      description: 'Reduce image file size', 
      route: ROUTES.IMAGE_COMPRESSOR,
      icon: Minimize2,
      color: 'text-green-500'
    },
    { 
      title: 'Resize Image', 
      description: 'Resize images to custom dimensions', 
      route: ROUTES.IMAGE_RESIZER,
      icon: Maximize2,
      color: 'text-blue-500'
    },
    { 
      title: 'JPG to PNG', 
      description: 'Convert JPG images to PNG format', 
      route: ROUTES.JPG_TO_PNG,
      icon: FileImage,
      color: 'text-purple-500'
    },
    { 
      title: 'PNG to JPG', 
      description: 'Convert PNG images to JPG format', 
      route: ROUTES.PNG_TO_JPG,
      icon: ImageIcon,
      color: 'text-orange-500'
    },
    { 
      title: 'Image Converter', 
      description: 'Convert images between formats', 
      route: ROUTES.IMAGE_CONVERTER,
      icon: RefreshCw,
      color: 'text-pink-500'
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Image Tools</h1>
        <p className="text-muted-foreground">Compress, resize, and convert images</p>
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
