# How Doc Factory was built

Sources for this page: the kit's `CHANGELOG.md`, its test file, the history of
the private business repository the kit was developed in (where it lived under
`pocs/kits/` and later `kits/`), the pull request for its 2026-08-13 hardening
round, and the internal audit and workout reports that drove the reworks. This
public repository starts from a single snapshot commit on 2026-10-27.

## The problem and the first version (2026-07-15)

The starting idea: small offices keep re-editing last month's letter, and the
wording they have refined for years is their real asset. Version 1.0
(2026-07-15) was a render pipeline around one shipped template, a client
update letter. The AI filled the fields and produced one complete,
ready-to-open HTML page in the owner's documents folder. That release already
fixed problems found in a review by an OpenAI model (GPT-5.6): a paste-into-HTML
step was removed, a doubled letterhead was fixed, all field values were
HTML-escaped, and an upgrade path learned to back up and keep the customer's
config, branding and templates.

## Timeline

| Date | Version | What happened |
| --- | --- | --- |
| 2026-07-15 | 1.0 | Render contract, upgrade path, path resolution, `START-HERE.md`. |
| 2026-07-30 | 1.0 | First commit of the kit into version control. |
| 2026-08-11 | - | Quality audit of the whole kit line. Verdict for this kit: rework. |
| 2026-08-12 | 1.0.1 | Rework: extract-first, document classes, provenance, the verification gate, refusals, run history, `universal-checks.js`, three worked examples. |
| 2026-08-12 | 1.0.2 | Workout: three rounds against simulated buyers; sixteen findings fixed; fourth worked example. |
| 2026-08-13 | 1.0.3 | Hardening pass: checks moved from prose into code, upgrade data loss fixed, first `node:test` suite. |
| 2026-08-17 | 1.0.4 | Cross-model review fixes: the standing-promise rule rewritten, Node declared as a dependency, 12 tests. |
| 2026-08-24 | 1.0.4 | Kit moved from `pocs/kits/` to `kits/`. |
| 2026-10-20 | 1.0.5 | Favicon on every page. |
| 2026-10-27 | 1.0.5 | Public portfolio snapshot. |

## The audit that changed the product (2026-08-11)

A structured audit scored every kit in the line on ten criteria (does the
first run use the customer's own data, is there real domain judgment, does it
refuse anything, and so on). Doc Factory scored well on the page it produced
and badly on what mattered. The audit ran the fill workflow literally for a
landscaping company and found that everything that made the letter good was
content the auditor had invented: strip the fields out and 68 words of locked
prose remained. Worse, the fixed skeleton forced an urgent decision into
section four of the letter, which made the result worse than a bare AI that
would have led with the request.

The audit's rework list became version 1.0.1 the next day:

- **Extract first.** The installer now asks for the owner's own best document
  and runs extraction on it as the first thing the kit ever does. The shipped
  letter was demoted to a labelled fallback, because it fails the kit's own
  new thin-template refusal at 68 words.
- **Judgment by document class.** `references/document-classes.md` lists what
  an engagement letter, client update, change order, fee notice and proposal
  must carry, including arithmetic contradictions. A per-template
  `review-checks.md` is written at extraction and re-run on every fill.
- **Provenance and the gate.** Locked paragraphs are numbered `L1`, `L2`...
  with their source. `verify-page.html` shows the document under a
  `PREVIEW - NOT VERIFIED` watermark and releases nothing until the owner
  ticks a box and clicks "I validate this and I want it".
- **Run history.** One sidecar per finished run, so the next letter opens with
  "last month you said the curbing would be set by August 20; did that
  happen?" and eighteen questions become four.
- **Determinism first.** The mechanical checks became `universal-checks.js`,
  with a hand-application rules table for runtimes that cannot run code. The
  receipts in the worked examples were produced by the gate's own code, not
  written by hand.

## Simulated buyers (2026-08-12)

The same day, every kit in the line went through a "workout": an agent ran
the kit's own instructions end to end as a named, invented buyer, fixed what
broke, then ran again with a harder buyer against the fixed files. Nine Claude
Opus agents ran three rounds each. For Doc Factory the buyers were a title
agency, an insurance brokerage feeding it hostile input, and an excavation
contractor dictating from a job site on his fifth run. Sixteen findings came
out, each observed breaking rather than reading badly. The most serious:

- The released file was styled with an undefined CSS variable, so every
  downloaded document fell back to the kit's default colour whatever the
  customer's brand. The owner attested to one document and received another.
  The builder now reads the live brand colour off the page.
- The recipient-name check took the last word of the name as the surname. For
  "Alanna Brizuela, Esq." that was "Esq.", so it matched nothing and a
  misspelled surname passed unexamined. It now strips honorifics and suffixes
  and detects near misses by edit distance; matching only the correct
  spelling can never find the wrong one.
- "Monday" passed as a date. The check was rewritten so a value passes only
  if a stranger could tell which day it means next week.
- A prompt injection inside a pasted document would have been locked into the
  template as permanent prose. Suspicious lines are now always excluded from
  locked prose and recorded.
- A one-off favour in an old letter was one step from becoming published
  policy. That produced the standing-promise refusal and worked example 4.

The workout report was explicit that this was simulated-buyer evidence, not a
real customer's document.

## Hardening and cross-model review (2026-08-13 and 2026-08-17)

The 2026-08-13 pass found that several "deterministic" gates were still the AI
counting words and matching phrases. Word counts, the variable percentage,
field count and the standing-promise scan moved into `runExtractionChecks()`;
the first `node:test` suite (four tests) was added; and an upgrade bug that
could destroy a customer's accumulated templates, checks and history was
fixed. The pull request listed what stayed open honestly: no real-device run
and an untested claude.ai web install.

On 2026-08-17 the kit went through a cross-family review: Claude Opus and a
second model family (Terra) reviewed it independently, and the
confirmed findings were fixed:

- The standing-promise rule fired on "Please return the signed copy no later
  than the date shown above", the most common sentence in the kit's own target
  documents. It is now three ordered conditions: a commitment or a promised
  interval, said by the business, and not a deadline the reader is being asked
  to meet.
- The code and the workflow text disagreed about that rule (one said AND, the
  other OR). The same rule is now stated identically in the code, the rules
  table and the refusal text.
- Fixing the rule exposed a second bug: sentences were split on every newline,
  so the promise in worked example 4, which wraps across a line, was two
  harmless halves. Soft wraps are now joined before splitting.
- The README claimed "no Node install" after Node had become the documented
  path. `kit.json` now declares Node 22.6+, and a checklist box whose evidence
  had gone false was corrected and marked as a correction.

Eight tests were added, bringing the suite to 12. The changelog records that
the fix was proven red-first: disabling the business-subject condition fails
the suite.

## How AI was used

AI agents did most of the writing, testing and reviewing, under a rule that a
script owns anything with a single right answer and the AI owns the
conversation and judgment. Concretely, from the history:

- Claude (Fable 5) co-authored the rework and workout commits.
- Nine Claude Opus agents ran the simulated-buyer workout, each fixing defects
  between rounds.
- An OpenAI model reviewed the 1.0 release, an OpenAI Codex model authored
  hardening passes elsewhere in the kit line, and the 2026-08-17 review paired
  Claude Opus with a second model family so each could catch what the other
  missed.
- Every claim of "verified" in the changelog is scoped to what was actually
  run; simulated buyers are never reported as real customers.

## How it is tested

- `skills/doc-kit/references/universal-checks.test.js`: 12 `node:test` cases
  covering the extraction refusals, the standing-promise rule and its
  non-hits, soft line wraps, and the fill-time checks.
- Four worked examples whose receipts were generated by the gate's own code.
- The gate's page logic was parsed and exercised against a synthetic DOM.

## What did not work

- The original product: a template the kit supplied. It produced a nice page
  around the customer's own content and added little else. Extracting from
  the customer's document replaced it.
- Rules stated only in prose. Several checks described as deterministic were
  the AI's best effort until they moved into code.
- A lexical standing-promise test without a subject. It refused ordinary
  deadline sentences until the "who owes whom" conditions were added.

## Current state

Version 1.0.5, experimental. Tests pass. Still open, and stated in the README:
a person running the full path on a real device from a real document to a
printed PDF, and the claude.ai web install.
