/**
 * Expertise: what I work across, each area tied to the project that proves it.
 * Checked against the repositories and their docs on 22 Nov 2026.
 * Reflect's repository is private: name tools and stages, never weights,
 * thresholds or prompts.
 */

export type Area = {
  title: string;
  body: string;
  proof: string;
  tools: string[];
};

export const areas: Area[] = [
  {
    title: 'Backend and APIs',
    body: 'Async REST APIs with validated contracts, relational schemas with versioned migrations, background work that survives a dropped connection, live progress over SSE with a polling fallback, rate limits and per-session ownership on every read.',
    proof: 'Reflect, VisionaryX 2.0',
    tools: ['Python', 'FastAPI', 'Pydantic v2', 'PostgreSQL', 'SQLAlchemy 2 (async)', 'Alembic', 'asyncio', 'SSE'],
  },
  {
    title: 'RAG and document intelligence',
    body: 'Page- and section-aware extraction from PDF and Word, chunking that never crosses a page, embeddings with separate query and document tasks, exact vector search with an adaptive relevance filter, and citations that cannot be hallucinated.',
    proof: 'VisionaryX 2.0',
    tools: ['LangChain', 'FAISS', 'Gemini embeddings', 'pypdf', 'python-docx', 'Supabase'],
  },
  {
    title: 'LLM engineering',
    body: 'Code decides and the model explains. Model fallback chains, a budget gate that decides before any call is made, a semaphore on calls in flight, and a deterministic template that writes a complete answer when the model cannot.',
    proof: 'Reflect, VisionaryX 2.0',
    tools: ['Anthropic Claude API', 'Gemini API', 'Gemini Vision', 'FLUX.1 (Hugging Face)'],
  },
  {
    title: 'Applied NLP and machine learning',
    body: 'Linguistic parsing of résumés and job descriptions, and semantic skill matching with sentence embeddings against a curated skill taxonomy. Comfortable with the classical ML and deep-learning toolkits beneath it.',
    proof: 'Reflect',
    tools: ['spaCy', 'sentence-transformers', 'scikit-learn', 'PyTorch', 'TensorFlow', 'Pandas', 'NumPy'],
  },
  {
    title: 'Testing and evaluation',
    body: 'Unit, integration and real-database tests; a parity harness that re-runs recorded cases through the live API and must show zero difference; a benchmark of candidate personas; concurrency load ladders before any dependency change.',
    proof: 'Reflect',
    tools: ['pytest', 'Vitest', 'Ruff', 'load testing'],
  },
  {
    title: 'Agents and AI-assisted engineering',
    body: 'Built and deployed an AI agent in HackerRank’s Orchestrate (rank 971 of 4,094). Day to day I run Claude Code and Codex as a fast team I lead: I set the decisions and the tests, and I review every change.',
    proof: 'HackerRank Orchestrate, Oct 2026',
    tools: ['Claude Code', 'Codex'],
  },
  {
    title: 'Infrastructure and operations',
    body: 'Containerised deploys behind a reverse proxy, staging before production, encrypted backups with a restore script, health and certificate alerts, and cloud accounts fenced so they cannot spend money.',
    proof: 'Reflect',
    tools: ['Docker', 'Caddy', 'Oracle Cloud', 'systemd', 'Cloudflare', 'Vercel', 'Render'],
  },
  {
    title: 'Languages and frontend',
    body: 'Python first. SQL and PL/SQL for data, TypeScript and React when the interface needs building, Java for OOP, C++ for algorithms.',
    proof: 'All projects',
    tools: ['Python', 'SQL', 'TypeScript', 'Next.js', 'React', 'Java', 'C++', 'Flutter'],
  },
];

/** VisionaryX's RAG pipeline, with the values its code actually uses. */
export const ragSteps: { step: string; detail: string }[] = [
  { step: 'Extract', detail: 'PDF page by page with three fallback strategies; Word headings become sections, tables read row by row. Scanned PDFs are refused, not indexed empty.' },
  { step: 'Chunk', detail: 'Recursive splitter, 1,000 characters with 150 overlap, split per page or section so a citation is always exact.' },
  { step: 'Embed', detail: 'gemini-embedding-001, 3,072 dimensions, document and query task types so a question lands near the passage that answers it.' },
  { step: 'Search', detail: 'Exact FAISS IndexFlatL2, k = 5. Each chat has its own small index, where exact search takes milliseconds and never misses a match.' },
  { step: 'Filter', detail: 'Adaptive cut-off: keep chunks within 1.4 × the best distance, capped at 2.0, so the bar moves with each question.' },
  { step: 'Answer', detail: 'Answer only from the kept chunks, with a fixed sentence for “not in the documents” and a three-model fallback chain.' },
  { step: 'Cite', detail: 'Citation cards are built from the chunks sent to the model, never parsed from its text, so a card always points at a real passage.' },
];

/** What a production version would add next: reasoning I can defend in an interview. */
export const ragNext: string[] = [
  'Rerank 50 candidates with a cross-encoder',
  'Hybrid BM25 + vector search, merged with reciprocal rank fusion',
  'A labelled question set scored with recall@k and MRR on every change',
];
