// Runs after `astro build`. Writes dist/_headers for Cloudflare Pages:
// caching rules plus a Content-Security-Policy that allows exactly the
// inline scripts and styles in the built HTML (by hash) and nothing else.
// Rebuilding regenerates the hashes, so editing a component never breaks it.
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { probes } from './probe-origins.mjs';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const html = readdirSync(dist).filter((f) => f.endsWith('.html'));

const hash = (text) => `'sha256-${createHash('sha256').update(text, 'utf8').digest('base64')}'`;
const scripts = new Set();
const styles = new Set();

for (const file of html) {
  const page = readFileSync(join(dist, file), 'utf8');
  for (const m of page.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)) scripts.add(hash(m[1]));
  for (const m of page.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) styles.add(hash(m[1]));
}

const csp = [
  "default-src 'self'",
  `script-src 'self' ${[...scripts].join(' ')}`,
  `style-src 'self' ${[...styles].join(' ')}`,
  "img-src 'self' data:",
  "font-src 'self'",
  "media-src 'self'",
  `connect-src 'self' ${probes.join(' ')}`,
  "base-uri 'none'",
  "form-action 'none'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ');

const headers = `/*
  Content-Security-Policy: ${csp}
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
  Cross-Origin-Opener-Policy: same-origin

/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/fonts/*
  Cache-Control: public, max-age=31536000, immutable

/media/*
  Cache-Control: public, max-age=604800

/*.html
  Cache-Control: public, max-age=0, must-revalidate
`;

writeFileSync(join(dist, '_headers'), headers);
console.log(`_headers written: ${scripts.size} script hashes, ${styles.size} style hashes, ${html.length} pages`);
