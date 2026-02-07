// Route definitions for SankalpHub
export const ROUTES = {
  HOME: '/',
  ALL_TOOLS: '/all-tools',
  PDF_TOOLS: '/pdf-tools',
  IMAGE_TOOLS: '/image-tools',
  CALCULATORS: '/calculators',
  ABOUT: '/about',
  CONTACT: '/contact',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS: '/terms',
  // PDF Tools
  PDF_MERGE: '/tools/pdf-merge',
  PDF_SPLIT: '/tools/pdf-split',
  COMPRESS_PDF: '/tools/compress-pdf',
  PDF_TO_IMAGE: '/tools/pdf-to-image',
  IMAGE_TO_PDF: '/tools/image-to-pdf',
  // Image Tools
  IMAGE_COMPRESSOR: '/tools/image-compressor',
  IMAGE_RESIZER: '/tools/image-resizer',
  JPG_TO_PNG: '/tools/jpg-to-png',
  PNG_TO_JPG: '/tools/png-to-jpg',
  IMAGE_CONVERTER: '/tools/image-converter',
  // Calculators
  EMI_CALCULATOR: '/tools/emi-calculator',
  LOAN_CALCULATOR: '/tools/loan-calculator',
  AGE_CALCULATOR: '/tools/age-calculator',
  BMI_CALCULATOR: '/tools/bmi-calculator',
  GST_CALCULATOR: '/tools/gst-calculator',
  PERCENTAGE_CALCULATOR: '/tools/percentage-calculator',
  SIP_CALCULATOR: '/tools/sip-calculator',
} as const;

export type Route = typeof ROUTES[keyof typeof ROUTES];
