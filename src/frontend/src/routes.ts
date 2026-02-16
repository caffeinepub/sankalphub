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
  FINANCE_GUIDES: '/finance-guides',
  // PDF Tools
  PDF_MERGE: '/tools/pdf-merge',
  PDF_SPLIT: '/tools/pdf-split',
  COMPRESS_PDF: '/tools/compress-pdf',
  PDF_TO_IMAGE: '/tools/pdf-to-image',
  IMAGE_TO_PDF: '/jpg-to-pdf',
  // Image Tools
  IMAGE_COMPRESSOR: '/image-compressor',
  IMAGE_RESIZER: '/tools/image-resizer',
  JPG_TO_PNG: '/tools/jpg-to-png',
  PNG_TO_JPG: '/tools/png-to-jpg',
  IMAGE_CONVERTER: '/tools/image-converter',
  // Calculators
  EMI_CALCULATOR: '/emi-calculator',
  LOAN_CALCULATOR: '/tools/loan-calculator',
  AGE_CALCULATOR: '/age-calculator',
  BMI_CALCULATOR: '/tools/bmi-calculator',
  GST_CALCULATOR: '/tools/gst-calculator',
  PERCENTAGE_CALCULATOR: '/tools/percentage-calculator',
  SIP_CALCULATOR: '/sip-calculator',
} as const;

export type Route = typeof ROUTES[keyof typeof ROUTES];
