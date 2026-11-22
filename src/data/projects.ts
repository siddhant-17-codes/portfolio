/**
 * Projects. Every number here was checked against the project's own
 * repository or records on 22 Nov 2026. Update the number and the date
 * together, or leave both alone.
 */

export type Link = { label: string; href: string };

export type Decision = { title: string; body: string };

export type Project = {
  id: string;
  name: string;
  oneLiner: string;
  status: { label: string; live: boolean };
  role: string;
  period: string;
  stack: string[];
  links: Link[];
  video?: { src: string; poster: string; seconds: number; caption: string };
  decisions?: Decision[];
  facts?: { value: string; label: string }[];
  caveat?: string;
};

export const reflect: Project = {
  id: 'reflect',
  name: 'Reflect',
  oneLiner:
    'Tells a candidate where they stand against a job description, and why, before they apply.',
  status: { label: 'Live · reflectcareer.com', live: true },
  role: 'Sole engineer: product, backend, frontend and the server it runs on',
  period: 'Apr 2026 – now',
  stack: [
    'Python 3.11',
    'FastAPI',
    'PostgreSQL',
    'SQLAlchemy 2 (async)',
    'Alembic',
    'spaCy',
    'sentence-transformers',
    'Next.js',
    'TypeScript',
    'Docker',
    'Caddy',
    'Oracle Cloud (ARM)',
  ],
  links: [{ label: 'Open reflectcareer.com', href: 'https://reflectcareer.com/' }],
  video: {
    src: '/media/reflect-demo.mp4',
    poster: '/media/reflect-poster.webp',
    seconds: 65,
    caption: 'One analysis from upload to report, recorded on the real app.',
  },
  decisions: [
    {
      title: 'Code decides. The model only explains.',
      body: 'The verdict, the score and every gap come from deterministic Python, so the same résumé and job description always get the same answer. A language model receives that finished, structured result and writes the readable explanation. It never sets a number.',
    },
    {
      title: 'Spend the model only where it changes something.',
      body: 'Clear mismatches get a report written by a template, with no API call. If the model fails, times out or the monthly budget gate closes, the same template writes a complete report. One semaphore caps model calls in flight. The result is about one dollar per 1,500 analyses.',
    },
    {
      title: 'A closed browser tab cannot kill an analysis.',
      body: 'Parsing runs inside the request. Everything after it runs as a background task that writes each stage to PostgreSQL. The live progress stream only reads those rows, and the page falls back to polling if the stream drops. I proved it by forcing the stream to fail.',
    },
    {
      title: 'Free to run, and unable to cost money by mistake.',
      body: 'It runs on a free Oracle Cloud ARM server behind Caddy, with staging before production, encrypted backups, health and certificate-expiry alerts, and an account quota policy that refuses to create anything that is not free.',
    },
  ],
  facts: [
    { value: '336', label: 'commits since April, one author' },
    { value: '52', label: 'merged pull requests' },
    { value: '1,500+', label: 'backend tests (pytest)' },
    { value: '1,000+', label: 'frontend tests (Vitest)' },
    { value: '45 / 45', label: 'analyses completed, load test up to 20 users at once' },
    { value: '30', label: 'written decision records' },
  ],
};

export const visionaryx: Project = {
  id: 'visionaryx',
  name: 'VisionaryX 2.0',
  oneLiner:
    'Ask questions about your PDFs and Word files and get answers that cite the page. Also reads images and generates them.',
  status: { label: 'Live · free servers', live: true },
  role: 'Led the development; rebuilt our 2024 Streamlit prototype as FastAPI + React',
  period: 'Mar – Nov 2026',
  stack: ['FastAPI', 'LangChain', 'FAISS', 'Gemini', 'Supabase', 'React', 'Vercel', 'Render'],
  links: [
    { label: 'Open the app', href: 'https://visionaryx-dusky.vercel.app/' },
    { label: 'Source', href: 'https://github.com/siddhant-17-codes/VisionaryX-2.0' },
  ],
  video: {
    src: '/media/visionaryx-demo.mp4',
    poster: '/media/visionaryx-poster.webp',
    seconds: 79,
    caption: 'PDF answers with page citations, image questions and text-to-image.',
  },
  decisions: [
    {
      title: 'Retrieval that admits when it has nothing.',
      body: 'Text is extracted page by page, split into 1,000-character chunks with 150 of overlap, embedded and kept in a FAISS index per chat. Five chunks come back, filtered by a relevance threshold, and the answer has to say so when the documents do not contain it.',
    },
  ],
  caveat:
    'No user accounts yet: your history lives in your own browser. The backend sleeps on a free server, so the first request after a quiet spell is slow.',
};

export const mindmate: Project = {
  id: 'mindmate',
  name: 'MindMate',
  oneLiner: 'A mental-wellness mobile app. My MCA major project.',
  status: { label: 'Not deployed', live: false },
  role: 'Led a team of five',
  period: '2025',
  stack: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore'],
  links: [{ label: 'Source', href: 'https://github.com/siddhant-17-codes/mindmate' }],
  decisions: [
    {
      title: 'What I built',
      body: 'Firebase sign-in with email verification, password reset and Google Sign-In; Firestore user profiles; and the mood-assessment flow, which I redesigned in five days after a review questioned what it gave the user.',
    },
  ],
};
