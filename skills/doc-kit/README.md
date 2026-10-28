# `doc-kit` skill

The installable skill itself -- the folder the installer copies, whole and
recursive, into the user's skills directory. `SKILL.md` is the entry point and
carries the frontmatter (`name: doc-kit`) and its trigger phrases.
`USER-CONFIG.md` is the one config file, holding `output_dir:`.

Subfolders: `workflows/` (the two driving procedures), `references/` (the
shared judgment library and the deterministic checks), and `templates/` (the
fallback skeleton). `branding/` is created here at install time by the branding
interview. A copy missing `references/` installs a kit with no checks and no
verification gate.
