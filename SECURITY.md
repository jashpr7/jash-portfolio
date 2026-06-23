# Security Notes

## Included protections

- Content Security Policy with same-origin defaults
- `frame-ancestors 'none'` and `X-Frame-Options: DENY`
- MIME-sniffing protection
- strict referrer policy
- restrictive browser permissions policy
- same-origin opener and resource policies
- HSTS in production
- Next.js identification header disabled
- production browser source maps disabled
- experimental Subresource Integrity enabled
- no remote fonts, trackers, analytics or third-party scripts
- localhost robots exclusion until a production domain is configured
- `noai` and `noimageai` crawler preference headers
- optimised derivative artwork rather than original source files
- no form API key, email password, SMTP credential or database

## Contact form privacy

The project brief is processed only in the visitor's browser. On submission, the site builds a Gmail Compose URL containing the entered text and opens it for the visitor. The site does not store the form data and does not send it to a form service.

The visitor must review the draft and press Send. Gmail may require the visitor to sign in. If Gmail cannot open, the site falls back to the device's configured email application.

## Artwork protection limitations

A browser must receive an image in order to display it. No client-side technique can completely prevent screenshots, network inspection or file extraction. Blocking F12 or attempting to hide developer tools is not reliable and can damage accessibility and usability.

For stronger commercial protection:

- publish reduced-resolution derivatives
- add a visible or embedded watermark when appropriate
- retain original layered source files offline
- register copyright where relevant
- use private authenticated delivery for client-only work
- never place confidential assets in the `public` folder

## Future server features

If an automatic contact API, admin panel, account system or database is added, implement server-side validation, authentication, authorization, rate limiting, secure cookies, audit logging, encrypted secrets and dependency monitoring.
