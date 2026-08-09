# Tasks: Eric Identity Quiz

**Input**: Design documents from `/specs/001-verify-eric-identity/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/ui-contract.md`, `quickstart.md`

**Tests**: Automated tests cover the pure exact-profile evaluator. Browser interaction, accessibility, responsive behavior, privacy, and birthday regression use the manual validation contract in `quickstart.md`.

**Organization**: Tasks are grouped by user story so each story can be implemented and validated as an incremental slice.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel with adjacent tasks after its stated prerequisites because it changes a different file.
- **[Story]**: Maps the task to a user story from `spec.md`.
- Every task names the exact file or validation artifact it affects.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish the planned static-site file layout without adding packages or build tooling.

- [ ] T001 Create the planned empty source and test file structure at `are-you-eric.html`, `assets/eric-quiz.css`, `assets/eric-profile.mjs`, `assets/eric-quiz.mjs`, and `tests/eric-profile.test.mjs`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Implement and verify the shared exact-profile decision boundary and common quiz styling foundation.

**CRITICAL**: User-story implementation begins only after the evaluator tests pass and the shared style foundation exists.

- [ ] T002 [P] Write failing package-free tests for normalized passing names, failing names/ages/reactions, missing or malformed values, all 64 trait/oath bitmask combinations, and evaluator immutability in `tests/eric-profile.test.mjs`
- [ ] T003 Implement the immutable Eric profile, normalization, exact set comparison, and fail-closed exported evaluator required by T002 in `assets/eric-profile.mjs`
- [ ] T004 [P] Define the local system-font stack, color tokens, box sizing, focus-visible treatment, control target sizing, and reduced-motion baseline in `assets/eric-quiz.css`

**Checkpoint**: `node --test tests/eric-profile.test.mjs` passes with no package installation, and the shared visual/accessibility primitives are ready.

---

## Phase 3: User Story 1 - Complete the Eric Identity Quiz (Priority: P1) MVP

**Goal**: A direct visitor can complete all five ordered steps, revise answers, submit once at the end, and receive exactly one basic text result.

**Independent Test**: Open `/are-you-eric.html`, verify exact prompts and choices, confirm required validation on steps 1-3, navigate backward without losing answers, submit at step 5, and confirm one result is revealed with no earlier outcome disclosure.

### Implementation for User Story 1

- [ ] T005 [P] [US1] Author the directly addressable quiz document with unique title/H1, one semantic form, five mounted step panels, exact prompts and choices, progress headings, hidden verified/rejected text regions, local asset references, and a no-script message in `are-you-eric.html`
- [ ] T006 [P] [US1] Implement the responsive quiz card, fieldsets, labels, controls, optional-step guidance, progress treatment, navigation layout, hidden-state behavior, and 320-1440 pixel/200% zoom wrapping in `assets/eric-quiz.css`
- [ ] T007 [US1] Implement current-step state, form-submit advancement for steps 1-4, non-validating Back behavior, mounted-control answer preservation, and step-heading focus management in `assets/eric-quiz.mjs`
- [ ] T008 [US1] Add trimmed-empty name, missing-age, and missing-reaction validation with persistent inline errors, `aria-describedby`, `aria-invalid`, correction clearing, and invalid-control focus in `assets/eric-quiz.mjs`
- [ ] T009 [US1] Collect the five-field QuizAttempt, call the pure evaluator only on step-5 submission, hide the form, and reveal/focus exactly one basic result region in `assets/eric-quiz.mjs`
- [ ] T010 [US1] Run the direct-page, ordered-step, required-validation, Back/Next persistence, Enter-key, empty-checkbox, refresh-reset, and no-early-outcome checks documented in `specs/001-verify-eric-identity/quickstart.md`

**Checkpoint**: User Story 1 is independently functional as the MVP, with a complete quiz and deterministic plain-text result.

---

## Phase 4: User Story 2 - Receive an Unmistakable Identity Result (Priority: P1)

**Goal**: Exact-profile submissions receive a celebratory verified result; every deviation receives the full-screen retro rejection with a working clean retry.

**Independent Test**: Submit the canonical Eric profile and representative one-field deviations; verify exact result copy, full-screen rejection, finite confetti, reduced-motion suppression, result focus, and complete reset through `Try again`.

### Implementation for User Story 2

- [ ] T011 [P] [US2] Add the decorative confetti canvas, static reduced-motion celebration, and real `Try again` button to the verified/rejected result markup in `are-you-eric.html`
- [ ] T012 [P] [US2] Style the verified celebration and scroll-safe full-viewport retro red rejection, dominant result headings, non-color cues, secondary retry control, and zoom-safe result layout in `assets/eric-quiz.css`
- [ ] T013 [P] [US2] Implement pointer-transparent finite canvas confetti with 100-150 bounded particles, capped device-pixel ratio, resize handling, frame cancellation, and an approximately three-second lifetime in `assets/eric-quiz.mjs`
- [ ] T014 [US2] Integrate result focus, reduced-motion suppression, static success fallback, animation cleanup, form reset, step-1 restoration, and retry focus behavior in `assets/eric-quiz.mjs`
- [ ] T015 [US2] Run the exact-profile, one-field-deviation, full-screen fail, retry reset, result timing, animation fallback, and reduced-motion checks documented in `specs/001-verify-eric-identity/quickstart.md`

**Checkpoint**: User Stories 1 and 2 jointly deliver the complete quiz joke and both production result experiences.

---

## Phase 5: User Story 3 - Discover the Quiz from the Main Page (Priority: P2)

**Goal**: Visitors discover a clearly new, 1990s-styled quiz promotion below the unchanged primary birthday result and can follow it to step 1.

**Independent Test**: Load the root page for birthday and non-birthday states, locate and keyboard-activate the bottom promotion, and confirm the quiz opens blank at step 1 without reducing the YES/NO result's visual priority.

### Implementation for User Story 3

- [ ] T016 [US3] Move large viewport typography ownership from `body` to `.birthday-status` and establish normal rem sizing for additional content without changing birthday calculation or copy in `index.html`
- [ ] T017 [US3] Add the normal-flow `/are-you-eric.html` promotional anchor after the birthday content with a visible `NEW!` badge, explanatory text, clear action, and assistive-technology-hidden inline icon in `index.html`
- [ ] T018 [US3] Add the CSS-only Windows 95-style bevel, inset active state, visible focus state, bounded fluid width, independent rem typography, and narrow-screen wrapping for the promotion in `index.html`
- [ ] T019 [US3] Run the root-page birthday regression, content-dominance, keyboard-link, 320-1440 pixel, and 200% zoom checks documented in `specs/001-verify-eric-identity/quickstart.md`

**Checkpoint**: All three user stories are functional, and the original novelty answer remains the main page's primary purpose.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Verify requirements that span all stories and close any discovered defects.

- [ ] T020 Audit `index.html`, `are-you-eric.html`, and `assets/` for network submission, external runtime URLs, analytics, cookies, browser storage, URL-state exposure, and prohibited persistence using the privacy procedure in `specs/001-verify-eric-identity/quickstart.md`
- [ ] T021 Validate and correct keyboard order, native labels/groups, hidden-step accessibility, heading focus, error association, duplicate IDs, WCAG AA contrast, target sizing, narrow viewports, and 200% zoom across `are-you-eric.html` and `assets/eric-quiz.css`
- [ ] T022 Run `node --test` and the complete end-to-end validation sequence in `specs/001-verify-eric-identity/quickstart.md`, resolving any remaining deviation in `index.html`, `are-you-eric.html`, `assets/`, or `tests/eric-profile.test.mjs`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 - Setup**: No dependencies.
- **Phase 2 - Foundational**: Depends on T001 and blocks every user story. T002 and T004 can run in parallel; T003 follows T002.
- **Phase 3 - User Story 1**: Depends on Phase 2. T005 and T006 can run in parallel, followed by T007-T010 in order.
- **Phase 4 - User Story 2**: Depends on User Story 1's form/result integration. T011, T012, and T013 can run in parallel, followed by T014 and T015.
- **Phase 5 - User Story 3**: Depends only on Phase 2 and can run in parallel with User Story 1; its tasks are sequential because they share `index.html`.
- **Phase 6 - Polish**: Depends on all selected user stories; T020 and T021 cover separate review dimensions but discovered fixes must be coordinated before T022.

### User Story Dependencies

```text
Setup -> Foundation -> US1 -> US2 -> Polish
                    `-> US3 -----^
```

- **User Story 1 (P1)**: Starts after Foundation and forms the suggested MVP.
- **User Story 2 (P1)**: Builds on US1's form submission and basic result regions but remains independently testable through its outcome matrix.
- **User Story 3 (P2)**: Starts after Foundation with no implementation dependency on US1 or US2; its link targets the route contract established by US1.

### Within Each User Story

- Automated evaluator tests are written before the evaluator implementation.
- Semantic document structure and styling can proceed in parallel when they affect different files.
- Interaction code follows the stable semantic structure.
- Integration precedes each story's independent validation task.
- A checkpoint must pass before dependent story work begins.

## Parallel Opportunities

### User Story 1

After Foundation, these tasks can run together:

```text
T005: Author semantic quiz markup in are-you-eric.html
T006: Implement quiz layout and form styles in assets/eric-quiz.css
```

### User Story 2

After User Story 1, these tasks can run together:

```text
T011: Add result controls and canvas in are-you-eric.html
T012: Style both result states in assets/eric-quiz.css
T013: Implement bounded confetti in assets/eric-quiz.mjs
```

### User Story 3

User Story 3 has no safe intra-story parallel tasks because T016-T018 all modify `index.html`. The whole US3 phase can run in parallel with User Story 1 after Foundation is complete.

## Implementation Strategy

### MVP First

1. Complete T001-T004 for setup and the tested shared evaluator.
2. Complete T005-T010 for User Story 1.
3. Stop and validate the five-step quiz with its deterministic basic result.

### Incremental Delivery

1. **Foundation**: Static file layout, exact-profile tests/evaluator, and shared style primitives.
2. **MVP / US1**: Direct five-step quiz with validation, navigation, persistence during the attempt, and one result.
3. **Result experience / US2**: Full retro failure, confetti success, reduced-motion behavior, focus, and retry.
4. **Discovery / US3**: Main-page promotion while preserving birthday behavior.
5. **Polish**: Privacy, accessibility, responsive, performance, and complete regression validation.

## Notes

- `[P]` marks tasks that touch different files and have no incomplete dependency.
- `[US1]`, `[US2]`, and `[US3]` provide specification traceability.
- No package manifest, dependency installation, backend, database, or build output is required.
- Commit after each completed task or coherent task group.
- Stop at any checkpoint to validate the current increment independently.
