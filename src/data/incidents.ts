/**
 * The incident log. Each entry is a real failure from one of the projects,
 * written the way a postmortem is: what broke, why, the fix, and what
 * changed afterwards so it cannot happen the same way again.
 *
 * `ref` is the ID the problem carries in the project's own records,
 * when it has one. Never invent one.
 */

export type Incident = {
  id: string;
  ref?: string;
  project: 'Reflect' | 'VisionaryX 2.0' | 'ResuHire AI';
  when: string; // e.g. "Oct 2026"
  title: string;
  state: 'fixed' | 'open';
  /** Who was affected. Say "nobody" when it was caught before release. */
  impact: string;
  happened: string;
  cause: string;
  fix: string;
  after: string;
};

export const incidents: Incident[] = [
  {
    id: 'pool',
    ref: 'PPR-R35',
    project: 'Reflect',
    when: 'Oct 2026',
    title: 'Ten users at once, four reports',
    state: 'fixed',
    impact: 'Nobody. Caught before anything was deployed.',
    happened:
      'I upgraded FastAPI from 0.115 to 0.141 to close security advisories. Every test passed. Two days later a capacity study ran ten analyses at the same time: four finished, four stayed "processing" forever, one failed and one returned a 500.',
    cause:
      'The new FastAPI runs a dependency\'s cleanup after the request\'s background task, not before. The database session was such a dependency, so each analysis held its connection for the whole pipeline and the pool of 15 ran dry. The tests passed because they ran one request at a time.',
    fix: 'Database sessions scoped to the function that uses them, and the report stage releases its transaction before waiting on the model. A connection tracer confirmed it, and new tests fail on the old code.',
    after:
      'Any dependency change now has to pass a concurrency test with live progress streams, from 1 to 20 users. It went 45 of 45 with the real model on.',
  },
  {
    id: 'stuck',
    ref: 'PPR-R36',
    project: 'Reflect',
    when: 'Oct 2026',
    title: 'Stuck "processing" with a false explanation',
    state: 'fixed',
    impact: 'Nobody. Found by the same capacity study.',
    happened:
      'When the pool timed out at the very first lookup, the analysis stayed "processing" indefinitely. At the next restart, a cleanup job marked it "interrupted by a server restart", which was not true.',
    cause:
      'That lookup sat outside any error handling, so the exception escaped the background task and no final status was ever written.',
    fix: 'The pipeline runner now guarantees a final state: any escaping error is recorded as failed, in its own session, with retries. The restart cleanup now only states what it actually knows.',
    after: 'A rule I keep: a user should never be shown a reason that the system cannot prove.',
  },
  {
    id: 'pickle',
    project: 'VisionaryX 2.0',
    when: 'Oct 2026',
    title: 'Code execution hiding in the database',
    state: 'fixed',
    impact: 'No known misuse. Found in a security review of the code.',
    happened:
      'Vector indexes were saved to the database as Python pickles and loaded with LangChain\'s "allow dangerous deserialization" flag switched on.',
    cause:
      'Unpickling runs code. Anyone able to write a row in that table could have run code on the server.',
    fix: 'New indexes are stored as JSON: the raw FAISS index plus each chunk\'s text and metadata. Old indexes still load, through an unpickler that only accepts two known data classes and runs none of their code.',
    after:
      'Tests prove old and new formats load identically, down to every vector, and that a tampered pickle is refused without running.',
  },
  {
    id: 'parser',
    project: 'ResuHire AI',
    when: '2025',
    title: 'One missed section broke everything after it',
    state: 'fixed',
    impact: 'Every analysis in my first version. This is why Reflect exists.',
    happened:
      'Job matches came back for the wrong field entirely, and skill groups were empty.',
    cause:
      'The résumé parser recognised only one section of a résumé. Every later stage trusted its output, so one early mistake spread through all of them.',
    fix: 'I stopped patching it and rebuilt from scratch with clear boundaries between stages, each one validated and tested on its own. That rebuild became Reflect.',
    after: 'I now check the first stage of a pipeline hardest, because every later stage believes it.',
  },
  {
    id: 'hang',
    ref: 'PPR-R93',
    project: 'Reflect',
    when: 'Nov 2026',
    title: 'A one-minute hang I chose not to patch',
    state: 'open',
    impact: 'One live progress stream stalled for about a minute. The page fell back to polling and the report still arrived.',
    happened:
      'In a load test at ten concurrent users, one database connect hung for about 56 seconds until asyncpg\'s timeout ended it.',
    cause:
      'Not established. I ruled out pool exhaustion, load, PostgreSQL itself, the model client and DNS, and 5,700 deliberate connects could not reproduce it.',
    fix: 'None yet, on purpose. A timeout plus retry would hide the symptom without explaining it.',
    after: 'It stays open in the register with what was ruled out and what would reopen it.',
  },
];
