/**
 * Load an image file and return metadata
 */
export async function loadImage(file: File): Promise<{ img: HTMLImageElement; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ img, width: img.width, height: img.height });
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    
    img.src = url;
  });
}

/**
 * Compress an image with quality control
 */
export async function compressImage(
  file: File,
  quality: number
): Promise<{ blob: Blob; originalSize: number; compressedSize: number }> {
  const { img, width, height } = await loadImage(file);
  
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get canvas context');
  
  ctx.drawImage(img, 0, 0, width, height);
  
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to compress image'));
          return;
        }
        resolve({
          blob,
          originalSize: file.size,
          compressedSize: blob.size,
        });
      },
      'image/jpeg',
      quality
    );
  });
}

/**
 * Resize an image
 */
export async function resizeImage(
  file: File,
  targetWidth: number,
  targetHeight: number,
  maintainAspect: boolean
): Promise<{ blob: Blob; originalWidth: number; originalHeight: number; newWidth: number; newHeight: number }> {
  const { img, width: originalWidth, height: originalHeight } = await loadImage(file);
  
  let newWidth = targetWidth;
  let newHeight = targetHeight;
  
  if (maintainAspect) {
    const aspectRatio = originalWidth / originalHeight;
    if (targetWidth / targetHeight > aspectRatio) {
      newWidth = targetHeight * aspectRatio;
    } else {
      newHeight = targetWidth / aspectRatio;
    }
  }
  
  const canvas = document.createElement('canvas');
  canvas.width = newWidth;
  canvas.height = newHeight;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get canvas context');
  
  ctx.drawImage(img, 0, 0, newWidth, newHeight);
  
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to resize image'));
          return;
        }
        resolve({
          blob,
          originalWidth,
          originalHeight,
          newWidth,
          newHeight,
        });
      },
      file.type
    );
  });
}

/**
 * Convert JPG to PNG
 */
export async function convertJpgToPng(file: File): Promise<{ blob: Blob }> {
  const { img, width, height } = await loadImage(file);
  
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get canvas context');
  
  ctx.drawImage(img, 0, 0, width, height);
  
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to convert image'));
          return;
        }
        resolve({ blob });
      },
      'image/png'
    );
  });
}

/**
 * Convert PNG to JPG
 */
export async function convertPngToJpg(file: File, quality: number = 0.9): Promise<{ blob: Blob }> {
  const { img, width, height } = await loadImage(file);
  
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get canvas context');
  
  // Fill with white background (JPG doesn't support transparency)
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);
  
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to convert image'));
          return;
        }
        resolve({ blob });
      },
      'image/jpeg',
      quality
    );
  });
}

/**
 * Convert image to specified format
 */
export async function convertImage(
  file: File,
  targetFormat: 'jpeg' | 'png' | 'webp',
  quality: number = 0.9
): Promise<{ blob: Blob }> {
  const { img, width, height } = await loadImage(file);
  
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get canvas context');
  
  // Fill with white background for JPEG
  if (targetFormat === 'jpeg') {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);
  }
  
  ctx.drawImage(img, 0, 0, width, height);
  
  const mimeType = `image/${targetFormat}`;
  
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to convert image'));
          return;
        }
        resolve({ blob });
      },
      mimeType,
      quality
    );
  });
}
