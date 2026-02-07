import { useState, useEffect } from 'react';
import { ROUTES } from './routes';
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

function App() {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPath) {
      case ROUTES.HOME:
        return <HomePage onNavigate={navigate} />;
      case ROUTES.ALL_TOOLS:
        return <AllToolsPage onNavigate={navigate} />;
      case ROUTES.PDF_TOOLS:
        return <PdfToolsPage onNavigate={navigate} />;
      case ROUTES.IMAGE_TOOLS:
        return <ImageToolsPage onNavigate={navigate} />;
      case ROUTES.CALCULATORS:
        return <CalculatorsPage onNavigate={navigate} />;
      case ROUTES.ABOUT:
        return <AboutPage />;
      case ROUTES.CONTACT:
        return <ContactPage />;
      case ROUTES.PRIVACY_POLICY:
        return <PrivacyPolicyPage />;
      case ROUTES.TERMS:
        return <TermsPage />;
      case ROUTES.PDF_MERGE:
        return <PdfMergePage />;
      case ROUTES.PDF_SPLIT:
        return <PdfSplitPage />;
      case ROUTES.COMPRESS_PDF:
        return <CompressPdfPage />;
      case ROUTES.PDF_TO_IMAGE:
        return <PdfToImagePage />;
      case ROUTES.IMAGE_TO_PDF:
        return <ImageToPdfPage />;
      case ROUTES.IMAGE_COMPRESSOR:
        return <ImageCompressorPage />;
      case ROUTES.IMAGE_RESIZER:
        return <ImageResizerPage />;
      case ROUTES.JPG_TO_PNG:
        return <JpgToPngPage />;
      case ROUTES.PNG_TO_JPG:
        return <PngToJpgPage />;
      case ROUTES.IMAGE_CONVERTER:
        return <ImageConverterPage />;
      case ROUTES.EMI_CALCULATOR:
        return <EmiCalculatorPage />;
      case ROUTES.LOAN_CALCULATOR:
        return <LoanCalculatorPage />;
      case ROUTES.AGE_CALCULATOR:
        return <AgeCalculatorPage />;
      case ROUTES.BMI_CALCULATOR:
        return <BmiCalculatorPage />;
      case ROUTES.GST_CALCULATOR:
        return <GstCalculatorPage />;
      case ROUTES.PERCENTAGE_CALCULATOR:
        return <PercentageCalculatorPage />;
      case ROUTES.SIP_CALCULATOR:
        return <SipCalculatorPage />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  const navItems = [
    { label: 'Home', path: ROUTES.HOME },
    { label: 'PDF Tools', path: ROUTES.PDF_TOOLS },
    { label: 'Image Tools', path: ROUTES.IMAGE_TOOLS },
    { label: 'Calculators', path: ROUTES.CALCULATORS },
    { label: 'About', path: ROUTES.ABOUT },
    { label: 'Contact', path: ROUTES.CONTACT },
  ];

  const footerLinks = [
    { label: 'About', path: ROUTES.ABOUT },
    { label: 'Privacy Policy', path: ROUTES.PRIVACY_POLICY },
    { label: 'Terms', path: ROUTES.TERMS },
    { label: 'Contact', path: ROUTES.CONTACT },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b bg-white/90 dark:bg-gray-900/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate(ROUTES.HOME)}>
              <img
                src="/assets/generated/sankalphub-logo.dim_512x160.png"
                alt="SankalpHub"
                className="h-10 w-auto"
              />
            </div>
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`text-sm font-medium hover:text-primary transition-colors ${
                    currentPath === item.path ? 'text-primary' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">{renderPage()}</main>

      {/* Footer */}
      <footer className="border-t bg-white/90 dark:bg-gray-900/90 backdrop-blur-md mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-6">
              {footerLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div className="text-sm text-muted-foreground text-center md:text-right">
              <p>© 2026 SankalpHub. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
