import { useState } from 'react';
import { ToolShell } from '../../../components/tools/ToolShell';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { mergePdfs } from '../../../utils/pdf';
import { downloadBlob, getTimestampedFilename } from '../../../utils/download';

export function PdfMergePage() {
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

  const handleMerge = async () => {
    if (files.length < 2) {
      setError('Please select at least 2 PDF files to merge');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await mergePdfs(files);
      setResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to merge PDFs');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      downloadBlob(result.blob, getTimestampedFilename('merged', 'pdf'));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Free Merge PDF Tool</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Merge multiple PDF files into one document instantly with our free merge PDF tool. Combine PDF files in any order to create a single, organized document. This merge PDF tool is perfect for combining reports, contracts, invoices, or any PDF documents quickly and securely online.
        </p>
      </div>
      
      <ToolShell
        title=""
        description=""
        actionButton={{
          label: 'Merge PDFs',
          onClick: handleMerge,
          disabled: files.length < 2,
        }}
        isLoading={isLoading}
        loadingText="Merging PDF files..."
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
                      Your merged PDF is ready to download
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
                label: 'Download Merged PDF',
              }
            : undefined
        }
      >
        <div className="space-y-2">
          <Label htmlFor="pdfs">Select PDF Files (2 or more)</Label>
          <Input
            id="pdfs"
            type="file"
            accept="application/pdf"
            multiple
            onChange={handleFileChange}
          />
          {files.length > 0 && (
            <p className="text-sm text-muted-foreground">
              {files.length} PDF{files.length > 1 ? 's' : ''} selected
            </p>
          )}
        </div>
      </ToolShell>
    </div>
  );
}
