import assert from "node:assert/strict";
import test from "node:test";

await import("../assets/eric-profile.js");

const { ERIC_PROFILE, ERIC_STATEMENTS, isEric, sampleEricStatements } =
  globalThis.EricIdentity;

const EXPECTED_STATEMENTS = Object.freeze([
  Object.freeze({ id: "likes-cats", text: "Eric likes cats.", answer: true }),
  Object.freeze({
    id: "likes-eddie-murphy-music",
    text: "Eric likes Eddie Murphy as a musician and singer.",
    answer: true,
  }),
  Object.freeze({
    id: "likes-sports-gambling",
    text: "Eric likes gambling on sports.",
    answer: true,
  }),
  Object.freeze({
    id: "likes-thin-crust-pizza",
    text: "Eric likes good thin-crust pizza.",
    answer: true,
  }),
  Object.freeze({
    id: "likes-architecture-arguments",
    text: "Eric likes arguing about architecture.",
    answer: false,
  }),
  Object.freeze({
    id: "likes-bad-mexican-food",
    text: "Eric likes bad Mexican food.",
    answer: false,
  }),
  Object.freeze({
    id: "likes-call-of-duty",
    text: "Eric likes Call of Duty.",
    answer: false,
  }),
]);

test("canonical statement pool contains seven deeply frozen exact records", () => {
  assert.deepEqual(ERIC_STATEMENTS, EXPECTED_STATEMENTS);
  assert.equal(Object.isFrozen(ERIC_STATEMENTS), true);
  ERIC_STATEMENTS.forEach((statement) => {
    assert.equal(Object.isFrozen(statement), true);
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
    "likes-architecture-arguments",
    "likes-call-of-duty",
  ]),
  preferenceAnswers: Object.freeze({
    "likes-cats": true,
    "likes-architecture-arguments": false,
    "likes-call-of-duty": false,
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
    attemptWith({ selectedStatementIds: ["likes-cats", "likes-cats", "likes-call-of-duty"] }),
    attemptWith({ selectedStatementIds: ["likes-cats", "likes-call-of-duty"] }),
    attemptWith({ selectedStatementIds: ["likes-cats", "likes-call-of-duty", "unknown"] }),
    attemptWith({ preferenceAnswers: null }),
    attemptWith({ preferenceAnswers: { "likes-cats": true } }),
    attemptWith({ preferenceAnswers: { ...PASSING_ATTEMPT.preferenceAnswers, extra: true } }),
    attemptWith({ preferenceAnswers: { ...PASSING_ATTEMPT.preferenceAnswers, "likes-cats": "true" } }),
    attemptWith({
      selectedStatementIds: [
        "likes-cats",
        "likes-sports-gambling",
        "likes-call-of-duty",
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
      "likes-call-of-duty",
      "likes-cats",
      "likes-architecture-arguments",
    ],
  });
  const snapshot = structuredClone(attempt);

  assert.equal(isEric(attempt), true);
  assert.deepEqual(attempt, snapshot);
});
