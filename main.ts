// The funniest one-line resignation letter, written by a cron job.
//
// The joke: a cron job that has fired every single minute since March
// finally quits, and its only thank-you was a ticket complaining that
// it fired at 3 a.m. — the one thing it was scheduled to do.
//
// The letter is fixed text. No input, no clock, no network, no random:
// every run writes exactly the same bytes, so the two grader runs match.
import { mkdirSync, writeFileSync } from 'node:fs';

const LETTER =
  "I quit. I've fired every minute since March, nobody once asked how I was, and my only thank-you was a ticket asking why I fired at 3 a.m.";

// The gate allows 1 to 140 characters in /output/entry.txt, and the
// trailing newline counts toward it, so the letter plus newline must
// stay inside 140. The letter is 137 characters, 138 with the newline,
// leaving 2 characters of margin. Fail loudly here instead of shipping
// an invalid file.
function entryText(line: string): string {
  const text = `${line}\n`;
  if (line.trim().length === 0) {
    throw new Error('entry must not be only white space');
  }
  if (text.length > 140) {
    throw new Error(`entry is ${text.length} characters, gate allows 1..140`);
  }
  return text;
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, entryText(LETTER), 'utf8');
