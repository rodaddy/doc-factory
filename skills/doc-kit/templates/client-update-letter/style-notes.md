# Style notes — Client Update Letter

**class:** B — client update / status letter
**thin template:** yes — 62 words of locked prose, under the 150-word floor
**status:** FALLBACK SKELETON. Not the demo, not the example to show anyone.
See `review-checks.md` and `sources/locked-prose.md` in this folder for why.
The first job is always `workflows/extract-template.md` on a real document of
the customer's own.

These are the rules that keep every client update letter looking the same,
no matter who fills it in or when.

## The look

- **Body typeface:** Georgia (a serif). Falls back to Times New Roman.
- **Body size:** 11.5 point, line spacing 1.5 — comfortable, professional.
- **Page:** US Letter, 1-inch margins all around (set in `style.html`).
- **Letterhead:** the business name in the brand's primary color, a thin rule
  underneath, and a small contact line. This is the ONE spot that carries the
  brand — pull the name, contact line, and color from `branding/brand.md`.
- **Section labels** ("What we have completed", "What is happening next",
  "What we need from you") stay bold and in the same order every time. They are
  written with `**double asterisks**` in `template.md` and `form.html`, and the
  render step turns each `**text**` into real bold in the finished page. Do not
  rename or reorder them; that consistency is the point.
- **The sender identity lives in the letterhead only.** The business name and
  address appear once, at the top, in the letterhead — never repeated in the
  letter body. The body starts at the date.

## What is locked vs. what changes

- **Locked (never edit per-letter):** the prose, the section labels, the
  greeting/closing structure, the fonts, the margins, the letterhead layout.
- **Changes every time:** only the fields — the parts inside `{{ }}` in
  `template.md`.

## Branding

`style.html` is an INTERNAL template the AI reads — nobody edits it by hand.
Its letterhead carries placeholders the render step fills from
`branding/brand.md`:

- the business name,
- the contact line,
- the primary color (the two values marked "primary color"),
- optionally a logo image in place of the name if the brand has one.

The brand values live in one place — `branding/brand.md`. Change them there and
every future letter picks up the new look automatically. (Note: each document
type has its OWN `style.html` layout, so a font/margin change is per-template,
but the brand name/color/contact all flow from the single `branding/brand.md`.)

## Making the PDF

The customer does none of the assembly. The AI produces ONE verification page
(cloned from `references/verify-page.html`) with the letter inside it,
watermarked as a preview, the checks report under it, and the list of where the
wording came from. Nothing is a saved, usable file until the customer ticks the
box and clicks **I validate this and I want it** — that click stamps the
receipt, drops the watermark, and produces the download. Then the customer's
only two actions:

1. Open the file they downloaded (double-click — it opens in the browser).
2. Print, then Save as PDF.

iPhone/iPad: open the file in the Files app, Share → Print, then pinch outward
on the preview to save it as a PDF. The customer never pastes into or edits any
HTML file.

## Pro lane (optional, for the done-for-you cut)

The customer path above uses the browser to make the PDF — no software to
install. The done-for-you "pro" lane renders the same filled markdown through
`pandoc --pdf-engine=xelatex` with a locked `.tex` style header (the proven
resumeUpdate pattern). Same discipline — locked style, one deterministic
command, never plain pandoc — but it needs LaTeX installed, so it stays off
the customer machine.
