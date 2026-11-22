# CLAUDE.md: rules for working on this portfolio

This is Siddhant Thakur's personal site. It is a static Astro site, deployed to
Cloudflare Pages from the `main` branch. Read this before changing anything.

## What the site is for

It shows that Siddhant is a backend Python developer by showing how he works:
live systems, decisions and postmortems. It is not a list of skills. Keep it that
way: a change that adds generic portfolio furniture (skill bars, logo walls,
"passionate developer" copy, testimonials) is a regression.

## Hard rules

1. **Every claim must be true and checkable.** Numbers in `src/data/*.ts` come from
   the projects' own repositories and records. When you change a number, re-verify
   it at the source (D:\reflect, D:\VisionaryX-2.0, D:\mindmate) and update the
   "checked on" date in the file header. Never round up. If unsure, leave it out.
2. **Reflect's repository is private.** Publish stories, stages and process, never
   scoring weights, thresholds, prompts or algorithm details. Do not link the repo.
3. **No phone number, no CV download.** Contact is email only, and the address is
   assembled in the browser (see `Contact.astro`) so it is never whole in the HTML.
4. **Dark only.** The palette is defined once in `src/styles/global.css`. Use the
   tokens; never hard-code a colour in a component.
5. **Stay fast.** No UI framework runtime, no third-party scripts, analytics or
   fonts from a CDN. Images go through `astro:assets`; videos load only on click.
6. **Copy rules.** Plain words, active voice, sentence case. No hype words
   ("cutting-edge", "seamless", "production-grade", "passionate").

## Architecture

```
src/
  data/          All content. Edit these to change what the site says.
    site.ts        identity, links, live probes for the hero trace
    projects.ts    Reflect, VisionaryX, MindMate
    incidents.ts   the incident log (postmortems)
    principles.ts  "How I decide"
    credentials.ts education and certificates (each links to its proof)
    expertise.ts   skill areas with proof, and VisionaryX's RAG pipeline
    trajectory.ts  the dated timeline in About
  components/    One file per section. Styles are scoped to the component,
                 so editing one section cannot restyle another.
  scripts/       Browser TypeScript shared by components (trace.ts)
  styles/        global.css (tokens + base), fonts.css (self-hosted fonts)
  layouts/       Base.astro: <head>, meta, Open Graph, JSON-LD
  pages/         index.astro (composition only), 404.astro
public/          Fonts, demo videos and posters, og.png, favicon, robots.txt
scripts/         Build-time Node scripts
  write-headers.mjs  writes dist/_headers: caching + a hash-based CSP
  probe-origins.mjs  origins the hero trace may call (must match site.ts)
```

## Layout rules

- The hero fills one screen on landscape screens 921 px and wider, and its type
  scales with screen height. After touching the hero, check 1366 x 625 and
  1280 x 580 (short laptops inside a browser): nothing may sit below the fold.
- Demo videos must stay click-to-play. No autoplay, no loading before the click.
- Certificates are named exactly as printed on them. A course is not a certification.

## Common changes

- **Add a project:** add an object to `projects.ts`, then render it in
  `components/Work.astro` with `<ProjectFeature project={...} />`.
- **Add an incident:** append to `incidents.ts`. Use the project's real ID in `ref`
  only if it exists in that project's records.
- **Add a live probe:** add it to `probes` in `site.ts` **and** its origin to
  `scripts/probe-origins.mjs`, or the Content-Security-Policy will block it.
- **Change the domain:** update `site` in `astro.config.mjs`.

## Commands

```
npm install
npm run dev       # http://localhost:4321
npm run build     # type-check, build to dist/, write dist/_headers
npm run preview   # serve dist/ locally
```

`npm run build` must pass with 0 errors before any push. After a visual change,
check 375 px, 820 px and 1440 px widths and keyboard focus.

## Deploy

Cloudflare Pages builds every push to `main`:
build command `npm run build`, output directory `dist`, environment variable
`NODE_VERSION=22`.
