import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingIndicator } from '@/components/tools/LoadingIndicator';
import { convertImage } from '@/utils/image';
import { downloadBlob } from '@/utils/download';
import { Image } from 'lucide-react';

export function ImageConverterPage() {
  const [file, setFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState<'jpeg' | 'png' | 'webp'>('jpeg');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ blob: Blob } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setResult(null);
    }
  };

  const handleConvert = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const converted = await convertImage(file, targetFormat);
      setResult(converted);
    } catch (error) {
      console.error('Conversion failed:', error);
      alert('Failed to convert image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result && file) {
      const extension = targetFormat === 'jpeg' ? 'jpg' : targetFormat;
      const filename = file.name.replace(/\.[^.]+$/, `.${extension}`);
      downloadBlob(result.blob, filename);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Free Image Converter</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Convert images between formats instantly with our free image converter. Support for JPEG, PNG, WebP and more formats. This image converter tool makes it easy to transform images for web optimization, compatibility, or specific project requirements with just a few clicks.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Convert Image</CardTitle>
          <CardDescription>Select an image and choose the output format</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image-file">Image File</Label>
            <Input
              id="image-file"
              type="file"
              accept="image/*"
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

          <div className="space-y-2">
            <Label htmlFor="format">Output Format</Label>
            <Select value={targetFormat} onValueChange={(value) => setTargetFormat(value as 'jpeg' | 'png' | 'webp')}>
              <SelectTrigger id="format">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jpeg">JPEG</SelectItem>
                <SelectItem value="png">PNG</SelectItem>
                <SelectItem value="webp">WebP</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleConvert} disabled={!file || isProcessing} className="w-full">
            {isProcessing ? 'Converting...' : 'Convert Image'}
          </Button>

          {isProcessing && <LoadingIndicator text="Converting image..." />}

          {result && (
            <div className="space-y-4 pt-4 border-t">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-200">
                  Successfully converted to {targetFormat.toUpperCase()} format
                </p>
              </div>
              <Button onClick={handleDownload} className="w-full">
                Download Converted Image
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
