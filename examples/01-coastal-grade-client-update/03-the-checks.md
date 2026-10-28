# The checks that ran — Coastal Grade, run 1

Template: `client-update-letter` · Class **B — client update / status letter**
Document: Vardalos, Hauppauge Industrial Realty Partners, 2026-08-12

## Class B checks

| Check | Result | Note |
| --- | --- | --- |
| The ask is separated from the status | PASS | Its own section, and moved to the top by the urgency check below. |
| The ask carries a dated deadline | PASS | "Monday, August 17, 2026." Added because of the gap report at extract time. |
| The ask leads when it is urgent | **FIRED** | Deadline five days out, inside the seven-day window. Offered to move it to the top; owner said yes. Status follows unchanged. |
| Bad news is stated, not implied | PASS | The two-week nursery delay is named in a sentence, not left to be inferred from the new date. |
| The next step has an owner | PASS | "Our crew will core the islands." |
| No commitment the owner did not make | PASS | Every date in the letter came from a field the owner supplied. |
| Contact route present | PASS | Phone and email, from the brand record. |

## Universal checks (run by `references/universal-checks.js`)

| Check | Result | Note |
| --- | --- | --- |
| No unfilled field | PASS | Zero `{{...}}` in the finished text. |
| No placeholder prose | PASS | |
| Every date is a real date | **FLAG, then resolved** | `date or timeframe for next step` came back as "end of the month." Flagged; owner replaced it with "August 29, 2026"; page rebuilt. |
| Every money amount has a currency and a number | PASS | No amounts in this letter. |
| Recipient name spelled the same everywhere | PASS | "Vardalos" once, consistent. |
| Sender identity appears once | PASS | Letterhead only; body starts at the date. |
| No other client's name appears | PASS | Checked against three names in `history/` — Coyne, Sagamore, and one other. None present. |

**Releasable:** yes, after the date flag was resolved.
**Flags carried to the verification page:** 0 at the time of the click.

## Standing decisions recorded at extract time

- `dated deadline on the ask` — **added** at the owner's request, now a
  required field.
- `urgent ask leads` — **active**, fires inside seven days.
- No checks were waived.
