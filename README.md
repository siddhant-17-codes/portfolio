# siddhant-portfolio

Personal site of Siddhant Thakur, backend Python developer, Kolkata.

Static site built with [Astro](https://astro.build) and TypeScript. No UI
framework runtime is shipped; the only JavaScript is a few small scripts:
the live request trace in the hero, the click-to-play demo videos, the email
link and the page-weight readout in the footer.

## Run it

```
npm install
npm run dev
```

## Build

```
npm run build
```

This type-checks the project, builds `dist/`, and writes `dist/_headers`
(cache rules and a hash-based Content-Security-Policy) for Cloudflare Pages.

See [CLAUDE.md](./CLAUDE.md) for the structure and the rules for changing content.
