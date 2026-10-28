# The checks that ran — Kowalczyk Title Agency

This is the `review-checks.md` written by `extract-template.md` Step 5 for
`clear-to-close-letter`, exactly as it lands in the template folder.

```
CLASS: B (client update / status letter)

CLASS D (fee notice): DROPPED at extract time by the owner.
Reason (her words): "Nobody pays me from this letter. The premium goes on the
closing statement and comes out of the closing."
Do not re-apply on any run of this template.
```

## The extract-time gates

| Gate | Result |
| --- | --- |
| STOP 0 — no document of their own | Passed. Deirdre supplied a real one. |
| STOP 1 — under 150 locked words, or over 60% variable | Passed. **221 words / 29.2% variable.** |
| STOP 1b — fewer than three fields | Passed. Eleven fields. |
| STOP 2 — client-specific facts inside the locked prose | Passed. |
| **STOP 2b — a one-off promise about to become a standing one** | **FIRED.** "we will run a continuation search at no additional charge within ten days of closing" — a commitment term, in a sentence whose subject is the business, and not a reader obligation: all three conditions of the mechanical trigger. Resolved: **one-off**, pulled out of the locked prose, now an optional per-run field defaulting to omitted. |
| STOP 3 — someone else's document | Passed. Her letterhead, her sign-off. |

## Class B checks against her own document

| Check | Severity | Her document |
| --- | --- | --- |
| The ask is separated from the status | FLAG | **PRESENT.** Three open items in their own numbered list. |
| The ask carries a dated deadline | FLAG | **ABSENT.** Every deadline is relative. See the next row — that is the real finding. |
| **Every relative deadline has its anchor date written down** | FLAG | **ABSENT — the finding of the run.** Three deadlines measured from the closing; the closing date appears nowhere. Owner's decision: **added.** `{{scheduled closing date}}` is now a required field and prints in the Re: line. |
| The ask leads when it is urgent | NOTE | Now checkable, because the closing date exists. Fires whenever closing is inside seven days of the letter date. |
| Bad news is stated, not implied | FLAG | N/A this run. Standing check. |
| The next step has an owner | FLAG | **PARTIAL.** Item 1 names no one. Owner's decision: **deliberately omitted — do not flag.** ("The attorney knows whose job it is.") |
| No commitment the customer has not made | STOP (extract-time: DECISION REQUIRED) | **Answered** at STOP 2b above. |
| Contact route present | FLAG | **PRESENT.** |

## Universal checks against a filled letter from this template

Run 1 of the new template, to Alanna Brizuela, Esq., Brizuela Law PC, on
17 Windham Ct, Holbrook.

| Rule | Result |
| --- | --- |
| 1 no unfilled blanks | PASS |
| 2 no placeholder prose | PASS |
| 3 every date pins down | PASS — November 3 and November 6, both real dates |
| 4 every amount has a number and a currency | PASS — $498,000.00 and $2,687.00 |
| 5 recipient surname consistent | PASS — surname resolved to **Brizuela**, not "Esq.", and no near-miss spelling in the body |
| 6 sender name appears once | PASS |
| 7 no other client named | PASS — checked against Petrosino in `history/` |

Rule 5 is worth a note. The recipient field is "Alanna Brizuela, Esq." Taking
the last word would make the surname "Esq." and the check would then verify the
spelling of a suffix while a genuinely misspelled surname went out the door.
The suffix is stripped first, and the check looks for near-misses of the real
surname rather than only for the correct spelling — because the misspelled copy
is precisely the one that does not match the correct spelling.

## What did NOT get checked, and is honest about it

There is no check list in this kit for the conditions-precedent list that makes
a clear-to-close letter what it is — whether every open item names a party, an
instrument, and an amount. Class B is the closest fit and it is a loose fit.
The kit said so out loud rather than pretending: "I do not have a specialist
list for the open-items section. I checked what I can and I am telling you
where my list runs out."
