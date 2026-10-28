# Doc Kit — User Config

The single config file for this skill. The installer writes the user's choices
here; every workflow reads them from here. Same file, same keys — no second
config file, ever.

- `output_dir: ~/Documents/doc-factory/`

`output_dir` is the ONE place finished documents are written — the folder the
customer opens in Finder/Explorer to print. The installer sets it (default
`~/Documents/doc-factory/`); `workflows/fill-and-render.md` reads it. Everything
the skill READS (templates, branding) lives inside this skill folder, not here.
