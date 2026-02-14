import { createRouter, createRoute, createRootRoute, RouterProvider, Link, Outlet } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ROUTES } from './routes';
import { applyHomeSEO, restoreDefaultSEO, applyToolSEO } from './utils/seo';
import { HomePage } from './pages/HomePage';
import { AllToolsPage } from './pages/AllToolsPage';
import { PdfToolsPage } from './pages/PdfToolsPage';
import { ImageToolsPage } from './pages/ImageToolsPage';
import { CalculatorsPage } from './pages/CalculatorsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { PdfMergePage } from './pages/tools/pdf/PdfMergePage';
import { PdfSplitPage } from './pages/tools/pdf/PdfSplitPage';
import { CompressPdfPage } from './pages/tools/pdf/CompressPdfPage';
import { PdfToImagePage } from './pages/tools/pdf/PdfToImagePage';
import { ImageToPdfPage } from './pages/tools/pdf/ImageToPdfPage';
import { ImageCompressorPage } from './pages/tools/image/ImageCompressorPage';
import { ImageResizerPage } from './pages/tools/image/ImageResizerPage';
import { JpgToPngPage } from './pages/tools/image/JpgToPngPage';
import { PngToJpgPage } from './pages/tools/image/PngToJpgPage';
import { ImageConverterPage } from './pages/tools/image/ImageConverterPage';
import { EmiCalculatorPage } from './pages/tools/calculators/EmiCalculatorPage';
import { LoanCalculatorPage } from './pages/tools/calculators/LoanCalculatorPage';
import { AgeCalculatorPage } from './pages/tools/calculators/AgeCalculatorPage';
import { BmiCalculatorPage } from './pages/tools/calculators/BmiCalculatorPage';
import { GstCalculatorPage } from './pages/tools/calculators/GstCalculatorPage';
import { PercentageCalculatorPage } from './pages/tools/calculators/PercentageCalculatorPage';
import { SipCalculatorPage } from './pages/tools/calculators/SipCalculatorPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Layout component with header and footer
function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: ROUTES.HOME },
    { label: 'PDF Tools', path: ROUTES.PDF_TOOLS },
    { label: 'Image Tools', path: ROUTES.IMAGE_TOOLS },
    { label: 'Calculators', path: ROUTES.CALCULATORS },
    { label: 'About', path: ROUTES.ABOUT },
    { label: 'Contact', path: ROUTES.CONTACT },
  ];

  const priorityTools = [
    { label: 'EMI Calculator', path: ROUTES.EMI_CALCULATOR },
    { label: 'Age Calculator', path: ROUTES.AGE_CALCULATOR },
    { label: 'SIP Calculator', path: ROUTES.SIP_CALCULATOR },
    { label: 'Image Compressor', path: ROUTES.IMAGE_COMPRESSOR },
    { label: 'JPG to PDF', path: ROUTES.IMAGE_TO_PDF },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b bg-white/90 dark:bg-gray-900/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to={ROUTES.HOME} className="flex items-center gap-3">
              <img
                src="/assets/generated/sankalphub-logo.dim_512x160.png"
                alt="SankalpHub"
                className="h-10 w-auto"
              />
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-sm font-medium hover:text-primary transition-colors [&.active]:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="lg:hidden mt-4 pb-4 border-t pt-4">
              <div className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-medium hover:text-primary transition-colors py-2"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="border-t pt-3 mt-2">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">Popular Tools</p>
                  {priorityTools.map((tool) => (
                    <Link
                      key={tool.path}
                      to={tool.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm hover:text-primary transition-colors py-2 block"
                    >
                      {tool.label}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          )}
        </div>

        {/* Priority Tools Bar - Desktop */}
        <div className="hidden lg:block border-t bg-gray-50/50 dark:bg-gray-800/50">
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center gap-1">
              <span className="text-xs font-semibold text-muted-foreground mr-3">Popular Tools:</span>
              {priorityTools.map((tool, index) => (
                <span key={tool.path} className="flex items-center">
                  <Link
                    to={tool.path}
                    className="text-xs font-medium hover:text-primary transition-colors px-3 py-1 rounded-md hover:bg-white dark:hover:bg-gray-700"
                  >
                    {tool.label}
                  </Link>
                  {index < priorityTools.length - 1 && (
                    <span className="text-muted-foreground">•</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/90 dark:bg-gray-900/90 backdrop-blur-md mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-sm text-muted-foreground text-center">
            <p>© 2026 SankalpHub Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Route component wrappers with SEO
function IndexComponent() {
  useEffect(() => {
    applyHomeSEO();
  }, []);
  return <HomePage />;
}

function AllToolsComponent() {
  useEffect(() => {
    restoreDefaultSEO();
  }, []);
  return <AllToolsPage />;
}

function PdfToolsComponent() {
  useEffect(() => {
    restoreDefaultSEO();
  }, []);
  return <PdfToolsPage />;
}

function ImageToolsComponent() {
  useEffect(() => {
    restoreDefaultSEO();
  }, []);
  return <ImageToolsPage />;
}

function CalculatorsComponent() {
  useEffect(() => {
    restoreDefaultSEO();
  }, []);
  return <CalculatorsPage />;
}

function AboutComponent() {
  useEffect(() => {
    restoreDefaultSEO();
  }, []);
  return <AboutPage />;
}

function ContactComponent() {
  useEffect(() => {
    restoreDefaultSEO();
  }, []);
  return <ContactPage />;
}

function PrivacyComponent() {
  useEffect(() => {
    restoreDefaultSEO();
  }, []);
  return <PrivacyPolicyPage />;
}

function TermsComponent() {
  useEffect(() => {
    restoreDefaultSEO();
  }, []);
  return <TermsPage />;
}

function PdfMergeComponent() {
  useEffect(() => {
    restoreDefaultSEO();
  }, []);
  return <PdfMergePage />;
}

function PdfSplitComponent() {
  useEffect(() => {
    restoreDefaultSEO();
  }, []);
  return <PdfSplitPage />;
}

function CompressPdfComponent() {
  useEffect(() => {
    restoreDefaultSEO();
  }, []);
  return <CompressPdfPage />;
}

function PdfToImageComponent() {
  useEffect(() => {
    restoreDefaultSEO();
  }, []);
  return <PdfToImagePage />;
}

function ImageToPdfComponent() {
  useEffect(() => {
    applyToolSEO('/jpg-to-pdf');
  }, []);
  return <ImageToPdfPage />;
}

function ImageCompressorComponent() {
  useEffect(() => {
    applyToolSEO('/image-compressor');
  }, []);
  return <ImageCompressorPage />;
}

function ImageResizerComponent() {
  useEffect(() => {
    restoreDefaultSEO();
  }, []);
  return <ImageResizerPage />;
}

function JpgToPngComponent() {
  useEffect(() => {
    restoreDefaultSEO();
  }, []);
  return <JpgToPngPage />;
}

function PngToJpgComponent() {
  useEffect(() => {
    restoreDefaultSEO();
  }, []);
  return <PngToJpgPage />;
}

function ImageConverterComponent() {
  useEffect(() => {
    restoreDefaultSEO();
  }, []);
  return <ImageConverterPage />;
}

function EmiCalculatorComponent() {
  useEffect(() => {
    applyToolSEO('/emi-calculator');
  }, []);
  return <EmiCalculatorPage />;
}

function LoanCalculatorComponent() {
  useEffect(() => {
    restoreDefaultSEO();
  }, []);
  return <LoanCalculatorPage />;
}

function AgeCalculatorComponent() {
  useEffect(() => {
    applyToolSEO('/age-calculator');
  }, []);
  return <AgeCalculatorPage />;
}

function BmiCalculatorComponent() {
  useEffect(() => {
    restoreDefaultSEO();
  }, []);
  return <BmiCalculatorPage />;
}

function GstCalculatorComponent() {
  useEffect(() => {
    restoreDefaultSEO();
  }, []);
  return <GstCalculatorPage />;
}

function PercentageCalculatorComponent() {
  useEffect(() => {
    restoreDefaultSEO();
  }, []);
  return <PercentageCalculatorPage />;
}

function SipCalculatorComponent() {
  useEffect(() => {
    applyToolSEO('/sip-calculator');
  }, []);
  return <SipCalculatorPage />;
}

// Root route with layout
const rootRoute = createRootRoute({
  component: Layout,
});

// Define all routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: IndexComponent,
});

const allToolsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/all-tools',
  component: AllToolsComponent,
});

const pdfToolsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pdf-tools',
  component: PdfToolsComponent,
});

const imageToolsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/image-tools',
  component: ImageToolsComponent,
});

const calculatorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/calculators',
  component: CalculatorsComponent,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutComponent,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactComponent,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy-policy',
  component: PrivacyComponent,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms',
  component: TermsComponent,
});

// PDF Tool Routes
const pdfMergeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/pdf-merge',
  component: PdfMergeComponent,
});

const pdfSplitRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/pdf-split',
  component: PdfSplitComponent,
});

const compressPdfRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/compress-pdf',
  component: CompressPdfComponent,
});

const pdfToImageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/pdf-to-image',
  component: PdfToImageComponent,
});

const imageToPdfRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/jpg-to-pdf',
  component: ImageToPdfComponent,
});

// Image Tool Routes
const imageCompressorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/image-compressor',
  component: ImageCompressorComponent,
});

const imageResizerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/image-resizer',
  component: ImageResizerComponent,
});

const jpgToPngRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/jpg-to-png',
  component: JpgToPngComponent,
});

const pngToJpgRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/png-to-jpg',
  component: PngToJpgComponent,
});

const imageConverterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/image-converter',
  component: ImageConverterComponent,
});

// Calculator Routes
const emiCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/emi-calculator',
  component: EmiCalculatorComponent,
});

const loanCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/loan-calculator',
  component: LoanCalculatorComponent,
});

const ageCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/age-calculator',
  component: AgeCalculatorComponent,
});

const bmiCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/bmi-calculator',
  component: BmiCalculatorComponent,
});

const gstCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/gst-calculator',
  component: GstCalculatorComponent,
});

const percentageCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tools/percentage-calculator',
  component: PercentageCalculatorComponent,
});

const sipCalculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/sip-calculator',
  component: SipCalculatorComponent,
});

// Not Found Route
const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: NotFoundPage,
});

// Create route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  allToolsRoute,
  pdfToolsRoute,
  imageToolsRoute,
  calculatorsRoute,
  aboutRoute,
  contactRoute,
  privacyRoute,
  termsRoute,
  pdfMergeRoute,
  pdfSplitRoute,
  compressPdfRoute,
  pdfToImageRoute,
  imageToPdfRoute,
  imageCompressorRoute,
  imageResizerRoute,
  jpgToPngRoute,
  pngToJpgRoute,
  imageConverterRoute,
  emiCalculatorRoute,
  loanCalculatorRoute,
  ageCalculatorRoute,
  bmiCalculatorRoute,
  gstCalculatorRoute,
  percentageCalculatorRoute,
  sipCalculatorRoute,
  notFoundRoute,
]);

// Create router
const router = createRouter({ routeTree });

// Type declaration for router
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
