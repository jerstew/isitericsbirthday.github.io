import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const homeHtml = await readFile(new URL("index.html", root), "utf8");
const quizHtml = await readFile(new URL("are-you-eric.html", root), "utf8");
const quizCss = await readFile(new URL("assets/eric-quiz.css", root), "utf8");
const quizJs = await readFile(new URL("assets/eric-quiz.js", root), "utf8");

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

test("homepage promotion is a compact accessible three-item row", () => {
  assert.match(homeHtml, /class="quiz-promo"[\s\S]*?aria-label="New: Take the Are You Eric identity quiz"/);
  assert.match(homeHtml, /width:\s*min\(24rem, 100%\)/);
  assert.match(homeHtml, /min-height:\s*2\.75rem/);
  assert.match(homeHtml, /margin-top:\s*clamp\(3rem, 10vh, 6rem\)/);
  assert.match(homeHtml, /class="quiz-promo-icon"/);
  assert.match(homeHtml, /class="quiz-promo-badge">NEW!<\/span>/);
  assert.match(homeHtml, /class="quiz-promo-title">ARE YOU ERIC\?<\/strong>/);
  assert.doesNotMatch(homeHtml, /quiz-promo-description|official identity quiz/);
});

test("homepage owns the dark palette without changing quiz colors", () => {
  assert.match(homeHtml, /--text-color:\s*#f2f2f2/);
  assert.match(homeHtml, /--background-color:\s*#111111/);
  assert.match(homeHtml, /--subtitle-color:\s*#d6d6d6/);
  assert.match(homeHtml, /--primary-color:\s*#e74c3c/);
  assert.match(homeHtml, /--success-color:\s*#27ae60/);
  assert.match(quizCss, /--page-bg:\s*#008080/);
  assert.match(quizCss, /--panel-bg:\s*#c0c0c0/);
});

test("quiz title bar exposes one history-aware exit control", () => {
  assert.match(
    quizHtml,
    /id="exitQuizButton"[\s\S]*?type="button"[\s\S]*?aria-label="Go back"[\s\S]*?title="Go back"[\s\S]*?>X<\/button>/,
  );
  assert.match(quizCss, /\.window-close\s*\{[\s\S]*?min-width:\s*2\.75rem[\s\S]*?min-height:\s*2\.75rem/);
  assert.match(quizCss, /\.window-titlebar\s*\{[\s\S]*?align-items:\s*center[\s\S]*?padding:\s*0\.25rem/);
  assert.match(quizCss, /\.window-title\s*\{[\s\S]*?padding-block:\s*0\.125rem[\s\S]*?line-height:\s*1\.25/);
  assert.doesNotMatch(
    quizCss,
    /@media \(max-width: 30rem\) \{[\s\S]*?\.window-titlebar\s*\{[^}]*align-items:\s*flex-start/,
  );
  assert.match(quizJs, /window\.history\.length\s*>\s*1/);
  assert.match(quizJs, /window\.history\.back\(\)/);
  assert.match(quizJs, /window\.location\.assign\("\.\/index\.html"\)/);
  assert.doesNotMatch(quizJs, /pushState|replaceState|location\.hash/);
});

test("quiz and result geometry use the compact plan caps", () => {
  assert.match(quizCss, /\.quiz-window\s*\{[\s\S]*?width:\s*min\(38rem, 100%\)/);
  assert.match(quizCss, /\.window-body\s*\{[\s\S]*?padding:\s*clamp\(1rem, 3vw, 1\.5rem\)/);
  assert.match(quizCss, /h1\s*\{[\s\S]*?font-size:\s*clamp\(1\.75rem, 6vw, 2\.75rem\)/);
  assert.match(quizCss, /\.option-row\s*\{[\s\S]*?min-height:\s*2\.75rem/);
  assert.match(quizCss, /\.optional-note\s*\{[\s\S]*?font-size:\s*1rem/);
  assert.match(quizCss, /\.result h2\s*\{[\s\S]*?font-size:\s*clamp\(2\.25rem, 11vw, 5\.5rem\)/);
});
