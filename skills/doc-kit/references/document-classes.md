# Document classes — the risk and omission checks

This is the judgment library. It is the reason Doc Factory is not a
find-and-replace tool.

When you extract a template from the customer's document, you classify the
document, copy the matching checks below into
`templates/<document-name>/review-checks.md`, and from then on EVERY document
built from that template is run against those checks before it can be finished.

**Two jobs, both mechanical:**

1. **At extract time** — check the customer's own known-good document against
   its class. Anything missing gets reported to them as a gap in the document
   they have been sending for years. That is the moment they learn something
   they did not know.
2. **At fill time** — re-run the same checks against the filled document.
   Anything a field left empty, vague, or self-contradicting gets flagged
   before the customer can attest to it.

**A check is a yes/no question about the text, never a taste question.** If a
check cannot be answered by looking for something present or absent in the
document, it does not belong here.

**A check is never legal advice, and you never give any.** The check reports
what is present and what is absent, in the customer's own words, and says who
they should ask. "There is no termination clause in this letter" is a fact
about the document. "You need a termination clause to be enforceable" is legal
advice and is forbidden — say instead: "Most engagement letters state how
either side can end the arrangement. Yours does not. If that is deliberate,
say so and I will stop asking."

---

## How to classify

Ask the customer plainly, then confirm from the text: "What is this document
for? Is it (a) agreeing to do work for someone, (b) telling a client where
things stand, (c) changing the scope or price of work already agreed, (d)
asking for money, (e) offering a price for work not yet agreed, or (f)
something else?"

| They said | Class | Section below |
| --- | --- | --- |
| (a) agreeing to do work | engagement / retainer / services agreement | A |
| (b) status update | client update / status letter | B |
| (c) change to agreed work | change order / scope change | C |
| (d) asking for money | invoice cover / fee notice / collection letter | D |
| (e) offering a price | proposal / quote / estimate | E |
| (f) anything else | general business letter | F |

If it fits two classes, use both check lists. If it fits none, use F and say
so: "I do not have a specialist check list for this kind of document, so I am
using the general one. The checks will be lighter."

### When the owner answers with a question mark

The owner is allowed to be unsure, and often is — plenty of real business
documents are two or three of these at once. A title agency's clear-to-close
letter reports status (B), states a premium (D), and lists conditions that
must be cleared before closing (nothing in this library). Do not make them
pick. Take every class they named, then run the next rule.

### Confirm each class before you keep it — the owner can drop one

A class carries a whole checklist with it, and a checklist applied to the wrong
document is worse than no checklist: it spends the one moment the customer is
paying attention on findings that do not apply. So after you have classified,
before you write anything into `review-checks.md`, run the checks and say what
each class WOULD have you ask, in one line each:

> "Because it states a price, I would also check it the way I check a bill:
> is there a due date, and is there a way to pay. Does anyone actually pay you
> from this letter, or does that money move somewhere else?"

If they say the class does not apply — "nobody pays me from this letter, the
premium comes out of the closing" — **drop that class entirely**, and record it
in `review-checks.md` as:

```
CLASS D (fee notice): DROPPED at extract time by the owner.
Reason (their words): "Nobody pays me from this letter. The premium goes on
the closing statement and comes out of the closing."
Do not re-apply on any run of this template.
```

A dropped class never nags again, on any future document from this template,
exactly like a deliberately-waived check. Never argue with the drop and never
quietly keep flagging it. The owner knows what their document is for; the
library only knows what its name usually means.

**Never drop a class the owner did not name.** Dropping is theirs, not yours.

---

## A. Engagement letter / retainer / services agreement

The highest-risk class in the line. An omission here is the one that costs the
customer money a year later.

**Presence checks** — for each, quote the sentence that satisfies it, or report
it ABSENT:

- [ ] **Scope of work** — states what IS being done, in a sentence a stranger
      could read and know what was agreed.
- [ ] **Scope boundary** — states what is NOT included. Absent in most
      documents; this is the single most common omission in this class.
- [ ] **Fee basis** — hourly, flat, contingency, or retainer, named explicitly,
      with the number.
- [ ] **What triggers extra cost** — expenses, filing fees, third-party costs,
      overage past an included amount.
- [ ] **Payment terms** — when payment is due and what happens if it is late.
- [ ] **Term and termination** — how long this runs, and how either side ends
      it.
- [ ] **Who is the client** — named exactly. For a company, the entity, not a
      person's first name. (This one catches real trouble: a letter addressed
      to "Dave" that never names Dave's LLC.)
- [ ] **Conflicts or existing-relationship line** — where the customer's
      industry uses one. Ask; do not assume.
- [ ] **Signature or acceptance mechanism** — how the client says yes.
- [ ] **Date** — the document is dated.

**Contradiction checks** — these compare two parts of the SAME document:

- [ ] A fee number stated in two places (body and a schedule) that do not match.
- [ ] A start date later than a deadline stated elsewhere.
- [ ] "Flat fee" in one sentence and an hourly rate in another with no
      statement of which governs.

**Positioning check:** the letter describes work rTech's client will do for
THEIR client. Nothing in this class touches headcount and nothing in this kit
ever suggests it should.

---

## B. Client update / status letter

Low legal risk, high relationship risk. The failure is burying the thing the
reader has to act on.

- [ ] **The ask is separated from the status.** If the letter needs the reader
      to do something, it is in its own place and not mixed into a paragraph of
      progress.
- [ ] **The ask carries a dated deadline.** "Soon", "at your convenience", and
      "shortly" are FLAGS, not deadlines. Ask for a date.
- [ ] **Every relative deadline has its anchor date written down.** This is the
      one that hides. A letter can look fully dated and still be unactionable
      because every deadline in it hangs off an event whose date appears
      nowhere: "at or prior to closing", "forty-eight hours before the
      scheduled closing", "within ten days of delivery", "two weeks after
      substantial completion". Mechanical rule: for every deadline phrased
      relative to an EVENT rather than a date, find that event's date in the
      document. Not found -> FLAG, and name the anchor out loud, not the
      symptom: "Three of your deadlines are measured from the closing, and the
      closing date is not written anywhere in this letter. What is it?" The
      generic wording ("your deadline is not dated") is not good enough here —
      the reader can date every deadline the moment they know one missing date,
      and naming that date is the whole finding.
- [ ] **The ask leads when it is urgent.** If the deadline is inside seven days
      of the letter's date, the ask belongs at the TOP, before the status. This
      is the check that fixes the tribunal's own finding — a decision needed by
      Monday must not land in section four. When it triggers, say so and offer
      to move it.
- [ ] **Bad news is stated, not implied.** A delay, an overrun, or a problem is
      named in a sentence that says what happened, not only what happens next.
      If the fields describe a slip and the letter never names it, flag it.
- [ ] **The next step has an owner.** "The permit will be filed" — by whom.
- [ ] **No commitment the customer has not made.** Flag any promised date the
      customer did not supply as a field value.
- [ ] **Contact route present** — how the reader reaches a human.

---

## C. Change order / scope change

- [ ] **What changed**, stated as a difference from what was agreed, not as a
      fresh description.
- [ ] **Price delta**, as a delta AND as the new total. Both. A change order
      with only a new total hides the size of the change; one with only a delta
      hides the running total.
- [ ] **The number you were given is LABELLED before you do any arithmetic.**
      Severity **STOP**. When the customer gives you one money figure for a
      change order, you do not know which of the two it is, and both readings
      produce a self-consistent document. "$14,000" can mean "$14,000 more than
      we agreed" or "this change order comes to $14,000 in total" — and if you
      guess wrong, the arithmetic still adds up, every other check passes, and
      a wrong total goes out on a signed document. Ask, every time, in these
      words: "Is that $14,000 ON TOP of the {prior total}, or is that where the
      whole job lands?" Then state both numbers back before building anything.
      This is the kit's do-not-guess rule applied to the one place where a
      guess is invisible.
- [ ] **Schedule impact** — stated even when it is "no change to the
      completion date." Silence here is the dispute.
- [ ] **Approval mechanism** — who signs, and the statement that work does not
      proceed until they do.
- [ ] **Reference to the original agreement** — by date or number.
- [ ] **Contradiction:** the delta plus the previously stated total does not
      equal the new total. This one is arithmetic; do it.

---

## D. Invoice cover / fee notice / collection letter

- [ ] **Amount due**, unambiguous, one number.
- [ ] **What it is for**, tied to the work or the period.
- [ ] **Due date**, an actual date.
- [ ] **How to pay** — at least one route.
- [ ] **Prior balance handled** — if this is a second notice, the letter says
      what was previously owed and what has been paid.
- [ ] **Tone gate:** collection language escalating past a plain statement of
      the facts and the amount is FLAGGED for the customer to confirm.
      Threats, implied consequences, and legal characterizations are a
      **STOP** — the customer confirms wording of that kind themselves, in
      writing to you, before it goes in.
- [ ] **Contradiction:** a due date earlier than the letter's date.

---

## E. Proposal / quote / estimate

- [ ] **Price** — stated, with whether it is fixed, an estimate, or a range.
      An unlabeled number is a FLAG; customers read estimates as quotes.
- [ ] **What the price includes** and, separately, what it excludes.
- [ ] **Validity period** — how long the price stands. The most common
      omission in this class, and the one that costs money when material
      prices move.
- [ ] **Assumptions the price depends on** — access, conditions, third-party
      timing.
- [ ] **What happens next** — how the reader accepts.
- [ ] **Contradiction:** a line-item total that does not sum to the stated
      total. Arithmetic; do it.

---

## F. General business letter

- [ ] Recipient named and addressed correctly.
- [ ] Dated.
- [ ] The purpose is clear in the first two sentences.
- [ ] If it asks for anything, the ask and its deadline are identifiable.
- [ ] Sender identity and a contact route are present.
- [ ] No leftover placeholder text.

---

## The universal checks (every class, always)

These run regardless of class and are the ones a script would own:

- [ ] **No unfilled field** — no `{{...}}` survives anywhere in the finished
      document.
- [ ] **No placeholder prose** — "TBD", "XXX", "insert", "TODO", "lorem",
      "[ ]", and bare "N/A" inside a sentence.
- [ ] **Every date is a real date**, not "soon" or "next week", wherever a date
      field was asked for.
- [ ] **Every money amount has a currency and a number**, not "the agreed
      amount".
- [ ] **The recipient's name appears and is spelled the same everywhere.**
- [ ] **The sender identity appears once**, in the letterhead.
- [ ] **No other client's name appears.** Cross-contamination from a prior run
      is the worst possible defect in this kit; check the finished text against
      the names in the run history.

---

## Severity grammar (used by both workflows)

The same three words mean different things at the two moments this library
runs, because at extract time there is no document being produced to refuse.
Both columns are mandatory; read the one for the moment you are in.

| Level | AT FILL TIME (a document is being produced) | AT EXTRACT TIME (their own document is being scored) |
| --- | --- | --- |
| **STOP** | The document cannot be honestly produced. Refuse, say what is missing, ask for it. See §4.9 refusal in the kit standard. | Nothing is refused — nothing is being built. Instead this is a **DECISION REQUIRED**: report it, and do not finish the template until the owner has answered it one way or the other. Their answer is written into `review-checks.md` as a standing decision. A STOP-severity item cannot be left unanswered at extract time the way a FLAG can. |
| **FLAG** | Produce the document, list the flag on the verification page, customer must see it before attesting. | Report it as a gap in their document. They may add wording, or waive it (`deliberately omitted — do not flag`) and it never nags again. |
| **NOTE** | Listed, no gate. | Mentioned once, in passing. Not carried forward. |

Say which moment you are in when you report. "This is a stop at fill time"
means a future letter will not be produced without it; "this is a decision I
need from you now" means the template is not finished until they answer.
Never tell an owner their existing document is "refused" — it is already sent,
and refusing a document they mailed six months ago is nonsense they will
rightly ignore.

STOP conditions are named in `SKILL.md` and in each workflow. FLAGs never
silently disappear: an unresolved FLAG is printed on the verification page the
customer attests against, so the attestation record shows they saw it.
