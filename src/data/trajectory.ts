/**
 * How I got here, in order. Dates are when the work happened.
 */
export type Milestone = { when: string; what: string; note: string };

export const trajectory: Milestone[] = [
  { when: '2019', what: 'B.Sc. Computer Science', note: 'First code, coming from a PCMB science background.' },
  { when: '2023', what: 'MCA begins', note: 'After a year preparing for the entrance exam.' },
  { when: '2024', what: 'VisionaryX v1', note: 'A Streamlit RAG prototype with my MCA team. My first retrieval system.' },
  { when: '2025', what: 'MindMate and ResuHire AI', note: 'Led a five-person mobile app team; built my first résumé-matching backend. MCA complete.' },
  { when: 'Mar 2026', what: 'VisionaryX 2.0', note: 'Rebuilt the prototype as FastAPI + React and deployed it.' },
  { when: 'Apr 2026', what: 'Reflect begins', note: 'Rebuilt ResuHire from scratch with clear stage boundaries.' },
  { when: 'Oct 2026', what: 'HackerRank Orchestrate', note: 'Built and deployed an AI agent; ranked 971 of 4,094.' },
  { when: 'Nov 2026', what: 'Reflect goes live', note: 'Public at reflectcareer.com, on a server I run.' },
];
