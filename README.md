# Capital City Coatings

A responsive, dependency-free starter website for the Des Moines-area concrete coatings business. Built with semantic HTML, CSS and vanilla JavaScript. Includes garage, basement, patio, pool-deck and commercial service sections; process, service area, FAQ and a free-estimate email workflow.

## Run locally

From this directory, run `python3 -m http.server 4173` (or `npm start` with Python 3 available), then open http://localhost:4173. No package installation or build step is required. Node 18+ can run `npm test` and `npm run check`.

## Files

- `index.html`: business copy, service sections, accessible form and contact links.
- `styles.css`: responsive layouts and brand color variables.
- `app.js`: service preselection, validation, request preview, encoded email link and clipboard fallback.
- `assets/garage.svg`: original vector illustration, explicitly labeled as an illustration, not a completed customer project.
- `assets/favicon.svg`: simple starter icon.
- `tests/site.test.cjs`: dependency-free behavioral checks for estimate encoding, service selection and clipboard fallback.

## How estimate requests work

1. Visitor enters name, email, city, service type and optional phone, size and project notes.
2. Native browser validation checks required fields, email and size; JavaScript also rejects whitespace-only names and cities.
3. **Prepare my estimate request** shows a review panel. Nothing has been submitted or sent.
4. **Open email app** opens a prefilled `mailto:` email to `info@capitalcitycoatingsia.com`. The visitor must press Send in their email app.
5. **Copy request** supports webmail or visitors without a configured email app. If clipboard permission is denied, the text is selected for manual copying.

No backend, database, analytics, third-party form provider, cookies or browser storage are used. No API keys are needed. The website does not claim delivery success. Email delivery depends on the visitor sending the message and normal mail delivery. Long requests can exceed a mail client's URI limits; copy/paste remains available. With JavaScript disabled, a direct email link is provided. Requests are handled by the visitor's email provider and the business inbox after sending.

For automatic in-page submission later, add a server-side endpoint or configured form provider, server-side validation, spam protection and rate limiting. Show success only after the server accepts the request; handle failures visibly. Keep credentials out of frontend code and git. Update the privacy wording when data processing changes. Do not replace this with a fake success message.

## Hosting

This is a static site: serve the repository root from any static host. Relative asset paths support subdirectory hosting, including a GitHub Pages project URL. To use GitHub Pages, the repository owner can select `main` and `/ (root)` in repository Settings → Pages. This commit does not enable hosting or change DNS.

The content includes `capitalcitycoatingsia.com`; that link alone does not connect the domain. Configure custom-domain hosting and DNS separately after choosing the host. No `CNAME` is included to avoid claiming a domain before hosting is configured.

## Continue building

- Replace the text brand and starter icon with approved logo assets when available.
- Add real job photos (optimized WebP/AVIF with descriptive alt text), with permission. Keep illustration labels until real photos replace them.
- Confirm service availability, installation expectations and finish options before publishing changes. Do not add unverified warranties, certifications, reviews or fixed performance promises.
- Edit business copy in HTML and update the recipient constant in `app.js` alongside visible email links if contact information changes.
- Add dedicated service pages and a sitemap once the deployment URL is finalized.
- No fixed quote is calculated: slab condition and system selection require project-specific assessment.

## Manual verification

Check at 375px, 768px and 1440px widths; keyboard-tab through links and fields; confirm required fields reject invalid input; choose each service card; prepare and review a sample estimate; inspect its email recipient and encoded content; test clipboard-denied behavior. An actual sent email should be tested by the owner after publication. Automated checks do not send email.
