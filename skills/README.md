# `skills/` -- the installable skill payload

Holds exactly one folder, `doc-kit/`, which is the skill the installer copies
whole and recursive into the user's skills directory (`~/.claude/skills/`,
`~/.codex/skills/`, or the platform equivalent), or zips for a chat app that
accepts skill uploads.

Nothing else belongs here. See `doc-kit/README.md`.
