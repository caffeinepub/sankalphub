# Specification

## Summary
**Goal:** Update the Age Calculator page’s SEO metadata and on-page SEO copy (H1 + intro paragraph) without changing the tool’s design or functionality.

**Planned changes:**
- Update `/age-calculator` SEO metadata in `frontend/src/utils/seo.ts` to set the exact provided page title and meta description.
- Update `frontend/src/pages/tools/calculators/AgeCalculatorPage.tsx` so the H1 remains exactly "Free Age Calculator Online" and add the provided introduction paragraph directly under the H1 and above the tool inputs/actions.

**User-visible outcome:** The Age Calculator page shows the updated browser title and meta description, and displays the new intro paragraph above the tool while the calculator behavior and layout remain unchanged.
