# The checks that ran — Vitale & Marchetti, first real letter

Template: `engagement-letter` · Class **A — engagement / retainer / services
agreement**
Document: Bay Ridge Dental Group, 2026-08-12

## Class A presence checks

| Check | Result | Note |
| --- | --- | --- |
| Scope of work | PASS | L3, locked from the March 3 letter. |
| Scope boundary | PASS | L4 — two sentences Gina wrote during the gap report. Did not exist in the source. |
| Fee basis | PASS | Flat monthly, named, with the number. |
| What triggers extra cost | PASS | Out-of-scope work at hourly rates, stated. |
| Payment terms | PASS | Billed on the first. |
| What happens if payment is late | **Deliberately omitted** | Owner's standing decision. Not flagged. |
| Term and termination | **FLAG** | Absent. Owner asked for it to keep flagging until her attorney weighs in. Shown on the verification page; accepted knowingly. |
| Who is the client | PASS | The entity, not a person's first name. |
| Conflicts / existing-relationship line | NOTE | Not applicable as the owner described her practice. Asked once, recorded, not asked again. |
| Signature or acceptance mechanism | PASS | Sign and return, locked wording. |
| Date | PASS | |

## Class A contradiction checks

| Check | Result |
| --- | --- |
| Fee stated in two places and disagreeing | PASS — stated once. |
| Start date later than a deadline stated elsewhere | PASS |
| "Flat fee" and an hourly rate with no statement of which governs | PASS — the letter states hourly applies only outside the described scope. |

## Universal checks (`references/universal-checks.js`)

| Check | Result |
| --- | --- |
| No unfilled field | PASS |
| No placeholder prose | PASS |
| Every date is a real date | PASS |
| Every money amount has a currency and a number | PASS — "$2,400 per month" |
| Recipient name spelled the same everywhere | PASS |
| Sender identity appears once | PASS |
| No other client's name appears | PASS — checked against Grasso and two others in `history/`. This is the check that would have caught the sentence the refusal removed at extract time, had it ever reached a letter. |

**Releasable:** yes.
**Flags carried to the verification page and accepted:** 1 (term and
termination).

## Standing decisions recorded at extract time

- `scope boundary` — **added**, owner's own wording, now locked.
- `term and termination` — **keep flagging**, pending her attorney.
- `payment-terms consequence` — **deliberately omitted, do not flag.**
