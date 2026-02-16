import { useState } from 'react';
import { ToolShell } from '../../../components/tools/ToolShell';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { resizeImage } from '../../../utils/image';
import { downloadBlob, getTimestampedFilename } from '../../../utils/download';

export function ImageResizerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ blob: Blob } | null>(null);
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

    if (isNaN(w) || w <= 0 || isNaN(h) || h <= 0) {
      setError('Please enter valid dimensions');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await resizeImage(file, w, h, maintainAspectRatio);
      setResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resize image');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      const extension = file?.name.split('.').pop() || 'jpg';
      downloadBlob(result.blob, getTimestampedFilename('resized', extension));
    }
  };

  return (
    <ToolShell
      title="Free Image Resizer"
      description="Resize images to any dimension instantly with our free image resizer. Change image width and height while maintaining aspect ratio or set custom sizes. This image resizer tool is perfect for optimizing images for websites, social media, email attachments, or any specific size requirements."
      actionButton={{
        label: 'Resize Image',
        onClick: handleResize,
        disabled: !file || !width || !height,
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
                  <p className="text-sm text-muted-foreground">
                    Your image has been resized to {width}x{height}px
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
              label: 'Download Resized Image',
            }
          : undefined
      }
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="image">Select Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {file && (
            <p className="text-sm text-muted-foreground mt-1">{file.name}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="width">Width (px)</Label>
            <Input
              id="width"
              type="number"
              placeholder="e.g., 800"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="height">Height (px)</Label>
            <Input
              id="height"
              type="number"
              placeholder="e.g., 600"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="aspectRatio"
            checked={maintainAspectRatio}
            onCheckedChange={(checked) => setMaintainAspectRatio(checked as boolean)}
          />
          <Label htmlFor="aspectRatio" className="text-sm font-normal cursor-pointer">
            Maintain aspect ratio
          </Label>
        </div>
      </div>
    </ToolShell>
  );
}
