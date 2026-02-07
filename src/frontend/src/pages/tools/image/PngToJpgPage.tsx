import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingIndicator } from '@/components/tools/LoadingIndicator';
import { convertPngToJpg } from '@/utils/image';
import { downloadBlob } from '@/utils/download';
import { Image } from 'lucide-react';

export function PngToJpgPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ blob: Blob } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'image/png') {
      setFile(selectedFile);
      setResult(null);
    }
  };

  const handleConvert = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const converted = await convertPngToJpg(file);
      setResult(converted);
    } catch (error) {
      console.error('Conversion failed:', error);
      alert('Failed to convert image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      const filename = file?.name.replace(/\.png$/i, '.jpg') || 'converted.jpg';
      downloadBlob(result.blob, filename);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">PNG to JPG</h1>
        <p className="text-muted-foreground">Convert PNG images to JPG format</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload PNG Image</CardTitle>
          <CardDescription>Select a PNG file to convert to JPG</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="png-file">PNG File</Label>
            <Input
              id="png-file"
              type="file"
              accept=".png,image/png"
              onChange={handleFileChange}
              disabled={isProcessing}
            />
          </div>

          {file && (
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <Image className="w-5 h-5 text-green-500" />
              <span className="text-sm">{file.name}</span>
            </div>
          )}

          <Button onClick={handleConvert} disabled={!file || isProcessing} className="w-full">
            {isProcessing ? 'Converting...' : 'Convert to JPG'}
          </Button>

          {isProcessing && <LoadingIndicator text="Converting PNG to JPG..." />}

          {result && (
            <div className="space-y-4 pt-4 border-t">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-200">
                  Successfully converted to JPG format
                </p>
              </div>
              <Button onClick={handleDownload} className="w-full">
                Download JPG
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
