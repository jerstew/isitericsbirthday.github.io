(function exposeEricIdentity(global) {
  "use strict";

  const ERIC_STATEMENTS = Object.freeze([
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

  const ERIC_PROFILE = Object.freeze({
    firstName: "eric",
    age: "eric-exact-age",
    reactions: Object.freeze(["turn-around", "own-name"]),
    oath: Object.freeze(["solemnly-swear"]),
  });

  const STATEMENT_BY_ID = new Map(
    ERIC_STATEMENTS.map((statement) => [statement.id, statement]),
  );

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

  function sampleEricStatements(random = Math.random) {
    const shuffled = [...ERIC_STATEMENTS];

    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(random() * (index + 1));
      [shuffled[index], shuffled[swapIndex]] = [
        shuffled[swapIndex],
        shuffled[index],
      ];
    }

    return shuffled.slice(0, 3);
  }

  function hasCorrectPreferenceAnswers(selectedStatementIds, answers) {
    if (
      !Array.isArray(selectedStatementIds) ||
      selectedStatementIds.length !== 3 ||
      !answers ||
      typeof answers !== "object" ||
      Array.isArray(answers)
    ) {
      return false;
    }

    const uniqueIds = new Set(selectedStatementIds);
    const answerIds = Object.keys(answers);
    if (
      uniqueIds.size !== selectedStatementIds.length ||
      answerIds.length !== selectedStatementIds.length ||
      answerIds.some((id) => !uniqueIds.has(id))
    ) {
      return false;
    }

    return selectedStatementIds.every((id) => {
      const statement = STATEMENT_BY_ID.get(id);
      return (
        statement &&
        typeof answers[id] === "boolean" &&
        answers[id] === statement.answer
      );
    });
  }

  function isEric(attempt) {
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
      ERIC_PROFILE.reactions.includes(attempt.reaction) &&
      hasCorrectPreferenceAnswers(
        attempt.selectedStatementIds,
        attempt.preferenceAnswers,
      ) &&
      hasExactValues(attempt.oath, ERIC_PROFILE.oath)
    );
  }

  global.EricIdentity = Object.freeze({
    ERIC_PROFILE,
    ERIC_STATEMENTS,
    isEric,
    sampleEricStatements,
  });
})(globalThis);
