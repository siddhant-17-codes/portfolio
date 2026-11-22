/**
 * Identity, links and the live probes shown in the hero.
 * Everything a visitor can read about "who and where" lives here.
 */

export const person = {
  name: 'Siddhant Thakur',
  role: 'Backend Python developer',
  place: 'Kolkata, India',
  timezone: 'Asia/Kolkata',
  /** Split so the address never appears whole in the HTML that scrapers read. */
  email: { user: 'siddhantt649', domain: 'gmail.com' },
  links: {
    github: 'https://github.com/siddhant-17-codes',
    linkedin: 'https://www.linkedin.com/in/siddhantthakur-/',
  },
} as const;

export const meta = {
  title: 'Siddhant Thakur — Backend Python developer',
  description:
    'Backend Python developer in Kolkata. I build and run Reflect, a live résumé-to-job analysis platform, and write up what breaks and how I fixed it.',
} as const;

export type Probe = {
  id: string;
  /** Short name used in sentences, e.g. "VisionaryX". */
  name: string;
  label: string;
  host: string;
  url: string;
  /**
   * cors: the server allows cross-origin reads, so the status code is checked.
   * opaque: only reachability and time can be measured from the browser.
   */
  mode: 'cors' | 'opaque';
  /** Give up after this long. A sleeping free-tier server needs close to a minute. */
  timeoutMs: number;
  note?: string;
};

export const probes: Probe[] = [
  {
    id: 'reflect',
    name: 'Reflect',
    label: 'reflectcareer.com',
    host: '/api/v1/health',
    url: 'https://reflectcareer.com/api/v1/health',
    mode: 'opaque',
    timeoutMs: 10_000,
  },
  {
    id: 'visionaryx',
    name: 'VisionaryX',
    label: 'visionaryx api',
    host: '/health · free tier',
    url: 'https://visionaryx-backend.onrender.com/health',
    // VisionaryX only allows its own site to read responses (CORS), so this
    // check can see that the server answered, not what it said. It still wakes it.
    mode: 'opaque',
    timeoutMs: 90_000,
    note: 'VisionaryX sleeps on a free server. This page sent it a wake-up request when you arrived, so it should be awake by the time you open it.',
  },
];
