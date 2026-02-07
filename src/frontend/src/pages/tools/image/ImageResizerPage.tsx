import { useState } from 'react';
import { ToolShell } from '../../../components/tools/ToolShell';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { resizeImage } from '../../../utils/image';
import { downloadBlob, getTimestampedFilename } from '../../../utils/download';

export function ImageResizerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [width, setWidth] = useState<string>('800');
  const [height, setHeight] = useState<string>('600');
  const [maintainAspect, setMaintainAspect] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    blob: Blob;
    originalWidth: number;
    originalHeight: number;
    newWidth: number;
    newHeight: number;
  } | null>(null);
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setResult(null);
    setError('');
  };

  const handleResize = async () => {
    if (!file) {
      setError('Please select an image');
      return;
    }

    const w = parseInt(width);
    const h = parseInt(height);

    if (isNaN(w) || isNaN(h) || w < 1 || h < 1) {
      setError('Please enter valid dimensions');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await resizeImage(file, w, h, maintainAspect);
      setResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resize image');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      const ext = file?.type.split('/')[1] || 'jpg';
      downloadBlob(result.blob, getTimestampedFilename('resized', ext));
    }
  };

  return (
    <ToolShell
      title="Image Resizer"
      description="Resize images to custom dimensions"
      actionButton={{
        label: 'Resize Image',
        onClick: handleResize,
        disabled: !file,
      }}
      isLoading={isLoading}
      loadingText="Resizing image..."
      result={
        result || error
          ? {
              content: error ? (
                <p className="text-destructive">{error}</p>
              ) : (
                <div className="space-y-2">
                  <p className="text-foreground font-semibold">Resize Complete!</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Original:</p>
                      <p className="font-medium">
                        {result!.originalWidth} × {result!.originalHeight}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">New Size:</p>
                      <p className="font-medium">
                        {Math.round(result!.newWidth)} × {Math.round(result!.newHeight)}
                      </p>
                    </div>
                  </div>
                </div>
              ),
            }
          : undefined
      }
      download={
        result
          ? {
              onClick: handleDownload,
              label: 'Download Resized Image',
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

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="width">Width (px)</Label>
            <Input
              id="width"
              type="number"
              min="1"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Height (px)</Label>
            <Input
              id="height"
              type="number"
              min="1"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="aspect"
            checked={maintainAspect}
            onCheckedChange={(checked) => setMaintainAspect(checked === true)}
          />
          <Label htmlFor="aspect" className="cursor-pointer">
            Maintain aspect ratio
          </Label>
        </div>
      </div>
    </ToolShell>
  );
}
