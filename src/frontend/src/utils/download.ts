/**
 * Trigger a download for a generated Blob
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up the object URL after a short delay
  setTimeout(() => URL.revokeObjectURL(url), 100);
}

/**
 * Get a sensible filename with timestamp
 */
export function getTimestampedFilename(baseName: string, extension: string): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  return `${baseName}-${timestamp}.${extension}`;
}
