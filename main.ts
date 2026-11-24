// Make the AI Judge Laugh: Developer Excuses — make.fun entry.
// Writes one funny single-line excuse a developer gives when code breaks
// in production to /output/entry.txt. Deterministic: the same exact bytes
// on every run. Node 22, stdlib only, no network, no other files read.
import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE = "The logs say it's fine; the logs are from staging.";

// Optional first argument overrides the output path (used for local
// verification); the grader runs `node main.ts` with no arguments.
const outPath = process.argv[2] ?? "/output/entry.txt";

function validateLine(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(
      `Line is ${line.length} characters, outside the 1-200 character gate.`,
    );
  }

  if (line.trim().length === 0) {
    throw new Error("Line must not be empty or only whitespace.");
  }
}

validateLine(LINE);

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE, "utf8");
chmodSync(outPath, 0o644);
