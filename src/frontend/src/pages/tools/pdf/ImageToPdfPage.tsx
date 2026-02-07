import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LoadingIndicator } from '@/components/tools/LoadingIndicator';
import { createPdfFromImages } from '@/utils/pdf';
import { downloadBlob } from '@/utils/download';
import { Image, Info } from 'lucide-react';

export function ImageToPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ blob: Blob; summary: string } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const imageFiles = selectedFiles.filter((file) =>
      file.type.startsWith('image/')
    );
    setFiles(imageFiles);
    setResult(null);
  };

  const handleConvert = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    try {
      const pdf = await createPdfFromImages(files);
      setResult(pdf);
    } catch (error) {
      console.error('Conversion failed:', error);
      alert('Failed to create PDF. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      downloadBlob(result.blob, 'images-to-pdf.pdf');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Image to PDF</h1>
        <p className="text-muted-foreground">Convert images to PDF format</p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          This is a demo version. Full PDF creation requires the pdf-lib library.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Upload Images</CardTitle>
          <CardDescription>Select one or more images to convert to PDF</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image-files">Image Files</Label>
            <Input
              id="image-files"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              disabled={isProcessing}
            />
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Selected Images ({files.length}):</p>
              <div className="space-y-1">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                    <Image className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{file.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button onClick={handleConvert} disabled={files.length === 0 || isProcessing} className="w-full">
            {isProcessing ? 'Creating PDF...' : 'Create PDF'}
          </Button>

          {isProcessing && <LoadingIndicator text="Creating PDF from images..." />}

          {result && (
            <div className="space-y-4 pt-4 border-t">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-200">{result.summary}</p>
              </div>
              <Button onClick={handleDownload} className="w-full">
                Download PDF
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
