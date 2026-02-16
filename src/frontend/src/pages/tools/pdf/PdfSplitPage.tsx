import { useState } from 'react';
import { ToolShell } from '../../../components/tools/ToolShell';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { splitPdf } from '../../../utils/pdf';
import { downloadBlob, getTimestampedFilename } from '../../../utils/download';

export function PdfSplitPage() {
  const [file, setFile] = useState<File | null>(null);
  const [startPage, setStartPage] = useState<string>('1');
  const [endPage, setEndPage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ blobs: Blob[]; summary: string } | null>(null);
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setResult(null);
    setError('');
  };

  const handleSplit = async () => {
    if (!file) {
      setError('Please select a PDF file');
      return;
    }

    const start = parseInt(startPage);
    const end = parseInt(endPage);

    if (isNaN(start) || isNaN(end) || start < 1 || end < start) {
      setError('Please enter valid page numbers (start must be less than or equal to end)');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await splitPdf(file, [{ start, end }]);
      setResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to split PDF');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (result && result.blobs.length > 0) {
      downloadBlob(result.blobs[0], getTimestampedFilename('split', 'pdf'));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Free Split PDF Tool</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Split PDF files and extract specific pages instantly with our free split PDF tool. Select page ranges to extract from your PDF document and create new files. This split PDF tool is perfect for separating chapters, extracting important pages, or dividing large documents into smaller, manageable files.
        </p>
      </div>
      
      <ToolShell
        title=""
        description=""
        actionButton={{
          label: 'Split PDF',
          onClick: handleSplit,
          disabled: !file || !startPage || !endPage,
        }}
        isLoading={isLoading}
        loadingText="Splitting PDF..."
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
                      Your split PDF is ready to download
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
                label: 'Download Split PDF',
              }
            : undefined
        }
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="pdf">Select PDF File</Label>
            <Input
              id="pdf"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
            />
            {file && (
              <p className="text-sm text-muted-foreground mt-1">{file.name}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startPage">Start Page</Label>
              <Input
                id="startPage"
                type="number"
                min="1"
                placeholder="e.g., 1"
                value={startPage}
                onChange={(e) => setStartPage(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="endPage">End Page</Label>
              <Input
                id="endPage"
                type="number"
                min="1"
                placeholder="e.g., 5"
                value={endPage}
                onChange={(e) => setEndPage(e.target.value)}
              />
            </div>
          </div>
        </div>
      </ToolShell>
    </div>
  );
}
