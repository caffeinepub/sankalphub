# Specification

## Summary
**Goal:** Make the Finance Guides page publicly accessible at `/finance-guides` and visible in the main navigation.

**Planned changes:**
- Confirm or create a React Finance Guides page and register the `/finance-guides` route in the TanStack Router route tree so it renders within the existing Layout.
- Add a `ROUTES` constant for Finance Guides in `frontend/src/routes.ts` and use it for both route registration and navigation linking.
- Append a “Finance Guides” link to the existing `navItems` list so it appears in both desktop and mobile navigation without changing existing items.
- Ensure `/finance-guides` is not auth-gated and loads for anonymous users.
- Apply the default non-homepage SEO behavior used by existing static pages for the `/finance-guides` route.
- Update `frontend/public/sitemap.xml` to include `https://sankalphub-a1l.caffeine.xyz/finance-guides` without altering existing entries.

**User-visible outcome:** Users can visit `/finance-guides` without logging in and see the Finance Guides page, and can navigate to it from the main menu on desktop and mobile.
