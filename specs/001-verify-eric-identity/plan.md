# Implementation Plan: Eric Identity Quiz

**Branch**: `codex/randomized-eric-statements` | **Date**: 2026-08-16 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-verify-eric-identity/spec.md`

## Summary

Refine the existing five-step Eric identity quiz without changing its static, dependency-free GitHub Pages architecture. Step 4 replaces the fixed trait checklist with three distinct True/False statements sampled from a seven-statement preference pool for each fresh attempt. The selection and responses remain stable while navigating within an attempt, every displayed statement requires an answer, and verification compares each answer with its canonical truth value. Existing responsive geometry, title-bar exit, homepage hierarchy, privacy boundary, and full-screen outcomes remain unchanged. Semantic HTML, local CSS, ordered classic scripts, and an updated pure evaluator remain the complete runtime stack.

## Technical Context

**Language/Version**: HTML5, CSS, and standards-based JavaScript supported by current evergreen browsers; Node.js 24 for development tests

**Primary Dependencies**: Browser platform APIs only at runtime; Node built-in `node:test` and `node:assert/strict` for automated logic tests

**Storage**: N/A; answers exist only in mounted form controls and in-memory values for the active page load, including the three selected Step 4 statement identifiers

**Testing**: `node --test` for the pure profile evaluator, Step 4 sampling invariants, and static route/asset contracts; manual current-browser validation for randomized statement variety, within-attempt stability, required-answer errors, Back/fallback history behavior, keyboard use, responsive layout, contrast, reduced motion, network, and storage

**Target Platform**: Static GitHub Pages site at `isitericsbirthday.com`, supporting current desktop and mobile evergreen browsers

**Project Type**: Static website

**Performance Goals**: Result visible within 1 second of final submission; no external asset requests; confetti limited to approximately 100-150 particles and approximately 3 seconds

**Constraints**: No backend, database, build step, runtime package, external font, external script, analytics, or response persistence; usable from 320-1440 CSS pixels and at 200% text zoom; 500 CSS-pixel desktop dialog cap; mobile rules at 480 CSS pixels and below; 16 CSS-pixel minimum readable copy; 44-by-44 CSS-pixel minimum interactive targets; keyboard and assistive-technology operability; reduced-motion support; quiz-stage changes create no history entries

**Scale/Scope**: Two public pages, one existing page update, one five-step form, one seven-item statement pool with three items per attempt, one pure evaluator, two result states, and one small automated test suite

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

The ratified constitution establishes static-first delivery, accessibility, privacy, evidence-backed completion, and local-commit handoff gates.

- **Static-first gate**: PASS - the refinement uses existing HTML, CSS, and browser JavaScript with no new dependency, service, backend, or build step.
- **Accessibility gate**: PASS - the plan retains semantic controls, 44-by-44-pixel targets, 16-pixel readable text, explicit 320-1440-pixel and 200%-zoom coverage, overflow-safe mobile positioning, focus visibility, and reduced-motion behavior.
- **Privacy gate**: PASS - no persistence, analytics, response transmission, or URL state is introduced.
- **Verification gate**: PASS - automated statement-pool, evaluator, and static contracts plus browser randomization, history, responsive, keyboard, and result checks are defined.
- **Delivery gate**: PASS - completed planning and implementation changes must be reviewed and committed locally; no push occurs without an explicit user request; each handoff names one concrete next step when further work exists.
- **Post-design gate**: PASS - Phase 1 artifacts preserve every principle without a complexity exception.

## Project Structure

### Documentation (this feature)

```text
specs/001-verify-eric-identity/
|-- plan.md
|-- research.md
|-- data-model.md
|-- quickstart.md
|-- contracts/
|   `-- ui-contract.md
`-- tasks.md                 # Refreshed after planning by /speckit-tasks
```

### Source Code (repository root)

```text
index.html                   # Existing birthday page plus quiz promotion
are-you-eric.html            # Semantic five-step quiz and result regions
assets/
|-- eric-quiz.css            # Quiz, result, responsive, and reduced-motion styles
|-- eric-profile.js          # Pure Eric-profile normalization and evaluation
`-- eric-quiz.js             # Step navigation, validation, focus, results, confetti
tests/
|-- eric-profile.test.mjs    # Package-free evaluator matrix
`-- site-routing.test.mjs    # Relative routes, asset versions, and static UI contracts
CNAME
```

**Structure Decision**: Retain the existing small static-site layout. Update `are-you-eric.html` to replace the Step 4 trait controls with a statement-group mount point and associated validation message. Update `assets/eric-profile.js` with the immutable seven-statement pool, pure three-item sampling helper, and canonical truth evaluation. Update `assets/eric-quiz.js` to invoke the sampler, render native True/False groups, retain the selection for the attempt, require all three answers, and clear/resample on retry. Extend both test files for statement content, sampling invariants, and evaluation. No new runtime file, package manifest, or build output is required.

## Step 4 Preference Statement Design

### Pool and selection

- Define seven immutable statement records with stable identifiers, exact display text, and canonical boolean answers in the pure profile module.
- Select three unique records for a fresh page load or retry through a pure helper that shuffles a copied identifier list and takes the first three; never mutate or reorder the canonical pool. Accept an injectable random-number source for deterministic unit tests and default to the browser's ordinary random source at runtime.
- Store the selected identifiers in the active `QuizSession`. Back and Next reuse that selection and the mounted responses; refresh, reopen, or retry starts a fresh selection.
- Random selection is intended to provide variety, not security or guaranteed rotation. No balancing by True/False answer or history across visits is required.

### Markup, validation, and focus

- Replace the former checkbox list with a container holding three fieldsets. Each fieldset uses the statement text as its legend and contains a native radio pair labeled `True` and `False`.
- Give each statement its own radio-group name derived from the stable statement identifier so exactly one answer can be selected per statement.
- Treat Step 4 as required: submission remains on Step 4 if any group is unanswered, exposes a persistent associated error, and focuses the first unanswered group.
- Render the three groups once when a fresh attempt starts. Keeping them mounted preserves answers automatically during backward and forward navigation.

### Evaluation and reset

- Represent Step 4 responses as a mapping from the three selected statement identifiers to booleans.
- The evaluator verifies that exactly three known, distinct statement identifiers were supplied and that every submitted boolean matches the canonical pool answer. Unknown, duplicate, missing, extra, or non-boolean values fail closed.
- `Try again` clears all form values and Step 4 error state, chooses a new three-statement sample, remounts the groups, and returns focus to Step 1.
- Keep statement selection and responses transient; do not encode them in storage, the URL, analytics, or network requests.

## UI Refinement Design

### Compact quiz geometry

- Replace the stale 38rem cap with a 500 CSS-pixel maximum dialog width above the mobile breakpoint.
- Keep the desktop dialog slightly above center with asymmetric normal-flow grid rows (for example, `4fr auto 5fr`) rather than a transform; use a compact, consistent body rhythm and one shared left/right edge through the action footer.
- Set `ARE YOU ERIC?` within 28-32 CSS pixels, keep question text at least 16 CSS pixels and visually stronger than the page heading and progress, make the first-name input 40-44 CSS pixels high, and keep the right-aligned primary action 80-100 CSS pixels wide.
- Render `Step n of 5` as plain, unboxed text beneath the description and retain it as the focused step heading for keyboard and assistive-technology continuity.
- At 480 CSS pixels and below, use 16-pixel outer margins, 24-pixel body padding, the compact title-bar copy `ERIC IDENTITY VERIFICATION`, and `max(16px, 15vh)`/`max(16px, 15dvh)` top padding with document scrolling. A short-height media rule reduces the top padding to 16 pixels when the 15% position would crowd content.
- At the mobile breakpoint, implement the specified 8/20-24/24/8/24/16-pixel vertical rhythm, a 44-48-pixel first-name input, and a 48-pixel-high full-width primary action; remove redundant adjacent action borders or shadows without removing the retro button bevel.
- Above 480 CSS pixels, retain `ERIC IDENTITY VERIFICATION WIZARD`, a right-aligned non-full-width primary action, and the desktop composition. Validate both 480 and 481 CSS pixels to prevent breakpoint overlap.
- Tighten option-row padding and decorative dimensions while retaining a 2.75rem minimum selectable-row/control target and 1rem minimum question/answer text.
- Keep result regions full-screen but reduce result headings from a 7rem maximum to 5.5rem.

### Responsive markup and CSS strategy

- Provide full and compact title strings as ordinary text in the title bar and use the breakpoint to expose exactly one; hidden text must be removed from layout and the accessibility tree.
- Use component-specific declarations rather than scaling or transforming the complete window. Preserve square corners, solid colors, outset/inset borders, and restrained shadows; add no rounded cards, pills, or gradients to the quiz dialog.
- Use normal document flow and `min-height: 100dvh` so short viewports, browser chrome, text zoom, and on-screen-keyboard resizing can scroll the complete dialog instead of clipping it. Do not use fixed positioning or transforms for the quiz window.
- Interpret the 200% zoom requirement as browser zoom with the resulting layout viewport remaining at least 320 CSS pixels wide; validate 320 CSS pixels as the lower effective-width boundary rather than combining a 320 CSS-pixel layout viewport with an additional independent 200% text-only enlargement.
- Replace the existing result background gradients with solid success and failure fills so the delivered quiz contains no gradients while retaining full-screen retro outcomes.
- Extend static tests to reject the stale 38rem cap and boxed progress treatment and to require the 500-pixel cap, 30rem breakpoint, compact-title hook, mobile margins/body padding, and distinct desktop/mobile action geometry. Browser validation remains authoritative for computed layout and visual hierarchy.

### Title-bar exit behavior

- Add a real `button` at the far right of the title bar with visible X text, `aria-label="Go back"`, `title="Go back"`, and a minimum 44-by-44-pixel target.
- Activating the control calls `history.back()` when `history.length > 1`; otherwise it navigates to `./index.html`.
- Existing `currentStep` transitions continue changing only mounted form visibility and focus. They do not call `pushState`, `replaceState`, or modify the URL, so the title-bar X always exits the quiz rather than traversing quiz stages.

### Homepage hierarchy and palette

- Set a near-black neutral page background (`#111111`) with off-white primary/supporting text (`#f2f2f2`) and a lighter gray subtitle suitable for AA contrast.
- Preserve the existing red and green birthday-state colors; because the status is large text, verify each against the near-black background at the WCAG AA large-text threshold.
- Replace the multi-line 32rem promotion card with a single-row button no wider than 24rem. Retain the small icon, `NEW!` badge, and `ARE YOU ERIC?`; remove the description node.
- Keep the promotion's silver Windows treatment and a visible dark-background focus halo while reducing its icon, gaps, padding, and margin.

## Complexity Tracking

No constitution violations or complexity exceptions require justification.
