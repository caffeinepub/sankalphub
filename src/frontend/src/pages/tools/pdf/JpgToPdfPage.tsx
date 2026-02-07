import { useState } from 'react';
import { ToolShell } from '../../../components/tools/ToolShell';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { createPdfFromImages } from '../../../utils/pdf';
import { downloadBlob, getTimestampedFilename } from '../../../utils/download';

export function JpgToPdfPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ blob: Blob; summary: string } | null>(null);
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(selectedFiles);
    setResult(null);
    setError('');
  };

  const handleConvert = async () => {
    if (files.length === 0) {
      setError('Please select at least one image');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await createPdfFromImages(files);
      setResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert images to PDF');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      downloadBlob(result.blob, getTimestampedFilename('converted', 'pdf'));
    }
  };

  return (
    <ToolShell
      title="JPG to PDF Converter"
      description="Convert one or more JPG/JPEG images into a single PDF document"
      actionButton={{
        label: 'Convert to PDF',
        onClick: handleConvert,
        disabled: files.length === 0,
      }}
      isLoading={isLoading}
      loadingText="Converting images to PDF..."
      result={
        result || error
          ? {
              content: error ? (
                <p className="text-destructive">{error}</p>
              ) : (
                <div className="space-y-3">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Demo mode: This creates a placeholder file. Full PDF processing requires pdf-lib library.
                    </AlertDescription>
                  </Alert>
                  <p className="text-foreground">{result?.summary}</p>
                  <p className="text-sm text-muted-foreground">
                    Your PDF is ready to download
                  </p>
                </div>
              ),
            }
          : undefined
      }
      download={
        result
          ? {
              onClick: handleDownload,
              label: 'Download PDF',
            }
          : undefined
      }
    >
      <div className="space-y-2">
        <Label htmlFor="images">Select Images (JPG/JPEG)</Label>
        <Input
          id="images"
          type="file"
          accept="image/jpeg,image/jpg"
          multiple
          onChange={handleFileChange}
        />
        {files.length > 0 && (
          <p className="text-sm text-muted-foreground">
            {files.length} image{files.length > 1 ? 's' : ''} selected
          </p>
        )}
      </div>
    </ToolShell>
  );
}
