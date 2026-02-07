import { useState } from 'react';
import { ToolShell } from '../../../components/tools/ToolShell';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { convertJpgToPng } from '../../../utils/image';
import { downloadBlob, getTimestampedFilename } from '../../../utils/download';

export function JpgToPngPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ blob: Blob } | null>(null);
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setResult(null);
    setError('');
  };

  const handleConvert = async () => {
    if (!file) {
      setError('Please select a JPG/JPEG image');
      return;
    }

    if (!file.type.includes('jpeg') && !file.type.includes('jpg')) {
      setError('Please select a valid JPG/JPEG file');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await convertJpgToPng(file);
      setResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert image');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      downloadBlob(result.blob, getTimestampedFilename('converted', 'png'));
    }
  };

  return (
    <ToolShell
      title="JPG to PNG Converter"
      description="Convert JPG/JPEG images to PNG format"
      actionButton={{
        label: 'Convert to PNG',
        onClick: handleConvert,
        disabled: !file,
      }}
      isLoading={isLoading}
      loadingText="Converting to PNG..."
      result={
        result || error
          ? {
              content: error ? (
                <p className="text-destructive">{error}</p>
              ) : (
                <div className="space-y-2">
                  <p className="text-foreground font-semibold">Conversion Complete!</p>
                  <p className="text-sm text-muted-foreground">
                    Your image has been converted to PNG format
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
              label: 'Download PNG',
            }
          : undefined
      }
    >
      <div className="space-y-2">
        <Label htmlFor="image">Select JPG/JPEG Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/jpeg,image/jpg"
          onChange={handleFileChange}
        />
        {file && (
          <p className="text-sm text-muted-foreground">{file.name}</p>
        )}
      </div>
    </ToolShell>
  );
}
