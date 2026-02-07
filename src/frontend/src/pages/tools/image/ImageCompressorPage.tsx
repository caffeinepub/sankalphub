import { useState } from 'react';
import { ToolShell } from '../../../components/tools/ToolShell';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { compressImage } from '../../../utils/image';
import { downloadBlob, getTimestampedFilename } from '../../../utils/download';
import { formatBytes, calculateReduction } from '../../../utils/format';

export function ImageCompressorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState<number>(0.8);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ blob: Blob; originalSize: number; compressedSize: number } | null>(null);
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setResult(null);
    setError('');
  };

  const handleCompress = async () => {
    if (!file) {
      setError('Please select an image');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await compressImage(file, quality);
      setResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to compress image');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      downloadBlob(result.blob, getTimestampedFilename('compressed', 'jpg'));
    }
  };

  return (
    <ToolShell
      title="Image Compressor"
      description="Reduce image file size while maintaining quality"
      actionButton={{
        label: 'Compress Image',
        onClick: handleCompress,
        disabled: !file,
      }}
      isLoading={isLoading}
      loadingText="Compressing image..."
      result={
        result || error
          ? {
              content: error ? (
                <p className="text-destructive">{error}</p>
              ) : (
                <div className="space-y-2">
                  <p className="text-foreground font-semibold">Compression Complete!</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Original Size:</p>
                      <p className="font-medium">{formatBytes(result!.originalSize)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Compressed Size:</p>
                      <p className="font-medium">{formatBytes(result!.compressedSize)}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Reduced by {calculateReduction(result!.originalSize, result!.compressedSize)}%
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
              label: 'Download Compressed Image',
            }
          : undefined
      }
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="image">Select Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {file && (
            <p className="text-sm text-muted-foreground">{file.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="quality">Quality: {Math.round(quality * 100)}%</Label>
          <Slider
            id="quality"
            min={0.1}
            max={1}
            step={0.1}
            value={[quality]}
            onValueChange={(value) => setQuality(value[0])}
          />
          <p className="text-xs text-muted-foreground">
            Lower quality = smaller file size
          </p>
        </div>
      </div>
    </ToolShell>
  );
}
