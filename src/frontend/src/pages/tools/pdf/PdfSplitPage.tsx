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
    <ToolShell
      title="PDF Split"
      description="Extract specific pages from a PDF document"
      actionButton={{
        label: 'Split PDF',
        onClick: handleSplit,
        disabled: !file,
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
                    Pages {startPage} to {endPage} extracted successfully
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
        <div className="space-y-2">
          <Label htmlFor="pdf">Select PDF File</Label>
          <Input
            id="pdf"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
          {file && (
            <p className="text-sm text-muted-foreground">{file.name}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startPage">Start Page</Label>
            <Input
              id="startPage"
              type="number"
              min="1"
              value={startPage}
              onChange={(e) => setStartPage(e.target.value)}
              placeholder="1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endPage">End Page</Label>
            <Input
              id="endPage"
              type="number"
              min="1"
              value={endPage}
              onChange={(e) => setEndPage(e.target.value)}
              placeholder="10"
            />
          </div>
        </div>
      </div>
    </ToolShell>
  );
}
