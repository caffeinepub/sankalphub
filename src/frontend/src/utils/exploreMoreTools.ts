import { ROUTES } from '../routes';

export interface ToolLink {
  title: string;
  route: string;
}

// All available tools with their routes and titles
const ALL_TOOLS: ToolLink[] = [
  // PDF Tools
  { title: 'Merge PDF', route: ROUTES.PDF_MERGE },
  { title: 'Split PDF', route: ROUTES.PDF_SPLIT },
  { title: 'Compress PDF', route: ROUTES.COMPRESS_PDF },
  { title: 'PDF to Image', route: ROUTES.PDF_TO_IMAGE },
  { title: 'JPG to PDF', route: ROUTES.IMAGE_TO_PDF },
  // Image Tools
  { title: 'Image Compressor', route: ROUTES.IMAGE_COMPRESSOR },
  { title: 'Image Resizer', route: ROUTES.IMAGE_RESIZER },
  { title: 'JPG to PNG', route: ROUTES.JPG_TO_PNG },
  { title: 'PNG to JPG', route: ROUTES.PNG_TO_JPG },
  { title: 'Image Converter', route: ROUTES.IMAGE_CONVERTER },
  // Calculators
  { title: 'EMI Calculator', route: ROUTES.EMI_CALCULATOR },
  { title: 'Loan Calculator', route: ROUTES.LOAN_CALCULATOR },
  { title: 'Age Calculator', route: ROUTES.AGE_CALCULATOR },
  { title: 'BMI Calculator', route: ROUTES.BMI_CALCULATOR },
  { title: 'GST Calculator', route: ROUTES.GST_CALCULATOR },
  { title: 'Percentage Calculator', route: ROUTES.PERCENTAGE_CALCULATOR },
  { title: 'SIP Calculator', route: ROUTES.SIP_CALCULATOR },
];

// Routes where the section should be displayed (all tool routes)
const TOOL_ROUTES: string[] = [
  ROUTES.PDF_MERGE,
  ROUTES.PDF_SPLIT,
  ROUTES.COMPRESS_PDF,
  ROUTES.PDF_TO_IMAGE,
  ROUTES.IMAGE_TO_PDF,
  ROUTES.IMAGE_COMPRESSOR,
  ROUTES.IMAGE_RESIZER,
  ROUTES.JPG_TO_PNG,
  ROUTES.PNG_TO_JPG,
  ROUTES.IMAGE_CONVERTER,
  ROUTES.EMI_CALCULATOR,
  ROUTES.LOAN_CALCULATOR,
  ROUTES.AGE_CALCULATOR,
  ROUTES.BMI_CALCULATOR,
  ROUTES.GST_CALCULATOR,
  ROUTES.PERCENTAGE_CALCULATOR,
  ROUTES.SIP_CALCULATOR,
];

/**
 * Check if the current route should display the "Explore More Tools" section
 */
export function shouldShowExploreMore(currentPath: string): boolean {
  // Show on all tool routes
  return TOOL_ROUTES.includes(currentPath);
}

/**
 * Get 5-6 related tool links for the current route
 * Uses deterministic selection based on current route
 */
export function getRelatedTools(currentPath: string): ToolLink[] {
  // Filter out the current tool
  const availableTools = ALL_TOOLS.filter(tool => tool.route !== currentPath);
  
  // Get a stable index based on the current path
  const currentIndex = ALL_TOOLS.findIndex(tool => tool.route === currentPath);
  const startIndex = currentIndex >= 0 ? currentIndex : 0;
  
  // Select 5-6 tools in a rotating manner (prefer 6 if available)
  const targetCount = Math.min(6, availableTools.length);
  const selectedTools: ToolLink[] = [];
  
  for (let i = 0; i < targetCount; i++) {
    const index = (startIndex + i) % availableTools.length;
    selectedTools.push(availableTools[index]);
  }
  
  return selectedTools;
}
