# SG Precision Engineering — Website

A complete, production-ready static website: `index.html` plus `thank-you.html`,
`404.html`, `privacy-policy.html`, `terms.html`, `sitemap.xml`, `robots.txt`
and `favicon.svg`, styled by `styles.css` and powered by `script.js`.

## A note on tech stack
The brief asked for Next.js/React/TypeScript. This chat environment can't run
a Node build or host a live Next.js deployment, so I built the equivalent
site as clean, dependency-free HTML/CSS/JS instead — it's what you can
actually upload to any host today and have working immediately, with the
same design, copy, forms, SEO tags and schema markup. If you'd like it
re-implemented as a Next.js app later (e.g. to hand to a dev team), that's a
straightforward follow-up.

## Before you go live
1. **Forms.** The Quote and Contact forms post to `formsubmit.co/sgpe.india@gmail.com` —
   a free service that emails submissions to you with no backend required.
   The **first submission** triggers a confirmation email from FormSubmit to
   sgpe.india@gmail.com — click the link in it once to activate the form.
   File uploads are delivered as email attachments (20MB practical limit).
2. **Domain.** Replace `https://www.sgprecisionengineering.in/` in the
   `<head>` of every page (canonical, Open Graph, schema) and in
   `sitemap.xml` / `robots.txt` with your real domain once you have one.
3. **Photography.** The Gallery section and hero card currently use drawn
   SVG placeholders in the brand colours (no stock/AI photos were used, to
   avoid generic or rights-encumbered imagery). Swap in real shop-floor,
   machine and part photography before launch for the strongest trust signal.
4. **Google Business.** The map embed uses a generic Sector 12, Noida query —
   once you create/claim your Google Business Profile, swap the iframe `src`
   for your exact Place embed link.
5. **Hosting.** Any static host works (Netlify, Vercel, GitHub Pages, cPanel).
   Just upload all files keeping them in the same folder together.

## What's included
- Hero, trust bar, 6 services, 10 industries, 9-step process timeline,
  materials/operations capability lists, 8 "why us" points, gallery,
  FAQ (with matching FAQPage schema), quote form with file upload, contact
  form, Google Map embed, floating Call/WhatsApp/Quote buttons.
- LocalBusiness, Organization and FAQPage JSON-LD, full meta/OG/Twitter tags.
- Legal pages, custom 404, thank-you page, sitemap, robots.txt, SVG favicon.
- Mobile-first responsive layout, scroll-reveal animation, accessible focus
  states, `prefers-reduced-motion` support.
