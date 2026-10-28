/* ---------------------------------------------------------------------------
   Doc Factory — the universal checks, as code.

   Determinism-first: these checks land the same verdict 100% of the time, so
   they are a script, not a paragraph asking the AI to remember. The AI drives
   (classifies the document, runs the conversation, judges the class-specific
   items in review-checks.md); this function decides the mechanical ones.

   HOW THE AI RUNS IT — pick whichever your runtime has, in this order:
     1. Code execution (Claude/ChatGPT sandbox, or a coding agent): paste this
        file into the sandbox, call runUniversalChecks(...), use the result.
     2. No code execution: apply the RULES table below by hand, in order, and
        report in the same shape. The rules are written to be followed
        mechanically -- no judgment required, no rule skipped.

   It never touches the network and never reads a file. Text in, verdicts out.

   Exit grammar mirrors the repo's: every check returns "PASS", "FLAG", or
   "STOP". A STOP stops the run (fill-and-render.md Step 5). A FLAG survives
   to the verification page the customer attests against.
--------------------------------------------------------------------------- */

function runExtractionChecks(input) {
  // input = {
  //   lockedProse: String, variableText: String, fields: [String]
  // }
  var lockedProse = String(input.lockedProse || "");
  var variableText = String(input.variableText || "");
  var fields = Array.isArray(input.fields) ? input.fields : [];
  var lockedWords = wordCount(lockedProse);
  var variableWords = wordCount(variableText);
  var totalWords = lockedWords + variableWords;
  var variablePercent = totalWords ? Math.round((variableWords / totalWords) * 1000) / 10 : 0;
  var stops = [];

  if (lockedWords < 150 || variablePercent > 60) {
    stops.push({
      id: "thin-template",
      severity: "STOP",
      message: "This document does not have enough repeatable wording to lock safely.",
      evidence: lockedWords + " locked words; " + variablePercent + "% variable"
    });
  }
  if (fields.length < 3) {
    stops.push({
      id: "too-few-fields",
      severity: "STOP",
      message: "This document has fewer than three fields, so it is stationery rather than a useful template.",
      evidence: fields.length + " field(s)"
    });
  }

  var promiseSentences = splitSentences(lockedProse).filter(isStandingPromise);
  if (promiseSentences.length) {
    stops.push({
      id: "standing-promise",
      severity: "STOP",
      message: "Locked wording contains a promise that must be classified as standard, one-off, or removed.",
      evidence: promiseSentences.join(" | ")
    });
  }

  return {
    lockedWords: lockedWords,
    variableWords: variableWords,
    variablePercent: variablePercent,
    fieldCount: fields.length,
    stops: stops,
    pass: stops.length === 0
  };
}

function wordCount(value) {
  var words = String(value || "").trim().match(/\S+/g);
  return words ? words.length : 0;
}

/* Split into sentences, but UNWRAP soft line breaks first.

   Locked prose arrives wrapped -- pasted out of a Word document, out of a
   markdown blockquote, out of an email. A single sentence routinely occupies
   two lines, and splitting naively on every newline cuts it in half. That
   matters here because isStandingPromise() reads a whole sentence to decide
   who is promising what: "...which we" on one line and "will run at no
   additional charge within ten days" on the next are, separately, neither a
   commitment with a subject nor a subject with a commitment, and the gate
   misses a promise it exists to catch.

   Rule: a newline ENDS a sentence only when the line it ends is terminated by
   . ! ? : ; or by a list/heading marker on the NEXT line. Otherwise it is a
   soft wrap and the lines are joined with a space. Blank lines always split. */
function splitSentences(value) {
  var text = String(value || "").replace(/\r\n?/g, "\n");
  var paragraphs = text.split(/\n\s*\n+/);
  var unwrapped = paragraphs.map(function (para) {
    var lines = para.split("\n").map(function (l) { return l.trim(); }).filter(Boolean);
    var joined = "";
    lines.forEach(function (line, i) {
      if (i === 0) { joined = line; return; }
      var prevEndsSentence = /[.!?:;]["')\]]?$/.test(joined);
      var startsNewBlock = /^([-*+>#|]|\d+[.)])\s/.test(line);
      joined += (prevEndsSentence || startsNewBlock) ? "\n" : " ";
      joined += line;
    });
    return joined;
  }).join("\n");
  return unwrapped.split(/(?<=[.!?])\s+|\n+/).map(function (s) {
    return s.trim();
  }).filter(Boolean);
}

/* A locked sentence is a STANDING PROMISE only when all THREE are true, in this
   order. The rule is mechanical and is written identically in
   workflows/extract-template.md STOP condition 2b and in the RULES table at the
   bottom of this file — code and prose implement the same boolean.

     (a) COMMITMENT: the sentence carries a commitment term (a free service, a
         waiver, a discount, a guarantee, a warranty, a refund) OR a promised
         interval ("within ten days", "same day", "by close of business",
         "turnaround of", "no later than");
     (b) BUSINESS SUBJECT: the sentence is something the BUSINESS does -- it
         carries a first-person subject ("we", "our", "us", "I", "my", or the
         business voice "the firm/office/agency/company");
     (c) NOT A READER OBLIGATION: the sentence is not asking the READER to do
         something by a date. A sentence whose commitment is only an interval
         and which carries a reader-directed ask ("please return", "you must
         sign", "send us", "your payment is due") is a DEADLINE the business is
         asking the reader to meet, not a promise the business is making.
         STOP condition 2b excludes those in exactly those words.

   Why (b) and (c) exist: "Please return the signed copy no later than the date
   shown above" is the single most common sentence in this kit's own target
   document classes. Firing on it spends the refusal's credibility backwards. */
function isStandingPromise(sentence) {
  var commitmentTerm = /\b(no additional charge|no charge|free of charge|at no cost|complimentary|waive(?:d|s)?|discount|guarantee(?:d|s)?|warrant(?:y|ed|s)?|refund|credit back)\b/i;
  var promisedInterval = /\b(within\s+(?:\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+(?:hours?|days?|weeks?)|within\s+24\s+hours|same day|by close of business|turnaround of|no later than)\b/i;
  var businessSubject = /\b(we|we'll|we're|our|ours|us|i|i'll|my|the (?:firm|office|agency|company|practice|business))\b/i;
  var readerObligation = /\b(please\s+(?:return|sign|remit|send|provide|complete|submit|pay)|you\s+(?:must|need to|should|are required to|agree to)|your\s+(?:payment|signature|response|reply)\s+is\s+due|return\s+(?:the|this|your)\b[^.]*\bto us\b|is due (?:from you|upon receipt))\b/i;

  var hasCommitmentTerm = commitmentTerm.test(sentence);
  var hasInterval = promisedInterval.test(sentence);
  if (!hasCommitmentTerm && !hasInterval) { return false; }   // (a)
  if (!businessSubject.test(sentence)) { return false; }      // (b)
  // (c) an interval-only sentence aimed at the reader is a deadline, not a promise
  if (!hasCommitmentTerm && readerObligation.test(sentence)) { return false; }
  return true;
}

function runUniversalChecks(input) {
  // input = {
  //   body:            String  the finished document text (fields substituted)
  //   recipientName:   String  the client's full name as supplied this run
  //   senderName:      String  the sender business name from branding/brand.md
  //   dateFields:      { fieldName: value }  every field asked for as a date
  //   moneyFields:     { fieldName: value }  every field asked for as an amount
  //   otherClientNames:[String] names from history/ for OTHER clients
  // }
  var body = String(input.body || "");
  var out = [];
  function add(severity, id, message, evidence) {
    out.push({ id: id, severity: severity, message: message, evidence: evidence || null });
  }

  /* --- 1. No unfilled field. STOP. ------------------------------------- */
  var unfilled = body.match(/\{\{[^}]{1,80}\}\}/g);
  if (unfilled) {
    add("STOP", "unfilled-field",
      "This document still has " + unfilled.length + " blank(s) that never got filled in. " +
      "I am not sending you a document with a blank in it.",
      unfilled.join(", "));
  } else {
    add("PASS", "unfilled-field", "Every blank in the template got filled in.");
  }

  /* --- 2. No placeholder prose. STOP. ---------------------------------- */
  var placeholders = [];
  [/\bTBD\b/gi, /\bTO\s?DO\b/gi, /\bXXX+\b/g, /\blorem ipsum\b/gi,
   /\[\s*\]/g, /\bINSERT\b(?!\s+(?:the\s+)?(?:key|card|coin))/gi,
   /\bPLACEHOLDER\b/gi, /<<[^>]{1,60}>>/g].forEach(function (re) {
    var m = body.match(re);
    if (m) { placeholders = placeholders.concat(m); }
  });
  // bare "N/A" INSIDE a sentence (not on its own line in a table/list)
  var naInSentence = body.match(/[a-z,;]\s+N\/A\s+[a-z]/g);
  if (naInSentence) { placeholders = placeholders.concat(naInSentence.map(function (s) { return s.trim(); })); }
  if (placeholders.length) {
    add("STOP", "placeholder-prose",
      "There is placeholder text still in the document -- that is the kind of thing " +
      "a client notices immediately.",
      placeholders.join(" | "));
  } else {
    add("PASS", "placeholder-prose", "No placeholder text left in the document.");
  }

  /* --- 3. Every date field holds a real date. FLAG. --------------------- */
  /* A date is only a date if a stranger reading the letter next week can work
     out which day it is. Two ways that fails, and BOTH are common:
       (a) vague words -- "soon", "shortly", "when possible";
       (b) relative or bare references -- "Monday", "next week", "the 15th",
           "end of the month". These read as perfectly definite to the person
           who said them and are unresolvable to the person who receives the
           letter three days later. "Monday" is how a tradesman states a
           deadline, so this is the common case, not the edge case.
     Matched as a SUBSTRING, not as the whole value: "sometime next week if the
     rock cooperates" is the same defect as "next week". A value passes only if
     it also carries something that pins it down -- a month name, or a numeric
     date. */
  var vagueDate = /\b(soon|shortly|asap|tbd|at your convenience|when possible|in due course|end of (the )?(day|week|month)|first thing|next (week|month)|this (week|month)|a few (days|weeks)|couple of (days|weeks)|following (week|month))\b/i;
  var bareRelative = /\b(next |this |last |coming |a week from )?(mon|tues|wednes|thurs|fri|satur|sun)day\b/i;
  var hasMonth = /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s*\d/i;
  var hasNumericDate = /\b\d{1,4}[\/\-.]\d{1,2}([\/\-.]\d{1,4})?\b/;
  var badDates = [];
  Object.keys(input.dateFields || {}).forEach(function (k) {
    var v = String(input.dateFields[k] || "").trim();
    if (!v) { return; }                       // empty is caught by check 1 or the class checks
    var pinned = hasMonth.test(v) || hasNumericDate.test(v);
    if (pinned) { return; }                   // a real date is present, whatever else is said
    // "the 15th" / "the 3rd" -- a day with no month is not a date either.
    var bareDayOfMonth = /^\W*(the\s+)?\d{1,2}(st|nd|rd|th)?\W*$/i.test(v);
    if (vagueDate.test(v) || bareRelative.test(v) || bareDayOfMonth || !/\d/.test(v)) {
      badDates.push(k + ': "' + v + '"');
    }
  });
  if (badDates.length) {
    add("FLAG", "vague-date",
      "One or more dates are not dates the reader can pin down. \"Monday\" and " +
      "\"next week\" are clear to you today and unresolvable to somebody " +
      "reading this letter on Wednesday. Give me the actual day and month.",
      badDates.join("; "));
  } else {
    add("PASS", "vague-date", "Every date in the document is an actual date.");
  }

  /* --- 4. Every money field has a currency and a number. FLAG. ---------- */
  var badMoney = [];
  Object.keys(input.moneyFields || {}).forEach(function (k) {
    var v = String(input.moneyFields[k] || "").trim();
    if (!v) { return; }
    var hasNumber = /\d/.test(v);
    var hasCurrency = /[$£€]|\b(usd|dollars?|cents?)\b/i.test(v);
    if (!hasNumber || !hasCurrency) { badMoney.push(k + ': "' + v + '"'); }
  });
  if (badMoney.length) {
    add("FLAG", "vague-amount",
      "An amount is written without a clear number or currency.",
      badMoney.join("; "));
  } else {
    add("PASS", "vague-amount", "Every amount has a number and a currency.");
  }

  /* --- 5. Recipient name spelled the same everywhere. FLAG. ------------- */
  var rn = String(input.recipientName || "").trim();
  if (rn) {
    var last = surnameOf(rn);
    if (!last) {
      add("FLAG", "name-missing",
        "I could not work out the recipient's surname from the name you gave me.", rn);
    } else {
      /* Exact hits, plus NEAR MISSES. A surname typed once correctly and once
         with a letter added, dropped, or swapped is the defect this check
         exists to catch, and matching only the correct spelling can never see
         it -- the wrong copy simply is not matched. Compare every word of
         similar length instead. */
      var lastLc = last.toLowerCase();
      var words = body.match(/[A-Za-z][A-Za-z'\-]{1,}/g) || [];
      var exact = [], near = [];
      uniq(words.map(function (w) { return w.toLowerCase(); })).forEach(function (w) {
        if (w === lastLc) { exact.push(w); return; }
        if (Math.abs(w.length - lastLc.length) > 2) { return; }
        if (lastLc.length < 4) { return; }         // short names give false hits
        var d = editDistance(w, lastLc);
        if (d > 0 && d <= (lastLc.length >= 7 ? 2 : 1)) { near.push(w); }
      });
      if (near.length) {
        add("FLAG", "name-spelling",
          "The recipient's surname looks like it is spelled more than one way in " +
          "this document. Getting a client's name wrong is the one typo they " +
          "always notice.",
          last + " vs " + near.join(" / "));
      } else if (!exact.length) {
        add("FLAG", "name-missing",
          "The recipient's name does not appear in the document body.", rn);
      } else {
        add("PASS", "name-spelling", "The recipient's name is spelled the same throughout.");
      }
    }
  }

  /* --- 6. Sender identity appears once (sign-off only). FLAG. ------------ */
  var sn = String(input.senderName || "").trim();
  if (sn) {
    var senderHits = (body.match(new RegExp(escapeRe(sn), "gi")) || []).length;
    // the sign-off line legitimately carries it once; the letterhead is outside `body`
    if (senderHits === 0) {
      add("FLAG", "sender-missing",
        "Your business name is missing from the document body. The letterhead is present, " +
        "but the sign-off still needs to identify who is sending it.", sn);
    } else if (senderHits > 1) {
      add("FLAG", "sender-repeated",
        "Your business name appears " + senderHits + " times in the body. The letterhead " +
        "already carries it -- repeating it prints your name twice. If one of " +
        "those is in wording that was locked from your own document, the fix " +
        "belongs in the template, not in this letter -- say the word and I " +
        "will change it there instead.", sn);
    } else {
      add("PASS", "sender-identity", "Your business name appears once in the sign-off, where it belongs.");
    }
  }

  /* --- 7. No OTHER client's name anywhere. STOP. ------------------------ */
  var leaked = (input.otherClientNames || []).filter(function (n) {
    n = String(n || "").trim();
    if (!n || (rn && n.toLowerCase() === rn.toLowerCase())) { return false; }
    return new RegExp("\\b" + escapeRe(n) + "\\b", "i").test(body);
  });
  if (leaked.length) {
    add("STOP", "client-crosstalk",
      "Another one of your clients is named in this document. That is the one mistake " +
      "that cannot be walked back once it is sent.",
      leaked.join(", "));
  } else {
    add("PASS", "client-crosstalk", "No other client of yours is named in this document.");
  }

  return {
    results: out,
    stops: out.filter(function (r) { return r.severity === "STOP"; }),
    flags: out.filter(function (r) { return r.severity === "FLAG"; }),
    passes: out.filter(function (r) { return r.severity === "PASS"; }),
    releasable: out.every(function (r) { return r.severity !== "STOP"; })
  };
}

function escapeRe(s) { return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
function uniq(a) { return a.filter(function (v, i) { return a.indexOf(v) === i; }); }

/* Levenshtein distance, capped small. Used only to spot a surname typed two
   ways in one letter. */
function editDistance(a, b) {
  var m = a.length, n = b.length, i, j, prev = [], cur = [];
  for (j = 0; j <= n; j++) { prev[j] = j; }
  for (i = 1; i <= m; i++) {
    cur[0] = i;
    for (j = 1; j <= n; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1,
                        prev[j - 1] + (a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1));
    }
    prev = cur.slice();
  }
  return prev[n];
}

/* Professional-services recipients almost always carry a suffix or an
   honorific -- "Alanna Brizuela, Esq.", "Dr. Ronald Petrosino", "Vito Carbone,
   CPA", "Mr. Sal Fiore Jr." Taking the last whitespace-separated token as the
   surname picks up the suffix instead, and the check then verifies the
   spelling of "Esq." while a genuinely misspelled surname sails past. Law,
   accounting, insurance, and title are this kit's strongest verticals, so the
   suffix case is the COMMON case, not the edge case. Strip deterministically:
   drop everything after the first comma, drop leading honorifics, drop
   trailing suffixes, then take the last remaining word. */
function surnameOf(fullName) {
  var SUFFIXES = ["esq", "esquire", "jr", "sr", "ii", "iii", "iv", "cpa",
                  "cfp", "pe", "ra", "aia", "md", "do", "dds", "dmd", "phd",
                  "jd", "llm", "mba", "rn", "np", "pa", "lcsw", "cpcu"];
  var HONORIFICS = ["mr", "mrs", "ms", "miss", "mx", "dr", "prof", "professor",
                    "hon", "rev", "atty"];
  var s = String(fullName || "").split(",")[0];          // "Brizuela, Esq." -> "Brizuela"
  var parts = s.split(/\s+/).filter(function (w) { return w.length; });
  function bare(w) { return w.toLowerCase().replace(/[.,]/g, ""); }
  while (parts.length > 1 && HONORIFICS.indexOf(bare(parts[0])) !== -1) { parts.shift(); }
  while (parts.length > 1 && SUFFIXES.indexOf(bare(parts[parts.length - 1])) !== -1) { parts.pop(); }
  return parts.length ? parts[parts.length - 1].replace(/[.,]$/, "") : "";
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    runExtractionChecks: runExtractionChecks,
    runUniversalChecks: runUniversalChecks
  };
}

/* ---------------------------------------------------------------------------
   RULES TABLE — the no-code-execution fallback. Apply in this exact order.

   EXTRACTION
   E1 Count locked-prose words and variable words. Under 150 locked words OR
      over 60% variable -> STOP and show both numbers.
   E2 Count fields. Fewer than three -> STOP and show the count.
   E3 Split locked prose into sentences. A sentence is a STANDING PROMISE only
      when ALL THREE hold -- check them in this order and stop at the first
      that fails:
        (a) it carries a COMMITMENT TERM (no additional charge, no charge, free
            of charge, at no cost, complimentary, waive/waived, discount,
            guarantee/guaranteed, warrant/warranty, refund, credit back) OR a
            PROMISED INTERVAL ("within ten days", "within 24 hours", "same day",
            "by close of business", "turnaround of", "no later than"); AND
        (b) the sentence says what the BUSINESS does -- it contains "we", "our",
            "us", "I", "my", or "the firm/office/agency/company/practice/
            business"; AND
        (c) it is not a READER OBLIGATION. If the only thing matched in (a) was
            an interval, and the sentence asks the reader to act ("please
            return/sign/remit/send/provide/complete/submit/pay", "you must",
            "you need to", "you are required to", "your payment/signature is
            due"), it is a deadline the business is ASKING the reader to meet,
            not a promise the business is MAKING -> not a hit.
      Any sentence passing all three -> STOP and quote every hit for
      classification.
      Worked: "We will run a continuation search at no additional charge within
      ten days of closing" -> hit (commitment + "we"). "Please return the signed
      copy no later than the date shown above" -> NOT a hit (interval only, and
      the reader is being asked to act).

   FILL
   1  Search the finished body for {{ }}.  Any hit -> STOP.
   2  Search for TBD, TODO, XXX, lorem ipsum, [ ], INSERT, PLACEHOLDER, <<...>>,
      or "N/A" sitting inside a sentence.  Any hit -> STOP.
   3  For each field you asked for as a DATE, ask one question of the answer:
      could a stranger reading this letter next Wednesday work out which day
      it is?  It passes ONLY if the value carries a month name with a number
      ("November 16"), or a numeric date ("11/16/2026", "2026-11-16").
      Everything else -> FLAG, including all of:
        - "soon", "shortly", "ASAP", "at your convenience", "when possible",
          "in due course", "end of the week", "first thing";
        - a bare weekday: "Monday", "next Monday" -- the common tradesman
          answer, and unresolvable two days later;
        - a bare day of the month: "the 15th";
        - anything vague buried in a longer sentence: "sometime next week if
          the rock cooperates" is the same defect as "next week".
      Match anywhere in the value, not just as the whole value.
   4  For each field you asked for as an AMOUNT: if it has no digit, or no
      currency word/symbol -> FLAG.
   5  Work out the recipient's SURNAME first, mechanically: cut everything
      after the first comma, drop a leading honorific (Mr, Mrs, Ms, Dr, Prof,
      Hon, Rev, Atty), drop a trailing suffix (Esq, Jr, Sr, II, III, CPA, PE,
      MD, PhD, JD, RN...), then take the last word left. "Alanna Brizuela,
      Esq." -> Brizuela.  Then scan the body for that surname AND for any word
      within one or two letters of it (a letter added, dropped, or swapped).
      A near-miss found -> FLAG, and show both spellings. Surname not found at
      all -> FLAG.  Do NOT look only for the correct spelling: the misspelled
      copy is exactly the one that will not match it.
   6  Count the sender business name in the body. Zero -> FLAG because the
      sign-off is missing. More than one -> FLAG because the letterhead already
      carries it. If an extra occurrence sits inside LOCKED PROSE, say so and
      say the fix is the template, not this letter -- never ask them to edit
      wording you told them was locked.
   7  For each other client name in history/: if it appears in the body -> STOP.

   Report every rule, including the ones that passed. The customer seeing the
   full list run is the point.
--------------------------------------------------------------------------- */
