# `templates/` -- the template library, inside the skill

Every template lives in its own folder here, named plainly
(`engagement-letter`, `client-update-letter`), each with its own fields, checks,
provenance, and run history. The library grows as the owner turns more of their
own documents into templates.

Ships with one folder, `client-update-letter`, which is a FALLBACK skeleton
rather than a demo. This folder stays inside the installed skill; the owner's
finished documents are written elsewhere, to their output folder.
