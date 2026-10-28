"use strict";

var test = require("node:test");
var assert = require("node:assert/strict");
var checks = require("./universal-checks.js");

function words(count) {
  return Array.from({ length: count }, function (_, i) { return "word" + i; }).join(" ");
}

test("extraction refuses thin templates, too few fields, and standing promises", function () {
  var result = checks.runExtractionChecks({
    lockedProse: words(120) + ". We will provide the follow-up at no additional charge within ten days.",
    variableText: words(100),
    fields: ["client full name", "document date"]
  });

  assert.equal(result.pass, false);
  assert.deepEqual(result.stops.map(function (item) { return item.id; }).sort(), [
    "standing-promise",
    "thin-template",
    "too-few-fields"
  ]);
});

test("extraction passes a substantial repeatable document without promises", function () {
  var result = checks.runExtractionChecks({
    lockedProse: words(180),
    variableText: words(40),
    fields: ["client full name", "document date", "matter description"]
  });

  assert.equal(result.pass, true);
  assert.equal(result.stops.length, 0);
  assert.equal(result.lockedWords, 180);
  assert.equal(result.variablePercent, 18.2);
});

test("a client-facing deadline is not a standing promise", function () {
  var result = checks.runExtractionChecks({
    lockedProse: words(200) + ". Please return the signed copy no later than the date shown above.",
    variableText: words(20),
    fields: ["client full name", "document date", "matter description"]
  });

  assert.equal(result.stops.map(function (item) { return item.id; })
    .indexOf("standing-promise"), -1);
  assert.equal(result.pass, true);
});

test("a reader-facing 'within N days' obligation is not a standing promise", function () {
  var result = checks.runExtractionChecks({
    lockedProse: words(200) + ". You must send us the executed rider within ten days of receipt.",
    variableText: words(20),
    fields: ["client full name", "document date", "matter description"]
  });

  assert.equal(result.stops.map(function (item) { return item.id; })
    .indexOf("standing-promise"), -1);
  assert.equal(result.pass, true);
});

test("an interval with no subject at all is not a standing promise", function () {
  var result = checks.runExtractionChecks({
    lockedProse: words(200) + ". Recording is generally completed by close of business.",
    variableText: words(20),
    fields: ["client full name", "document date", "matter description"]
  });

  assert.equal(result.stops.map(function (item) { return item.id; })
    .indexOf("standing-promise"), -1);
});

test("a business-made commitment still stops, even inside a reader-facing sentence", function () {
  var result = checks.runExtractionChecks({
    lockedProse: words(200) + ". Please return the signed copy within ten days and we will re-issue it at no additional charge.",
    variableText: words(20),
    fields: ["client full name", "document date", "matter description"]
  });

  assert.equal(result.stops.map(function (item) { return item.id; })
    .indexOf("standing-promise") >= 0, true);
});

test("a business-made interval promise with no commitment word still stops", function () {
  var result = checks.runExtractionChecks({
    lockedProse: words(200) + ". We respond to every title question by close of business the same day.",
    variableText: words(20),
    fields: ["client full name", "document date", "matter description"]
  });

  assert.equal(result.stops.map(function (item) { return item.id; })
    .indexOf("standing-promise") >= 0, true);
});

test("the Kowalczyk sentence, the kit's own worked example, stops", function () {
  var result = checks.runExtractionChecks({
    lockedProse: words(200) + ". We will run a continuation search at no additional charge within ten days of closing.",
    variableText: words(20),
    fields: ["client full name", "document date", "matter description"]
  });

  var promise = result.stops.filter(function (item) { return item.id === "standing-promise"; });
  assert.equal(promise.length, 1);
  assert.equal(/continuation search/.test(promise[0].evidence), true);
});

test("a promise split across a soft line wrap is still caught", function () {
  var result = checks.runExtractionChecks({
    lockedProse: words(200) + ". The parcel will require a continuation search, which we\nwill run at no additional charge within ten days of closing.",
    variableText: words(20),
    fields: ["client full name", "document date", "matter description"]
  });

  var promise = result.stops.filter(function (item) { return item.id === "standing-promise"; });
  assert.equal(promise.length, 1);
  assert.equal(/which we will run at no additional charge/.test(promise[0].evidence), true);
});

test("a blank line still separates two sentences", function () {
  var result = checks.runExtractionChecks({
    lockedProse: words(200) + ". Please return the signed copy no later than the date shown above\n\nWe appreciate your attention to this matter.",
    variableText: words(20),
    fields: ["client full name", "document date", "matter description"]
  });

  assert.equal(result.stops.map(function (item) { return item.id; })
    .indexOf("standing-promise"), -1);
});

test("fill checks flag a missing sender sign-off", function () {
  var result = checks.runUniversalChecks({
    body: "Dear Jordan Rivera,\n\nThe work is scheduled for August 20, 2026.\n\nSincerely,",
    recipientName: "Jordan Rivera",
    senderName: "Coastal Grade Landscaping",
    dateFields: { "scheduled work date": "August 20, 2026" },
    moneyFields: {},
    otherClientNames: []
  });

  assert.equal(result.releasable, true);
  assert.equal(result.flags.some(function (item) { return item.id === "sender-missing"; }), true);
});

test("fill checks stop on blanks and another client name", function () {
  var result = checks.runUniversalChecks({
    body: "Dear Jordan Rivera,\n\n{{scope of work}} for Denise Kowalczyk.\n\nCoastal Grade Landscaping",
    recipientName: "Jordan Rivera",
    senderName: "Coastal Grade Landscaping",
    dateFields: {},
    moneyFields: {},
    otherClientNames: ["Denise Kowalczyk"]
  });

  assert.equal(result.releasable, false);
  assert.deepEqual(result.stops.map(function (item) { return item.id; }).sort(), [
    "client-crosstalk",
    "unfilled-field"
  ]);
});
