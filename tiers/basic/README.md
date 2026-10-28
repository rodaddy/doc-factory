# Doc Factory — tier `basic`

The only tier Doc Factory ships. Everything in the kit folder is this tier;
there is no reduced or extended cut.

## What ships

The complete Doc Kit: `START-HERE.md`, the self-adapting `installer.md`, the
plain-language `OPERATIONS-MANUAL.md`, `kit.json`, `VERSION`, `CHANGELOG.md`,
four complete worked examples under `examples/`, and the `doc-kit` skill folder
under `skills/` with its `SKILL.md`, `USER-CONFIG.md`, both workflows
(`extract-template.md`, `fill-and-render.md`), the shared `references/` library
(`document-classes.md`, `universal-checks.js`, `universal-checks.test.js`,
`verify-page.html`), and the fallback `templates/client-update-letter`
skeleton.

What it does: it turns the owner's OWN proven documents into locked templates
with fill-in fields, checks every document it builds against what that kind of
document must carry, points every section back to the source wording it came
from, and holds the result until the owner ticks the attestation and clicks
accept. No server, no build step, no package manager, and nothing for the
customer to buy.

Capability ladder (README "Capability tiers"): T1 full on a coding agent with a
filesystem and Node 22.6.0+, T2 on a chat app with a code sandbox (no
filesystem, so history and the verification log are files the user keeps), T3
chat-only, which still works and is labeled a degraded run.

## Who it is for

Business owners and their staff who send the same kinds of documents over and
over and are re-editing last month's letter to do it. It takes the document
work off the plate of the people already doing it so they can get to the work
they were hired for, and they remain the author of every document.

Strongest in professional services with recurring client correspondence --
accounting, insurance brokerages, title and closings, where the firm's
accumulated wording IS the asset. Good for trades (change orders, progress
updates, proposals). Good for medical and dental admin, with a HIPAA boundary
stated before it ships there. Weak for agencies and PR-creative, where
documents are bespoke per client and locking prose is the opposite of the
value.

## What it refuses to do

Seven named refusal conditions, and refusing is the product:

1. No document of their own -- no template. It will not write one and call it
   theirs.
2. Fewer than 150 words of locked prose, or more than 60% variable -- STOP,
   with both numbers shown.
3. Fewer than three fields -- STOP. That is stationery, not a useful template.
4. A specific client's name or matter facts inside the locked prose -- STOP,
   with the exact line quoted back.
5. A one-off promise inside locked prose -- STOP, quote it, and establish
   whether it is standard, optional, or removed before locking it.
6. Someone else's document -- STOP and establish the right to reuse it.
7. A field a STOP-severity check depends on is empty -- STOP and ASK. Never
   invent a value, never write "TBD" into a customer-facing document.

It also refuses to verify the install against a shipped example; the first real
run uses one of the user's own documents. Nothing here sends anything, and
nothing here is legal advice -- it reports what is not in a document, never
what it should say, and names the owner's attorney as the right person to ask.

## Install

From `START-HERE.md` and `installer.md`, condensed:

1. Unzip the kit (iPhone/iPad: tap it in Files. Windows: right-click, Extract
   All. Mac: double-click).
2. Get `installer.md` in front of your AI -- drag it in, share it in, or open
   it, select all, and paste -- then say: **install doc factory**.
3. The installer detects its own runtime and adapts the package to that host:
   - 3A coding agent with filesystem: collision/upgrade check, then copy the
     ENTIRE `skills/doc-kit` folder recursively into the skills directory
     (`~/.claude/skills/`, `~/.codex/skills/`, or the platform equivalent),
     set `output_dir:` in the installed `USER-CONFIG.md` (default
     `~/Documents/doc-factory/`), and assert every file landed.
   - 3B chat app with skill uploads: the AI builds the `doc-kit` zip itself
     (first path entry `doc-kit/`, entire contents recursively, no
     `__MACOSX/` or `.DS_Store`), hands it over with `OPERATIONS-MANUAL.md`,
     and the user uploads it and toggles it on.
   - 3C projects/custom instructions: the AI condenses the package into
     persistent instructions.
   - 3D plain chat: run from the canonical files in-conversation.
4. Image-capability check and the short branding interview, which write
   `branding/` inside the installed skill folder.
5. Verify by taking one of the user's OWN real documents through extraction and
   all the way through the verification gate. Never verify against a shipped
   example.

Runtime floor on the documented T1/T2 command path: Node 22.6.0 or newer,
declared in `kit.json`. No Bun, no jq, no Python, no build step, no
`npm install`, no shell scripts. Two ways to avoid installing Node: run the
checks inside the AI's own code sandbox (T2), or hand-apply the RULES table at
the bottom of `universal-checks.js` (T3, labeled degraded).

## Current version

1.0.5

Changes are recorded in the kit's `CHANGELOG.md`.
