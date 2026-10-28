# Run history — client-update-letter

Empty on purpose. It fills up as the customer uses the template.

After every VERIFIED document, `workflows/fill-and-render.md` Step 7 writes one
file here:

```
client-update-letter-<client slug>-<date>.fields.md
```

Each file holds every field name and the value used, marked `(stable)` or
`(per-run)`, plus a `next step:` line and its date if the document stated one.

## What it is for

`fill-and-render.md` Step 2 reads this folder FIRST, before asking the customer
anything. That is what makes run five better than run one:

- **The carry-forward question.** "Last month you told Denise the curbing would
  be set by August 20. Did that happen?" A filing cabinet cannot ask that.
- **Pre-filled stable fields.** The sender's address, phone, email, and
  standard figures are reused, announced in one line so the customer can
  correct them. Eighteen questions become four.
- **Overdue commitments surfaced.** If a prior run stated a next step with a
  date that has now passed and this document does not mention it, it gets
  flagged.
- **Cross-contamination caught.** Universal check U7 compares the finished text
  against the client names in this folder, so another client's name can never
  reach a letter.

## Rules

- One file per verified document. Nothing is written here for a document that
  was never verified.
- This folder is the customer's data. An upgrade **never** overwrites or clears
  it — see the preserve-list in `installer.md` Section 3A.
- No document text is stored here, only field values and the next-step line.
- This file (`README.md`) is the only thing that ships; delete nothing else
  from here.
