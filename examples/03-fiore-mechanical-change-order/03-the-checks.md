# The checks that ran — Fiore Mechanical

No template was built, so there is no `review-checks.md` for a change-order
template. What ran was the refusal gate at extract time, plus a courtesy pass
of the Class C checks against the source document.

## The refusal gate (`workflows/extract-template.md` Step 2.5)

| Gate | Result |
| --- | --- |
| STOP 0 — no document of their own | Passed. Sal supplied a real one. |
| **STOP 1 — not enough repeatable wording** | **FIRED.** 14 words of locked prose against a 150-word floor; 88% variable against a 60% ceiling. Both numbers shown to the owner. No template built. |
| STOP 2 — client-specific facts in the locked prose | Not reached. |
| STOP 3 — someone else's document | Not reached. |

The two numbers are what make this deterministic. The kit did not decide the
document "felt thin"; it counted, and 14 is below 150.

## Class C checks, run against the source as a courtesy

Reported to the owner, not written into any template.

| Check | Result |
| --- | --- |
| What changed, stated as a difference from what was agreed | PASS |
| Price delta AND new total | **ABSENT** — delta only. |
| Schedule impact | **ABSENT** |
| Approval mechanism | **ABSENT** — "Let me know" is not an approval mechanism. |
| Reference to the original agreement | **ABSENT** |
| Arithmetic: delta plus prior total equals new total | Not checkable; no totals present. |

## What happened next

The owner returned with a proposal document: 412 words of locked prose, 22%
variable. That one cleared the gate and became `proposal` — the template that
was actually worth building.
