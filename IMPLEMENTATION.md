# Implementation handoff

The current starter uses semantic HTML, responsive CSS, a local SVG illustration, and vanilla JavaScript. Runtime dependencies and a build step are not required. See README.md for local serving, file responsibilities, estimate behavior, and hosting setup.

## Progressive enhancement

The estimate form starts hidden. JavaScript reveals it only after registering its handlers. Without JavaScript, the separate noscript message and direct contact link remain available. This prevents a native GET form submission from placing customer details in the page URL when scripting is unavailable.

## Request delivery

Requests are prepared locally, reviewed, and sent through the visitor's email application. Copying supports webmail and missing mail handlers. This is not a server submission; never show a delivery confirmation for opening a mailto link. The business inbox and real email delivery need a launch-time check.

## Validation and continuation

The dependency-free tests in tests/site.test.cjs cover request encoding, service selection, and clipboard fallback. Browser layout and end-to-end checks remain outstanding: this environment lacks Chromium, and attempts to download both full and headless Chromium returned invalid archives. Static syntax and markup checks do not establish visual correctness. Follow the manual checklist in README.md before publishing.

Main received a concurrent starter commit during this task. That implementation was preserved; the follow-up only hardens the no-JavaScript form path and documents the handoff. No hosting, DNS, or email delivery settings were changed.
