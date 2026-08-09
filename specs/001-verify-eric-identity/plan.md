# Implementation Plan: Eric Identity Quiz

**Branch**: `001-verify-eric-identity` | **Date**: 2026-08-09 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-verify-eric-identity/spec.md`

## Summary

Refine the existing five-step Eric identity quiz without changing its static, dependency-free GitHub Pages architecture. The design delta compacts the quiz window and homepage promotion while retaining 16-pixel readable text and 44-by-44-pixel targets, adds a Windows-style title-bar X that performs browser Back with a homepage fallback, applies a near-black theme only to the homepage, and moderately reduces full-screen result headings. Semantic HTML, local CSS, ordered classic scripts, and the existing evaluator remain the complete runtime stack.

## Technical Context

**Language/Version**: HTML5, CSS, and standards-based JavaScript supported by current evergreen browsers; Node.js 24 for development tests

**Primary Dependencies**: Browser platform APIs only at runtime; Node built-in `node:test` and `node:assert/strict` for automated logic tests

**Storage**: N/A; answers exist only in mounted form controls and in-memory values for the active page load

**Testing**: `node --test` for the pure profile evaluator and static route/asset contracts; manual current-browser validation for Back/fallback history behavior, keyboard use, responsive sizing, contrast, zoom, reduced motion, network, and storage

**Target Platform**: Static GitHub Pages site at `isitericsbirthday.com`, supporting current desktop and mobile evergreen browsers

**Project Type**: Static website

**Performance Goals**: Result visible within 1 second of final submission; no external asset requests; confetti limited to approximately 100-150 particles and approximately 3 seconds

**Constraints**: No backend, database, build step, runtime package, external font, external script, analytics, or response persistence; usable from 320-1440 CSS pixels and at 200% text zoom; 16 CSS-pixel minimum readable copy; 44-by-44 CSS-pixel minimum interactive targets; keyboard and assistive-technology operability; reduced-motion support; quiz-stage changes create no history entries

**Scale/Scope**: Two public pages, one existing page update, one five-step form, one pure evaluator, two result states, and one small automated test suite

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

The ratified constitution establishes static-first delivery, accessibility, privacy, evidence-backed completion, and local-commit handoff gates.

- **Static-first gate**: PASS - the refinement uses existing HTML, CSS, and browser JavaScript with no new dependency, service, backend, or build step.
- **Accessibility gate**: PASS - the plan retains semantic controls, 44-by-44-pixel targets, 16-pixel readable text, responsive/zoom coverage, focus visibility, and reduced-motion behavior.
- **Privacy gate**: PASS - no persistence, analytics, response transmission, or URL state is introduced.
- **Verification gate**: PASS - automated contracts plus browser history, contrast, responsive, keyboard, and result checks are defined.
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
`-- tasks.md                 # Created later by /speckit-tasks
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

**Structure Decision**: Retain the existing small static-site layout. Update `index.html` for the homepage theme and promotion, `are-you-eric.html` for the title-bar control, `assets/eric-quiz.css` for compaction, and `assets/eric-quiz.js` for exit behavior. No new runtime file, package manifest, or build output is required.

## UI Refinement Design

### Compact quiz geometry

- Reduce the quiz window maximum width from 46rem to 38rem.
- Reduce outer page padding to a maximum of 1rem and window-body padding to a maximum of 1.5rem.
- Reduce the page heading to `clamp(1.75rem, 6vw, 2.75rem)` and question headings to `clamp(1rem, 3vw, 1.25rem)`.
- Tighten vertical margins and option-row padding while retaining a 2.75rem minimum row/control height and 1rem minimum question/answer text.
- Keep result regions full-screen but reduce result headings from a 7rem maximum to 5.5rem.

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
