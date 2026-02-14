# Specification

## Summary
**Goal:** Remove all platform branding from the site footer and show only a single copyright line.

**Planned changes:**
- Update the shared Layout footer in `frontend/src/App.tsx` to remove the “Built with ❤️ using caffeine.ai” text and any caffeine.ai link.
- Render exactly this single footer line (and nothing else): “© 2026 SankalpHub Solutions. All rights reserved.”

**User-visible outcome:** Across all pages, the footer displays only “© 2026 SankalpHub Solutions. All rights reserved.” with no platform branding or outbound links.
