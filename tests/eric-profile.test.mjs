import assert from "node:assert/strict";
import test from "node:test";

await import("../assets/eric-profile.js");

const { ERIC_PROFILE, isEric } = globalThis.EricIdentity;

const PASSING_ATTEMPT = Object.freeze({
  firstName: "Eric",
  age: "eric-exact-age",
  reaction: "own-name",
  traits: Object.freeze(["westbank", "resembles-eric", "is-eric"]),
  oath: Object.freeze(["solemnly-swear"]),
});

function attemptWith(overrides = {}) {
  return {
    ...PASSING_ATTEMPT,
    traits: [...PASSING_ATTEMPT.traits],
    oath: [...PASSING_ATTEMPT.oath],
    ...overrides,
  };
}

function subset(values, mask) {
  return values.filter((_, index) => mask & (1 << index));
}

test("canonical profile is deeply frozen", () => {
  assert.equal(Object.isFrozen(ERIC_PROFILE), true);
  assert.equal(Object.isFrozen(ERIC_PROFILE.traits), true);
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

test("only reaction C passes", () => {
  for (const reaction of ["turn-around", "ignore", "", undefined]) {
    assert.equal(isEric(attemptWith({ reaction })), false, String(reaction));
  }
});

test("only the exact trait and oath sets pass across all 64 combinations", () => {
  const traits = ["westbank", "resembles-eric", "is-eric"];
  const oath = ["solemnly-swear", "perjury-warning", "fifth-amendment"];
  let passingCombinations = 0;

  for (let traitMask = 0; traitMask < 8; traitMask += 1) {
    for (let oathMask = 0; oathMask < 8; oathMask += 1) {
      const actual = isEric(
        attemptWith({
          traits: subset(traits, traitMask),
          oath: subset(oath, oathMask),
        }),
      );
      const expected = traitMask === 7 && oathMask === 1;
      assert.equal(actual, expected, `traits=${traitMask}, oath=${oathMask}`);
      passingCombinations += Number(actual);
    }
  }

  assert.equal(passingCombinations, 1);
});

test("rejects malformed, duplicate, and unknown set values", () => {
  const invalidAttempts = [
    attemptWith({ traits: null }),
    attemptWith({ oath: "solemnly-swear" }),
    attemptWith({ traits: [...PASSING_ATTEMPT.traits, "westbank"] }),
    attemptWith({ oath: ["solemnly-swear", "unknown"] }),
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

test("does not mutate the supplied attempt or its arrays", () => {
  const attempt = attemptWith({
    firstName: " ERIC ",
    traits: ["is-eric", "westbank", "resembles-eric"],
  });
  const snapshot = structuredClone(attempt);

  assert.equal(isEric(attempt), true);
  assert.deepEqual(attempt, snapshot);
});
