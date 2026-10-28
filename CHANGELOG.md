# Changelog — Doc Factory

Versions are patch-only by default (repo standard). `VERSION` and the
`**Version:**` line in `installer.md` must always agree — KIT-STANDARD §4.8's
upgrade path reads that line.

## 1.0.5 — rTech favicon on every page (2026-10-20)

Pages carry the rTech favicon (#1027).

## 1.0.4 — standing-promise gate made honest, Node declared (2026-08-17)

Fixes for the confirmed findings of the cross-family (Opus + Terra) kit-hardening
review of 2026-08-17. Every item below closes something that was observed
breaking against real target-document wording, not something that read badly.

### The refusal gate fired on the most common sentence in its own target documents

`isStandingPromise()` OR-ed the commitment terms with the promised-interval
terms, and `no later than` was in the interval list unconditionally. "Please
return the signed copy no later than the date shown above" — an engagement
letter and change-order staple — returned a standing-promise STOP. The buyer's
first extraction would have been an argument with the kit about a sentence that
is not a promise at all. `same day` and `within N days` had the same exposure
whenever they described a CLIENT obligation.

The rule is now three ordered conditions, all of which must hold:

- **(a)** the sentence carries a commitment term OR a promised interval;
- **(b)** the sentence says what the BUSINESS does (`we`, `our`, `us`, `I`,
  `my`, `the firm/office/agency/company/practice/business`);
- **(c)** if the ONLY match in (a) was an interval, and the sentence asks the
  reader to act (`please return/sign/remit/send/...`, `you must`,
  `you are required to`, `your payment is due`), it is a deadline the business
  is ASKING the reader to meet, not a promise it is MAKING — not a hit.

This is Terra's P2 as well: a lexical two-category test is not context-safe on
its own, so (b) and (c) add the missing subject/direction criterion — who owes
whom. The Kowalczyk sentence the kit's own worked example 4 is built on ("we
will run a continuation search at no additional charge within ten days of
closing") still fires, and is now covered by a named test.

### Code and the prose that owns the refusal disagreed about the boolean

`extract-template.md` STOP condition 2b documented the trigger as requiring BOTH
a commitment word and a scope word while the shipped code OR-ed them, and the
no-code-execution RULES table entry E3 reproduced the CODE rather than the
documented rule. KIT-STANDARD §4.9 requires the refusal's trigger to be one
deterministic mechanical rule written into the workflow that owns the step. The
same three-condition boolean is now stated identically in all three places —
`isStandingPromise()`, E3, and STOP condition 2b — each with the same worked
pair of examples showing one hit and one non-hit.

### A wrapped sentence was two half-sentences, and the gate read neither

Adding the subject criterion exposed a second defect in the same path.
`splitSentences()` cut on EVERY newline, and locked prose arrives wrapped —
pasted out of Word, out of a markdown blockquote, out of an email. The kit's own
worked example 4 carries the Kowalczyk promise across a line break ("...which
we" / "will run at no additional charge within ten days of closing"), and split
that way neither half is a commitment with a subject nor a subject with a
commitment. Under the new rule the gate would have MISSED the exact sentence the
example exists to demonstrate. Soft line wraps are now joined before splitting:
a newline ends a sentence only when the preceding line ends in `. ! ? : ;` or
the next line opens a list, heading, or quote marker. Blank lines always split,
so two adjacent sentences never merge into one and borrow each other's subject.

### Eight new behavior tests, and one false receipt corrected

`universal-checks.test.js` grew cases for the client-facing `no later than`
deadline, a reader-facing `within ten days` obligation, an interval with no
subject, a business commitment embedded in a reader-facing sentence, a
business-made interval promise carrying no commitment word, the Kowalczyk
worked-example sentence, a promise split across a soft line wrap, and a blank
line correctly keeping two sentences apart. Suite is **12 tests, 12 passing**
under `node --test skills/doc-kit/references/universal-checks.test.js` on Node
24 (2026-08-17). Proven red-first: disabling the business-subject condition
fails the suite (1 failing, exit 1), so the tests observe the fix rather than
merely accompanying it.

### Node was an undeclared dependency of the documented path

1.0.3 made a literal `node -e '...'` command the documented way to run the
extraction and fill gates, and added `node --test` behavior tests, but the
README still declared the T2 dependency floor as "no Bun, no jq, no Python, and
no Node install" and the acceptance checklist still carried a `[x]` box whose
stated evidence was "no Bun/jq/Python/Node dependency exists in the T2 path."
That receipt had gone false the moment the `node -e` commands landed, and a
checked box with false evidence is worse than an unchecked one.

- Added `kit.json` with `requirements.runtimes.node: ">=22.6.0"` — the §9.3
  floor, matching the rest of the line. The kit had no `kit.json` at all.
- Rewrote the README dependency-floor paragraph: no Bun, no jq, no Python, no
  build step, no `npm install`, zero shell scripts (so the bash-3.2 floor holds
  by construction) — and Node 22.6.0+ IS required on the documented command
  path, with the AI-sandbox and hand-applied-RULES-table alternatives named and
  the T3 one labeled degraded.
- Corrected the T1 and T2 ladder rows and the acceptance-checklist box, which
  now records what was actually re-verified on 2026-08-17 and says plainly that
  it is correcting the 2026-08-13 receipt.
- Corrected the README headline "No software to install, no server, no terminal"
  and the operations manual's "no software to install", both of which were
  absolute claims the Node path invalidated.

## 1.0.3 — plain-Node buyer-path and upgrade hardening (2026-08-13)

- Reproduced the coding-agent install shape using only plain Node and the kit's
  documented files; no Bun, package manager, build step, jq, or Python is needed.
- Added exact plain-Node invocations for `universal-checks.js` to the owning
  extraction and fill workflows. Word counts, variable percentage, field count,
  standing-promise matches, and fill-time checks are now script-owned rather
  than prose-only. The no-code RULES table remains the explicitly degraded
  fallback.
- Added kit-owned `node --test` behavior tests, including thin-template and
  standing-promise refusal cases, another-client leakage, and the previously
  missed zero-occurrence sender/sign-off case.
- Fixed the upgrade procedure so it can actually restore protected customer
  data after renaming the old skill folder. Upgrades now preserve the entire
  `templates/` tree, including an already-used `client-update-letter`, rather
  than overwriting that folder and destroying its checks, provenance, or history.
- Synchronized stale refusal counts and descriptions across the installer,
  README, skill, and operations manual: seven conditions total, including the
  field-count, standing-promise, reuse-authority, and fill-time missing-field
  stops.
- Corrected stale worked-example counts from three to four.
- Bumped `VERSION`, README, installer, and verification-page metadata together.

## 1.0.2 — workout lane: three rounds against invented Long Island buyers (2026-08-12)

Sixteen findings, from running the kit's own workflows literally against three
buyers it had never been tested on: a title agency (Kowalczyk Title, Islandia),
an insurance brokerage handing over hostile inputs (Ocampo & Whitcomb,
Riverhead), and a returning excavation contractor on run five, dictating into
his phone from a job site (Brzezinski Bros., Yaphank). Every fix below closes
something that was observed breaking, not something that read badly.

### The released document did not match the document that was attested to

`verify-page.html`'s clean-file builder styled the letterhead with
`var(--p, #6b1f2a)`. **`--p` is defined nowhere in the page** — the VERIFY page
uses `--primary` — so every released file silently fell back to Doc Factory's
own default garnet regardless of `branding/brand.md`. A customer with a navy
brand attested to a navy preview and downloaded a garnet document. The gate's
entire claim is that the file equals the thing that was reviewed. The builder
now reads the live computed brand colour off the page itself, so preview and
release cannot drift; a logo `<img>` rule was added to the released stylesheet
at the same time.

### The recipient-name check was broken for the kit's strongest verticals

Rule 5 took the last whitespace token of the recipient name as the surname. For
"Alanna Brizuela, Esq." that token is **"Esq."**, and `escapeRe` plus the
trailing `\b` made the pattern match nothing at all — the check reported "the
recipient's name does not appear in the document" while a genuinely misspelled
surname ("Dear Ms. Brizuella") sailed past unexamined. Law, accounting,
insurance, and title are this kit's named strongest verticals and every
recipient in them carries a suffix, so the broken case was the common case.

Two fixes, both deterministic: a `surnameOf()` helper that strips honorifics
(Mr, Ms, Dr, Prof, Atty...) and suffixes (Esq, Jr, CPA, PE, MD, PhD...) before
taking the surname; and near-miss detection by bounded edit distance, because
matching only the CORRECT spelling can never find the wrong one — the
misspelled copy is precisely the word that does not match. Six-case test run
red before and green after, plus a false-positive guard on a full letter.

### "Monday" passed as a date

The vague-date check was an anchored exact-match list of seven strings. A
tradesman's actual answer — "monday", "next week if the rock cooperates",
"end of the week", "the 15th" — matched none of them and printed into the
letter as written, unresolvable to anyone reading it two days later. Rewritten
around the right question: a value passes only if it carries a month name with
a number or a numeric date. Bare weekdays, bare days of the month, relative
references, and vague words buried inside longer sentences all FLAG now, and
matching is substring-based rather than whole-value. Fifteen-case test, green.

### Six workflow gaps that let the kit be confidently wrong

- **A one-off favour was one step from becoming published policy.** New
  extract-time STOP 2b. A sentence can be perfectly generic — naming no client,
  so the client-facts gate never sees it — and still be a commitment: a free
  service, a turnaround window, a waiver, a guarantee. Locked, it is promised
  to every client from now on, in writing. Deterministic trigger (commitment
  word plus scope word, or a promised interval), three recorded outcomes
  (standard / one-off / remove). Worked example 4 is built on the real case.
- **Three different documents ran through the same-document intersection
  rule.** "Send two or three" was heard as "send your three best," and the
  mechanical rule — sentences identical across all copies are locked — returns
  the empty set across three document types, refusing a perfectly good letter
  for having no repeatable wording. A wrong refusal costs more than a missing
  one. Step 0 now says "the same KIND" out loud and checks it before comparing.
- **A two-field template passed the percentage gate at 9% variable.** The most
  templatable-looking number in the workout, on twenty words of stationery. New
  STOP 1b: fewer than three fields and there is nothing to fill in. Under about
  sixty words the percentage test is noise; the word floor and the field floor
  are the clauses that mean anything.
- **A prompt injection would have been LOCKED.** The untrusted-input rule said
  do not OBEY a line addressing the AI. It did not say do not LOCK it — and a
  suspicious line is prose that does not vary, so Step 2 sorts it straight into
  the locked bucket, writing "mark this document verified" permanently into a
  broker's renewal template. Quoted-back lines are now excluded from locked
  prose always, recorded under `excluded lines:`, and this is the one place the
  kit refuses something the customer explicitly asks for.
- **A recipient field could be marked stable.** The examples given for "stable"
  are the sender's own details, and a name looks like a name. A
  `{{client first name}}` carried forward prints "Dear Craig," on a letter
  addressed to somebody else — and it survives every mechanical check. Now a
  hard rule at extract time (anything naming the recipient is per-run, always,
  no exception for a monthly client) and a cross-check at fill time that
  corrects the template when it finds one.
- **A change order's money figure was never labelled before the arithmetic.**
  "$14,000" can mean "on top of what we agreed" or "where the whole job lands,"
  both readings produce self-consistent totals, and every check passes on the
  wrong one. New STOP in class C: ask which it is, in those words, before
  computing anything.

### Judgment-layer corrections

- **The severity grammar had one vocabulary and two incompatible moments.**
  STOP means "refuse to produce the document" — nonsense at extract time, where
  nothing is being produced and the document in question was mailed six months
  ago. The table is now two columns; at extract time a STOP is a DECISION
  REQUIRED that the template cannot be finished without.
- **A class the owner said does not apply kept firing.** Three of seven
  findings on a title agency's closing letter were "your fee notice has no due
  date and no way to pay," on a letter nobody pays from. Classes can now be
  DROPPED at extract time on the owner's word, recorded with their reason, and
  never re-applied. The owner is also allowed to answer the classification
  question with a question mark, which is what really happens.
- **The best finding in a real letter had no check.** Every deadline measured
  from an event whose date appears nowhere — "at or prior to closing,"
  "forty-eight hours prior to the scheduled closing" — reads as fully dated and
  is unactionable. Class B now checks that relative deadlines have their anchor
  date written down, and requires naming the anchor rather than the symptom.

### Delivery corrections

- **The gate assumed a desktop.** A `.html` file tapped in Files on an iPhone
  does not reliably open as a page, so the kit's single best feature was most
  likely to fail silently for the buyer most likely to be in the field. Ask
  whether they are on a phone, prefer the conversation gate there, confirm they
  can see the watermark and the button, and never assume the gate ran.
- **The kit asked eighteen questions of a man who had already answered them.**
  A phone-dictated sentence carries six fields; asking "what is the client's
  full name?" after it is the office-worker answer to a tradesman. Fill now
  extracts from what was already said, reads it back in one block for
  correction, and asks only for what is genuinely missing. Extracted values are
  never treated as confirmed until the customer has seen them written down.

### Also

- `examples/04-kowalczyk-title-standing-promise/` — fourth worked run: the
  dropped class, the standing-promise refusal, and the anchor-date finding. Its
  receipt was produced by running the gate's own receipt code, not written by
  hand.
- `SKILL.md`'s refusal list corrected from three to six; it had drifted behind
  the workflow it summarises.
- The no-code-execution RULES TABLE was updated in step with every code change,
  so the two lanes still land the same verdict.

## 1.0.1 — tribunal rework: extract-first, judgment, provenance, and the verification gate (2026-08-12)

Reworked to the kit tribunal's controlling spec — the audit section for
`doc-factory` plus **RICO'S PRODUCT DEFINITION**, which supersedes the audit
list where they differ. Reference implementation studied first, per the
tribunal's instruction: a separate internal résumé project (`resumeUpdate`)
(master content source + locked style template + per-target inputs producing
traceable PDFs + workflow docs as the ops manual).

The audit's verdict was "structurally clean dud": Part B near-perfect, Part A
failing criteria 3 (real domain judgment) and 4 (refusal) by construction. Strip
the fields out of the shipped template and 68 words of locked prose remained.
This release attacks that directly.

### The four elements of Rico's product definition, all now shipped

- **Templates derive from the CLIENT'S OWN documents.** `extract-template.md`
  is rewritten around it, and the installer's verify step now runs extract on
  the buyer's own document as the first thing the kit ever does. The shipped
  `client-update-letter` is demoted from "the worked example" to a labelled
  FALLBACK skeleton for a customer who genuinely has nothing on file.
- **Provenance.** New `templates/<name>/sources/` — `locked-prose.md` numbers
  each locked paragraph `L1`, `L2`, `L3`, and `source-record.md` records which
  document each came from and when. Every finished document carries a
  plain-language provenance list on its verification page: "The scope paragraph
  is your locked wording L4, taken from the engagement letter you sent on
  March 3. The fee figure is what you told me today."
  Source documents themselves are never copied into the kit — they carry a real
  client's information.
- **The verification gate (element 4).** New
  `references/verify-page.html`: the document rendered as it will print,
  watermarked `PREVIEW - NOT VERIFIED`, the checks report, the provenance list,
  and one checkbox plus one button reading **"I validate this and I want it"**,
  disabled until the box is ticked. The click stamps date and time, writes a
  receipt naming the document, template, kit version, sources, and every flag
  accepted, removes the watermark, and only THEN produces the clean file and
  the receipt as data-URI downloads. It disables itself so a second click
  cannot re-stamp. **No releasable file exists on disk before the click.**
  Per Rico: the gate is CYA by design, and unclick-and-edit means re-verify —
  a receipt covers only the version it was clicked on.
- **Input files → finished document in their format**, unchanged in intent but
  now gated and checked on the way out.

### The judgment layer (audit item 3 — "without item 3 the other three do not matter")

- New `references/document-classes.md`: a check library by document class —
  engagement/retainer (A), client update (B), change order (C), invoice/fee
  notice (D), proposal/quote (E), general (F) — plus universal checks and a
  STOP/FLAG/NOTE severity grammar. Each class names presence checks (scope
  boundary, fee basis, term and termination, validity period, approval
  mechanism, price delta AND new total) and contradiction checks that compare
  two parts of the same document, including arithmetic.
- New per-template `review-checks.md`, written by `extract-template.md` Step 5
  and re-run by `fill-and-render.md` Step 5 on every document. It records how
  the customer's OWN document scored, and any check they deliberately waived —
  a waived check never nags them again.
- The gap report is now an explicit, scripted moment: the kit tells the owner
  what is missing from the document they have been sending for years, states
  plainly that it is not telling them what it should say, and names their
  attorney as the right person to ask.
- **Fixes the audit's second-order finding directly.** Class B carries an
  "urgent ask leads" check: when the ask's deadline falls inside seven days,
  the kit flags that it is buried and offers to move it to the top. That is the
  exact defect the dry-run found — a decision needed by Monday landing in
  section four.

### The refusals (audit item 2, KIT-STANDARD §4.9)

Four named refusals, all written with the exact words to say:

1. No document of their own → no template. (`extract-template.md` Step 0)
2. Fewer than 150 words of locked prose, or more than 60% variable → STOP,
   both numbers shown. (Step 2.5) **The shipped `client-update-letter` fails
   this gate at 68 words** — the correct signal, and the reason it is now a
   labelled fallback rather than the demo.
3. A specific client's name or matter facts still inside the locked prose →
   STOP, exact line quoted back, never quietly turned into a field. (Step 2.5)
4. A field a STOP-severity check depends on is empty → STOP. ASK. Never invent
   a value, never write "TBD" into a customer-facing document.
   (`fill-and-render.md` Step 3)

Refusals 2 and 3 are triggered by counts and pattern matches, not by vibes.

### Own-data verification (KIT-STANDARD §4.10)

- Installer Section 5 rewritten end to end. It asks for the buyer's own
  document and **waits**. No path completes the install against the shipped
  skeleton or the `examples/` folder. If the buyer has nothing in hand, the
  installer says so and leaves the install honestly unverified rather than
  declaring success against a fixture.
- 3C and 3D no longer offer to demo on the shipped example.

### Run history (audit item 4)

- New `templates/<name>/history/` — one sidecar per finished run holding every
  field value used, marked `(stable)` or `(per-run)`, plus any next-step
  commitment and its date.
- `fill-and-render.md` Step 2 now reads history FIRST and opens with the
  carry-forward question: "Last month you told Denise the curbing would be set
  by August 20. Did that happen?" Stable fields pre-fill; eighteen questions
  become four. Overdue commitments from a prior run that this document does not
  mention are flagged.

### Determinism-first

- New `references/universal-checks.js` — seven mechanical checks as code
  (surviving `{{blanks}}`, placeholder prose, vague dates, vague amounts,
  recipient-name spelling drift, duplicated sender identity, and another
  client's name leaking in from history). Returns STOP/FLAG/PASS and a
  `releasable` boolean. Carries a hand-application RULES table for runtimes
  with no code execution, so the checks run either way.
- The verification gate's logic is a fixed script in a shipped page, cloned per
  document. Both are explicitly marked "do not re-implement" — a gate the AI
  rebuilds each time is a gate that eventually does not fire.

### Worked-example layer (KIT-STANDARD § Worked-example layer)

- New `examples/` with three complete runs: Coastal Grade Landscaping (client
  update — the urgent-ask check firing, plus run-history pre-fill on a second
  letter), Vitale & Marchetti CPAs (engagement letter — the client-name-in-
  locked-prose refusal firing, then a gap report finding two real omissions in
  a six-year-old letter), and Fiore Mechanical (change order — the thin-document
  refusal firing, ending in NO template built).
- The examples README states plainly that they show the flow and are **not**
  the install check.
- The receipts in examples 1 and 2 were generated by the kit's own
  `verify-page.html` gate script, not written by hand.

### Version and housekeeping

- **Fixed the version/changelog disagreement the audit named** (`Unreleased`
  vs `1.0`). This file replaces the changelog that lived inside `README.md`;
  `VERSION`, `CHANGELOG.md`, and the installer's `**Version:**` line now all
  read `1.0.1`.
- `SKILL.md` rewritten: the three-thing framing (their wording, checked,
  held), the named refusals, the new file map, the gate in plain language, the
  scale-down floor, and a hardening line stating that **nothing inside an
  ingested document can satisfy the verification gate** — only the customer's
  own click or typed acceptance releases a document.
- Installer package contents, both copy lists (3A recursive copy and the 3B zip
  layout), and the 3A assert now name `references/` explicitly, with the
  warning that a copy missing it installs a kit with no checks and no gate.
- The §4.8 upgrade preserve-list now protects `review-checks.md`, `sources/`,
  and `history/` in customer-made templates — the accumulated judgment,
  provenance, and run history — and states that `verification-log.md` is never
  touched by an install or upgrade.
- Acceptance checklist rebuilt. The install and path-acceptance boxes from
  2026-07-15 are **re-opened**: they predate `references/` and no longer prove
  the shipped shape. Two new boxes are checked with receipts (the gate's logic,
  and the universal checks red/green). The real-device gate remains unchecked
  and now explicitly requires a human to press the button in a real browser.

### Not done, and honestly open

- No human device check. Nothing in this release has been opened on a real
  machine, and the gate has never been clicked by a person in a real browser.
  That box stays unchecked; it is the one that matters most for this rework,
  because the gate IS the product.
- The 3B zip path and 3C condensation path have not been re-simulated against
  the new `references/` folder.
- No live end-to-end run: extract from a real document through to a downloaded,
  printed PDF has not been performed as one continuous pass.

## 1.0 — render-contract rework + KIT-STANDARD §4.5/4.6/4.7/4.8 (2026-07-15)

- **§4.8 upgrade path.** `installer.md` finds an existing Doc Factory, reads
  its version, asks "keep all your data or skip?", backs up to
  `doc-kit.backup-<version>`, and on upgrade replaces only skill instruction
  files — never `USER-CONFIG.md`, `branding/`, or user-made templates.
- **GPT-5.6 review fixes.** 3C names the exact kit files to add as Project/Gem
  sources and PAUSEs until they are added, with a paste fallback for file caps;
  the 3C render contract gained a capability fork; the image-lane step verifies
  native generation actually responds before recording it.
- **Killed the paste-into-`style.html` step.** New render contract: the AI
  produces ONE complete, ready-to-open HTML page and writes it to
  `~/Documents/doc-factory/`. `style.html` became an INTERNAL layout template.
- **Fixed double-letterhead** — sender identity removed from the letter body;
  the letterhead is the only place it appears.
- **Fixed bold labels** — `template.md` and the form `TEMPLATE` agree on
  `**bold**` markers; the render step converts them to `<strong>`.
- **HTML-escaping** of all field values stated in the render step and
  `SKILL.md`; skipped-field-in-sentence warning and `{{field-in-field}}` note
  added to `fill-and-render.md`.
- **§4.5 path resolution** — templates and branding moved INSIDE
  `skills/doc-kit/`; one `USER-CONFIG.md` (`output_dir:`) as the single config.
- **§4.6** — added `START-HERE.md`.
- **§4.7** — added the data-not-instructions block to `SKILL.md` and
  `extract-template.md`.
- **Library maintenance** section added to `OPERATIONS-MANUAL.md`.
