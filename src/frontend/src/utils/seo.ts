// SEO utility for managing document title and meta description
// Applies page-specific SEO for all routes

const HOME_TITLE = 'SankalpHub – Free PDF, Image & Calculator Tools Online';
const HOME_DESCRIPTION = 'Use SankalpHub free online tools including PDF converter, image compressor, and multiple calculators. Fast, secure, and no login required.';

const DEFAULT_TITLE = 'SankalpHub - Free Online Tools for Everyone';
const DEFAULT_DESCRIPTION = 'Professional free online tools for PDF conversion, image processing, and calculations. Fast, secure, and easy to use.';

// SEO metadata for the five priority tool pages
const TOOL_SEO: Record<string, { title: string; description: string }> = {
  '/emi-calculator': {
    title: 'Free EMI Calculator Online – Home & Personal Loan EMI India',
    description: 'Calculate home loan, car loan and personal loan EMI instantly with our free EMI calculator online in India. Fast and accurate results.',
  },
  '/age-calculator': {
    title: 'Age Calculator – Calculate Your Age in Seconds',
    description: 'Use this free Age Calculator to find your exact age in years, months, and days. Instant, accurate results with a clean and mobile-friendly interface.',
  },
  '/sip-calculator': {
    title: 'SIP Calculator – Estimate Mutual Fund Returns Online',
    description: 'Plan your investments with this free SIP Calculator. Estimate returns, monthly SIP amounts, and long-term growth instantly. Accurate, fast, and easy to use.',
  },
  '/image-compressor': {
    title: 'Image Compressor – Reduce Image Size Online Free',
    description: 'Compress images instantly without losing quality. Easy-to-use Image Compressor for reducing file sizes for web, email, and uploads. Fast and secure.',
  },
  '/jpg-to-pdf': {
    title: 'JPG to PDF Converter – Convert Images to PDF Online',
    description: 'Convert JPG images to PDF in seconds with this free online tool. Fast, secure, and easy to use. Upload, convert, and download instantly on any device.',
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
