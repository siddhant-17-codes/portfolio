/**
 * How I decide. Each principle points at the place it came from,
 * so none of them is a slogan without evidence.
 */

export type Principle = { title: string; body: string; source: string };

export const principles: Principle[] = [
  {
    title: 'Start from the system, not the screen.',
    body: 'Before any interface I decide where the data lives, what happens when many people press the same button, what one use costs, and what the user sees when something fails. The screen is built on top of those answers.',
    source: 'how every project here began',
  },
  {
    title: 'Green tests are not proof it works.',
    body: 'A suite that runs one request at a time cannot see a pool running dry. Every change gets the test that matches how it can actually fail.',
    source: 'PPR-R35, Reflect',
  },
  {
    title: 'No patch without a cause.',
    body: 'If I cannot explain a failure, I record what I ruled out and leave it open. A fix for a cause I cannot name only hides the next clue.',
    source: 'PPR-R93, Reflect',
  },
  {
    title: 'Cost is part of the design.',
    body: 'The cheapest model call is the one you never make. Reflect decides before calling a model whether the call would change anything, and its server cannot spend money even by mistake.',
    source: 'Reflect’s budget gate and quota policy',
  },
  {
    title: 'Say the weak spot first.',
    body: 'VisionaryX has no user accounts yet and sleeps on a free server. I would rather you read that here than find it yourself.',
    source: 'this page',
  },
];
