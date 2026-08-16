# Tasks: Eric Identity Quiz Responsive Dialog Refinement

**Input**: Design documents from `/specs/001-verify-eric-identity/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/ui-contract.md`, `quickstart.md`

**Tests**: Automated static contracts are required before implementation because the specification and constitution require measurable responsive verification. Rendered geometry, keyboard, accessibility, privacy, and visual hierarchy use the browser procedures in `quickstart.md`.

**Organization**: This is a delta task list for the clarified UI contract. Previously completed quiz behavior remains the baseline; every unchecked task below addresses newly specified work or protects an existing user story from regression.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel after its prerequisites because it changes a different file or performs an independent validation track.
- **[Story]**: Maps the task to a user story from `spec.md`.
- Every task names the exact file or validation artifact it affects.

## Phase 1: Setup (Baseline Confirmation)

**Purpose**: Confirm the current static implementation and test suite before replacing stale 38rem contracts.

- [X] T001 Run `node --test`, inspect the current 38rem dialog, title wrapping, progress badge, footer geometry, and result gradients, and confirm the baseline drift documented by `specs/001-verify-eric-identity/plan.md` against `tests/site-routing.test.mjs`, `are-you-eric.html`, and `assets/eric-quiz.css`

**Checkpoint**: Existing automated tests pass before revision, and the clarified-contract gaps are reproducible.

---

## Phase 2: Foundational (Failing Responsive Contracts)

**Purpose**: Encode shared static requirements before changing markup or styles.

**CRITICAL**: T002 must fail against the current implementation before any user-story implementation task begins.

- [X] T002 Add and run failing static contracts in `tests/site-routing.test.mjs` that reject the stale 38rem cap and result gradients and require the 500px dialog cap, 30rem breakpoint, full/compact title hooks, one-line compact title rule, plain unboxed progress, normal-flow desktop/mobile positioning, 16px mobile outer margins, 24px mobile body padding, desktop/mobile input and primary-action geometry, one footer divider, and absence of whole-window scaling or rounded/pill styling

**Checkpoint**: The revised static contract suite fails only because the clarified UI has not yet been implemented.

---

## Phase 3: User Story 1 - Complete the Eric Identity Quiz (Priority: P1) MVP

**Goal**: The existing five-step quiz remains fully operable while adopting the compact desktop dialog, explicit mobile composition, quieter progress treatment, aligned footer, and responsive title copy.

**Independent Test**: Open `are-you-eric.html`, complete and reverse through all five steps at 320, 375, 390, 480, 481, 768, and 1440 effective CSS pixels, and verify answer preservation, validation, one-line responsive title copy, exact layout boundaries, reachable actions, and no early result disclosure.

### Implementation for User Story 1

- [X] T003 [P] [US1] Add mutually exclusive full and compact title text nodes to `are-you-eric.html` so CSS exposes only `ERIC IDENTITY VERIFICATION WIZARD` above 480px and only `ERIC IDENTITY VERIFICATION` at or below 480px while retaining the existing 44-by-44px `Go back` control and per-step progress headings
- [X] T004 [P] [US1] Replace the stale centered 38rem layout in `assets/eric-quiz.css` with a 500px desktop maximum, asymmetric normal-flow above-center placement, shared body/footer edges, 28-32px page heading, visually dominant question text, plain progress text, 40-44px first-name input, one-divider footer, and an 80-100px right-aligned primary action while preserving 16px readable copy and 44px targets
- [X] T005 [US1] Implement the `max-width: 30rem` mobile branch and short-height fallback in `assets/eric-quiz.css` with 16px outer margins, 24px body padding, `max(16px, 15vh)` plus dynamic-viewport positioning, scroll-safe normal flow, the required 8/20-24/24/8/24/16px rhythm, a 44-48px first-name input, a 48px full-width primary action, nonwrapping compact title, and reduced adjacent footer/button decoration without removing the retro bevel
- [X] T006 [US1] Run the revised `tests/site-routing.test.mjs` contracts and correct `are-you-eric.html` and `assets/eric-quiz.css` until all User Story 1 static checks pass without changing quiz state, validation, history, persistence, or evaluator behavior
- [X] T007 [US1] Execute every-step keyboard, Back/Next persistence, required-validation, title-bar exit, computed-style, bounding-rectangle, 480/481 breakpoint, short-height, on-screen-keyboard, 200%-zoom, and overflow scenario in `specs/001-verify-eric-identity/quickstart.md`, correcting deviations in `are-you-eric.html`, `assets/eric-quiz.css`, or `assets/eric-quiz.js`

**Checkpoint**: User Story 1 remains independently functional and satisfies FR-024 and FR-026 through FR-032 across the complete responsive matrix.

---

## Phase 4: User Story 2 - Receive an Unmistakable Identity Result (Priority: P1)

**Goal**: Verified and rejected outcomes remain full-screen, accessible, and visually dominant while using the clarified solid-color retro treatment.

**Independent Test**: Submit both accepted profiles and representative one-field deviations, then verify exact result copy, solid success/failure backgrounds, 5.5rem maximum headings, finite or suppressed confetti as appropriate, result focus, scroll safety, and complete retry reset.

### Implementation for User Story 2

- [X] T008 [US2] Remove radial, linear, and repeating gradient declarations from the verified and rejected result backgrounds in `assets/eric-quiz.css` while preserving solid success/failure colors, square geometry, symbols, text shadows, full-viewport coverage, 5.5rem heading maximum, and the secondary `Try again` control
- [X] T009 [US2] Run accepted-profile A/C, rejected-profile B/deviation, reduced-motion, result-focus, one-second visibility, full-screen overflow, and retry-reset checks from `specs/001-verify-eric-identity/quickstart.md`, correcting result-only deviations in `assets/eric-quiz.css`, `assets/eric-quiz.js`, or `are-you-eric.html`

**Checkpoint**: User Story 2 remains independently testable and both result paths comply with the solid-color retro contract.

---

## Phase 5: User Story 3 - Discover the Quiz from the Main Page (Priority: P2)

**Goal**: The existing compact promotion and dark homepage remain unchanged and continue to lead to the revised quiz without losing birthday-result priority.

**Independent Test**: Load `index.html` in birthday and non-birthday states, keyboard-activate the single-row promotion, and confirm the correct blank quiz opens while homepage hierarchy, contrast, and responsive behavior remain intact.

### Regression Validation for User Story 3

- [X] T010 [P] [US3] Run the homepage routing, single-row promotion, accessible invitation, dark-palette, red/green contrast, birthday-result dominance, keyboard focus, 320-1440px, and 200%-zoom regression checks in `tests/site-routing.test.mjs` and `specs/001-verify-eric-identity/quickstart.md`, correcting any regression in `index.html`

**Checkpoint**: User Story 3 remains independently functional and visually subordinate to the birthday answer.

---

## Phase 6: Polish & Cross-Cutting Validation

**Purpose**: Prove the combined implementation satisfies automated, accessibility, privacy, and responsive completion gates.

- [X] T011 [P] Audit `index.html`, `are-you-eric.html`, and `assets/` with the privacy procedure in `specs/001-verify-eric-identity/quickstart.md` for external runtime URLs, submission, analytics, cookies, storage, URL state, and response retention
- [X] T012 [P] Audit `are-you-eric.html` and `assets/eric-quiz.css` against `specs/001-verify-eric-identity/contracts/ui-contract.md` for semantic controls, focus order, labels/groups, inactive-step exclusion, 44px targets, visible focus, WCAG AA contrast, reduced motion, title accessibility, square corners, solid fills, and absence of rounded cards, pill buttons, gradients, or proportional scaling
- [X] T013 Run `node --test` and the complete browser validation sequence in `specs/001-verify-eric-identity/quickstart.md`, resolve every remaining deviation in `index.html`, `are-you-eric.html`, `assets/`, or `tests/site-routing.test.mjs`, and mark T001-T013 complete in `specs/001-verify-eric-identity/tasks.md` only after evidence is recorded in the implementation completion report

---

## Phase 7: User Story 1 Delta - Answer Random Eric Preference Statements (Priority: P1) MVP

**Goal**: Replace the completed fixed trait checklist with three distinct, randomly sampled Eric preference statements that each require an explicit True/False response and remain stable while navigating within the attempt.

**Independent Test**: Start repeated fresh attempts, confirm Step 4 always contains three unique members of the seven-statement pool, verify more than one combination occurs, reject incomplete Step 4 responses with focus on the first unanswered group, and confirm Back/Next preserves the selected statements and answers.

### Tests for User Story 1 Delta

- [X] T014 [P] [US1] Add failing pool and sampler tests to `tests/eric-profile.test.mjs` covering all seven exact records, canonical truth values, three-item length, pool membership, uniqueness, deterministic injected randomness, repeated-sample variety, and canonical-pool immutability
- [X] T015 [P] [US1] Add failing static Step 4 contracts to `tests/site-routing.test.mjs` that reject the legacy trait checkboxes and require a statement mount point, associated validation message, and accessible True/False group hooks in `are-you-eric.html` and `assets/eric-quiz.js`

### Implementation for User Story 1 Delta

- [X] T016 [US1] Define the immutable seven-record Eric statement pool and pure injectable-random three-of-seven sampler in `assets/eric-profile.js` without mutating canonical records
- [X] T017 [P] [US1] Replace the legacy Step 4 trait checkbox markup in `are-you-eric.html` with the statement-group mount point, instructions, and persistent validation region defined by `specs/001-verify-eric-identity/contracts/ui-contract.md`
- [X] T018 [US1] Render each sampled statement as a mounted fieldset with its statement legend and native True/False radio pair in `assets/eric-quiz.js`, retain selected IDs and responses through Back/Next, and block advancement while focusing the first unanswered group
- [X] T019 [US1] Style the three Step 4 statement fieldsets, legends, True/False option rows, validation state, keyboard focus, wrapping, and 44px targets across desktop and mobile in `assets/eric-quiz.css` without changing the established dialog geometry or retro visual contract
- [X] T020 [US1] Run `tests/eric-profile.test.mjs`, `tests/site-routing.test.mjs`, and the Step 4 variation, required-answer, keyboard, accessibility-tree, persistence, responsive, and overflow scenarios in `specs/001-verify-eric-identity/quickstart.md`, correcting User Story 1 deviations in `assets/eric-profile.js`, `assets/eric-quiz.js`, `assets/eric-quiz.css`, or `are-you-eric.html`

**Checkpoint**: User Story 1 independently presents, validates, and preserves three randomized Eric statements without disclosing an identity result.

---

## Phase 8: User Story 2 Delta - Evaluate Preference Answers and Retry (Priority: P1)

**Goal**: Verify identity only when all three displayed Step 4 answers match their canonical truth values, fail closed for malformed statement data, and create a clean fresh sample after rejection and retry.

**Independent Test**: For every statement, submit an otherwise-passing profile with the canonical answer and with the answer inverted; confirm canonical combinations remain eligible to pass, every inversion fails, malformed maps fail without exceptions, and `Try again` clears answers and creates a fresh valid sample.

### Tests for User Story 2 Delta

- [X] T021 [US2] Replace legacy trait-set evaluator cases in `tests/eric-profile.test.mjs` with failing tests for correct three-statement maps, every single-answer inversion, unknown/duplicate/missing/extra/non-boolean data, A/C acceptance, B rejection, oath exactness, and evaluator input immutability

### Implementation for User Story 2 Delta

- [X] T022 [US2] Replace exact trait-set comparison with canonical three-statement response-map validation in `assets/eric-profile.js` and collect the selected statement IDs plus explicit booleans into the submitted attempt in `assets/eric-quiz.js`
- [X] T023 [US2] Update `Try again` handling in `assets/eric-quiz.js` to clear Step 4 controls and errors, discard the prior selected IDs, obtain and mount a fresh valid three-statement sample, and preserve existing result reset and Step 1 focus behavior
- [X] T024 [US2] Run the accepted A/C, rejected B, canonical/inverted statement, malformed evaluator input, result-focus, one-second result, reduced-motion, and retry scenarios in `tests/eric-profile.test.mjs` and `specs/001-verify-eric-identity/quickstart.md`, correcting User Story 2 deviations in `assets/eric-profile.js` or `assets/eric-quiz.js`

**Checkpoint**: User Story 2 independently produces the correct result for every canonical or inverted Step 4 statement and resets into a valid fresh attempt.

---

## Phase 9: Step 4 Cross-Cutting Validation

**Purpose**: Prove the additive Step 4 implementation preserves the completed responsive, accessibility, privacy, history, homepage, and result behavior from T001-T013.

- [X] T025 [P] Audit `are-you-eric.html`, `assets/eric-profile.js`, `assets/eric-quiz.js`, and `assets/eric-quiz.css` against `specs/001-verify-eric-identity/contracts/ui-contract.md` for native group semantics, exact copy, unique IDs/names, focus order, 44px targets, 320-1440px layout, 200% zoom, reduced motion, transient state, zero network/storage/URL exposure, and unchanged browser-history behavior
- [X] T026 Run `node --test` and the complete updated sequence in `specs/001-verify-eric-identity/quickstart.md`, resolve every remaining Step 4 or regression deviation in `are-you-eric.html`, `assets/`, or `tests/`, and mark only T014-T026 complete in `specs/001-verify-eric-identity/tasks.md` after implementation evidence is recorded

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 - Setup**: No dependencies.
- **Phase 2 - Foundational**: Depends on T001 and blocks implementation; T002 must demonstrably fail before T003-T005.
- **Phase 3 - User Story 1**: Depends on T002. T003 and T004 can run in parallel; T005 follows T004 because both modify `assets/eric-quiz.css`; T006 follows T003-T005; T007 follows T006.
- **Phase 4 - User Story 2**: Depends on T006 because T008 shares `assets/eric-quiz.css`; T009 follows T008.
- **Phase 5 - User Story 3**: Depends on T002 only and can run in parallel with Phases 3 and 4 because it changes only `index.html` if a regression exists.
- **Phase 6 - Polish**: Depends on all selected story phases; T011 and T012 can run in parallel, and T013 follows both.
- **Phase 7 - User Story 1 Delta**: Begins from the completed T001-T013 baseline. T014 and T015 can run in parallel and must fail before implementation; T016 follows T014, T017 follows T015, T018 follows T016 and T017, T019 follows T017 and T018, and T020 follows T014-T019.
- **Phase 8 - User Story 2 Delta**: Depends on the Step 4 attempt model completed by T020. T021 must fail before T022; T023 follows T022; T024 follows T021-T023.
- **Phase 9 - Step 4 Cross-Cutting Validation**: Depends on T020 and T024. T025 performs the independent audit, and T026 follows all T014-T025 work.

### User Story Dependencies

```text
Baseline -> Failing contracts -> US1 -> US2 -> Polish
                             `-> US3 -----^
```

- **User Story 1 (P1)**: Starts after the shared failing contracts and is the suggested MVP.
- **User Story 2 (P1)**: Its CSS task follows User Story 1 to avoid concurrent edits, but its result behavior remains independently testable.
- **User Story 3 (P2)**: Has no implementation dependency on User Story 1 or 2 and can be regression-tested in parallel.
- **User Story 1 Step 4 delta (P1)**: T014-T020 replace the old Step 4 interaction while preserving the completed responsive quiz shell.
- **User Story 2 Step 4 delta (P1)**: T021-T024 depend on User Story 1's selected-statement model but remain independently result-testable through supplied attempts.

### Within Each User Story

- Static contracts must be written and observed failing before implementation.
- Markup and desktop CSS may proceed in parallel because they affect different files.
- Mobile CSS follows the desktop CSS baseline in the same stylesheet.
- Automated contracts pass before browser validation begins.
- Story-specific checkpoints pass before dependent work proceeds.

## Parallel Opportunities

### User Story 1

After T002 fails as expected, these tasks can run together:

```text
T003: Add responsive title markup in are-you-eric.html
T004: Implement desktop hierarchy and geometry in assets/eric-quiz.css
```

### User Story 3 and Cross-Cutting Reviews

```text
T010: Validate the existing homepage independently while US1/US2 work proceeds
T011: Run the privacy audit after story implementation
T012: Run the accessibility and visual-contract audit after story implementation
```

### Step 4 Delta

After the completed T001-T013 baseline, these failing-test tracks can run together:

```text
T014: Add statement pool and sampler tests in tests/eric-profile.test.mjs
T015: Add Step 4 static UI contracts in tests/site-routing.test.mjs
```

After both contracts fail as expected, these different-file implementation tasks can begin independently:

```text
T016: Implement the canonical pool and sampler in assets/eric-profile.js
T017: Replace Step 4 markup in are-you-eric.html
```

## Implementation Strategy

### MVP First

1. Complete T001-T002 to establish a tested baseline and failing clarified contracts.
2. Complete T003-T007 for User Story 1.
3. Stop and validate the five-step responsive dialog independently.

### Incremental Delivery

1. **Contract baseline**: Preserve passing legacy behavior and add failing revised UI contracts.
2. **MVP / US1**: Implement title, hierarchy, geometry, footer, mobile placement, and responsive validation.
3. **Result refinement / US2**: Remove gradients while preserving both outcome flows.
4. **Discovery regression / US3**: Reconfirm homepage promotion, palette, and routing.
5. **Polish**: Complete privacy, accessibility, automated, and browser evidence gates.

### Additive Step 4 Delivery

1. Preserve T001-T013 as the completed responsive-dialog baseline.
2. Complete T014-T015 and observe both new contract tracks fail against the legacy trait checklist.
3. Complete T016-T020 to deliver and independently validate randomized Step 4 presentation and required responses.
4. Complete T021-T024 to deliver canonical answer evaluation and fresh retry behavior.
5. Complete T025-T026 to prove the new interaction does not regress any completed user story or constitutional boundary.

## Notes

- `[P]` marks tasks that affect different files or independent validation dimensions.
- `[US1]`, `[US2]`, and `[US3]` provide specification traceability.
- No dependency installation, package manifest, backend, database, remote asset, or build output is permitted.
- Existing evaluator semantics, response privacy, stage history, and homepage behavior are regression boundaries rather than redesign targets.
- For the additive T014-T026 delta only, the legacy trait portion of the evaluator and Step 4 interaction is the explicit replacement target; name, age, reaction, oath, response-privacy, stage-history, homepage, and result semantics remain regression boundaries.
- Commit each completed task or coherent task group locally; never push without an explicit user request.
- Stop at any checkpoint to validate the current increment independently.
