import assert from "node:assert/strict";
import test from "node:test";

await import("../assets/eric-profile.js");

const { ERIC_PROFILE, ERIC_STATEMENTS, isEric, sampleEricStatements } =
  globalThis.EricIdentity;

const EXPECTED_STATEMENTS = Object.freeze([
  Object.freeze({
    id: "likes-cats",
    text: "I regard cats as excellent companions.",
    answer: true,
  }),
  Object.freeze({
    id: "likes-eddie-murphy-music",
    text: "I consider Eddie Murphy a talented musician and singer.",
    answer: true,
  }),
  Object.freeze({
    id: "likes-sports-gambling",
    text: "I find sports gambling to be an enjoyable activity.",
    answer: true,
  }),
  Object.freeze({
    id: "likes-thin-crust-pizza",
    text: "I consider good thin-crust pizza one of life's great pleasures.",
    answer: true,
  }),
  Object.freeze({
    id: "rejects-malort-at-bars",
    text: "I believe Malört has no place at any bar.",
    answer: false,
  }),
  Object.freeze({
    id: "ranks-velvet-cactus-best",
    text: "I consider Velvet Cactus the best Mexican food in New Orleans.",
    answer: false,
  }),
  Object.freeze({
    id: "views-video-games-as-waste",
    text: "I regard video games as a waste of time and focus.",
    answer: false,
  }),
]);

test("canonical statement pool contains seven deeply frozen exact records", () => {
  assert.deepEqual(ERIC_STATEMENTS, EXPECTED_STATEMENTS);
  assert.equal(Object.isFrozen(ERIC_STATEMENTS), true);
  ERIC_STATEMENTS.forEach((statement) => {
    assert.equal(Object.isFrozen(statement), true);
    assert.doesNotMatch(statement.text, /\bEric\b/);
  });
});

test("sampler returns three unique pool members without mutating the pool", () => {
  const before = structuredClone(ERIC_STATEMENTS);
  const sample = sampleEricStatements(() => 0.25);

  assert.equal(sample.length, 3);
  assert.equal(new Set(sample.map(({ id }) => id)).size, 3);
  sample.forEach((statement) => {
    assert.equal(ERIC_STATEMENTS.includes(statement), true);
  });
  assert.deepEqual(ERIC_STATEMENTS, before);
});

test("sampler supports deterministic randomness and varied combinations", () => {
  const lowSample = sampleEricStatements(() => 0).map(({ id }) => id);
  const highSample = sampleEricStatements(() => 0.999999).map(({ id }) => id);

  assert.deepEqual(sampleEricStatements(() => 0).map(({ id }) => id), lowSample);
  assert.notDeepEqual(highSample, lowSample);
});

const PASSING_ATTEMPT = Object.freeze({
  firstName: "Eric",
  age: "eric-exact-age",
  reaction: "own-name",
  selectedStatementIds: Object.freeze([
    "likes-cats",
    "rejects-malort-at-bars",
    "views-video-games-as-waste",
  ]),
  preferenceAnswers: Object.freeze({
    "likes-cats": true,
    "rejects-malort-at-bars": false,
    "views-video-games-as-waste": false,
  }),
  oath: Object.freeze(["solemnly-swear"]),
});

function attemptWith(overrides = {}) {
  return {
    ...PASSING_ATTEMPT,
    selectedStatementIds: [...PASSING_ATTEMPT.selectedStatementIds],
    preferenceAnswers: { ...PASSING_ATTEMPT.preferenceAnswers },
    oath: [...PASSING_ATTEMPT.oath],
    ...overrides,
  };
}

function subset(values, mask) {
  return values.filter((_, index) => mask & (1 << index));
}

test("canonical profile is deeply frozen", () => {
  assert.equal(Object.isFrozen(ERIC_PROFILE), true);
  assert.equal(Object.isFrozen(ERIC_PROFILE.reactions), true);
  assert.equal(Object.isFrozen(ERIC_PROFILE.oath), true);
});

test("accepts supported name normalization", () => {
  for (const firstName of ["Eric", "eric", " ERIC "]) {
    assert.equal(isEric(attemptWith({ firstName })), true, firstName);
  }
});

test("rejects nonmatching names without changing internal text", () => {
  for (const firstName of ["Erik", "Eric Smith", "Er ic", "", "   "]) {
    assert.equal(isEric(attemptWith({ firstName })), false, firstName);
  }
});

test("only the distinct exact-age sentinel passes", () => {
  for (const age of ["1", "42", "119", "", undefined]) {
    assert.equal(isEric(attemptWith({ age })), false, String(age));
  }
});

test("reactions A and C pass while B and malformed values fail", () => {
  for (const reaction of ["turn-around", "own-name"]) {
    assert.equal(isEric(attemptWith({ reaction })), true, String(reaction));
  }

  for (const reaction of ["ignore", "", undefined]) {
    assert.equal(isEric(attemptWith({ reaction })), false, String(reaction));
  }
});

test("all canonical statement answers pass and every single inversion fails", () => {
  assert.equal(isEric(attemptWith()), true);

  for (const statementId of PASSING_ATTEMPT.selectedStatementIds) {
    assert.equal(
      isEric(
        attemptWith({
          preferenceAnswers: {
            ...PASSING_ATTEMPT.preferenceAnswers,
            [statementId]: !PASSING_ATTEMPT.preferenceAnswers[statementId],
          },
        }),
      ),
      false,
      statementId,
    );
  }
});

test("only the exact oath set passes across all combinations", () => {
  const oath = ["solemnly-swear", "perjury-warning", "fifth-amendment"];
  let passingCombinations = 0;

  for (let oathMask = 0; oathMask < 8; oathMask += 1) {
    const actual = isEric(attemptWith({ oath: subset(oath, oathMask) }));
    const expected = oathMask === 1;
    assert.equal(actual, expected, `oath=${oathMask}`);
    passingCombinations += Number(actual);
  }

  assert.equal(passingCombinations, 1);
});

test("rejects malformed, duplicate, mismatched, and unknown statement data", () => {
  const invalidAttempts = [
    attemptWith({ selectedStatementIds: null }),
    attemptWith({ selectedStatementIds: ["likes-cats", "likes-cats", "views-video-games-as-waste"] }),
    attemptWith({ selectedStatementIds: ["likes-cats", "views-video-games-as-waste"] }),
    attemptWith({ selectedStatementIds: ["likes-cats", "views-video-games-as-waste", "unknown"] }),
    attemptWith({ preferenceAnswers: null }),
    attemptWith({ preferenceAnswers: { "likes-cats": true } }),
    attemptWith({ preferenceAnswers: { ...PASSING_ATTEMPT.preferenceAnswers, extra: true } }),
    attemptWith({ preferenceAnswers: { ...PASSING_ATTEMPT.preferenceAnswers, "likes-cats": "true" } }),
    attemptWith({
      selectedStatementIds: [
        "likes-cats",
        "likes-sports-gambling",
        "views-video-games-as-waste",
      ],
    }),
  ];

  for (const attempt of invalidAttempts) {
    assert.equal(isEric(attempt), false);
  }
});

test("rejects missing or malformed attempts without throwing", () => {
  for (const attempt of [undefined, null, {}, [], "Eric"]) {
    assert.doesNotThrow(() => isEric(attempt));
    assert.equal(isEric(attempt), false);
  }
});

test("does not mutate the supplied attempt or its collections", () => {
  const attempt = attemptWith({
    firstName: " ERIC ",
    selectedStatementIds: [
      "views-video-games-as-waste",
      "likes-cats",
      "rejects-malort-at-bars",
    ],
  });
  const snapshot = structuredClone(attempt);

  assert.equal(isEric(attempt), true);
  assert.deepEqual(attempt, snapshot);
});
