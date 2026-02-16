import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LoadingIndicator } from '@/components/tools/LoadingIndicator';
import { compressPdf } from '@/utils/pdf';
import { downloadBlob } from '@/utils/download';
import { FileText, Info } from 'lucide-react';

export function CompressPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ blob: Blob; summary: string } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setResult(null);
    }
  };

  const handleCompress = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const compressed = await compressPdf(file);
      setResult(compressed);
    } catch (error) {
      console.error('Compression failed:', error);
      alert('Failed to compress PDF. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      downloadBlob(result.blob, 'compressed.pdf');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Free Compress PDF Tool</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Compress PDF files and reduce file size instantly with our free compress PDF tool. Reduce PDF file size while maintaining quality for easier sharing, faster uploads, and storage savings. This compress PDF tool optimizes your documents without compromising readability or visual quality.
        </p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          This is a demo version. Full PDF compression requires the pdf-lib library.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Upload PDF</CardTitle>
          <CardDescription>Select a PDF file to compress</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pdf-file">PDF File</Label>
            <Input
              id="pdf-file"
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              disabled={isProcessing}
            />
          </div>

          {file && (
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <FileText className="w-5 h-5 text-blue-500" />
              <span className="text-sm">{file.name}</span>
            </div>
          )}

          <Button onClick={handleCompress} disabled={!file || isProcessing} className="w-full">
            {isProcessing ? 'Compressing...' : 'Compress PDF'}
          </Button>

          {isProcessing && <LoadingIndicator text="Compressing PDF..." />}

          {result && (
            <div className="space-y-4 pt-4 border-t">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-200">{result.summary}</p>
              </div>
              <Button onClick={handleDownload} className="w-full">
                Download Compressed PDF
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
