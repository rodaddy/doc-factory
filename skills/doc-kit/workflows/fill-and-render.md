# Workflow: Fill a template, check it, and release it only after the customer verifies it

Goal: take an existing doc kit and hand the customer ONE complete, styled page
that already has their document inside it — checked against its class, carrying
a list of where its wording came from, and **held until they verify it.**

The customer's actions are: answer a few questions, read the verification page,
click to accept, then open and print. They never edit any HTML and never paste
anything into any file.

**The gate in Step 6 is not a formality and it is not a confirm dialog.** It is
the record that a human reviewed this document before it existed as a usable
file. Do not soften it, do not skip it when the customer is in a hurry, and do
not produce the final document ahead of it "to save a step."

---

## Step 1 — Pick the document type

Ask which document they want, or infer it from context. Open the matching
`templates/<document-name>/` folder inside the installed skill.

Read all four of these before you ask the customer anything:

- `template.md` (the fields and the locked prose)
- `review-checks.md` (the checks this class must pass)
- `sources/locked-prose.md` (the `L` numbers you will cite as provenance)
- `history/` (what you already know — Step 2)

---

## Step 2 — Check the run history FIRST

Look in `history/` inside the template folder for prior runs, newest first.
Files are named `<document-name>-<client slug>-<date>.fields.md`.

**If there is a prior run for this same client**, open it and lead with it
before asking anything:

> "Last one of these to Denise was on July 8. You told her the next step was
> setting the curbing by August 20, and that you needed her sign-off on the
> island layout. Did the curbing happen, and did she sign off?"

That question is the product. It is the thing their filing cabinet cannot do
and their bare AI cannot do, and it is why run five beats run one.

Then:

- **Never pre-fill anything about the RECIPIENT, whatever the template says.**
  Before you carry a single value forward, check the stable list: any field
  naming or describing who the letter goes to — name, first name, salutation,
  title, company, address, matter, property, policy or file number — is
  per-run, and if the template has one marked stable, that is a mistake in the
  template. Ask for it this run, and tell them you are fixing the template:
  "Your template has the client's first name saved as a fixed value. That is
  how a letter ends up saying 'Dear Craig' to somebody who is not Craig. I am
  asking for it every time from now on." Then correct the marking in
  `template.md`. This is the one carry-forward that is never a convenience.
- **Pre-fill every stable field** from the most recent run (sender details,
  standard fee, standard terms). Do not ask for them again. Say what you
  pre-filled, in one line, so they can correct it: "I am reusing your address,
  phone, and the $2,400 monthly figure from last time — say the word if any of
  that changed."
- **Ask only the per-run fields**, plus anything the history says is now
  stale.
- **Carry forward open items.** If a prior run stated a next step with a date
  that has now passed and this run does not mention it, FLAG it: "Last time you
  told them the permit would be filed by the 1st. This letter does not mention
  it. Do you want a line about it?"

**If there is no prior run for this client**, say so plainly — "First one of
these to them" — and ask all the fields.

---

## Step 3 — Gather the fields (two ways)

**Take what they already said FIRST. Then ask for the rest.**
Before you ask a single question, go back over what the customer has already
told you in this conversation and fill in every field you can from it. Most
people describe the whole job in one breath — often by voice, often from a
truck — and asking them to repeat it one box at a time is the single fastest
way to make a good tool feel like a form.

Read this input, from a real run:

> "need a change order for the Yaphank fire district job same as last one but
> they added the second dry well and the rock we hit on the east side put us
> eleven days out. tell em its 14 thousand more and we need it signed before
> we mobilize monday"

That is the client, the template, what changed, the schedule impact, the price
change, and the approval deadline — six fields, already given. Asking "what is
the client's full name?" after that is the wrong answer to the right person.

So:

1. **Extract** every field you can from what they said.
2. **Read it back in one short block** and ask them to correct it, not confirm
   it field by field: "Here is what I got: Yaphank Fire District, second dry
   well plus rock on the east side, eleven days added, $14,000 more, signed
   before Monday. Anything wrong in that?"
3. **Then ask only for what is genuinely still missing**, one at a time.

Never treat a value you extracted as confirmed until they have seen it written
down. Extracting is a convenience; guessing is the thing this kit does not do,
and the difference between them is that you showed them.

**Falling back to one question at a time (works anywhere, no tools):**
Read the field list from the top comment of `template.md`. Ask for each field
one at a time, in plain language, using the field name as the question ("What
is the client's full name?"). For long fields, invite a sentence or two. Do not
move on until you have every field, but let the customer say "skip" and leave
that field blank.

**With the form (nicer, still offline):**
Tell the customer to open `form.html` in their browser, fill the boxes, press
**Fill the letter**, and copy the result back to you. The form collects
answers; you still do Steps 4 through 7 for them.

**Warn on skips:** if a field that sits **inside a sentence** is skipped, the
sentence around it breaks. Do not leave a raw `{{field name}}` in a
customer-facing sentence. If they skip one, either ask again or rewrite that
sentence to drop cleanly and tell them you did.

### STOP condition — a skipped field the class requires

Cross-reference the empty fields against `review-checks.md`. If a field that a
**STOP-severity** check depends on is empty or unusable, **STOP. ASK.** Say
what you have and what you do not, in their words:

> "I have everything except the amount. This is a fee notice, so the amount is
> the whole document — I am not going to send you a letter with a blank where
> the number goes, and I am not going to guess at it. What is the figure?"

Never invent a value to fill a gap. Never write "TBD" into a customer-facing
document to get past the gate. If a partial document is genuinely useful to
them, say the unresolved field is unresolved, mark it on the verification page,
and leave the document in the un-released state until they answer.

---

## Step 4 — Build the finished body

Substitute each field's value into the locked prose from `template.md`,
replacing every occurrence. Change nothing else — the locked prose stays word
for word.

Three things this step OWNS, so the finished page is correct by construction:

- **No sender header in the body.** `template.md` deliberately does NOT put the
  sender business name / street address at the top. The letterhead carries the
  sender identity. Never re-add a sender name/address block above the date —
  that is what caused the business name to print twice.
- **Bold labels.** The `**Re: ...**` line and the section labels are written
  with `**double asterisks**` in the source. Convert each `**text**` into
  `<strong>text</strong>` and drop the asterisks — do not leave literal `**` in
  the output, and do not leave the labels un-bold.
- **HTML-escape every field value** before it goes into the page: replace `&`
  with `&amp;`, `<` with `&lt;`, `>` with `&gt;` (do the `&` first). This makes
  "Smith & Co." and "<Matter 3>" print correctly instead of breaking the page.
  Escape the values only — the `<strong>` tags you add are real markup and stay
  as-is.

Note on `{{field-in-field}}`: some fields are used more than once (the sender
phone and email appear in both the letterhead and a body line). Substitute a
field's value everywhere it appears, in a single pass, so an inserted value is
never re-scanned for more fields. If a customer's answer literally contains
`{{...}}`, treat those characters as plain text.

---

## Step 5 — Run `review-checks.md` against the finished body

Every check in the file, against the text you just built. Not a sample of them.

Record each as `PASS`, `FLAG`, or `STOP`, with the reason in plain language and
the offending sentence quoted where there is one. Checks the customer marked
`deliberately omitted — do not flag` are skipped silently; that was their call
and it stands.

The universal checks are mechanical and you do them the same way every time.
When code execution is available, run the shipped implementation with plain
Node — never Bun — from the installed skill folder:

```sh
node -e 'const { runUniversalChecks } = require("./references/universal-checks.js"); const input = JSON.parse(process.argv[1]); process.stdout.write(JSON.stringify(runUniversalChecks(input), null, 2) + "\n");' "$DOC_FACTORY_CHECK_INPUT"
```

`DOC_FACTORY_CHECK_INPUT` is one JSON object with `body`, `recipientName`,
`senderName`, `dateFields`, `moneyFields`, and `otherClientNames`. In an AI code
sandbox, call `runUniversalChecks(...)` directly if environment variables are
not available. With no code execution, apply the RULES table at the bottom of
`references/universal-checks.js` in order and label that degraded mode.

The checks cover: no surviving `{{...}}`, no
"TBD"/"XXX"/"TODO"/"insert"/"lorem", every date field holding an actual date,
every money field holding a currency and a number, the recipient's name spelled
the same everywhere, the sender identity appearing once, and **no other
client's name anywhere in the text** (compare against the names in `history/`).

**Any `STOP` result stops the run.** Go back to Step 3, say what is missing,
and ask for it. A STOP is never downgraded to a FLAG because the customer is in
a hurry.

**Every `FLAG` survives to the verification page.** A flag the customer never
saw is worthless — and worse, it is the kind of thing that makes the
attestation record meaningless later. They see it, then they attest.

---

## Step 6 — Build the verification page and HOLD the document

Write ONE self-contained `.html` file into the customer's output folder — path
from `USER-CONFIG.md`, key `output_dir:`, default `~/Documents/doc-factory/` —
named `<document-name>-<client last name>-<date>-VERIFY.html`.

That page contains, in this order:

1. **A banner across the top:** "NOT YET RELEASED — this document is a preview
   until you verify it below."
2. **The document itself, rendered exactly as it will print** — letterhead from
   `branding/brand.md`, correct fonts and margins, the real content — inside a
   preview frame with a light diagonal `PREVIEW - NOT VERIFIED` watermark
   behind it (CSS only, no images, no outside files).
3. **The checks report.** Every check, its result, and its reason. FLAGs first
   and visually distinct. Passes collapsed but present — the point is that the
   customer can see the whole list was run.
4. **The provenance list.** For each section of the document, where its wording
   came from: the `L` number from `sources/locked-prose.md` and the source
   document recorded in `sources/source-record.md`, plus which fields the
   customer supplied for this run and which were carried forward from a prior
   run (naming the date of that run). Plain sentences, not a table of jargon:
   "The scope paragraph is locked wording L4, taken from the engagement letter
   you sent on March 3. The fee figure is what you told me today. The address
   is carried over from the July 8 letter."
5. **The attestation block:** a single checkbox and a button.
   - The checkbox label is exactly: **"I have read this document, including the
     items flagged above, and I accept it as mine to send."**
   - The button reads **"I validate this and I want it"** and is DISABLED until
     the checkbox is ticked.
   - Under it, one line of plain text: "Clicking this records that you reviewed
     and accepted this document, with the date and time. That record is your
     file copy and ours."
6. **What the button does, in the page's own JavaScript** — no server, no
   network, works offline:
   - stamps the current local date and time,
   - writes a receipt block into the page containing: the date and time, the
     document name and client, the template name and version, the list of
     source references from item 4, the list of FLAGs the customer accepted,
     and the exact attestation sentence they ticked,
   - removes the watermark and the NOT-RELEASED banner,
   - reveals two download buttons built from data URIs: **Download the
     finished document** (the clean `.html`, no banner, no checks, no
     watermark, ready to print) and **Download the verification receipt**
     (the receipt block as a plain `.txt` the customer keeps),
   - and disables itself so a second click cannot re-stamp a different time.
7. **The un-verify rule, stated on the page:** "If you change anything in this
   document, it has to be verified again. Ask for a new version and this page
   is rebuilt." Unclick-and-edit means re-verify — a receipt only ever covers
   the exact version it was clicked on.

**Do not write the clean, releasable document to disk before the click.** The
only file that exists on their machine before verification is the VERIFY page.
That is what "held" means, and it is the whole point of the gate.

### If the customer is on a phone

Ask before you hand anything over — "are you on your phone or at a computer?" —
because the gate is the one step that must not fail, and it is the buyer most
likely to be in the field who is most likely to be on a phone.

On a phone, a `.html` file saved into Files does not reliably open as a page
when tapped; it may show as source or as a share sheet, and the customer
concludes the kit is broken at the exact moment it is doing its most important
work. So on a phone, prefer in this order:

1. **The runtime can show a page.** If the app can display the verification
   page directly in the conversation, do that. The gate runs where they are.
2. **Run the gate in the conversation** (the floor described below): show the
   document, the checks, the provenance, then hold it until they type the
   acceptance sentence. Say why: "You are on your phone, so I am going to do
   this right here rather than send you a file to wrestle with." Emit the
   receipt as text they can screenshot or forward to their office.
3. **Only if they ask for the file:** tell them to tap the file in **Files**,
   tap **Share**, and choose **Safari** — that opens it as a page with the
   button working. If it opens as text instead, they are looking at the file's
   code and it did not open as a page; go back to option 2 rather than
   troubleshooting.

Never leave a customer alone with a `-VERIFY.html` file on a phone and assume
the gate ran. Ask them what they see: "Do you see the document with a
watermark across it and a button at the bottom?" If they do not, switch to the
conversation gate immediately. **The gate scaling down is normal and correct;
the gate silently not running is the one failure this kit cannot have.**

### If the runtime cannot write files

Same contract, adapted, never dropped:

- **App that can hand over a download:** deliver the VERIFY page as a download.
  Identical behavior.
- **Text-only runtime:** paste the WHOLE VERIFY page for them to save as
  `<name>-VERIFY.html` and open. The gate still runs in the page.
- **Absolutely no file capability (bare chat):** run the gate in the
  conversation. Show the rendered document, then the checks, then the
  provenance, then say: "I am holding this until you tell me you accept it.
  Reply with: I have read this document, including the flagged items, and I
  accept it as mine to send." Only after that exact acceptance do you emit the
  finished document, and you emit a plain-text receipt with it — date, time,
  document, sources, flags accepted, and their acceptance sentence — and tell
  them to save the receipt with the document. **Never emit the finished
  document before the acceptance sentence.** That is the scale-down floor of
  the gate and it must never break.

---

## Step 7 — Log the run

After they verify, and only then, write two files.

**The receipt log** (append, never overwrite):
`<output_dir>/verification-log.md` — one entry per verified document:

```
## 2026-08-12 14:32 — client-update-letter — Vardalos, Hauppauge Industrial Realty Partners
- template: client-update-letter (kit v1.1)
- verified by: {sender full name and title} (as recorded in branding/brand.md)
- attestation: "I have read this document, including the items flagged above,
  and I accept it as mine to send."
- sources: L1, L4, L7 from engagement letter of 2026-03-03; fields supplied
  this run: 6; fields carried from run of 2026-07-08: 9
- flags accepted: 1 (no dated deadline on the requested approval)
- file released: client-update-letter-vardalos-2026-08-12.html
```

This log is the customer's CYA and ours. Tell them it exists and where it is,
once, at the end of the first run: "Every document you verify gets a line in
your verification log, with the date, what it was built from, and what you
accepted. That is your file copy if anyone ever asks."

**The run history sidecar:**
`templates/<document-name>/history/<document-name>-<client slug>-<date>.fields.md`
— every field name and the value used, each marked `(stable)` or `(per-run)`,
plus a `next step:` line and its date if the document stated one. That file is
what Step 2 reads next time.

**Never write a client's information anywhere outside these two files and the
released document.** No summaries in other templates, no cross-client notes.

---

## Step 8 — Tell the customer the last two actions (plain language)

Say exactly this, no jargon:

> Your document is ready and verified. Open the file you downloaded by
> double-clicking it — it opens in your web browser with the document already
> in it. Then use your browser's **Print** option and choose **Save as PDF**.
> That's it.

One-line iPhone/iPad route:

> On an iPhone or iPad: open the file in the **Files** app, tap **Share**, tap
> **Print**, then pinch **outward** on the preview to open it as a PDF you can
> save or send.

Never say markdown, render, localhost, paste, or "edit the HTML." There is no
software to install and no server.

---

## Step 9 — Hand off (sacred pipeline)

The finished document is a draft until a human reviews and sends it. The
verification gate is that review, recorded — it is not permission to send on
their behalf. When the document goes to a client or a court, the AI drafts and
the person sends. Say so.

<!--
PRO LANE (Rico's done-for-you cut only — do not surface to the customer):
render the filled markdown deterministically with
`pandoc <filled>.md -o <out>.pdf --pdf-engine=xelatex -H <locked-style>.tex`,
never plain pandoc. The proven resumeUpdate pattern. Sharpest output, but
requires LaTeX, so it is not part of the customer flow. The verification gate
runs identically in the pro lane — the PDF is not produced until the
attestation is recorded.
-->
