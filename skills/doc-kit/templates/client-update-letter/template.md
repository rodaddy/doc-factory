<!--
DOC KIT TEMPLATE — Client Update Letter

*** THIS IS A FALLBACK SKELETON, NOT THE EXAMPLE TO SHOW ANYONE. ***
Its locked prose is 62 words. This kit's own refusal gate
(workflows/extract-template.md Step 2.5) stops at anything under 150, so this
template FAILS its own kit's test. That is deliberate and it is the correct
signal: a template made of rTech's wording instead of the customer's is the
generic letter they already have and already hate.

Use it ONLY for a customer who genuinely has nothing on file, and when you do,
say so plainly: "This is a starter skeleton, not your wording. Replace it the
first time you send a real one." The FIRST job is always
workflows/extract-template.md on one of THEIR documents.
See review-checks.md and sources/locked-prose.md in this folder.

CLASS: B — client update / status letter

The locked prose below never changes.
Only the parts inside double curly braces {{ }} get filled in.

The sender identity (business name, address, phone, email) is NOT part of the
letter body — it lives in the letterhead, which the render step builds from
branding/brand.md. That keeps the sender name and address from printing twice.
The sender fields below are still collected because the letterhead and the
sign-off need them.

FIELDS (fill every one of these — the field name IS the question to ask).
Each is marked (stable) or (per-run). STABLE fields are asked once and then
carried forward by the run history (history/), so later runs ask only the
per-run ones — 18 questions becomes 4. See fill-and-render.md Step 2.

  {{sender business name}}       (stable) letterhead + sign-off, NOT the body top
  {{sender phone number}}        (stable) letterhead + one body line
  {{sender email address}}       (stable) letterhead + one body line
  {{sender full name and title}} (stable) sign-off
  {{today's date}}               (per-run)
  {{client full name}}           (stable per client)
  {{client company name}}        (stable per client)
  {{greeting name}}              (stable per client)
  {{project or matter name}}     (stable per client)
  {{update summary}}             (per-run)
  {{what was completed}}         (per-run)
  {{what is happening next}}     (per-run)
  {{next step}}                  (per-run)
  {{date or timeframe for next step}}          (per-run)
  {{anything needed from the client}}          (per-run)
  {{date the client's response is needed by}}  (per-run) an ACTUAL date, never
      "at your convenience." If it falls inside 7 days of today's date, check B3
      in review-checks.md fires: the ask is buried in section four, so flag it
      and offer to move it above the status.
  {{closing line}}               (per-run)

The letterhead ALSO needs the sender street address, city/state/zip. Collect
them as {{sender street address}} (stable) and
{{sender city, state, and postal code}} (stable) for the letterhead contact
line — they do not appear in the body below.

How to use this file with no tools at all:
  Drop this whole file into any AI chat and say
  "fill out this client update letter." The AI will ask you for each field
  above, one plain question at a time, then produce the finished letter.

Bold markers: the **double-asterisk** labels below are BOLD in the finished
document. The render step turns **like this** into bold; the offline form emits
the same labels as bold lines. Do not strip the asterisks in the source.
-->

{{today's date}}

{{client full name}}
{{client company name}}

**Re: {{project or matter name}}**

Dear {{greeting name}},

I am writing to give you an update on {{project or matter name}}. {{update summary}}

**What we have completed**

{{what was completed}}

**What is happening next**

{{what is happening next}} The next step is to {{next step}}, which we expect to have underway by {{date or timeframe for next step}}.

**What we need from you**

{{anything needed from the client}} We need this by {{date the client's response is needed by}}.

{{closing line}} If you have any questions or would like to talk any of this through, please reach out at {{sender phone number}} or {{sender email address}}.

Thank you for your continued trust.

Sincerely,

{{sender full name and title}}
{{sender business name}}
