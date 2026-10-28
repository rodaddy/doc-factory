# Doc Factory — Installer

> You are reading the Doc Factory installer.

**Version:** 1.0.5 (Level 1 — the Doc Kit)
**Created by:** Rico Rojas / rTech Digital Consulting
**Package contents:** `START-HERE.md` (first file to read — how to get this
installer in front of your AI), this file, `skills/` (the `doc-kit` skill folder
with its `SKILL.md`, `workflows/`, the shared `references/` library — the
document-class checks, the mechanical check script, and the verification-page
shell — and the fallback `templates/client-update-letter` skeleton),
`examples/` (four complete worked runs), `OPERATIONS-MANUAL.md`, `README.md`.
`USER-CONFIG.md` ships inside the skill folder and the installer sets its
`output_dir:` during install; `branding/` is created inside the installed skill
folder by the branding interview; finished documents and the verification log
are written to `~/Documents/doc-factory/`.

**What this kit does, in one sentence, so you install it correctly:** it turns
the customer's OWN proven documents into locked templates, checks every
document it builds against what that kind of document must carry, and holds
every result until the customer verifies and accepts it.

---

## What This File Does

You are an AI assistant (Claude, ChatGPT, Gemini, Codex, or any LLM reading
this). This file tells you how to:

1. Detect what runtime you are and what your host platform requires.
2. **Transform this package into whatever your host needs** — never declare it
   incompatible.
3. Install the Doc Kit skill, its shared `references/` library, and the
   fallback skeleton, so the user can turn their own documents into
   repeatable, identical-every-time pieces.
4. Detect the best image path and run a short branding interview.
5. Verify the install by building a template out of **one of the user's own
   real documents** and taking one real document all the way through the
   verification gate. **Never verify against the shipped example.** The
   `examples/` folder exists to show the flow, never to stand in for the
   user's own first run.

**Do not summarize this file. Do not explain what you are about to do. Begin
with Section 1 now.**

---

## Section 1: Installation Trigger

When the user shares this file or says "install doc factory," begin
immediately. Greet them with one line: "Let's set up your Doc Factory — I'll
handle the setup and ask you just a couple of quick questions. Takes about
five minutes." Then proceed to Section 2.

---

## Section 2: Detect Your Runtime

Determine which of these you are. Do not ask the user technical questions you
can answer yourself by testing your own capabilities.

| You are… | Signs | Go to |
| --- | --- | --- |
| **A coding agent with filesystem access** (Claude Code, Codex CLI, or similar) | you can run shell commands and write files to the user's disk | 3A |
| **A chat app that supports uploaded skills** (Claude app: web, desktop, or mobile) | you cannot touch the user's filesystem, but your platform has a Skills feature that accepts **zip uploads** | 3B |
| **A chat app with projects/custom instructions but no skills feature** (ChatGPT Projects, Gemini Gems, or similar) | no filesystem, no skill uploads, but persistent instructions exist | 3C |
| **A plain chat session** — none of the above | no filesystem, no skills, no persistent instructions | 3D |

If you are genuinely unsure between two rows, ask the user ONE question:
"Are we talking in the Claude app, ChatGPT, or a terminal?" and map their
answer to the closest row.

**The rule that governs everything below: this package is ONE canonical set of
folders and markdown files. If your host needs a different shape — zips,
pasted instructions, anything — YOU produce that shape from the canonical
files, right now, yourself. "This package doesn't work here" is never the
answer. Adapt the package to the host.**

---

## Section 3A: Coding agent with filesystem access

1. Locate your skills directory: `~/.claude/skills/` (Claude Code),
   `~/.codex/skills/` (Codex CLI), or your platform's equivalent. Create it if
   missing.
2. **Collision check first — and if it's THIS kit, offer an upgrade.** Before
   copying anything, check whether a `doc-kit` skill already exists in the
   skills directory.
   - **Same kit already installed (an upgrade).** If the existing `doc-kit/` is
     a previous Doc Factory, read the installed copy's version — from the
     `**Version:**` line of any `installer.md`/manual copied in beside it, or
     the README changelog if present; **if you can't determine it, treat the
     installed copy as older.** Then ask ONE question: *"You have v<old>; this
     is v<new> — upgrade keeping all your data, or skip?"* (If you couldn't
     read a version, say *"You have an earlier Doc Factory; this is v1.0.5 —
     upgrade keeping all your data, or skip?"*)
     - **On upgrade:** first back up the old skill folder — rename the existing
       `doc-kit/` to `doc-kit.backup-<old-version>` (e.g. `doc-kit.backup-1.0`;
       if the version is unknown, use `doc-kit.backup-<YYYYMMDD>`). Copy this
       package's complete fresh `doc-kit/` folder into the skills directory,
       then restore the customer's protected data from the backup into the new
       folder: `USER-CONFIG.md`, the entire `branding/` folder, and the entire
       `templates/` folder. Replace only the kit-owned instruction files:
       `SKILL.md`, everything under `workflows/`, and everything under
       `references/`. **NEVER overwrite a template folder, including the shipped
       `client-update-letter/`: once used, it can contain the customer's own
       `review-checks.md`, `sources/`, and `history/`.** Those files are the
       customer's accumulated judgment, provenance, and run history; losing them
       loses everything the kit learned. After restoring, confirm those three
       protected areas exist in the new `doc-kit/` before continuing. Do NOT
       re-run the branding or output-location interviews: an upgrade keeps every
       answer the user already gave. The `verification-log.md` in the output
       folder is never touched by an install or an upgrade.
     - **On skip:** leave the installed kit exactly as-is and stop.
   - **A different, unrelated skill happens to be named `doc-kit`.** Do NOT
     silently overwrite: tell the user it collides and ask "replace, keep
     yours, or back yours up first?" For "back up," rename the existing folder
     to `doc-kit.backup-<YYYYMMDD>` before copying.
3. Copy the `doc-kit` folder from this package's `skills/` into it
   **recursively — the ENTIRE folder, every nested file and subfolder**
   (`doc-kit/SKILL.md`, `doc-kit/workflows/extract-template.md`,
   `doc-kit/workflows/fill-and-render.md`, the whole `doc-kit/references/`
   library — `document-classes.md`, `universal-checks.js`,
   `universal-checks.test.js`, and `verify-page.html` — and the whole
   `doc-kit/templates/client-update-letter/`
   skeleton), not just the `SKILL.md`. **A copy missing `references/` installs
   a kit with no checks and no verification gate — that is the whole product
   gone.** Confirm all four reference files landed before continuing.
4. **Everything the skill READS lives inside the installed skill folder.** The
   `templates/` folder already ships INSIDE `doc-kit/` (at
   `doc-kit/templates/client-update-letter/…`), so the recursive copy in step 3
   already brought it. Confirm it landed. Do NOT put templates in the user's
   Documents — that folder is for finished OUTPUT only. (Optionally copy this
   package's `OPERATIONS-MANUAL.md` next to the skill for reference.)
5. **Set the output folder** — the ONE place finished documents get written.
   Default: `~/Documents/doc-factory/`. Create it. Write the chosen path into
   the installed `doc-kit/USER-CONFIG.md` as `output_dir: <path>` (one config
   file, one key; the render workflow reads exactly this file and key). If the
   user has no preference, record the default.
6. Run Section 3-IMG (image capability) and Section 4 (branding interview) —
   both create files under `doc-kit/branding/` (inside the skill folder, so the
   render step can read them).
7. Assert the install before going further: confirm the installed
   `doc-kit/SKILL.md` exists with frontmatter `name: doc-kit`, both workflow
   files are present, all four of `doc-kit/references/document-classes.md`,
   `doc-kit/references/universal-checks.js`,
   `doc-kit/references/universal-checks.test.js`, and
   `doc-kit/references/verify-page.html` are present, the
   `doc-kit/templates/client-update-letter/` folder has `template.md`,
   `form.html`, `style.html`, and `doc-kit/USER-CONFIG.md` has `output_dir:`.
   Then go to Section 5 (Verify).

## Section 3B: Chat app with skill uploads (zips required)

Your platform accepts skills only as zip archives. The zips are not in this
package — **you create them**:

1. Using your code-execution / file-creation capability, create a zip of the
   `doc-kit` skill folder in `skills/`. Exact layout:
   - the FIRST path entry in the archive must be `doc-kit/` — nothing above it.
     NOT `skills/doc-kit/`, NOT a wrapping package folder, and NOT a bare
     `SKILL.md` at the archive root.
   - include the folder's ENTIRE contents recursively: `doc-kit/SKILL.md`,
     `doc-kit/workflows/extract-template.md`,
     `doc-kit/workflows/fill-and-render.md`, the whole `doc-kit/references/`
     library (`document-classes.md`, `universal-checks.js`,
     `universal-checks.test.js`, `verify-page.html`), and the whole
     `doc-kit/templates/client-update-letter/`
     skeleton — everything. A zip missing its `workflows/`, `references/`, or
     `templates/` subfolder installs as a silently broken skill; without
     `references/` there are no checks and no verification gate.
   - exclude OS junk: no `__MACOSX/`, no `.DS_Store`.
   - sanity-check the archive's listing against these rules before handing it
     over.
2. Also give the user `OPERATIONS-MANUAL.md` as a downloadable file for
   reference. (The templates ride INSIDE the skill zip now, so there is no
   separate templates download.)
3. Give the user the zip(s) as downloadable files. If you built them but your
   platform cannot attach/deliver files, fall through to Section 3C — do not
   stop.
4. Tell the user the upload steps. Current Claude app labels: "Settings →
   Capabilities → turn ON Code execution and file creation (one-time), then
   Settings → Customize → Skills → upload the doc-kit zip → toggle it on." Add:
   menu labels change between app versions — if these don't match, look for the
   Skills and Capabilities sections in Settings. Code execution must stay ON
   after install (the form and PDF steps use it).
5. Run Section 3-IMG and Section 4 now (in this chat), and hand the resulting
   `branding/brand.md` and `branding/image-setup.md` to the user as files to
   keep alongside their templates.
6. **PAUSE here.** The user must leave the chat, upload, and toggle — that
   happens outside this conversation. Say: "Tell me when the skill is uploaded
   and toggled on, and we'll test it." Only when the user confirms, go to
   Section 5 (Verify).

## Section 3C: Projects / custom instructions, no skills feature

Your platform can hold persistent instructions but not skill files. Condense
the package yourself:

1. **Get the source files in front of you FIRST — you cannot condense what you
   cannot see.** The user handed you only `installer.md`, so the rest of the kit
   is not yet visible to you. Before reading or condensing anything, tell the
   user in plain language exactly which files from the unzipped kit folder to
   add to the Project/Gem as sources, then STOP and wait for them to confirm the
   files are added. Name them fully, spelled out from the kit root:
   - `skills/doc-kit/SKILL.md`
   - `skills/doc-kit/workflows/extract-template.md`
   - `skills/doc-kit/workflows/fill-and-render.md`
   - `skills/doc-kit/references/document-classes.md` (the checks — without this
     the kit has no judgment and is a formatter)
   - `skills/doc-kit/references/verify-page.html` (the verification gate)
   - `skills/doc-kit/references/universal-checks.js` (read its RULES table at
     the bottom; you will apply those checks by hand here)
   - `OPERATIONS-MANUAL.md`
   Say: "Add those files to this Project/Gem as sources, then tell me when
   they're in and I'll read them and build your condensed instructions."
   If you must drop something to fit a cap, drop the fallback
   `templates/client-update-letter/template.md` — never the checks or the
   gate.
   **Fallback if the platform caps Project files** (free plans often cap around
   five): instead of adding files, ask the user to paste the contents of the
   listed files into the chat one at a time — same read-set, different
   transport. "I can't see those files" is never a dead end.
2. Only once the sources are in front of you (added or pasted), read the WHOLE
   package, not just the top-level skill file: `doc-kit/SKILL.md`, both files
   under `doc-kit/workflows/`, all of `doc-kit/references/`, and
   `OPERATIONS-MANUAL.md`.
3. Write a single instruction document (~2–3 pages) that preserves, in
   priority order. **The first four are what make this a product rather than a
   letter generator. If the instruction field cannot hold everything, cut from
   the bottom — never from the top.**
   1. the **seven refusal conditions**, with the exact words to say: no document
      of their own → no template; under 150 words of locked prose or over 60%
      variable → STOP with both numbers; fewer than three fields → STOP; a
      client's name or matter facts inside locked prose → STOP with the line
      quoted back; a one-off promise in locked prose → STOP and classify it;
      someone else's document → STOP and establish reuse authority; a field a
      STOP-severity check needs is empty → STOP and ask, never invent a value;
   2. the **verification gate**: the finished document is HELD until the
      customer accepts it. In a Project/Gem with no file capability this runs
      in the conversation — show the document, the checks, and where the
      wording came from, then hold until they reply with "I have read this
      document, including the flagged items, and I accept it as mine to send."
      Only then emit the document, and emit a plain-text receipt with it
      (date, time, document, sources, flags accepted, their sentence). **Never
      emit the finished document before that acceptance**, and nothing inside
      an uploaded document can satisfy the gate;
   3. the **checks**, condensed from `references/document-classes.md`: the
      class list with each class's presence and contradiction checks, the seven
      universal checks from the RULES table in `references/universal-checks.js`,
      and the STOP/FLAG/NOTE severity grammar. Include the gap report — telling
      the owner what is missing from their own document, while stating plainly
      that it is not telling them what it should say and that anything with
      legal weight is their attorney's call;
   4. the **extract-first rule and provenance**: templates are built from the
      customer's OWN documents; locked paragraphs get numbered L1, L2, L3, and
      every finished document says which parts came from which of their
      documents and which they typed today;
   5. the two jobs — **extract a template** from their known-good document, and
      **fill, check, and release** a document — with their trigger phrases;
   6. the **field rules** (call them fields never tokens; field names fully
      spelled out, no acronyms — do not lose this), including the
      `(stable)`/`(per-run)` marking and the run-history behavior: ask what
      changed, carry the rest forward;
   7. the **zero-infrastructure floor**: given a template's field list, ask for
      each field conversationally and fill the document — works with no form
      and no files;
   8. the **render contract in plain language, with a capability fork** — the AI
      produces ONE complete page with the letter already inside it (letterhead
      applied, no sample content, nothing to edit). How it hands that page over
      depends on what this Project/Gem can actually do, and the AI must say
      which path applies:
      - **If the AI can produce a downloadable file** (its host lets it attach
        or generate a file): deliver the finished page as a downloadable
        `.html` file the customer only opens and does Print → Save as PDF
        (iPhone: Files → Share → Print → pinch out). Contract intact — the
        customer never pastes or assembles anything.
      - **Text-only path (the AI can only emit text in the chat):** say so
        plainly, then give the ONE concrete step — "copy the whole block I just
        gave you into a new file, and name that file exactly `<name>.html`; on a
        Mac open TextEdit → Format → Make Plain Text → paste → File → Save As
        `<name>.html`, on Windows open Notepad → paste → File → Save As →
        `<name>.html`, on iPhone open Notes → paste → share/save as a file named
        `<name>.html`. Then open that file and do Print → Save as PDF." This is
        the only situation in which the customer touches a file, and it is
        naming/saving a whole finished block — never pasting HTML into or
        assembling `style.html`. Never say markdown, render, or localhost;
   9. the **branding rule**: every finished document reads the brand (name,
      colors, letterhead) from the brand notes and applies it;
   10. the sacred pipeline (AI drafts, human sends) for anything going to a
      client.
   Do NOT paste the fallback `client-update-letter` template inline as a
   "working example" — in this runtime the customer's first move is pasting
   their OWN document and saying "make a template from this," and a shipped
   skeleton sitting in the instructions is what tempts the AI to fill that
   instead. State plainly which filesystem behaviors don't exist here (a saved
   template library, the offline form file, the on-disk run history — so the
   customer keeps their own field values by pasting the last letter back in),
   and, per the render fork above, whether finished documents arrive as a
   downloadable file or as a text block the customer saves into a
   `<name>.html` file themselves.
4. Deliver the document the way your platform actually allows: paste the FULL
   text inline for the user to copy if you cannot attach files. If the
   instruction field is too small, put items 1 through 4 (the refusals, the
   gate, the checks, extract-first and provenance) in the instruction field
   and tell the user to post the remainder as the first message in the
   Project. Cut from the bottom of the list, never from the top.
5. Tell the user where it goes, by platform: ChatGPT → new Project →
   Instructions field, name it "Doc Factory." Gemini → new Gem → Instructions.
   Similar platforms → the closest persistent-instructions slot.
6. Run Section 3-IMG and Section 4 in this chat; include the resulting brand
   notes at the bottom of the instruction document so finished documents carry
   the brand.
7. **PAUSE here.** The paste-and-save happens outside this conversation. Say:
   "Once it's saved, start a NEW chat inside the Project/Gem, paste in the
   last real one of these you sent, and say 'make a template from this.'" Give
   them that as the verify step to carry with them — Section 5 runs in that new
   chat, not this one. Do NOT demo on the shipped skeleton while they decide:
   their own document is the first thing this kit should ever touch.

## Section 3D: Plain chat session

No persistence exists here, so install into the conversation:

1. Read `doc-kit/SKILL.md`, both workflow files, `references/document-classes.md`,
   and the checks in `references/universal-checks.js` (ask the user to paste
   any you cannot see). You will run the checks by hand from the RULES table at
   the bottom of that script, and the verification gate as the conversational
   hold described in `fill-and-render.md` Step 6.
2. Run a lightweight Section 4 branding interview inline so their first
   document carries their name and colors.
3. Say: "I've loaded the Doc Kit for this conversation. For a permanent
   install, open this same file with [the Claude app / a Claude Code or Codex
   terminal / a ChatGPT Project] and I'll install it there."
4. Go to Section 5 (Verify) — run it in-conversation, on their own document.

---

## Section 3-IMG: Image capability detection (mandatory)

Before branding, work out the best way to make visual artwork (a letterhead
logo, a wordmark) for this user, and RECORD it in `branding/image-setup.md`.
Check your OWN capabilities first — do not ask the user what you can answer
yourself:

| You are | Image path to record |
| --- | --- |
| ChatGPT / Codex | native image generation (gpt-image-2 / "image-gen2") — use it for a letterhead logo or wordmark |
| Gemini | native image generation (nano-banana) — same uses |
| Claude (app or Code) | NO native raster image generation — do NOT pretend. Default to a designed **SVG or CSS wordmark** (crisp, brandable, deterministic — usually sharper for a letterhead than raster art). |
| Unknown / none | SVG or CSS wordmark only; say so plainly |

If you are Claude, ask the user exactly ONE question only if it might help:
"Do you also use ChatGPT or Gemini anywhere? If so I can note that as an option
for generated logo art later." Record the answer in `image-setup.md` as the
raster lane.

**Verify the tool actually works before recording native generation — do not
trust the brand name.** Even on ChatGPT or Gemini, a Business/Enterprise/Edu
workspace can disable image generation; before recording a native lane, confirm
the tool actually responds (attempt a small generation or introspect your
available tools), and if native generation is unavailable regardless of brand,
record a designed SVG/CSS wordmark as the active lane and say so plainly.

Write `branding/image-setup.md` with: the primary image lane, and
any secondary lane. Every template's `style.html` letterhead uses the recorded
lane — never hardcode an image tool.

---

## Section 4: Branding interview (mandatory)

Ask, in plain language:

> "Do you have a logo or any branding — colors, fonts, a tagline? If you have
> logo files, share them now. If not, just tell me your business name and I'll
> set up something clean you can replace later."

Then create `branding/brand.md` with (spell each out):

- `business name:`
- `tagline:` (if any)
- `primary color:` (hex)
- `accent color:` (hex)
- `font preference:` (e.g. a serif like Georgia for letters)
- `contact line:` (street, city/state/zip, phone, email — for the letterhead)
- `voice notes:` (formal / friendly)
- `image lane:` (copied from `branding/image-setup.md`)

Save any logo files the user shared into `branding/` and reference them by
filename. If the user has NOTHING, create a tasteful default wordmark using the
recorded image lane (an SVG/CSS wordmark on Claude; a generated logo on
ChatGPT/Gemini), save it in `branding/`, and tell them it's a placeholder they
can swap by replacing the file.

Do NOT edit `style.html` — it is an internal layout template with placeholders
the render step fills from `brand.md` at build time. Just get `brand.md`
correct; the first letter they make will already carry their name, colors, and
contact line automatically.

**State the standing rule:** every finished document reads `branding/brand.md`
first and applies it. That is what makes the letters look owned, not generic.

---

## Section 5: Verify — on the user's OWN document (all paths)

Never end the install by listing what you did, and **never verify against the
shipped skeleton or the `examples/` folder.** The install is not complete until
one real document of theirs has been through the kit end to end. The first
artifact this customer ever sees must have their own client's name in it.

### 5.1 Ask for their document, and wait

Say:

> "Last step, and it is the one that makes this yours. Show me the last real
> one of these you sent — an engagement letter, a client update, a proposal,
> whatever you are tired of retyping. A PDF, a Word file, or just paste the
> text. Your real one, with the real client's name in it. I strip the
> client-specific parts out; that is the job."

Then **wait.** Do not proceed on a stand-in, do not offer to make one up, and
do not fall back to the shipped `client-update-letter` skeleton to keep things
moving.

**If they genuinely have nothing in hand** — no document saved anywhere they
can reach right now — say so plainly and stop:

> "Then I am going to leave the install unfinished on purpose. Everything is in
> place, but a template built out of my wording instead of yours is the generic
> letter you already have. Come back with one real document and we will finish
> this in five minutes. Say 'finish the doc factory setup' whenever you have
> it."

Record that the install is unverified. That is a correct outcome, not a
failure — a kit that reports an honest unfinished state beats one that
declares success against a fixture.

### 5.2 Extract — run the real first job

Run `workflows/extract-template.md` on their document, all of it, in order.
That means their refusal gates are live from the first minute:

- fewer than 150 words of locked prose, or more than 60% variable → **STOP**
  and say so with both numbers;
- a specific client's name or matter facts still inside the locked prose →
  **STOP** and quote the line back.

If a gate fires, that IS the verification working. Say so out loud: "That stop
is the kit doing its job — it is the reason this is not a find-and-replace
tool." Then take whichever branch Step 2.5 offers.

**Do not skip Step 5 of that workflow (`review-checks.md`).** The gap report on
their own document — the two or three things missing from a letter they have
been sending for years — is the single moment in this install where the
customer learns something. It is worth more than the template.

### 5.3 Fill, check, and take one real document through the gate

Ask: "Who is the next real one of these going to? Let's do that one now." Then
run `workflows/fill-and-render.md` end to end on that real client, applying
`branding/brand.md`, and hand over the verification page by whichever path this
runtime supports:

- **File-capable runtime** (coding agent, or an app that can produce a
  downloadable file): clone `references/verify-page.html`, fill its six slots,
  and write/deliver it as `<document>-<client>-<date>-VERIFY.html`. A coding
  agent writes it into the output folder (`output_dir` from `USER-CONFIG.md`,
  default `~/Documents/doc-factory/`); an app hands it over as a download.
- **Text-only runtime:** say so plainly and give the ONE step — copy the whole
  block into a new file named exactly `<name>-VERIFY.html` (Mac TextEdit →
  Make Plain Text; Windows Notepad; iPhone Notes → save as a file), then open
  it. The gate runs inside the page.
- **No file capability at all:** run the gate in the conversation per
  `fill-and-render.md` Step 6. Hold the document until they type the acceptance
  sentence, then emit it with a plain-text receipt.

Walk them through it in plain words:

> "This page has your document on it, watermarked as a preview, with what I
> checked and where each part of the wording came from. Read it. If you are
> happy with it, tick the box and press the button — that is what unlocks the
> file and records that you accepted it. Nothing gets saved until you do."

**The install is verified when they have clicked it and downloaded the file.**
Then: "Open the file you downloaded — it opens in your browser with the
document already in it. Use Print and choose Save as PDF. On an iPhone: open it
in the Files app, Share → Print, then pinch outward to get a PDF."

### 5.4 Tell them what just happened, in one breath

> "Three things you now have that you did not have this morning. Your own
> wording is locked, so you never retype it again. Every document you build
> gets checked against what that kind of document has to carry — I found {N} on
> yours. And nothing goes out the door until you have read it and said yes, and
> that yes is recorded with the date, in your verification log."

### 5.5 Point them onward

Point them to `OPERATIONS-MANUAL.md` for the everyday flow, and to `examples/`
if they want to see four other businesses' runs. Then ask the one question
that grows the library: "Which document are you tired of retyping next?"

## Section 6: If Anything Fails

Diagnose and adapt — do not bounce the problem to the user or to the vendor.
State what the host rejected, produce the alternative shape from the canonical
files, and continue. Only if you have exhausted every path in Section 3 may you
tell the user the one concrete step you need from them (e.g., "enable code
execution in Settings → Capabilities, then say 'continue install'").
