export const ERIC_PROFILE = Object.freeze({
  firstName: "eric",
  age: "eric-exact-age",
  reaction: "own-name",
  traits: Object.freeze(["westbank", "resembles-eric", "is-eric"]),
  oath: Object.freeze(["solemnly-swear"]),
});

function hasExactValues(actual, expected) {
  if (!Array.isArray(actual) || actual.length !== expected.length) {
    return false;
  }

  const uniqueValues = new Set(actual);
  return (
    uniqueValues.size === actual.length &&
    expected.every((value) => uniqueValues.has(value))
  );
}

export function isEric(attempt) {
  if (!attempt || typeof attempt !== "object" || Array.isArray(attempt)) {
    return false;
  }

  if (typeof attempt.firstName !== "string") {
    return false;
  }

  return (
    attempt.firstName.trim().toLocaleLowerCase("en-US") ===
      ERIC_PROFILE.firstName &&
    attempt.age === ERIC_PROFILE.age &&
    attempt.reaction === ERIC_PROFILE.reaction &&
    hasExactValues(attempt.traits, ERIC_PROFILE.traits) &&
    hasExactValues(attempt.oath, ERIC_PROFILE.oath)
  );
}
