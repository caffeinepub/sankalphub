// SEO utility for managing document title and meta description
// Applies page-specific SEO for all routes

const HOME_TITLE = 'SankalpHub – Free PDF, Image & Calculator Tools Online';
const HOME_DESCRIPTION = 'Use SankalpHub free online tools including PDF converter, image compressor, and multiple calculators. Fast, secure, and no login required.';

const DEFAULT_TITLE = 'SankalpHub - Free Online Tools for Everyone';
const DEFAULT_DESCRIPTION = 'Professional free online tools for PDF conversion, image processing, and calculations. Fast, secure, and easy to use.';

// SEO metadata for all tool pages
const TOOL_SEO: Record<string, { title: string; description: string }> = {
  '/emi-calculator': {
    title: 'Free EMI Calculator Online – Home & Personal Loan EMI India',
    description: 'Calculate home loan, car loan and personal loan EMI instantly with our free EMI calculator online in India. Fast and accurate results.',
  },
  '/age-calculator': {
    title: 'Free Age Calculator – Calculate Your Exact Age by DOB',
    description: 'Calculate your exact age by date of birth with our free age calculator. Get accurate results in years, months, and days instantly online.',
  },
  '/sip-calculator': {
    title: 'Free SIP Calculator – Estimate Mutual Fund Returns Online',
    description: 'Plan your investments with this free SIP Calculator. Estimate returns, monthly SIP amounts, and long-term growth instantly. Accurate and easy to use.',
  },
  '/image-compressor': {
    title: 'Free Image Compressor – Reduce Image Size Online',
    description: 'Compress images instantly without losing quality. Easy-to-use Image Compressor for reducing file sizes for web, email, and uploads. Fast and secure.',
  },
  '/jpg-to-pdf': {
    title: 'Free JPG to PDF Converter – Convert Images to PDF Online',
    description: 'Convert JPG images to PDF in seconds with this free online tool. Fast, secure, and easy to use. Upload, convert, and download instantly on any device.',
  },
  '/tools/loan-calculator': {
    title: 'Free Loan Calculator Online – EMI & Interest Calculation',
    description: 'Use our free loan calculator to calculate EMI, total interest, and total payment instantly. Simple and accurate online loan calculation tool.',
  },
  '/tools/bmi-calculator': {
    title: 'Free BMI Calculator – Calculate Body Mass Index Online',
    description: 'Calculate your BMI instantly with our free BMI calculator. Get your Body Mass Index and health category based on height and weight. Fast and accurate.',
  },
  '/tools/gst-calculator': {
    title: 'Free GST Calculator – Calculate GST Amount Online India',
    description: 'Calculate GST amount instantly with our free GST calculator. Add or remove GST from any amount with accurate results. Perfect for Indian businesses.',
  },
  '/tools/percentage-calculator': {
    title: 'Free Percentage Calculator – Calculate Percentages Online',
    description: 'Calculate percentages and percentage changes instantly with our free percentage calculator. Simple, fast, and accurate online calculation tool.',
  },
  '/tools/png-to-jpg': {
    title: 'Free PNG to JPG Converter – Convert PNG to JPEG Online',
    description: 'Convert PNG images to JPG format instantly with our free PNG to JPG converter. Fast, secure, and easy to use. Download converted images in seconds.',
  },
  '/tools/jpg-to-png': {
    title: 'Free JPG to PNG Converter – Convert JPEG to PNG Online',
    description: 'Convert JPG images to PNG format instantly with our free JPG to PNG converter. Fast, secure, and easy to use. Download converted images in seconds.',
  },
  '/tools/pdf-merge': {
    title: 'Free Merge PDF Tool – Combine PDF Files Online',
    description: 'Merge multiple PDF files into one document instantly with our free merge PDF tool. Fast, secure, and easy to use. Combine PDFs in seconds online.',
  },
  '/tools/pdf-split': {
    title: 'Free Split PDF Tool – Extract Pages from PDF Online',
    description: 'Split PDF files and extract specific pages instantly with our free split PDF tool. Fast, secure, and easy to use. Split PDFs online in seconds.',
  },
  '/tools/compress-pdf': {
    title: 'Free Compress PDF Tool – Reduce PDF File Size Online',
    description: 'Compress PDF files and reduce file size instantly with our free compress PDF tool. Maintain quality while reducing size. Fast, secure, and easy to use.',
  },
  '/tools/pdf-to-image': {
    title: 'Free PDF to Image Converter – Convert PDF to JPG Online',
    description: 'Convert PDF pages to images instantly with our free PDF to image converter. Fast, secure, and easy to use. Download converted images in seconds.',
  },
  '/tools/image-converter': {
    title: 'Free Image Converter – Convert Image Formats Online',
    description: 'Convert images between formats instantly with our free image converter. Support for JPEG, PNG, WebP and more. Fast, secure, and easy to use online.',
  },
  '/tools/image-resizer': {
    title: 'Free Image Resizer – Resize Images Online Instantly',
    description: 'Resize images to any dimension instantly with our free image resizer. Maintain aspect ratio or set custom sizes. Fast, secure, and easy to use online.',
  },
};

export function applyHomeSEO() {
  document.title = HOME_TITLE;
  updateMetaDescription(HOME_DESCRIPTION);
}

export function restoreDefaultSEO() {
  document.title = DEFAULT_TITLE;
  updateMetaDescription(DEFAULT_DESCRIPTION);
}

export function applyToolSEO(path: string) {
  const seo = TOOL_SEO[path];
  if (seo) {
    document.title = seo.title;
    updateMetaDescription(seo.description);
  } else {
    restoreDefaultSEO();
  }
}

function updateMetaDescription(content: string) {
  let metaDescription = document.querySelector('meta[name="description"]');
  
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  
  metaDescription.setAttribute('content', content);
}
