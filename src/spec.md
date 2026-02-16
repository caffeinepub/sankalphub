# Specification

## Summary
**Goal:** Improve SEO for all specified tool pages by updating per-route metadata and on-page SEO copy, while excluding EMI and Loan calculator pages.

**Planned changes:**
- Update `frontend/src/utils/seo.ts` to ensure `TOOL_SEO` includes unique, SEO-friendly titles (start with “Free”, max 60 chars) and unique 150–160 character meta descriptions (include main keyword) for:  
  `/age-calculator`, `/tools/bmi-calculator`, `/sip-calculator`, `/tools/gst-calculator`, `/tools/percentage-calculator`, `/jpg-to-pdf`, `/tools/png-to-jpg`, `/tools/jpg-to-png`, `/tools/pdf-merge`, `/tools/pdf-split`, `/tools/compress-pdf`, `/tools/pdf-to-image`, `/image-compressor`, `/tools/image-converter`, `/tools/image-resizer`.
- Update only user-facing SEO text on the specified tool pages to keep a keyword-focused H1 and add a professional 3–4 line introduction paragraph above each tool UI that naturally includes the main keyword, without changing layout, styling, routes, or functionality.
- Ensure `/emi-calculator` and `/tools/loan-calculator` SEO metadata and on-page copy are not modified.

**User-visible outcome:** Each specified tool page shows a clear keyword-focused heading and a short intro explaining the tool, and each route has unique, optimized titles and meta descriptions—while EMI and Loan calculator pages remain unchanged.
