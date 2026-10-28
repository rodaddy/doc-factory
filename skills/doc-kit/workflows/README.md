# `workflows/` -- the two procedures the skill runs

- `extract-template.md` -- the owner's own document in, a locked template out,
  with its fields, its class checks, and its provenance record. This is where
  the refusal conditions fire.
- `fill-and-render.md` -- fill the fields, run the checks, HOLD the result,
  take the verification click, release the document, and write the log.

`SKILL.md` dispatches to one of these; neither is read directly by the user.
