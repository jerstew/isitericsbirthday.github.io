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

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 - Setup**: No dependencies.
- **Phase 2 - Foundational**: Depends on T001 and blocks implementation; T002 must demonstrably fail before T003-T005.
- **Phase 3 - User Story 1**: Depends on T002. T003 and T004 can run in parallel; T005 follows T004 because both modify `assets/eric-quiz.css`; T006 follows T003-T005; T007 follows T006.
- **Phase 4 - User Story 2**: Depends on T006 because T008 shares `assets/eric-quiz.css`; T009 follows T008.
- **Phase 5 - User Story 3**: Depends on T002 only and can run in parallel with Phases 3 and 4 because it changes only `index.html` if a regression exists.
- **Phase 6 - Polish**: Depends on all selected story phases; T011 and T012 can run in parallel, and T013 follows both.

### User Story Dependencies

```text
Baseline -> Failing contracts -> US1 -> US2 -> Polish
                             `-> US3 -----^
```

- **User Story 1 (P1)**: Starts after the shared failing contracts and is the suggested MVP.
- **User Story 2 (P1)**: Its CSS task follows User Story 1 to avoid concurrent edits, but its result behavior remains independently testable.
- **User Story 3 (P2)**: Has no implementation dependency on User Story 1 or 2 and can be regression-tested in parallel.

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

## Notes

- `[P]` marks tasks that affect different files or independent validation dimensions.
- `[US1]`, `[US2]`, and `[US3]` provide specification traceability.
- No dependency installation, package manifest, backend, database, remote asset, or build output is permitted.
- Existing evaluator semantics, response privacy, stage history, and homepage behavior are regression boundaries rather than redesign targets.
- Commit each completed task or coherent task group locally; never push without an explicit user request.
- Stop at any checkpoint to validate the current increment independently.
