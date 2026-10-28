# Review checks — client-update-letter (FALLBACK SKELETON)

**Class B — client update / status letter.**
Source of the checks: `references/document-classes.md` § B and § universal.

> **Read this first.** This template is a FALLBACK, not an example to copy.
> Its locked prose is **62 words**, measured — well under this kit's own
> 150-word floor. It **fails the refusal gate in
> `workflows/extract-template.md` Step 2.5**, and that is the correct signal:
> a template made of the kit's wording instead of the customer's is the
> generic letter they already have.
>
> Use it only for a customer who genuinely has nothing on file, and when you
> do, say so in their words: *"This is a starter skeleton, not your wording.
> Replace it the first time you send a real one."* Then the moment a real
> letter of theirs exists, run `extract-template.md` on it and retire this.
>
> When you build a template from a real document, this file is written FRESH
> from `references/document-classes.md`, with the customer's own document
> scored against every check. Do not copy the scores below — they describe a
> skeleton, not their business.

## Class B checks

| # | Check | Severity | How this skeleton scores |
| --- | --- | --- | --- |
| B1 | The ask is separated from the status | FLAG | **PASS** — "What we need from you" is its own section. |
| B2 | The ask carries a dated deadline | FLAG | **ABSENT.** `{{anything needed from the client}}` has no companion date field. When you build a real template, add one. |
| B3 | The ask leads when it is urgent | FLAG | **CANNOT PASS AS BUILT.** The ask is locked into section four. If the deadline supplied at fill time is inside seven days, flag it and offer to move the ask above the status. This is the exact defect the tribunal found: a decision needed by Monday landing under a mild heading in section four. |
| B4 | Bad news is stated, not implied | FLAG | Depends on the fill. `{{what is happening next}}` is where a delay lands; if the fields describe a slip and the letter never names it, flag it. |
| B5 | The next step has an owner | FLAG | Depends on the fill. "The next step is to {{next step}}" does not force an owner into the sentence. |
| B6 | No commitment the customer did not make | FLAG | Every date in the letter comes from a supplied field. PASS by construction. |
| B7 | Contact route present | NOTE | **PASS** — phone and email are in the locked closing. |

## Universal checks

Run by `references/universal-checks.js` (or its RULES table by hand). All seven
apply to every document built from this template:

| # | Check | Severity |
| --- | --- | --- |
| U1 | No unfilled field surviving in the finished text | STOP |
| U2 | No placeholder prose (TBD, XXX, TODO, insert, lorem, `[ ]`, mid-sentence N/A) | STOP |
| U3 | Every date field holds a real date, not "soon" or "at your convenience" | FLAG |
| U4 | Every money field holds a currency and a number | FLAG |
| U5 | Recipient name spelled the same everywhere, and present | FLAG |
| U6 | Sender identity appears once (letterhead only) | FLAG |
| U7 | No other client's name appears anywhere | STOP |

U3 is worth watching on this template specifically:
`{{date or timeframe for next step}}` invites "end of the month," which is
exactly what U3 flags.

## Fields this template's STOP-severity checks depend on

If any of these is empty at fill time, **STOP. ASK.** (`fill-and-render.md`
Step 3):

- `{{client full name}}` — U5 and U7 both need it.
- `{{today's date}}` — the document is undated without it.
- `{{project or matter name}}` — the reader cannot tell what this is about.

Fields that sit inside a sentence and break it if skipped:
`{{next step}}`, `{{date or timeframe for next step}}`,
`{{what is happening next}}`.

## Standing decisions

None. A real template records the customer's answers here — wording they added,
checks they asked you to keep flagging, and checks they deliberately waived. A
waived check never nags them again.
