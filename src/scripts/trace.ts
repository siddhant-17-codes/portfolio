/**
 * Drives the hero's live trace. Each row's bar grows in real time against a
 * shared time axis, the way a network waterfall does, so a slow server
 * visibly pushes the others to the left.
 */
import type { Probe } from '../data/site';

type RowState = 'pending' | 'ok' | 'fail';

type Row = {
  el: HTMLElement;
  fill: HTMLElement;
  ms: HTMLElement;
  label: HTMLElement;
  start: number;
  end: number | null;
};

const MIN_AXIS_MS = 1200;

export function formatMs(ms: number): string {
  if (ms < 1000) return `${Math.max(1, Math.round(ms))} ms`;
  if (ms < 10_000) return `${(ms / 1000).toFixed(1)} s`;
  return `${Math.round(ms / 1000)} s`;
}

function bindRow(root: HTMLElement, id: string): Row | null {
  const el = root.querySelector<HTMLElement>(`[data-row="${id}"]`);
  if (!el) return null;
  return {
    el,
    fill: el.querySelector<HTMLElement>('.fill')!,
    ms: el.querySelector<HTMLElement>('[data-ms]')!,
    label: el.querySelector<HTMLElement>('[data-label]')!,
    start: performance.now(),
    end: null,
  };
}

function settle(row: Row, state: RowState, label: string, end = performance.now()): void {
  row.end = end;
  row.el.dataset['state'] = state;
  row.label.textContent = label;
  row.ms.textContent = formatMs(row.end - row.start);
}

async function check(probe: Probe): Promise<{ ok: boolean; reason: 'up' | 'down' | 'timeout' | 'unreachable' }> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), probe.timeoutMs);
  try {
    const res = await fetch(probe.url, {
      mode: probe.mode === 'cors' ? 'cors' : 'no-cors',
      cache: 'no-store',
      credentials: 'omit',
      signal: ctrl.signal,
    });
    // An opaque response proves the server answered; its status is hidden from us.
    if (probe.mode === 'opaque' || res.ok) return { ok: true, reason: 'up' };
    return { ok: false, reason: 'down' };
  } catch {
    return { ok: false, reason: ctrl.signal.aborted ? 'timeout' : 'unreachable' };
  } finally {
    clearTimeout(timer);
  }
}

export function runTrace(root: HTMLElement): void {
  const probes: Probe[] = JSON.parse(root.dataset['probes'] ?? '[]');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const note = root.querySelector<HTMLElement>('[data-note]');
  const announce = root.querySelector<HTMLElement>('[data-announce]');
  const started = root.querySelector<HTMLElement>('[data-started]');

  if (started) {
    const t = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(new Date());
    started.textContent = `started ${t} IST`;
  }

  // Row 1: this page, from the browser's own navigation timing.
  const self = bindRow(root, 'self');
  if (self) {
    const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    const took = nav && nav.responseEnd > 0 ? nav.responseEnd - nav.startTime : performance.now();
    self.start = 0;
    settle(self, 'ok', 'served', took);
  }

  const rows = new Map<string, Row>();
  for (const probe of probes) {
    const row = bindRow(root, probe.id);
    if (!row) continue;
    rows.set(probe.id, row);
    void check(probe).then((result) => {
      // An opaque check proves the server answered, not that it is healthy, so it says less.
      const up = probe.mode === 'cors' ? 'up' : 'responding';
      const label = { up, down: 'down', timeout: 'no reply', unreachable: 'unreachable' }[result.reason];
      settle(row, result.ok ? 'ok' : 'fail', label);
      explain(probe, row, result.reason);
      if ([...rows.values()].every((r) => r.end !== null)) summarise();
    });
  }

  function explain(probe: Probe, row: Row, reason: 'up' | 'down' | 'timeout' | 'unreachable'): void {
    if (!note || !probe.note || row.end === null) return;
    const took = row.end - row.start;
    const name = probe.name;
    if (reason === 'timeout') {
      note.textContent = `${name} did not answer within ${formatMs(probe.timeoutMs)}. Its free server sometimes takes longer to wake; opening the app will try again.`;
    } else if (reason === 'unreachable') {
      note.textContent = `Your network could not reach ${name} just now. Some office and campus networks block these requests; opening the app directly usually works.`;
    } else if (reason === 'down') {
      note.textContent = `${name} answered, but reported a problem. If it is still down when you open it, I would like to hear about it.`;
    } else if (took > 5000) {
      note.textContent = `${probe.note} It took ${formatMs(took)} to wake up.`;
    } else {
      note.hidden = true;
      return;
    }
    note.hidden = false;
  }

  function summarise(): void {
    if (!announce) return;
    announce.textContent = [...rows.entries()]
      .map(([id, r]) => `${id} ${r.label.textContent} in ${r.ms.textContent}`)
      .join(', ');
  }

  // Show the sleeping-server note while it is still waking, not only afterwards.
  for (const probe of probes) {
    if (!probe.note || !note) continue;
    setTimeout(() => {
      const row = rows.get(probe.id);
      if (row && row.end === null) {
        note.textContent = probe.note ?? '';
        note.hidden = false;
      }
    }, 2500);
  }

  const all = [self, ...rows.values()].filter((r): r is Row => r !== null);

  function draw(): void {
    const now = performance.now();
    const spans = all.map((r) => (r.end ?? now) - r.start);
    const axis = Math.max(MIN_AXIS_MS, ...spans) * 1.08;
    all.forEach((r, i) => {
      r.fill.style.width = `${((spans[i] ?? 0) / axis) * 100}%`;
      if (r.end === null) r.ms.textContent = formatMs(spans[i] ?? 0);
    });
    if (all.some((r) => r.end === null)) schedule();
  }

  function schedule(): void {
    if (reduceMotion) setTimeout(draw, 1000);
    else requestAnimationFrame(draw);
  }

  draw();
}
