import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const homeHtml = await readFile(new URL("index.html", root), "utf8");
const quizHtml = await readFile(new URL("are-you-eric.html", root), "utf8");

test("homepage quiz link stays within the current deployment path", () => {
  const href = homeHtml.match(/class="quiz-promo"[\s\S]*?href="([^"]+)"/)?.[1];

  assert.equal(href, "./are-you-eric.html?v=2");
  const target = new URL(href, "https://example.test/repository/index.html");
  assert.equal(target.pathname, "/repository/are-you-eric.html");
  assert.equal(target.search, "?v=2");
});

test("reached quiz exposes a classic-script first-step submit control", () => {
  assert.match(quizHtml, /id="nextButton"\s+type="submit">Next<\/button>/);
  assert.doesNotMatch(quizHtml, />\s*Send\s*</i);
  assert.match(quizHtml, /src="assets\/eric-profile\.js\?v=2"/);
  assert.match(quizHtml, /src="assets\/eric-quiz\.js\?v=2"/);
  assert.doesNotMatch(quizHtml, /type="module"/);
});
