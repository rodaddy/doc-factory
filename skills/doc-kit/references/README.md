# `references/` -- the shared library every template reads

Read by both workflows on every run, never per-template.

- `document-classes.md` -- the judgment library: per document class, what that
  kind of document must carry and what it commonly omits.
- `universal-checks.js` -- the mechanical work as code: the extraction refusal
  counts, the standing-promise scan, and the seven fill-time checks. Carries a
  hand-application RULES table for runtimes with no code execution.
- `universal-checks.test.js` -- plain-Node behavior tests, run with
  `node --test` (Node 22.6.0+).
- `verify-page.html` -- the verification-gate shell: disabled until ticked, one
  click, one stamp, watermark removal, receipt generation. Cloned per document,
  never re-implemented. Offline, no network, no CDN.
