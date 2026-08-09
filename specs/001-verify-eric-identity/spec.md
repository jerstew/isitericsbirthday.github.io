# Feature Specification: Eric Identity Quiz

**Feature Branch**: `main` (no branch-creation hook configured)

**Created**: 2026-08-09

**Status**: Draft

**Input**: User description: "Add a new page to the existing novelty microsite with a satirical, multi-step quiz that determines whether the visitor is Eric, presents distinct pass and fail outcomes, and is promoted from the main page with a 1990s-style callout."

## Clarifications

### Session 2026-08-09

- Q: How should the quiz title-bar X navigate? → A: Navigate back one browser-history entry, falling back to the homepage when none exists; quiz stages must never create history entries, and stage reversal remains exclusive to the form's Back button.
- Q: How should the quiz and homepage promotion become more compact without sacrificing accessibility? → A: Reduce container dimensions, padding, gaps, display headings, icons, and other decorative elements while preserving body text at 16px or larger and interactive targets at 44×44px or larger.
- Q: What content should remain in the compact homepage quiz promotion? → A: Use one Windows-style row containing a small icon, the `NEW!` badge, and `ARE YOU ERIC?`; remove the separate description line while retaining an accessible invitation to take the quiz.
- Q: What dark palette should the homepage use? → A: Use a near-black neutral background with high-contrast off-white supporting text, preserve the existing red/green birthday-status colors, and leave the quiz page theme unchanged.
- Q: Should compact sizing apply to the result screens? → A: Keep both outcomes full-screen, but moderately reduce their result-heading sizes along with compacting the quiz window and form.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Complete the Eric identity quiz (Priority: P1)

A visitor opens the quiz, answers five identity questions one step at a time, and submits the completed response to find out whether the response exactly matches Eric's profile.

**Why this priority**: The quiz and its satirical identity-verification result are the feature's primary user value.

**Independent Test**: Open the quiz directly, complete all five steps with a defined response set, submit it, and verify that exactly one clear result is displayed.

**Acceptance Scenarios**:

1. **Given** a visitor has opened a new quiz, **When** the visitor completes the steps in order, **Then** the quiz presents the first-name input, age selector, public-reaction options, trait checklist, and sworn-statement checklist with the specified wording and choices.
2. **Given** a visitor is on a step with a required single-value answer, **When** the visitor attempts to continue without answering it, **Then** the visitor remains on that step and receives a clear prompt to provide an answer.
3. **Given** a visitor has moved beyond the first step, **When** the visitor goes back to an earlier step, **Then** all answers already entered during the current attempt remain available for review or change.
4. **Given** a visitor has reached the final step, **When** the visitor submits the attempt, **Then** all five responses are evaluated together and no outcome is disclosed before submission.
5. **Given** a visitor is on any quiz step, **When** the visitor activates the title-bar X, **Then** the browser returns to the prior page or opens the homepage when no prior history entry exists.
6. **Given** the quiz is viewed on a phone-sized screen, **When** any step is displayed, **Then** the window, whitespace, headings, and decorative elements use a compact layout while question and answer text remains at least 16px and every interactive target remains at least 44×44px.

---

### User Story 2 - Receive an unmistakable identity result (Priority: P1)

A visitor receives either an emphatic rejection or a celebratory verification based on whether every answer matches one of the two accepted Eric profiles, which differ only in the public-reaction answer.

**Why this priority**: The contrasting result states deliver the joke and provide a definitive end to the quiz.

**Independent Test**: Submit both accepted-profile responses and several responses that differ in a disqualifying field; verify that reactions A and C pass while reaction B and every other deviation fail.

**Acceptance Scenarios**:

1. **Given** the submitted first name is `Eric` after ignoring capitalization and surrounding whitespace, the selected age is `Eric's Exact Age`, reaction A or C is selected, all three traits are selected, and only `I SOLEMNLY SWEAR` is selected in the final checklist, **When** the visitor submits, **Then** confetti appears with `IDENTITY VERIFIED: WELCOME, ERIC.`
2. **Given** reaction B is selected or any other submitted answer differs from the accepted criteria, **When** the visitor submits, **Then** a full-screen retro red result displays `YOU ARE NOT ERIC.` and a secondary `Try again` control.
3. **Given** the fail result is visible, **When** the visitor activates `Try again`, **Then** a fresh, unanswered attempt begins at the first step.
4. **Given** the visitor has requested reduced motion, **When** the passing result appears, **Then** the verification message remains complete and celebratory without motion-dependent confetti.
5. **Given** either result is displayed, **When** it fills the viewport, **Then** its moderately reduced heading remains the dominant content and the outcome remains unmistakable.

---

### User Story 3 - Discover the new quiz from the main page (Priority: P2)

A visitor viewing the existing birthday answer can discover and open the Eric identity quiz from a clearly labeled promotional element at the bottom of the main page.

**Why this priority**: The quiz must be discoverable without displacing or confusing the microsite's existing YES/NO purpose.

**Independent Test**: Load the main page, locate the promotional element below the existing content, activate it, and verify that the quiz opens at its first step.

**Acceptance Scenarios**:

1. **Given** the main page has displayed its existing birthday answer, **When** the visitor reaches the bottom of the page, **Then** a compact single-row beveled 1990s-style button marks the identity quiz as a new feature with a small icon, `NEW!` badge, and `ARE YOU ERIC?` label while remaining subordinate to the YES/NO answer.
2. **Given** the promotional element is visible, **When** the visitor activates its link, **Then** the new quiz page opens at step 1.
3. **Given** the promotional element has been added, **When** the main page is loaded on Eric's birthday or any other day, **Then** the existing YES/NO answer remains the primary content and retains its existing meaning.
4. **Given** the main page is loaded, **When** its birthday result and supporting content render, **Then** a near-black neutral background and high-contrast off-white supporting text are used while the existing red/green birthday-status colors retain their meaning.

### Edge Cases

- A first name with different capitalization or surrounding whitespace, such as ` eric `, is treated as `Eric`; internal characters or additional names do not match.
- Numeric age choices from 1 through 119 never substitute for the distinct `Eric's Exact Age` choice, even if one number happens to equal Eric's current age.
- Selecting extra answers in either checkbox list is a profile deviation; a passing attempt requires the exact checkbox combination, not merely inclusion of the correct item.
- Selecting no traits or no sworn statement is allowed as a response but produces the fail outcome upon submission.
- Repeated forward and backward navigation does not duplicate answers or change selections.
- Moving between quiz stages never adds or replaces browser-history entries; browser Back and the title-bar X therefore leave the quiz rather than navigating between stages.
- Refreshing or reopening the quiz starts a new attempt; unfinished and completed attempts are not recovered.
- If animation is unavailable or suppressed, the pass message still communicates the complete result.
- Long translated browser-generated validation text, text zoom, narrow screens, and keyboard-only navigation do not conceal questions or navigation controls.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The main page MUST retain its existing birthday-answer behavior and provide a link to the identity quiz at the bottom of its content.
- **FR-002**: The quiz promotion MUST appear as a compact, single-row beveled button with a 1990s visual character, a small icon, a visible `NEW!` badge, and the visible label `ARE YOU ERIC?`. It MUST omit the separate description line, retain a clear accessible invitation to take the quiz, and remain visually subordinate to the birthday answer.
- **FR-003**: The quiz MUST be available as a distinct page that can be opened directly as well as from the main page.
- **FR-004**: The quiz MUST present five ordered steps and make the visitor's current position in the sequence apparent.
- **FR-005**: Step 1 MUST display the prompt `Enter your first name.` and accept a text response.
- **FR-006**: Step 2 MUST display the prompt `Select your current age.` and offer every integer from 1 through 119 plus a distinct `Eric's Exact Age` option.
- **FR-007**: Step 3 MUST display `When someone calls out 'Hey Eric!' in public, what is your reaction?` and offer exactly one selection among: `A) I turn around.`, `B) I ignore it (I am not Eric).`, and `C) I wonder why someone is calling me by my name.`
- **FR-008**: Step 4 MUST display `Select all traits that apply to you:` and allow any combination of: `Lives on the Westbank.`, `Resembles Eric.`, and `Is Eric.`
- **FR-009**: Step 5 MUST display `Under penalty of perjury, do you solemnly swear (or affirm) that you are, in fact, the individual legally and physically recognized as Eric?` and allow any combination of: `I SOLEMNLY SWEAR: I am Eric.`, `PERJURY WARNING: I am not Eric, but I am attempting to impersonate Eric.`, and `FIFTH AMENDMENT: I decline to answer on the grounds that I may not be Eric.` The lead-in labels MUST retain their specified emphasis.
- **FR-010**: The quiz MUST prevent forward movement when the first-name, age, or reaction step lacks an answer and MUST identify the unanswered prompt without discarding entered responses.
- **FR-011**: The visitor MUST be able to move backward before submission and revise prior answers without losing other answers from the current attempt.
- **FR-012**: The quiz MUST evaluate the complete response only when the visitor submits the final step.
- **FR-013**: The passing profiles MUST be: first name equal to `Eric` after case-insensitive comparison and removal of surrounding whitespace; age equal to the distinct `Eric's Exact Age` option; reaction A or C; all three traits selected; and only `I SOLEMNLY SWEAR: I am Eric.` selected in the sworn-statement checklist.
- **FR-014**: Any response that does not match one of the two passing profiles MUST produce the fail outcome.
- **FR-015**: The fail outcome MUST cover the available viewing area with a retro red banner, display `YOU ARE NOT ERIC.` as the dominant content, and include a secondary `Try again` control.
- **FR-016**: Activating `Try again` MUST clear every response and return the visitor to step 1.
- **FR-017**: The pass outcome MUST display `IDENTITY VERIFIED: WELCOME, ERIC.` as the dominant content and trigger a confetti celebration.
- **FR-018**: The pass and fail outcomes MUST be understandable without relying solely on color, animation, or sound.
- **FR-019**: All questions, choices, navigation controls, promotional content, and outcomes MUST remain operable by keyboard and readable with assistive technology.
- **FR-020**: The experience MUST honor the visitor's reduced-motion preference by suppressing or substantially reducing confetti movement while preserving the pass outcome.
- **FR-021**: Quiz responses and results MUST remain limited to the current page session and MUST NOT be retained, transmitted, or exposed in the page address.
- **FR-022**: The quiz and its promotion MUST remain usable without horizontal scrolling at viewport widths from 320 through 1440 pixels and at up to 200% text zoom.
- **FR-023**: The quiz title bar MUST include a keyboard-operable Windows-style X control whose accessible name and hover tooltip are `Go back`; activating it MUST navigate one browser-history entry backward and MUST open the homepage when no prior entry exists. Quiz stage changes MUST NOT create or replace browser-history entries, and backward stage navigation MUST remain exclusive to the form's `Back` button.
- **FR-024**: The quiz and homepage promotion MUST achieve a visibly more compact hierarchy by reducing container width, padding, gaps, display-heading scale, icon size, and decorative dimensions rather than shrinking readable copy or controls. Question, answer, and promotional body text MUST remain at least 16 CSS pixels, and every interactive target MUST remain at least 44 by 44 CSS pixels. Success and failure outcomes MUST remain full-screen, but their result-heading sizes MUST be moderately reduced while retaining dominant visual priority.
- **FR-025**: The homepage MUST use a near-black neutral background and high-contrast off-white supporting text by default, without a theme toggle. The existing red/green birthday-status colors MUST retain their semantic meaning and meet WCAG AA contrast against the new background. This dark-theme requirement MUST NOT alter the quiz page palette.

### Key Entities

- **Quiz attempt**: The transient set of answers for one visit, consisting of first name, age selection, public reaction, selected traits, and selected sworn statements; it is discarded on retry, refresh, or page exit.
- **Eric profile**: The canonical identity criteria, allowing reaction A or C and requiring exact matches for every other answer.
- **Quiz result**: One of two mutually exclusive outcomes, verified or not Eric, derived from comparing a submitted quiz attempt with the Eric profile.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In a complete test matrix, 100% of accepted-profile submissions using reaction A or C receive the verified result, while reaction B and 100% of submissions differing in any other field receive the not-Eric result.
- **SC-002**: A first-time visitor can complete and submit the five-step quiz in under 2 minutes without external instructions.
- **SC-003**: In usability testing, at least 90% of participants can identify their current quiz step, move backward to revise an answer, and reach a result on their first attempt.
- **SC-004**: The promotion and full quiz flow remain readable and operable at every tested viewport width from 320 through 1440 pixels, at 200% text zoom, and using keyboard-only input.
- **SC-005**: The main page's birthday answer is correct and remains its dominant content in 100% of regression checks covering birthday and non-birthday dates.
- **SC-006**: The pass or fail message becomes visible within 1 second of submission under normal page-use conditions.
- **SC-007**: Inspection of a completed or abandoned attempt confirms that 0 quiz answers are retained after refresh, transmitted away from the page, or included in the page address.
- **SC-008**: In a content review, 100% of the user-provided prompt and answer wording appears accurately, including capitalization and emphasis where specified.
- **SC-009**: From every quiz stage, activating the title-bar X leaves the quiz in one action, while browser history inspection confirms that moving among all five stages creates zero history entries.
- **SC-010**: At 320, 375, and 390 CSS-pixel viewport widths, every quiz step and the homepage promotion retain text of at least 16 CSS pixels and interactive targets of at least 44 by 44 CSS pixels while occupying less visual area than the current implementation through reduced non-content dimensions.
- **SC-011**: On the homepage in both birthday states, the background, supporting text, focus indicators, red/green status text, and compact promotion meet WCAG AA contrast, while visual comparison confirms that the quiz page palette is unchanged.
- **SC-012**: At every tested viewport from 320 through 1440 CSS pixels and at 200% text zoom, both result screens cover the viewport without horizontal scrolling, and their reduced headings remain the largest text on screen without clipping.

## Assumptions

- `Eric's Exact Age` is intentionally a separate satirical answer and is the only passing age selection; numeric options remain available only as failing alternatives.
- Reactions A and C are both accepted: Eric may instinctively turn around or recognize that someone is calling his name; reaction B remains disqualifying.
- Eric's trait profile includes all three listed traits.
- The passing sworn response selects only `I SOLEMNLY SWEAR: I am Eric.`; selecting either contradictory statement, alone or in addition, fails verification.
- The mock perjury language is comedic interface copy and does not create an actual legal attestation or collect a signature.
- Evaluation occurs after final submission rather than after each step so visitors can complete and revise the joke questionnaire without early answer disclosure.
- Checkbox steps allow zero selections because an empty set is a valid failing response; only the text, age, and radio steps require an answer before advancing.
- No accounts, shared services, stored records, result sharing, analytics, or server-side processing are in scope.
- The feature depends only on the existing public microsite and its ability to link to an additional public page.
