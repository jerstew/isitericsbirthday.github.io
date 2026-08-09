# Implementation Plan: Eric Identity Quiz

**Branch**: `001-verify-eric-identity` | **Date**: 2026-08-09 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-verify-eric-identity/spec.md`

## Summary

Add a directly addressable five-step Eric identity quiz and a retro promotional link below the existing birthday result. The implementation remains a static, dependency-free GitHub Pages site: semantic HTML and local CSS provide the interface, ordered classic browser scripts manage transient form state and finite confetti, and a pure evaluator performs exact-profile evaluation. Node's built-in test runner verifies the evaluator; browser-based validation covers navigation, focus, responsive layout, accessibility, privacy, direct-file compatibility, and birthday-page regression.

## Technical Context

**Language/Version**: HTML5, CSS, and standards-based JavaScript supported by current evergreen browsers; Node.js 24 for development tests

**Primary Dependencies**: Browser platform APIs only at runtime; Node built-in `node:test` and `node:assert/strict` for automated logic tests

**Storage**: N/A; answers exist only in mounted form controls and in-memory values for the active page load

**Testing**: `node --test` for the pure profile evaluator; manual current-browser contract, keyboard, zoom, reduced-motion, network, and storage checks

**Target Platform**: Static GitHub Pages site at `isitericsbirthday.com`, supporting current desktop and mobile evergreen browsers

**Project Type**: Static website

**Performance Goals**: Result visible within 1 second of final submission; no external asset requests; confetti limited to approximately 100-150 particles and approximately 3 seconds

**Constraints**: No backend, database, build step, runtime package, external font, external script, analytics, or response persistence; usable from 320-1440 CSS pixels and at 200% text zoom; keyboard and assistive-technology operability; reduced-motion support

**Scale/Scope**: Two public pages, one existing page update, one five-step form, one pure evaluator, two result states, and one small automated test suite

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

The constitution file contains only unfilled template placeholders and establishes no ratified principles, constraints, or gates.

- **Pre-research gate**: PASS - no enforceable constitution rules exist.
- **Post-design gate**: PASS - the design introduces no conflict with the placeholder constitution.
- **General fit**: The plan preserves the repository's static, dependency-light architecture and does not add unnecessary services or persistence.

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
`-- eric-profile.test.mjs    # Package-free evaluator matrix
CNAME
```

**Structure Decision**: Retain a small static-site layout and separate the new page's style, interaction, and pure decision logic. The split keeps the existing page stable, makes the profile predicate testable without a DOM dependency, and requires no package manifest or build output.

## Complexity Tracking

No constitution violations or complexity exceptions require justification.
